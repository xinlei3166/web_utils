var timer;

window.addEventListener("resize", function () {
    clearTimeout(timer), timer = setTimeout(resize, 300)
}, false);

window.addEventListener("pageshow", function (b) {
    b.persisted && (clearTimeout(timer), timer = setTimeout(resize, 300))
}, false);

function resize() {
    var domWidth = document.documentElement.getBoundingClientRect().width;
    document.documentElement.style.fontSize =  domWidth / 750 * 100 + 'px';
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //
    } else {
        if (domWidth > 750) {
            document.documentElement.style.fontSize = "50px";
        }
    }
}

resize();


