var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/markdown-it-task-lists/index.js
var require_markdown_it_task_lists = __commonJS({
  "node_modules/markdown-it-task-lists/index.js"(exports, module) {
    var disableCheckboxes = true;
    var useLabelWrapper = false;
    var useLabelAfter = false;
    module.exports = function(md, options2) {
      if (options2) {
        disableCheckboxes = !options2.enabled;
        useLabelWrapper = !!options2.label;
        useLabelAfter = !!options2.labelAfter;
      }
      md.core.ruler.after("inline", "github-task-lists", function(state) {
        var tokens = state.tokens;
        for (var i = 2; i < tokens.length; i++) {
          if (isTodoItem(tokens, i)) {
            todoify(tokens[i], state.Token);
            attrSet2(tokens[i - 2], "class", "task-list-item" + (!disableCheckboxes ? " enabled" : ""));
            attrSet2(tokens[parentToken(tokens, i - 2)], "class", "contains-task-list");
          }
        }
      });
    };
    function attrSet2(token, name, value) {
      var index2 = token.attrIndex(name);
      var attr = [name, value];
      if (index2 < 0) {
        token.attrPush(attr);
      } else {
        token.attrs[index2] = attr;
      }
    }
    function parentToken(tokens, index2) {
      var targetLevel = tokens[index2].level - 1;
      for (var i = index2 - 1; i >= 0; i--) {
        if (tokens[i].level === targetLevel) {
          return i;
        }
      }
      return -1;
    }
    function isTodoItem(tokens, index2) {
      return isInline(tokens[index2]) && isParagraph(tokens[index2 - 1]) && isListItem(tokens[index2 - 2]) && startsWithTodoMarkdown(tokens[index2]);
    }
    function todoify(token, TokenConstructor) {
      token.children.unshift(makeCheckbox(token, TokenConstructor));
      token.children[1].content = token.children[1].content.slice(3);
      token.content = token.content.slice(3);
      if (useLabelWrapper) {
        if (useLabelAfter) {
          token.children.pop();
          var id = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
          token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
          token.children.push(afterLabel(token.content, id, TokenConstructor));
        } else {
          token.children.unshift(beginLabel(TokenConstructor));
          token.children.push(endLabel(TokenConstructor));
        }
      }
    }
    function makeCheckbox(token, TokenConstructor) {
      var checkbox = new TokenConstructor("html_inline", "", 0);
      var disabledAttr = disableCheckboxes ? ' disabled="" ' : "";
      if (token.content.indexOf("[ ] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
      } else if (token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
      }
      return checkbox;
    }
    function beginLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "<label>";
      return token;
    }
    function endLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "</label>";
      return token;
    }
    function afterLabel(content, id, TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = '<label class="task-list-item-label" for="' + id + '">' + content + "</label>";
      token.attrs = [{ for: id }];
      return token;
    }
    function isInline(token) {
      return token.type === "inline";
    }
    function isParagraph(token) {
      return token.type === "paragraph_open";
    }
    function isListItem(token) {
      return token.type === "list_item_open";
    }
    function startsWithTodoMarkdown(token) {
      return token.content.indexOf("[ ] ") === 0 || token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0;
    }
  }
});

// resources/js/services/events.js
var events_exports = {};
__export(events_exports, {
  emit: () => emit,
  emitPublic: () => emitPublic,
  error: () => error,
  listen: () => listen,
  showResponseError: () => showResponseError,
  showValidationErrors: () => showValidationErrors,
  success: () => success
});
var listeners = {};
var stack = [];
function emit(eventName, eventData) {
  stack.push({ name: eventName, data: eventData });
  const listenersToRun = listeners[eventName] || [];
  for (const listener of listenersToRun) {
    listener(eventData);
  }
}
function listen(eventName, callback) {
  if (typeof listeners[eventName] === "undefined") listeners[eventName] = [];
  listeners[eventName].push(callback);
}
function emitPublic(targetElement, eventName, eventData) {
  const event = new CustomEvent(eventName, {
    detail: eventData,
    bubbles: true
  });
  targetElement.dispatchEvent(event);
}
function success(message) {
  emit("success", message);
}
function error(message) {
  emit("error", message);
}
function showValidationErrors(responseErr) {
  if (!responseErr.status) return;
  if (responseErr.status === 422 && responseErr.data) {
    const message = Object.values(responseErr.data).flat().join("\n");
    error(message);
  }
}
function showResponseError(responseErr) {
  if (!responseErr.status) return;
  if (responseErr.status >= 400 && responseErr.data && responseErr.data.message) {
    error(responseErr.data.message);
  }
}

// resources/js/services/http.js
var http_exports = {};
__export(http_exports, {
  HttpError: () => HttpError,
  createXMLHttpRequest: () => createXMLHttpRequest,
  delete: () => performDelete,
  get: () => get,
  patch: () => patch,
  post: () => post,
  put: () => put
});
async function getResponseContent(response) {
  if (response.status === 204) {
    return null;
  }
  const responseContentType = response.headers.get("Content-Type") || "";
  const subType = responseContentType.split(";")[0].split("/").pop();
  if (subType === "javascript" || subType === "json") {
    return response.json();
  }
  return response.text();
}
var HttpError = class extends Error {
  constructor(response, content) {
    super(response.statusText);
    this.data = content;
    this.headers = response.headers;
    this.redirected = response.redirected;
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.original = response;
  }
};
function createXMLHttpRequest(method, url, events = {}) {
  const csrfToken = document.querySelector("meta[name=token]").getAttribute("content");
  const req = new XMLHttpRequest();
  for (const [eventName, callback] of Object.entries(events)) {
    req.addEventListener(eventName, callback.bind(req));
  }
  req.open(method, url);
  req.withCredentials = true;
  req.setRequestHeader("X-CSRF-TOKEN", csrfToken);
  return req;
}
async function request(url, options2 = {}) {
  let requestUrl = url;
  if (!requestUrl.startsWith("http")) {
    requestUrl = window.baseUrl(requestUrl);
  }
  if (options2.params) {
    const urlObj = new URL(requestUrl);
    for (const paramName of Object.keys(options2.params)) {
      const value = options2.params[paramName];
      if (typeof value !== "undefined" && value !== null) {
        urlObj.searchParams.set(paramName, value);
      }
    }
    requestUrl = urlObj.toString();
  }
  const csrfToken = document.querySelector("meta[name=token]").getAttribute("content");
  const requestOptions = { ...options2, credentials: "same-origin" };
  requestOptions.headers = {
    ...requestOptions.headers || {},
    baseURL: window.baseUrl(""),
    "X-CSRF-TOKEN": csrfToken
  };
  const response = await fetch(requestUrl, requestOptions);
  const content = await getResponseContent(response);
  const returnData = {
    data: content,
    headers: response.headers,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    original: response
  };
  if (!response.ok) {
    throw new HttpError(response, content);
  }
  return returnData;
}
async function dataRequest(method, url, data = null) {
  const options2 = {
    method,
    body: data
  };
  if (typeof data === "object" && !(data instanceof FormData)) {
    options2.headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };
    options2.body = JSON.stringify(data);
  }
  if (data instanceof FormData && method !== "post") {
    data.append("_method", method);
    options2.method = "post";
  }
  return request(url, options2);
}
async function get(url, params = {}) {
  return request(url, {
    method: "GET",
    params
  });
}
async function post(url, data = null) {
  return dataRequest("POST", url, data);
}
async function put(url, data = null) {
  return dataRequest("PUT", url, data);
}
async function patch(url, data = null) {
  return dataRequest("PATCH", url, data);
}
async function performDelete(url, data = null) {
  return dataRequest("DELETE", url, data);
}

// resources/js/services/translations.js
var Translator = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
    this.parseTranslations();
  }
  /**
   * Parse translations out of the page and place into the store.
   */
  parseTranslations() {
    const translationMetaTags = document.querySelectorAll('meta[name="translation"]');
    for (const tag of translationMetaTags) {
      const key = tag.getAttribute("key");
      const value = tag.getAttribute("value");
      this.store.set(key, value);
    }
  }
  /**
   * Get a translation, Same format as Laravel's 'trans' helper
   * @param key
   * @param replacements
   * @returns {*}
   */
  get(key, replacements) {
    const text2 = this.getTransText(key);
    return this.performReplacements(text2, replacements);
  }
  /**
   * Get pluralised text, Dependent on the given count.
   * Same format at Laravel's 'trans_choice' helper.
   * @param key
   * @param count
   * @param replacements
   * @returns {*}
   */
  getPlural(key, count, replacements) {
    const text2 = this.getTransText(key);
    return this.parsePlural(text2, count, replacements);
  }
  /**
   * Parse the given translation and find the correct plural option
   * to use. Similar format at Laravel's 'trans_choice' helper.
   * @param {String} translation
   * @param {Number} count
   * @param {Object} replacements
   * @returns {String}
   */
  parsePlural(translation, count, replacements) {
    const splitText = translation.split("|");
    const exactCountRegex = /^{([0-9]+)}/;
    const rangeRegex = /^\[([0-9]+),([0-9*]+)]/;
    let result = null;
    for (const t of splitText) {
      const exactMatches = t.match(exactCountRegex);
      if (exactMatches !== null && Number(exactMatches[1]) === count) {
        result = t.replace(exactCountRegex, "").trim();
        break;
      }
      const rangeMatches = t.match(rangeRegex);
      if (rangeMatches !== null) {
        const rangeStart = Number(rangeMatches[1]);
        if (rangeStart <= count && (rangeMatches[2] === "*" || Number(rangeMatches[2]) >= count)) {
          result = t.replace(rangeRegex, "").trim();
          break;
        }
      }
    }
    if (result === null && splitText.length > 1) {
      result = count === 1 ? splitText[0] : splitText[1];
    }
    if (result === null) {
      result = splitText[0];
    }
    return this.performReplacements(result, replacements);
  }
  /**
   * Fetched translation text from the store for the given key.
   * @param key
   * @returns {String|Object}
   */
  getTransText(key) {
    const value = this.store.get(key);
    if (value === void 0) {
      console.warn(`Translation with key "${key}" does not exist`);
    }
    return value;
  }
  /**
   * Perform replacements on a string.
   * @param {String} string
   * @param {Object} replacements
   * @returns {*}
   */
  performReplacements(string, replacements) {
    if (!replacements) return string;
    const replaceMatches = string.match(/:(\S+)/g);
    if (replaceMatches === null) return string;
    let updatedString = string;
    replaceMatches.forEach((match2) => {
      const key = match2.substring(1);
      if (typeof replacements[key] === "undefined") return;
      updatedString = updatedString.replace(match2, replacements[key]);
    });
    return updatedString;
  }
};
var translations_default = Translator;

// resources/js/services/components.js
var components_exports = {};
__export(components_exports, {
  first: () => first,
  firstOnElement: () => firstOnElement,
  get: () => get2,
  init: () => init,
  register: () => register
});

// resources/js/services/text.js
function kebabToCamel(kebab) {
  const ucFirst = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);
  const words = kebab.split("-");
  return words[0] + words.slice(1).map(ucFirst).join("");
}
function camelToKebab(camelStr) {
  return camelStr.replace(/[A-Z]/g, (str, offset) => (offset > 0 ? "-" : "") + str.toLowerCase());
}

// resources/js/services/components.js
var components = {};
var componentModelMap = {};
var elementComponentMap = /* @__PURE__ */ new WeakMap();
function parseRefs(name, element) {
  const refs = {};
  const manyRefs = {};
  const prefix = `${name}@`;
  const selector = `[refs*="${prefix}"]`;
  const refElems = [...element.querySelectorAll(selector)];
  if (element.matches(selector)) {
    refElems.push(element);
  }
  for (const el of refElems) {
    const refNames = el.getAttribute("refs").split(" ").filter((str) => str.startsWith(prefix)).map((str) => str.replace(prefix, "")).map(kebabToCamel);
    for (const ref of refNames) {
      refs[ref] = el;
      if (typeof manyRefs[ref] === "undefined") {
        manyRefs[ref] = [];
      }
      manyRefs[ref].push(el);
    }
  }
  return { refs, manyRefs };
}
function parseOpts(componentName, element) {
  const opts = {};
  const prefix = `option:${componentName}:`;
  for (const { name, value } of element.attributes) {
    if (name.startsWith(prefix)) {
      const optName = name.replace(prefix, "");
      opts[kebabToCamel(optName)] = value || "";
    }
  }
  return opts;
}
function initComponent(name, element) {
  const ComponentModel = componentModelMap[name];
  if (ComponentModel === void 0) return;
  let instance;
  try {
    instance = new ComponentModel();
    instance.$name = name;
    instance.$el = element;
    const allRefs = parseRefs(name, element);
    instance.$refs = allRefs.refs;
    instance.$manyRefs = allRefs.manyRefs;
    instance.$opts = parseOpts(name, element);
    instance.setup();
  } catch (e) {
    console.error("Failed to create component", e, name, element);
  }
  if (typeof components[name] === "undefined") {
    components[name] = [];
  }
  components[name].push(instance);
  const elComponents = elementComponentMap.get(element) || {};
  elComponents[name] = instance;
  elementComponentMap.set(element, elComponents);
}
function init(parentElement = document) {
  const componentElems = parentElement.querySelectorAll("[component],[components]");
  for (const el of componentElems) {
    const componentNames = `${el.getAttribute("component") || ""} ${el.getAttribute("components")}`.toLowerCase().split(" ").filter(Boolean);
    for (const name of componentNames) {
      initComponent(name, el);
    }
  }
}
function register(mapping) {
  const keys = Object.keys(mapping);
  for (const key of keys) {
    componentModelMap[camelToKebab(key)] = mapping[key];
  }
}
function first(name) {
  return (components[name] || [null])[0];
}
function get2(name) {
  return components[name] || [];
}
function firstOnElement(element, name) {
  const elComponents = elementComponentMap.get(element) || {};
  return elComponents[name] || null;
}

// resources/js/components/index.js
var components_exports2 = {};
__export(components_exports2, {
  AddRemoveRows: () => AddRemoveRows,
  AjaxDeleteRow: () => AjaxDeleteRow,
  AjaxForm: () => AjaxForm,
  Attachments: () => Attachments,
  AttachmentsList: () => AttachmentsList,
  AutoSubmit: () => AutoSubmit,
  AutoSuggest: () => AutoSuggest,
  BackToTop: () => BackToTop,
  BookSort: () => BookSort,
  ChapterContents: () => ChapterContents,
  CodeEditor: () => CodeEditor,
  CodeHighlighter: () => CodeHighlighter,
  CodeTextarea: () => CodeTextarea,
  Collapsible: () => Collapsible,
  ConfirmDialog: () => ConfirmDialog,
  CustomCheckbox: () => CustomCheckbox,
  DetailsHighlighter: () => DetailsHighlighter,
  Dropdown: () => Dropdown,
  DropdownSearch: () => DropdownSearch,
  Dropzone: () => Dropzone,
  EditorToolbox: () => EditorToolbox,
  EntityPermissions: () => EntityPermissions,
  EntitySearch: () => EntitySearch,
  EntitySelector: () => EntitySelector,
  EntitySelectorPopup: () => EntitySelectorPopup,
  EventEmitSelect: () => EventEmitSelect,
  ExpandToggle: () => ExpandToggle,
  GlobalSearch: () => GlobalSearch,
  HeaderMobileToggle: () => HeaderMobileToggle,
  ImageManager: () => ImageManager,
  ImagePicker: () => ImagePicker,
  ListSortControl: () => ListSortControl,
  MarkdownEditor: () => MarkdownEditor,
  NewUserPassword: () => NewUserPassword,
  Notification: () => Notification,
  OptionalInput: () => OptionalInput,
  PageComment: () => PageComment,
  PageComments: () => PageComments,
  PageDisplay: () => PageDisplay,
  PageEditor: () => PageEditor,
  PagePicker: () => PagePicker,
  PermissionsTable: () => PermissionsTable,
  Pointer: () => Pointer,
  Popup: () => Popup,
  SettingAppColorScheme: () => SettingAppColorScheme,
  SettingColorPicker: () => SettingColorPicker,
  SettingHomepageControl: () => SettingHomepageControl,
  ShelfSort: () => ShelfSort,
  ShortcutInput: () => ShortcutInput,
  Shortcuts: () => Shortcuts,
  SortableList: () => SortableList,
  SubmitOnChange: () => SubmitOnChange,
  Tabs: () => Tabs,
  TagManager: () => TagManager,
  TemplateManager: () => TemplateManager,
  ToggleSwitch: () => ToggleSwitch,
  TriLayout: () => TriLayout,
  UserSelect: () => UserSelect,
  WebhookEvents: () => WebhookEvents,
  WysiwygEditor: () => WysiwygEditor,
  WysiwygInput: () => WysiwygInput
});

// resources/js/services/dom.js
function elem(tagName2, attrs = {}, children = []) {
  const el = document.createElement(tagName2);
  for (const [key, val] of Object.entries(attrs)) {
    if (val === null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, val);
    }
  }
  for (const child of children) {
    if (typeof child === "string") {
      el.append(document.createTextNode(child));
    } else {
      el.append(child);
    }
  }
  return el;
}
function forEach(selector, callback) {
  const elements = document.querySelectorAll(selector);
  for (const element of elements) {
    callback(element);
  }
}
function onEvents(listenerElement, events, callback) {
  for (const eventName of events) {
    listenerElement.addEventListener(eventName, callback);
  }
}
function onSelect(elements, callback) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  for (const listenerElement of elements) {
    listenerElement.addEventListener("click", callback);
    listenerElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        callback(event);
      }
    });
  }
}
function onKeyPress(key, elements, callback) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  const listener = (event) => {
    if (event.key === key) {
      callback(event);
    }
  };
  elements.forEach((e) => e.addEventListener("keydown", listener));
}
function onEnterPress(elements, callback) {
  onKeyPress("Enter", elements, callback);
}
function onEscapePress(elements, callback) {
  onKeyPress("Escape", elements, callback);
}
function onChildEvent(listenerElement, childSelector, eventName, callback) {
  listenerElement.addEventListener(eventName, (event) => {
    const matchingChild = event.target.closest(childSelector);
    if (matchingChild) {
      callback.call(matchingChild, event, matchingChild);
    }
  });
}
function findText(selector, text2) {
  const elements = document.querySelectorAll(selector);
  text2 = text2.toLowerCase();
  for (const element of elements) {
    if (element.textContent.toLowerCase().includes(text2)) {
      return element;
    }
  }
  return null;
}
function showLoading(element) {
  element.innerHTML = '<div class="loading-container"><div></div><div></div><div></div></div>';
}
function getLoading() {
  const wrap2 = document.createElement("div");
  wrap2.classList.add("loading-container");
  wrap2.innerHTML = "<div></div><div></div><div></div>";
  return wrap2;
}
function removeLoading(element) {
  const loadingEls = element.querySelectorAll(".loading-container");
  for (const el of loadingEls) {
    el.remove();
  }
}
function htmlToDom(html) {
  const wrap2 = document.createElement("div");
  wrap2.innerHTML = html;
  window.$components.init(wrap2);
  return wrap2.children[0];
}

// resources/js/services/util.js
function debounce(func, waitMs, immediate) {
  let timeout;
  return function debouncedWrapper(...args) {
    const context = this;
    const later = function debouncedTimeout() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, waitMs);
    if (callNow) func.apply(context, args);
  };
}
function scrollAndHighlightElement(element) {
  if (!element) return;
  const parentDetails = element.closest("details");
  if (parentDetails && !parentDetails.open) {
    parentDetails.open = true;
  }
  element.scrollIntoView({ behavior: "smooth" });
  const highlight = getComputedStyle(document.body).getPropertyValue("--color-link");
  element.style.outline = `2px dashed ${highlight}`;
  element.style.outlineOffset = "5px";
  element.style.transition = null;
  setTimeout(() => {
    element.style.transition = "outline linear 3s";
    element.style.outline = "2px dashed rgba(0, 0, 0, 0)";
    const listener = () => {
      element.removeEventListener("transitionend", listener);
      element.style.transition = null;
      element.style.outline = null;
      element.style.outlineOffset = null;
    };
    element.addEventListener("transitionend", listener);
  }, 1e3);
}
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function uniqueId() {
  const S4 = () => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}
function wait(timeMs) {
  return new Promise((res) => {
    setTimeout(res, timeMs);
  });
}

// resources/js/components/component.js
var Component = class {
  constructor() {
    /**
     * The registered name of the component.
     * @type {string}
     */
    __publicField(this, "$name", "");
    /**
     * The element that the component is registered upon.
     * @type {Element}
     */
    __publicField(this, "$el", null);
    /**
     * Mapping of referenced elements within the component.
     * @type {Object<string, Element>}
     */
    __publicField(this, "$refs", {});
    /**
     * Mapping of arrays of referenced elements within the component so multiple
     * references, sharing the same name, can be fetched.
     * @type {Object<string, Element[]>}
     */
    __publicField(this, "$manyRefs", {});
    /**
     * Options passed into this component.
     * @type {Object<String, String>}
     */
    __publicField(this, "$opts", {});
  }
  /**
   * Component-specific setup methods.
   * Use this to assign local variables and run any initial setup or actions.
   */
  setup() {
  }
  /**
   * Emit an event from this component.
   * Will be bubbled up from the dom element this is registered on, as a custom event
   * with the name `<elementName>-<eventName>`, with the provided data in the event detail.
   * @param {String} eventName
   * @param {Object} data
   */
  $emit(eventName, data = {}) {
    data.from = this;
    const componentName = this.$name;
    const event = new CustomEvent(`${componentName}-${eventName}`, {
      bubbles: true,
      detail: data
    });
    this.$el.dispatchEvent(event);
  }
};

// resources/js/components/add-remove-rows.js
var AddRemoveRows = class extends Component {
  setup() {
    this.modelRow = this.$refs.model;
    this.addButton = this.$refs.add;
    this.removeSelector = this.$opts.removeSelector;
    this.rowSelector = this.$opts.rowSelector;
    this.setupListeners();
  }
  setupListeners() {
    this.addButton.addEventListener("click", this.add.bind(this));
    onChildEvent(this.$el, this.removeSelector, "click", (e) => {
      const row = e.target.closest(this.rowSelector);
      row.remove();
    });
  }
  // For external use
  add() {
    const clone2 = this.modelRow.cloneNode(true);
    clone2.classList.remove("hidden");
    this.setClonedInputNames(clone2);
    this.modelRow.parentNode.insertBefore(clone2, this.modelRow);
    window.$components.init(clone2);
  }
  /**
   * Update the HTML names of a clone to be unique if required.
   * Names can use placeholder values. For exmaple, a model row
   * may have name="tags[randrowid][name]".
   * These are the available placeholder values:
   * - randrowid - An random string ID, applied the same across the row.
   * @param {HTMLElement} clone
   */
  setClonedInputNames(clone2) {
    const rowId = uniqueId();
    const randRowIdElems = clone2.querySelectorAll('[name*="randrowid"]');
    for (const elem2 of randRowIdElems) {
      elem2.name = elem2.name.split("randrowid").join(rowId);
    }
  }
};

// resources/js/components/ajax-delete-row.js
var AjaxDeleteRow = class extends Component {
  setup() {
    this.row = this.$el;
    this.url = this.$opts.url;
    this.deleteButtons = this.$manyRefs.delete;
    onSelect(this.deleteButtons, this.runDelete.bind(this));
  }
  runDelete() {
    this.row.style.opacity = "0.7";
    this.row.style.pointerEvents = "none";
    window.$http.delete(this.url).then((resp) => {
      if (typeof resp.data === "object" && resp.data.message) {
        window.$events.emit("success", resp.data.message);
      }
      this.row.remove();
    }).catch(() => {
      this.row.style.opacity = null;
      this.row.style.pointerEvents = null;
    });
  }
};

// resources/js/components/ajax-form.js
var AjaxForm = class extends Component {
  setup() {
    this.container = this.$el;
    this.responseContainer = this.container;
    this.url = this.$opts.url;
    this.method = this.$opts.method || "post";
    this.successMessage = this.$opts.successMessage;
    this.submitButtons = this.$manyRefs.submit || [];
    if (this.$opts.responseContainer) {
      this.responseContainer = this.container.closest(this.$opts.responseContainer);
    }
    this.setupListeners();
  }
  setupListeners() {
    if (this.container.tagName === "FORM") {
      this.container.addEventListener("submit", this.submitRealForm.bind(this));
      return;
    }
    onEnterPress(this.container, (event) => {
      this.submitFakeForm();
      event.preventDefault();
    });
    this.submitButtons.forEach((button) => onSelect(button, this.submitFakeForm.bind(this)));
  }
  submitFakeForm() {
    const fd = new FormData();
    const inputs = this.container.querySelectorAll("[name]");
    for (const input of inputs) {
      fd.append(input.getAttribute("name"), input.value);
    }
    this.submit(fd);
  }
  submitRealForm(event) {
    event.preventDefault();
    const fd = new FormData(this.container);
    this.submit(fd);
  }
  async submit(formData) {
    this.responseContainer.style.opacity = "0.7";
    this.responseContainer.style.pointerEvents = "none";
    try {
      const resp = await window.$http[this.method.toLowerCase()](this.url, formData);
      this.$emit("success", { formData });
      this.responseContainer.innerHTML = resp.data;
      if (this.successMessage) {
        window.$events.emit("success", this.successMessage);
      }
    } catch (err) {
      this.responseContainer.innerHTML = err.data;
    }
    window.$components.init(this.responseContainer);
    this.responseContainer.style.opacity = null;
    this.responseContainer.style.pointerEvents = null;
  }
};

// resources/js/components/attachments.js
var Attachments = class extends Component {
  setup() {
    this.container = this.$el;
    this.pageId = this.$opts.pageId;
    this.editContainer = this.$refs.editContainer;
    this.listContainer = this.$refs.listContainer;
    this.linksContainer = this.$refs.linksContainer;
    this.listPanel = this.$refs.listPanel;
    this.attachLinkButton = this.$refs.attachLinkButton;
    this.setupListeners();
  }
  setupListeners() {
    const reloadListBound = this.reloadList.bind(this);
    this.container.addEventListener("dropzone-upload-success", reloadListBound);
    this.container.addEventListener("ajax-form-success", reloadListBound);
    this.container.addEventListener("sortable-list-sort", (event) => {
      this.updateOrder(event.detail.ids);
    });
    this.container.addEventListener("event-emit-select-edit", (event) => {
      this.startEdit(event.detail.id);
    });
    this.container.addEventListener("event-emit-select-edit-back", () => {
      this.stopEdit();
    });
    this.container.addEventListener("event-emit-select-insert", (event) => {
      const insertContent = event.target.closest("[data-drag-content]").getAttribute("data-drag-content");
      const contentTypes = JSON.parse(insertContent);
      window.$events.emit("editor::insert", {
        html: contentTypes["text/html"],
        markdown: contentTypes["text/plain"]
      });
    });
    this.attachLinkButton.addEventListener("click", () => {
      this.showSection("links");
    });
  }
  showSection(section) {
    const sectionMap = {
      links: this.linksContainer,
      edit: this.editContainer,
      list: this.listContainer
    };
    for (const [name, elem2] of Object.entries(sectionMap)) {
      elem2.toggleAttribute("hidden", name !== section);
    }
  }
  reloadList() {
    this.stopEdit();
    window.$http.get(`/attachments/get/page/${this.pageId}`).then((resp) => {
      this.listPanel.innerHTML = resp.data;
      window.$components.init(this.listPanel);
    });
  }
  updateOrder(idOrder) {
    window.$http.put(`/attachments/sort/page/${this.pageId}`, { order: idOrder }).then((resp) => {
      window.$events.emit("success", resp.data.message);
    });
  }
  async startEdit(id) {
    this.showSection("edit");
    showLoading(this.editContainer);
    const resp = await window.$http.get(`/attachments/edit/${id}`);
    this.editContainer.innerHTML = resp.data;
    window.$components.init(this.editContainer);
  }
  stopEdit() {
    this.showSection("list");
  }
};

// resources/js/components/attachments-list.js
var AttachmentsList = class extends Component {
  setup() {
    this.container = this.$el;
    this.fileLinks = this.$manyRefs.linkTypeFile;
    this.setupListeners();
  }
  setupListeners() {
    const isExpectedKey = (event) => event.key === "Control" || event.key === "Meta";
    window.addEventListener("keydown", (event) => {
      if (isExpectedKey(event)) {
        this.addOpenQueryToLinks();
      }
    }, { passive: true });
    window.addEventListener("keyup", (event) => {
      if (isExpectedKey(event)) {
        this.removeOpenQueryFromLinks();
      }
    }, { passive: true });
  }
  addOpenQueryToLinks() {
    for (const link2 of this.fileLinks) {
      if (link2.href.split("?")[1] !== "open=true") {
        link2.href += "?open=true";
        link2.setAttribute("target", "_blank");
      }
    }
  }
  removeOpenQueryFromLinks() {
    for (const link2 of this.fileLinks) {
      link2.href = link2.href.split("?")[0];
      link2.removeAttribute("target");
    }
  }
};

// resources/js/services/keyboard-navigation.js
var _KeyboardNavigationHandler_instances, keydownHandler_fn, getFocusable_fn;
var KeyboardNavigationHandler = class {
  /**
   * @param {Element} container
   * @param {Function|null} onEscape
   * @param {Function|null} onEnter
   */
  constructor(container, onEscape = null, onEnter = null) {
    __privateAdd(this, _KeyboardNavigationHandler_instances);
    this.containers = [container];
    this.onEscape = onEscape;
    this.onEnter = onEnter;
    container.addEventListener("keydown", __privateMethod(this, _KeyboardNavigationHandler_instances, keydownHandler_fn).bind(this));
  }
  /**
   * Also share the keyboard event handling to the given element.
   * Only elements within the original container are considered focusable though.
   * @param {Element} element
   */
  shareHandlingToEl(element) {
    this.containers.push(element);
    element.addEventListener("keydown", __privateMethod(this, _KeyboardNavigationHandler_instances, keydownHandler_fn).bind(this));
  }
  /**
   * Focus on the next focusable element within the current containers.
   */
  focusNext() {
    const focusable = __privateMethod(this, _KeyboardNavigationHandler_instances, getFocusable_fn).call(this);
    const currentIndex = focusable.indexOf(document.activeElement);
    let newIndex2 = currentIndex + 1;
    if (newIndex2 >= focusable.length) {
      newIndex2 = 0;
    }
    focusable[newIndex2].focus();
  }
  /**
   * Focus on the previous existing focusable element within the current containers.
   */
  focusPrevious() {
    const focusable = __privateMethod(this, _KeyboardNavigationHandler_instances, getFocusable_fn).call(this);
    const currentIndex = focusable.indexOf(document.activeElement);
    let newIndex2 = currentIndex - 1;
    if (newIndex2 < 0) {
      newIndex2 = focusable.length - 1;
    }
    focusable[newIndex2].focus();
  }
};
_KeyboardNavigationHandler_instances = new WeakSet();
/**
 * @param {KeyboardEvent} event
 */
keydownHandler_fn = function(event) {
  if (event.target.matches("input") && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
    return;
  }
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    this.focusNext();
    event.preventDefault();
  } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    this.focusPrevious();
    event.preventDefault();
  } else if (event.key === "Escape") {
    if (this.onEscape) {
      this.onEscape(event);
    } else if (document.activeElement) {
      document.activeElement.blur();
    }
  } else if (event.key === "Enter" && this.onEnter) {
    this.onEnter(event);
  }
};
/**
 * Get an array of focusable elements within the current containers.
 * @returns {Element[]}
 */
getFocusable_fn = function() {
  const focusable = [];
  const selector = '[tabindex]:not([tabindex="-1"]),[href],button:not([tabindex="-1"],[disabled]),input:not([type=hidden])';
  for (const container of this.containers) {
    focusable.push(...container.querySelectorAll(selector));
  }
  return focusable;
};

// resources/js/components/auto-suggest.js
var ajaxCache = {};
var AutoSuggest = class extends Component {
  setup() {
    this.parent = this.$el.parentElement;
    this.container = this.$el;
    this.type = this.$opts.type;
    this.url = this.$opts.url;
    this.input = this.$refs.input;
    this.list = this.$refs.list;
    this.lastPopulated = 0;
    this.setupListeners();
  }
  setupListeners() {
    const navHandler = new KeyboardNavigationHandler(
      this.list,
      () => {
        this.input.focus();
        setTimeout(() => this.hideSuggestions(), 1);
      },
      (event) => {
        event.preventDefault();
        const selectionValue = event.target.textContent;
        if (selectionValue) {
          this.selectSuggestion(selectionValue);
        }
      }
    );
    navHandler.shareHandlingToEl(this.input);
    onChildEvent(this.list, ".text-item", "click", (event, el) => {
      this.selectSuggestion(el.textContent);
    });
    this.input.addEventListener("input", this.requestSuggestions.bind(this));
    this.input.addEventListener("focus", this.requestSuggestions.bind(this));
    this.input.addEventListener("blur", this.hideSuggestionsIfFocusedLost.bind(this));
    this.input.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        this.hideSuggestions();
      }
    });
  }
  selectSuggestion(value) {
    this.input.value = value;
    this.lastPopulated = Date.now();
    this.input.focus();
    this.input.dispatchEvent(new Event("input", { bubbles: true }));
    this.input.dispatchEvent(new Event("change", { bubbles: true }));
    this.hideSuggestions();
  }
  async requestSuggestions() {
    if (Date.now() - this.lastPopulated < 50) {
      return;
    }
    const nameFilter = this.getNameFilterIfNeeded();
    const search = this.input.value.toLowerCase();
    const suggestions = await this.loadSuggestions(search, nameFilter);
    const toShow = suggestions.filter((val) => search === "" || val.toLowerCase().startsWith(search)).slice(0, 10);
    this.displaySuggestions(toShow);
  }
  getNameFilterIfNeeded() {
    if (this.type !== "value") return null;
    return this.parent.querySelector("input").value;
  }
  /**
   * @param {String} search
   * @param {String|null} nameFilter
   * @returns {Promise<Object|String|*>}
   */
  async loadSuggestions(search, nameFilter = null) {
    search = search.slice(0, 4);
    const params = { search, name: nameFilter };
    const cacheKey = `${this.url}:${JSON.stringify(params)}`;
    if (ajaxCache[cacheKey]) {
      return ajaxCache[cacheKey];
    }
    const resp = await window.$http.get(this.url, params);
    ajaxCache[cacheKey] = resp.data;
    return resp.data;
  }
  /**
   * @param {String[]} suggestions
   */
  displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }
    this.list.innerHTML = suggestions.map((value) => `<li><div tabindex="0" class="text-item">${escapeHtml(value)}</div></li>`).join("");
    this.list.style.display = "block";
    for (const button of this.list.querySelectorAll(".text-item")) {
      button.addEventListener("blur", this.hideSuggestionsIfFocusedLost.bind(this));
    }
  }
  hideSuggestions() {
    this.list.style.display = "none";
  }
  hideSuggestionsIfFocusedLost(event) {
    if (!this.container.contains(event.relatedTarget)) {
      this.hideSuggestions();
    }
  }
};

// resources/js/components/auto-submit.js
var AutoSubmit = class extends Component {
  setup() {
    this.form = this.$el;
    this.form.submit();
  }
};

// resources/js/components/back-to-top.js
var BackToTop = class extends Component {
  setup() {
    this.button = this.$el;
    this.targetElem = document.getElementById("header");
    this.showing = false;
    this.breakPoint = 1200;
    if (document.body.classList.contains("flexbox")) {
      this.button.style.display = "none";
      return;
    }
    this.button.addEventListener("click", this.scrollToTop.bind(this));
    window.addEventListener("scroll", this.onPageScroll.bind(this));
  }
  onPageScroll() {
    const scrollTopPos = document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (!this.showing && scrollTopPos > this.breakPoint) {
      this.button.style.display = "block";
      this.showing = true;
      setTimeout(() => {
        this.button.style.opacity = 0.4;
      }, 1);
    } else if (this.showing && scrollTopPos < this.breakPoint) {
      this.button.style.opacity = 0;
      this.showing = false;
      setTimeout(() => {
        this.button.style.display = "none";
      }, 500);
    }
  }
  scrollToTop() {
    const targetTop = this.targetElem.getBoundingClientRect().top;
    const scrollElem = document.documentElement.scrollTop ? document.documentElement : document.body;
    const duration = 300;
    const start = Date.now();
    const scrollStart = this.targetElem.getBoundingClientRect().top;
    function setPos() {
      const percentComplete = 1 - (Date.now() - start) / duration;
      const target = Math.abs(percentComplete * scrollStart);
      if (percentComplete > 0) {
        scrollElem.scrollTop = target;
        requestAnimationFrame(setPos.bind(this));
      } else {
        scrollElem.scrollTop = targetTop;
      }
    }
    requestAnimationFrame(setPos.bind(this));
  }
};

// node_modules/sortablejs/modular/sortable.esm.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var version = "1.15.6";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector) return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, "transform");
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName2, iterator) {
  if (ctx) {
    var list2 = ctx.getElementsByTagName(tagName2), i = 0, n = list2.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list2[i], i);
      }
    }
    return list2;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    if (parentSide === "top" || parentSide === "left") {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options2, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options2.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem2 = el;
  var gotSelf = false;
  do {
    if (elem2.clientWidth < elem2.scrollWidth || elem2.clientHeight < elem2.scrollHeight) {
      var elemCSS = css(elem2);
      if (elem2.clientWidth < elem2.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem2.clientHeight < elem2.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem2.getBoundingClientRect || elem2 === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem2;
        gotSelf = true;
      }
    }
  } while (elem2 = elem2.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function setRect(el, rect) {
  css(el, "position", "absolute");
  css(el, "top", rect.top);
  css(el, "left", rect.left);
  css(el, "width", rect.width);
  css(el, "height", rect.height);
}
function unsetRect(el) {
  css(el, "position", "");
  css(el, "top", "");
  css(el, "left", "");
  css(el, "width", "");
  css(el, "height", "");
}
function getChildContainingRectFromElement(container, options2, ghostEl2) {
  var rect = {};
  Array.from(container.children).forEach(function(child) {
    var _rect$left, _rect$top, _rect$right, _rect$bottom;
    if (!closest(child, options2.draggable, container, false) || child.animated || child === ghostEl2) return;
    var childRect = getRect(child);
    rect.left = Math.min((_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : Infinity, childRect.left);
    rect.top = Math.min((_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : Infinity, childRect.top);
    rect.right = Math.max((_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : -Infinity, childRect.right);
    rect.bottom = Math.max((_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : -Infinity, childRect.bottom);
  });
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function") callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state) {
        var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function") callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function") callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options2) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options2.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options2) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2)) continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function") return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable) return;
  var evt, options2 = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options2[onName]) {
    options2[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl;
var parentEl;
var ghostEl;
var rootEl;
var nextEl;
var lastDownEl;
var cloneEl;
var cloneHidden;
var oldIndex;
var newIndex;
var oldDraggableIndex;
var newDraggableIndex;
var activeGroup;
var putSortable;
var awaitingDragStarted = false;
var ignoreNextClick = false;
var sortables = [];
var tapEvt;
var touchEvt;
var lastDx;
var lastDy;
var tapDistanceLeft;
var tapDistanceTop;
var moved;
var lastTarget;
var lastDirection;
var pastFirstInvertThresh = false;
var isCircumstantialInvert = false;
var targetMoveDistance;
var ghostRelativeParent;
var ghostRelativeParentInitialScroll = [];
var _silent = false;
var savedInputChecked = [];
var documentExists = typeof document !== "undefined";
var PositionGhostAbsolutely = IOS;
var CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float";
var supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div");
var supportCssPointerEvents = (function() {
  if (!documentExists) return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
})();
var _detectDirection = function _detectDirection2(el, options2) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options2), child2 = getChild(el, 1, options2), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
};
var _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
};
var _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
};
var _prepareGroup = function _prepareGroup2(options2) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options2.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options2.group = group;
};
var _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
};
var _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists && !ChromeForAndroid) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options2) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options2 = _extends({}, options2);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && (!Safari || IOS),
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options2) && (options2[name] = defaults2[name]);
  }
  _prepareGroup(options2);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options2.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options2.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options2.store && options2.store.get && this.sort(options2.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable) return;
    var _this = this, el = this.el, options2 = this.options, preventOnFilter = options2.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options2.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options2.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options2.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options2.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.preventDefault();
        return;
      }
    }
    if (options2.handle && !closest(originalTarget, options2.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options2 = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options2.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options2.chosenClass, true);
      };
      options2.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      if (options2.supportPointer) {
        on(ownerDocument, "pointerup", _this._onDrop);
        !this.nativeDraggable && on(ownerDocument, "pointercancel", _this._onDrop);
      } else {
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
      }
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options2.delay && (!options2.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        if (options2.supportPointer) {
          on(ownerDocument, "pointerup", _this._disableDelayedDrag);
          on(ownerDocument, "pointercancel", _this._disableDelayedDrag);
        } else {
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        }
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options2.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options2.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "pointerup", this._disableDelayedDrag);
    off(ownerDocument, "pointercancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options2 = this.options;
      !fallback && toggleClass(dragEl, options2.dragClass, false);
      toggleClass(dragEl, options2.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = getParentOrHost(parent));
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options2 = this.options, fallbackTolerance = options2.fallbackTolerance, fallbackOffset = options2.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options2 = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options2.ghostClass, false);
      toggleClass(ghostEl, options2.fallbackClass, true);
      toggleClass(ghostEl, options2.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options2 = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options2.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options2.setData && options2.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    window.getSelection().removeAllRanges();
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options2 = this.options, group = options2.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options2.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options2.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options2.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options2.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options2.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options2.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options2.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options2.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          if (elLastChild && elLastChild.nextSibling) {
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options2, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options2.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options2.swapThreshold, options2.invertedSwapThreshold == null ? options2.swapThreshold : options2.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling2 = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling2) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling2 : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "pointercancel", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options2 = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options2.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options2.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options2.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options2 = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options2.draggable, this.el, false)) {
        order.push(el.getAttribute(options2.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options2 = this.options;
    if (value === void 0) {
      return options2[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options2[name] = modifiedValue;
      } else {
        options2[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options2);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled) return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var firstElRect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX < childContainingRect.left - spacer || evt.clientY < firstElRect.top && evt.clientX < firstElRect.right : evt.clientY < childContainingRect.top - spacer || evt.clientY < firstElRect.bottom && evt.clientX < firstElRect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var lastElRect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX > childContainingRect.right + spacer || evt.clientY > lastElRect.bottom && evt.clientX > lastElRect.left : evt.clientY > childContainingRect.bottom + spacer || evt.clientX > lastElRect.right && evt.clientY > lastElRect.top;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild,
  expando
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array) plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options2) {
  return new Sortable(el, options2);
};
Sortable.version = version;
var autoScrolls = [];
var scrollEl;
var scrollRootEl;
var scrolling = false;
var lastAutoScrollX;
var lastAutoScrollY;
var touchEvt$1;
var pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted2(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop4() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem2 = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem2, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem2, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem2, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem2, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options2, rootEl2, isFallback) {
  if (!options2.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options2.scrollSensitivity, speed = options2.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options2.scroll;
    scrollCustomFn = options2.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval(function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options2.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling2 = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling2) {
      this.sortable.el.insertBefore(dragEl2, nextSibling2);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
var multiDragElements = [];
var multiDragClones = [];
var lastMultiDragSelect;
var multiDragSortable;
var initialFolding = false;
var folding = false;
var dragStarted = false;
var dragEl$1;
var clonesFromRect;
var clonesHidden;
function MultiDragPlugin() {
  function MultiDrag(sortable) {
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    if (!sortable.options.avoidImplicitDeselect) {
      if (sortable.options.supportPointer) {
        on(document, "pointerup", this._deselectMultiDrag);
      } else {
        on(document, "mouseup", this._deselectMultiDrag);
        on(document, "touchend", this._deselectMultiDrag);
      }
    }
    on(document, "keydown", this._checkKeyDown);
    on(document, "keyup", this._checkKeyUp);
    this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: false,
      setData: function setData(dataTransfer, dragEl2) {
        var data = "";
        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function(multiDragElement, i) {
            data += (!i ? "" : ", ") + multiDragElement.textContent;
          });
        } else {
          data = dragEl2.textContent;
        }
        dataTransfer.setData("Text", data);
      }
    };
  }
  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable, cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;
      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style["will-change"] = "";
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }
      sortable._hideClone();
      cancel();
    },
    clone: function clone2(_ref3) {
      var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;
      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl2);
          dispatchSortableEvent("clone");
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl2);
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "");
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;
      var sortable = _ref5.sortable, cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "none");
        if (_this.options.removeCloneOnHide && clone2.parentNode) {
          clone2.parentNode.removeChild(clone2);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;
      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      });
      multiDragElements = multiDragElements.sort(function(a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted2(_ref7) {
      var _this2 = this;
      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;
      if (this.options.sort) {
        sortable.captureAnimationState();
        if (this.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, "position", "absolute");
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }
      sortable.animateAll(function() {
        folding = false;
        initialFolding = false;
        if (_this2.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
        }
        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
      if (multiDragElements.length > 1) {
        multiDragElements.forEach(function(multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
      var options2 = this.options;
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        }
        initialFolding = false;
        if (options2.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute);
            parentEl2.appendChild(multiDragElement);
          });
          folding = true;
        }
        if (!isOwner) {
          if (!folding) {
            removeMultiDragElements();
          }
          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;
            activeSortable._showClone(sortable);
            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function(clone2) {
                activeSortable.addAnimationState({
                  target: clone2,
                  rect: clonesFromRect
                });
                clone2.fromRect = clonesFromRect;
                clone2.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });
      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop4(_ref12) {
      var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
      var toSortable = putSortable2 || this.sortable;
      if (!evt) return;
      var options2 = this.options, children = parentEl2.children;
      if (!dragStarted) {
        if (options2.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }
        toggleClass(dragEl$1, options2.selectedClass, !~multiDragElements.indexOf(dragEl$1));
        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "select",
            targetEl: dragEl$1,
            originalEvent: evt
          });
          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              (function() {
                var n, i;
                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }
                var filter = options2.filter;
                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i])) continue;
                  if (!closest(children[i], options2.draggable, parentEl2, false)) continue;
                  var filtered = filter && (typeof filter === "function" ? filter.call(sortable, evt, children[i], sortable) : filter.split(",").some(function(criteria) {
                    return closest(children[i], criteria.trim(), parentEl2, false);
                  }));
                  if (filtered) continue;
                  toggleClass(children[i], options2.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable,
                    rootEl: rootEl2,
                    name: "select",
                    targetEl: children[i],
                    originalEvent: evt
                  });
                }
              })();
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }
          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "deselect",
            targetEl: dragEl$1,
            originalEvent: evt
          });
        }
      }
      if (dragStarted && this.isMultiDrag) {
        folding = false;
        if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
          if (!initialFolding && options2.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();
          if (!initialFolding) {
            if (options2.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function(multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect;
                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect
                  });
                }
              });
            }
            removeMultiDragElements();
            multiDragElements.forEach(function(multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl2.appendChild(multiDragElement);
              }
              multiDragIndex++;
            });
            if (oldIndex2 === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function(multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });
              if (update) {
                dispatchSortableEvent("update");
                dispatchSortableEvent("sort");
              }
            }
          }
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }
        multiDragSortable = toSortable;
      }
      if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
        multiDragClones.forEach(function(clone2) {
          clone2.parentNode && clone2.parentNode.removeChild(clone2);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();
      off(document, "pointerup", this._deselectMultiDrag);
      off(document, "mouseup", this._deselectMultiDrag);
      off(document, "touchend", this._deselectMultiDrag);
      off(document, "keydown", this._checkKeyDown);
      off(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return;
      if (multiDragSortable !== this.sortable) return;
      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return;
      if (evt && evt.button !== 0) return;
      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: "deselect",
          targetEl: el,
          originalEvent: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;
        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
          multiDragSortable = sortable;
        }
        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index2) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index2, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;
      var oldIndicies = [], newIndicies = [];
      multiDragElements.forEach(function(multiDragElement) {
        oldIndicies.push({
          multiDragElement,
          index: multiDragElement.sortableIndex
        });
        var newIndex2;
        if (folding && multiDragElement !== dragEl$1) {
          newIndex2 = -1;
        } else if (folding) {
          newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
        } else {
          newIndex2 = index(multiDragElement);
        }
        newIndicies.push({
          multiDragElement,
          index: newIndex2
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies,
        newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();
        if (key === "ctrl") {
          key = "Control";
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }
        return key;
      }
    }
  });
}
function insertMultiDragElements(clonesInserted, rootEl2) {
  multiDragElements.forEach(function(multiDragElement, i) {
    var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(multiDragElement, target);
    } else {
      rootEl2.appendChild(multiDragElement);
    }
  });
}
function insertMultiDragClones(elementsInserted, rootEl2) {
  multiDragClones.forEach(function(clone2, i) {
    var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(clone2, target);
    } else {
      rootEl2.appendChild(clone2);
    }
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function(multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
var sortable_esm_default = Sortable;

// resources/js/components/book-sort.js
var sortOperations = {
  name(a, b) {
    const aName = a.getAttribute("data-name").trim().toLowerCase();
    const bName = b.getAttribute("data-name").trim().toLowerCase();
    return aName.localeCompare(bName);
  },
  created(a, b) {
    const aTime = Number(a.getAttribute("data-created"));
    const bTime = Number(b.getAttribute("data-created"));
    return bTime - aTime;
  },
  updated(a, b) {
    const aTime = Number(a.getAttribute("data-updated"));
    const bTime = Number(b.getAttribute("data-updated"));
    return bTime - aTime;
  },
  chaptersFirst(a, b) {
    const aType = a.getAttribute("data-type");
    const bType = b.getAttribute("data-type");
    if (aType === bType) {
      return 0;
    }
    return aType === "chapter" ? -1 : 1;
  },
  chaptersLast(a, b) {
    const aType = a.getAttribute("data-type");
    const bType = b.getAttribute("data-type");
    if (aType === bType) {
      return 0;
    }
    return aType === "chapter" ? 1 : -1;
  }
};
var moveActions = {
  up: {
    active(elem2, parent) {
      return !(elem2.previousElementSibling === null && !parent);
    },
    run(elem2, parent) {
      const newSibling = elem2.previousElementSibling || parent;
      newSibling.insertAdjacentElement("beforebegin", elem2);
    }
  },
  down: {
    active(elem2, parent) {
      return !(elem2.nextElementSibling === null && !parent);
    },
    run(elem2, parent) {
      const newSibling = elem2.nextElementSibling || parent;
      newSibling.insertAdjacentElement("afterend", elem2);
    }
  },
  next_book: {
    active(elem2, parent, book) {
      return book.nextElementSibling !== null;
    },
    run(elem2, parent, book) {
      const newList = book.nextElementSibling.querySelector("ul");
      newList.prepend(elem2);
    }
  },
  prev_book: {
    active(elem2, parent, book) {
      return book.previousElementSibling !== null;
    },
    run(elem2, parent, book) {
      const newList = book.previousElementSibling.querySelector("ul");
      newList.appendChild(elem2);
    }
  },
  next_chapter: {
    active(elem2, parent) {
      return elem2.dataset.type === "page" && this.getNextChapter(elem2, parent);
    },
    run(elem2, parent) {
      const nextChapter = this.getNextChapter(elem2, parent);
      nextChapter.querySelector("ul").prepend(elem2);
    },
    getNextChapter(elem2, parent) {
      const topLevel = parent || elem2;
      const topItems = Array.from(topLevel.parentElement.children);
      const index2 = topItems.indexOf(topLevel);
      return topItems.slice(index2 + 1).find((item) => item.dataset.type === "chapter");
    }
  },
  prev_chapter: {
    active(elem2, parent) {
      return elem2.dataset.type === "page" && this.getPrevChapter(elem2, parent);
    },
    run(elem2, parent) {
      const prevChapter = this.getPrevChapter(elem2, parent);
      prevChapter.querySelector("ul").append(elem2);
    },
    getPrevChapter(elem2, parent) {
      const topLevel = parent || elem2;
      const topItems = Array.from(topLevel.parentElement.children);
      const index2 = topItems.indexOf(topLevel);
      return topItems.slice(0, index2).reverse().find((item) => item.dataset.type === "chapter");
    }
  },
  book_end: {
    active(elem2, parent) {
      return parent || parent === null && elem2.nextElementSibling;
    },
    run(elem2, parent, book) {
      book.querySelector("ul").append(elem2);
    }
  },
  book_start: {
    active(elem2, parent) {
      return parent || parent === null && elem2.previousElementSibling;
    },
    run(elem2, parent, book) {
      book.querySelector("ul").prepend(elem2);
    }
  },
  before_chapter: {
    active(elem2, parent) {
      return parent;
    },
    run(elem2, parent) {
      parent.insertAdjacentElement("beforebegin", elem2);
    }
  },
  after_chapter: {
    active(elem2, parent) {
      return parent;
    },
    run(elem2, parent) {
      parent.insertAdjacentElement("afterend", elem2);
    }
  }
};
var BookSort = class extends Component {
  setup() {
    this.container = this.$el;
    this.sortContainer = this.$refs.sortContainer;
    this.input = this.$refs.input;
    sortable_esm_default.mount(new MultiDragPlugin());
    const initialSortBox = this.container.querySelector(".sort-box");
    this.setupBookSortable(initialSortBox);
    this.setupSortPresets();
    this.setupMoveActions();
    window.$events.listen("entity-select-change", this.bookSelect.bind(this));
  }
  /**
   * Set up the handlers for the item-level move buttons.
   */
  setupMoveActions() {
    this.container.addEventListener("click", (event) => {
      if (event.target.matches("[data-move]")) {
        const action = event.target.getAttribute("data-move");
        const sortItem = event.target.closest("[data-id]");
        this.runSortAction(sortItem, action);
      }
    });
    this.updateMoveActionStateForAll();
  }
  /**
   * Set up the handlers for the preset sort type buttons.
   */
  setupSortPresets() {
    let lastSort = "";
    let reverse = false;
    const reversibleTypes = ["name", "created", "updated"];
    this.sortContainer.addEventListener("click", (event) => {
      const sortButton = event.target.closest(".sort-box-options [data-sort]");
      if (!sortButton) return;
      event.preventDefault();
      const sortLists = sortButton.closest(".sort-box").querySelectorAll("ul");
      const sort2 = sortButton.getAttribute("data-sort");
      reverse = lastSort === sort2 ? !reverse : false;
      let sortFunction = sortOperations[sort2];
      if (reverse && reversibleTypes.includes(sort2)) {
        sortFunction = function reverseSortOperation(a, b) {
          return 0 - sortOperations[sort2](a, b);
        };
      }
      for (const list2 of sortLists) {
        const directItems = Array.from(list2.children).filter((child) => child.matches("li"));
        directItems.sort(sortFunction).forEach((sortedItem) => {
          list2.appendChild(sortedItem);
        });
      }
      lastSort = sort2;
      this.updateMapInput();
    });
  }
  /**
   * Handle book selection from the entity selector.
   * @param {Object} entityInfo
   */
  bookSelect(entityInfo) {
    const alreadyAdded = this.container.querySelector(`[data-type="book"][data-id="${entityInfo.id}"]`) !== null;
    if (alreadyAdded) return;
    const entitySortItemUrl = `${entityInfo.link}/sort-item`;
    window.$http.get(entitySortItemUrl).then((resp) => {
      const newBookContainer = htmlToDom(resp.data);
      this.sortContainer.append(newBookContainer);
      this.setupBookSortable(newBookContainer);
      this.updateMoveActionStateForAll();
      const summary = newBookContainer.querySelector("summary");
      summary.focus();
    });
  }
  /**
   * Set up the given book container element to have sortable items.
   * @param {Element} bookContainer
   */
  setupBookSortable(bookContainer) {
    const sortElems = Array.from(bookContainer.querySelectorAll(".sort-list, .sortable-page-sublist"));
    const bookGroupConfig = {
      name: "book",
      pull: ["book", "chapter"],
      put: ["book", "chapter"]
    };
    const chapterGroupConfig = {
      name: "chapter",
      pull: ["book", "chapter"],
      put(toList, fromList, draggedElem) {
        return draggedElem.getAttribute("data-type") === "page";
      }
    };
    for (const sortElem of sortElems) {
      sortable_esm_default.create(sortElem, {
        group: sortElem.classList.contains("sort-list") ? bookGroupConfig : chapterGroupConfig,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onSort: () => {
          this.ensureNoNestedChapters();
          this.updateMapInput();
          this.updateMoveActionStateForAll();
        },
        dragClass: "bg-white",
        ghostClass: "primary-background-light",
        multiDrag: true,
        multiDragKey: "Control",
        selectedClass: "sortable-selected"
      });
    }
  }
  /**
   * Handle nested chapters by moving them to the parent book.
   * Needed since sorting with multi-sort only checks group rules based on the active item,
   * not all in group, therefore need to manually check after a sort.
   * Must be done before updating the map input.
   */
  ensureNoNestedChapters() {
    const nestedChapters = this.container.querySelectorAll('[data-type="chapter"] [data-type="chapter"]');
    for (const chapter of nestedChapters) {
      const parentChapter = chapter.parentElement.closest('[data-type="chapter"]');
      parentChapter.insertAdjacentElement("afterend", chapter);
    }
  }
  /**
   * Update the input with our sort data.
   */
  updateMapInput() {
    const pageMap = this.buildEntityMap();
    this.input.value = JSON.stringify(pageMap);
  }
  /**
   * Build up a mapping of entities with their ordering and nesting.
   * @returns {Array}
   */
  buildEntityMap() {
    const entityMap = [];
    const lists = this.container.querySelectorAll(".sort-list");
    for (const list2 of lists) {
      const bookId = list2.closest('[data-type="book"]').getAttribute("data-id");
      const directChildren = Array.from(list2.children).filter((elem2) => elem2.matches('[data-type="page"], [data-type="chapter"]'));
      for (let i = 0; i < directChildren.length; i++) {
        this.addBookChildToMap(directChildren[i], i, bookId, entityMap);
      }
    }
    return entityMap;
  }
  /**
   * Parse a sort item and add it to a data-map array.
   * Parses sub0items if existing also.
   * @param {Element} childElem
   * @param {Number} index
   * @param {Number} bookId
   * @param {Array} entityMap
   */
  addBookChildToMap(childElem, index2, bookId, entityMap) {
    const type = childElem.getAttribute("data-type");
    const parentChapter = false;
    const childId = childElem.getAttribute("data-id");
    entityMap.push({
      id: childId,
      sort: index2,
      parentChapter,
      type,
      book: bookId
    });
    const subPages = childElem.querySelectorAll('[data-type="page"]');
    for (let i = 0; i < subPages.length; i++) {
      entityMap.push({
        id: subPages[i].getAttribute("data-id"),
        sort: i,
        parentChapter: childId,
        type: "page",
        book: bookId
      });
    }
  }
  /**
   * Run the given sort action up the provided sort item.
   * @param {Element} item
   * @param {String} action
   */
  runSortAction(item, action) {
    const parentItem = item.parentElement.closest("li[data-id]");
    const parentBook = item.parentElement.closest('[data-type="book"]');
    moveActions[action].run(item, parentItem, parentBook);
    this.updateMapInput();
    this.updateMoveActionStateForAll();
    item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    item.focus();
  }
  /**
   * Update the state of the available move actions on this item.
   * @param {Element} item
   */
  updateMoveActionState(item) {
    const parentItem = item.parentElement.closest("li[data-id]");
    const parentBook = item.parentElement.closest('[data-type="book"]');
    for (const [action, functions] of Object.entries(moveActions)) {
      const moveButton = item.querySelector(`[data-move="${action}"]`);
      moveButton.disabled = !functions.active(item, parentItem, parentBook);
    }
  }
  updateMoveActionStateForAll() {
    const items = this.container.querySelectorAll('[data-type="chapter"],[data-type="page"]');
    for (const item of items) {
      this.updateMoveActionState(item);
    }
  }
};

// resources/js/services/animations.js
var animateStylesCleanupMap = /* @__PURE__ */ new WeakMap();
function animateStyles(element, styles, animTime = 400, onComplete = null) {
  const styleNames = Object.keys(styles);
  for (const style of styleNames) {
    element.style[style] = styles[style][0];
  }
  const cleanup = () => {
    for (const style of styleNames) {
      element.style[style] = null;
    }
    element.style.transition = null;
    element.removeEventListener("transitionend", cleanup);
    animateStylesCleanupMap.delete(element);
    if (onComplete) onComplete();
  };
  setTimeout(() => {
    element.style.transition = `all ease-in-out ${animTime}ms`;
    for (const style of styleNames) {
      element.style[style] = styles[style][1];
    }
    element.addEventListener("transitionend", cleanup);
    animateStylesCleanupMap.set(element, cleanup);
  }, 15);
}
function cleanupExistingElementAnimation(element) {
  if (animateStylesCleanupMap.has(element)) {
    const oldCleanup = animateStylesCleanupMap.get(element);
    oldCleanup();
  }
}
function fadeIn(element, animTime = 400, onComplete = null) {
  cleanupExistingElementAnimation(element);
  element.style.display = "block";
  animateStyles(element, {
    opacity: ["0", "1"]
  }, animTime, () => {
    if (onComplete) onComplete();
  });
}
function fadeOut(element, animTime = 400, onComplete = null) {
  cleanupExistingElementAnimation(element);
  animateStyles(element, {
    opacity: ["1", "0"]
  }, animTime, () => {
    element.style.display = "none";
    if (onComplete) onComplete();
  });
}
function slideUp(element, animTime = 400) {
  cleanupExistingElementAnimation(element);
  const currentHeight = element.getBoundingClientRect().height;
  const computedStyles = getComputedStyle(element);
  const currentPaddingTop = computedStyles.getPropertyValue("padding-top");
  const currentPaddingBottom = computedStyles.getPropertyValue("padding-bottom");
  const animStyles = {
    maxHeight: [`${currentHeight}px`, "0px"],
    overflow: ["hidden", "hidden"],
    paddingTop: [currentPaddingTop, "0px"],
    paddingBottom: [currentPaddingBottom, "0px"]
  };
  animateStyles(element, animStyles, animTime, () => {
    element.style.display = "none";
  });
}
function slideDown(element, animTime = 400) {
  cleanupExistingElementAnimation(element);
  element.style.display = "block";
  const targetHeight = element.getBoundingClientRect().height;
  const computedStyles = getComputedStyle(element);
  const targetPaddingTop = computedStyles.getPropertyValue("padding-top");
  const targetPaddingBottom = computedStyles.getPropertyValue("padding-bottom");
  const animStyles = {
    maxHeight: ["0px", `${targetHeight}px`],
    overflow: ["hidden", "hidden"],
    paddingTop: ["0px", targetPaddingTop],
    paddingBottom: ["0px", targetPaddingBottom]
  };
  animateStyles(element, animStyles, animTime);
}
function transitionHeight(element, animTime = 400) {
  const startHeight = element.getBoundingClientRect().height;
  const initialComputedStyles = getComputedStyle(element);
  const startPaddingTop = initialComputedStyles.getPropertyValue("padding-top");
  const startPaddingBottom = initialComputedStyles.getPropertyValue("padding-bottom");
  return () => {
    cleanupExistingElementAnimation(element);
    const targetHeight = element.getBoundingClientRect().height;
    const computedStyles = getComputedStyle(element);
    const targetPaddingTop = computedStyles.getPropertyValue("padding-top");
    const targetPaddingBottom = computedStyles.getPropertyValue("padding-bottom");
    const animStyles = {
      height: [`${startHeight}px`, `${targetHeight}px`],
      overflow: ["hidden", "hidden"],
      paddingTop: [startPaddingTop, targetPaddingTop],
      paddingBottom: [startPaddingBottom, targetPaddingBottom]
    };
    animateStyles(element, animStyles, animTime);
  };
}

// resources/js/components/chapter-contents.js
var ChapterContents = class extends Component {
  setup() {
    this.list = this.$refs.list;
    this.toggle = this.$refs.toggle;
    this.isOpen = this.toggle.classList.contains("open");
    this.toggle.addEventListener("click", this.click.bind(this));
  }
  open() {
    this.toggle.classList.add("open");
    this.toggle.setAttribute("aria-expanded", "true");
    slideDown(this.list, 180);
    this.isOpen = true;
  }
  close() {
    this.toggle.classList.remove("open");
    this.toggle.setAttribute("aria-expanded", "false");
    slideUp(this.list, 180);
    this.isOpen = false;
  }
  click(event) {
    event.preventDefault();
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
};

// resources/js/components/code-editor.js
var CodeEditor = class extends Component {
  constructor() {
    super(...arguments);
    /**
     * @type {null|SimpleEditorInterface}
     */
    __publicField(this, "editor", null);
    /**
     * @type {?Function}
     */
    __publicField(this, "saveCallback", null);
    /**
     * @type {?Function}
     */
    __publicField(this, "cancelCallback", null);
    __publicField(this, "history", {});
    __publicField(this, "historyKey", "code_history");
  }
  setup() {
    this.container = this.$refs.container;
    this.popup = this.$el;
    this.editorInput = this.$refs.editor;
    this.languageButtons = this.$manyRefs.languageButton;
    this.languageOptionsContainer = this.$refs.languageOptionsContainer;
    this.saveButton = this.$refs.saveButton;
    this.languageInput = this.$refs.languageInput;
    this.historyDropDown = this.$refs.historyDropDown;
    this.historyList = this.$refs.historyList;
    this.favourites = new Set(this.$opts.favourites.split(","));
    this.setupListeners();
    this.setupFavourites();
  }
  setupListeners() {
    this.container.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "Enter") {
        this.save();
      }
    });
    onSelect(this.languageButtons, (event) => {
      const language = event.target.dataset.lang;
      this.languageInput.value = language;
      this.languageInputChange(language);
    });
    onEnterPress(this.languageInput, () => this.save());
    this.languageInput.addEventListener("input", () => this.languageInputChange(this.languageInput.value));
    onSelect(this.saveButton, () => this.save());
    onChildEvent(this.historyList, "button", "click", (event, elem2) => {
      event.preventDefault();
      const historyTime = elem2.dataset.time;
      if (this.editor) {
        this.editor.setContent(this.history[historyTime]);
      }
    });
  }
  setupFavourites() {
    for (const button of this.languageButtons) {
      this.setupFavouritesForButton(button);
    }
    this.sortLanguageList();
  }
  /**
   * @param {HTMLButtonElement} button
   */
  setupFavouritesForButton(button) {
    const language = button.dataset.lang;
    let isFavorite = this.favourites.has(language);
    button.setAttribute("data-favourite", isFavorite ? "true" : "false");
    onChildEvent(button.parentElement, ".lang-option-favorite-toggle", "click", () => {
      isFavorite = !isFavorite;
      if (isFavorite) {
        this.favourites.add(language);
      } else {
        this.favourites.delete(language);
      }
      button.setAttribute("data-favourite", isFavorite ? "true" : "false");
      window.$http.patch("/preferences/update-code-language-favourite", {
        language,
        active: isFavorite
      });
      this.sortLanguageList();
      if (isFavorite) {
        button.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
  }
  sortLanguageList() {
    const sortedParents = this.languageButtons.sort((a, b) => {
      const aFav = a.dataset.favourite === "true";
      const bFav = b.dataset.favourite === "true";
      if (aFav && !bFav) {
        return -1;
      }
      if (bFav && !aFav) {
        return 1;
      }
      return a.dataset.lang > b.dataset.lang ? 1 : -1;
    }).map((button) => button.parentElement);
    for (const parent of sortedParents) {
      this.languageOptionsContainer.append(parent);
    }
  }
  save() {
    if (this.saveCallback) {
      this.saveCallback(this.editor.getContent(), this.languageInput.value);
    }
    this.hide();
  }
  async open(code2, language, saveCallback, cancelCallback) {
    this.languageInput.value = language;
    this.saveCallback = saveCallback;
    this.cancelCallback = cancelCallback;
    await this.show();
    this.languageInputChange(language);
    this.editor.setContent(code2);
  }
  async show() {
    const Code = await window.importVersioned("code");
    if (!this.editor) {
      this.editor = Code.popupEditor(this.editorInput, this.languageInput.value);
    }
    this.loadHistory();
    this.getPopup().show(() => {
      this.editor.focus();
    }, () => {
      this.addHistory();
      if (this.cancelCallback) {
        this.cancelCallback();
      }
    });
  }
  hide() {
    this.getPopup().hide();
    this.addHistory();
  }
  /**
   * @returns {Popup}
   */
  getPopup() {
    return window.$components.firstOnElement(this.popup, "popup");
  }
  async updateEditorMode(language) {
    this.editor.setMode(language, this.editor.getContent());
  }
  languageInputChange(language) {
    this.updateEditorMode(language);
    const inputLang = language.toLowerCase();
    for (const link2 of this.languageButtons) {
      const lang = link2.dataset.lang.toLowerCase().trim();
      const isMatch = inputLang === lang;
      link2.classList.toggle("active", isMatch);
      if (isMatch) {
        link2.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }
  loadHistory() {
    this.history = JSON.parse(window.sessionStorage.getItem(this.historyKey) || "{}");
    const historyKeys = Object.keys(this.history).reverse();
    this.historyDropDown.classList.toggle("hidden", historyKeys.length === 0);
    this.historyList.innerHTML = historyKeys.map((key) => {
      const localTime = new Date(parseInt(key, 10)).toLocaleTimeString();
      return `<li><button type="button" data-time="${key}" class="text-item">${localTime}</button></li>`;
    }).join("");
  }
  addHistory() {
    if (!this.editor) return;
    const code2 = this.editor.getContent();
    if (!code2) return;
    const lastHistoryKey = Object.keys(this.history).pop();
    if (this.history[lastHistoryKey] === code2) return;
    this.history[String(Date.now())] = code2;
    const historyString = JSON.stringify(this.history);
    window.sessionStorage.setItem(this.historyKey, historyString);
  }
};

// resources/js/components/code-highlighter.js
var CodeHighlighter = class extends Component {
  setup() {
    const container = this.$el;
    const codeBlocks = container.querySelectorAll("pre");
    if (codeBlocks.length > 0) {
      window.importVersioned("code").then((Code) => {
        Code.highlightWithin(container);
      });
    }
  }
};

// resources/js/components/code-textarea.js
var CodeTextarea = class extends Component {
  async setup() {
    const { mode } = this.$opts;
    const Code = await window.importVersioned("code");
    Code.inlineEditor(this.$el, mode);
  }
};

// resources/js/components/collapsible.js
var Collapsible = class extends Component {
  setup() {
    this.container = this.$el;
    this.trigger = this.$refs.trigger;
    this.content = this.$refs.content;
    if (this.trigger) {
      this.trigger.addEventListener("click", this.toggle.bind(this));
      this.openIfContainsError();
    }
  }
  open() {
    this.container.classList.add("open");
    this.trigger.setAttribute("aria-expanded", "true");
    slideDown(this.content, 300);
  }
  close() {
    this.container.classList.remove("open");
    this.trigger.setAttribute("aria-expanded", "false");
    slideUp(this.content, 300);
  }
  toggle() {
    if (this.container.classList.contains("open")) {
      this.close();
    } else {
      this.open();
    }
  }
  openIfContainsError() {
    const error3 = this.content.querySelector(".text-neg.text-small");
    if (error3) {
      this.open();
    }
  }
};

// resources/js/components/confirm-dialog.js
var ConfirmDialog = class extends Component {
  setup() {
    this.container = this.$el;
    this.confirmButton = this.$refs.confirm;
    this.res = null;
    onSelect(this.confirmButton, () => {
      this.sendResult(true);
      this.getPopup().hide();
    });
  }
  show() {
    this.getPopup().show(null, () => {
      this.sendResult(false);
    });
    return new Promise((res) => {
      this.res = res;
    });
  }
  /**
   * @returns {Popup}
   */
  getPopup() {
    return window.$components.firstOnElement(this.container, "popup");
  }
  /**
   * @param {Boolean} result
   */
  sendResult(result) {
    if (this.res) {
      this.res(result);
      this.res = null;
    }
  }
};

// resources/js/components/custom-checkbox.js
var CustomCheckbox = class extends Component {
  setup() {
    this.container = this.$el;
    this.checkbox = this.container.querySelector("input[type=checkbox]");
    this.display = this.container.querySelector('[role="checkbox"]');
    this.checkbox.addEventListener("change", this.stateChange.bind(this));
    this.container.addEventListener("keydown", this.onKeyDown.bind(this));
  }
  onKeyDown(event) {
    const isEnterOrSpace = event.key === " " || event.key === "Enter";
    if (isEnterOrSpace) {
      event.preventDefault();
      this.toggle();
    }
  }
  toggle() {
    this.checkbox.checked = !this.checkbox.checked;
    this.checkbox.dispatchEvent(new Event("change"));
    this.stateChange();
  }
  stateChange() {
    const checked = this.checkbox.checked ? "true" : "false";
    this.display.setAttribute("aria-checked", checked);
  }
};

// resources/js/components/details-highlighter.js
var DetailsHighlighter = class extends Component {
  setup() {
    this.container = this.$el;
    this.dealtWith = false;
    this.container.addEventListener("toggle", this.onToggle.bind(this));
  }
  onToggle() {
    if (this.dealtWith) return;
    if (this.container.querySelector("pre")) {
      window.importVersioned("code").then((Code) => {
        Code.highlightWithin(this.container);
      });
    }
    this.dealtWith = true;
  }
};

// resources/js/components/dropdown.js
var Dropdown = class extends Component {
  setup() {
    this.container = this.$el;
    this.menu = this.$refs.menu;
    this.toggle = this.$refs.toggle;
    this.moveMenu = this.$opts.moveMenu;
    this.bubbleEscapes = this.$opts.bubbleEscapes === "true";
    this.direction = document.dir === "rtl" ? "right" : "left";
    this.body = document.body;
    this.showing = false;
    this.hide = this.hide.bind(this);
    this.setupListeners();
  }
  show(event = null) {
    this.hideAll();
    this.menu.style.display = "block";
    this.menu.classList.add("anim", "menuIn");
    this.toggle.setAttribute("aria-expanded", "true");
    const menuOriginalRect = this.menu.getBoundingClientRect();
    let heightOffset = 0;
    const toggleHeight = this.toggle.getBoundingClientRect().height;
    const dropUpwards = menuOriginalRect.bottom > window.innerHeight;
    const containerRect = this.container.getBoundingClientRect();
    if (this.moveMenu) {
      this.body.appendChild(this.menu);
      this.menu.style.position = "fixed";
      this.menu.style.width = `${menuOriginalRect.width}px`;
      this.menu.style.left = `${menuOriginalRect.left}px`;
      if (dropUpwards) {
        heightOffset = window.innerHeight - menuOriginalRect.top - toggleHeight / 2;
      } else {
        heightOffset = menuOriginalRect.top;
      }
    }
    if (dropUpwards) {
      this.menu.style.top = "initial";
      this.menu.style.bottom = `${heightOffset}px`;
      const maxHeight = window.innerHeight - 40 - (window.innerHeight - containerRect.bottom);
      this.menu.style.maxHeight = `${Math.floor(maxHeight)}px`;
    } else {
      this.menu.style.top = `${heightOffset}px`;
      this.menu.style.bottom = "initial";
      const maxHeight = window.innerHeight - 40 - containerRect.top;
      this.menu.style.maxHeight = `${Math.floor(maxHeight)}px`;
    }
    this.menu.addEventListener("mouseleave", this.hide);
    window.addEventListener("click", (clickEvent) => {
      if (!this.menu.contains(clickEvent.target)) {
        this.hide();
      }
    });
    const input = this.menu.querySelector("input");
    if (input !== null) input.focus();
    this.showing = true;
    const showEvent = new Event("show");
    this.container.dispatchEvent(showEvent);
    if (event) {
      event.stopPropagation();
    }
  }
  hideAll() {
    for (const dropdown of window.$components.get("dropdown")) {
      dropdown.hide();
    }
  }
  hide() {
    this.menu.style.display = "none";
    this.menu.classList.remove("anim", "menuIn");
    this.toggle.setAttribute("aria-expanded", "false");
    this.menu.style.top = "";
    this.menu.style.bottom = "";
    this.menu.style.maxHeight = "";
    if (this.moveMenu) {
      this.menu.style.position = "";
      this.menu.style[this.direction] = "";
      this.menu.style.width = "";
      this.menu.style.left = "";
      this.container.appendChild(this.menu);
    }
    this.showing = false;
  }
  setupListeners() {
    const keyboardNavHandler = new KeyboardNavigationHandler(this.container, (event) => {
      this.hide();
      this.toggle.focus();
      if (!this.bubbleEscapes) {
        event.stopPropagation();
      }
    }, (event) => {
      if (event.target.nodeName === "INPUT") {
        event.preventDefault();
        event.stopPropagation();
      }
      this.hide();
    });
    if (this.moveMenu) {
      keyboardNavHandler.shareHandlingToEl(this.menu);
    }
    this.container.addEventListener("click", (event) => {
      const possibleChildren = Array.from(this.menu.querySelectorAll("a"));
      if (possibleChildren.includes(event.target)) {
        this.hide();
      }
    });
    onSelect(this.toggle, (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.show(event);
      if (event instanceof KeyboardEvent) {
        keyboardNavHandler.focusNext();
      }
    });
  }
};

// resources/js/components/dropdown-search.js
var DropdownSearch = class extends Component {
  setup() {
    this.elem = this.$el;
    this.searchInput = this.$refs.searchInput;
    this.loadingElem = this.$refs.loading;
    this.listContainerElem = this.$refs.listContainer;
    this.localSearchSelector = this.$opts.localSearchSelector;
    this.url = this.$opts.url;
    this.elem.addEventListener("show", this.onShow.bind(this));
    this.searchInput.addEventListener("input", this.onSearch.bind(this));
    this.runAjaxSearch = debounce(this.runAjaxSearch, 300, false);
  }
  onShow() {
    this.loadList();
  }
  onSearch() {
    const input = this.searchInput.value.toLowerCase().trim();
    if (this.localSearchSelector) {
      this.runLocalSearch(input);
    } else {
      this.toggleLoading(true);
      this.listContainerElem.innerHTML = "";
      this.runAjaxSearch(input);
    }
  }
  runAjaxSearch(searchTerm) {
    this.loadList(searchTerm);
  }
  runLocalSearch(searchTerm) {
    const listItems = this.listContainerElem.querySelectorAll(this.localSearchSelector);
    for (const listItem of listItems) {
      const match2 = !searchTerm || listItem.textContent.toLowerCase().includes(searchTerm);
      listItem.style.display = match2 ? "flex" : "none";
      listItem.classList.toggle("hidden", !match2);
    }
  }
  async loadList(searchTerm = "") {
    this.listContainerElem.innerHTML = "";
    this.toggleLoading(true);
    try {
      const resp = await window.$http.get(this.getAjaxUrl(searchTerm));
      const animate = transitionHeight(this.listContainerElem, 80);
      this.listContainerElem.innerHTML = resp.data;
      animate();
    } catch (err) {
      console.error(err);
    }
    this.toggleLoading(false);
    if (this.localSearchSelector) {
      this.onSearch();
    }
  }
  getAjaxUrl(searchTerm = null) {
    if (!searchTerm) {
      return this.url;
    }
    const joiner = this.url.includes("?") ? "&" : "?";
    return `${this.url}${joiner}search=${encodeURIComponent(searchTerm)}`;
  }
  toggleLoading(show2 = false) {
    this.loadingElem.style.display = show2 ? "block" : "none";
  }
};

// resources/js/services/clipboard.js
var Clipboard = class {
  /**
   * Constructor
   * @param {DataTransfer} clipboardData
   */
  constructor(clipboardData) {
    this.data = clipboardData;
  }
  /**
   * Check if the clipboard has any items.
   */
  hasItems() {
    return Boolean(this.data) && Boolean(this.data.types) && this.data.types.length > 0;
  }
  /**
   * Check if the given event has tabular-looking data in the clipboard.
   * @return {boolean}
   */
  containsTabularData() {
    const rtfData = this.data.getData("text/rtf");
    return rtfData && rtfData.includes("\\trowd");
  }
  /**
   * Get the images that are in the clipboard data.
   * @return {Array<File>}
   */
  getImages() {
    const { types } = this.data;
    const images = [];
    for (const type of types) {
      if (type.includes("image")) {
        const item = this.data.getData(type);
        images.push(item.getAsFile());
      }
    }
    const imageFiles = this.getFiles().filter((f) => f.type.includes("image"));
    images.push(...imageFiles);
    return images;
  }
  /**
   * Get the files included in the clipboard data.
   * @return {File[]}
   */
  getFiles() {
    const { files } = this.data;
    return [...files];
  }
};
async function copyTextToClipboard(text2) {
  if (window.isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(text2);
    return;
  }
  const tempInput = document.createElement("textarea");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px;";
  tempInput.value = text2;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// resources/js/components/dropzone.js
var Dropzone = class extends Component {
  setup() {
    this.container = this.$el;
    this.statusArea = this.$refs.statusArea;
    this.dropTarget = this.$refs.dropTarget;
    this.selectButtons = this.$manyRefs.selectButton || [];
    this.isActive = true;
    this.url = this.$opts.url;
    this.method = (this.$opts.method || "post").toUpperCase();
    this.successMessage = this.$opts.successMessage;
    this.errorMessage = this.$opts.errorMessage;
    this.uploadLimitMb = Number(this.$opts.uploadLimit);
    this.uploadLimitMessage = this.$opts.uploadLimitMessage;
    this.zoneText = this.$opts.zoneText;
    this.fileAcceptTypes = this.$opts.fileAccept;
    this.allowMultiple = this.$opts.allowMultiple === "true";
    this.setupListeners();
  }
  /**
   * Public method to allow external disabling/enabling of this drag+drop dropzone.
   * @param {Boolean} active
   */
  toggleActive(active) {
    this.isActive = active;
  }
  setupListeners() {
    onSelect(this.selectButtons, this.manualSelectHandler.bind(this));
    this.setupDropTargetHandlers();
  }
  setupDropTargetHandlers() {
    let depth = 0;
    const reset = () => {
      this.hideOverlay();
      depth = 0;
    };
    this.dropTarget.addEventListener("dragenter", (event) => {
      event.preventDefault();
      depth += 1;
      if (depth === 1 && this.isActive) {
        this.showOverlay();
      }
    });
    this.dropTarget.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    this.dropTarget.addEventListener("dragend", reset);
    this.dropTarget.addEventListener("dragleave", () => {
      depth -= 1;
      if (depth === 0) {
        reset();
      }
    });
    this.dropTarget.addEventListener("drop", (event) => {
      event.preventDefault();
      reset();
      if (!this.isActive) {
        return;
      }
      const clipboard = new Clipboard(event.dataTransfer);
      const files = clipboard.getFiles();
      for (const file of files) {
        this.createUploadFromFile(file);
      }
    });
  }
  manualSelectHandler() {
    const input = elem("input", {
      type: "file",
      style: "left: -400px; visibility: hidden; position: fixed;",
      accept: this.fileAcceptTypes,
      multiple: this.allowMultiple ? "" : null
    });
    this.container.append(input);
    input.click();
    input.addEventListener("change", () => {
      for (const file of input.files) {
        this.createUploadFromFile(file);
      }
      input.remove();
    });
  }
  showOverlay() {
    const overlay = this.dropTarget.querySelector(".dropzone-overlay");
    if (!overlay) {
      const zoneElem = elem("div", { class: "dropzone-overlay" }, [this.zoneText]);
      this.dropTarget.append(zoneElem);
    }
  }
  hideOverlay() {
    const overlay = this.dropTarget.querySelector(".dropzone-overlay");
    if (overlay) {
      overlay.remove();
    }
  }
  /**
   * @param {File} file
   * @return {Upload}
   */
  createUploadFromFile(file) {
    const {
      dom,
      status,
      progress,
      dismiss
    } = this.createDomForFile(file);
    this.statusArea.append(dom);
    const component = this;
    const upload2 = {
      file,
      dom,
      updateProgress(percentComplete) {
        progress.textContent = `${percentComplete}%`;
        progress.style.width = `${percentComplete}%`;
      },
      markError(message) {
        status.setAttribute("data-status", "error");
        status.textContent = message;
        removeLoading(dom);
        this.updateProgress(100);
      },
      markSuccess(message) {
        status.setAttribute("data-status", "success");
        status.textContent = message;
        removeLoading(dom);
        setTimeout(dismiss, 2400);
        component.$emit("upload-success", {
          name: file.name
        });
      }
    };
    if (file.size > this.uploadLimitMb * 1e6) {
      upload2.markError(this.uploadLimitMessage);
      return upload2;
    }
    this.startXhrForUpload(upload2);
    return upload2;
  }
  /**
   * @param {Upload} upload
   */
  startXhrForUpload(upload2) {
    const formData = new FormData();
    formData.append("file", upload2.file, upload2.file.name);
    if (this.method !== "POST") {
      formData.append("_method", this.method);
    }
    const component = this;
    const req = window.$http.createXMLHttpRequest("POST", this.url, {
      error() {
        upload2.markError(component.errorMessage);
      },
      readystatechange() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          upload2.markSuccess(component.successMessage);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status >= 400) {
          const content = this.responseText;
          const data = content.startsWith("{") ? JSON.parse(content) : { message: content };
          const message = data?.message || data?.error || content;
          upload2.markError(message);
        }
      }
    });
    req.upload.addEventListener("progress", (evt) => {
      const percent = Math.min(Math.ceil(evt.loaded / evt.total * 100), 100);
      upload2.updateProgress(percent);
    });
    req.setRequestHeader("Accept", "application/json");
    req.send(formData);
  }
  /**
   * @param {File} file
   * @return {{image: Element, dom: Element, progress: Element, status: Element, dismiss: function}}
   */
  createDomForFile(file) {
    const image2 = elem("img", { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9.224 7.373a.924.924 0 0 0-.92.925l-.006 7.404c0 .509.412.925.921.925h5.557a.928.928 0 0 0 .926-.925v-5.553l-2.777-2.776Zm3.239 3.239V8.067l2.545 2.545z' style='fill:%23000;fill-opacity:.75'/%3E%3C/svg%3E" });
    const status = elem("div", { class: "dropzone-file-item-status" }, []);
    const progress = elem("div", { class: "dropzone-file-item-progress" });
    const imageWrap = elem("div", { class: "dropzone-file-item-image-wrap" }, [image2]);
    const dom = elem("div", { class: "dropzone-file-item" }, [
      imageWrap,
      elem("div", { class: "dropzone-file-item-text-wrap" }, [
        elem("div", { class: "dropzone-file-item-label" }, [file.name]),
        getLoading(),
        status
      ]),
      progress
    ]);
    if (file.type.startsWith("image/")) {
      image2.src = URL.createObjectURL(file);
    }
    const dismiss = () => {
      dom.classList.add("dismiss");
      dom.addEventListener("animationend", () => {
        dom.remove();
      });
    };
    dom.addEventListener("click", dismiss);
    return {
      dom,
      progress,
      status,
      dismiss
    };
  }
};

// resources/js/components/editor-toolbox.js
var EditorToolbox = class extends Component {
  setup() {
    this.container = this.$el;
    this.buttons = this.$manyRefs.tabButton;
    this.contentElements = this.$manyRefs.tabContent;
    this.toggleButton = this.$refs.toggle;
    this.editorWrapEl = this.container.closest(".page-editor");
    this.setupListeners();
    this.setActiveTab(this.contentElements[0].dataset.tabContent);
  }
  setupListeners() {
    this.toggleButton.addEventListener("click", () => this.toggle());
    this.container.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (this.buttons.includes(button)) {
        const name = button.dataset.tab;
        this.setActiveTab(name, true);
      }
    });
  }
  toggle() {
    this.container.classList.toggle("open");
    const isOpen = this.container.classList.contains("open");
    this.toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    this.editorWrapEl.classList.toggle("toolbox-open", isOpen);
  }
  setActiveTab(tabName, openToolbox = false) {
    for (const button of this.buttons) {
      button.classList.remove("active");
      const bName = button.dataset.tab;
      if (bName === tabName) button.classList.add("active");
    }
    for (const contentEl of this.contentElements) {
      contentEl.style.display = "none";
      const cName = contentEl.dataset.tabContent;
      if (cName === tabName) contentEl.style.display = "block";
    }
    if (openToolbox && !this.container.classList.contains("open")) {
      this.toggle();
    }
  }
};

// resources/js/components/entity-permissions.js
var EntityPermissions = class extends Component {
  setup() {
    this.container = this.$el;
    this.entityType = this.$opts.entityType;
    this.everyoneInheritToggle = this.$refs.everyoneInherit;
    this.roleSelect = this.$refs.roleSelect;
    this.roleContainer = this.$refs.roleContainer;
    this.setupListeners();
  }
  setupListeners() {
    this.everyoneInheritToggle.addEventListener("change", (event) => {
      const inherit = event.target.checked;
      const permissions = document.querySelectorAll('input[name^="permissions[0]["]');
      for (const permission of permissions) {
        permission.disabled = inherit;
        permission.checked = false;
      }
    });
    this.container.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button && button.dataset.roleId) {
        this.removeRowOnButtonClick(button);
      }
    });
    this.roleSelect.addEventListener("change", () => {
      const roleId = this.roleSelect.value;
      if (roleId) {
        this.addRoleRow(roleId);
      }
    });
  }
  async addRoleRow(roleId) {
    this.roleSelect.disabled = true;
    const option2 = this.roleSelect.querySelector(`option[value="${roleId}"]`);
    if (option2) {
      option2.remove();
    }
    const resp = await window.$http.get(`/permissions/form-row/${this.entityType}/${roleId}`);
    const row = htmlToDom(resp.data);
    this.roleContainer.append(row);
    this.roleSelect.disabled = false;
  }
  removeRowOnButtonClick(button) {
    const row = button.closest(".item-list-row");
    const { roleId } = button.dataset;
    const { roleName } = button.dataset;
    const option2 = document.createElement("option");
    option2.value = roleId;
    option2.textContent = roleName;
    this.roleSelect.append(option2);
    row.remove();
  }
};

// resources/js/components/entity-search.js
var EntitySearch = class extends Component {
  setup() {
    this.entityId = this.$opts.entityId;
    this.entityType = this.$opts.entityType;
    this.contentView = this.$refs.contentView;
    this.searchView = this.$refs.searchView;
    this.searchResults = this.$refs.searchResults;
    this.searchInput = this.$refs.searchInput;
    this.searchForm = this.$refs.searchForm;
    this.clearButton = this.$refs.clearButton;
    this.loadingBlock = this.$refs.loadingBlock;
    this.setupListeners();
  }
  setupListeners() {
    this.searchInput.addEventListener("change", this.runSearch.bind(this));
    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.runSearch();
    });
    onSelect(this.clearButton, this.clearSearch.bind(this));
  }
  runSearch() {
    const term = this.searchInput.value.trim();
    if (term.length === 0) {
      this.clearSearch();
      return;
    }
    this.searchView.classList.remove("hidden");
    this.contentView.classList.add("hidden");
    this.loadingBlock.classList.remove("hidden");
    const url = window.baseUrl(`/search/${this.entityType}/${this.entityId}`);
    window.$http.get(url, { term }).then((resp) => {
      this.searchResults.innerHTML = resp.data;
    }).catch(console.error).then(() => {
      this.loadingBlock.classList.add("hidden");
    });
  }
  clearSearch() {
    this.searchView.classList.add("hidden");
    this.contentView.classList.remove("hidden");
    this.loadingBlock.classList.add("hidden");
    this.searchInput.value = "";
  }
};

// resources/js/components/entity-selector.js
var EntitySelector = class extends Component {
  setup() {
    this.elem = this.$el;
    this.input = this.$refs.input;
    this.searchInput = this.$refs.search;
    this.loading = this.$refs.loading;
    this.resultsContainer = this.$refs.results;
    this.searchOptions = {
      entityTypes: this.$opts.entityTypes || "page,book,chapter",
      entityPermission: this.$opts.entityPermission || "view",
      searchEndpoint: this.$opts.searchEndpoint || "",
      initialValue: this.searchInput.value || ""
    };
    this.search = "";
    this.lastClick = 0;
    this.setupListeners();
    this.showLoading();
    if (this.searchOptions.searchEndpoint) {
      this.initialLoad();
    }
  }
  /**
   * @param {EntitySelectorSearchOptions} options
   */
  configureSearchOptions(options2) {
    Object.assign(this.searchOptions, options2);
    this.reset();
    this.searchInput.value = this.searchOptions.initialValue;
  }
  setupListeners() {
    this.elem.addEventListener("click", this.onClick.bind(this));
    let lastSearch = 0;
    this.searchInput.addEventListener("input", () => {
      lastSearch = Date.now();
      this.showLoading();
      setTimeout(() => {
        if (Date.now() - lastSearch < 199) return;
        this.searchEntities(this.searchInput.value);
      }, 200);
    });
    this.searchInput.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) event.preventDefault();
    });
    onChildEvent(this.$el, "[data-entity-type]", "keydown", (event) => {
      if (event.ctrlKey && event.code === "Enter") {
        const form = this.$el.closest("form");
        if (form) {
          form.submit();
          event.preventDefault();
          return;
        }
      }
      if (event.code === "ArrowDown") {
        this.focusAdjacent(true);
      }
      if (event.code === "ArrowUp") {
        this.focusAdjacent(false);
      }
    });
    this.searchInput.addEventListener("keydown", (event) => {
      if (event.code === "ArrowDown") {
        this.focusAdjacent(true);
      }
    });
  }
  focusAdjacent(forward = true) {
    const items = Array.from(this.resultsContainer.querySelectorAll("[data-entity-type]"));
    const selectedIndex = items.indexOf(document.activeElement);
    const newItem = items[selectedIndex + (forward ? 1 : -1)] || items[0];
    if (newItem) {
      newItem.focus();
    }
  }
  reset() {
    this.searchInput.value = "";
    this.showLoading();
    this.initialLoad();
  }
  focusSearch() {
    this.searchInput.focus();
  }
  showLoading() {
    this.loading.style.display = "block";
    this.resultsContainer.style.display = "none";
  }
  hideLoading() {
    this.loading.style.display = "none";
    this.resultsContainer.style.display = "block";
  }
  initialLoad() {
    if (!this.searchOptions.searchEndpoint) {
      throw new Error("Search endpoint not set for entity-selector load");
    }
    if (this.searchOptions.initialValue) {
      this.searchEntities(this.searchOptions.initialValue);
      return;
    }
    window.$http.get(this.searchUrl()).then((resp) => {
      this.resultsContainer.innerHTML = resp.data;
      this.hideLoading();
    });
  }
  searchUrl() {
    const query = `types=${encodeURIComponent(this.searchOptions.entityTypes)}&permission=${encodeURIComponent(this.searchOptions.entityPermission)}`;
    return `${this.searchOptions.searchEndpoint}?${query}`;
  }
  searchEntities(searchTerm) {
    if (!this.searchOptions.searchEndpoint) {
      throw new Error("Search endpoint not set for entity-selector load");
    }
    this.input.value = "";
    const url = `${this.searchUrl()}&term=${encodeURIComponent(searchTerm)}`;
    window.$http.get(url).then((resp) => {
      this.resultsContainer.innerHTML = resp.data;
      this.hideLoading();
    });
  }
  isDoubleClick() {
    const now = Date.now();
    const answer = now - this.lastClick < 300;
    this.lastClick = now;
    return answer;
  }
  onClick(event) {
    const listItem = event.target.closest("[data-entity-type]");
    if (listItem) {
      event.preventDefault();
      event.stopPropagation();
      this.selectItem(listItem);
    }
  }
  selectItem(item) {
    const isDblClick = this.isDoubleClick();
    const type = item.getAttribute("data-entity-type");
    const id = item.getAttribute("data-entity-id");
    const isSelected = !item.classList.contains("selected") || isDblClick;
    this.unselectAll();
    this.input.value = isSelected ? `${type}:${id}` : "";
    const link2 = item.getAttribute("href");
    const name = item.querySelector(".entity-list-item-name").textContent;
    const data = { id: Number(id), name, link: link2 };
    if (isSelected) {
      item.classList.add("selected");
    } else {
      window.$events.emit("entity-select-change", null);
    }
    if (!isDblClick && !isSelected) return;
    if (isDblClick) {
      this.confirmSelection(data);
    }
    if (isSelected) {
      window.$events.emit("entity-select-change", data);
    }
  }
  confirmSelection(data) {
    window.$events.emit("entity-select-confirm", data);
  }
  unselectAll() {
    const selected = this.elem.querySelectorAll(".selected");
    for (const selectedElem of selected) {
      selectedElem.classList.remove("selected", "primary-background");
    }
  }
};

// resources/js/components/entity-selector-popup.js
var EntitySelectorPopup = class extends Component {
  setup() {
    this.container = this.$el;
    this.selectButton = this.$refs.select;
    this.selectorEl = this.$refs.selector;
    this.callback = null;
    this.selection = null;
    this.selectButton.addEventListener("click", this.onSelectButtonClick.bind(this));
    window.$events.listen("entity-select-change", this.onSelectionChange.bind(this));
    window.$events.listen("entity-select-confirm", this.handleConfirmedSelection.bind(this));
  }
  /**
   * Show the selector popup.
   * @param {Function} callback
   * @param {EntitySelectorSearchOptions} searchOptions
   */
  show(callback, searchOptions = {}) {
    this.callback = callback;
    this.getSelector().configureSearchOptions(searchOptions);
    this.getPopup().show();
    this.getSelector().focusSearch();
  }
  hide() {
    this.getPopup().hide();
  }
  /**
   * @returns {Popup}
   */
  getPopup() {
    return window.$components.firstOnElement(this.container, "popup");
  }
  /**
   * @returns {EntitySelector}
   */
  getSelector() {
    return window.$components.firstOnElement(this.selectorEl, "entity-selector");
  }
  onSelectButtonClick() {
    this.handleConfirmedSelection(this.selection);
  }
  onSelectionChange(entity2) {
    this.selection = entity2;
    if (entity2 === null) {
      this.selectButton.setAttribute("disabled", "true");
    } else {
      this.selectButton.removeAttribute("disabled");
    }
  }
  handleConfirmedSelection(entity2) {
    this.hide();
    this.getSelector().reset();
    if (this.callback && entity2) this.callback(entity2);
  }
};

// resources/js/components/event-emit-select.js
var EventEmitSelect = class extends Component {
  setup() {
    this.container = this.$el;
    this.name = this.$opts.name;
    onSelect(this.$el, () => {
      this.$emit(this.name, this.$opts);
    });
  }
};

// resources/js/components/expand-toggle.js
var ExpandToggle = class extends Component {
  setup() {
    this.targetSelector = this.$opts.targetSelector;
    this.isOpen = this.$opts.isOpen === "true";
    this.updateEndpoint = this.$opts.updateEndpoint;
    this.$el.addEventListener("click", this.click.bind(this));
  }
  open(elemToToggle) {
    slideDown(elemToToggle, 200);
  }
  close(elemToToggle) {
    slideUp(elemToToggle, 200);
  }
  click(event) {
    event.preventDefault();
    const matchingElems = document.querySelectorAll(this.targetSelector);
    for (const match2 of matchingElems) {
      const action = this.isOpen ? this.close : this.open;
      action(match2);
    }
    this.isOpen = !this.isOpen;
    this.updateSystemAjax(this.isOpen);
  }
  updateSystemAjax(isOpen) {
    window.$http.patch(this.updateEndpoint, {
      expand: isOpen ? "true" : "false"
    });
  }
};

// resources/js/components/global-search.js
var GlobalSearch = class extends Component {
  setup() {
    this.container = this.$el;
    this.input = this.$refs.input;
    this.suggestions = this.$refs.suggestions;
    this.suggestionResultsWrap = this.$refs.suggestionResults;
    this.loadingWrap = this.$refs.loading;
    this.button = this.$refs.button;
    this.setupListeners();
  }
  setupListeners() {
    const updateSuggestionsDebounced = debounce(this.updateSuggestions.bind(this), 200, false);
    this.input.addEventListener("input", () => {
      const { value } = this.input;
      if (value.length > 0) {
        this.loadingWrap.style.display = "block";
        this.suggestionResultsWrap.style.opacity = "0.5";
        updateSuggestionsDebounced(value);
      } else {
        this.hideSuggestions();
      }
    });
    this.input.addEventListener("dblclick", () => {
      this.input.setAttribute("autocomplete", "on");
      this.button.focus();
      this.input.focus();
    });
    new KeyboardNavigationHandler(this.container, () => {
      this.hideSuggestions();
    });
  }
  /**
   * @param {String} search
   */
  async updateSuggestions(search) {
    const { data: results } = await window.$http.get("/search/suggest", { term: search });
    if (!this.input.value) {
      return;
    }
    const resultDom = htmlToDom(results);
    this.suggestionResultsWrap.innerHTML = "";
    this.suggestionResultsWrap.style.opacity = "1";
    this.loadingWrap.style.display = "none";
    this.suggestionResultsWrap.append(resultDom);
    if (!this.container.classList.contains("search-active")) {
      this.showSuggestions();
    }
  }
  showSuggestions() {
    this.container.classList.add("search-active");
    window.requestAnimationFrame(() => {
      this.suggestions.classList.add("search-suggestions-animation");
    });
  }
  hideSuggestions() {
    this.container.classList.remove("search-active");
    this.suggestions.classList.remove("search-suggestions-animation");
    this.suggestionResultsWrap.innerHTML = "";
  }
};

// resources/js/components/header-mobile-toggle.js
var HeaderMobileToggle = class extends Component {
  setup() {
    this.elem = this.$el;
    this.toggleButton = this.$refs.toggle;
    this.menu = this.$refs.menu;
    this.open = false;
    this.toggleButton.addEventListener("click", this.onToggle.bind(this));
    this.onWindowClick = this.onWindowClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  onToggle(event) {
    this.open = !this.open;
    this.menu.classList.toggle("show", this.open);
    this.toggleButton.setAttribute("aria-expanded", this.open ? "true" : "false");
    if (this.open) {
      this.elem.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("click", this.onWindowClick);
    } else {
      this.elem.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("click", this.onWindowClick);
    }
    event.stopPropagation();
  }
  onKeyDown(event) {
    if (event.code === "Escape") {
      this.onToggle(event);
    }
  }
  onWindowClick(event) {
    this.onToggle(event);
  }
};

// resources/js/components/image-manager.js
var ImageManager = class extends Component {
  setup() {
    this.uploadedTo = this.$opts.uploadedTo;
    this.container = this.$el;
    this.popupEl = this.$refs.popup;
    this.searchForm = this.$refs.searchForm;
    this.searchInput = this.$refs.searchInput;
    this.cancelSearch = this.$refs.cancelSearch;
    this.listContainer = this.$refs.listContainer;
    this.filterTabs = this.$manyRefs.filterTabs;
    this.selectButton = this.$refs.selectButton;
    this.uploadButton = this.$refs.uploadButton;
    this.uploadHint = this.$refs.uploadHint;
    this.formContainer = this.$refs.formContainer;
    this.formContainerPlaceholder = this.$refs.formContainerPlaceholder;
    this.dropzoneContainer = this.$refs.dropzoneContainer;
    this.loadMore = this.$refs.loadMore;
    this.type = "gallery";
    this.lastSelected = {};
    this.lastSelectedTime = 0;
    this.callback = null;
    this.resetState = () => {
      this.hasData = false;
      this.page = 1;
      this.filter = "all";
    };
    this.resetState();
    this.setupListeners();
  }
  setupListeners() {
    onSelect(this.filterTabs, (e) => {
      this.resetAll();
      this.filter = e.target.dataset.filter;
      this.setActiveFilterTab(this.filter);
      this.loadGallery();
    });
    this.searchForm.addEventListener("submit", (event) => {
      this.resetListView();
      this.loadGallery();
      this.cancelSearch.toggleAttribute("hidden", !this.searchInput.value);
      event.preventDefault();
    });
    onSelect(this.cancelSearch, () => {
      this.resetListView();
      this.resetSearchView();
      this.loadGallery();
    });
    onChildEvent(this.container, ".load-more button", "click", this.runLoadMore.bind(this));
    this.listContainer.addEventListener("event-emit-select-image", this.onImageSelectEvent.bind(this));
    this.listContainer.addEventListener("error", (event) => {
      event.target.src = window.baseUrl("loading_error.png");
    }, true);
    onSelect(this.selectButton, () => {
      if (this.callback) {
        this.callback(this.lastSelected);
      }
      this.hide();
    });
    onChildEvent(this.formContainer, "#image-manager-delete", "click", () => {
      if (this.lastSelected) {
        this.loadImageEditForm(this.lastSelected.id, true);
      }
    });
    onChildEvent(this.formContainer, "#image-manager-rebuild-thumbs", "click", async (_, button) => {
      button.disabled = true;
      if (this.lastSelected) {
        await this.rebuildThumbnails(this.lastSelected.id);
      }
      button.disabled = false;
    });
    this.formContainer.addEventListener("ajax-form-success", () => {
      this.refreshGallery();
      this.resetEditForm();
    });
    this.container.addEventListener("dropzone-upload-success", this.refreshGallery.bind(this));
    const scrollZone = this.listContainer.parentElement;
    let scrollEvents = [];
    scrollZone.addEventListener("wheel", (event) => {
      const scrollOffset = Math.ceil(scrollZone.scrollHeight - scrollZone.scrollTop);
      const bottomedOut = scrollOffset === scrollZone.clientHeight;
      if (!bottomedOut || event.deltaY < 1) {
        return;
      }
      const secondAgo = Date.now() - 1e3;
      scrollEvents.push(Date.now());
      scrollEvents = scrollEvents.filter((d) => d >= secondAgo);
      if (scrollEvents.length > 5 && this.canLoadMore()) {
        this.runLoadMore();
      }
    });
  }
  show(callback, type = "gallery") {
    this.resetAll();
    this.callback = callback;
    this.type = type;
    this.getPopup().show();
    const hideUploads = type !== "gallery";
    this.dropzoneContainer.classList.toggle("hidden", hideUploads);
    this.uploadButton.classList.toggle("hidden", hideUploads);
    this.uploadHint.classList.toggle("hidden", hideUploads);
    const dropzone = window.$components.firstOnElement(this.container, "dropzone");
    dropzone.toggleActive(!hideUploads);
    if (!this.hasData) {
      this.loadGallery();
      this.hasData = true;
    }
  }
  hide() {
    this.getPopup().hide();
  }
  /**
   * @returns {Popup}
   */
  getPopup() {
    return window.$components.firstOnElement(this.popupEl, "popup");
  }
  async loadGallery() {
    const params = {
      page: this.page,
      search: this.searchInput.value || null,
      uploaded_to: this.uploadedTo,
      filter_type: this.filter === "all" ? null : this.filter
    };
    const { data: html } = await window.$http.get(`images/${this.type}`, params);
    if (params.page === 1) {
      this.listContainer.innerHTML = "";
    }
    this.addReturnedHtmlElementsToList(html);
    removeLoading(this.listContainer);
  }
  addReturnedHtmlElementsToList(html) {
    const el = document.createElement("div");
    el.innerHTML = html;
    const loadMore = el.querySelector(".load-more");
    if (loadMore) {
      loadMore.remove();
      this.loadMore.innerHTML = loadMore.innerHTML;
    }
    this.loadMore.toggleAttribute("hidden", !loadMore);
    window.$components.init(el);
    for (const child of [...el.children]) {
      this.listContainer.appendChild(child);
    }
  }
  setActiveFilterTab(filterName) {
    for (const tab of this.filterTabs) {
      const selected = tab.dataset.filter === filterName;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    }
  }
  resetAll() {
    this.resetState();
    this.resetListView();
    this.resetSearchView();
    this.resetEditForm();
    this.setActiveFilterTab("all");
    this.selectButton.classList.add("hidden");
  }
  resetSearchView() {
    this.searchInput.value = "";
    this.cancelSearch.toggleAttribute("hidden", true);
  }
  resetEditForm() {
    this.formContainer.innerHTML = "";
    this.formContainerPlaceholder.removeAttribute("hidden");
  }
  resetListView() {
    showLoading(this.listContainer);
    this.page = 1;
  }
  refreshGallery() {
    this.resetListView();
    this.loadGallery();
  }
  async onImageSelectEvent(event) {
    let image2 = JSON.parse(event.detail.data);
    const isDblClick = image2 && image2.id === this.lastSelected.id && Date.now() - this.lastSelectedTime < 400;
    const alreadySelected = event.target.classList.contains("selected");
    [...this.listContainer.querySelectorAll(".selected")].forEach((el) => {
      el.classList.remove("selected");
    });
    if (!alreadySelected && !isDblClick) {
      event.target.classList.add("selected");
      image2 = await this.loadImageEditForm(image2.id);
    } else if (!isDblClick) {
      this.resetEditForm();
    } else if (isDblClick) {
      image2 = this.lastSelected;
    }
    this.selectButton.classList.toggle("hidden", alreadySelected);
    if (isDblClick && this.callback) {
      this.callback(image2);
      this.hide();
    }
    this.lastSelected = image2;
    this.lastSelectedTime = Date.now();
  }
  async loadImageEditForm(imageId, requestDelete = false) {
    if (!requestDelete) {
      this.formContainer.innerHTML = "";
    }
    const params = requestDelete ? { delete: true } : {};
    const { data: formHtml } = await window.$http.get(`/images/edit/${imageId}`, params);
    this.formContainer.innerHTML = formHtml;
    this.formContainerPlaceholder.setAttribute("hidden", "");
    window.$components.init(this.formContainer);
    const imageDataEl = this.formContainer.querySelector("#image-manager-form-image-data");
    return JSON.parse(imageDataEl.text);
  }
  runLoadMore() {
    showLoading(this.loadMore);
    this.page += 1;
    this.loadGallery();
  }
  canLoadMore() {
    return this.loadMore.querySelector("button") && !this.loadMore.hasAttribute("hidden");
  }
  async rebuildThumbnails(imageId) {
    try {
      const response = await window.$http.put(`/images/${imageId}/rebuild-thumbnails`);
      window.$events.success(response.data);
      this.refreshGallery();
    } catch (err) {
      window.$events.showResponseError(err);
    }
  }
};

// resources/js/components/image-picker.js
var ImagePicker = class extends Component {
  setup() {
    this.imageElem = this.$refs.image;
    this.imageInput = this.$refs.imageInput;
    this.resetInput = this.$refs.resetInput;
    this.removeInput = this.$refs.removeInput;
    this.resetButton = this.$refs.resetButton;
    this.removeButton = this.$refs.removeButton || null;
    this.defaultImage = this.$opts.defaultImage;
    this.setupListeners();
  }
  setupListeners() {
    this.resetButton.addEventListener("click", this.reset.bind(this));
    if (this.removeButton) {
      this.removeButton.addEventListener("click", this.removeImage.bind(this));
    }
    this.imageInput.addEventListener("change", this.fileInputChange.bind(this));
  }
  fileInputChange() {
    this.resetInput.setAttribute("disabled", "disabled");
    if (this.removeInput) {
      this.removeInput.setAttribute("disabled", "disabled");
    }
    for (const file of this.imageInput.files) {
      this.imageElem.src = window.URL.createObjectURL(file);
    }
    this.imageElem.classList.remove("none");
  }
  reset() {
    this.imageInput.value = "";
    this.imageElem.src = this.defaultImage;
    this.resetInput.removeAttribute("disabled");
    if (this.removeInput) {
      this.removeInput.setAttribute("disabled", "disabled");
    }
    this.imageElem.classList.remove("none");
  }
  removeImage() {
    this.imageInput.value = "";
    this.imageElem.classList.add("none");
    this.removeInput.removeAttribute("disabled");
    this.resetInput.setAttribute("disabled", "disabled");
  }
};

// resources/js/components/list-sort-control.js
var ListSortControl = class extends Component {
  setup() {
    this.elem = this.$el;
    this.menu = this.$refs.menu;
    this.sortInput = this.$refs.sort;
    this.orderInput = this.$refs.order;
    this.form = this.$refs.form;
    this.setupListeners();
  }
  setupListeners() {
    this.menu.addEventListener("click", (event) => {
      if (event.target.closest("[data-sort-value]") !== null) {
        this.sortOptionClick(event);
      }
    });
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest("[data-sort-dir]") !== null) {
        this.sortDirectionClick(event);
      }
    });
  }
  sortOptionClick(event) {
    const sortOption = event.target.closest("[data-sort-value]");
    this.sortInput.value = sortOption.getAttribute("data-sort-value");
    event.preventDefault();
    this.form.submit();
  }
  sortDirectionClick(event) {
    const currentDir = this.orderInput.value;
    this.orderInput.value = currentDir === "asc" ? "desc" : "asc";
    event.preventDefault();
    this.form.submit();
  }
};

// node_modules/markdown-it/lib/common/utils.mjs
var utils_exports = {};
__export(utils_exports, {
  arrayReplaceAt: () => arrayReplaceAt,
  assign: () => assign,
  escapeHtml: () => escapeHtml2,
  escapeRE: () => escapeRE,
  fromCodePoint: () => fromCodePoint2,
  has: () => has,
  isMdAsciiPunct: () => isMdAsciiPunct,
  isPunctChar: () => isPunctChar,
  isSpace: () => isSpace,
  isString: () => isString,
  isValidEntityCode: () => isValidEntityCode,
  isWhiteSpace: () => isWhiteSpace,
  lib: () => lib,
  normalizeReference: () => normalizeReference,
  unescapeAll: () => unescapeAll,
  unescapeMd: () => unescapeMd
});

// node_modules/mdurl/index.mjs
var mdurl_exports = {};
__export(mdurl_exports, {
  decode: () => decode_default,
  encode: () => encode_default,
  format: () => format,
  parse: () => parse_default
});

// node_modules/mdurl/lib/decode.mjs
var decodeCache = {};
function getDecodeCache(exclude) {
  let cache = decodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = decodeCache[exclude] = [];
  for (let i = 0; i < 128; i++) {
    const ch = String.fromCharCode(i);
    cache.push(ch);
  }
  for (let i = 0; i < exclude.length; i++) {
    const ch = exclude.charCodeAt(i);
    cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
  }
  return cache;
}
function decode(string, exclude) {
  if (typeof exclude !== "string") {
    exclude = decode.defaultChars;
  }
  const cache = getDecodeCache(exclude);
  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    let result = "";
    for (let i = 0, l = seq.length; i < l; i += 3) {
      const b1 = parseInt(seq.slice(i + 1, i + 3), 16);
      if (b1 < 128) {
        result += cache[b1];
        continue;
      }
      if ((b1 & 224) === 192 && i + 3 < l) {
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        if ((b2 & 192) === 128) {
          const chr = b1 << 6 & 1984 | b2 & 63;
          if (chr < 128) {
            result += "\uFFFD\uFFFD";
          } else {
            result += String.fromCharCode(chr);
          }
          i += 3;
          continue;
        }
      }
      if ((b1 & 240) === 224 && i + 6 < l) {
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        if ((b2 & 192) === 128 && (b3 & 192) === 128) {
          const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
          if (chr < 2048 || chr >= 55296 && chr <= 57343) {
            result += "\uFFFD\uFFFD\uFFFD";
          } else {
            result += String.fromCharCode(chr);
          }
          i += 6;
          continue;
        }
      }
      if ((b1 & 248) === 240 && i + 9 < l) {
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        const b4 = parseInt(seq.slice(i + 10, i + 12), 16);
        if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
          let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
          if (chr < 65536 || chr > 1114111) {
            result += "\uFFFD\uFFFD\uFFFD\uFFFD";
          } else {
            chr -= 65536;
            result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
          }
          i += 9;
          continue;
        }
      }
      result += "\uFFFD";
    }
    return result;
  });
}
decode.defaultChars = ";/?:@&=+$,#";
decode.componentChars = "";
var decode_default = decode;

// node_modules/mdurl/lib/encode.mjs
var encodeCache = {};
function getEncodeCache(exclude) {
  let cache = encodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = encodeCache[exclude] = [];
  for (let i = 0; i < 128; i++) {
    const ch = String.fromCharCode(i);
    if (/^[0-9a-z]$/i.test(ch)) {
      cache.push(ch);
    } else {
      cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
    }
  }
  for (let i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }
  return cache;
}
function encode(string, exclude, keepEscaped) {
  if (typeof exclude !== "string") {
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }
  if (typeof keepEscaped === "undefined") {
    keepEscaped = true;
  }
  const cache = getEncodeCache(exclude);
  let result = "";
  for (let i = 0, l = string.length; i < l; i++) {
    const code2 = string.charCodeAt(i);
    if (keepEscaped && code2 === 37 && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }
    if (code2 < 128) {
      result += cache[code2];
      continue;
    }
    if (code2 >= 55296 && code2 <= 57343) {
      if (code2 >= 55296 && code2 <= 56319 && i + 1 < l) {
        const nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 56320 && nextCode <= 57343) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += "%EF%BF%BD";
      continue;
    }
    result += encodeURIComponent(string[i]);
  }
  return result;
}
encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_default = encode;

// node_modules/mdurl/lib/format.mjs
function format(url) {
  let result = "";
  result += url.protocol || "";
  result += url.slashes ? "//" : "";
  result += url.auth ? url.auth + "@" : "";
  if (url.hostname && url.hostname.indexOf(":") !== -1) {
    result += "[" + url.hostname + "]";
  } else {
    result += url.hostname || "";
  }
  result += url.port ? ":" + url.port : "";
  result += url.pathname || "";
  result += url.search || "";
  result += url.hash || "";
  return result;
}

// node_modules/mdurl/lib/parse.mjs
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}
var protocolPattern = /^([a-z0-9.+-]+:)/i;
var portPattern = /:[0-9]*$/;
var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
var autoEscape = ["'"].concat(unwise);
var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
var hostEndingChars = ["/", "?", "#"];
var hostnameMaxLen = 255;
var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var hostlessProtocol = {
  javascript: true,
  "javascript:": true
};
var slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};
function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) return url;
  const u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}
Url.prototype.parse = function(url, slashesDenoteHost) {
  let lowerProto, hec, slashes;
  let rest = url;
  rest = rest.trim();
  if (!slashesDenoteHost && url.split("#").length === 1) {
    const simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }
  let proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    let hostEnd = -1;
    for (let i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    let auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }
    hostEnd = -1;
    for (let i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }
    if (rest[hostEnd - 1] === ":") {
      hostEnd--;
    }
    const host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    this.parseHost(host);
    this.hostname = this.hostname || "";
    const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      const hostparts = this.hostname.split(/\./);
      for (let i = 0, l = hostparts.length; i < l; i++) {
        const part = hostparts[i];
        if (!part) {
          continue;
        }
        if (!part.match(hostnamePartPattern)) {
          let newpart = "";
          for (let j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += "x";
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            const validParts = hostparts.slice(0, i);
            const notHost = hostparts.slice(i + 1);
            const bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join(".") + rest;
            }
            this.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = "";
    }
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }
  const hash = rest.indexOf("#");
  if (hash !== -1) {
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  const qm = rest.indexOf("?");
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) {
    this.pathname = rest;
  }
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = "";
  }
  return this;
};
Url.prototype.parseHost = function(host) {
  let port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) {
    this.hostname = host;
  }
};
var parse_default = urlParse;

// node_modules/uc.micro/index.mjs
var uc_exports = {};
__export(uc_exports, {
  Any: () => regex_default,
  Cc: () => regex_default2,
  Cf: () => regex_default3,
  P: () => regex_default4,
  S: () => regex_default5,
  Z: () => regex_default6
});

// node_modules/uc.micro/properties/Any/regex.mjs
var regex_default = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

// node_modules/uc.micro/categories/Cc/regex.mjs
var regex_default2 = /[\0-\x1F\x7F-\x9F]/;

// node_modules/uc.micro/categories/Cf/regex.mjs
var regex_default3 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

// node_modules/uc.micro/categories/P/regex.mjs
var regex_default4 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

// node_modules/uc.micro/categories/S/regex.mjs
var regex_default5 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

// node_modules/uc.micro/categories/Z/regex.mjs
var regex_default6 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

// node_modules/entities/lib/esm/generated/decode-data-html.js
var decode_data_html_default = new Uint16Array(
  // prettier-ignore
  '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c) => c.charCodeAt(0))
);

// node_modules/entities/lib/esm/generated/decode-data-xml.js
var decode_data_xml_default = new Uint16Array(
  // prettier-ignore
  "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c) => c.charCodeAt(0))
);

// node_modules/entities/lib/esm/decode_codepoint.js
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a2;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
}

// node_modules/entities/lib/esm/decode.js
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code2) {
  return code2 >= CharCodes.ZERO && code2 <= CharCodes.NINE;
}
function isHexadecimalCharacter(code2) {
  return code2 >= CharCodes.UPPER_A && code2 <= CharCodes.UPPER_F || code2 >= CharCodes.LOWER_A && code2 <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code2) {
  return code2 >= CharCodes.UPPER_A && code2 <= CharCodes.UPPER_Z || code2 >= CharCodes.LOWER_A && code2 <= CharCodes.LOWER_Z || isNumber(code2);
}
function isEntityInAttributeInvalidEnd(code2) {
  return code2 === CharCodes.EQUALS || isAsciiAlphaNumeric(code2);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors2) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors2;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end, base2) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base2, digitCount) + parseInt(str.substr(start, digitCount), base2);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength) {
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(str, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a2;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function getDecoder(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder.startEntity(decodeMode);
      const len = decoder.write(
        str,
        // Skip the "&"
        offset + 1
      );
      if (len < 0) {
        lastIndex = offset + decoder.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo = nodeIdx;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo = mid + 1;
    } else if (midVal > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var htmlDecoder = getDecoder(decode_data_html_default);
var xmlDecoder = getDecoder(decode_data_xml_default);
function decodeHTML(str, mode = DecodingMode.Legacy) {
  return htmlDecoder(str, mode);
}

// node_modules/entities/lib/esm/generated/encode-html.js
function restoreDiff(arr) {
  for (let i = 1; i < arr.length; i++) {
    arr[i][0] += arr[i - 1][0] + 1;
  }
  return arr;
}
var encode_html_default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));

// node_modules/entities/lib/esm/escape.js
var xmlCodeMap = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index2) => str.codePointAt(index2) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c, index2) => (c.charCodeAt(index2) & 64512) === 55296 ? (c.charCodeAt(index2) - 55296) * 1024 + c.charCodeAt(index2 + 1) - 56320 + 65536 : c.charCodeAt(index2)
  )
);
function getEscaper(regex, map2) {
  return function escape3(data) {
    let match2;
    let lastIdx = 0;
    let result = "";
    while (match2 = regex.exec(data)) {
      if (lastIdx !== match2.index) {
        result += data.substring(lastIdx, match2.index);
      }
      result += map2.get(match2[0].charCodeAt(0));
      lastIdx = match2.index + 1;
    }
    return result + data.substring(lastIdx);
  };
}
var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));

// node_modules/entities/lib/esm/index.js
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));

// node_modules/markdown-it/lib/common/utils.mjs
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function isString(obj) {
  return _class(obj) === "[object String]";
}
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function has(object, key) {
  return _hasOwnProperty.call(object, key);
}
function assign(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function(source) {
    if (!source) {
      return;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be object");
    }
    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });
  return obj;
}
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}
function isValidEntityCode(c) {
  if (c >= 55296 && c <= 57343) {
    return false;
  }
  if (c >= 64976 && c <= 65007) {
    return false;
  }
  if ((c & 65535) === 65535 || (c & 65535) === 65534) {
    return false;
  }
  if (c >= 0 && c <= 8) {
    return false;
  }
  if (c === 11) {
    return false;
  }
  if (c >= 14 && c <= 31) {
    return false;
  }
  if (c >= 127 && c <= 159) {
    return false;
  }
  if (c > 1114111) {
    return false;
  }
  return true;
}
function fromCodePoint2(c) {
  if (c > 65535) {
    c -= 65536;
    const surrogate1 = 55296 + (c >> 10);
    const surrogate2 = 56320 + (c & 1023);
    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}
var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function replaceEntityPattern(match2, name) {
  if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
    const code2 = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    if (isValidEntityCode(code2)) {
      return fromCodePoint2(code2);
    }
    return match2;
  }
  const decoded = decodeHTML(match2);
  if (decoded !== match2) {
    return decoded;
  }
  return match2;
}
function unescapeMd(str) {
  if (str.indexOf("\\") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_MD_RE, "$1");
}
function unescapeAll(str) {
  if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_ALL_RE, function(match2, escaped, entity2) {
    if (escaped) {
      return escaped;
    }
    return replaceEntityPattern(match2, entity2);
  });
}
var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}
function escapeHtml2(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}
var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, "\\$&");
}
function isSpace(code2) {
  switch (code2) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function isWhiteSpace(code2) {
  if (code2 >= 8192 && code2 <= 8202) {
    return true;
  }
  switch (code2) {
    case 9:
    // \t
    case 10:
    // \n
    case 11:
    // \v
    case 12:
    // \f
    case 13:
    // \r
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return true;
  }
  return false;
}
function isPunctChar(ch) {
  return regex_default4.test(ch) || regex_default5.test(ch);
}
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function normalizeReference(str) {
  str = str.trim().replace(/\s+/g, " ");
  if ("\u1E9E".toLowerCase() === "\u1E7E") {
    str = str.replace(/ẞ/g, "\xDF");
  }
  return str.toLowerCase().toUpperCase();
}
var lib = { mdurl: mdurl_exports, ucmicro: uc_exports };

// node_modules/markdown-it/lib/helpers/index.mjs
var helpers_exports = {};
__export(helpers_exports, {
  parseLinkDestination: () => parseLinkDestination,
  parseLinkLabel: () => parseLinkLabel,
  parseLinkTitle: () => parseLinkTitle
});

// node_modules/markdown-it/lib/helpers/parse_link_label.mjs
function parseLinkLabel(state, start, disableNested) {
  let level, found, marker, prevPos;
  const max = state.posMax;
  const oldPos = state.pos;
  state.pos = start + 1;
  level = 1;
  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 93) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }
    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 91) {
      if (prevPos === state.pos - 1) {
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }
  let labelEnd = -1;
  if (found) {
    labelEnd = state.pos;
  }
  state.pos = oldPos;
  return labelEnd;
}

// node_modules/markdown-it/lib/helpers/parse_link_destination.mjs
function parseLinkDestination(str, start, max) {
  let code2;
  let pos = start;
  const result = {
    ok: false,
    pos: 0,
    str: ""
  };
  if (str.charCodeAt(pos) === 60) {
    pos++;
    while (pos < max) {
      code2 = str.charCodeAt(pos);
      if (code2 === 10) {
        return result;
      }
      if (code2 === 60) {
        return result;
      }
      if (code2 === 62) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code2 === 92 && pos + 1 < max) {
        pos += 2;
        continue;
      }
      pos++;
    }
    return result;
  }
  let level = 0;
  while (pos < max) {
    code2 = str.charCodeAt(pos);
    if (code2 === 32) {
      break;
    }
    if (code2 < 32 || code2 === 127) {
      break;
    }
    if (code2 === 92 && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 32) {
        break;
      }
      pos += 2;
      continue;
    }
    if (code2 === 40) {
      level++;
      if (level > 32) {
        return result;
      }
    }
    if (code2 === 41) {
      if (level === 0) {
        break;
      }
      level--;
    }
    pos++;
  }
  if (start === pos) {
    return result;
  }
  if (level !== 0) {
    return result;
  }
  result.str = unescapeAll(str.slice(start, pos));
  result.pos = pos;
  result.ok = true;
  return result;
}

// node_modules/markdown-it/lib/helpers/parse_link_title.mjs
function parseLinkTitle(str, start, max, prev_state) {
  let code2;
  let pos = start;
  const state = {
    // if `true`, this is a valid link title
    ok: false,
    // if `true`, this link can be continued on the next line
    can_continue: false,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (prev_state) {
    state.str = prev_state.str;
    state.marker = prev_state.marker;
  } else {
    if (pos >= max) {
      return state;
    }
    let marker = str.charCodeAt(pos);
    if (marker !== 34 && marker !== 39 && marker !== 40) {
      return state;
    }
    start++;
    pos++;
    if (marker === 40) {
      marker = 41;
    }
    state.marker = marker;
  }
  while (pos < max) {
    code2 = str.charCodeAt(pos);
    if (code2 === state.marker) {
      state.pos = pos + 1;
      state.str += unescapeAll(str.slice(start, pos));
      state.ok = true;
      return state;
    } else if (code2 === 40 && state.marker === 41) {
      return state;
    } else if (code2 === 92 && pos + 1 < max) {
      pos++;
    }
    pos++;
  }
  state.can_continue = true;
  state.str += unescapeAll(str.slice(start, pos));
  return state;
}

// node_modules/markdown-it/lib/renderer.mjs
var default_rules = {};
default_rules.code_inline = function(tokens, idx, options2, env, slf) {
  const token = tokens[idx];
  return "<code" + slf.renderAttrs(token) + ">" + escapeHtml2(token.content) + "</code>";
};
default_rules.code_block = function(tokens, idx, options2, env, slf) {
  const token = tokens[idx];
  return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml2(tokens[idx].content) + "</code></pre>\n";
};
default_rules.fence = function(tokens, idx, options2, env, slf) {
  const token = tokens[idx];
  const info = token.info ? unescapeAll(token.info).trim() : "";
  let langName = "";
  let langAttrs = "";
  if (info) {
    const arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join("");
  }
  let highlighted;
  if (options2.highlight) {
    highlighted = options2.highlight(token.content, langName, langAttrs) || escapeHtml2(token.content);
  } else {
    highlighted = escapeHtml2(token.content);
  }
  if (highlighted.indexOf("<pre") === 0) {
    return highlighted + "\n";
  }
  if (info) {
    const i = token.attrIndex("class");
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];
    if (i < 0) {
      tmpAttrs.push(["class", options2.langPrefix + langName]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += " " + options2.langPrefix + langName;
    }
    const tmpToken = {
      attrs: tmpAttrs
    };
    return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>
`;
  }
  return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>
`;
};
default_rules.image = function(tokens, idx, options2, env, slf) {
  const token = tokens[idx];
  token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options2, env);
  return slf.renderToken(tokens, idx, options2);
};
default_rules.hardbreak = function(tokens, idx, options2) {
  return options2.xhtmlOut ? "<br />\n" : "<br>\n";
};
default_rules.softbreak = function(tokens, idx, options2) {
  return options2.breaks ? options2.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};
default_rules.text = function(tokens, idx) {
  return escapeHtml2(tokens[idx].content);
};
default_rules.html_block = function(tokens, idx) {
  return tokens[idx].content;
};
default_rules.html_inline = function(tokens, idx) {
  return tokens[idx].content;
};
function Renderer() {
  this.rules = assign({}, default_rules);
}
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  let i, l, result;
  if (!token.attrs) {
    return "";
  }
  result = "";
  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += " " + escapeHtml2(token.attrs[i][0]) + '="' + escapeHtml2(token.attrs[i][1]) + '"';
  }
  return result;
};
Renderer.prototype.renderToken = function renderToken(tokens, idx, options2) {
  const token = tokens[idx];
  let result = "";
  if (token.hidden) {
    return "";
  }
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += "\n";
  }
  result += (token.nesting === -1 ? "</" : "<") + token.tag;
  result += this.renderAttrs(token);
  if (token.nesting === 0 && options2.xhtmlOut) {
    result += " /";
  }
  let needLf = false;
  if (token.block) {
    needLf = true;
    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        const nextToken = tokens[idx + 1];
        if (nextToken.type === "inline" || nextToken.hidden) {
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          needLf = false;
        }
      }
    }
  }
  result += needLf ? ">\n" : ">";
  return result;
};
Renderer.prototype.renderInline = function(tokens, options2, env) {
  let result = "";
  const rules = this.rules;
  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;
    if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i, options2, env, this);
    } else {
      result += this.renderToken(tokens, i, options2);
    }
  }
  return result;
};
Renderer.prototype.renderInlineAsText = function(tokens, options2, env) {
  let result = "";
  for (let i = 0, len = tokens.length; i < len; i++) {
    switch (tokens[i].type) {
      case "text":
        result += tokens[i].content;
        break;
      case "image":
        result += this.renderInlineAsText(tokens[i].children, options2, env);
        break;
      case "html_inline":
      case "html_block":
        result += tokens[i].content;
        break;
      case "softbreak":
      case "hardbreak":
        result += "\n";
        break;
      default:
    }
  }
  return result;
};
Renderer.prototype.render = function(tokens, options2, env) {
  let result = "";
  const rules = this.rules;
  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;
    if (type === "inline") {
      result += this.renderInline(tokens[i].children, options2, env);
    } else if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i, options2, env, this);
    } else {
      result += this.renderToken(tokens, i, options2, env);
    }
  }
  return result;
};
var renderer_default = Renderer;

// node_modules/markdown-it/lib/ruler.mjs
function Ruler() {
  this.__rules__ = [];
  this.__cache__ = null;
}
Ruler.prototype.__find__ = function(name) {
  for (let i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};
Ruler.prototype.__compile__ = function() {
  const self = this;
  const chains = [""];
  self.__rules__.forEach(function(rule) {
    if (!rule.enabled) {
      return;
    }
    rule.alt.forEach(function(altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });
  self.__cache__ = {};
  chains.forEach(function(chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function(rule) {
      if (!rule.enabled) {
        return;
      }
      if (chain && rule.alt.indexOf(chain) < 0) {
        return;
      }
      self.__cache__[chain].push(rule.fn);
    });
  });
};
Ruler.prototype.at = function(name, fn, options2) {
  const index2 = this.__find__(name);
  const opt = options2 || {};
  if (index2 === -1) {
    throw new Error("Parser rule not found: " + name);
  }
  this.__rules__[index2].fn = fn;
  this.__rules__[index2].alt = opt.alt || [];
  this.__cache__ = null;
};
Ruler.prototype.before = function(beforeName, ruleName, fn, options2) {
  const index2 = this.__find__(beforeName);
  const opt = options2 || {};
  if (index2 === -1) {
    throw new Error("Parser rule not found: " + beforeName);
  }
  this.__rules__.splice(index2, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.after = function(afterName, ruleName, fn, options2) {
  const index2 = this.__find__(afterName);
  const opt = options2 || {};
  if (index2 === -1) {
    throw new Error("Parser rule not found: " + afterName);
  }
  this.__rules__.splice(index2 + 1, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.push = function(ruleName, fn, options2) {
  const opt = options2 || {};
  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.enable = function(list2, ignoreInvalid) {
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  const result = [];
  list2.forEach(function(name) {
    const idx = this.__find__(name);
    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
Ruler.prototype.enableOnly = function(list2, ignoreInvalid) {
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  this.__rules__.forEach(function(rule) {
    rule.enabled = false;
  });
  this.enable(list2, ignoreInvalid);
};
Ruler.prototype.disable = function(list2, ignoreInvalid) {
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  const result = [];
  list2.forEach(function(name) {
    const idx = this.__find__(name);
    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
Ruler.prototype.getRules = function(chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }
  return this.__cache__[chainName] || [];
};
var ruler_default = Ruler;

// node_modules/markdown-it/lib/token.mjs
function Token(type, tag, nesting) {
  this.type = type;
  this.tag = tag;
  this.attrs = null;
  this.map = null;
  this.nesting = nesting;
  this.level = 0;
  this.children = null;
  this.content = "";
  this.markup = "";
  this.info = "";
  this.meta = null;
  this.block = false;
  this.hidden = false;
}
Token.prototype.attrIndex = function attrIndex(name) {
  if (!this.attrs) {
    return -1;
  }
  const attrs = this.attrs;
  for (let i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) {
      return i;
    }
  }
  return -1;
};
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [attrData];
  }
};
Token.prototype.attrSet = function attrSet(name, value) {
  const idx = this.attrIndex(name);
  const attrData = [name, value];
  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};
Token.prototype.attrGet = function attrGet(name) {
  const idx = this.attrIndex(name);
  let value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};
Token.prototype.attrJoin = function attrJoin(name, value) {
  const idx = this.attrIndex(name);
  if (idx < 0) {
    this.attrPush([name, value]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
  }
};
var token_default = Token;

// node_modules/markdown-it/lib/rules_core/state_core.mjs
function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md;
}
StateCore.prototype.Token = token_default;
var state_core_default = StateCore;

// node_modules/markdown-it/lib/rules_core/normalize.mjs
var NEWLINES_RE = /\r\n?|\n/g;
var NULL_RE = /\0/g;
function normalize(state) {
  let str;
  str = state.src.replace(NEWLINES_RE, "\n");
  str = str.replace(NULL_RE, "\uFFFD");
  state.src = str;
}

// node_modules/markdown-it/lib/rules_core/block.mjs
function block(state) {
  let token;
  if (state.inlineMode) {
    token = new state.Token("inline", "", 0);
    token.content = state.src;
    token.map = [0, 1];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
}

// node_modules/markdown-it/lib/rules_core/inline.mjs
function inline(state) {
  const tokens = state.tokens;
  for (let i = 0, l = tokens.length; i < l; i++) {
    const tok = tokens[i];
    if (tok.type === "inline") {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
}

// node_modules/markdown-it/lib/rules_core/linkify.mjs
function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}
function linkify(state) {
  const blockTokens = state.tokens;
  if (!state.md.options.linkify) {
    return;
  }
  for (let j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }
    let tokens = blockTokens[j].children;
    let htmlLinkLevel = 0;
    for (let i = tokens.length - 1; i >= 0; i--) {
      const currentToken = tokens[i];
      if (currentToken.type === "link_close") {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") {
          i--;
        }
        continue;
      }
      if (currentToken.type === "html_inline") {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) {
        continue;
      }
      if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
        const text2 = currentToken.content;
        let links = state.md.linkify.match(text2);
        const nodes = [];
        let level = currentToken.level;
        let lastPos = 0;
        if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") {
          links = links.slice(1);
        }
        for (let ln = 0; ln < links.length; ln++) {
          const url = links[ln].url;
          const fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) {
            continue;
          }
          let urlText = links[ln].text;
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
          } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }
          const pos = links[ln].index;
          if (pos > lastPos) {
            const token = new state.Token("text", "", 0);
            token.content = text2.slice(lastPos, pos);
            token.level = level;
            nodes.push(token);
          }
          const token_o = new state.Token("link_open", "a", 1);
          token_o.attrs = [["href", fullUrl]];
          token_o.level = level++;
          token_o.markup = "linkify";
          token_o.info = "auto";
          nodes.push(token_o);
          const token_t = new state.Token("text", "", 0);
          token_t.content = urlText;
          token_t.level = level;
          nodes.push(token_t);
          const token_c = new state.Token("link_close", "a", -1);
          token_c.level = --level;
          token_c.markup = "linkify";
          token_c.info = "auto";
          nodes.push(token_c);
          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text2.length) {
          const token = new state.Token("text", "", 0);
          token.content = text2.slice(lastPos);
          token.level = level;
          nodes.push(token);
        }
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
}

// node_modules/markdown-it/lib/rules_core/replacements.mjs
var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
var SCOPED_ABBR = {
  c: "\xA9",
  r: "\xAE",
  tm: "\u2122"
};
function replaceFn(match2, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}
function replace_scoped(inlineTokens) {
  let inside_autolink = 0;
  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];
    if (token.type === "text" && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }
    if (token.type === "link_open" && token.info === "auto") {
      inside_autolink--;
    }
    if (token.type === "link_close" && token.info === "auto") {
      inside_autolink++;
    }
  }
}
function replace_rare(inlineTokens) {
  let inside_autolink = 0;
  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];
    if (token.type === "text" && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1\u2014").replace(/(^|\s)--(?=\s|$)/mg, "$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1\u2013");
      }
    }
    if (token.type === "link_open" && token.info === "auto") {
      inside_autolink--;
    }
    if (token.type === "link_close" && token.info === "auto") {
      inside_autolink++;
    }
  }
}
function replace(state) {
  let blkIdx;
  if (!state.md.options.typographer) {
    return;
  }
  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== "inline") {
      continue;
    }
    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }
    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }
  }
}

// node_modules/markdown-it/lib/rules_core/smartquotes.mjs
var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = "\u2019";
function replaceAt(str, index2, ch) {
  return str.slice(0, index2) + ch + str.slice(index2 + 1);
}
function process_inlines(tokens, state) {
  let j;
  const stack2 = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const thisLevel = tokens[i].level;
    for (j = stack2.length - 1; j >= 0; j--) {
      if (stack2[j].level <= thisLevel) {
        break;
      }
    }
    stack2.length = j + 1;
    if (token.type !== "text") {
      continue;
    }
    let text2 = token.content;
    let pos = 0;
    let max = text2.length;
    OUTER:
      while (pos < max) {
        QUOTE_RE.lastIndex = pos;
        const t = QUOTE_RE.exec(text2);
        if (!t) {
          break;
        }
        let canOpen = true;
        let canClose = true;
        pos = t.index + 1;
        const isSingle = t[0] === "'";
        let lastChar = 32;
        if (t.index - 1 >= 0) {
          lastChar = text2.charCodeAt(t.index - 1);
        } else {
          for (j = i - 1; j >= 0; j--) {
            if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
            if (!tokens[j].content) continue;
            lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
            break;
          }
        }
        let nextChar = 32;
        if (pos < max) {
          nextChar = text2.charCodeAt(pos);
        } else {
          for (j = i + 1; j < tokens.length; j++) {
            if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
            if (!tokens[j].content) continue;
            nextChar = tokens[j].content.charCodeAt(0);
            break;
          }
        }
        const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
        const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
        const isLastWhiteSpace = isWhiteSpace(lastChar);
        const isNextWhiteSpace = isWhiteSpace(nextChar);
        if (isNextWhiteSpace) {
          canOpen = false;
        } else if (isNextPunctChar) {
          if (!(isLastWhiteSpace || isLastPunctChar)) {
            canOpen = false;
          }
        }
        if (isLastWhiteSpace) {
          canClose = false;
        } else if (isLastPunctChar) {
          if (!(isNextWhiteSpace || isNextPunctChar)) {
            canClose = false;
          }
        }
        if (nextChar === 34 && t[0] === '"') {
          if (lastChar >= 48 && lastChar <= 57) {
            canClose = canOpen = false;
          }
        }
        if (canOpen && canClose) {
          canOpen = isLastPunctChar;
          canClose = isNextPunctChar;
        }
        if (!canOpen && !canClose) {
          if (isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
          continue;
        }
        if (canClose) {
          for (j = stack2.length - 1; j >= 0; j--) {
            let item = stack2[j];
            if (stack2[j].level < thisLevel) {
              break;
            }
            if (item.single === isSingle && stack2[j].level === thisLevel) {
              item = stack2[j];
              let openQuote;
              let closeQuote;
              if (isSingle) {
                openQuote = state.md.options.quotes[2];
                closeQuote = state.md.options.quotes[3];
              } else {
                openQuote = state.md.options.quotes[0];
                closeQuote = state.md.options.quotes[1];
              }
              token.content = replaceAt(token.content, t.index, closeQuote);
              tokens[item.token].content = replaceAt(
                tokens[item.token].content,
                item.pos,
                openQuote
              );
              pos += closeQuote.length - 1;
              if (item.token === i) {
                pos += openQuote.length - 1;
              }
              text2 = token.content;
              max = text2.length;
              stack2.length = j;
              continue OUTER;
            }
          }
        }
        if (canOpen) {
          stack2.push({
            token: i,
            pos: t.index,
            single: isSingle,
            level: thisLevel
          });
        } else if (canClose && isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
      }
  }
}
function smartquotes(state) {
  if (!state.md.options.typographer) {
    return;
  }
  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }
    process_inlines(state.tokens[blkIdx].children, state);
  }
}

// node_modules/markdown-it/lib/rules_core/text_join.mjs
function text_join(state) {
  let curr, last;
  const blockTokens = state.tokens;
  const l = blockTokens.length;
  for (let j = 0; j < l; j++) {
    if (blockTokens[j].type !== "inline") continue;
    const tokens = blockTokens[j].children;
    const max = tokens.length;
    for (curr = 0; curr < max; curr++) {
      if (tokens[curr].type === "text_special") {
        tokens[curr].type = "text";
      }
    }
    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) {
          tokens[last] = tokens[curr];
        }
        last++;
      }
    }
    if (curr !== last) {
      tokens.length = last;
    }
  }
}

// node_modules/markdown-it/lib/parser_core.mjs
var _rules = [
  ["normalize", normalize],
  ["block", block],
  ["inline", inline],
  ["linkify", linkify],
  ["replacements", replace],
  ["smartquotes", smartquotes],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", text_join]
];
function Core() {
  this.ruler = new ruler_default();
  for (let i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}
Core.prototype.process = function(state) {
  const rules = this.ruler.getRules("");
  for (let i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};
Core.prototype.State = state_core_default;
var parser_core_default = Core;

// node_modules/markdown-it/lib/rules_block/state_block.mjs
function StateBlock(src, md, env, tokens) {
  this.src = src;
  this.md = md;
  this.env = env;
  this.tokens = tokens;
  this.bMarks = [];
  this.eMarks = [];
  this.tShift = [];
  this.sCount = [];
  this.bsCount = [];
  this.blkIndent = 0;
  this.line = 0;
  this.lineMax = 0;
  this.tight = false;
  this.ddIndent = -1;
  this.listIndent = -1;
  this.parentType = "root";
  this.level = 0;
  const s = this.src;
  for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
    const ch = s.charCodeAt(pos);
    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;
        if (ch === 9) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }
    if (ch === 10 || pos === len - 1) {
      if (ch !== 10) {
        pos++;
      }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);
      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);
  this.lineMax = this.bMarks.length - 1;
}
StateBlock.prototype.push = function(type, tag, nesting) {
  const token = new token_default(type, tag, nesting);
  token.block = true;
  if (nesting < 0) this.level--;
  token.level = this.level;
  if (nesting > 0) this.level++;
  this.tokens.push(token);
  return token;
};
StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};
StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (let max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  for (let max = this.src.length; pos < max; pos++) {
    const ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) {
      break;
    }
  }
  return pos;
};
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) {
    return pos;
  }
  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) {
      return pos + 1;
    }
  }
  return pos;
};
StateBlock.prototype.skipChars = function skipChars(pos, code2) {
  for (let max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code2) {
      break;
    }
  }
  return pos;
};
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
  if (pos <= min) {
    return pos;
  }
  while (pos > min) {
    if (code2 !== this.src.charCodeAt(--pos)) {
      return pos + 1;
    }
  }
  return pos;
};
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  if (begin >= end) {
    return "";
  }
  const queue = new Array(end - begin);
  for (let i = 0, line = begin; line < end; line++, i++) {
    let lineIndent = 0;
    const lineStart = this.bMarks[line];
    let first2 = lineStart;
    let last;
    if (line + 1 < end || keepLastLF) {
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }
    while (first2 < last && lineIndent < indent) {
      const ch = this.src.charCodeAt(first2);
      if (isSpace(ch)) {
        if (ch === 9) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first2 - lineStart < this.tShift[line]) {
        lineIndent++;
      } else {
        break;
      }
      first2++;
    }
    if (lineIndent > indent) {
      queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first2, last);
    } else {
      queue[i] = this.src.slice(first2, last);
    }
  }
  return queue.join("");
};
StateBlock.prototype.Token = token_default;
var state_block_default = StateBlock;

// node_modules/markdown-it/lib/rules_block/table.mjs
var MAX_AUTOCOMPLETED_CELLS = 65536;
function getLine(state, line) {
  const pos = state.bMarks[line] + state.tShift[line];
  const max = state.eMarks[line];
  return state.src.slice(pos, max);
}
function escapedSplit(str) {
  const result = [];
  const max = str.length;
  let pos = 0;
  let ch = str.charCodeAt(pos);
  let isEscaped = false;
  let lastPos = 0;
  let current = "";
  while (pos < max) {
    if (ch === 124) {
      if (!isEscaped) {
        result.push(current + str.substring(lastPos, pos));
        current = "";
        lastPos = pos + 1;
      } else {
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }
    isEscaped = ch === 92;
    pos++;
    ch = str.charCodeAt(pos);
  }
  result.push(current + str.substring(lastPos));
  return result;
}
function table(state, startLine, endLine, silent) {
  if (startLine + 2 > endLine) {
    return false;
  }
  let nextLine = startLine + 1;
  if (state.sCount[nextLine] < state.blkIndent) {
    return false;
  }
  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }
  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
    return false;
  }
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }
  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
    return false;
  }
  if (firstCh === 45 && isSpace(secondCh)) {
    return false;
  }
  while (pos < state.eMarks[nextLine]) {
    const ch = state.src.charCodeAt(pos);
    if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
      return false;
    }
    pos++;
  }
  let lineText = getLine(state, startLine + 1);
  let columns = lineText.split("|");
  const aligns = [];
  for (let i = 0; i < columns.length; i++) {
    const t = columns[i].trim();
    if (!t) {
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }
    if (!/^:?-+:?$/.test(t)) {
      return false;
    }
    if (t.charCodeAt(t.length - 1) === 58) {
      aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
    } else if (t.charCodeAt(0) === 58) {
      aligns.push("left");
    } else {
      aligns.push("");
    }
  }
  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf("|") === -1) {
    return false;
  }
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === "") columns.shift();
  if (columns.length && columns[columns.length - 1] === "") columns.pop();
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) {
    return false;
  }
  if (silent) {
    return true;
  }
  const oldParentType = state.parentType;
  state.parentType = "table";
  const terminatorRules = state.md.block.ruler.getRules("blockquote");
  const token_to = state.push("table_open", "table", 1);
  const tableLines = [startLine, 0];
  token_to.map = tableLines;
  const token_tho = state.push("thead_open", "thead", 1);
  token_tho.map = [startLine, startLine + 1];
  const token_htro = state.push("tr_open", "tr", 1);
  token_htro.map = [startLine, startLine + 1];
  for (let i = 0; i < columns.length; i++) {
    const token_ho = state.push("th_open", "th", 1);
    if (aligns[i]) {
      token_ho.attrs = [["style", "text-align:" + aligns[i]]];
    }
    const token_il = state.push("inline", "", 0);
    token_il.content = columns[i].trim();
    token_il.children = [];
    state.push("th_close", "th", -1);
  }
  state.push("tr_close", "tr", -1);
  state.push("thead_close", "thead", -1);
  let tbodyLines;
  let autocompletedCells = 0;
  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) {
      break;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === "") columns.shift();
    if (columns.length && columns[columns.length - 1] === "") columns.pop();
    autocompletedCells += columnCount - columns.length;
    if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
      break;
    }
    if (nextLine === startLine + 2) {
      const token_tbo = state.push("tbody_open", "tbody", 1);
      token_tbo.map = tbodyLines = [startLine + 2, 0];
    }
    const token_tro = state.push("tr_open", "tr", 1);
    token_tro.map = [nextLine, nextLine + 1];
    for (let i = 0; i < columnCount; i++) {
      const token_tdo = state.push("td_open", "td", 1);
      if (aligns[i]) {
        token_tdo.attrs = [["style", "text-align:" + aligns[i]]];
      }
      const token_il = state.push("inline", "", 0);
      token_il.content = columns[i] ? columns[i].trim() : "";
      token_il.children = [];
      state.push("td_close", "td", -1);
    }
    state.push("tr_close", "tr", -1);
  }
  if (tbodyLines) {
    state.push("tbody_close", "tbody", -1);
    tbodyLines[1] = nextLine;
  }
  state.push("table_close", "table", -1);
  tableLines[1] = nextLine;
  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
}

// node_modules/markdown-it/lib/rules_block/code.mjs
function code(state, startLine, endLine) {
  if (state.sCount[startLine] - state.blkIndent < 4) {
    return false;
  }
  let nextLine = startLine + 1;
  let last = nextLine;
  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }
  state.line = last;
  const token = state.push("code_block", "code", 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
  token.map = [startLine, state.line];
  return true;
}

// node_modules/markdown-it/lib/rules_block/fence.mjs
function fence(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (pos + 3 > max) {
    return false;
  }
  const marker = state.src.charCodeAt(pos);
  if (marker !== 126 && marker !== 96) {
    return false;
  }
  let mem = pos;
  pos = state.skipChars(pos, marker);
  let len = pos - mem;
  if (len < 3) {
    return false;
  }
  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);
  if (marker === 96) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }
  if (silent) {
    return true;
  }
  let nextLine = startLine;
  let haveEndMarker = false;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) {
      break;
    }
    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      continue;
    }
    pos = state.skipChars(pos, marker);
    if (pos - mem < len) {
      continue;
    }
    pos = state.skipSpaces(pos);
    if (pos < max) {
      continue;
    }
    haveEndMarker = true;
    break;
  }
  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  const token = state.push("fence", "code", 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
}

// node_modules/markdown-it/lib/rules_block/blockquote.mjs
function blockquote(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  const oldLineMax = state.lineMax;
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 62) {
    return false;
  }
  if (silent) {
    return true;
  }
  const oldBMarks = [];
  const oldBSCount = [];
  const oldSCount = [];
  const oldTShift = [];
  const terminatorRules = state.md.block.ruler.getRules("blockquote");
  const oldParentType = state.parentType;
  state.parentType = "blockquote";
  let lastLineEmpty = false;
  let nextLine;
  for (nextLine = startLine; nextLine < endLine; nextLine++) {
    const isOutdented = state.sCount[nextLine] < state.blkIndent;
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos >= max) {
      break;
    }
    if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
      let initial = state.sCount[nextLine] + 1;
      let spaceAfterMarker;
      let adjustTab;
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
          pos++;
          initial++;
          adjustTab = false;
        } else {
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }
      let offset = initial;
      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;
      while (pos < max) {
        const ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      lastLineEmpty = pos >= max;
      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;
      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }
    if (lastLineEmpty) {
      break;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      state.lineMax = nextLine;
      if (state.blkIndent !== 0) {
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }
      break;
    }
    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);
    state.sCount[nextLine] = -1;
  }
  const oldIndent = state.blkIndent;
  state.blkIndent = 0;
  const token_o = state.push("blockquote_open", "blockquote", 1);
  token_o.markup = ">";
  const lines = [startLine, 0];
  token_o.map = lines;
  state.md.block.tokenize(state, startLine, nextLine);
  const token_c = state.push("blockquote_close", "blockquote", -1);
  token_c.markup = ">";
  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;
  for (let i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;
  return true;
}

// node_modules/markdown-it/lib/rules_block/hr.mjs
function hr(state, startLine, endLine, silent) {
  const max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 95) {
    return false;
  }
  let cnt = 1;
  while (pos < max) {
    const ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) {
      return false;
    }
    if (ch === marker) {
      cnt++;
    }
  }
  if (cnt < 3) {
    return false;
  }
  if (silent) {
    return true;
  }
  state.line = startLine + 1;
  const token = state.push("hr", "hr", 0);
  token.map = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
  return true;
}

// node_modules/markdown-it/lib/rules_block/list.mjs
function skipBulletListMarker(state, startLine) {
  const max = state.eMarks[startLine];
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 43) {
    return -1;
  }
  if (pos < max) {
    const ch = state.src.charCodeAt(pos);
    if (!isSpace(ch)) {
      return -1;
    }
  }
  return pos;
}
function skipOrderedListMarker(state, startLine) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  let pos = start;
  if (pos + 1 >= max) {
    return -1;
  }
  let ch = state.src.charCodeAt(pos++);
  if (ch < 48 || ch > 57) {
    return -1;
  }
  for (; ; ) {
    if (pos >= max) {
      return -1;
    }
    ch = state.src.charCodeAt(pos++);
    if (ch >= 48 && ch <= 57) {
      if (pos - start >= 10) {
        return -1;
      }
      continue;
    }
    if (ch === 41 || ch === 46) {
      break;
    }
    return -1;
  }
  if (pos < max) {
    ch = state.src.charCodeAt(pos);
    if (!isSpace(ch)) {
      return -1;
    }
  }
  return pos;
}
function markTightParagraphs(state, idx) {
  const level = state.level + 2;
  for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}
function list(state, startLine, endLine, silent) {
  let max, pos, start, token;
  let nextLine = startLine;
  let tight = true;
  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
    return false;
  }
  let isTerminatingParagraph = false;
  if (silent && state.parentType === "paragraph") {
    if (state.sCount[nextLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }
  let isOrdered;
  let markerValue;
  let posAfterMarker;
  if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[nextLine] + state.tShift[nextLine];
    markerValue = Number(state.src.slice(start, posAfterMarker - 1));
    if (isTerminatingParagraph && markerValue !== 1) return false;
  } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
    isOrdered = false;
  } else {
    return false;
  }
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
  }
  if (silent) {
    return true;
  }
  const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
  const listTokIdx = state.tokens.length;
  if (isOrdered) {
    token = state.push("ordered_list_open", "ol", 1);
    if (markerValue !== 1) {
      token.attrs = [["start", markerValue]];
    }
  } else {
    token = state.push("bullet_list_open", "ul", 1);
  }
  const listLines = [nextLine, 0];
  token.map = listLines;
  token.markup = String.fromCharCode(markerCharCode);
  let prevEmptyEnd = false;
  const terminatorRules = state.md.block.ruler.getRules("list");
  const oldParentType = state.parentType;
  state.parentType = "list";
  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];
    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
    let offset = initial;
    while (pos < max) {
      const ch = state.src.charCodeAt(pos);
      if (ch === 9) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 32) {
        offset++;
      } else {
        break;
      }
      pos++;
    }
    const contentStart = pos;
    let indentAfterMarker;
    if (contentStart >= max) {
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }
    if (indentAfterMarker > 4) {
      indentAfterMarker = 1;
    }
    const indent = initial + indentAfterMarker;
    token = state.push("list_item_open", "li", 1);
    token.markup = String.fromCharCode(markerCharCode);
    const itemLines = [nextLine, 0];
    token.map = itemLines;
    if (isOrdered) {
      token.info = state.src.slice(start, posAfterMarker - 1);
    }
    const oldTight = state.tight;
    const oldTShift = state.tShift[nextLine];
    const oldSCount = state.sCount[nextLine];
    const oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;
    state.tight = true;
    state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
    state.sCount[nextLine] = offset;
    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, nextLine, endLine, true);
    }
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[nextLine] = oldTShift;
    state.sCount[nextLine] = oldSCount;
    state.tight = oldTight;
    token = state.push("list_item_close", "li", -1);
    token.markup = String.fromCharCode(markerCharCode);
    nextLine = state.line;
    itemLines[1] = nextLine;
    if (nextLine >= endLine) {
      break;
    }
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
    }
    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
      break;
    }
  }
  if (isOrdered) {
    token = state.push("ordered_list_close", "ol", -1);
  } else {
    token = state.push("bullet_list_close", "ul", -1);
  }
  token.markup = String.fromCharCode(markerCharCode);
  listLines[1] = nextLine;
  state.line = nextLine;
  state.parentType = oldParentType;
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }
  return true;
}

// node_modules/markdown-it/lib/rules_block/reference.mjs
function reference(state, startLine, _endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  let nextLine = startLine + 1;
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 91) {
    return false;
  }
  function getNextLine(nextLine2) {
    const endLine = state.lineMax;
    if (nextLine2 >= endLine || state.isEmpty(nextLine2)) {
      return null;
    }
    let isContinuation = false;
    if (state.sCount[nextLine2] - state.blkIndent > 3) {
      isContinuation = true;
    }
    if (state.sCount[nextLine2] < 0) {
      isContinuation = true;
    }
    if (!isContinuation) {
      const terminatorRules = state.md.block.ruler.getRules("reference");
      const oldParentType = state.parentType;
      state.parentType = "reference";
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine2, endLine, true)) {
          terminate = true;
          break;
        }
      }
      state.parentType = oldParentType;
      if (terminate) {
        return null;
      }
    }
    const pos2 = state.bMarks[nextLine2] + state.tShift[nextLine2];
    const max2 = state.eMarks[nextLine2];
    return state.src.slice(pos2, max2 + 1);
  }
  let str = state.src.slice(pos, max + 1);
  max = str.length;
  let labelEnd = -1;
  for (pos = 1; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 91) {
      return false;
    } else if (ch === 93) {
      labelEnd = pos;
      break;
    } else if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (ch === 92) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      }
    }
  }
  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
    return false;
  }
  for (pos = labelEnd + 2; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (isSpace(ch)) {
    } else {
      break;
    }
  }
  const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!destRes.ok) {
    return false;
  }
  const href = state.md.normalizeLink(destRes.str);
  if (!state.md.validateLink(href)) {
    return false;
  }
  pos = destRes.pos;
  const destEndPos = pos;
  const destEndLineNo = nextLine;
  const start = pos;
  for (; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (isSpace(ch)) {
    } else {
      break;
    }
  }
  let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
  while (titleRes.can_continue) {
    const lineContent = getNextLine(nextLine);
    if (lineContent === null) break;
    str += lineContent;
    pos = max;
    max = str.length;
    nextLine++;
    titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
  }
  let title;
  if (pos < max && start !== pos && titleRes.ok) {
    title = titleRes.str;
    pos = titleRes.pos;
  } else {
    title = "";
    pos = destEndPos;
    nextLine = destEndLineNo;
  }
  while (pos < max) {
    const ch = str.charCodeAt(pos);
    if (!isSpace(ch)) {
      break;
    }
    pos++;
  }
  if (pos < max && str.charCodeAt(pos) !== 10) {
    if (title) {
      title = "";
      pos = destEndPos;
      nextLine = destEndLineNo;
      while (pos < max) {
        const ch = str.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
        pos++;
      }
    }
  }
  if (pos < max && str.charCodeAt(pos) !== 10) {
    return false;
  }
  const label = normalizeReference(str.slice(1, labelEnd));
  if (!label) {
    return false;
  }
  if (silent) {
    return true;
  }
  if (typeof state.env.references === "undefined") {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === "undefined") {
    state.env.references[label] = { title, href };
  }
  state.line = nextLine;
  return true;
}

// node_modules/markdown-it/lib/common/html_blocks.mjs
var html_blocks_default = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];

// node_modules/markdown-it/lib/common/html_re.mjs
var attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
var unquoted = "[^\"'=<>`\\x00-\\x20]+";
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';
var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
var comment = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->";
var processing = "<[?][\\s\\S]*?[?]>";
var declaration = "<![A-Za-z][^>]*>";
var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");

// node_modules/markdown-it/lib/rules_block/html_block.mjs
var HTML_SEQUENCES = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
  [/^<!--/, /-->/, true],
  [/^<\?/, /\?>/, true],
  [/^<![A-Z]/, />/, true],
  [/^<!\[CDATA\[/, /\]\]>/, true],
  [new RegExp("^</?(" + html_blocks_default.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
  [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
];
function html_block(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (!state.md.options.html) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 60) {
    return false;
  }
  let lineText = state.src.slice(pos, max);
  let i = 0;
  for (; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) {
      break;
    }
  }
  if (i === HTML_SEQUENCES.length) {
    return false;
  }
  if (silent) {
    return HTML_SEQUENCES[i][2];
  }
  let nextLine = startLine + 1;
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);
      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) {
          nextLine++;
        }
        break;
      }
    }
  }
  state.line = nextLine;
  const token = state.push("html_block", "", 0);
  token.map = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
  return true;
}

// node_modules/markdown-it/lib/rules_block/heading.mjs
function heading(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let ch = state.src.charCodeAt(pos);
  if (ch !== 35 || pos >= max) {
    return false;
  }
  let level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 35 && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }
  if (level > 6 || pos < max && !isSpace(ch)) {
    return false;
  }
  if (silent) {
    return true;
  }
  max = state.skipSpacesBack(max, pos);
  const tmp = state.skipCharsBack(max, 35, pos);
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }
  state.line = startLine + 1;
  const token_o = state.push("heading_open", "h" + String(level), 1);
  token_o.markup = "########".slice(0, level);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = state.src.slice(pos, max).trim();
  token_i.map = [startLine, state.line];
  token_i.children = [];
  const token_c = state.push("heading_close", "h" + String(level), -1);
  token_c.markup = "########".slice(0, level);
  return true;
}

// node_modules/markdown-it/lib/rules_block/lheading.mjs
function lheading(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules("paragraph");
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  const oldParentType = state.parentType;
  state.parentType = "paragraph";
  let level = 0;
  let marker;
  let nextLine = startLine + 1;
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] >= state.blkIndent) {
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];
      if (pos < max) {
        marker = state.src.charCodeAt(pos);
        if (marker === 45 || marker === 61) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);
          if (pos >= max) {
            level = marker === 61 ? 1 : 2;
            break;
          }
        }
      }
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  if (!level) {
    return false;
  }
  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine + 1;
  const token_o = state.push("heading_open", "h" + String(level), 1);
  token_o.markup = String.fromCharCode(marker);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line - 1];
  token_i.children = [];
  const token_c = state.push("heading_close", "h" + String(level), -1);
  token_c.markup = String.fromCharCode(marker);
  state.parentType = oldParentType;
  return true;
}

// node_modules/markdown-it/lib/rules_block/paragraph.mjs
function paragraph(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules("paragraph");
  const oldParentType = state.parentType;
  let nextLine = startLine + 1;
  state.parentType = "paragraph";
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine;
  const token_o = state.push("paragraph_open", "p", 1);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line];
  token_i.children = [];
  state.push("paragraph_close", "p", -1);
  state.parentType = oldParentType;
  return true;
}

// node_modules/markdown-it/lib/parser_block.mjs
var _rules2 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", table, ["paragraph", "reference"]],
  ["code", code],
  ["fence", fence, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", blockquote, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", hr, ["paragraph", "reference", "blockquote", "list"]],
  ["list", list, ["paragraph", "reference", "blockquote"]],
  ["reference", reference],
  ["html_block", html_block, ["paragraph", "reference", "blockquote"]],
  ["heading", heading, ["paragraph", "reference", "blockquote"]],
  ["lheading", lheading],
  ["paragraph", paragraph]
];
function ParserBlock() {
  this.ruler = new ruler_default();
  for (let i = 0; i < _rules2.length; i++) {
    this.ruler.push(_rules2[i][0], _rules2[i][1], { alt: (_rules2[i][2] || []).slice() });
  }
}
ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  let line = startLine;
  let hasEmptyLines = false;
  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) {
      break;
    }
    if (state.sCount[line] < state.blkIndent) {
      break;
    }
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }
    const prevLine = state.line;
    let ok = false;
    for (let i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) {
        if (prevLine >= state.line) {
          throw new Error("block rule didn't increment state.line");
        }
        break;
      }
    }
    if (!ok) throw new Error("none of the block rules matched");
    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }
    line = state.line;
    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};
ParserBlock.prototype.parse = function(src, md, env, outTokens) {
  if (!src) {
    return;
  }
  const state = new this.State(src, md, env, outTokens);
  this.tokenize(state, state.line, state.lineMax);
};
ParserBlock.prototype.State = state_block_default;
var parser_block_default = ParserBlock;

// node_modules/markdown-it/lib/rules_inline/state_inline.mjs
function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);
  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = "";
  this.pendingLevel = 0;
  this.cache = {};
  this.delimiters = [];
  this._prev_delimiters = [];
  this.backticks = {};
  this.backticksScanned = false;
  this.linkLevel = 0;
}
StateInline.prototype.pushPending = function() {
  const token = new token_default("text", "", 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = "";
  return token;
};
StateInline.prototype.push = function(type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }
  const token = new token_default(type, tag, nesting);
  let token_meta = null;
  if (nesting < 0) {
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }
  token.level = this.level;
  if (nesting > 0) {
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }
  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token;
};
StateInline.prototype.scanDelims = function(start, canSplitWord) {
  const max = this.posMax;
  const marker = this.src.charCodeAt(start);
  const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
  let pos = start;
  while (pos < max && this.src.charCodeAt(pos) === marker) {
    pos++;
  }
  const count = pos - start;
  const nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
  const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
  const isLastWhiteSpace = isWhiteSpace(lastChar);
  const isNextWhiteSpace = isWhiteSpace(nextChar);
  const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
  const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
  const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
  const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
  return { can_open, can_close, length: count };
};
StateInline.prototype.Token = token_default;
var state_inline_default = StateInline;

// node_modules/markdown-it/lib/rules_inline/text.mjs
function isTerminatorChar(ch) {
  switch (ch) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function text(state, silent) {
  let pos = state.pos;
  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }
  if (pos === state.pos) {
    return false;
  }
  if (!silent) {
    state.pending += state.src.slice(state.pos, pos);
  }
  state.pos = pos;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/linkify.mjs
var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function linkify2(state, silent) {
  if (!state.md.options.linkify) return false;
  if (state.linkLevel > 0) return false;
  const pos = state.pos;
  const max = state.posMax;
  if (pos + 3 > max) return false;
  if (state.src.charCodeAt(pos) !== 58) return false;
  if (state.src.charCodeAt(pos + 1) !== 47) return false;
  if (state.src.charCodeAt(pos + 2) !== 47) return false;
  const match2 = state.pending.match(SCHEME_RE);
  if (!match2) return false;
  const proto = match2[1];
  const link2 = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
  if (!link2) return false;
  let url = link2.url;
  if (url.length <= proto.length) return false;
  url = url.replace(/\*+$/, "");
  const fullUrl = state.md.normalizeLink(url);
  if (!state.md.validateLink(fullUrl)) return false;
  if (!silent) {
    state.pending = state.pending.slice(0, -proto.length);
    const token_o = state.push("link_open", "a", 1);
    token_o.attrs = [["href", fullUrl]];
    token_o.markup = "linkify";
    token_o.info = "auto";
    const token_t = state.push("text", "", 0);
    token_t.content = state.md.normalizeLinkText(url);
    const token_c = state.push("link_close", "a", -1);
    token_c.markup = "linkify";
    token_c.info = "auto";
  }
  state.pos += url.length - proto.length;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/newline.mjs
function newline(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 10) {
    return false;
  }
  const pmax = state.pending.length - 1;
  const max = state.posMax;
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
        let ws = pmax - 1;
        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
        state.pending = state.pending.slice(0, ws);
        state.push("hardbreak", "br", 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push("softbreak", "br", 0);
      }
    } else {
      state.push("softbreak", "br", 0);
    }
  }
  pos++;
  while (pos < max && isSpace(state.src.charCodeAt(pos))) {
    pos++;
  }
  state.pos = pos;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/escape.mjs
var ESCAPED = [];
for (let i = 0; i < 256; i++) {
  ESCAPED.push(0);
}
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
  ESCAPED[ch.charCodeAt(0)] = 1;
});
function escape2(state, silent) {
  let pos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 92) return false;
  pos++;
  if (pos >= max) return false;
  let ch1 = state.src.charCodeAt(pos);
  if (ch1 === 10) {
    if (!silent) {
      state.push("hardbreak", "br", 0);
    }
    pos++;
    while (pos < max) {
      ch1 = state.src.charCodeAt(pos);
      if (!isSpace(ch1)) break;
      pos++;
    }
    state.pos = pos;
    return true;
  }
  let escapedStr = state.src[pos];
  if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
    const ch2 = state.src.charCodeAt(pos + 1);
    if (ch2 >= 56320 && ch2 <= 57343) {
      escapedStr += state.src[pos + 1];
      pos++;
    }
  }
  const origStr = "\\" + escapedStr;
  if (!silent) {
    const token = state.push("text_special", "", 0);
    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
      token.content = escapedStr;
    } else {
      token.content = origStr;
    }
    token.markup = origStr;
    token.info = "escape";
  }
  state.pos = pos + 1;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/backticks.mjs
function backtick(state, silent) {
  let pos = state.pos;
  const ch = state.src.charCodeAt(pos);
  if (ch !== 96) {
    return false;
  }
  const start = pos;
  pos++;
  const max = state.posMax;
  while (pos < max && state.src.charCodeAt(pos) === 96) {
    pos++;
  }
  const marker = state.src.slice(start, pos);
  const openerLength = marker.length;
  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }
  let matchEnd = pos;
  let matchStart;
  while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
    matchEnd = matchStart + 1;
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
      matchEnd++;
    }
    const closerLength = matchEnd - matchStart;
    if (closerLength === openerLength) {
      if (!silent) {
        const token = state.push("code_inline", "code", 0);
        token.markup = marker;
        token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      state.pos = matchEnd;
      return true;
    }
    state.backticks[closerLength] = matchStart;
  }
  state.backticksScanned = true;
  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/strikethrough.mjs
function strikethrough_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) {
    return false;
  }
  if (marker !== 126) {
    return false;
  }
  const scanned = state.scanDelims(state.pos, true);
  let len = scanned.length;
  const ch = String.fromCharCode(marker);
  if (len < 2) {
    return false;
  }
  let token;
  if (len % 2) {
    token = state.push("text", "", 0);
    token.content = ch;
    len--;
  }
  for (let i = 0; i < len; i += 2) {
    token = state.push("text", "", 0);
    token.content = ch + ch;
    state.delimiters.push({
      marker,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess(state, delimiters) {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;
  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i];
    if (startDelim.marker !== 126) {
      continue;
    }
    if (startDelim.end === -1) {
      continue;
    }
    const endDelim = delimiters[startDelim.end];
    token = state.tokens[startDelim.token];
    token.type = "s_open";
    token.tag = "s";
    token.nesting = 1;
    token.markup = "~~";
    token.content = "";
    token = state.tokens[endDelim.token];
    token.type = "s_close";
    token.tag = "s";
    token.nesting = -1;
    token.markup = "~~";
    token.content = "";
    if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
      loneMarkers.push(endDelim.token - 1);
    }
  }
  while (loneMarkers.length) {
    const i = loneMarkers.pop();
    let j = i + 1;
    while (j < state.tokens.length && state.tokens[j].type === "s_close") {
      j++;
    }
    j--;
    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}
function strikethrough_postProcess(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  postProcess(state, state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
}
var strikethrough_default = {
  tokenize: strikethrough_tokenize,
  postProcess: strikethrough_postProcess
};

// node_modules/markdown-it/lib/rules_inline/emphasis.mjs
function emphasis_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) {
    return false;
  }
  if (marker !== 95 && marker !== 42) {
    return false;
  }
  const scanned = state.scanDelims(state.pos, marker === 42);
  for (let i = 0; i < scanned.length; i++) {
    const token = state.push("text", "", 0);
    token.content = String.fromCharCode(marker);
    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker,
      // Total length of these series of delimiters.
      //
      length: scanned.length,
      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess2(state, delimiters) {
  const max = delimiters.length;
  for (let i = max - 1; i >= 0; i--) {
    const startDelim = delimiters[i];
    if (startDelim.marker !== 95 && startDelim.marker !== 42) {
      continue;
    }
    if (startDelim.end === -1) {
      continue;
    }
    const endDelim = delimiters[startDelim.end];
    const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
    delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    delimiters[startDelim.end + 1].token === endDelim.token + 1;
    const ch = String.fromCharCode(startDelim.marker);
    const token_o = state.tokens[startDelim.token];
    token_o.type = isStrong ? "strong_open" : "em_open";
    token_o.tag = isStrong ? "strong" : "em";
    token_o.nesting = 1;
    token_o.markup = isStrong ? ch + ch : ch;
    token_o.content = "";
    const token_c = state.tokens[endDelim.token];
    token_c.type = isStrong ? "strong_close" : "em_close";
    token_c.tag = isStrong ? "strong" : "em";
    token_c.nesting = -1;
    token_c.markup = isStrong ? ch + ch : ch;
    token_c.content = "";
    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = "";
      state.tokens[delimiters[startDelim.end + 1].token].content = "";
      i--;
    }
  }
}
function emphasis_post_process(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  postProcess2(state, state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess2(state, tokens_meta[curr].delimiters);
    }
  }
}
var emphasis_default = {
  tokenize: emphasis_tokenize,
  postProcess: emphasis_post_process
};

// node_modules/markdown-it/lib/rules_inline/link.mjs
function link(state, silent) {
  let code2, label, res, ref;
  let href = "";
  let title = "";
  let start = state.pos;
  let parseReference = true;
  if (state.src.charCodeAt(state.pos) !== 91) {
    return false;
  }
  const oldPos = state.pos;
  const max = state.posMax;
  const labelStart = state.pos + 1;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
  if (labelEnd < 0) {
    return false;
  }
  let pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 40) {
    parseReference = false;
    pos++;
    for (; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (!isSpace(code2) && code2 !== 10) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = "";
      }
      start = pos;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
      }
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 41) {
      parseReference = true;
    }
    pos++;
  }
  if (parseReference) {
    if (typeof state.env.references === "undefined") {
      return false;
    }
    if (pos < max && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;
    const token_o = state.push("link_open", "a", 1);
    const attrs = [["href", href]];
    token_o.attrs = attrs;
    if (title) {
      attrs.push(["title", title]);
    }
    state.linkLevel++;
    state.md.inline.tokenize(state);
    state.linkLevel--;
    state.push("link_close", "a", -1);
  }
  state.pos = pos;
  state.posMax = max;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/image.mjs
function image(state, silent) {
  let code2, content, label, pos, ref, res, title, start;
  let href = "";
  const oldPos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(state.pos) !== 33) {
    return false;
  }
  if (state.src.charCodeAt(state.pos + 1) !== 91) {
    return false;
  }
  const labelStart = state.pos + 2;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
  if (labelEnd < 0) {
    return false;
  }
  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 40) {
    pos++;
    for (; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (!isSpace(code2) && code2 !== 10) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = "";
      }
    }
    start = pos;
    for (; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (!isSpace(code2) && code2 !== 10) {
        break;
      }
    }
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
    } else {
      title = "";
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 41) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    if (typeof state.env.references === "undefined") {
      return false;
    }
    if (pos < max && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);
    const tokens = [];
    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens
    );
    const token = state.push("image", "img", 0);
    const attrs = [["src", href], ["alt", ""]];
    token.attrs = attrs;
    token.children = tokens;
    token.content = content;
    if (title) {
      attrs.push(["title", title]);
    }
  }
  state.pos = pos;
  state.posMax = max;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/autolink.mjs
var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function autolink(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 60) {
    return false;
  }
  const start = state.pos;
  const max = state.posMax;
  for (; ; ) {
    if (++pos >= max) return false;
    const ch = state.src.charCodeAt(pos);
    if (ch === 60) return false;
    if (ch === 62) break;
  }
  const url = state.src.slice(start + 1, pos);
  if (AUTOLINK_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) {
      return false;
    }
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  if (EMAIL_RE.test(url)) {
    const fullUrl = state.md.normalizeLink("mailto:" + url);
    if (!state.md.validateLink(fullUrl)) {
      return false;
    }
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  return false;
}

// node_modules/markdown-it/lib/rules_inline/html_inline.mjs
function isLinkOpen2(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose2(str) {
  return /^<\/a\s*>/i.test(str);
}
function isLetter(ch) {
  const lc = ch | 32;
  return lc >= 97 && lc <= 122;
}
function html_inline(state, silent) {
  if (!state.md.options.html) {
    return false;
  }
  const max = state.posMax;
  const pos = state.pos;
  if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
    return false;
  }
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
    return false;
  }
  const match2 = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match2) {
    return false;
  }
  if (!silent) {
    const token = state.push("html_inline", "", 0);
    token.content = match2[0];
    if (isLinkOpen2(token.content)) state.linkLevel++;
    if (isLinkClose2(token.content)) state.linkLevel--;
  }
  state.pos += match2[0].length;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/entity.mjs
var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
function entity(state, silent) {
  const pos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 38) return false;
  if (pos + 1 >= max) return false;
  const ch = state.src.charCodeAt(pos + 1);
  if (ch === 35) {
    const match2 = state.src.slice(pos).match(DIGITAL_RE);
    if (match2) {
      if (!silent) {
        const code2 = match2[1][0].toLowerCase() === "x" ? parseInt(match2[1].slice(1), 16) : parseInt(match2[1], 10);
        const token = state.push("text_special", "", 0);
        token.content = isValidEntityCode(code2) ? fromCodePoint2(code2) : fromCodePoint2(65533);
        token.markup = match2[0];
        token.info = "entity";
      }
      state.pos += match2[0].length;
      return true;
    }
  } else {
    const match2 = state.src.slice(pos).match(NAMED_RE);
    if (match2) {
      const decoded = decodeHTML(match2[0]);
      if (decoded !== match2[0]) {
        if (!silent) {
          const token = state.push("text_special", "", 0);
          token.content = decoded;
          token.markup = match2[0];
          token.info = "entity";
        }
        state.pos += match2[0].length;
        return true;
      }
    }
  }
  return false;
}

// node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs
function processDelimiters(delimiters) {
  const openersBottom = {};
  const max = delimiters.length;
  if (!max) return;
  let headerIdx = 0;
  let lastTokenIdx = -2;
  const jumps = [];
  for (let closerIdx = 0; closerIdx < max; closerIdx++) {
    const closer = delimiters[closerIdx];
    jumps.push(0);
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
      headerIdx = closerIdx;
    }
    lastTokenIdx = closer.token;
    closer.length = closer.length || 0;
    if (!closer.close) continue;
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
    }
    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
    let openerIdx = headerIdx - jumps[headerIdx] - 1;
    let newMinOpenerIdx = openerIdx;
    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      const opener = delimiters[openerIdx];
      if (opener.marker !== closer.marker) continue;
      if (opener.open && opener.end < 0) {
        let isOddMatch = false;
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }
        if (!isOddMatch) {
          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;
          closer.open = false;
          opener.end = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          lastTokenIdx = -2;
          break;
        }
      }
    }
    if (newMinOpenerIdx !== -1) {
      openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
    }
  }
}
function link_pairs(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  processDelimiters(state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(tokens_meta[curr].delimiters);
    }
  }
}

// node_modules/markdown-it/lib/rules_inline/fragments_join.mjs
function fragments_join(state) {
  let curr, last;
  let level = 0;
  const tokens = state.tokens;
  const max = state.tokens.length;
  for (curr = last = 0; curr < max; curr++) {
    if (tokens[curr].nesting < 0) level--;
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++;
    if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) {
        tokens[last] = tokens[curr];
      }
      last++;
    }
  }
  if (curr !== last) {
    tokens.length = last;
  }
}

// node_modules/markdown-it/lib/parser_inline.mjs
var _rules3 = [
  ["text", text],
  ["linkify", linkify2],
  ["newline", newline],
  ["escape", escape2],
  ["backticks", backtick],
  ["strikethrough", strikethrough_default.tokenize],
  ["emphasis", emphasis_default.tokenize],
  ["link", link],
  ["image", image],
  ["autolink", autolink],
  ["html_inline", html_inline],
  ["entity", entity]
];
var _rules22 = [
  ["balance_pairs", link_pairs],
  ["strikethrough", strikethrough_default.postProcess],
  ["emphasis", emphasis_default.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", fragments_join]
];
function ParserInline() {
  this.ruler = new ruler_default();
  for (let i = 0; i < _rules3.length; i++) {
    this.ruler.push(_rules3[i][0], _rules3[i][1]);
  }
  this.ruler2 = new ruler_default();
  for (let i = 0; i < _rules22.length; i++) {
    this.ruler2.push(_rules22[i][0], _rules22[i][1]);
  }
}
ParserInline.prototype.skipToken = function(state) {
  const pos = state.pos;
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  const cache = state.cache;
  if (typeof cache[pos] !== "undefined") {
    state.pos = cache[pos];
    return;
  }
  let ok = false;
  if (state.level < maxNesting) {
    for (let i = 0; i < len; i++) {
      state.level++;
      ok = rules[i](state, true);
      state.level--;
      if (ok) {
        if (pos >= state.pos) {
          throw new Error("inline rule didn't increment state.pos");
        }
        break;
      }
    }
  } else {
    state.pos = state.posMax;
  }
  if (!ok) {
    state.pos++;
  }
  cache[pos] = state.pos;
};
ParserInline.prototype.tokenize = function(state) {
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const end = state.posMax;
  const maxNesting = state.md.options.maxNesting;
  while (state.pos < end) {
    const prevPos = state.pos;
    let ok = false;
    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) {
          if (prevPos >= state.pos) {
            throw new Error("inline rule didn't increment state.pos");
          }
          break;
        }
      }
    }
    if (ok) {
      if (state.pos >= end) {
        break;
      }
      continue;
    }
    state.pending += state.src[state.pos++];
  }
  if (state.pending) {
    state.pushPending();
  }
};
ParserInline.prototype.parse = function(str, md, env, outTokens) {
  const state = new this.State(str, md, env, outTokens);
  this.tokenize(state);
  const rules = this.ruler2.getRules("");
  const len = rules.length;
  for (let i = 0; i < len; i++) {
    rules[i](state);
  }
};
ParserInline.prototype.State = state_inline_default;
var parser_inline_default = ParserInline;

// node_modules/linkify-it/lib/re.mjs
function re_default(opts) {
  const re = {};
  opts = opts || {};
  re.src_Any = regex_default.source;
  re.src_Cc = regex_default2.source;
  re.src_Z = regex_default6.source;
  re.src_P = regex_default4.source;
  re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join("|");
  re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
  const text_separators = "[><\uFF5C]";
  re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
  re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
  re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
  re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
  re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
  re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + re.src_ZCc + "|$)|;(?!" + re.src_ZCc + "|$)|\\!+(?!" + re.src_ZCc + "|[!]|$)|\\?(?!" + re.src_ZCc + "|[?]|$))+|\\/)?";
  re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
  re.src_xn = "xn--[a-z0-9\\-]{1,59}";
  re.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
  re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
  re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
  re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
  re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
  re.src_host_strict = re.src_host + re.src_host_terminator;
  re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
  re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
  re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
  re.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
  re.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + re.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
  re.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + re.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
  return re;
}

// node_modules/linkify-it/index.mjs
function assign2(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function(source) {
    if (!source) {
      return;
    }
    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });
  return obj;
}
function _class2(obj) {
  return Object.prototype.toString.call(obj);
}
function isString2(obj) {
  return _class2(obj) === "[object String]";
}
function isObject(obj) {
  return _class2(obj) === "[object Object]";
}
function isRegExp(obj) {
  return _class2(obj) === "[object RegExp]";
}
function isFunction(obj) {
  return _class2(obj) === "[object Function]";
}
function escapeRE2(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};
function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function(acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}
var defaultSchemas = {
  "http:": {
    validate: function(text2, pos, self) {
      const tail = text2.slice(pos);
      if (!self.re.http) {
        self.re.http = new RegExp(
          "^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path,
          "i"
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(text2, pos, self) {
      const tail = text2.slice(pos);
      if (!self.re.no_http) {
        self.re.no_http = new RegExp(
          "^" + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path,
          "i"
        );
      }
      if (self.re.no_http.test(tail)) {
        if (pos >= 3 && text2[pos - 3] === ":") {
          return 0;
        }
        if (pos >= 3 && text2[pos - 3] === "/") {
          return 0;
        }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  "mailto:": {
    validate: function(text2, pos, self) {
      const tail = text2.slice(pos);
      if (!self.re.mailto) {
        self.re.mailto = new RegExp(
          "^" + self.re.src_email_name + "@" + self.re.src_host_strict,
          "i"
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};
var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");
function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__ = "";
}
function createValidator(re) {
  return function(text2, pos) {
    const tail = text2.slice(pos);
    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}
function createNormalizer() {
  return function(match2, self) {
    self.normalize(match2);
  };
}
function compile(self) {
  const re = self.re = re_default(self.__opts__);
  const tlds2 = self.__tlds__.slice();
  self.onCompile();
  if (!self.__tlds_replaced__) {
    tlds2.push(tlds_2ch_src_re);
  }
  tlds2.push(re.src_xn);
  re.src_tlds = tlds2.join("|");
  function untpl(tpl) {
    return tpl.replace("%TLDS%", re.src_tlds);
  }
  re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
  re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
  re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
  const aliases = [];
  self.__compiled__ = {};
  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }
  Object.keys(self.__schemas__).forEach(function(name) {
    const val = self.__schemas__[name];
    if (val === null) {
      return;
    }
    const compiled = { validate: null, link: null };
    self.__compiled__[name] = compiled;
    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }
      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }
      return;
    }
    if (isString2(val)) {
      aliases.push(name);
      return;
    }
    schemaError(name, val);
  });
  aliases.forEach(function(alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      return;
    }
    self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
  });
  self.__compiled__[""] = { validate: null, normalize: createNormalizer() };
  const slist = Object.keys(self.__compiled__).filter(function(name) {
    return name.length > 0 && self.__compiled__[name];
  }).map(escapeRE2).join("|");
  self.re.schema_test = RegExp("(^|(?!_)(?:[><\uFF5C]|" + re.src_ZPCc + "))(" + slist + ")", "i");
  self.re.schema_search = RegExp("(^|(?!_)(?:[><\uFF5C]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
  self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
  self.re.pretest = RegExp(
    "(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@",
    "i"
  );
  resetScanCache(self);
}
function Match(self, shift) {
  const start = self.__index__;
  const end = self.__last_index__;
  const text2 = self.__text_cache__.slice(start, end);
  this.schema = self.__schema__.toLowerCase();
  this.index = start + shift;
  this.lastIndex = end + shift;
  this.raw = text2;
  this.text = text2;
  this.url = text2;
}
function createMatch(self, shift) {
  const match2 = new Match(self, shift);
  self.__compiled__[match2.schema].normalize(match2, self);
  return match2;
}
function LinkifyIt(schemas, options2) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options2);
  }
  if (!options2) {
    if (isOptionsObj(schemas)) {
      options2 = schemas;
      schemas = {};
    }
  }
  this.__opts__ = assign2({}, defaultOptions, options2);
  this.__index__ = -1;
  this.__last_index__ = -1;
  this.__schema__ = "";
  this.__text_cache__ = "";
  this.__schemas__ = assign2({}, defaultSchemas, schemas);
  this.__compiled__ = {};
  this.__tlds__ = tlds_default;
  this.__tlds_replaced__ = false;
  this.re = {};
  compile(this);
}
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};
LinkifyIt.prototype.set = function set(options2) {
  this.__opts__ = assign2(this.__opts__, options2);
  return this;
};
LinkifyIt.prototype.test = function test(text2) {
  this.__text_cache__ = text2;
  this.__index__ = -1;
  if (!text2.length) {
    return false;
  }
  let m, ml, me, len, shift, next, re, tld_pos, at_pos;
  if (this.re.schema_test.test(text2)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text2)) !== null) {
      len = this.testSchemaAt(text2, m[2], re.lastIndex);
      if (len) {
        this.__schema__ = m[2];
        this.__index__ = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }
  if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
    tld_pos = text2.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
          shift = ml.index + ml[1].length;
          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__ = "";
            this.__index__ = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }
  if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
    at_pos = text2.indexOf("@");
    if (at_pos >= 0) {
      if ((me = text2.match(this.re.email_fuzzy)) !== null) {
        shift = me.index + me[1].length;
        next = me.index + me[0].length;
        if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
          this.__schema__ = "mailto:";
          this.__index__ = shift;
          this.__last_index__ = next;
        }
      }
    }
  }
  return this.__index__ >= 0;
};
LinkifyIt.prototype.pretest = function pretest(text2) {
  return this.re.pretest.test(text2);
};
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text2, schema, pos) {
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text2, pos, this);
};
LinkifyIt.prototype.match = function match(text2) {
  const result = [];
  let shift = 0;
  if (this.__index__ >= 0 && this.__text_cache__ === text2) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }
  let tail = shift ? text2.slice(shift) : text2;
  while (this.test(tail)) {
    result.push(createMatch(this, shift));
    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }
  if (result.length) {
    return result;
  }
  return null;
};
LinkifyIt.prototype.matchAtStart = function matchAtStart(text2) {
  this.__text_cache__ = text2;
  this.__index__ = -1;
  if (!text2.length) return null;
  const m = this.re.schema_at_start.exec(text2);
  if (!m) return null;
  const len = this.testSchemaAt(text2, m[2], m[0].length);
  if (!len) return null;
  this.__schema__ = m[2];
  this.__index__ = m.index + m[1].length;
  this.__last_index__ = m.index + m[0].length + len;
  return createMatch(this, 0);
};
LinkifyIt.prototype.tlds = function tlds(list2, keepOld) {
  list2 = Array.isArray(list2) ? list2 : [list2];
  if (!keepOld) {
    this.__tlds__ = list2.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }
  this.__tlds__ = this.__tlds__.concat(list2).sort().filter(function(el, idx, arr) {
    return el !== arr[idx - 1];
  }).reverse();
  compile(this);
  return this;
};
LinkifyIt.prototype.normalize = function normalize2(match2) {
  if (!match2.schema) {
    match2.url = "http://" + match2.url;
  }
  if (match2.schema === "mailto:" && !/^mailto:/i.test(match2.url)) {
    match2.url = "mailto:" + match2.url;
  }
};
LinkifyIt.prototype.onCompile = function onCompile() {
};
var linkify_it_default = LinkifyIt;

// node_modules/punycode.js/punycode.es6.js
var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter = "-";
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7F]/;
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
var errors = {
  "overflow": "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
};
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;
function error2(type) {
  throw new RangeError(errors[type]);
}
function map(array2, callback) {
  const result = [];
  let length = array2.length;
  while (length--) {
    result[length] = callback(array2[length]);
  }
  return result;
}
function mapDomain(domain, callback) {
  const parts = domain.split("@");
  let result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    domain = parts[1];
  }
  domain = domain.replace(regexSeparators, ".");
  const labels = domain.split(".");
  const encoded = map(labels, callback).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
var ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
var basicToDigit = function(codePoint) {
  if (codePoint >= 48 && codePoint < 58) {
    return 26 + (codePoint - 48);
  }
  if (codePoint >= 65 && codePoint < 91) {
    return codePoint - 65;
  }
  if (codePoint >= 97 && codePoint < 123) {
    return codePoint - 97;
  }
  return base;
};
var digitToBasic = function(digit, flag) {
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};
var adapt = function(delta, numPoints, firstTime) {
  let k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
var decode2 = function(input) {
  const output = [];
  const inputLength = input.length;
  let i = 0;
  let n = initialN;
  let bias = initialBias;
  let basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }
  for (let j = 0; j < basic; ++j) {
    if (input.charCodeAt(j) >= 128) {
      error2("not-basic");
    }
    output.push(input.charCodeAt(j));
  }
  for (let index2 = basic > 0 ? basic + 1 : 0; index2 < inputLength; ) {
    const oldi = i;
    for (let w = 1, k = base; ; k += base) {
      if (index2 >= inputLength) {
        error2("invalid-input");
      }
      const digit = basicToDigit(input.charCodeAt(index2++));
      if (digit >= base) {
        error2("invalid-input");
      }
      if (digit > floor((maxInt - i) / w)) {
        error2("overflow");
      }
      i += digit * w;
      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) {
        break;
      }
      const baseMinusT = base - t;
      if (w > floor(maxInt / baseMinusT)) {
        error2("overflow");
      }
      w *= baseMinusT;
    }
    const out = output.length + 1;
    bias = adapt(i - oldi, out, oldi == 0);
    if (floor(i / out) > maxInt - n) {
      error2("overflow");
    }
    n += floor(i / out);
    i %= out;
    output.splice(i++, 0, n);
  }
  return String.fromCodePoint(...output);
};
var encode2 = function(input) {
  const output = [];
  input = ucs2decode(input);
  const inputLength = input.length;
  let n = initialN;
  let delta = 0;
  let bias = initialBias;
  for (const currentValue of input) {
    if (currentValue < 128) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  const basicLength = output.length;
  let handledCPCount = basicLength;
  if (basicLength) {
    output.push(delimiter);
  }
  while (handledCPCount < inputLength) {
    let m = maxInt;
    for (const currentValue of input) {
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }
    const handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error2("overflow");
    }
    delta += (m - n) * handledCPCountPlusOne;
    n = m;
    for (const currentValue of input) {
      if (currentValue < n && ++delta > maxInt) {
        error2("overflow");
      }
      if (currentValue === n) {
        let q = delta;
        for (let k = base; ; k += base) {
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) {
            break;
          }
          const qMinusT = q - t;
          const baseMinusT = base - t;
          output.push(
            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
          );
          q = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n;
  }
  return output.join("");
};
var toUnicode = function(input) {
  return mapDomain(input, function(string) {
    return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
  });
};
var toASCII = function(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ? "xn--" + encode2(string) : string;
  });
};
var punycode = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  "version": "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  "ucs2": {
    "decode": ucs2decode,
    "encode": ucs2encode
  },
  "decode": decode2,
  "encode": encode2,
  "toASCII": toASCII,
  "toUnicode": toUnicode
};
var punycode_es6_default = punycode;

// node_modules/markdown-it/lib/presets/default.mjs
var default_default = {
  options: {
    // Enable HTML tags in source
    html: false,
    // Use '/' to close single tags (<br />)
    xhtmlOut: false,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "\u201C\u201D\u2018\u2019",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
};

// node_modules/markdown-it/lib/presets/zero.mjs
var zero_default = {
  options: {
    // Enable HTML tags in source
    html: false,
    // Use '/' to close single tags (<br />)
    xhtmlOut: false,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "\u201C\u201D\u2018\u2019",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
};

// node_modules/markdown-it/lib/presets/commonmark.mjs
var commonmark_default = {
  options: {
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />)
    xhtmlOut: true,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "\u201C\u201D\u2018\u2019",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
};

// node_modules/markdown-it/lib/index.mjs
var config = {
  default: default_default,
  zero: zero_default,
  commonmark: commonmark_default
};
var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
function validateLink(url) {
  const str = url.trim().toLowerCase();
  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
}
var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
function normalizeLink(url) {
  const parsed = parse_default(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode_es6_default.toASCII(parsed.hostname);
      } catch (er) {
      }
    }
  }
  return encode_default(format(parsed));
}
function normalizeLinkText(url) {
  const parsed = parse_default(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode_es6_default.toUnicode(parsed.hostname);
      } catch (er) {
      }
    }
  }
  return decode_default(format(parsed), decode_default.defaultChars + "%");
}
function MarkdownIt(presetName, options2) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options2);
  }
  if (!options2) {
    if (!isString(presetName)) {
      options2 = presetName || {};
      presetName = "default";
    }
  }
  this.inline = new parser_inline_default();
  this.block = new parser_block_default();
  this.core = new parser_core_default();
  this.renderer = new renderer_default();
  this.linkify = new linkify_it_default();
  this.validateLink = validateLink;
  this.normalizeLink = normalizeLink;
  this.normalizeLinkText = normalizeLinkText;
  this.utils = utils_exports;
  this.helpers = assign({}, helpers_exports);
  this.options = {};
  this.configure(presetName);
  if (options2) {
    this.set(options2);
  }
}
MarkdownIt.prototype.set = function(options2) {
  assign(this.options, options2);
  return this;
};
MarkdownIt.prototype.configure = function(presets) {
  const self = this;
  if (isString(presets)) {
    const presetName = presets;
    presets = config[presetName];
    if (!presets) {
      throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
    }
  }
  if (!presets) {
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  }
  if (presets.options) {
    self.set(presets.options);
  }
  if (presets.components) {
    Object.keys(presets.components).forEach(function(name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};
MarkdownIt.prototype.enable = function(list2, ignoreInvalid) {
  let result = [];
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  ["core", "block", "inline"].forEach(function(chain) {
    result = result.concat(this[chain].ruler.enable(list2, true));
  }, this);
  result = result.concat(this.inline.ruler2.enable(list2, true));
  const missed = list2.filter(function(name) {
    return result.indexOf(name) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
  }
  return this;
};
MarkdownIt.prototype.disable = function(list2, ignoreInvalid) {
  let result = [];
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  ["core", "block", "inline"].forEach(function(chain) {
    result = result.concat(this[chain].ruler.disable(list2, true));
  }, this);
  result = result.concat(this.inline.ruler2.disable(list2, true));
  const missed = list2.filter(function(name) {
    return result.indexOf(name) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
  }
  return this;
};
MarkdownIt.prototype.use = function(plugin) {
  const args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};
MarkdownIt.prototype.parse = function(src, env) {
  if (typeof src !== "string") {
    throw new Error("Input data should be a String");
  }
  const state = new this.core.State(src, this, env);
  this.core.process(state);
  return state.tokens;
};
MarkdownIt.prototype.render = function(src, env) {
  env = env || {};
  return this.renderer.render(this.parse(src, env), this.options, env);
};
MarkdownIt.prototype.parseInline = function(src, env) {
  const state = new this.core.State(src, this, env);
  state.inlineMode = true;
  this.core.process(state);
  return state.tokens;
};
MarkdownIt.prototype.renderInline = function(src, env) {
  env = env || {};
  return this.renderer.render(this.parseInline(src, env), this.options, env);
};
var lib_default = MarkdownIt;

// resources/js/markdown/markdown.js
var import_markdown_it_task_lists = __toESM(require_markdown_it_task_lists());
var Markdown = class {
  constructor() {
    this.renderer = new lib_default({ html: true });
    this.renderer.use(import_markdown_it_task_lists.default, { label: true });
  }
  /**
   * Get the front-end render used to convert markdown to HTML.
   * @returns {MarkdownIt}
   */
  getRenderer() {
    return this.renderer;
  }
  /**
   * Convert the given Markdown to HTML.
   * @param {String} markdown
   * @returns {String}
   */
  render(markdown) {
    return this.renderer.render(markdown);
  }
};

// node_modules/snabbdom/build/htmldomapi.js
function createElement(tagName2, options2) {
  return document.createElement(tagName2, options2);
}
function createElementNS(namespaceURI, qualifiedName, options2) {
  return document.createElementNS(namespaceURI, qualifiedName, options2);
}
function createDocumentFragment() {
  return parseFragment(document.createDocumentFragment());
}
function createTextNode(text2) {
  return document.createTextNode(text2);
}
function createComment(text2) {
  return document.createComment(text2);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  if (isDocumentFragment(parentNode2)) {
    let node = parentNode2;
    while (node && isDocumentFragment(node)) {
      const fragment = parseFragment(node);
      node = fragment.parent;
    }
    parentNode2 = node !== null && node !== void 0 ? node : parentNode2;
  }
  if (isDocumentFragment(newNode)) {
    newNode = parseFragment(newNode, parentNode2);
  }
  if (referenceNode && isDocumentFragment(referenceNode)) {
    referenceNode = parseFragment(referenceNode).firstChildNode;
  }
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  if (isDocumentFragment(child)) {
    child = parseFragment(child, node);
  }
  node.appendChild(child);
}
function parentNode(node) {
  if (isDocumentFragment(node)) {
    while (node && isDocumentFragment(node)) {
      const fragment = parseFragment(node);
      node = fragment.parent;
    }
    return node !== null && node !== void 0 ? node : null;
  }
  return node.parentNode;
}
function nextSibling(node) {
  var _a2;
  if (isDocumentFragment(node)) {
    const fragment = parseFragment(node);
    const parent = parentNode(fragment);
    if (parent && fragment.lastChildNode) {
      const children = Array.from(parent.childNodes);
      const index2 = children.indexOf(fragment.lastChildNode);
      return (_a2 = children[index2 + 1]) !== null && _a2 !== void 0 ? _a2 : null;
    }
    return null;
  }
  return node.nextSibling;
}
function tagName(elm) {
  return elm.tagName;
}
function setTextContent(node, text2) {
  node.textContent = text2;
}
function getTextContent(node) {
  return node.textContent;
}
function isElement(node) {
  return node.nodeType === 1;
}
function isText(node) {
  return node.nodeType === 3;
}
function isComment(node) {
  return node.nodeType === 8;
}
function isDocumentFragment(node) {
  return node.nodeType === 11;
}
function parseFragment(fragmentNode, parentNode2) {
  var _a2, _b, _c;
  const fragment = fragmentNode;
  (_a2 = fragment.parent) !== null && _a2 !== void 0 ? _a2 : fragment.parent = parentNode2 !== null && parentNode2 !== void 0 ? parentNode2 : null;
  (_b = fragment.firstChildNode) !== null && _b !== void 0 ? _b : fragment.firstChildNode = fragmentNode.firstChild;
  (_c = fragment.lastChildNode) !== null && _c !== void 0 ? _c : fragment.lastChildNode = fragmentNode.lastChild;
  return fragment;
}
var htmlDomApi = {
  createElement,
  createElementNS,
  createTextNode,
  createDocumentFragment,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  getTextContent,
  isElement,
  isText,
  isComment,
  isDocumentFragment
};

// node_modules/snabbdom/build/vnode.js
function vnode(sel, data, children, text2, elm) {
  const key = data === void 0 ? void 0 : data.key;
  return { sel, data, children, text: text2, elm, key };
}

// node_modules/snabbdom/build/is.js
var array = Array.isArray;
function primitive(s) {
  return typeof s === "string" || typeof s === "number" || s instanceof String || s instanceof Number;
}

// node_modules/snabbdom/build/init.js
var emptyNode = vnode("", {}, [], void 0, void 0);
function sameVnode(vnode1, vnode2) {
  var _a2, _b;
  const isSameKey = vnode1.key === vnode2.key;
  const isSameIs = ((_a2 = vnode1.data) === null || _a2 === void 0 ? void 0 : _a2.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
  const isSameSel = vnode1.sel === vnode2.sel;
  const isSameTextOrFragment = !vnode1.sel && vnode1.sel === vnode2.sel ? typeof vnode1.text === typeof vnode2.text : true;
  return isSameSel && isSameKey && isSameIs && isSameTextOrFragment;
}
function documentFragmentIsNotSupported() {
  throw new Error("The document fragment is not supported on this platform.");
}
function isElement2(api, vnode2) {
  return api.isElement(vnode2);
}
function isDocumentFragment2(api, vnode2) {
  return api.isDocumentFragment(vnode2);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var _a2;
  const map2 = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = (_a2 = children[i]) === null || _a2 === void 0 ? void 0 : _a2.key;
    if (key !== void 0) {
      map2[key] = i;
    }
  }
  return map2;
}
var hooks = [
  "create",
  "update",
  "remove",
  "destroy",
  "pre",
  "post"
];
function init2(modules, domApi, options2) {
  const cbs = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  };
  const api = domApi !== void 0 ? domApi : htmlDomApi;
  for (const hook of hooks) {
    for (const module of modules) {
      const currentHook = module[hook];
      if (currentHook !== void 0) {
        cbs[hook].push(currentHook);
      }
    }
  }
  function emptyNodeAt(elm) {
    const id = elm.id ? "#" + elm.id : "";
    const classes = elm.getAttribute("class");
    const c = classes ? "." + classes.split(" ").join(".") : "";
    return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], void 0, elm);
  }
  function emptyDocumentFragmentAt(frag) {
    return vnode(void 0, {}, [], void 0, frag);
  }
  function createRmCb(childElm, listeners2) {
    return function rmCb() {
      if (--listeners2 === 0) {
        const parent = api.parentNode(childElm);
        if (parent !== null) {
          api.removeChild(parent, childElm);
        }
      }
    };
  }
  function createElm(vnode2, insertedVnodeQueue) {
    var _a2, _b, _c, _d, _e;
    let i;
    const data = vnode2.data;
    const hook = data === null || data === void 0 ? void 0 : data.hook;
    (_a2 = hook === null || hook === void 0 ? void 0 : hook.init) === null || _a2 === void 0 ? void 0 : _a2.call(hook, vnode2);
    const children = vnode2.children;
    const sel = vnode2.sel;
    if (sel === "!") {
      (_b = vnode2.text) !== null && _b !== void 0 ? _b : vnode2.text = "";
      vnode2.elm = api.createComment(vnode2.text);
    } else if (sel === "") {
      vnode2.elm = api.createTextNode(vnode2.text);
    } else if (sel !== void 0) {
      const hashIdx = sel.indexOf("#");
      const dotIdx = sel.indexOf(".", hashIdx);
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      const ns = data === null || data === void 0 ? void 0 : data.ns;
      const elm = ns === void 0 ? api.createElement(tag, data) : api.createElementNS(ns, tag, data);
      vnode2.elm = elm;
      if (hash < dot)
        elm.setAttribute("id", sel.slice(hash + 1, dot));
      if (dotIdx > 0)
        elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
      for (i = 0; i < cbs.create.length; ++i)
        cbs.create[i](emptyNode, vnode2);
      if (primitive(vnode2.text) && (!array(children) || children.length === 0)) {
        api.appendChild(elm, api.createTextNode(vnode2.text));
      }
      if (array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            api.appendChild(elm, createElm(ch, insertedVnodeQueue));
          }
        }
      }
      if (hook !== void 0) {
        (_c = hook.create) === null || _c === void 0 ? void 0 : _c.call(hook, emptyNode, vnode2);
        if (hook.insert !== void 0) {
          insertedVnodeQueue.push(vnode2);
        }
      }
    } else if (((_d = options2 === null || options2 === void 0 ? void 0 : options2.experimental) === null || _d === void 0 ? void 0 : _d.fragments) && vnode2.children) {
      vnode2.elm = ((_e = api.createDocumentFragment) !== null && _e !== void 0 ? _e : documentFragmentIsNotSupported)();
      for (i = 0; i < cbs.create.length; ++i)
        cbs.create[i](emptyNode, vnode2);
      for (i = 0; i < vnode2.children.length; ++i) {
        const ch = vnode2.children[i];
        if (ch != null) {
          api.appendChild(vnode2.elm, createElm(ch, insertedVnodeQueue));
        }
      }
    } else {
      vnode2.elm = api.createTextNode(vnode2.text);
    }
    return vnode2.elm;
  }
  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }
  function invokeDestroyHook(vnode2) {
    var _a2, _b;
    const data = vnode2.data;
    if (data !== void 0) {
      (_b = (_a2 = data === null || data === void 0 ? void 0 : data.hook) === null || _a2 === void 0 ? void 0 : _a2.destroy) === null || _b === void 0 ? void 0 : _b.call(_a2, vnode2);
      for (let i = 0; i < cbs.destroy.length; ++i)
        cbs.destroy[i](vnode2);
      if (vnode2.children !== void 0) {
        for (let j = 0; j < vnode2.children.length; ++j) {
          const child = vnode2.children[j];
          if (child != null && typeof child !== "string") {
            invokeDestroyHook(child);
          }
        }
      }
    }
  }
  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    var _a2, _b;
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners2;
      const ch = vnodes[startIdx];
      if (ch != null) {
        if (ch.sel !== void 0) {
          invokeDestroyHook(ch);
          listeners2 = cbs.remove.length + 1;
          const rm = createRmCb(ch.elm, listeners2);
          for (let i = 0; i < cbs.remove.length; ++i)
            cbs.remove[i](ch, rm);
          const removeHook = (_b = (_a2 = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a2 === void 0 ? void 0 : _a2.hook) === null || _b === void 0 ? void 0 : _b.remove;
          if (removeHook !== void 0) {
            removeHook(ch, rm);
          } else {
            rm();
          }
        } else if (ch.children) {
          invokeDestroyHook(ch);
          removeVnodes(parentElm, ch.children, 0, ch.children.length - 1);
        } else {
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === void 0) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (idxInOld === void 0) {
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else if (oldKeyToIdx[newEndVnode.key] === void 0) {
          api.insertBefore(parentElm, createElm(newEndVnode, insertedVnodeQueue), api.nextSibling(oldEndVnode.elm));
          newEndVnode = newCh[--newEndIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = void 0;
            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (newStartIdx <= newEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    }
    if (oldStartIdx <= oldEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function patchVnode(oldVnode, vnode2, insertedVnodeQueue) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const hook = (_a2 = vnode2.data) === null || _a2 === void 0 ? void 0 : _a2.hook;
    (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode2);
    const elm = vnode2.elm = oldVnode.elm;
    if (oldVnode === vnode2)
      return;
    if (vnode2.data !== void 0 || vnode2.text !== void 0 && vnode2.text !== oldVnode.text) {
      (_c = vnode2.data) !== null && _c !== void 0 ? _c : vnode2.data = {};
      (_d = oldVnode.data) !== null && _d !== void 0 ? _d : oldVnode.data = {};
      for (let i = 0; i < cbs.update.length; ++i)
        cbs.update[i](oldVnode, vnode2);
      (_g = (_f = (_e = vnode2.data) === null || _e === void 0 ? void 0 : _e.hook) === null || _f === void 0 ? void 0 : _f.update) === null || _g === void 0 ? void 0 : _g.call(_f, oldVnode, vnode2);
    }
    const oldCh = oldVnode.children;
    const ch = vnode2.children;
    if (vnode2.text === void 0) {
      if (oldCh !== void 0 && ch !== void 0) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (ch !== void 0) {
        if (oldVnode.text !== void 0)
          api.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (oldCh !== void 0) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (oldVnode.text !== void 0) {
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode2.text) {
      if (oldCh !== void 0) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      api.setTextContent(elm, vnode2.text);
    }
    (_h = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _h === void 0 ? void 0 : _h.call(hook, oldVnode, vnode2);
  }
  return function patch2(oldVnode, vnode2) {
    let i, elm, parent;
    const insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i)
      cbs.pre[i]();
    if (isElement2(api, oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    } else if (isDocumentFragment2(api, oldVnode)) {
      oldVnode = emptyDocumentFragmentAt(oldVnode);
    }
    if (sameVnode(oldVnode, vnode2)) {
      patchVnode(oldVnode, vnode2, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);
      createElm(vnode2, insertedVnodeQueue);
      if (parent !== null) {
        api.insertBefore(parent, vnode2.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i)
      cbs.post[i]();
    return vnode2;
  };
}

// node_modules/snabbdom/build/h.js
function addNS(data, children, sel) {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== void 0) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      if (typeof child === "string")
        continue;
      const childData = child.data;
      if (childData !== void 0) {
        addNS(childData, child.children, child.sel);
      }
    }
  }
}

// node_modules/snabbdom/build/tovnode.js
function datasetKey(attributeName) {
  return attributeName.slice(5).replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
}
function toVNode(node, domApi) {
  var _a2;
  const api = domApi !== void 0 ? domApi : htmlDomApi;
  let text2;
  if (api.isElement(node)) {
    const id = node.id ? "#" + node.id : "";
    const cn = (_a2 = node.getAttribute("class")) === null || _a2 === void 0 ? void 0 : _a2.match(/[^\t\r\n\f ]+/g);
    const c = cn ? "." + cn.join(".") : "";
    const sel = api.tagName(node).toLowerCase() + id + c;
    const attrs = {};
    const dataset = {};
    const data = {};
    const children = [];
    let name;
    let i, n;
    const elmAttrs = node.attributes;
    const elmChildren = node.childNodes;
    for (i = 0, n = elmAttrs.length; i < n; i++) {
      name = elmAttrs[i].nodeName;
      if (name.startsWith("data-")) {
        dataset[datasetKey(name)] = elmAttrs[i].nodeValue || "";
      } else if (name !== "id" && name !== "class") {
        attrs[name] = elmAttrs[i].nodeValue;
      }
    }
    for (i = 0, n = elmChildren.length; i < n; i++) {
      children.push(toVNode(elmChildren[i], domApi));
    }
    if (Object.keys(attrs).length > 0)
      data.attrs = attrs;
    if (Object.keys(dataset).length > 0)
      data.dataset = dataset;
    if (sel.startsWith("svg") && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
      addNS(data, children, sel);
    }
    return vnode(sel, data, children, void 0, node);
  } else if (api.isText(node)) {
    text2 = api.getTextContent(node);
    return vnode(void 0, void 0, void 0, text2, node);
  } else if (api.isComment(node)) {
    text2 = api.getTextContent(node);
    return vnode("!", {}, [], text2, node);
  } else {
    return vnode("", {}, [], void 0, node);
  }
}

// node_modules/snabbdom/build/modules/attributes.js
var xlinkNS = "http://www.w3.org/1999/xlink";
var xmlnsNS = "http://www.w3.org/2000/xmlns/";
var xmlNS = "http://www.w3.org/XML/1998/namespace";
var colonChar = 58;
var xChar = 120;
var mChar = 109;
function updateAttrs(oldVnode, vnode2) {
  let key;
  const elm = vnode2.elm;
  let oldAttrs = oldVnode.data.attrs;
  let attrs = vnode2.data.attrs;
  if (!oldAttrs && !attrs)
    return;
  if (oldAttrs === attrs)
    return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};
  for (key in attrs) {
    const cur = attrs[key];
    const old = oldAttrs[key];
    if (old !== cur) {
      if (cur === true) {
        elm.setAttribute(key, "");
      } else if (cur === false) {
        elm.removeAttribute(key);
      } else {
        if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur);
        } else if (key.charCodeAt(3) === colonChar) {
          elm.setAttributeNS(xmlNS, key, cur);
        } else if (key.charCodeAt(5) === colonChar) {
          key.charCodeAt(1) === mChar ? elm.setAttributeNS(xmlnsNS, key, cur) : elm.setAttributeNS(xlinkNS, key, cur);
        } else {
          elm.setAttribute(key, cur);
        }
      }
    }
  }
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}
var attributesModule = {
  create: updateAttrs,
  update: updateAttrs
};

// resources/js/services/vdom.js
var patcher;
function getPatcher() {
  if (patcher) return patcher;
  patcher = init2([
    attributesModule
  ]);
  return patcher;
}
function patchDomFromHtmlString(domTarget, html) {
  const contentDom = document.createElement("div");
  contentDom.innerHTML = html;
  getPatcher()(toVNode(domTarget), toVNode(contentDom));
}

// resources/js/markdown/display.js
var Display = class {
  /**
   * @param {MarkdownEditor} editor
   */
  constructor(editor) {
    this.editor = editor;
    this.container = editor.config.displayEl;
    this.doc = null;
    this.lastDisplayClick = 0;
    if (this.container.contentDocument.readyState === "complete") {
      this.onLoad();
    } else {
      this.container.addEventListener("load", this.onLoad.bind(this));
    }
    this.updateVisibility(editor.settings.get("showPreview"));
    editor.settings.onChange("showPreview", (show2) => this.updateVisibility(show2));
  }
  updateVisibility(show2) {
    const wrap2 = this.container.closest(".markdown-editor-wrap");
    wrap2.style.display = show2 ? null : "none";
  }
  onLoad() {
    this.doc = this.container.contentDocument;
    this.loadStylesIntoDisplay();
    this.doc.body.className = "page-content";
    this.doc.addEventListener("click", this.onDisplayClick.bind(this));
  }
  /**
   * @param {MouseEvent} event
   */
  onDisplayClick(event) {
    const isDblClick = Date.now() - this.lastDisplayClick < 300;
    const link2 = event.target.closest("a");
    if (link2 !== null) {
      event.preventDefault();
      window.open(link2.getAttribute("href"));
      return;
    }
    const drawing = event.target.closest("[drawio-diagram]");
    if (drawing !== null && isDblClick) {
      this.editor.actions.editDrawing(drawing);
      return;
    }
    this.lastDisplayClick = Date.now();
  }
  loadStylesIntoDisplay() {
    this.doc.documentElement.classList.add("markdown-editor-display");
    if (document.documentElement.classList.contains("dark-mode")) {
      this.doc.documentElement.style.backgroundColor = "#222";
      this.doc.documentElement.classList.add("dark-mode");
    }
    this.doc.head.innerHTML = "";
    const styles = document.head.querySelectorAll("style,link[rel=stylesheet]");
    for (const style of styles) {
      const copy = style.cloneNode(true);
      this.doc.head.appendChild(copy);
    }
  }
  /**
   * Patch the display DOM with the given HTML content.
   * @param {String} html
   */
  patchWithHtml(html) {
    const { body } = this.doc;
    if (body.children.length === 0) {
      const wrap2 = document.createElement("div");
      this.doc.body.append(wrap2);
    }
    const target = body.children[0];
    patchDomFromHtmlString(target, html);
  }
  /**
   * Scroll to the given block index within the display content.
   * Will scroll to the end if the index is -1.
   * @param {Number} index
   */
  scrollToIndex(index2) {
    const elems = this.doc.body?.children[0]?.children;
    if (elems && elems.length <= index2) return;
    const topElem = index2 === -1 ? elems[elems.length - 1] : elems[index2];
    topElem.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
  }
};

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request2) {
  return new Promise((resolve, reject) => {
    request2.oncomplete = request2.onsuccess = () => resolve(request2.result);
    request2.onabort = request2.onerror = () => reject(request2.error);
  });
}
function createStore(dbName, storeName) {
  let dbp;
  const getDB = () => {
    if (dbp)
      return dbp;
    const request2 = indexedDB.open(dbName);
    request2.onupgradeneeded = () => request2.result.createObjectStore(storeName);
    dbp = promisifyRequest(request2);
    dbp.then((db) => {
      db.onclose = () => dbp = void 0;
    }, () => {
    });
    return dbp;
  };
  return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get3(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set2(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}

// resources/js/services/drawio.js
var iFrame = null;
var lastApprovedOrigin;
var onInit;
var onSave;
var saveBackupKey = "last-drawing-save";
function drawPostMessage(data) {
  iFrame.contentWindow.postMessage(JSON.stringify(data), lastApprovedOrigin);
}
function drawEventExport(message) {
  set2(saveBackupKey, message.data);
  if (onSave) {
    onSave(message.data).then(() => {
      del(saveBackupKey);
    });
  }
}
function drawEventSave(message) {
  drawPostMessage({
    action: "export",
    format: "xmlpng",
    xml: message.xml,
    spin: "Updating drawing"
  });
}
function drawEventInit() {
  if (!onInit) return;
  onInit().then((xml) => {
    drawPostMessage({ action: "load", autosave: 1, xml });
  });
}
function drawEventConfigure() {
  const config2 = {};
  window.$events.emitPublic(iFrame, "editor-drawio::configure", { config: config2 });
  drawPostMessage({ action: "configure", config: config2 });
}
function drawEventClose() {
  window.removeEventListener("message", drawReceive);
  if (iFrame) document.body.removeChild(iFrame);
}
function drawReceive(event) {
  if (!event.data || event.data.length < 1) return;
  if (event.origin !== lastApprovedOrigin) return;
  const message = JSON.parse(event.data);
  if (message.event === "init") {
    drawEventInit();
  } else if (message.event === "exit") {
    drawEventClose();
  } else if (message.event === "save") {
    drawEventSave(message);
  } else if (message.event === "export") {
    drawEventExport(message);
  } else if (message.event === "configure") {
    drawEventConfigure();
  }
}
async function attemptRestoreIfExists() {
  const backupVal = await get3(saveBackupKey);
  const dialogEl = document.getElementById("unsaved-drawing-dialog");
  if (!dialogEl) {
    console.error("Missing expected unsaved-drawing dialog");
  }
  if (backupVal) {
    const dialog = window.$components.firstOnElement(dialogEl, "confirm-dialog");
    const restore = await dialog.show();
    if (restore) {
      onInit = async () => backupVal;
    }
  }
}
async function show(drawioUrl, onInitCallback, onSaveCallback) {
  onInit = onInitCallback;
  onSave = onSaveCallback;
  await attemptRestoreIfExists();
  iFrame = document.createElement("iframe");
  iFrame.setAttribute("frameborder", "0");
  window.addEventListener("message", drawReceive);
  iFrame.setAttribute("src", drawioUrl);
  iFrame.setAttribute("class", "fullscreen");
  iFrame.style.backgroundColor = "#FFFFFF";
  document.body.appendChild(iFrame);
  lastApprovedOrigin = new URL(drawioUrl).origin;
}
async function upload(imageData, pageUploadedToId) {
  const data = {
    image: imageData,
    uploaded_to: pageUploadedToId
  };
  const resp = await window.$http.post(window.baseUrl("/images/drawio"), data);
  return resp.data;
}
function close() {
  drawEventClose();
}
async function load(drawingId) {
  try {
    const resp = await window.$http.get(window.baseUrl(`/images/drawio/base64/${drawingId}`));
    return `data:image/png;base64,${resp.data.content}`;
  } catch (error3) {
    if (error3 instanceof window.$http.HttpError) {
      window.$events.showResponseError(error3);
    }
    close();
    throw error3;
  }
}

// resources/js/markdown/actions.js
var _Actions_instances, insertDrawing_fn, getText_fn, setText_fn, replaceSelection_fn, getSelectionText_fn, getSelectionRange_fn, cleanTextForEditor_fn, findAndReplaceContent_fn, wrapLine_fn, dispatchChange_fn, setSelection_fn;
var Actions = class {
  /**
   * @param {MarkdownEditor} editor
   */
  constructor(editor) {
    __privateAdd(this, _Actions_instances);
    this.editor = editor;
    this.lastContent = {
      html: "",
      markdown: ""
    };
  }
  updateAndRender() {
    const content = __privateMethod(this, _Actions_instances, getText_fn).call(this);
    this.editor.config.inputEl.value = content;
    const html = this.editor.markdown.render(content);
    window.$events.emit("editor-html-change", "");
    window.$events.emit("editor-markdown-change", "");
    this.lastContent.html = html;
    this.lastContent.markdown = content;
    this.editor.display.patchWithHtml(html);
  }
  getContent() {
    return this.lastContent;
  }
  showImageInsert() {
    const imageManager = window.$components.first("image-manager");
    imageManager.show((image2) => {
      const imageUrl = image2.thumbs?.display || image2.url;
      const selectedText = __privateMethod(this, _Actions_instances, getSelectionText_fn).call(this);
      const newText = `[![${selectedText || image2.name}](${imageUrl})](${image2.url})`;
      __privateMethod(this, _Actions_instances, replaceSelection_fn).call(this, newText, newText.length);
    }, "gallery");
  }
  insertImage() {
    const newText = `![${__privateMethod(this, _Actions_instances, getSelectionText_fn).call(this)}](http://)`;
    __privateMethod(this, _Actions_instances, replaceSelection_fn).call(this, newText, newText.length - 1);
  }
  insertLink() {
    const selectedText = __privateMethod(this, _Actions_instances, getSelectionText_fn).call(this);
    const newText = `[${selectedText}]()`;
    const cursorPosDiff = selectedText === "" ? -3 : -1;
    __privateMethod(this, _Actions_instances, replaceSelection_fn).call(this, newText, newText.length + cursorPosDiff);
  }
  showImageManager() {
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const imageManager = window.$components.first("image-manager");
    imageManager.show((image2) => {
      __privateMethod(this, _Actions_instances, insertDrawing_fn).call(this, image2, selectionRange);
    }, "drawio");
  }
  // Show the popup link selector and insert a link when finished
  showLinkSelector() {
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const selector = window.$components.first("entity-selector-popup");
    const selectionText = __privateMethod(this, _Actions_instances, getSelectionText_fn).call(this, selectionRange);
    selector.show((entity2) => {
      const selectedText = selectionText || entity2.name;
      const newText = `[${selectedText}](${entity2.link})`;
      __privateMethod(this, _Actions_instances, replaceSelection_fn).call(this, newText, newText.length, selectionRange);
    }, {
      initialValue: selectionText,
      searchEndpoint: "/search/entity-selector",
      entityTypes: "page,book,chapter,bookshelf",
      entityPermission: "view"
    });
  }
  // Show draw.io if enabled and handle save.
  startDrawing() {
    const url = this.editor.config.drawioUrl;
    if (!url) return;
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    show(url, () => Promise.resolve(""), async (pngData) => {
      const data = {
        image: pngData,
        uploaded_to: Number(this.editor.config.pageId)
      };
      try {
        const resp = await window.$http.post("/images/drawio", data);
        __privateMethod(this, _Actions_instances, insertDrawing_fn).call(this, resp.data, selectionRange);
        close();
      } catch (err) {
        this.handleDrawingUploadError(err);
        throw new Error(`Failed to save image with error: ${err}`);
      }
    });
  }
  // Show draw.io if enabled and handle save.
  editDrawing(imgContainer) {
    const { drawioUrl } = this.editor.config;
    if (!drawioUrl) {
      return;
    }
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const drawingId = imgContainer.getAttribute("drawio-diagram");
    show(drawioUrl, () => load(drawingId), async (pngData) => {
      const data = {
        image: pngData,
        uploaded_to: Number(this.editor.config.pageId)
      };
      try {
        const resp = await window.$http.post("/images/drawio", data);
        const newText = `<div drawio-diagram="${resp.data.id}"><img src="${resp.data.url}"></div>`;
        const newContent = __privateMethod(this, _Actions_instances, getText_fn).call(this).split("\n").map((line) => {
          if (line.indexOf(`drawio-diagram="${drawingId}"`) !== -1) {
            return newText;
          }
          return line;
        }).join("\n");
        __privateMethod(this, _Actions_instances, setText_fn).call(this, newContent, selectionRange);
        close();
      } catch (err) {
        this.handleDrawingUploadError(err);
        throw new Error(`Failed to save image with error: ${err}`);
      }
    });
  }
  handleDrawingUploadError(error3) {
    if (error3.status === 413) {
      window.$events.emit("error", this.editor.config.text.serverUploadLimit);
    } else {
      window.$events.emit("error", this.editor.config.text.imageUploadError);
    }
    console.error(error3);
  }
  // Make the editor full screen
  fullScreen() {
    const { container } = this.editor.config;
    const alreadyFullscreen = container.classList.contains("fullscreen");
    container.classList.toggle("fullscreen", !alreadyFullscreen);
    document.body.classList.toggle("markdown-fullscreen", !alreadyFullscreen);
  }
  // Scroll to a specified text
  scrollToText(searchText) {
    if (!searchText) {
      return;
    }
    const text2 = this.editor.cm.state.doc;
    let lineCount = 1;
    let scrollToLine = -1;
    for (const line2 of text2.iterLines()) {
      if (line2.includes(searchText)) {
        scrollToLine = lineCount;
        break;
      }
      lineCount += 1;
    }
    if (scrollToLine === -1) {
      return;
    }
    const line = text2.line(scrollToLine);
    __privateMethod(this, _Actions_instances, setSelection_fn).call(this, line.from, line.to, true);
    this.focus();
  }
  focus() {
    if (!this.editor.cm.hasFocus) {
      this.editor.cm.focus();
    }
  }
  /**
   * Insert content into the editor.
   * @param {String} content
   */
  insertContent(content) {
    __privateMethod(this, _Actions_instances, replaceSelection_fn).call(this, content, content.length);
  }
  /**
   * Prepend content to the editor.
   * @param {String} content
   */
  prependContent(content) {
    content = __privateMethod(this, _Actions_instances, cleanTextForEditor_fn).call(this, content);
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const selectFrom = selectionRange.from + content.length + 1;
    __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, 0, 0, `${content}
`, selectFrom);
    this.focus();
  }
  /**
   * Append content to the editor.
   * @param {String} content
   */
  appendContent(content) {
    content = __privateMethod(this, _Actions_instances, cleanTextForEditor_fn).call(this, content);
    __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, this.editor.cm.state.doc.length, `
${content}`);
    this.focus();
  }
  /**
   * Replace the editor's contents
   * @param {String} content
   */
  replaceContent(content) {
    __privateMethod(this, _Actions_instances, setText_fn).call(this, content);
  }
  /**
   * Replace the start of the line
   * @param {String} newStart
   */
  replaceLineStart(newStart) {
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const line = this.editor.cm.state.doc.lineAt(selectionRange.from);
    const lineContent = line.text;
    const lineStart = lineContent.split(" ")[0];
    if (lineStart === newStart) {
      const newLineContent2 = lineContent.replace(`${newStart} `, "");
      const selectFrom2 = selectionRange.from + (newLineContent2.length - lineContent.length);
      __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, line.from, line.to, newLineContent2, selectFrom2);
      return;
    }
    let newLineContent = lineContent;
    const alreadySymbol = /^[#>`]/.test(lineStart);
    if (alreadySymbol) {
      newLineContent = lineContent.replace(lineStart, newStart).trim();
    } else if (newStart !== "") {
      newLineContent = `${newStart} ${lineContent}`;
    }
    const selectFrom = selectionRange.from + (newLineContent.length - lineContent.length);
    __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, line.from, line.to, newLineContent, selectFrom);
  }
  /**
   * Wrap the selection in the given contents start and end contents.
   * @param {String} start
   * @param {String} end
   */
  wrapSelection(start, end) {
    const selectRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const selectionText = __privateMethod(this, _Actions_instances, getSelectionText_fn).call(this, selectRange);
    if (!selectionText) {
      __privateMethod(this, _Actions_instances, wrapLine_fn).call(this, start, end);
      return;
    }
    let newSelectionText = selectionText;
    let newRange;
    if (selectionText.startsWith(start) && selectionText.endsWith(end)) {
      newSelectionText = selectionText.slice(start.length, selectionText.length - end.length);
      newRange = selectRange.extend(selectRange.from, selectRange.to - (start.length + end.length));
    } else {
      newSelectionText = `${start}${selectionText}${end}`;
      newRange = selectRange.extend(selectRange.from, selectRange.to + (start.length + end.length));
    }
    __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, selectRange.from, selectRange.to, newSelectionText, newRange.anchor, newRange.head);
  }
  replaceLineStartForOrderedList() {
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const line = this.editor.cm.state.doc.lineAt(selectionRange.from);
    const prevLine = this.editor.cm.state.doc.line(line.number - 1);
    const listMatch = prevLine.text.match(/^(\s*)(\d)([).])\s/) || [];
    const number = (Number(listMatch[2]) || 0) + 1;
    const whiteSpace = listMatch[1] || "";
    const listMark = listMatch[3] || ".";
    const prefix = `${whiteSpace}${number}${listMark}`;
    return this.replaceLineStart(prefix);
  }
  /**
   * Cycles through the type of callout block within the selection.
   * Creates a callout block if none existing, and removes it if cycling past the danger type.
   */
  cycleCalloutTypeAtSelection() {
    const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
    const line = this.editor.cm.state.doc.lineAt(selectionRange.from);
    const formats2 = ["info", "success", "warning", "danger"];
    const joint = formats2.join("|");
    const regex = new RegExp(`class="((${joint})\\s+callout|callout\\s+(${joint}))"`, "i");
    const matches2 = regex.exec(line.text);
    const format2 = (matches2 ? matches2[2] || matches2[3] : "").toLowerCase();
    if (format2 === formats2[formats2.length - 1]) {
      __privateMethod(this, _Actions_instances, wrapLine_fn).call(this, `<p class="callout ${formats2[formats2.length - 1]}">`, "</p>");
    } else if (format2 === "") {
      __privateMethod(this, _Actions_instances, wrapLine_fn).call(this, '<p class="callout info">', "</p>");
    } else {
      const newFormatIndex = formats2.indexOf(format2) + 1;
      const newFormat = formats2[newFormatIndex];
      const newContent = line.text.replace(matches2[0], matches2[0].replace(format2, newFormat));
      const lineDiff = newContent.length - line.text.length;
      __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, line.from, line.to, newContent, selectionRange.anchor + lineDiff, selectionRange.head + lineDiff);
    }
  }
  syncDisplayPosition(event) {
    const scrollEl2 = event.target;
    const atEnd = Math.abs(scrollEl2.scrollHeight - scrollEl2.clientHeight - scrollEl2.scrollTop) < 1;
    if (atEnd) {
      this.editor.display.scrollToIndex(-1);
      return;
    }
    const blockInfo = this.editor.cm.lineBlockAtHeight(scrollEl2.scrollTop);
    const range = this.editor.cm.state.sliceDoc(0, blockInfo.from);
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.editor.markdown.render(range), "text/html");
    const totalLines = doc.documentElement.querySelectorAll("body > *");
    this.editor.display.scrollToIndex(totalLines.length);
  }
  /**
   * Fetch and insert the template of the given ID.
   * The page-relative position provided can be used to determine insert location if possible.
   * @param {String} templateId
   * @param {Number} posX
   * @param {Number} posY
   */
  async insertTemplate(templateId, posX, posY) {
    const cursorPos = this.editor.cm.posAtCoords({ x: posX, y: posY }, false);
    const { data } = await window.$http.get(`/templates/${templateId}`);
    const content = data.markdown || data.html;
    __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, cursorPos, cursorPos, content, cursorPos);
  }
  /**
   * Insert multiple images from the clipboard from an event at the provided
   * screen coordinates (Typically form a paste event).
   * @param {File[]} images
   * @param {Number} posX
   * @param {Number} posY
   */
  insertClipboardImages(images, posX, posY) {
    const cursorPos = this.editor.cm.posAtCoords({ x: posX, y: posY }, false);
    for (const image2 of images) {
      this.uploadImage(image2, cursorPos);
    }
  }
  /**
   * Handle image upload and add image into markdown content
   * @param {File} file
   * @param {?Number} position
   */
  async uploadImage(file, position = null) {
    if (file === null || file.type.indexOf("image") !== 0) return;
    let ext = "png";
    if (position === null) {
      position = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this).from;
    }
    if (file.name) {
      const fileNameMatches = file.name.match(/\.(.+)$/);
      if (fileNameMatches.length > 1) ext = fileNameMatches[1];
    }
    const id = `image-${Math.random().toString(16).slice(2)}`;
    const placeholderImage = window.baseUrl(`/loading.gif#upload${id}`);
    const placeHolderText = `![](${placeholderImage})`;
    __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, position, position, placeHolderText, position);
    const remoteFilename = `image-${Date.now()}.${ext}`;
    const formData = new FormData();
    formData.append("file", file, remoteFilename);
    formData.append("uploaded_to", this.editor.config.pageId);
    try {
      const { data } = await window.$http.post("/images/gallery", formData);
      const newContent = `[![](${data.thumbs.display})](${data.url})`;
      __privateMethod(this, _Actions_instances, findAndReplaceContent_fn).call(this, placeHolderText, newContent);
    } catch (err) {
      window.$events.error(err?.data?.message || this.editor.config.text.imageUploadError);
      __privateMethod(this, _Actions_instances, findAndReplaceContent_fn).call(this, placeHolderText, "");
      console.error(err);
    }
  }
};
_Actions_instances = new WeakSet();
insertDrawing_fn = function(image2, originalSelectionRange) {
  const newText = `<div drawio-diagram="${image2.id}"><img src="${image2.url}"></div>`;
  __privateMethod(this, _Actions_instances, replaceSelection_fn).call(this, newText, newText.length, originalSelectionRange);
};
/**
 * Get the current text of the editor instance.
 * @return {string}
 */
getText_fn = function() {
  return this.editor.cm.state.doc.toString();
};
/**
 * Set the text of the current editor instance.
 * @param {String} text
 * @param {?SelectionRange} selectionRange
 */
setText_fn = function(text2, selectionRange = null) {
  selectionRange = selectionRange || __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
  const newDoc = this.editor.cm.state.toText(text2);
  const newSelectFrom = Math.min(selectionRange.from, newDoc.length);
  __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, 0, this.editor.cm.state.doc.length, text2, newSelectFrom);
  this.focus();
};
/**
 * Replace the current selection and focus the editor.
 * Takes an offset for the cursor, after the change, relative to the start of the provided string.
 * Can be provided a selection range to use instead of the current selection range.
 * @param {String} newContent
 * @param {Number} cursorOffset
 * @param {?SelectionRange} selectionRange
 */
replaceSelection_fn = function(newContent, cursorOffset = 0, selectionRange = null) {
  selectionRange = selectionRange || this.editor.cm.state.selection.main;
  const selectFrom = selectionRange.from + cursorOffset;
  __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, selectionRange.from, selectionRange.to, newContent, selectFrom);
  this.focus();
};
/**
 * Get the text content of the main current selection.
 * @param {SelectionRange} selectionRange
 * @return {string}
 */
getSelectionText_fn = function(selectionRange = null) {
  selectionRange = selectionRange || __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
  return this.editor.cm.state.sliceDoc(selectionRange.from, selectionRange.to);
};
/**
 * Get the range of the current main selection.
 * @return {SelectionRange}
 */
getSelectionRange_fn = function() {
  return this.editor.cm.state.selection.main;
};
/**
 * Cleans the given text to work with the editor.
 * Standardises line endings to what's expected.
 * @param {String} text
 * @return {String}
 */
cleanTextForEditor_fn = function(text2) {
  return text2.replace(/\r\n|\r/g, "\n");
};
/**
 * Find and replace the first occurrence of [search] with [replace]
 * @param {String} search
 * @param {String} replace
 */
findAndReplaceContent_fn = function(search, replace2) {
  const newText = __privateMethod(this, _Actions_instances, getText_fn).call(this).replace(search, replace2);
  __privateMethod(this, _Actions_instances, setText_fn).call(this, newText);
};
/**
 * Wrap the line in the given start and end contents.
 * @param {String} start
 * @param {String} end
 */
wrapLine_fn = function(start, end) {
  const selectionRange = __privateMethod(this, _Actions_instances, getSelectionRange_fn).call(this);
  const line = this.editor.cm.state.doc.lineAt(selectionRange.from);
  const lineContent = line.text;
  let newLineContent;
  let lineOffset = 0;
  if (lineContent.startsWith(start) && lineContent.endsWith(end)) {
    newLineContent = lineContent.slice(start.length, lineContent.length - end.length);
    lineOffset = -start.length;
  } else {
    newLineContent = `${start}${lineContent}${end}`;
    lineOffset = start.length;
  }
  __privateMethod(this, _Actions_instances, dispatchChange_fn).call(this, line.from, line.to, newLineContent, selectionRange.from + lineOffset);
};
/**
 * Dispatch changes to the editor.
 * @param {Number} from
 * @param {?Number} to
 * @param {?String} text
 * @param {?Number} selectFrom
 * @param {?Number} selectTo
 */
dispatchChange_fn = function(from, to = null, text2 = null, selectFrom = null, selectTo = null) {
  const tr = { changes: { from, to, insert: text2 } };
  if (selectFrom) {
    tr.selection = { anchor: selectFrom };
    if (selectTo) {
      tr.selection.head = selectTo;
    }
  }
  this.editor.cm.dispatch(tr);
};
/**
 * Set the current selection range.
 * Optionally will scroll the new range into view.
 * @param {Number} from
 * @param {Number} to
 * @param {Boolean} scrollIntoView
 */
setSelection_fn = function(from, to, scrollIntoView = false) {
  this.editor.cm.dispatch({
    selection: { anchor: from, head: to },
    scrollIntoView
  });
};

// resources/js/markdown/settings.js
var Settings = class {
  constructor(settingInputs) {
    this.settingMap = {
      scrollSync: true,
      showPreview: true,
      editorWidth: 50
    };
    this.changeListeners = {};
    this.loadFromLocalStorage();
    this.applyToInputs(settingInputs);
    this.listenToInputChanges(settingInputs);
  }
  applyToInputs(inputs) {
    for (const input of inputs) {
      const name = input.getAttribute("name").replace("md-", "");
      input.checked = this.settingMap[name];
    }
  }
  listenToInputChanges(inputs) {
    for (const input of inputs) {
      input.addEventListener("change", () => {
        const name = input.getAttribute("name").replace("md-", "");
        this.set(name, input.checked);
      });
    }
  }
  loadFromLocalStorage() {
    const lsValString = window.localStorage.getItem("md-editor-settings");
    if (!lsValString) {
      return;
    }
    const lsVals = JSON.parse(lsValString);
    for (const [key, value] of Object.entries(lsVals)) {
      if (value !== null && this.settingMap[key] !== void 0) {
        this.settingMap[key] = value;
      }
    }
  }
  set(key, value) {
    this.settingMap[key] = value;
    window.localStorage.setItem("md-editor-settings", JSON.stringify(this.settingMap));
    for (const listener of this.changeListeners[key] || []) {
      listener(value);
    }
  }
  get(key) {
    return this.settingMap[key] || null;
  }
  onChange(key, callback) {
    const listeners2 = this.changeListeners[key] || [];
    listeners2.push(callback);
    this.changeListeners[key] = listeners2;
  }
};

// resources/js/markdown/common-events.js
function getContentToInsert({ html, markdown }) {
  return markdown || html;
}
function listen2(editor) {
  window.$events.listen("editor::replace", (eventContent) => {
    const markdown = getContentToInsert(eventContent);
    editor.actions.replaceContent(markdown);
  });
  window.$events.listen("editor::append", (eventContent) => {
    const markdown = getContentToInsert(eventContent);
    editor.actions.appendContent(markdown);
  });
  window.$events.listen("editor::prepend", (eventContent) => {
    const markdown = getContentToInsert(eventContent);
    editor.actions.prependContent(markdown);
  });
  window.$events.listen("editor::insert", (eventContent) => {
    const markdown = getContentToInsert(eventContent);
    editor.actions.insertContent(markdown);
  });
  window.$events.listen("editor::focus", () => {
    editor.actions.focus();
  });
}

// resources/js/markdown/shortcuts.js
function provide(editor) {
  const shortcuts = {};
  shortcuts["Shift-Mod-i"] = () => editor.actions.insertImage();
  shortcuts["Mod-s"] = () => window.$events.emit("editor-save-draft");
  shortcuts["Mod-Enter"] = () => window.$events.emit("editor-save-page");
  shortcuts["Shift-Mod-k"] = () => editor.actions.showLinkSelector();
  shortcuts["Mod-k"] = () => editor.actions.insertLink();
  shortcuts["Mod-1"] = () => editor.actions.replaceLineStart("##");
  shortcuts["Mod-2"] = () => editor.actions.replaceLineStart("###");
  shortcuts["Mod-3"] = () => editor.actions.replaceLineStart("####");
  shortcuts["Mod-4"] = () => editor.actions.replaceLineStart("#####");
  shortcuts["Mod-5"] = () => editor.actions.replaceLineStart("");
  shortcuts["Mod-d"] = () => editor.actions.replaceLineStart("");
  shortcuts["Mod-6"] = () => editor.actions.replaceLineStart(">");
  shortcuts["Mod-q"] = () => editor.actions.replaceLineStart(">");
  shortcuts["Mod-7"] = () => editor.actions.wrapSelection("\n```\n", "\n```");
  shortcuts["Mod-8"] = () => editor.actions.wrapSelection("`", "`");
  shortcuts["Shift-Mod-e"] = () => editor.actions.wrapSelection("`", "`");
  shortcuts["Mod-9"] = () => editor.actions.cycleCalloutTypeAtSelection();
  shortcuts["Mod-p"] = () => editor.actions.replaceLineStart("-");
  shortcuts["Mod-o"] = () => editor.actions.replaceLineStartForOrderedList();
  return shortcuts;
}
function provideKeyBindings(editor) {
  const shortcuts = provide(editor);
  const keyBindings = [];
  const wrapAction = (action) => () => {
    action();
    return true;
  };
  for (const [shortcut, action] of Object.entries(shortcuts)) {
    keyBindings.push({ key: shortcut, run: wrapAction(action), preventDefault: true });
  }
  return keyBindings;
}

// resources/js/markdown/codemirror.js
async function init3(editor) {
  const Code = await window.importVersioned("code");
  function onViewUpdate(v) {
    if (v.docChanged) {
      editor.actions.updateAndRender();
    }
  }
  const onScrollDebounced = debounce(editor.actions.syncDisplayPosition.bind(editor.actions), 100, false);
  let syncActive = editor.settings.get("scrollSync");
  editor.settings.onChange("scrollSync", (val) => {
    syncActive = val;
  });
  const domEventHandlers = {
    // Handle scroll to sync display view
    scroll: (event) => syncActive && onScrollDebounced(event),
    // Handle image & content drag n drop
    drop: (event) => {
      const templateId = event.dataTransfer.getData("bookstack/template");
      if (templateId) {
        event.preventDefault();
        editor.actions.insertTemplate(templateId, event.pageX, event.pageY);
      }
      const clipboard = new Clipboard(event.dataTransfer);
      const clipboardImages = clipboard.getImages();
      if (clipboardImages.length > 0) {
        event.stopPropagation();
        event.preventDefault();
        editor.actions.insertClipboardImages(clipboardImages, event.pageX, event.pageY);
      }
    },
    // Handle image paste
    paste: (event) => {
      const clipboard = new Clipboard(event.clipboardData || event.dataTransfer);
      if (!clipboard.hasItems() || clipboard.containsTabularData()) {
        return;
      }
      const images = clipboard.getImages();
      for (const image2 of images) {
        editor.actions.uploadImage(image2);
      }
    }
  };
  const cm = Code.markdownEditor(
    editor.config.inputEl,
    onViewUpdate,
    domEventHandlers,
    provideKeyBindings(editor)
  );
  window.mdEditorView = cm;
  return cm;
}

// resources/js/markdown/editor.js
async function init4(config2) {
  const editor = {
    config: config2,
    markdown: new Markdown(),
    settings: new Settings(config2.settingInputs)
  };
  editor.actions = new Actions(editor);
  editor.display = new Display(editor);
  editor.cm = await init3(editor);
  listen2(editor);
  return editor;
}

// resources/js/components/markdown-editor.js
var MarkdownEditor = class extends Component {
  setup() {
    this.elem = this.$el;
    this.pageId = this.$opts.pageId;
    this.textDirection = this.$opts.textDirection;
    this.imageUploadErrorText = this.$opts.imageUploadErrorText;
    this.serverUploadLimitText = this.$opts.serverUploadLimitText;
    this.display = this.$refs.display;
    this.input = this.$refs.input;
    this.divider = this.$refs.divider;
    this.displayWrap = this.$refs.displayWrap;
    const { settingContainer } = this.$refs;
    const settingInputs = settingContainer.querySelectorAll('input[type="checkbox"]');
    this.editor = null;
    init4({
      pageId: this.pageId,
      container: this.elem,
      displayEl: this.display,
      inputEl: this.input,
      drawioUrl: this.getDrawioUrl(),
      settingInputs: Array.from(settingInputs),
      text: {
        serverUploadLimit: this.serverUploadLimitText,
        imageUploadError: this.imageUploadErrorText
      }
    }).then((editor) => {
      this.editor = editor;
      this.setupListeners();
      this.emitEditorEvents();
      this.scrollToTextIfNeeded();
      this.editor.actions.updateAndRender();
    });
  }
  emitEditorEvents() {
    window.$events.emitPublic(this.elem, "editor-markdown::setup", {
      markdownIt: this.editor.markdown.getRenderer(),
      displayEl: this.display,
      cmEditorView: this.editor.cm
    });
  }
  setupListeners() {
    this.elem.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (button === null) return;
      const action = button.getAttribute("data-action");
      if (action === "insertImage") this.editor.actions.showImageInsert();
      if (action === "insertLink") this.editor.actions.showLinkSelector();
      if (action === "insertDrawing" && (event.ctrlKey || event.metaKey)) {
        this.editor.actions.showImageManager();
        return;
      }
      if (action === "insertDrawing") this.editor.actions.startDrawing();
      if (action === "fullscreen") this.editor.actions.fullScreen();
    });
    this.elem.addEventListener("click", (event) => {
      const toolbarLabel = event.target.closest(".editor-toolbar-label");
      if (!toolbarLabel) return;
      const currentActiveSections = this.elem.querySelectorAll(".markdown-editor-wrap");
      for (const activeElem of currentActiveSections) {
        activeElem.classList.remove("active");
      }
      toolbarLabel.closest(".markdown-editor-wrap").classList.add("active");
    });
    this.handleDividerDrag();
  }
  handleDividerDrag() {
    this.divider.addEventListener("pointerdown", () => {
      const wrapRect = this.elem.getBoundingClientRect();
      const moveListener = (event) => {
        const xRel = event.pageX - wrapRect.left;
        const xPct = Math.min(Math.max(20, Math.floor(xRel / wrapRect.width * 100)), 80);
        this.displayWrap.style.flexBasis = `${100 - xPct}%`;
        this.editor.settings.set("editorWidth", xPct);
      };
      const upListener = () => {
        window.removeEventListener("pointermove", moveListener);
        window.removeEventListener("pointerup", upListener);
        this.display.style.pointerEvents = null;
        document.body.style.userSelect = null;
      };
      this.display.style.pointerEvents = "none";
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", moveListener);
      window.addEventListener("pointerup", upListener);
    });
    const widthSetting = this.editor.settings.get("editorWidth");
    if (widthSetting) {
      this.displayWrap.style.flexBasis = `${100 - widthSetting}%`;
    }
  }
  scrollToTextIfNeeded() {
    const queryParams = new URL(window.location).searchParams;
    const scrollText = queryParams.get("content-text");
    if (scrollText) {
      this.editor.actions.scrollToText(scrollText);
    }
  }
  /**
   * Get the URL for the configured drawio instance.
   * @returns {String}
   */
  getDrawioUrl() {
    const drawioAttrEl = document.querySelector("[drawio-url]");
    if (!drawioAttrEl) {
      return "";
    }
    return drawioAttrEl.getAttribute("drawio-url") || "";
  }
  /**
   * Get the content of this editor.
   * Used by the parent page editor component.
   * @return {{html: String, markdown: String}}
   */
  getContent() {
    return this.editor.actions.getContent();
  }
};

// resources/js/components/new-user-password.js
var NewUserPassword = class extends Component {
  setup() {
    this.container = this.$el;
    this.inputContainer = this.$refs.inputContainer;
    this.inviteOption = this.container.querySelector("input[name=send_invite]");
    if (this.inviteOption) {
      this.inviteOption.addEventListener("change", this.inviteOptionChange.bind(this));
      this.inviteOptionChange();
    }
  }
  inviteOptionChange() {
    const inviting = this.inviteOption.value === "true";
    const passwordBoxes = this.container.querySelectorAll("input[type=password]");
    for (const input of passwordBoxes) {
      input.disabled = inviting;
    }
    this.inputContainer.style.display = inviting ? "none" : "block";
  }
};

// resources/js/components/notification.js
var Notification = class extends Component {
  setup() {
    this.container = this.$el;
    this.type = this.$opts.type;
    this.textElem = this.container.querySelector("span");
    this.autoHide = this.$opts.autoHide === "true";
    this.initialShow = this.$opts.show === "true";
    this.container.style.display = "grid";
    window.$events.listen(this.type, (text2) => {
      this.show(text2);
    });
    this.container.addEventListener("click", this.hide.bind(this));
    if (this.initialShow) {
      setTimeout(() => this.show(this.textElem.textContent), 100);
    }
    this.hideCleanup = this.hideCleanup.bind(this);
  }
  show(textToShow = "") {
    this.container.removeEventListener("transitionend", this.hideCleanup);
    this.textElem.textContent = textToShow;
    this.container.style.display = "grid";
    setTimeout(() => {
      this.container.classList.add("showing");
    }, 1);
    if (this.autoHide) {
      const words = textToShow.split(" ").length;
      const timeToShow = Math.max(2e3, 1e3 + 250 * words);
      setTimeout(this.hide.bind(this), timeToShow);
    }
  }
  hide() {
    this.container.classList.remove("showing");
    this.container.addEventListener("transitionend", this.hideCleanup);
  }
  hideCleanup() {
    this.container.style.display = "none";
    this.container.removeEventListener("transitionend", this.hideCleanup);
  }
};

// resources/js/components/optional-input.js
var OptionalInput = class extends Component {
  setup() {
    this.removeButton = this.$refs.remove;
    this.showButton = this.$refs.show;
    this.input = this.$refs.input;
    this.setupListeners();
  }
  setupListeners() {
    onSelect(this.removeButton, () => {
      this.input.value = "";
      this.input.classList.add("hidden");
      this.removeButton.classList.add("hidden");
      this.showButton.classList.remove("hidden");
    });
    onSelect(this.showButton, () => {
      this.input.classList.remove("hidden");
      this.removeButton.classList.remove("hidden");
      this.showButton.classList.add("hidden");
    });
  }
};

// resources/js/components/page-comment.js
var PageComment = class extends Component {
  setup() {
    this.commentId = this.$opts.commentId;
    this.commentLocalId = this.$opts.commentLocalId;
    this.commentParentId = this.$opts.commentParentId;
    this.deletedText = this.$opts.deletedText;
    this.updatedText = this.$opts.updatedText;
    this.container = this.$el;
    this.contentContainer = this.$refs.contentContainer;
    this.form = this.$refs.form;
    this.formCancel = this.$refs.formCancel;
    this.editButton = this.$refs.editButton;
    this.deleteButton = this.$refs.deleteButton;
    this.replyButton = this.$refs.replyButton;
    this.input = this.$refs.input;
    this.setupListeners();
  }
  setupListeners() {
    if (this.replyButton) {
      this.replyButton.addEventListener("click", () => this.$emit("reply", {
        id: this.commentLocalId,
        element: this.container
      }));
    }
    if (this.editButton) {
      this.editButton.addEventListener("click", this.startEdit.bind(this));
      this.form.addEventListener("submit", this.update.bind(this));
      this.formCancel.addEventListener("click", () => this.toggleEditMode(false));
    }
    if (this.deleteButton) {
      this.deleteButton.addEventListener("click", this.delete.bind(this));
    }
  }
  toggleEditMode(show2) {
    this.contentContainer.toggleAttribute("hidden", show2);
    this.form.toggleAttribute("hidden", !show2);
  }
  startEdit() {
    this.toggleEditMode(true);
    const lineCount = this.$refs.input.value.split("\n").length;
    this.$refs.input.style.height = `${lineCount * 20 + 40}px`;
  }
  async update(event) {
    event.preventDefault();
    const loading = this.showLoading();
    this.form.toggleAttribute("hidden", true);
    const reqData = {
      text: this.input.value,
      parent_id: this.parentId || null
    };
    try {
      const resp = await window.$http.put(`/comment/${this.commentId}`, reqData);
      const newComment = htmlToDom(resp.data);
      this.container.replaceWith(newComment);
      window.$events.success(this.updatedText);
    } catch (err) {
      console.error(err);
      window.$events.showValidationErrors(err);
      this.form.toggleAttribute("hidden", false);
      loading.remove();
    }
  }
  async delete() {
    this.showLoading();
    await window.$http.delete(`/comment/${this.commentId}`);
    this.container.closest(".comment-branch").remove();
    window.$events.success(this.deletedText);
    this.$emit("delete");
  }
  showLoading() {
    const loading = getLoading();
    loading.classList.add("px-l");
    this.container.append(loading);
    return loading;
  }
};

// resources/js/components/page-comments.js
var PageComments = class extends Component {
  setup() {
    this.elem = this.$el;
    this.pageId = Number(this.$opts.pageId);
    this.container = this.$refs.commentContainer;
    this.commentCountBar = this.$refs.commentCountBar;
    this.commentsTitle = this.$refs.commentsTitle;
    this.addButtonContainer = this.$refs.addButtonContainer;
    this.replyToRow = this.$refs.replyToRow;
    this.formContainer = this.$refs.formContainer;
    this.form = this.$refs.form;
    this.formInput = this.$refs.formInput;
    this.formReplyLink = this.$refs.formReplyLink;
    this.addCommentButton = this.$refs.addCommentButton;
    this.hideFormButton = this.$refs.hideFormButton;
    this.removeReplyToButton = this.$refs.removeReplyToButton;
    this.createdText = this.$opts.createdText;
    this.countText = this.$opts.countText;
    this.parentId = null;
    this.formReplyText = this.formReplyLink?.textContent || "";
    this.setupListeners();
  }
  setupListeners() {
    this.elem.addEventListener("page-comment-delete", () => {
      this.updateCount();
      this.hideForm();
    });
    this.elem.addEventListener("page-comment-reply", (event) => {
      this.setReply(event.detail.id, event.detail.element);
    });
    if (this.form) {
      this.removeReplyToButton.addEventListener("click", this.removeReplyTo.bind(this));
      this.hideFormButton.addEventListener("click", this.hideForm.bind(this));
      this.addCommentButton.addEventListener("click", this.showForm.bind(this));
      this.form.addEventListener("submit", this.saveComment.bind(this));
    }
  }
  saveComment(event) {
    event.preventDefault();
    event.stopPropagation();
    const loading = getLoading();
    loading.classList.add("px-l");
    this.form.after(loading);
    this.form.toggleAttribute("hidden", true);
    const text2 = this.formInput.value;
    const reqData = {
      text: text2,
      parent_id: this.parentId || null
    };
    window.$http.post(`/comment/${this.pageId}`, reqData).then((resp) => {
      const newElem = htmlToDom(resp.data);
      this.formContainer.after(newElem);
      window.$events.success(this.createdText);
      this.hideForm();
      this.updateCount();
    }).catch((err) => {
      this.form.toggleAttribute("hidden", false);
      window.$events.showValidationErrors(err);
    });
    this.form.toggleAttribute("hidden", false);
    loading.remove();
  }
  updateCount() {
    const count = this.getCommentCount();
    this.commentsTitle.textContent = window.trans_plural(this.countText, count, { count });
  }
  resetForm() {
    this.formInput.value = "";
    this.parentId = null;
    this.replyToRow.toggleAttribute("hidden", true);
    this.container.append(this.formContainer);
  }
  showForm() {
    this.formContainer.toggleAttribute("hidden", false);
    this.addButtonContainer.toggleAttribute("hidden", true);
    this.formContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => {
      this.formInput.focus();
    }, 100);
  }
  hideForm() {
    this.resetForm();
    this.formContainer.toggleAttribute("hidden", true);
    if (this.getCommentCount() > 0) {
      this.elem.append(this.addButtonContainer);
    } else {
      this.commentCountBar.append(this.addButtonContainer);
    }
    this.addButtonContainer.toggleAttribute("hidden", false);
  }
  getCommentCount() {
    return this.container.querySelectorAll('[component="page-comment"]').length;
  }
  setReply(commentLocalId, commentElement) {
    const targetFormLocation = commentElement.closest(".comment-branch").querySelector(".comment-branch-children");
    targetFormLocation.append(this.formContainer);
    this.showForm();
    this.parentId = commentLocalId;
    this.replyToRow.toggleAttribute("hidden", false);
    this.formReplyLink.textContent = this.formReplyText.replace("1234", this.parentId);
    this.formReplyLink.href = `#comment${this.parentId}`;
  }
  removeReplyTo() {
    this.parentId = null;
    this.replyToRow.toggleAttribute("hidden", true);
    this.container.append(this.formContainer);
    this.showForm();
  }
};

// resources/js/components/page-display.js
function toggleAnchorHighlighting(elementId, shouldHighlight) {
  forEach(`#page-navigation a[href="#${elementId}"]`, (anchor) => {
    anchor.closest("li").classList.toggle("current-heading", shouldHighlight);
  });
}
function headingVisibilityChange(entries) {
  for (const entry of entries) {
    const isVisible = entry.intersectionRatio === 1;
    toggleAnchorHighlighting(entry.target.id, isVisible);
  }
}
function addNavObserver(headings) {
  const intersectOpts = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 1
  };
  const pageNavObserver = new IntersectionObserver(headingVisibilityChange, intersectOpts);
  for (const heading2 of headings) {
    pageNavObserver.observe(heading2);
  }
}
var PageDisplay = class extends Component {
  setup() {
    this.container = this.$el;
    this.pageId = this.$opts.pageId;
    window.importVersioned("code").then((Code) => Code.highlight());
    this.setupNavHighlighting();
    if (window.location.hash) {
      const text2 = window.location.hash.replace(/%20/g, " ").substring(1);
      this.goToText(text2);
    }
    const sidebarPageNav = document.querySelector(".sidebar-page-nav");
    if (sidebarPageNav) {
      onChildEvent(sidebarPageNav, "a", "click", (event, child) => {
        event.preventDefault();
        window.$components.first("tri-layout").showContent();
        const contentId = child.getAttribute("href").substr(1);
        this.goToText(contentId);
        window.history.pushState(null, null, `#${contentId}`);
      });
    }
  }
  goToText(text2) {
    const idElem = document.getElementById(text2);
    forEach(".page-content [data-highlighted]", (elem2) => {
      elem2.removeAttribute("data-highlighted");
      elem2.style.backgroundColor = null;
    });
    if (idElem !== null) {
      scrollAndHighlightElement(idElem);
    } else {
      const textElem = findText(".page-content > div > *", text2);
      if (textElem) {
        scrollAndHighlightElement(textElem);
      }
    }
  }
  setupNavHighlighting() {
    const pageNav = document.querySelector(".sidebar-page-nav");
    const headings = document.querySelector(".page-content").querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (headings.length > 0 && pageNav !== null) {
      addNavObserver(headings);
    }
  }
};

// resources/js/services/dates.js
function utcTimeStampToLocalTime(timestamp) {
  const date = new Date(timestamp * 1e3);
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${(hours > 9 ? "" : "0") + hours}:${(mins > 9 ? "" : "0") + mins}`;
}

// resources/js/components/page-editor.js
var PageEditor = class extends Component {
  setup() {
    this.draftsEnabled = this.$opts.draftsEnabled === "true";
    this.editorType = this.$opts.editorType;
    this.pageId = Number(this.$opts.pageId);
    this.isNewDraft = this.$opts.pageNewDraft === "true";
    this.hasDefaultTitle = this.$opts.hasDefaultTitle || false;
    this.container = this.$el;
    this.titleElem = this.$refs.titleContainer.querySelector("input");
    this.saveDraftButton = this.$refs.saveDraft;
    this.discardDraftButton = this.$refs.discardDraft;
    this.discardDraftWrap = this.$refs.discardDraftWrap;
    this.deleteDraftButton = this.$refs.deleteDraft;
    this.deleteDraftWrap = this.$refs.deleteDraftWrap;
    this.draftDisplay = this.$refs.draftDisplay;
    this.draftDisplayIcon = this.$refs.draftDisplayIcon;
    this.changelogInput = this.$refs.changelogInput;
    this.changelogDisplay = this.$refs.changelogDisplay;
    this.changeEditorButtons = this.$manyRefs.changeEditor || [];
    this.switchDialogContainer = this.$refs.switchDialog;
    this.deleteDraftDialogContainer = this.$refs.deleteDraftDialog;
    this.draftText = this.$opts.draftText;
    this.autosaveFailText = this.$opts.autosaveFailText;
    this.editingPageText = this.$opts.editingPageText;
    this.draftDiscardedText = this.$opts.draftDiscardedText;
    this.draftDeleteText = this.$opts.draftDeleteText;
    this.draftDeleteFailText = this.$opts.draftDeleteFailText;
    this.setChangelogText = this.$opts.setChangelogText;
    this.autoSave = {
      interval: null,
      frequency: 3e4,
      last: 0,
      pendingChange: false
    };
    this.shownWarningsCache = /* @__PURE__ */ new Set();
    if (this.pageId !== 0 && this.draftsEnabled) {
      window.setTimeout(() => {
        this.startAutoSave();
      }, 1e3);
    }
    this.draftDisplay.innerHTML = this.draftText;
    this.setupListeners();
    this.setInitialFocus();
  }
  setupListeners() {
    window.$events.listen("editor-save-draft", this.saveDraft.bind(this));
    window.$events.listen("editor-save-page", this.savePage.bind(this));
    const onContentChange = () => {
      this.autoSave.pendingChange = true;
    };
    window.$events.listen("editor-html-change", onContentChange);
    window.$events.listen("editor-markdown-change", onContentChange);
    this.titleElem.addEventListener("input", onContentChange);
    const updateChangelogDebounced = debounce(this.updateChangelogDisplay.bind(this), 300, false);
    this.changelogInput.addEventListener("input", updateChangelogDebounced);
    onSelect(this.saveDraftButton, this.saveDraft.bind(this));
    onSelect(this.discardDraftButton, this.discardDraft.bind(this));
    onSelect(this.deleteDraftButton, this.deleteDraft.bind(this));
    onSelect(this.changeEditorButtons, this.changeEditor.bind(this));
  }
  setInitialFocus() {
    if (this.hasDefaultTitle) {
      this.titleElem.select();
      return;
    }
    window.setTimeout(() => {
      window.$events.emit("editor::focus", "");
    }, 500);
  }
  startAutoSave() {
    this.autoSave.interval = window.setInterval(this.runAutoSave.bind(this), this.autoSave.frequency);
  }
  runAutoSave() {
    const savedRecently = Date.now() - this.autoSave.last < this.autoSave.frequency / 2;
    if (savedRecently || !this.autoSave.pendingChange) {
      return;
    }
    this.saveDraft();
  }
  savePage() {
    this.container.closest("form").submit();
  }
  async saveDraft() {
    const data = { name: this.titleElem.value.trim() };
    const editorContent = this.getEditorComponent().getContent();
    Object.assign(data, editorContent);
    let didSave = false;
    try {
      const resp = await window.$http.put(`/ajax/page/${this.pageId}/save-draft`, data);
      if (!this.isNewDraft) {
        this.discardDraftWrap.toggleAttribute("hidden", false);
        this.deleteDraftWrap.toggleAttribute("hidden", false);
      }
      this.draftNotifyChange(`${resp.data.message} ${utcTimeStampToLocalTime(resp.data.timestamp)}`);
      this.autoSave.last = Date.now();
      if (resp.data.warning && !this.shownWarningsCache.has(resp.data.warning)) {
        window.$events.emit("warning", resp.data.warning);
        this.shownWarningsCache.add(resp.data.warning);
      }
      didSave = true;
      this.autoSave.pendingChange = false;
    } catch (err) {
      try {
        const saveKey = `draft-save-fail-${(/* @__PURE__ */ new Date()).toISOString()}`;
        window.localStorage.setItem(saveKey, JSON.stringify(data));
      } catch (lsErr) {
        console.error(lsErr);
      }
      window.$events.emit("error", this.autosaveFailText);
    }
    return didSave;
  }
  draftNotifyChange(text2) {
    this.draftDisplay.innerText = text2;
    this.draftDisplayIcon.classList.add("visible");
    window.setTimeout(() => {
      this.draftDisplayIcon.classList.remove("visible");
    }, 2e3);
  }
  async discardDraft(notify = true) {
    let response;
    try {
      response = await window.$http.get(`/ajax/page/${this.pageId}`);
    } catch (e) {
      console.error(e);
      return;
    }
    if (this.autoSave.interval) {
      window.clearInterval(this.autoSave.interval);
    }
    this.draftDisplay.innerText = this.editingPageText;
    this.discardDraftWrap.toggleAttribute("hidden", true);
    window.$events.emit("editor::replace", {
      html: response.data.html,
      markdown: response.data.markdown
    });
    this.titleElem.value = response.data.name;
    window.setTimeout(() => {
      this.startAutoSave();
    }, 1e3);
    if (notify) {
      window.$events.success(this.draftDiscardedText);
    }
  }
  async deleteDraft() {
    const dialog = window.$components.firstOnElement(this.deleteDraftDialogContainer, "confirm-dialog");
    const confirmed = await dialog.show();
    if (!confirmed) {
      return;
    }
    try {
      const discard = this.discardDraft(false);
      const draftDelete = window.$http.delete(`/page-revisions/user-drafts/${this.pageId}`);
      await Promise.all([discard, draftDelete]);
      window.$events.success(this.draftDeleteText);
      this.deleteDraftWrap.toggleAttribute("hidden", true);
    } catch (err) {
      console.error(err);
      window.$events.error(this.draftDeleteFailText);
    }
  }
  updateChangelogDisplay() {
    let summary = this.changelogInput.value.trim();
    if (summary.length === 0) {
      summary = this.setChangelogText;
    } else if (summary.length > 16) {
      summary = `${summary.slice(0, 16)}...`;
    }
    this.changelogDisplay.innerText = summary;
  }
  async changeEditor(event) {
    event.preventDefault();
    const link2 = event.target.closest("a").href;
    const dialog = window.$components.firstOnElement(this.switchDialogContainer, "confirm-dialog");
    const [saved, confirmed] = await Promise.all([this.saveDraft(), dialog.show()]);
    if (saved && confirmed) {
      window.location = link2;
    }
  }
  /**
   * @return MarkdownEditor|WysiwygEditor
   */
  getEditorComponent() {
    return window.$components.first("markdown-editor") || window.$components.first("wysiwyg-editor");
  }
};

// resources/js/components/page-picker.js
function toggleElem(elem2, show2) {
  elem2.toggleAttribute("hidden", !show2);
}
var PagePicker = class extends Component {
  setup() {
    this.input = this.$refs.input;
    this.resetButton = this.$refs.resetButton;
    this.selectButton = this.$refs.selectButton;
    this.display = this.$refs.display;
    this.defaultDisplay = this.$refs.defaultDisplay;
    this.buttonSep = this.$refs.buttonSeperator;
    this.selectorEndpoint = this.$opts.selectorEndpoint;
    this.value = this.input.value;
    this.setupListeners();
  }
  setupListeners() {
    this.selectButton.addEventListener("click", this.showPopup.bind(this));
    this.display.parentElement.addEventListener("click", this.showPopup.bind(this));
    this.display.addEventListener("click", (e) => e.stopPropagation());
    this.resetButton.addEventListener("click", () => {
      this.setValue("", "");
    });
  }
  showPopup() {
    const selectorPopup = window.$components.first("entity-selector-popup");
    selectorPopup.show((entity2) => {
      this.setValue(entity2.id, entity2.name);
    }, {
      initialValue: "",
      searchEndpoint: this.selectorEndpoint,
      entityTypes: "page",
      entityPermission: "view"
    });
  }
  setValue(value, name) {
    this.value = value;
    this.input.value = value;
    this.controlView(name);
  }
  controlView(name) {
    const hasValue = this.value && this.value !== 0;
    toggleElem(this.resetButton, hasValue);
    toggleElem(this.buttonSep, hasValue);
    toggleElem(this.defaultDisplay, !hasValue);
    toggleElem(this.display, hasValue);
    if (hasValue) {
      const id = this.getAssetIdFromVal();
      this.display.textContent = `#${id}, ${name}`;
      this.display.href = window.baseUrl(`/link/${id}`);
    }
  }
  getAssetIdFromVal() {
    return Number(this.value);
  }
};

// resources/js/components/permissions-table.js
var PermissionsTable = class extends Component {
  setup() {
    this.container = this.$el;
    this.cellSelector = this.$opts.cellSelector || "td,th";
    this.rowSelector = this.$opts.rowSelector || "tr";
    for (const toggleAllElem of this.$manyRefs.toggleAll || []) {
      toggleAllElem.addEventListener("click", this.toggleAllClick.bind(this));
    }
    for (const toggleRowElem of this.$manyRefs.toggleRow || []) {
      toggleRowElem.addEventListener("click", this.toggleRowClick.bind(this));
    }
    for (const toggleColElem of this.$manyRefs.toggleColumn || []) {
      toggleColElem.addEventListener("click", this.toggleColumnClick.bind(this));
    }
  }
  toggleAllClick(event) {
    event.preventDefault();
    this.toggleAllInElement(this.container);
  }
  toggleRowClick(event) {
    event.preventDefault();
    this.toggleAllInElement(event.target.closest(this.rowSelector));
  }
  toggleColumnClick(event) {
    event.preventDefault();
    const tableCell = event.target.closest(this.cellSelector);
    const colIndex = Array.from(tableCell.parentElement.children).indexOf(tableCell);
    const tableRows = this.container.querySelectorAll(this.rowSelector);
    const inputsToToggle = [];
    for (const row of tableRows) {
      const targetCell = row.children[colIndex];
      if (targetCell) {
        inputsToToggle.push(...targetCell.querySelectorAll("input[type=checkbox]"));
      }
    }
    this.toggleAllInputs(inputsToToggle);
  }
  toggleAllInElement(domElem) {
    const inputsToToggle = domElem.querySelectorAll("input[type=checkbox]");
    this.toggleAllInputs(inputsToToggle);
  }
  toggleAllInputs(inputsToToggle) {
    const currentState = inputsToToggle.length > 0 ? inputsToToggle[0].checked : false;
    for (const checkbox of inputsToToggle) {
      checkbox.checked = !currentState;
      checkbox.dispatchEvent(new Event("change"));
    }
  }
};

// resources/js/components/pointer.js
var Pointer = class extends Component {
  setup() {
    this.container = this.$el;
    this.pointer = this.$refs.pointer;
    this.linkInput = this.$refs.linkInput;
    this.linkButton = this.$refs.linkButton;
    this.includeInput = this.$refs.includeInput;
    this.includeButton = this.$refs.includeButton;
    this.sectionModeButton = this.$refs.sectionModeButton;
    this.modeToggles = this.$manyRefs.modeToggle;
    this.modeSections = this.$manyRefs.modeSection;
    this.pageId = this.$opts.pageId;
    this.showing = false;
    this.isSelection = false;
    this.setupListeners();
  }
  setupListeners() {
    this.includeButton.addEventListener("click", () => copyTextToClipboard(this.includeInput.value));
    this.linkButton.addEventListener("click", () => copyTextToClipboard(this.linkInput.value));
    onSelect([this.includeInput, this.linkInput], (event) => {
      event.target.select();
      event.stopPropagation();
    });
    onEvents(this.pointer, ["click", "focus"], (event) => {
      event.stopPropagation();
    });
    onEvents(document.body, ["click", "focus"], () => {
      if (!this.showing || this.isSelection) return;
      this.hidePointer();
    });
    onEscapePress(this.pointer, this.hidePointer.bind(this));
    const pageContent = document.querySelector(".page-content");
    onEvents(pageContent, ["mouseup", "keyup"], (event) => {
      event.stopPropagation();
      const targetEl = event.target.closest('[id^="bkmrk"]');
      if (targetEl && window.getSelection().toString().length > 0) {
        this.showPointerAtTarget(targetEl, event.pageX, false);
      }
    });
    onSelect(this.sectionModeButton, this.enterSectionSelectMode.bind(this));
    onSelect(this.modeToggles, (event) => {
      for (const section of this.modeSections) {
        const show2 = !section.contains(event.target);
        section.toggleAttribute("hidden", !show2);
      }
      this.modeToggles.find((b) => b !== event.target).focus();
    });
  }
  hidePointer() {
    this.pointer.style.display = null;
    this.showing = false;
  }
  /**
   * Move and display the pointer at the given element, targeting the given screen x-position if possible.
   * @param {Element} element
   * @param {Number} xPosition
   * @param {Boolean} keyboardMode
   */
  showPointerAtTarget(element, xPosition, keyboardMode) {
    this.updateForTarget(element);
    this.pointer.style.display = "block";
    const targetBounds = element.getBoundingClientRect();
    const pointerBounds = this.pointer.getBoundingClientRect();
    const xTarget = Math.min(Math.max(xPosition, targetBounds.left), targetBounds.right);
    const xOffset = xTarget - pointerBounds.width / 2;
    const yOffset = targetBounds.top - pointerBounds.height - 16;
    this.pointer.style.left = `${xOffset}px`;
    this.pointer.style.top = `${yOffset}px`;
    this.showing = true;
    this.isSelection = true;
    setTimeout(() => {
      this.isSelection = false;
    }, 100);
    const scrollListener = () => {
      this.hidePointer();
      window.removeEventListener("scroll", scrollListener, { passive: true });
    };
    element.parentElement.insertBefore(this.pointer, element);
    if (!keyboardMode) {
      window.addEventListener("scroll", scrollListener, { passive: true });
    }
  }
  /**
   * Update the pointer inputs/content for the given target element.
   * @param {?Element} element
   */
  updateForTarget(element) {
    const permaLink = window.baseUrl(`/link/${this.pageId}#${element.id}`);
    const includeTag = `{{@${this.pageId}#${element.id}}}`;
    this.linkInput.value = permaLink;
    this.includeInput.value = includeTag;
    const editAnchor = this.pointer.querySelector("#pointer-edit");
    if (editAnchor && element) {
      const { editHref } = editAnchor.dataset;
      const elementId = element.id;
      const queryContent = element.textContent && element.textContent.substring(0, 50);
      editAnchor.href = `${editHref}?content-id=${elementId}&content-text=${encodeURIComponent(queryContent)}`;
    }
  }
  enterSectionSelectMode() {
    const sections = Array.from(document.querySelectorAll('.page-content [id^="bkmrk"]'));
    for (const section of sections) {
      section.setAttribute("tabindex", "0");
    }
    sections[0].focus();
    onEnterPress(sections, (event) => {
      this.showPointerAtTarget(event.target, 0, true);
      this.pointer.focus();
    });
  }
};

// resources/js/components/popup.js
var Popup = class extends Component {
  setup() {
    this.container = this.$el;
    this.hideButtons = this.$manyRefs.hide || [];
    this.onkeyup = null;
    this.onHide = null;
    this.setupListeners();
  }
  setupListeners() {
    let lastMouseDownTarget = null;
    this.container.addEventListener("mousedown", (event) => {
      lastMouseDownTarget = event.target;
    });
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container && lastMouseDownTarget === this.container) {
        this.hide();
      }
    });
    onSelect(this.hideButtons, () => this.hide());
  }
  hide(onComplete = null) {
    fadeOut(this.container, 120, onComplete);
    if (this.onkeyup) {
      window.removeEventListener("keyup", this.onkeyup);
      this.onkeyup = null;
    }
    if (this.onHide) {
      this.onHide();
    }
  }
  show(onComplete = null, onHide = null) {
    fadeIn(this.container, 120, onComplete);
    this.onkeyup = (event) => {
      if (event.key === "Escape") {
        this.hide();
      }
    };
    window.addEventListener("keyup", this.onkeyup);
    this.onHide = onHide;
  }
};

// resources/js/components/setting-app-color-scheme.js
var SettingAppColorScheme = class extends Component {
  setup() {
    this.container = this.$el;
    this.mode = this.$opts.mode;
    this.lightContainer = this.$refs.lightContainer;
    this.darkContainer = this.$refs.darkContainer;
    this.container.addEventListener("tabs-change", (event) => {
      const panel = event.detail.showing;
      const newMode = panel === "color-scheme-panel-light" ? "light" : "dark";
      this.handleModeChange(newMode);
    });
    const onInputChange = (event) => {
      this.updateAppColorsFromInputs();
      if (event.target.name.startsWith("setting-app-color")) {
        this.updateLightForInput(event.target);
      }
    };
    this.container.addEventListener("change", onInputChange);
    this.container.addEventListener("input", onInputChange);
  }
  handleModeChange(newMode) {
    this.mode = newMode;
    const isDark = newMode === "dark";
    document.documentElement.classList.toggle("dark-mode", isDark);
    this.updateAppColorsFromInputs();
  }
  updateAppColorsFromInputs() {
    const inputContainer = this.mode === "dark" ? this.darkContainer : this.lightContainer;
    const inputs = inputContainer.querySelectorAll('input[type="color"]');
    for (const input of inputs) {
      const splitName = input.name.split("-");
      const colorPos = splitName.indexOf("color");
      let cssId = splitName.slice(1, colorPos).join("-");
      if (cssId === "app") {
        cssId = "primary";
      }
      const varName = `--color-${cssId}`;
      document.body.style.setProperty(varName, input.value);
    }
  }
  /**
   * Update the 'light' app color variant for the given input.
   * @param {HTMLInputElement} input
   */
  updateLightForInput(input) {
    const lightName = input.name.replace("-color", "-color-light");
    const hexVal = input.value;
    const rgb = this.hexToRgb(hexVal);
    const rgbLightVal = `rgba(${[rgb.r, rgb.g, rgb.b, "0.15"].join(",")})`;
    const lightColorInput = this.container.querySelector(`input[name="${lightName}"][type="hidden"]`);
    lightColorInput.value = rgbLightVal;
  }
  /**
   * Covert a hex color code to rgb components.
   * @attribution https://stackoverflow.com/a/5624139
   * @param {String} hex
   * @returns {{r: Number, g: Number, b: Number}}
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: result ? parseInt(result[1], 16) : 0,
      g: result ? parseInt(result[2], 16) : 0,
      b: result ? parseInt(result[3], 16) : 0
    };
  }
};

// resources/js/components/setting-color-picker.js
var SettingColorPicker = class extends Component {
  setup() {
    this.colorInput = this.$refs.input;
    this.resetButton = this.$refs.resetButton;
    this.defaultButton = this.$refs.defaultButton;
    this.currentColor = this.$opts.current;
    this.defaultColor = this.$opts.default;
    this.resetButton.addEventListener("click", () => this.setValue(this.currentColor));
    this.defaultButton.addEventListener("click", () => this.setValue(this.defaultColor));
  }
  setValue(value) {
    this.colorInput.value = value;
    this.colorInput.dispatchEvent(new Event("change", { bubbles: true }));
  }
};

// resources/js/components/setting-homepage-control.js
var SettingHomepageControl = class extends Component {
  setup() {
    this.typeControl = this.$refs.typeControl;
    this.pagePickerContainer = this.$refs.pagePickerContainer;
    this.typeControl.addEventListener("change", this.controlPagePickerVisibility.bind(this));
    this.controlPagePickerVisibility();
  }
  controlPagePickerVisibility() {
    const showPagePicker = this.typeControl.value === "page";
    this.pagePickerContainer.style.display = showPagePicker ? "block" : "none";
  }
};

// resources/js/components/shelf-sort.js
var itemActions = {
  move_up(item) {
    const list2 = item.parentNode;
    const index2 = Array.from(list2.children).indexOf(item);
    const newIndex2 = Math.max(index2 - 1, 0);
    list2.insertBefore(item, list2.children[newIndex2] || null);
  },
  move_down(item) {
    const list2 = item.parentNode;
    const index2 = Array.from(list2.children).indexOf(item);
    const newIndex2 = Math.min(index2 + 2, list2.children.length);
    list2.insertBefore(item, list2.children[newIndex2] || null);
  },
  remove(item, shelfBooksList, allBooksList) {
    allBooksList.appendChild(item);
  },
  add(item, shelfBooksList) {
    shelfBooksList.appendChild(item);
  }
};
var ShelfSort = class extends Component {
  setup() {
    this.elem = this.$el;
    this.input = this.$refs.input;
    this.shelfBookList = this.$refs.shelfBookList;
    this.allBookList = this.$refs.allBookList;
    this.bookSearchInput = this.$refs.bookSearch;
    this.sortButtonContainer = this.$refs.sortButtonContainer;
    this.lastSort = null;
    this.initSortable();
    this.setupListeners();
  }
  initSortable() {
    const scrollBoxes = this.elem.querySelectorAll(".scroll-box");
    for (const scrollBox of scrollBoxes) {
      new sortable_esm_default(scrollBox, {
        group: "shelf-books",
        ghostClass: "primary-background-light",
        handle: ".handle",
        animation: 150,
        onSort: this.onChange.bind(this)
      });
    }
  }
  setupListeners() {
    this.elem.addEventListener("click", (event) => {
      const sortItemAction = event.target.closest(".scroll-box-item button[data-action]");
      if (sortItemAction) {
        this.sortItemActionClick(sortItemAction);
      }
    });
    this.bookSearchInput.addEventListener("input", () => {
      this.filterBooksByName(this.bookSearchInput.value);
    });
    this.sortButtonContainer.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-sort]");
      if (button) {
        this.sortShelfBooks(button.dataset.sort);
      }
    });
  }
  /**
   * @param {String} filterVal
   */
  filterBooksByName(filterVal) {
    if (!this.allBookList.style.height) {
      this.allBookList.style.height = `${this.allBookList.getBoundingClientRect().height}px`;
    }
    const books = this.allBookList.children;
    const lowerFilter = filterVal.trim().toLowerCase();
    for (const bookEl of books) {
      const show2 = !filterVal || bookEl.textContent.toLowerCase().includes(lowerFilter);
      bookEl.style.display = show2 ? null : "none";
    }
  }
  /**
   * Called when a sort item action button is clicked.
   * @param {HTMLElement} sortItemAction
   */
  sortItemActionClick(sortItemAction) {
    const sortItem = sortItemAction.closest(".scroll-box-item");
    const { action } = sortItemAction.dataset;
    const actionFunction = itemActions[action];
    actionFunction(sortItem, this.shelfBookList, this.allBookList);
    this.onChange();
  }
  onChange() {
    const shelfBookElems = Array.from(this.shelfBookList.querySelectorAll("[data-id]"));
    this.input.value = shelfBookElems.map((elem2) => elem2.getAttribute("data-id")).join(",");
  }
  sortShelfBooks(sortProperty) {
    const books = Array.from(this.shelfBookList.children);
    const reverse = sortProperty === this.lastSort;
    books.sort((bookA, bookB) => {
      const aProp = bookA.dataset[sortProperty].toLowerCase();
      const bProp = bookB.dataset[sortProperty].toLowerCase();
      if (reverse) {
        return bProp.localeCompare(aProp);
      }
      return aProp.localeCompare(bProp);
    });
    for (const book of books) {
      this.shelfBookList.append(book);
    }
    this.lastSort = this.lastSort === sortProperty ? null : sortProperty;
    this.onChange();
  }
};

// resources/js/components/shortcuts.js
function reverseMap(map2) {
  const reversed = {};
  for (const [key, value] of Object.entries(map2)) {
    reversed[value] = key;
  }
  return reversed;
}
var Shortcuts = class extends Component {
  setup() {
    this.container = this.$el;
    this.mapById = JSON.parse(this.$opts.keyMap);
    this.mapByShortcut = reverseMap(this.mapById);
    this.hintsShowing = false;
    this.hideHints = this.hideHints.bind(this);
    this.hintAbortController = null;
    this.setupListeners();
  }
  setupListeners() {
    window.addEventListener("keydown", (event) => {
      if (event.target.closest("input, select, textarea, .cm-editor")) {
        return;
      }
      if (event.key === "?") {
        if (this.hintsShowing) {
          this.hideHints();
        } else {
          this.showHints();
        }
        return;
      }
      this.handleShortcutPress(event);
    });
  }
  /**
   * @param {KeyboardEvent} event
   */
  handleShortcutPress(event) {
    const keys = [
      event.ctrlKey ? "Ctrl" : "",
      event.metaKey ? "Cmd" : "",
      event.key
    ];
    const combo = keys.filter((s) => Boolean(s)).join(" + ");
    const shortcutId = this.mapByShortcut[combo];
    if (shortcutId) {
      const wasHandled = this.runShortcut(shortcutId);
      if (wasHandled) {
        event.preventDefault();
      }
    }
  }
  /**
   * Run the given shortcut, and return a boolean to indicate if the event
   * was successfully handled by a shortcut action.
   * @param {String} id
   * @return {boolean}
   */
  runShortcut(id) {
    const el = this.container.querySelector(`[data-shortcut="${id}"]`);
    if (!el) {
      return false;
    }
    if (el.matches("input, textarea, select")) {
      el.focus();
      return true;
    }
    if (el.matches("a, button")) {
      el.click();
      return true;
    }
    if (el.matches("div[tabindex]")) {
      el.click();
      el.focus();
      return true;
    }
    console.error("Shortcut attempted to be ran for element type that does not have handling setup", el);
    return false;
  }
  showHints() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("shortcut-container");
    this.container.append(wrapper);
    const shortcutEls = this.container.querySelectorAll("[data-shortcut]");
    const displayedIds = /* @__PURE__ */ new Set();
    for (const shortcutEl of shortcutEls) {
      const id = shortcutEl.getAttribute("data-shortcut");
      if (displayedIds.has(id)) {
        continue;
      }
      const key = this.mapById[id];
      this.showHintLabel(shortcutEl, key, wrapper);
      displayedIds.add(id);
    }
    this.hintAbortController = new AbortController();
    const signal = this.hintAbortController.signal;
    window.addEventListener("scroll", this.hideHints, { signal });
    window.addEventListener("focus", this.hideHints, { signal });
    window.addEventListener("blur", this.hideHints, { signal });
    window.addEventListener("click", this.hideHints, { signal });
    this.hintsShowing = true;
  }
  /**
   * @param {Element} targetEl
   * @param {String} key
   * @param {Element} wrapper
   */
  showHintLabel(targetEl, key, wrapper) {
    const targetBounds = targetEl.getBoundingClientRect();
    const label = document.createElement("div");
    label.classList.add("shortcut-hint");
    label.textContent = key;
    const linkage = document.createElement("div");
    linkage.classList.add("shortcut-linkage");
    linkage.style.left = `${targetBounds.x}px`;
    linkage.style.top = `${targetBounds.y}px`;
    linkage.style.width = `${targetBounds.width}px`;
    linkage.style.height = `${targetBounds.height}px`;
    wrapper.append(label, linkage);
    const labelBounds = label.getBoundingClientRect();
    label.style.insetInlineStart = `${targetBounds.x + targetBounds.width - (labelBounds.width + 6)}px`;
    label.style.insetBlockStart = `${targetBounds.y + (targetBounds.height - labelBounds.height) / 2}px`;
  }
  hideHints() {
    const wrapper = this.container.querySelector(".shortcut-container");
    wrapper.remove();
    this.hintAbortController?.abort();
    this.hintsShowing = false;
  }
};

// resources/js/components/shortcut-input.js
var ignoreKeys = ["Control", "Alt", "Shift", "Meta", "Super", " ", "+", "Tab", "Escape"];
var ShortcutInput = class extends Component {
  setup() {
    this.input = this.$el;
    this.setupListeners();
  }
  setupListeners() {
    this.listenerRecordKey = this.listenerRecordKey.bind(this);
    this.input.addEventListener("focus", () => {
      this.startListeningForInput();
    });
    this.input.addEventListener("blur", () => {
      this.stopListeningForInput();
    });
  }
  startListeningForInput() {
    this.input.addEventListener("keydown", this.listenerRecordKey);
  }
  /**
   * @param {KeyboardEvent} event
   */
  listenerRecordKey(event) {
    if (ignoreKeys.includes(event.key)) {
      return;
    }
    const keys = [
      event.ctrlKey ? "Ctrl" : "",
      event.metaKey ? "Cmd" : "",
      event.key
    ];
    this.input.value = keys.filter((s) => Boolean(s)).join(" + ");
  }
  stopListeningForInput() {
    this.input.removeEventListener("keydown", this.listenerRecordKey);
  }
};

// resources/js/components/sortable-list.js
var SortableList = class extends Component {
  setup() {
    this.container = this.$el;
    this.handleSelector = this.$opts.handleSelector;
    const sortable = new sortable_esm_default(this.container, {
      handle: this.handleSelector,
      animation: 150,
      onSort: () => {
        this.$emit("sort", { ids: sortable.toArray() });
      },
      setData(dataTransferItem, dragEl2) {
        const jsonContent = dragEl2.getAttribute("data-drag-content");
        if (jsonContent) {
          const contentByType = JSON.parse(jsonContent);
          for (const [type, content] of Object.entries(contentByType)) {
            dataTransferItem.setData(type, content);
          }
        }
      },
      revertOnSpill: true,
      dropBubble: true,
      dragoverBubble: false
    });
  }
};

// resources/js/components/submit-on-change.js
var SubmitOnChange = class extends Component {
  setup() {
    this.filter = this.$opts.filter;
    this.$el.addEventListener("change", (event) => {
      if (this.filter && !event.target.matches(this.filter)) {
        return;
      }
      const form = this.$el.closest("form");
      if (form) {
        form.submit();
      }
    });
  }
};

// resources/js/components/tabs.js
var Tabs = class extends Component {
  setup() {
    this.container = this.$el;
    this.tabList = this.container.querySelector('[role="tablist"]');
    this.tabs = Array.from(this.tabList.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.container.querySelectorAll(':scope > [role="tabpanel"], :scope > * > [role="tabpanel"]'));
    this.activeUnder = this.$opts.activeUnder ? Number(this.$opts.activeUnder) : 1e4;
    this.active = null;
    this.container.addEventListener("click", (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (tab && this.tabs.includes(tab)) {
        this.show(tab.getAttribute("aria-controls"));
      }
    });
    window.addEventListener("resize", this.updateActiveState.bind(this), {
      passive: true
    });
    this.updateActiveState();
  }
  show(sectionId) {
    for (const panel of this.panels) {
      panel.toggleAttribute("hidden", panel.id !== sectionId);
    }
    for (const tab of this.tabs) {
      const tabSection = tab.getAttribute("aria-controls");
      const selected = tabSection === sectionId;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    }
    this.$emit("change", { showing: sectionId });
  }
  updateActiveState() {
    const active = window.innerWidth < this.activeUnder;
    if (active === this.active) {
      return;
    }
    if (active) {
      this.activate();
    } else {
      this.deactivate();
    }
    this.active = active;
  }
  activate() {
    const panelToShow = this.panels.find((p) => !p.hasAttribute("hidden")) || this.panels[0];
    this.show(panelToShow.id);
    this.tabList.toggleAttribute("hidden", false);
  }
  deactivate() {
    for (const panel of this.panels) {
      panel.removeAttribute("hidden");
    }
    for (const tab of this.tabs) {
      tab.setAttribute("aria-selected", "false");
    }
    this.tabList.toggleAttribute("hidden", true);
  }
};

// resources/js/components/tag-manager.js
var TagManager = class extends Component {
  setup() {
    this.addRemoveComponentEl = this.$refs.addRemove;
    this.container = this.$el;
    this.rowSelector = this.$opts.rowSelector;
    this.setupListeners();
  }
  setupListeners() {
    this.container.addEventListener("input", (event) => {
      const addRemoveComponent = window.$components.firstOnElement(this.addRemoveComponentEl, "add-remove-rows");
      if (!this.hasEmptyRows() && event.target.value) {
        addRemoveComponent.add();
      }
    });
  }
  hasEmptyRows() {
    const rows = this.container.querySelectorAll(this.rowSelector);
    const firstEmpty = [...rows].find((row) => [...row.querySelectorAll("input")].filter((input) => input.value).length === 0);
    return firstEmpty !== void 0;
  }
};

// resources/js/components/template-manager.js
var TemplateManager = class extends Component {
  setup() {
    this.container = this.$el;
    this.list = this.$refs.list;
    this.searchInput = this.$refs.searchInput;
    this.searchButton = this.$refs.searchButton;
    this.searchCancel = this.$refs.searchCancel;
    this.setupListeners();
  }
  setupListeners() {
    onChildEvent(this.container, "[template-action]", "click", this.handleTemplateActionClick.bind(this));
    onChildEvent(this.container, ".pagination a", "click", this.handlePaginationClick.bind(this));
    onChildEvent(this.container, ".template-item-content", "click", this.handleTemplateItemClick.bind(this));
    onChildEvent(this.container, ".template-item", "dragstart", this.handleTemplateItemDragStart.bind(this));
    this.searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.performSearch();
      }
    });
    this.searchButton.addEventListener("click", () => this.performSearch());
    this.searchCancel.addEventListener("click", () => {
      this.searchInput.value = "";
      this.performSearch();
    });
  }
  handleTemplateItemClick(event, templateItem) {
    const templateId = templateItem.closest("[template-id]").getAttribute("template-id");
    this.insertTemplate(templateId, "replace");
  }
  handleTemplateItemDragStart(event, templateItem) {
    const templateId = templateItem.closest("[template-id]").getAttribute("template-id");
    event.dataTransfer.setData("bookstack/template", templateId);
    event.dataTransfer.setData("text/plain", templateId);
  }
  handleTemplateActionClick(event, actionButton) {
    event.stopPropagation();
    const action = actionButton.getAttribute("template-action");
    const templateId = actionButton.closest("[template-id]").getAttribute("template-id");
    this.insertTemplate(templateId, action);
  }
  async insertTemplate(templateId, action = "replace") {
    const resp = await window.$http.get(`/templates/${templateId}`);
    const eventName = `editor::${action}`;
    window.$events.emit(eventName, resp.data);
  }
  async handlePaginationClick(event, paginationLink) {
    event.preventDefault();
    const paginationUrl = paginationLink.getAttribute("href");
    const resp = await window.$http.get(paginationUrl);
    this.list.innerHTML = resp.data;
  }
  async performSearch() {
    const searchTerm = this.searchInput.value;
    const resp = await window.$http.get("/templates", {
      search: searchTerm
    });
    this.searchCancel.style.display = searchTerm ? "block" : "none";
    this.list.innerHTML = resp.data;
  }
};

// resources/js/components/toggle-switch.js
var ToggleSwitch = class extends Component {
  setup() {
    this.input = this.$el.querySelector("input[type=hidden]");
    this.checkbox = this.$el.querySelector("input[type=checkbox]");
    this.checkbox.addEventListener("change", this.stateChange.bind(this));
  }
  stateChange() {
    this.input.value = this.checkbox.checked ? "true" : "false";
    const changeEvent = new Event("change");
    this.input.dispatchEvent(changeEvent);
  }
};

// resources/js/components/tri-layout.js
var TriLayout = class extends Component {
  setup() {
    this.container = this.$refs.container;
    this.tabs = this.$manyRefs.tab;
    this.lastLayoutType = "none";
    this.onDestroy = null;
    this.scrollCache = {
      content: 0,
      info: 0
    };
    this.lastTabShown = "content";
    this.mobileTabClick = this.mobileTabClick.bind(this);
    this.updateLayout();
    window.addEventListener("resize", () => {
      this.updateLayout();
    }, { passive: true });
  }
  updateLayout() {
    let newLayout = "tablet";
    if (window.innerWidth <= 1e3) newLayout = "mobile";
    if (window.innerWidth >= 1400) newLayout = "desktop";
    if (newLayout === this.lastLayoutType) return;
    if (this.onDestroy) {
      this.onDestroy();
      this.onDestroy = null;
    }
    if (newLayout === "desktop") {
      this.setupDesktop();
    } else if (newLayout === "mobile") {
      this.setupMobile();
    }
    this.lastLayoutType = newLayout;
  }
  setupMobile() {
    for (const tab of this.tabs) {
      tab.addEventListener("click", this.mobileTabClick);
    }
    this.onDestroy = () => {
      for (const tab of this.tabs) {
        tab.removeEventListener("click", this.mobileTabClick);
      }
    };
  }
  setupDesktop() {
  }
  /**
   * Action to run when the mobile info toggle bar is clicked/tapped
   * @param event
   */
  mobileTabClick(event) {
    const { tab } = event.target.dataset;
    this.showTab(tab);
  }
  /**
   * Show the content tab.
   * Used by the page-display component.
   */
  showContent() {
    this.showTab("content", false);
  }
  /**
   * Show the given tab
   * @param {String} tabName
   * @param {Boolean }scroll
   */
  showTab(tabName, scroll = true) {
    this.scrollCache[this.lastTabShown] = document.documentElement.scrollTop;
    for (const tab of this.tabs) {
      const isActive = tab.dataset.tab === tabName;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    }
    const showInfo = tabName === "info";
    this.container.classList.toggle("show-info", showInfo);
    if (scroll) {
      const pageHeader = document.querySelector("header");
      const defaultScrollTop = pageHeader.getBoundingClientRect().bottom;
      document.documentElement.scrollTop = this.scrollCache[tabName] || defaultScrollTop;
      setTimeout(() => {
        document.documentElement.scrollTop = this.scrollCache[tabName] || defaultScrollTop;
      }, 50);
    }
    this.lastTabShown = tabName;
  }
};

// resources/js/components/user-select.js
var UserSelect = class extends Component {
  setup() {
    this.container = this.$el;
    this.input = this.$refs.input;
    this.userInfoContainer = this.$refs.userInfo;
    onChildEvent(this.container, "a.dropdown-search-item", "click", this.selectUser.bind(this));
  }
  selectUser(event, userEl) {
    event.preventDefault();
    this.input.value = userEl.getAttribute("data-id");
    this.userInfoContainer.innerHTML = userEl.innerHTML;
    this.input.dispatchEvent(new Event("change", { bubbles: true }));
    this.hide();
  }
  hide() {
    const dropdown = window.$components.firstOnElement(this.container, "dropdown");
    dropdown.hide();
  }
};

// resources/js/components/webhook-events.js
var WebhookEvents = class extends Component {
  setup() {
    this.checkboxes = this.$el.querySelectorAll('input[type="checkbox"]');
    this.allCheckbox = this.$el.querySelector('input[type="checkbox"][value="all"]');
    this.$el.addEventListener("change", (event) => {
      if (event.target.checked && event.target === this.allCheckbox) {
        this.deselectIndividualEvents();
      } else if (event.target.checked) {
        this.allCheckbox.checked = false;
      }
    });
  }
  deselectIndividualEvents() {
    for (const checkbox of this.checkboxes) {
      if (checkbox !== this.allCheckbox) {
        checkbox.checked = false;
      }
    }
  }
};

// resources/js/wysiwyg/shortcuts.js
function register2(editor) {
  for (let i = 1; i < 5; i++) {
    editor.shortcuts.add(`meta+${i}`, "", ["FormatBlock", false, `h${i + 1}`]);
  }
  editor.shortcuts.add("meta+5", "", ["FormatBlock", false, "p"]);
  editor.shortcuts.add("meta+d", "", ["FormatBlock", false, "p"]);
  editor.shortcuts.add("meta+6", "", ["FormatBlock", false, "blockquote"]);
  editor.shortcuts.add("meta+q", "", ["FormatBlock", false, "blockquote"]);
  editor.shortcuts.add("meta+7", "", ["codeeditor", false, "pre"]);
  editor.shortcuts.add("meta+e", "", ["codeeditor", false, "pre"]);
  editor.shortcuts.add("meta+8", "", ["FormatBlock", false, "code"]);
  editor.shortcuts.add("meta+shift+E", "", ["FormatBlock", false, "code"]);
  editor.shortcuts.add("meta+o", "", "InsertOrderedList");
  editor.shortcuts.add("meta+p", "", "InsertUnorderedList");
  editor.shortcuts.add("meta+S", "", () => {
    window.$events.emit("editor-save-draft");
  });
  editor.shortcuts.add("meta+13", "", () => {
    window.$events.emit("editor-save-page");
  });
  editor.shortcuts.add("meta+9", "", () => {
    const selectedNode = editor.selection.getNode();
    const callout = selectedNode ? selectedNode.closest(".callout") : null;
    const formats2 = ["info", "success", "warning", "danger"];
    const currentFormatIndex = formats2.findIndex((format2) => {
      return callout && callout.classList.contains(format2);
    });
    const newFormatIndex = (currentFormatIndex + 1) % formats2.length;
    const newFormat = formats2[newFormatIndex];
    editor.formatter.apply(`callout${newFormat}`);
  });
  editor.shortcuts.add("meta+shift+K", "", () => {
    const selectorPopup = window.$components.first("entity-selector-popup");
    const selectionText = editor.selection.getContent({ format: "text" }).trim();
    selectorPopup.show((entity2) => {
      if (editor.selection.isCollapsed()) {
        editor.insertContent(editor.dom.createHTML("a", { href: entity2.link }, editor.dom.encode(entity2.name)));
      } else {
        editor.formatter.apply("link", { href: entity2.link });
      }
      editor.selection.collapse(false);
      editor.focus();
    }, {
      initialValue: selectionText,
      searchEndpoint: "/search/entity-selector",
      entityTypes: "page,book,chapter,bookshelf",
      entityPermission: "view"
    });
  });
}

// resources/js/wysiwyg/common-events.js
function listen3(editor) {
  window.$events.listen("editor::replace", ({ html }) => {
    editor.setContent(html);
  });
  window.$events.listen("editor::append", ({ html }) => {
    const content = editor.getContent() + html;
    editor.setContent(content);
  });
  window.$events.listen("editor::prepend", ({ html }) => {
    const content = html + editor.getContent();
    editor.setContent(content);
  });
  window.$events.listen("editor::insert", ({ html }) => {
    editor.insertContent(html);
  });
  window.$events.listen("editor::focus", () => {
    if (editor.initialized) {
      editor.focus();
    }
  });
}

// resources/js/wysiwyg/scrolling.js
function scrollToText(editor, scrollId) {
  const element = editor.dom.get(encodeURIComponent(scrollId).replace(/!/g, "%21"));
  if (!element) {
    return;
  }
  element.scrollIntoView();
  editor.selection.select(element, true);
  editor.selection.collapse(false);
  editor.focus();
}
function scrollToQueryString(editor) {
  const queryParams = new URL(window.location).searchParams;
  const scrollId = queryParams.get("content-id");
  if (scrollId) {
    scrollToText(editor, scrollId);
  }
}

// resources/js/wysiwyg/drop-paste-handling.js
var wrap;
var draggedContentEditable;
function hasTextContent(node) {
  return node && !!(node.textContent || node.innerText);
}
async function uploadImageFile(file, pageId) {
  if (file === null || file.type.indexOf("image") !== 0) {
    throw new Error("Not an image file");
  }
  const remoteFilename = file.name || `image-${Date.now()}.png`;
  const formData = new FormData();
  formData.append("file", file, remoteFilename);
  formData.append("uploaded_to", pageId);
  const resp = await window.$http.post(window.baseUrl("/images/gallery"), formData);
  return resp.data;
}
function paste(editor, options2, event) {
  const clipboard = new Clipboard(event.clipboardData || event.dataTransfer);
  if (!clipboard.hasItems() || clipboard.containsTabularData()) {
    return;
  }
  const images = clipboard.getImages();
  for (const imageFile of images) {
    const id = `image-${Math.random().toString(16).slice(2)}`;
    const loadingImage = window.baseUrl("/loading.gif");
    event.preventDefault();
    setTimeout(() => {
      editor.insertContent(`<p><img src="${loadingImage}" id="${id}"></p>`);
      uploadImageFile(imageFile, options2.pageId).then((resp) => {
        const safeName = resp.name.replace(/"/g, "");
        const newImageHtml = `<img src="${resp.thumbs.display}" alt="${safeName}" />`;
        const newEl = editor.dom.create("a", {
          target: "_blank",
          href: resp.url
        }, newImageHtml);
        editor.dom.replace(newEl, id);
      }).catch((err) => {
        editor.dom.remove(id);
        window.$events.error(err?.data?.message || options2.translations.imageUploadErrorText);
        console.error(err);
      });
    }, 10);
  }
}
function dragStart2(editor) {
  const node = editor.selection.getNode();
  if (node.nodeName === "IMG") {
    wrap = editor.dom.getParent(node, ".mceTemp");
    if (!wrap && node.parentNode.nodeName === "A" && !hasTextContent(node.parentNode)) {
      wrap = node.parentNode;
    }
  }
  if (node.hasAttribute("contenteditable") && node.getAttribute("contenteditable") === "false") {
    draggedContentEditable = node;
  }
}
function drop3(editor, options2, event) {
  const { dom } = editor;
  const rng = window.tinymce.dom.RangeUtils.getCaretRangeFromPoint(
    event.clientX,
    event.clientY,
    editor.getDoc()
  );
  const templateId = event.dataTransfer && event.dataTransfer.getData("bookstack/template");
  if (templateId) {
    event.preventDefault();
    window.$http.get(`/templates/${templateId}`).then((resp) => {
      editor.selection.setRng(rng);
      editor.undoManager.transact(() => {
        editor.execCommand("mceInsertContent", false, resp.data.html);
      });
    });
  }
  if (dom.getParent(rng.startContainer, ".mceTemp")) {
    event.preventDefault();
  } else if (wrap) {
    event.preventDefault();
    editor.undoManager.transact(() => {
      editor.selection.setRng(rng);
      editor.selection.setNode(wrap);
      dom.remove(wrap);
    });
  }
  if (!event.isDefaultPrevented() && draggedContentEditable) {
    event.preventDefault();
    editor.undoManager.transact(() => {
      const selectedNode = editor.selection.getNode();
      const range = editor.selection.getRng();
      const selectedNodeRoot = selectedNode.closest("body > *");
      if (range.startOffset > range.startContainer.length / 2) {
        selectedNodeRoot.after(draggedContentEditable);
      } else {
        selectedNodeRoot.before(draggedContentEditable);
      }
    });
  }
  if (!event.isDefaultPrevented()) {
    paste(editor, options2, event);
  }
  wrap = null;
}
function listenForDragAndPaste(editor, options2) {
  editor.on("dragstart", () => dragStart2(editor));
  editor.on("drop", (event) => drop3(editor, options2, event));
  editor.on("paste", (event) => paste(editor, options2, event));
}

// resources/js/wysiwyg/toolbars.js
function getPrimaryToolbar(options2) {
  const textDirPlugins = options2.textDirection === "rtl" ? "ltr rtl" : "";
  const toolbar = [
    "undo redo",
    "styles",
    "bold italic underline forecolor backcolor formatoverflow",
    "alignleft aligncenter alignright alignjustify",
    "bullist numlist listoverflow",
    textDirPlugins,
    "link table imagemanager-insert insertoverflow",
    "code about fullscreen"
  ];
  return toolbar.filter((row) => Boolean(row)).join(" | ");
}
function registerPrimaryToolbarGroups(editor) {
  editor.ui.registry.addGroupToolbarButton("formatoverflow", {
    icon: "more-drawer",
    tooltip: "More",
    items: "strikethrough superscript subscript inlinecode removeformat"
  });
  editor.ui.registry.addGroupToolbarButton("listoverflow", {
    icon: "more-drawer",
    tooltip: "More",
    items: "tasklist outdent indent"
  });
  editor.ui.registry.addGroupToolbarButton("insertoverflow", {
    icon: "more-drawer",
    tooltip: "More",
    items: "customhr codeeditor drawio media details"
  });
}
function registerLinkContextToolbar(editor) {
  editor.ui.registry.addContextToolbar("linkcontexttoolbar", {
    predicate(node) {
      return node.closest("a") !== null;
    },
    position: "node",
    scope: "node",
    items: "link unlink openlink"
  });
}
function registerImageContextToolbar(editor) {
  editor.ui.registry.addContextToolbar("imagecontexttoolbar", {
    predicate(node) {
      return node.closest("img") !== null;
    },
    position: "node",
    scope: "node",
    items: "image"
  });
}
function registerAdditionalToolbars(editor) {
  registerPrimaryToolbarGroups(editor);
  registerLinkContextToolbar(editor);
  registerImageContextToolbar(editor);
}

// resources/js/wysiwyg/icons.js
var icons = {
  "table-delete-column": '<svg width="24" height="24"><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2zm-2 0V5h-4v2.2h-2V5h-2v2.2H9V5H5v14h4v-2.1h2V19h2v-2.1h2V19Z"/><path d="M14.829 10.585 13.415 12l1.414 1.414c.943.943-.472 2.357-1.414 1.414L12 13.414l-1.414 1.414c-.944.944-2.358-.47-1.414-1.414L10.586 12l-1.414-1.415c-.943-.942.471-2.357 1.414-1.414L12 10.585l1.344-1.343c1.111-1.112 2.2.627 1.485 1.343z" style="fill-rule:nonzero"/></svg>',
  "table-delete-row": '<svg width="24" height="24"><path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14c0 1.1-.9 2-2 2zm0-2h14v-4h-2.2v-2H19v-2h-2.2V9H19V5H5v4h2.1v2H5v2h2.1v2H5Z"/><path d="M13.415 14.829 12 13.415l-1.414 1.414c-.943.943-2.357-.472-1.414-1.414L10.586 12l-1.414-1.414c-.944-.944.47-2.358 1.414-1.414L12 10.586l1.415-1.414c.942-.943 2.357.471 1.414 1.414L13.415 12l1.343 1.344c1.112 1.111-.627 2.2-1.343 1.485z" style="fill-rule:nonzero"/></svg>',
  "table-insert-column-after": '<svg width="24" height="24"><path d="M16 5h-5v14h5c1.235 0 1.234 2 0 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11c1.229 0 1.236 2 0 2zm-7 6V5H5v6zm0 8v-6H5v6zm11.076-6h-2v2c0 1.333-2 1.333-2 0v-2h-2c-1.335 0-1.335-2 0-2h2V9c0-1.333 2-1.333 2 0v2h1.9c1.572 0 1.113 2 .1 2z"/></svg>',
  "table-insert-column-before": '<svg width="24" height="24"><path d="M8 19h5V5H8C6.764 5 6.766 3 8 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8c-1.229 0-1.236-2 0-2zm7-6v6h4v-6zm0-8v6h4V5ZM3.924 11h2V9c0-1.333 2-1.333 2 0v2h2c1.335 0 1.335 2 0 2h-2v2c0 1.333-2 1.333-2 0v-2h-1.9c-1.572 0-1.113-2-.1-2z"/></svg>',
  "table-insert-row-above": '<svg width="24" height="24"><path d="M5 8v5h14V8c0-1.235 2-1.234 2 0v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8C3 6.77 5 6.764 5 8zm6 7H5v4h6zm8 0h-6v4h6zM13 3.924v2h2c1.333 0 1.333 2 0 2h-2v2c0 1.335-2 1.335-2 0v-2H9c-1.333 0-1.333-2 0-2h2v-1.9c0-1.572 2-1.113 2-.1z"/></svg>',
  "table-insert-row-after": '<svg width="24" height="24"><path d="M19 16v-5H5v5c0 1.235-2 1.234-2 0V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11c0 1.229-2 1.236-2 0zm-6-7h6V5h-6zM5 9h6V5H5Zm6 11.076v-2H9c-1.333 0-1.333-2 0-2h2v-2c0-1.335 2-1.335 2 0v2h2c1.333 0 1.333 2 0 2h-2v1.9c0 1.572-2 1.113-2 .1z"/></svg>',
  table: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2ZM5 14v5h6v-5zm14 0h-6v5h6zm0-7h-6v5h6zM5 12h6V7H5Z"/></svg>',
  "table-delete-table": '<svg width="24" height="24"><path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14c0 1.1-.9 2-2 2zm0-2h14V5H5v14z"/><path d="m13.711 15.423-1.71-1.712-1.712 1.712c-1.14 1.14-2.852-.57-1.71-1.712l1.71-1.71-1.71-1.712c-1.143-1.142.568-2.853 1.71-1.71L12 10.288l1.711-1.71c1.141-1.142 2.852.57 1.712 1.71L13.71 12l1.626 1.626c1.345 1.345-.76 2.663-1.626 1.797z" style="fill-rule:nonzero;stroke-width:1.20992"/></svg>'
};
function registerCustomIcons(editor) {
  for (const [name, svg] of Object.entries(icons)) {
    editor.ui.registry.addIcon(name, svg);
  }
}

// resources/js/wysiwyg/filters.js
function setupBrFilter(editor) {
  editor.serializer.addNodeFilter("br", (nodes) => {
    for (const node of nodes) {
      if (node.parent && node.parent.name === "code") {
        const newline2 = window.tinymce.html.Node.create("#text");
        newline2.value = "\n";
        node.replace(newline2);
      }
    }
  });
}
function setupPointerFilter(editor) {
  editor.parser.addNodeFilter("div", (nodes) => {
    for (const node of nodes) {
      const id = node.attr("id") || "";
      const nodeClass = node.attr("class") || "";
      if (id === "pointer" || nodeClass.includes("pointer")) {
        node.remove();
      }
    }
  });
}
function setupFilters(editor) {
  setupBrFilter(editor);
  setupPointerFilter(editor);
}

// resources/js/wysiwyg/plugin-codeeditor.js
function elemIsCodeBlock(elem2) {
  return elem2.tagName.toLowerCase() === "code-block";
}
function showPopup(editor, code2, language, callback) {
  const codeEditor = window.$components.first("code-editor");
  const bookMark = editor.selection.getBookmark();
  codeEditor.open(code2, language, (newCode, newLang) => {
    callback(newCode, newLang);
    editor.focus();
    editor.selection.moveToBookmark(bookMark);
  }, () => {
    editor.focus();
    editor.selection.moveToBookmark(bookMark);
  });
}
function showPopupForCodeBlock(editor, codeBlock) {
  showPopup(editor, codeBlock.getContent(), codeBlock.getLanguage(), (newCode, newLang) => {
    codeBlock.setContent(newCode, newLang);
  });
}
function defineCodeBlockCustomElement(editor) {
  const doc = editor.getDoc();
  const win = doc.defaultView;
  class CodeBlockElement extends win.HTMLElement {
    constructor() {
      super();
      /**
       * @type {?SimpleEditorInterface}
       */
      __publicField(this, "editor", null);
      this.attachShadow({ mode: "open" });
      const stylesToCopy = document.head.querySelectorAll('link[rel="stylesheet"]:not([media="print"]),style');
      const copiedStyles = Array.from(stylesToCopy).map((styleEl) => styleEl.cloneNode(true));
      const cmContainer = document.createElement("div");
      cmContainer.style.pointerEvents = "none";
      cmContainer.contentEditable = "false";
      cmContainer.classList.add("CodeMirrorContainer");
      cmContainer.classList.toggle("dark-mode", document.documentElement.classList.contains("dark-mode"));
      this.shadowRoot.append(...copiedStyles, cmContainer);
    }
    getLanguage() {
      const getLanguageFromClassList = (classes) => {
        const langClasses = classes.split(" ").filter((cssClass) => cssClass.startsWith("language-"));
        return (langClasses[0] || "").replace("language-", "");
      };
      const code2 = this.querySelector("code");
      const pre = this.querySelector("pre");
      return getLanguageFromClassList(pre.className) || code2 && getLanguageFromClassList(code2.className) || "";
    }
    setContent(content, language) {
      if (this.editor) {
        this.editor.setContent(content);
        this.editor.setMode(language, content);
      }
      let pre = this.querySelector("pre");
      if (!pre) {
        pre = doc.createElement("pre");
        this.append(pre);
      }
      pre.innerHTML = "";
      const code2 = doc.createElement("code");
      pre.append(code2);
      code2.innerText = content;
      code2.className = `language-${language}`;
    }
    getContent() {
      const code2 = this.querySelector("code") || this.querySelector("pre");
      const tempEl = document.createElement("pre");
      tempEl.innerHTML = code2.innerHTML.replace(/\ufeff/g, "");
      const brs = tempEl.querySelectorAll("br");
      for (const br of brs) {
        br.replaceWith("\n");
      }
      return tempEl.textContent;
    }
    connectedCallback() {
      const connectedTime = Date.now();
      if (this.editor) {
        return;
      }
      this.cleanChildContent();
      const content = this.getContent();
      const lines = content.split("\n").length;
      const height = lines * 19.2 + 18 + 24;
      this.style.height = `${height}px`;
      const container = this.shadowRoot.querySelector(".CodeMirrorContainer");
      const renderEditor = (Code) => {
        this.editor = Code.wysiwygView(container, this.shadowRoot, content, this.getLanguage());
        setTimeout(() => {
          this.style.height = null;
        }, 12);
      };
      window.importVersioned("code").then((Code) => {
        const timeout = Date.now() - connectedTime < 20 ? 20 : 0;
        setTimeout(() => renderEditor(Code), timeout);
      });
    }
    cleanChildContent() {
      const pre = this.querySelector("pre");
      if (!pre) return;
      for (const preChild of pre.childNodes) {
        if (preChild.nodeName === "#text" && preChild.textContent === "\uFEFF") {
          preChild.remove();
        }
      }
    }
  }
  win.customElements.define("code-block", CodeBlockElement);
}
function register3(editor) {
  editor.ui.registry.addIcon("codeblock", '<svg width="24" height="24"><path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm1 2v14h14V5Z"/><path d="M11.103 15.423c.277.277.277.738 0 .922a.692.692 0 0 1-1.106 0l-4.057-3.78a.738.738 0 0 1 0-1.107l4.057-3.872c.276-.277.83-.277 1.106 0a.724.724 0 0 1 0 1.014L7.6 12.012ZM12.897 8.577c-.245-.312-.2-.675.08-.955.28-.281.727-.27 1.027.033l4.057 3.78a.738.738 0 0 1 0 1.107l-4.057 3.872c-.277.277-.83.277-1.107 0a.724.724 0 0 1 0-1.014l3.504-3.412z"/></svg>');
  editor.ui.registry.addButton("codeeditor", {
    tooltip: "Insert code block",
    icon: "codeblock",
    onAction() {
      editor.execCommand("codeeditor");
    }
  });
  editor.ui.registry.addButton("editcodeeditor", {
    tooltip: "Edit code block",
    icon: "edit-block",
    onAction() {
      editor.execCommand("codeeditor");
    }
  });
  editor.addCommand("codeeditor", () => {
    const selectedNode = editor.selection.getNode();
    const doc = selectedNode.ownerDocument;
    if (elemIsCodeBlock(selectedNode)) {
      showPopupForCodeBlock(editor, selectedNode);
    } else {
      const textContent = editor.selection.getContent({ format: "text" });
      showPopup(editor, textContent, "", (newCode, newLang) => {
        const pre = doc.createElement("pre");
        const code2 = doc.createElement("code");
        code2.classList.add(`language-${newLang}`);
        code2.innerText = newCode;
        pre.append(code2);
        editor.insertContent(pre.outerHTML);
      });
    }
  });
  editor.on("dblclick", () => {
    const selectedNode = editor.selection.getNode();
    if (elemIsCodeBlock(selectedNode)) {
      showPopupForCodeBlock(editor, selectedNode);
    }
  });
  editor.on("PreInit", () => {
    editor.parser.addNodeFilter("pre", (elms) => {
      for (const el of elms) {
        const wrapper = window.tinymce.html.Node.create("code-block", {
          contenteditable: "false"
        });
        const spans = el.getAll("span");
        for (const span of spans) {
          span.unwrap();
        }
        el.attr("style", null);
        el.wrap(wrapper);
      }
    });
    editor.parser.addNodeFilter("code-block", (elms) => {
      for (const el of elms) {
        el.attr("contenteditable", "false");
      }
    });
    editor.serializer.addNodeFilter("code-block", (elms) => {
      for (const el of elms) {
        el.unwrap();
      }
    });
  });
  editor.ui.registry.addContextToolbar("codeeditor", {
    predicate(node) {
      return node.nodeName.toLowerCase() === "code-block";
    },
    items: "editcodeeditor",
    position: "node",
    scope: "node"
  });
  editor.on("PreInit", () => {
    defineCodeBlockCustomElement(editor);
  });
}
function getPlugin() {
  return register3;
}

// resources/js/wysiwyg/plugin-drawio.js
var pageEditor = null;
var currentNode = null;
var options = {};
function isDrawing(node) {
  return node.hasAttribute("drawio-diagram");
}
function showDrawingManager(mceEditor, selectedNode = null) {
  pageEditor = mceEditor;
  currentNode = selectedNode;
  const imageManager = window.$components.first("image-manager");
  imageManager.show((image2) => {
    if (selectedNode) {
      const imgElem = selectedNode.querySelector("img");
      pageEditor.undoManager.transact(() => {
        pageEditor.dom.setAttrib(imgElem, "src", image2.url);
        pageEditor.dom.setAttrib(selectedNode, "drawio-diagram", image2.id);
      });
    } else {
      const imgHTML = `<div drawio-diagram="${image2.id}" contenteditable="false"><img src="${image2.url}"></div>`;
      pageEditor.insertContent(imgHTML);
    }
  }, "drawio");
}
async function updateContent(pngData) {
  const loadingImage = window.baseUrl("/loading.gif");
  const handleUploadError = (error3) => {
    if (error3.status === 413) {
      window.$events.emit("error", options.translations.serverUploadLimitText);
    } else {
      window.$events.emit("error", options.translations.imageUploadErrorText);
    }
    console.error(error3);
  };
  if (currentNode) {
    close();
    const imgElem = currentNode.querySelector("img");
    try {
      const img = await upload(pngData, options.pageId);
      pageEditor.undoManager.transact(() => {
        pageEditor.dom.setAttrib(imgElem, "src", img.url);
        pageEditor.dom.setAttrib(currentNode, "drawio-diagram", img.id);
      });
    } catch (err) {
      handleUploadError(err);
      throw new Error(`Failed to save image with error: ${err}`);
    }
    return;
  }
  await wait(5);
  const id = `drawing-${Math.random().toString(16).slice(2)}`;
  const wrapId = `drawing-wrap-${Math.random().toString(16).slice(2)}`;
  pageEditor.insertContent(`<div drawio-diagram contenteditable="false" id="${wrapId}"><img src="${loadingImage}" id="${id}"></div>`);
  close();
  try {
    const img = await upload(pngData, options.pageId);
    pageEditor.undoManager.transact(() => {
      pageEditor.dom.setAttrib(id, "src", img.url);
      pageEditor.dom.setAttrib(wrapId, "drawio-diagram", img.id);
    });
  } catch (err) {
    pageEditor.dom.remove(wrapId);
    handleUploadError(err);
    throw new Error(`Failed to save image with error: ${err}`);
  }
}
function drawingInit() {
  if (!currentNode) {
    return Promise.resolve("");
  }
  const drawingId = currentNode.getAttribute("drawio-diagram");
  return load(drawingId);
}
function showDrawingEditor(mceEditor, selectedNode = null) {
  pageEditor = mceEditor;
  currentNode = selectedNode;
  show(options.drawioUrl, drawingInit, updateContent);
}
function register4(editor) {
  editor.addCommand("drawio", () => {
    const selectedNode = editor.selection.getNode();
    showDrawingEditor(editor, isDrawing(selectedNode) ? selectedNode : null);
  });
  editor.ui.registry.addIcon("diagram", `<svg width="24" height="24" fill="${options.darkMode ? "#BBB" : "#000000"}" xmlns="http://www.w3.org/2000/svg"><path d="M20.716 7.639V2.845h-4.794v1.598h-7.99V2.845H3.138v4.794h1.598v7.99H3.138v4.794h4.794v-1.598h7.99v1.598h4.794v-4.794h-1.598v-7.99zM4.736 4.443h1.598V6.04H4.736zm1.598 14.382H4.736v-1.598h1.598zm9.588-1.598h-7.99v-1.598H6.334v-7.99h1.598V6.04h7.99v1.598h1.598v7.99h-1.598zm3.196 1.598H17.52v-1.598h1.598zM17.52 6.04V4.443h1.598V6.04zm-4.21 7.19h-2.79l-.582 1.599H8.643l2.717-7.191h1.119l2.724 7.19h-1.302zm-2.43-1.006h2.086l-1.039-3.06z"/></svg>`);
  editor.ui.registry.addSplitButton("drawio", {
    tooltip: "Insert/edit drawing",
    icon: "diagram",
    onAction() {
      editor.execCommand("drawio");
      window.document.body.dispatchEvent(new Event("mousedown", { bubbles: true }));
    },
    fetch(callback) {
      callback([
        {
          type: "choiceitem",
          text: "Drawing manager",
          value: "drawing-manager"
        }
      ]);
    },
    onItemAction(api, value) {
      if (value === "drawing-manager") {
        const selectedNode = editor.selection.getNode();
        showDrawingManager(editor, isDrawing(selectedNode) ? selectedNode : null);
      }
    }
  });
  editor.on("dblclick", () => {
    const selectedNode = editor.selection.getNode();
    if (!isDrawing(selectedNode)) return;
    showDrawingEditor(editor, selectedNode);
  });
  editor.on("SetContent", () => {
    const drawings = editor.dom.select("body > div[drawio-diagram]");
    if (!drawings.length) return;
    editor.undoManager.transact(() => {
      for (const drawing of drawings) {
        drawing.setAttribute("contenteditable", "false");
      }
    });
  });
}
function getPlugin2(providedOptions) {
  options = providedOptions;
  return register4;
}

// resources/js/wysiwyg/plugins-customhr.js
function register5(editor) {
  editor.addCommand("InsertHorizontalRule", () => {
    const hrElem = document.createElement("hr");
    const cNode = editor.selection.getNode();
    const { parentNode: parentNode2 } = cNode;
    parentNode2.insertBefore(hrElem, cNode);
  });
  editor.ui.registry.addButton("customhr", {
    icon: "horizontal-rule",
    tooltip: "Insert horizontal line",
    onAction() {
      editor.execCommand("InsertHorizontalRule");
    }
  });
}
function getPlugin3() {
  return register5;
}

// resources/js/wysiwyg/plugins-imagemanager.js
function register6(editor) {
  editor.ui.registry.addButton("imagemanager-insert", {
    title: "Insert image",
    icon: "image",
    tooltip: "Insert image",
    onAction() {
      const imageManager = window.$components.first("image-manager");
      imageManager.show((image2) => {
        const imageUrl = image2.thumbs?.display || image2.url;
        let html = `<a href="${image2.url}" target="_blank">`;
        html += `<img src="${imageUrl}" alt="${image2.name}">`;
        html += "</a>";
        editor.execCommand("mceInsertContent", false, html);
      }, "gallery");
    }
  });
}
function getPlugin4() {
  return register6;
}

// resources/js/wysiwyg/plugins-about.js
function register7(editor) {
  const aboutDialog = {
    title: "About the WYSIWYG Editor",
    url: window.baseUrl("/help/wysiwyg")
  };
  editor.ui.registry.addButton("about", {
    icon: "help",
    tooltip: "About the editor",
    onAction() {
      window.tinymce.activeEditor.windowManager.openUrl(aboutDialog);
    }
  });
}
function getPlugin5() {
  return register7;
}

// resources/js/wysiwyg/util.js
var blockElementTypes = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "blockquote",
  "pre",
  "code-block",
  "details",
  "ul",
  "ol",
  "table",
  "hr"
];

// resources/js/wysiwyg/plugins-details.js
function getSelectedDetailsBlock(editor) {
  return editor.selection.getNode().closest("details");
}
function setSummary(editor, summaryContent) {
  const details = getSelectedDetailsBlock(editor);
  if (!details) return;
  editor.undoManager.transact(() => {
    let summary = details.querySelector("summary");
    if (!summary) {
      summary = document.createElement("summary");
      details.prepend(summary);
    }
    summary.textContent = summaryContent;
  });
}
function detailsDialog(editor) {
  return {
    title: "Edit collapsible block",
    body: {
      type: "panel",
      items: [
        {
          type: "input",
          name: "summary",
          label: "Toggle label"
        }
      ]
    },
    buttons: [
      {
        type: "cancel",
        text: "Cancel"
      },
      {
        type: "submit",
        text: "Save",
        primary: true
      }
    ],
    onSubmit(api) {
      const { summary } = api.getData();
      setSummary(editor, summary);
      api.close();
    }
  };
}
function getSummaryTextFromDetails(element) {
  const summary = element.querySelector("summary");
  if (!summary) {
    return "";
  }
  return summary.textContent;
}
function showDetailLabelEditWindow(editor) {
  const details = getSelectedDetailsBlock(editor);
  const dialog = editor.windowManager.open(detailsDialog(editor));
  dialog.setData({ summary: getSummaryTextFromDetails(details) });
}
function unwrapDetailsInSelection(editor) {
  const details = editor.selection.getNode().closest("details");
  const selectionBm = editor.selection.getBookmark();
  if (details) {
    const elements = details.querySelectorAll("details > *:not(summary, doc-root), doc-root > *");
    editor.undoManager.transact(() => {
      for (const element of elements) {
        details.parentNode.insertBefore(element, details);
      }
      details.remove();
    });
  }
  editor.focus();
  editor.selection.moveToBookmark(selectionBm);
}
function unwrapDetailsEditable(detailsEl) {
  detailsEl.attr("contenteditable", null);
  let madeUnwrap = false;
  for (const child of detailsEl.children()) {
    if (child.name === "doc-root") {
      child.unwrap();
      madeUnwrap = true;
    }
  }
  if (madeUnwrap) {
    unwrapDetailsEditable(detailsEl);
  }
}
function ensureDetailsWrappedInEditable(detailsEl) {
  unwrapDetailsEditable(detailsEl);
  detailsEl.attr("contenteditable", "false");
  const rootWrap = window.tinymce.html.Node.create("doc-root", { contenteditable: "true" });
  let previousBlockWrap = null;
  for (const child of detailsEl.children()) {
    if (child.name === "summary") continue;
    const isBlock = blockElementTypes.includes(child.name);
    if (!isBlock) {
      if (!previousBlockWrap) {
        previousBlockWrap = window.tinymce.html.Node.create("p");
        rootWrap.append(previousBlockWrap);
      }
      previousBlockWrap.append(child);
    } else {
      rootWrap.append(child);
      previousBlockWrap = null;
    }
  }
  detailsEl.append(rootWrap);
}
function setupElementFilters(editor) {
  editor.parser.addNodeFilter("details", (elms) => {
    for (const el of elms) {
      ensureDetailsWrappedInEditable(el);
    }
  });
  editor.serializer.addNodeFilter("details", (elms) => {
    for (const el of elms) {
      unwrapDetailsEditable(el);
      el.attr("open", null);
    }
  });
  editor.serializer.addNodeFilter("doc-root", (elms) => {
    for (const el of elms) {
      el.unwrap();
    }
  });
}
function register8(editor) {
  editor.ui.registry.addIcon("details", '<svg width="24" height="24"><path d="M8.2 9a.5.5 0 0 0-.4.8l4 5.6a.5.5 0 0 0 .8 0l4-5.6a.5.5 0 0 0-.4-.8ZM20.122 18.151h-16c-.964 0-.934 2.7 0 2.7h16c1.139 0 1.173-2.7 0-2.7zM20.122 3.042h-16c-.964 0-.934 2.7 0 2.7h16c1.139 0 1.173-2.7 0-2.7z"/></svg>');
  editor.ui.registry.addIcon("togglefold", '<svg height="24"  width="24"><path d="M8.12 19.3c.39.39 1.02.39 1.41 0L12 16.83l2.47 2.47c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-3.17-3.17c-.39-.39-1.02-.39-1.41 0l-3.17 3.17c-.4.38-.4 1.02-.01 1.41zm7.76-14.6c-.39-.39-1.02-.39-1.41 0L12 7.17 9.53 4.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.03 0 1.42l3.17 3.17c.39.39 1.02.39 1.41 0l3.17-3.17c.4-.39.4-1.03.01-1.42z"/></svg>');
  editor.ui.registry.addIcon("togglelabel", '<svg height="18" width="18" viewBox="0 0 24 24"><path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M6.5,8C5.67,8,5,7.33,5,6.5S5.67,5,6.5,5S8,5.67,8,6.5 S7.33,8,6.5,8z"/></svg>');
  editor.ui.registry.addButton("details", {
    icon: "details",
    tooltip: "Insert collapsible block",
    onAction() {
      editor.execCommand("InsertDetailsBlock");
    }
  });
  editor.ui.registry.addButton("removedetails", {
    icon: "table-delete-table",
    tooltip: "Unwrap",
    onAction() {
      unwrapDetailsInSelection(editor);
    }
  });
  editor.ui.registry.addButton("editdetials", {
    icon: "togglelabel",
    tooltip: "Edit label",
    onAction() {
      showDetailLabelEditWindow(editor);
    }
  });
  editor.on("dblclick", (event) => {
    if (!getSelectedDetailsBlock(editor) || event.target.closest("doc-root")) return;
    showDetailLabelEditWindow(editor);
  });
  editor.ui.registry.addButton("toggledetails", {
    icon: "togglefold",
    tooltip: "Toggle open/closed",
    onAction() {
      const details = getSelectedDetailsBlock(editor);
      details.toggleAttribute("open");
      editor.focus();
    }
  });
  editor.addCommand("InsertDetailsBlock", () => {
    let content = editor.selection.getContent({ format: "html" });
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const id = `details-${Date.now()}`;
    details.setAttribute("data-id", id);
    details.appendChild(summary);
    if (!content) {
      content = "<p><br></p>";
    }
    details.innerHTML += content;
    editor.insertContent(details.outerHTML);
    editor.focus();
    const domDetails = editor.dom.select(`[data-id="${id}"]`)[0] || null;
    if (domDetails) {
      const firstChild = domDetails.querySelector("doc-root > *");
      if (firstChild) {
        firstChild.focus();
      }
      domDetails.removeAttribute("data-id");
    }
  });
  editor.ui.registry.addContextToolbar("details", {
    predicate(node) {
      return node.nodeName.toLowerCase() === "details";
    },
    items: "editdetials toggledetails removedetails",
    position: "node",
    scope: "node"
  });
  editor.on("PreInit", () => {
    setupElementFilters(editor);
  });
}
function getPlugin6() {
  return register8;
}

// resources/js/wysiwyg/plugins-tasklist.js
function elementWithinTaskList(element) {
  const listEl = element.closest("li");
  return listEl && listEl.parentNode.nodeName === "UL" && listEl.classList.contains("task-list-item");
}
function handleTaskListItemClick(event, clickedEl, editor) {
  const bounds = clickedEl.getBoundingClientRect();
  const withinBounds = event.clientX <= bounds.right && event.clientX >= bounds.left && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!withinBounds) {
    editor.undoManager.transact(() => {
      if (clickedEl.hasAttribute("checked")) {
        clickedEl.removeAttribute("checked");
      } else {
        clickedEl.setAttribute("checked", "checked");
      }
    });
  }
}
function parseTaskListNode(node) {
  node.attr("class", "task-list-item");
  for (const child of node.children()) {
    if (child.name === "input") {
      if (child.attr("checked") === "checked") {
        node.attr("checked", "checked");
      }
      child.remove();
    }
  }
}
function serializeTaskListNode(node) {
  const isChecked = node.attr("checked") === "checked";
  node.attr("checked", null);
  const inputAttrs = { type: "checkbox", disabled: "disabled" };
  if (isChecked) {
    inputAttrs.checked = "checked";
  }
  const checkbox = window.tinymce.html.Node.create("input", inputAttrs);
  checkbox.shortEnded = true;
  if (node.firstChild) {
    node.insert(checkbox, node.firstChild, true);
  } else {
    node.append(checkbox);
  }
}
function register9(editor) {
  editor.ui.registry.addIcon("tasklist", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22,8c0-0.55-0.45-1-1-1h-7c-0.55,0-1,0.45-1,1s0.45,1,1,1h7C21.55,9,22,8.55,22,8z M13,16c0,0.55,0.45,1,1,1h7 c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1h-7C13.45,15,13,15.45,13,16z M10.47,4.63c0.39,0.39,0.39,1.02,0,1.41l-4.23,4.25 c-0.39,0.39-1.02,0.39-1.42,0L2.7,8.16c-0.39-0.39-0.39-1.02,0-1.41c0.39-0.39,1.02-0.39,1.41,0l1.42,1.42l3.54-3.54 C9.45,4.25,10.09,4.25,10.47,4.63z M10.48,12.64c0.39,0.39,0.39,1.02,0,1.41l-4.23,4.25c-0.39,0.39-1.02,0.39-1.42,0L2.7,16.16 c-0.39-0.39-0.39-1.02,0-1.41s1.02-0.39,1.41,0l1.42,1.42l3.54-3.54C9.45,12.25,10.09,12.25,10.48,12.64L10.48,12.64z"/></svg>');
  editor.ui.registry.addToggleButton("tasklist", {
    tooltip: "Task list",
    icon: "tasklist",
    active: false,
    onAction(api) {
      if (api.isActive()) {
        editor.execCommand("RemoveList");
      } else {
        editor.execCommand("InsertUnorderedList", null, {
          "list-item-attributes": {
            class: "task-list-item"
          },
          "list-style-type": "tasklist"
        });
      }
    },
    onSetup(api) {
      editor.on("NodeChange", (event) => {
        const parentListEl = event.parents.find((el) => el.nodeName === "LI");
        const inList = parentListEl && parentListEl.classList.contains("task-list-item");
        api.setActive(Boolean(inList));
      });
    }
  });
  const existingBullListButton = editor.ui.registry.getAll().buttons.bullist;
  existingBullListButton.onSetup = function customBullListOnSetup(api) {
    editor.on("NodeChange", (event) => {
      const parentList = event.parents.find((el) => el.nodeName === "LI");
      const inTaskList = parentList && parentList.classList.contains("task-list-item");
      const inUlList = parentList && parentList.parentNode.nodeName === "UL";
      api.setActive(Boolean(inUlList && !inTaskList));
    });
  };
  existingBullListButton.onAction = function customBullListOnAction() {
    if (elementWithinTaskList(editor.selection.getNode())) {
      editor.execCommand("InsertOrderedList", null, {
        "list-item-attributes": { class: null }
      });
    }
    editor.execCommand("InsertUnorderedList", null, {
      "list-item-attributes": { class: null }
    });
  };
  const existingNumListButton = editor.ui.registry.getAll().buttons.numlist;
  existingNumListButton.onAction = function customNumListButtonOnAction() {
    editor.execCommand("InsertOrderedList", null, {
      "list-item-attributes": { class: null }
    });
  };
  editor.on("PreInit", () => {
    editor.parser.addNodeFilter("li", (nodes) => {
      for (const node of nodes) {
        if (node.attributes.map.class === "task-list-item") {
          parseTaskListNode(node);
        }
      }
    });
    editor.serializer.addNodeFilter("li", (nodes) => {
      for (const node of nodes) {
        if (node.attributes.map.class === "task-list-item") {
          serializeTaskListNode(node);
        }
      }
    });
  });
  editor.on("click", (event) => {
    const clickedEl = event.target;
    if (clickedEl.nodeName === "LI" && clickedEl.classList.contains("task-list-item")) {
      handleTaskListItemClick(event, clickedEl, editor);
      event.preventDefault();
    }
  });
}
function getPlugin7() {
  return register9;
}

// resources/js/wysiwyg/fixes.js
function handleEmbedAlignmentChanges(editor) {
  function updateClassesForPreview(previewElem) {
    const mediaTarget = previewElem.querySelector("iframe, video");
    if (!mediaTarget) {
      return;
    }
    const alignmentClasses = [...mediaTarget.classList.values()].filter((c) => c.startsWith("align-"));
    const previewAlignClasses = [...previewElem.classList.values()].filter((c) => c.startsWith("align-"));
    previewElem.classList.remove(...previewAlignClasses);
    previewElem.classList.add(...alignmentClasses);
  }
  editor.on("SetContent", () => {
    const previewElems = editor.dom.select("span.mce-preview-object");
    for (const previewElem of previewElems) {
      updateClassesForPreview(previewElem);
    }
  });
  editor.on("FormatApply", (event) => {
    const isAlignment = event.format.startsWith("align");
    if (!event.node || !event.node.matches(".mce-preview-object")) {
      return;
    }
    const realTarget = event.node.querySelector("iframe, video");
    if (isAlignment && realTarget) {
      const className = (editor.formatter.get(event.format)[0]?.classes || [])[0];
      const toAdd = !realTarget.classList.contains(className);
      const wrapperClasses = (event.node.getAttribute("data-mce-p-class") || "").split(" ");
      const wrapperClassesFiltered = wrapperClasses.filter((c) => !c.startsWith("align-"));
      if (toAdd) {
        wrapperClassesFiltered.push(className);
      }
      const classesToApply = wrapperClassesFiltered.join(" ");
      event.node.setAttribute("data-mce-p-class", classesToApply);
      realTarget.setAttribute("class", classesToApply);
      editor.formatter.apply(event.format, {}, realTarget);
      updateClassesForPreview(event.node);
    }
  });
}

// resources/js/wysiwyg/config.js
var styleFormats = [
  { title: "Large Header", format: "h2", preview: "color: blue;" },
  { title: "Medium Header", format: "h3" },
  { title: "Small Header", format: "h4" },
  { title: "Tiny Header", format: "h5" },
  {
    title: "Paragraph",
    format: "p",
    exact: true,
    classes: ""
  },
  { title: "Blockquote", format: "blockquote" },
  {
    title: "Callouts",
    items: [
      { title: "Information", format: "calloutinfo" },
      { title: "Success", format: "calloutsuccess" },
      { title: "Warning", format: "calloutwarning" },
      { title: "Danger", format: "calloutdanger" }
    ]
  }
];
var formats = {
  alignleft: { selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe,video,span", classes: "align-left" },
  aligncenter: { selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe,video,span", classes: "align-center" },
  alignright: { selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe,video,span", classes: "align-right" },
  calloutsuccess: { block: "p", exact: true, attributes: { class: "callout success" } },
  calloutinfo: { block: "p", exact: true, attributes: { class: "callout info" } },
  calloutwarning: { block: "p", exact: true, attributes: { class: "callout warning" } },
  calloutdanger: { block: "p", exact: true, attributes: { class: "callout danger" } }
};
var colorMap = [
  "#BFEDD2",
  "",
  "#FBEEB8",
  "",
  "#F8CAC6",
  "",
  "#ECCAFA",
  "",
  "#C2E0F4",
  "",
  "#2DC26B",
  "",
  "#F1C40F",
  "",
  "#E03E2D",
  "",
  "#B96AD9",
  "",
  "#3598DB",
  "",
  "#169179",
  "",
  "#E67E23",
  "",
  "#BA372A",
  "",
  "#843FA1",
  "",
  "#236FA1",
  "",
  "#ECF0F1",
  "",
  "#CED4D9",
  "",
  "#95A5A6",
  "",
  "#7E8C8D",
  "",
  "#34495E",
  "",
  "#000000",
  "",
  "#ffffff",
  ""
];
function filePickerCallback(callback, value, meta) {
  if (meta.filetype === "file") {
    const selector = window.$components.first("entity-selector-popup");
    const selectionText = this.selection.getContent({ format: "text" }).trim();
    selector.show((entity2) => {
      callback(entity2.link, {
        text: entity2.name,
        title: entity2.name
      });
    }, {
      initialValue: selectionText,
      searchEndpoint: "/search/entity-selector",
      entityTypes: "page,book,chapter,bookshelf",
      entityPermission: "view"
    });
  }
  if (meta.filetype === "image") {
    const imageManager = window.$components.first("image-manager");
    imageManager.show((image2) => {
      callback(image2.url, { alt: image2.name });
    }, "gallery");
  }
}
function gatherPlugins(options2) {
  const plugins2 = [
    "image",
    "table",
    "link",
    "autolink",
    "fullscreen",
    "code",
    "customhr",
    "autosave",
    "lists",
    "codeeditor",
    "media",
    "imagemanager",
    "about",
    "details",
    "tasklist",
    options2.textDirection === "rtl" ? "directionality" : ""
  ];
  window.tinymce.PluginManager.add("codeeditor", getPlugin());
  window.tinymce.PluginManager.add("customhr", getPlugin3());
  window.tinymce.PluginManager.add("imagemanager", getPlugin4());
  window.tinymce.PluginManager.add("about", getPlugin5());
  window.tinymce.PluginManager.add("details", getPlugin6());
  window.tinymce.PluginManager.add("tasklist", getPlugin7());
  if (options2.drawioUrl) {
    window.tinymce.PluginManager.add("drawio", getPlugin2(options2));
    plugins2.push("drawio");
  }
  return plugins2.filter((plugin) => Boolean(plugin));
}
function fetchCustomHeadContent() {
  const headContentLines = document.head.innerHTML.split("\n");
  const startLineIndex = headContentLines.findIndex((line) => line.trim() === "<!-- Start: custom user content -->");
  const endLineIndex = headContentLines.findIndex((line) => line.trim() === "<!-- End: custom user content -->");
  if (startLineIndex === -1 || endLineIndex === -1) {
    return "";
  }
  return headContentLines.slice(startLineIndex + 1, endLineIndex).join("\n");
}
function getSetupCallback(options2) {
  return function setupCallback(editor) {
    function editorChange() {
      if (options2.darkMode) {
        editor.contentDocument.documentElement.classList.add("dark-mode");
      }
      window.$events.emit("editor-html-change", "");
    }
    editor.on("ExecCommand change input NodeChange ObjectResized", editorChange);
    listen3(editor);
    listenForDragAndPaste(editor, options2);
    editor.on("init", () => {
      editorChange();
      scrollToQueryString(editor);
      window.editor = editor;
      register2(editor);
    });
    editor.on("PreInit", () => {
      setupFilters(editor);
    });
    handleEmbedAlignmentChanges(editor);
    window.$events.emitPublic(options2.containerElement, "editor-tinymce::setup", { editor });
    editor.ui.registry.addButton("inlinecode", {
      tooltip: "Inline code",
      icon: "sourcecode",
      onAction() {
        editor.execCommand("mceToggleFormat", false, "code");
      }
    });
  };
}
function getContentStyle(options2) {
  return `
html, body, html.dark-mode {
    background: ${options2.darkMode ? "#222" : "#fff"};
} 
body {
    padding-left: 15px !important;
    padding-right: 15px !important; 
    height: initial !important;
    margin:0!important; 
    margin-left: auto! important;
    margin-right: auto !important;
    overflow-y: hidden !important;
}`.trim().replace("\n", "");
}
function buildForEditor(options2) {
  window.tinymce.addI18n(options2.language, options2.translationMap);
  const version2 = document.querySelector('script[src*="/dist/app.js"]').getAttribute("src").split("?version=")[1];
  return {
    width: "100%",
    height: "100%",
    selector: "#html-editor",
    cache_suffix: `?version=${version2}`,
    content_css: [
      window.baseUrl("/dist/styles.css")
    ],
    branding: false,
    skin: options2.darkMode ? "tinymce-5-dark" : "tinymce-5",
    body_class: "page-content",
    browser_spellcheck: true,
    relative_urls: false,
    language: options2.language,
    directionality: options2.textDirection,
    remove_script_host: false,
    document_base_url: window.baseUrl("/"),
    end_container_on_empty_block: true,
    remove_trailing_brs: false,
    statusbar: false,
    menubar: false,
    paste_data_images: false,
    extended_valid_elements: "pre[*],svg[*],div[drawio-diagram],details[*],summary[*],div[*],li[class|checked|style]",
    automatic_uploads: false,
    custom_elements: "doc-root,code-block",
    valid_children: [
      "-div[p|h1|h2|h3|h4|h5|h6|blockquote|code-block]",
      "+div[pre|img]",
      "-doc-root[doc-root|#text]",
      "-li[details]",
      "+code-block[pre]",
      "+doc-root[p|h1|h2|h3|h4|h5|h6|blockquote|code-block|div|hr]"
    ].join(","),
    plugins: gatherPlugins(options2),
    contextmenu: false,
    toolbar: getPrimaryToolbar(options2),
    content_style: getContentStyle(options2),
    style_formats: styleFormats,
    style_formats_merge: false,
    media_alt_source: false,
    media_poster: false,
    formats,
    table_style_by_css: true,
    table_use_colgroups: true,
    file_picker_types: "file image",
    color_map: colorMap,
    file_picker_callback: filePickerCallback,
    paste_preprocess(plugin, args) {
      const { content } = args;
      if (content.indexOf('<img src="file://') !== -1) {
        args.content = "";
      }
    },
    init_instance_callback(editor) {
      const head = editor.getDoc().querySelector("head");
      head.innerHTML += fetchCustomHeadContent();
    },
    setup(editor) {
      registerCustomIcons(editor);
      registerAdditionalToolbars(editor);
      getSetupCallback(options2)(editor);
    }
  };
}
function buildForInput(options2) {
  window.tinymce.addI18n(options2.language, options2.translationMap);
  const version2 = document.querySelector('script[src*="/dist/app.js"]').getAttribute("src").split("?version=")[1];
  return {
    width: "100%",
    height: "185px",
    target: options2.containerElement,
    cache_suffix: `?version=${version2}`,
    content_css: [
      window.baseUrl("/dist/styles.css")
    ],
    branding: false,
    skin: options2.darkMode ? "tinymce-5-dark" : "tinymce-5",
    body_class: "wysiwyg-input",
    browser_spellcheck: true,
    relative_urls: false,
    language: options2.language,
    directionality: options2.textDirection,
    remove_script_host: false,
    document_base_url: window.baseUrl("/"),
    end_container_on_empty_block: true,
    remove_trailing_brs: false,
    statusbar: false,
    menubar: false,
    plugins: "link autolink lists",
    contextmenu: false,
    toolbar: "bold italic link bullist numlist",
    content_style: getContentStyle(options2),
    file_picker_types: "file",
    file_picker_callback: filePickerCallback,
    init_instance_callback(editor) {
      const head = editor.getDoc().querySelector("head");
      head.innerHTML += fetchCustomHeadContent();
      editor.contentDocument.documentElement.classList.toggle("dark-mode", options2.darkMode);
    }
  };
}

// resources/js/components/wysiwyg-editor.js
var WysiwygEditor = class extends Component {
  setup() {
    this.elem = this.$el;
    this.tinyMceConfig = buildForEditor({
      language: this.$opts.language,
      containerElement: this.elem,
      darkMode: document.documentElement.classList.contains("dark-mode"),
      textDirection: this.$opts.textDirection,
      drawioUrl: this.getDrawIoUrl(),
      pageId: Number(this.$opts.pageId),
      translations: {
        imageUploadErrorText: this.$opts.imageUploadErrorText,
        serverUploadLimitText: this.$opts.serverUploadLimitText
      },
      translationMap: window.editor_translations
    });
    window.$events.emitPublic(this.elem, "editor-tinymce::pre-init", { config: this.tinyMceConfig });
    window.tinymce.init(this.tinyMceConfig).then((editors) => {
      this.editor = editors[0];
    });
  }
  getDrawIoUrl() {
    const drawioUrlElem = document.querySelector("[drawio-url]");
    if (drawioUrlElem) {
      return drawioUrlElem.getAttribute("drawio-url");
    }
    return "";
  }
  /**
   * Get the content of this editor.
   * Used by the parent page editor component.
   * @return {{html: String}}
   */
  getContent() {
    return {
      html: this.editor.getContent()
    };
  }
};

// resources/js/components/wysiwyg-input.js
var WysiwygInput = class extends Component {
  setup() {
    this.elem = this.$el;
    const config2 = buildForInput({
      language: this.$opts.language,
      containerElement: this.elem,
      darkMode: document.documentElement.classList.contains("dark-mode"),
      textDirection: this.textDirection,
      translations: {
        imageUploadErrorText: this.$opts.imageUploadErrorText,
        serverUploadLimitText: this.$opts.serverUploadLimitText
      },
      translationMap: window.editor_translations
    });
    window.tinymce.init(config2).then((editors) => {
      this.editor = editors[0];
    });
  }
};

// resources/js/app.js
window.baseUrl = function baseUrl(path) {
  let targetPath = path;
  let basePath = document.querySelector('meta[name="base-url"]').getAttribute("content");
  if (basePath[basePath.length - 1] === "/") basePath = basePath.slice(0, basePath.length - 1);
  if (targetPath[0] === "/") targetPath = targetPath.slice(1);
  return `${basePath}/${targetPath}`;
};
window.importVersioned = function importVersioned(moduleName) {
  const version2 = document.querySelector('link[href*="/dist/styles.css?version="]').href.split("?version=").pop();
  const importPath = window.baseUrl(`dist/${moduleName}.js?version=${version2}`);
  return import(importPath);
};
window.$http = http_exports;
window.$events = events_exports;
var translator = new translations_default();
window.trans = translator.get.bind(translator);
window.trans_choice = translator.getPlural.bind(translator);
window.trans_plural = translator.parsePlural.bind(translator);
register(components_exports2);
window.$components = components_exports;
init();
/*! Bundled license information:

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.6
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
//# sourceMappingURL=app.js.map
