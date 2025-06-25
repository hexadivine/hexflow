export function isValidIP(ip) {
    const ipRegExp =
        /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    return ipRegExp.test(ip);
}

export function isValidHost(host) {
    if (host.split(".").length === 4 && !isValidIP(host)) {
        return false;
    }

    const hostRegExp = /^([a-z0-9-]+\.)+[a-z0-9-]+$/i;
    return hostRegExp.test(host);
}

export function isValidTarget(target) {
    if (isValidIP(target) || isValidHost(target)) {
        return true;
    }
    return false;
}
