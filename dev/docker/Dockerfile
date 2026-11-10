FROM php:8.3-apache

ENV APACHE_DOCUMENT_ROOT=/app/public
WORKDIR /app

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libldap2-dev \
    libpng-dev \
    libzip-dev \
    wait-for-it \
    && rm -rf /var/lib/apt/lists/*

# Mark /app as safe for Git >= 2.35.2
RUN git config --system --add safe.directory /app

# Install PHP extensions
RUN docker-php-ext-configure ldap \
    --with-libdir="lib/$(gcc -dumpmachine)" \
    && docker-php-ext-configure gd \
    --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
    pdo_mysql gd ldap zip \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# Configure Apache
RUN a2enmod rewrite \
    && sed -ri \
    -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    && sed -ri \
    -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf

# Configure PHP
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && sed -i \
    's/memory_limit = 128M/memory_limit = 512M/g' \
    "$PHP_INI_DIR/php.ini"
