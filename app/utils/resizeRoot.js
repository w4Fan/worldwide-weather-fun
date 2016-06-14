export default function () {
    const uAgent = window.navigator.userAgent;
    const isIOS = uAgent.match(/iphone/i);

    let wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth;
    let wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
    let wDpr;
    let wFsize;

    if (window.devicePixelRatio) {
        wDpr = window.devicePixelRatio;
    } else {
        wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
    };

    if (isIOS) {
        wWidth = screen.width;
        wHeight = screen.height;
    };

    if (wWidth > wHeight) {
        wWidth = wHeight;
    };

    wFsize = wWidth > 1080 ? 144 : wWidth / 6.4;
    wFsize = wFsize > 24 ? wFsize : 24;
    
    window.screenWidth_ = wWidth;
    document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
    document.getElementsByTagName('html')[0].dataset.ios = isIOS;
    document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
};