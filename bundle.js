(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Selector = (function () {
    function Selector(_element) {
      _classCallCheck(this, Selector);

      var it = this;

      it.selected = null;

      it.mother = document.createElement('div');
      it.mother.style.display = 'inline-block';
      it.setStyles(it.mother, {
        position: 'relative'
      });

      it.divider = document.createElement('div');
      it.setStyles(it.divider, {
        width: '100%',
        height: '1px',

        background: '#888',
        opacity: '0.5'
      });

      it.button = document.createElement('div');
      it.mother.appendChild(it.button);
      it.button.addEventListener('click', function () {
        it.expand();
      });
      it.setStyles(it.button, {
        position: 'relative'
      });

      it.list = document.createElement('div');
      it.mother.appendChild(it.list);
      it.setStyles(it.list, {
        position: 'absolute',
        padding: '4px',
        display: 'none',
        zIndex: '1000',
        maxHeight: '400px',
        overflow: 'scroll',

        background: '#fff',
        borderRadius: '2px'
      });

      it.leaver = document.createElement('div');
      it.mother.appendChild(it.leaver);
      it.leaver.addEventListener('click', function () {
        it.collapse();
      });
      it.setStyles(it.leaver, {
        position: 'absolute',
        width: '200000px',
        height: '200000px',
        left: '-100000px',
        top: '-100000px',
        display: 'none',
        zIndex: '999'
      });

      if (_element) {
        _element.parentNode.insertBefore(it.mother, _element);
        _element.parentNode.removeChild(_element);
        var children = _element.childNodes;
        for (var iCh = 0; iCh < children.length; iCh++) {
          var child = children[iCh];
          if (child.nodeType === 1) {
            it.append(child);
          }
        }
      }
    }

    _createClass(Selector, [{
      key: 'setStyles',
      value: function setStyles(_element, _object) {

        for (var attr in _object) {
          _element.style[attr] = _object[attr];
        }
      }
    }, {
      key: 'setBackground',
      value: function setBackground(_str) {

        var it = this;

        it.list.style.background = _str;
      }
    }, {
      key: 'append',
      value: function append(_element) {

        var it = this;

        var element = _element;
        element.style.cursor = 'pointer';
        it.list.appendChild(element);
        if (it.list.childNodes.length === 1) {
          it.select(element);
        } else {
          it.list.insertBefore(it.divider.cloneNode(true), element);
        }
        element.addEventListener('click', function () {
          it.select(element);
          it.collapse();
        });
      }
    }, {
      key: 'remove',
      value: function remove(_element) {

        var it = this;

        it.list.removeChild(_element);
      }
    }, {
      key: 'expand',
      value: function expand() {

        var it = this;

        it.list.style.display = 'block';
        it.leaver.style.display = 'block';

        var rect = it.button.getBoundingClientRect();
        if (rect.top < window.innerHeight - (rect.top + rect.height)) {
          it.list.style.top = '100%';
        } else {
          it.list.style.bottom = '100%';
        }
        it.list.style.left = '-4px';
      }
    }, {
      key: 'collapse',
      value: function collapse() {

        var it = this;

        it.list.style.display = 'none';
        it.leaver.style.display = 'none';
      }
    }, {
      key: 'select',
      value: function select(_element) {

        var it = this;

        if (it.selected) {
          it.selected.style.border = 'none';
        }

        it.selected = _element;
        it.button.innerHTML = '';
        var el = _element.cloneNode(true);
        it.button.appendChild(el);

        _element.style.border = 'solid 1px #f06';
        _element.style.boxSizing = 'border-box';

        it.onchange(_element);
      }
    }, {
      key: 'onchange',
      value: function onchange() {}
    }]);

    return Selector;
  })();

  module.exports = Selector;
})();

},{}],2:[function(require,module,exports){
'use strict';

(function () {
  'use strict';

  var Selector = require('./Selector.js');

  // ------

  var headerAbout = document.getElementById('header-about');
  var aboutDiv = document.getElementById('about-div');
  var aboutBg = document.getElementById('about-bg');

  var aboutDisplaying = false;
  var toggleAbout = function toggleAbout(_bool) {
    if (typeof _bool === 'boolean') {
      aboutDisplaying = _bool;
    } else {
      aboutDisplaying = !aboutDisplaying;
    }

    if (aboutDisplaying) {
      aboutDiv.style.display = 'block';
    } else {
      aboutDiv.style.display = 'none';
    }
  };

  headerAbout.addEventListener('click', function () {
    toggleAbout();
  });
  aboutBg.addEventListener('click', function () {
    toggleAbout(false);
  });

  // ------

  var buttonPlay = document.getElementById('button-play');
  var buttonPause = document.getElementById('button-pause');
  var buttonLog = document.getElementById('button-log');

  var buttonColor = function buttonColor(_button, _bool) {
    if (_bool) {
      _button.style.filter = '';
      _button.style.webkitFilter = '';
    } else {
      _button.style.filter = 'grayscale( 1.0 )';
      _button.style.webkitFilter = 'grayscale( 1.0 )';
    }
  };

  buttonColor(buttonPause, false);

  // ------

  var previewDiv = document.getElementById('preview-div');
  var previewSmall = document.getElementById('preview-small');
  var previewSmallLeaver = document.getElementById('preview-small-leaver');

  var togglePreviewSmall = function togglePreviewSmall(_bool) {
    if (typeof _bool === 'boolean') {
      previewSmallZoom = _bool;
    } else {
      previewSmallZoom = !previewSmallZoom;
    }

    if (previewSmallZoom) {
      previewSmall.style.right = '32px';
      previewSmall.style.bottom = '32px';
      previewSmall.style.width = 'calc( 100% - 64px )';
      previewSmall.style.height = 'calc( 100% - 64px )';
      previewSmallLeaver.style.display = 'block';
    } else {
      previewSmall.style.right = '16px';
      previewSmall.style.bottom = '16px';
      previewSmall.style.width = '64px';
      previewSmall.style.height = '64px';
      previewSmallLeaver.style.display = 'none';
    }
  };

  var previewSmallZoom = false;
  previewSmall.addEventListener('click', function () {
    togglePreviewSmall();
  });
  previewSmallLeaver.addEventListener('click', function () {
    togglePreviewSmall();
  });

  window.addEventListener('resize', function () {
    if (1000 < window.innerWidth) {
      togglePreviewSmall(false);
    }
  });

  if (window.innerWidth < 1000) {
    togglePreviewSmall(true);
  }

  // ------

  var editorDiv = document.getElementById('editor-div');

  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/javascript');
  editor.getSession().setTabSize(2);
  editor.getSession().setUseSoftTabs(true);
  editor.commands.addCommand({
    name: 'save',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S'
    },
    exec: function exec(_editor) {
      init(editor.getValue());
    }
  });
  editor.commands.addCommand({
    name: 'run',
    bindKey: {
      win: 'Ctrl-R',
      mac: 'Command-R'
    },
    exec: function exec(_editor) {
      init(editor.getValue());
    }
  });
  editor.commands.addCommand({
    name: 'play/pause',
    bindKey: {
      win: 'Ctrl-P',
      mac: 'Command-P'
    },
    exec: function exec(_editor) {
      pause = !pause;
      buttonColor(buttonPause, pause);
    }
  });

  editor.on('change', function () {
    localStorage.setItem('yehd2015-code', editor.getValue());
  });

  // ------

  var log = document.getElementById('log');
  var logBorder = document.getElementById('log-border');
  var logDisplay = true;

  var toggleLog = function toggleLog(_bool) {
    if (typeof _bool === 'boolean') {
      logDisplay = _bool;
    } else {
      logDisplay = !logDisplay;
    }
    buttonColor(buttonLog, logDisplay);

    if (logDisplay) {
      log.style.display = 'block';
      logBorder.style.display = 'block';
      editorDiv.style.height = 'calc( ( 100% - 48px ) * 0.8 )';
    } else {
      log.style.display = 'none';
      logBorder.style.display = 'none';
      editorDiv.style.height = 'calc( ( 100% - 48px ) )';
    }
    editor.resize();
  };

  // ------

  var canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  var context = canvas.getContext('2d');

  var image = new Image();
  var imageData = context.getImageData(0, 0, 64, 64);
  var error = false;
  var pause = false;

  var func = function func() {};

  var print = function print(_str) {
    log.innerText += _str;
    log.innerHTML += '<br />';
  };

  var clear = function clear() {
    log.innerHTML = '';
  };

  var ev = function ev(_str) {
    error = false;
    pause = false;
    buttonColor(buttonPause, pause);

    try {
      var f = eval('( function( array ) {\n' + _str + '\n} )');
      func = f;
    } catch (_e) {
      log.innerHTML += '<span class="eval-error">' + _e + '</span>\n' + log.innerHTML;
      error = true;
      toggleLog(true);
    }
  };

  var init = function init(_str) {
    log.innerHTML = '';
    context.drawImage(image, 0, 0);
    imageData = context.getImageData(0, 0, 64, 64);
    if (_str) {
      ev(_str);
    }
  };

  var update = function update() {
    if (!pause && !error) {
      try {
        func(imageData.data);
        context.putImageData(imageData, 0, 0);

        var src = canvas.toDataURL();
        preview.style.background = 'url( ' + src + ' )';
        preview.style.backgroundPosition = '50% 50%';
        preview.style.backgroundRepeat = 'no-repeat';
        preview.style.backgroundSize = 'contain';
        previewSmall.style.background = 'url( ' + src + ' )';
        previewSmall.style.backgroundPosition = '50% 50%';
        previewSmall.style.backgroundRepeat = 'no-repeat';
        previewSmall.style.backgroundSize = 'contain';
      } catch (_e) {
        log.innerHTML += '<span class="run-error">' + _e + '</span>\n' + log.innerHTML;
        error = true;
        toggleLog(true);
      }
    }
    buttonColor(buttonPlay, !error);

    requestAnimationFrame(update);
  };
  update();

  // ------

  buttonPlay.addEventListener('click', function () {
    init(editor.getValue());
  });

  buttonPause.addEventListener('click', function () {
    pause = !pause;
    buttonColor(buttonPause, pause);
  });

  buttonLog.addEventListener('click', function () {
    toggleLog();
  });

  // ------

  var imageSelect = ['vhs', 'script', 'block', 'graffiti'];
  var imageSelected = 'vhs';

  var loadImage = function loadImage(_name) {
    imageSelected = _name;
    image = new Image();
    image.onload = function () {
      init();
    };
    image.src = 'img/' + imageSelected + '.png';
  };

  var imageSelector = new Selector(document.getElementById('image-selects'));
  imageSelector.onchange = function (_element) {
    loadImage(_element.alt);
  };
  imageSelector.setBackground('#222');

  // ------

  var codeSelect = ['rainbow', 'aurora', 'line'];
  var codeSelected = 'rainbow';

  var loadCode = function loadCode(_name) {
    codeSelected = _name;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'code/' + codeSelected + '.yehd2015', true);
    xhr.onload = function () {
      var loadedCode = xhr.responseText;
      editor.setValue(loadedCode);
      init(loadedCode);
    };
    xhr.send();
  };

  var codeSelector = new Selector(document.getElementById('code-selects'));
  codeSelector.onchange = function (_element) {
    loadCode(_element.innerText);
  };
  codeSelector.setBackground('#222');

  // ------

  var code = localStorage.getItem('yehd2015-code');
  if (code) {
    editor.setValue(code);
    init(code);
  } else {
    loadCode('rainbow');
  }
  loadImage('vhs');
})();

},{"./Selector.js":1}]},{},[2]);
