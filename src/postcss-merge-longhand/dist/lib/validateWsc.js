"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isColor = isColor;
exports.isStyle = isStyle;
exports.isValidWsc = isValidWsc;
exports.isWidth = isWidth;

var _cssColorNames = _interopRequireDefault(require("css-color-names"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const widths = ['thin', 'medium', 'thick'];
const styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
const colors = Object.keys(_cssColorNames.default);

function isStyle(value) {
  return value && !!~styles.indexOf(value.toLowerCase());
}

function isWidth(value) {
  return value && !!~widths.indexOf(value.toLowerCase()) || /^(\d+(\.\d+)?|\.\d+)(\w+)?$/.test(value);
}

function isColor(value) {
  if (!value) {
    return false;
  }

  value = value.toLowerCase();

  if (/rgba?\(/.test(value)) {
    return true;
  }

  if (/hsla?\(/.test(value)) {
    return true;
  }

  if (/#([0-9a-z]{6}|[0-9a-z]{3})/.test(value)) {
    return true;
  }

  if (value === 'transparent') {
    return true;
  }

  if (value === 'currentcolor') {
    return true;
  }

  return !!~colors.indexOf(value);
}

function isValidWsc(wscs) {
  const validWidth = isWidth(wscs[0]);
  const validStyle = isStyle(wscs[1]);
  const validColor = isColor(wscs[2]);
  return validWidth && validStyle || validWidth && validColor || validStyle && validColor;
}