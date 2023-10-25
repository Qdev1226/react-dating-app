// import axios from "axios";
// const url = import.meta.env.VITE_BASE_URL;

export const fetchIpApi = async () => {
    setTimeout(() => {
        return { greet: "Hello" }

    }, 2000);
    // await axios.get(`${url}/api/ip/api`)
    //     .then(response => response.data.info)
    //     .catch((error) => {
    //         console.error("Error fetching IP info:", error);
    //     });
};

export const getBrowserName = (userAgent) => {
    if (/opera|opr/i.test(userAgent)) return "Opera";
    if (/chrome|crios/i.test(userAgent)) return "Chrome";
    if (/firefox|fxios/i.test(userAgent)) return "Firefox";
    if (/safari/i.test(userAgent)) return "Safari";
    if (/edge|edg|edgi/i.test(userAgent)) return "Edge";
    if (/ie|trident/i.test(userAgent)) return "Internet Explorer";
    return "Unknown";
};

export const getOSName = (userAgent) => {
    if (/windows|win/i.test(userAgent)) return "Windows";
    if (/iphone/i.test(userAgent)) return "iOS";
    if (/ipad/i.test(userAgent)) return "iOS";
    if (/mac/i.test(userAgent)) return "macOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/linux/i.test(userAgent)) return "Linux";
    return "Unknown";
};