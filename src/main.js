( function() {

  'use strict';

  let Selector = require( './Selector.js' );

  // ------

  let headerAbout = document.getElementById( 'header-about' );
  let aboutDiv = document.getElementById( 'about-div' );
  let aboutBg = document.getElementById( 'about-bg' );

  let aboutDisplaying = false;
  let toggleAbout = function( _bool ) {
    if ( typeof _bool === 'boolean' ) {
      aboutDisplaying = _bool;
    } else {
      aboutDisplaying = !aboutDisplaying;
    }

    if ( aboutDisplaying ) {
      aboutDiv.style.display = 'block';
    } else {
      aboutDiv.style.display = 'none';
    }
  }
  toggleAbout();

  headerAbout.addEventListener( 'click', function() { toggleAbout() } );
  aboutBg.addEventListener( 'click', function() { toggleAbout( false ) } );

  // ------

  let buttonPlay = document.getElementById( 'button-play' );
  let buttonPause = document.getElementById( 'button-pause' );
  let buttonLog = document.getElementById( 'button-log' );

  let buttonColor = function( _button, _bool ) {
    if ( _bool ) {
      _button.style.filter = '';
      _button.style.webkitFilter = '';
    } else {
      _button.style.filter = 'grayscale( 1.0 )';
      _button.style.webkitFilter = 'grayscale( 1.0 )';
    }
  };

  buttonColor( buttonPause, false );

  // ------

  let previewDiv = document.getElementById( 'preview-div' );
  let previewSmall = document.getElementById( 'preview-small' );
  let previewSmallLeaver = document.getElementById( 'preview-small-leaver' );

  let togglePreviewSmall = function( _bool ) {
    if ( typeof _bool === 'boolean' ) {
      previewSmallZoom = _bool;
    } else {
      previewSmallZoom = !previewSmallZoom;
    }

    if ( previewSmallZoom ) {
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

  let previewSmallZoom = false;
  previewSmall.addEventListener( 'click', function() {
    togglePreviewSmall();
  } );
  previewSmallLeaver.addEventListener( 'click', function() {
    togglePreviewSmall();
  } );

  window.addEventListener( 'resize', function() {
    if ( 1000 < window.innerWidth ) {
      togglePreviewSmall( false );
    }
  } );

  if ( window.innerWidth < 1000 ) {
    togglePreviewSmall( true );
  }

  // ------

  let editorDiv = document.getElementById( 'editor-div' );

  let editor = ace.edit( 'editor' );
  editor.setTheme( 'ace/theme/monokai' );
  editor.getSession().setMode( 'ace/mode/javascript' );
  editor.getSession().setTabSize( 2 );
  editor.getSession().setUseSoftTabs( true );
  editor.commands.addCommand( {
    name: 'save',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S'
    },
    exec: function( _editor ) {
      init( editor.getValue() );
    }
  } );
  editor.commands.addCommand( {
    name: 'run',
    bindKey: {
      win: 'Ctrl-R',
      mac: 'Command-R'
    },
    exec: function( _editor ) {
      init( editor.getValue() );
    }
  } );
  editor.commands.addCommand( {
    name: 'play/pause',
    bindKey: {
      win: 'Ctrl-P',
      mac: 'Command-P'
    },
    exec: function( _editor ) {
      pause = !pause;
      buttonColor( buttonPause, pause );
    }
  } );

  editor.on( 'change', function() {
    localStorage.setItem( 'yehd2015-code', editor.getValue() );
  } );

  // ------

  let log = document.getElementById( 'log' );
  let logBorder = document.getElementById( 'log-border' );
  let logDisplay = true;

  let toggleLog = function( _bool ) {
    if ( typeof _bool === 'boolean' ) {
      logDisplay = _bool;
    } else {
      logDisplay = !logDisplay;
    }
    buttonColor( buttonLog, logDisplay );

    if ( logDisplay ) {
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

  let canvas = document.createElement( 'canvas' );
  canvas.width = 64;
  canvas.height = 64;
  let context = canvas.getContext( '2d' );

  let image = new Image();
  let imageLoaded = false;
  let imageData = context.getImageData( 0, 0, 64, 64 );
  let error = false;
  let pause = false;

  let func = function() {};

  let print = function( _str ) {
    log.innerText += _str;
    log.innerHTML += '<br />';
  }

  let clear = function() {
    log.innerHTML = '';
  }

  let ev = function( _str ) {
    error = false;
    pause = false;
    buttonColor( buttonPause, pause );

    try {
      let f = eval( '( function( array ) {\n' + _str + '\n} )' );
      func = f;
    } catch( _e ) {
      log.innerHTML += '<span class="eval-error">' + _e + '</span>\n' + log.innerHTML;
      error = true;
      toggleLog( true );
    }
  };

  let init = function( _str ) {
    log.innerHTML = '';
    if ( imageLoaded ) {
      context.drawImage( image, 0, 0 );
    }
    imageData = context.getImageData( 0, 0, 64, 64 );
    if ( _str ) {
      ev( _str );
    }
  };

  let update = function() {
    if ( !pause && !error ) {
      try {
        func( imageData.data );
        context.putImageData( imageData, 0, 0 );

        let src = canvas.toDataURL();
        preview.style.background = 'url( ' + src + ' )';
        preview.style.backgroundPosition = '50% 50%';
        preview.style.backgroundRepeat = 'no-repeat';
        preview.style.backgroundSize = 'contain';
        previewSmall.style.background = 'url( ' + src + ' )';
        previewSmall.style.backgroundPosition = '50% 50%';
        previewSmall.style.backgroundRepeat = 'no-repeat';
        previewSmall.style.backgroundSize = 'contain';
      } catch( _e ) {
        log.innerHTML += '<span class="run-error">' + _e + '</span>\n' + log.innerHTML;
        error = true;
        toggleLog( true );
      }
    }
    buttonColor( buttonPlay, !error );

    requestAnimationFrame( update );
  };
  update();

  // ------

  buttonPlay.addEventListener( 'click', function() {
    init( editor.getValue() );
  } );

  buttonPause.addEventListener( 'click', function() {
    pause = !pause;
    buttonColor( buttonPause, pause );
  } );

  buttonLog.addEventListener( 'click', function() {
    toggleLog();
  } );

  // ------

  let imageSelect = [ 'vhs', 'script', 'block', 'graffiti' ];
  let imageSelected = 'vhs';

  let loadImage = function( _name ) {
    imageSelected = _name;
    image = new Image();
    image.onload = function() {
      imageLoaded = true;
      init();
    };
    image.src = 'img/' + imageSelected + '.png';
  };

  let imageSelector = new Selector( document.getElementById( 'image-selects' ) );
  imageSelector.onchange = function( _element ) {
    loadImage( _element.alt );
  };
  imageSelector.setBackground( '#222' );

  // ------

  let codeSelect = [ 'rainbow', 'aurora', 'line' ];
  let codeSelected = 'rainbow';

  let loadCode = function( _name ) {
    codeSelected = _name;
    let xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'code/' + codeSelected + '.yehd2015', true );
    xhr.onload = function() {
      let loadedCode = xhr.responseText;
      editor.setValue( loadedCode );
      init( loadedCode );
    }
    xhr.send();
  };

  let codeSelector = new Selector( document.getElementById( 'code-selects' ) );
  codeSelector.onchange = function( _element ) {
    console.log( _element.childNodes[ 0 ] );
    loadCode( _element.childNodes[ 0 ].innerHTML );
  };
  codeSelector.setBackground( '#222' );

  // ------

  let code = localStorage.getItem( 'yehd2015-code' );
  if ( code ) {
    editor.setValue( code );
    init( code );
  } else {
    loadCode( 'rainbow' );
  }
  loadImage( 'vhs' );

} )();
