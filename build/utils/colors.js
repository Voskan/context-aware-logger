"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorize = exports.colors = void 0;
exports.colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
};
function colorize(color, message) {
    return `${exports.colors[color]}${message}${exports.colors.reset}`;
}
exports.colorize = colorize;
