# syntax=docker/dockerfile:1

# --- STAGE 1: Build Frontend Assets (CSS / JS) ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY . .
RUN npm ci || npm install
RUN npm run production

# --- STAGE 2: Production Base Image ---
FROM ghcr.io/linuxserver/baseimage-alpine-nginx:3.23

# set version label
LABEL build_version="Metron Security version:- 2.0"
LABEL maintainer="Metron Security"

ENV S6_STAGE2_HOOK="/init-hook"

RUN \
    echo "**** install runtime packages ****" && \
    apk add --no-cache \
    fontconfig \
    mariadb-client \
    memcached \
    php85-dom \
    php85-exif \
    php85-gd \
    php85-ldap \
    php85-mysqlnd \
    php85-pdo_mysql \
    php85-pecl-memcached \
    php85-tokenizer \
    qt5-qtbase \
    ttf-freefont && \
    echo "**** configure php-fpm to pass env vars ****" && \
    sed -E -i 's/^;?clear_env ?=.*$/clear_env = no/g' /etc/php85/php-fpm.d/www.conf && \
    if ! grep -qxF 'clear_env = no' /etc/php85/php-fpm.d/www.conf; then echo 'clear_env = no' >> /etc/php85/php-fpm.conf; fi && \
    echo "env[PATH] = /usr/local/bin:/usr/bin:/bin" >> /etc/php85/php-fpm.conf && \
    echo "**** preparing application directory ****" && \
    mkdir -p /app/www

# Copy application source files
COPY . /app/www/

# Copy compiled CSS/JS assets from STAGE 1
COPY --from=frontend-builder /app/public/dist /app/www/public/dist

RUN \
    echo "**** install composer dependencies ****" && \
    cd /app/www && \
    composer install --no-dev && \
    echo "**** create symlinks for linuxserver persistence ****" && \
    /bin/bash -c \
    'dst=(www/themes www/files www/images www/uploads backups www/framework/cache www/framework/sessions www/framework/views www/framework/purifier log/bookstack/laravel.log www/.env); \
    src=(themes storage/uploads/files storage/uploads/images public/uploads storage/backups storage/framework/cache storage/framework/sessions storage/framework/views storage/framework/purifier storage/logs/laravel.log .env); \
    for i in "${!src[@]}"; do \
    rm -rf /app/www/"${src[i]}" && \
    ln -s /config/"${dst[i]}" /app/www/"${src[i]}"; \
    done' && \
    echo "**** cleanup ****" && \
    rm -rf \
    /tmp/* \
    $HOME/.cache \
    $HOME/.composer

COPY ./themes /app/www/themes

# Set ownership to the linuxserver default user
RUN chown -R abc:abc /app/www

EXPOSE 80 443
VOLUME /config