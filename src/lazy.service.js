/**
 * Helper to get correct size and donwload the image.
 */
class LazyService {

  /**
   * Check the size
   *
   * @todo rebuild.
   *
   * @param  {(string|number)} [size = '' ] The element size.
   * @param  {number} [defaultSize = 0] The default size if the element size is not set or wrong.
   *
   * @return {number}
   */
  static checkSize( size = '', defaultSize = 0 ) {

    if ( Number.isInteger( parseInt( size, 10 ) ) === false ) {
      return defaultSize;
    }

    return size;
  }

  /**
   * Download an image.
   *
   * @param {string} url The image URL for downloading.
   *
   * @returns {promise}
   */
  static download( url ) {

    return new Promise( ( resolve, reject ) => {

      let image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = url;

      if ( image.complete ) {
        resolve( image );
      }

      image.addEventListener( 'load', function () {
        resolve( image );
      } );

      image.addEventListener( 'error', function () {
        reject( `Cannot download the image ${ image.src }` );
      } );

    } );
  }
}

export default LazyService;
