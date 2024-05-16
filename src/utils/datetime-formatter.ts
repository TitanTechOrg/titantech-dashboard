export const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    seconds -= days * (60 * 60 * 24);
    let hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    if (days > 0) {
        hours += days * 24;
    }

    hours = Math.trunc(hours);
    minutes = Math.trunc(minutes);
    seconds = Math.trunc(seconds);

    return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
