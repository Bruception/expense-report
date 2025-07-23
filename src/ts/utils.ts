export const base64URLEncode = (str: string) => {
    return encodeURIComponent(btoa(str));
};

export const base64URLDecode = (str: string) => {
    return atob(decodeURIComponent(str));
};
