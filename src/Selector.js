( function() {

  'use strict';

  let Selector = class {

    constructor( _element ) {

      let it = this;

      it.selected = null;

      it.mother = document.createElement( 'div' );
      it.mother.style.display = 'inline-block';
      it.setStyles( it.mother, {
        position: 'relative'
      } );

      it.divider = document.createElement( 'div' );
      it.setStyles( it.divider, {
        width: '100%',
        height: '1px',

        background: '#888',
        opacity: '0.5'
      } );

      it.button = document.createElement( 'div' );
      it.mother.appendChild( it.button );
      it.button.addEventListener( 'click', function() {
        it.expand();
      } );
      it.setStyles( it.button, {
        position: 'relative'
      } );

      it.list = document.createElement( 'div' );
      it.mother.appendChild( it.list );
      it.setStyles( it.list, {
        position: 'absolute',
        padding: '4px',
        display: 'none',
        zIndex: '1000',
        maxHeight: '400px',
        overflow: 'scroll',

        background: '#fff',
        borderRadius: '2px'
      } );

      it.leaver = document.createElement( 'div' );
      it.mother.appendChild( it.leaver );
      it.leaver.addEventListener( 'click', function() {
        it.collapse();
      } );
      it.setStyles( it.leaver, {
        position: 'absolute',
        width: '200000px',
        height: '200000px',
        left: '-100000px',
        top: '-100000px',
        display: 'none',
        zIndex: '999'
      } );

      if ( _element ) {
        _element.parentNode.insertBefore( it.mother, _element );
        _element.parentNode.removeChild( _element );
        let children = _element.childNodes;
        for ( let iCh = 0; iCh < children.length; iCh ++ ) {
          let child = children[ iCh ];
          if ( child.nodeType === 1 ) {
            it.append( child );
          }
        }
      }

    }

    setStyles( _element, _object ) {

      for ( let attr in _object ) {
        _element.style[ attr ] = _object[ attr ];
      }

    }

    setBackground( _str ) {

      let it = this;

      it.list.style.background = _str;

    }

    append( _element ) {

      let it = this;

      let element = _element;
      element.style.cursor = 'pointer';
      it.list.appendChild( element );
      if( it.list.childNodes.length === 1 ) {
        it.select( element );
      } else {
        it.list.insertBefore( it.divider.cloneNode( true ), element );
      }
      element.addEventListener( 'click', function() {
        it.select( element );
        it.collapse();
      } );

    }

    remove( _element ) {

      let it = this;

      it.list.removeChild( _element );

    }

    expand() {

      let it = this;

      it.list.style.display = 'block';
      it.leaver.style.display = 'block';

      let rect = it.button.getBoundingClientRect();
      if ( rect.top < window.innerHeight - ( rect.top + rect.height ) ) {
        it.list.style.top = '100%';
      } else {
        it.list.style.bottom = '100%';
      }
      it.list.style.left = '-4px';

    }

    collapse() {

      let it = this;

      it.list.style.display = 'none';
      it.leaver.style.display = 'none';

    }

    select( _element ) {

      let it = this;

      if ( it.selected ) {
        it.selected.style.border = 'none';
      }

      it.selected = _element;
      it.button.innerHTML = '';
      let el = _element.cloneNode( true );
      it.button.appendChild( el );

      _element.style.border = 'solid 1px #f06';
      _element.style.boxSizing = 'border-box';

      it.onchange( _element );

    }

    onchange() {};

  };

  module.exports = Selector;

} )();
