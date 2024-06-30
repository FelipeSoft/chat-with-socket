"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = formatTime;
function formatTime(time) {
    const fix = (unit) => unit < 10 ? `0${unit}` : unit;
    return `${fix(time.getHours())}:${fix(time.getMinutes())}:${fix(time.getSeconds())}`;
}
