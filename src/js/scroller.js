const jump = (target, options) => {
  const start = window.pageYOffset;
  const opt = {
    duration: options.duration,
    offset: options.offset || 0,
    callback: options.callback,
    easing: options.easing || easeInOutQuad,
  };
  const distance =
      typeof target === 'string' ? opt.offset + document.querySelector(target).getBoundingClientRect().top : target,
    duration = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration;
  let timeStart;
  let timeElapsed;

  requestAnimationFrame((time) => {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;
    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration) requestAnimationFrame(loop);
    else end();
  }

  function end() {
    window.scrollTo(0, start + distance);
    if (typeof opt.callback === 'function') opt.callback();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
};

const initSmoothScrolling = () => {
  const duration = 2000;
  const pageUrl = location.hash ? stripHash(location.href) : location.href;

  delegatedLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);
    function onClick(ev) {
      if (!isInPageLink(ev.target)) return;

      ev.stopPropagation();
      ev.preventDefault();

      jump(ev.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(ev.target.hash);
        },
      });
    }
  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' && n.hash.length > 0 && stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function setFocus(hash) {
    let element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }
      //element.focus();
    }
  }
};

export default initSmoothScrolling;
