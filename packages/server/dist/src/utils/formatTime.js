"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = formatTime;
function formatTime(time) {
    const fix = (time) => time < 10 ? `0${time}` : time;
    return `${fix(time.getHours())}:${fix(time.getMinutes())}:${fix(time.getSeconds())}`;
}
