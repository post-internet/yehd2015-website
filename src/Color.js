( function() {

  'use strict';

  let Color = class {

    constructor( _r, _g, _b ) {
      this.r = _r;
      this.g = _g;
      this.b = _b;
    }

    clone() {
      return new Color( this.r, this.g, this.b );
    }

  };

} )();
