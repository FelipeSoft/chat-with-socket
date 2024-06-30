export function formatTime(time: Date) {
    const fix = (time: number) => time < 10 ? `0${time}` : time; 
    return `${fix(time.getHours())}:${fix(time.getMinutes())}:${fix(time.getSeconds())}`;
}