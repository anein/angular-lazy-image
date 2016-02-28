import './lazy.styles.scss';

import Service from './lazy.service';
import Config from './lazy.config';
import BlurCanvas from '../lib/BoxBlurForCanvas';
import _template from './lazy.template.html';

/**
 * @ngdoc directive
 * @name ngLazyImage
 * @restrict E
 *
 * @description
 * The main goal of this directive is to show a way how we can implement the Medium progressive image loading.
 *
 * @example
 * <example name="ngLazyImage" module="ngLazyImageExample">
 *   <file name="index.html">
 *     <script>
 *       angular.module('ngLazyImageExample', [ 'ngLazyImage' ]);
 *     </script>
 *     <div>
 *          <lazy-image data-width="400" data-height="200" source="https://d262ilb51hltx0.cloudfront.net/fit/t/800/240/1*mWkIN-9FvzyvCqqbpW5Mdw.jpeg" placeholder="https://cdn-images-1.medium.com/freeze/fit/t/30/9/1*mWkIN-9FvzyvCqqbpW5Mdw.jpeg?q=20" />
 *          <lazy-image source="https://d262ilb51hltx0.cloudfront.net/fit/t/800/240/1*mWkIN-9FvzyvCqqbpW5Mdw.jpeg" placeholder="https://cdn-images-1.medium.com/freeze/fit/t/30/9/1*mWkIN-9FvzyvCqqbpW5Mdw.jpeg?q=20" />
 *     </div>
 *   </file>
 * </example>
 *
 */
class LazyDirective {

  constructor() {

    this.restrict = 'E';
    this.replace = true;
    this.scope = {
      // the placeholder image
      placeholder: '@',
      // the source image
      source: '@',
      // '=' doesn't work with tests
      width: '@',
      // '=' doesn't work with tests
      height: '@'
    };

    this.template = _template;

  }

  /**
   * Transforms the template DOM adding the canvas element.
   *
   * @returns {Function} A post-link function
   */
  compile( tElement, scope ) {

    let {
      placeholder,
      source
    } = scope;

    if ( !placeholder || !source ) {
      //remove the template element
      tElement.remove();
      return;
    }

    // add classes to the root element
    tElement.addClass( Config.root.classes );

    // create the canvas element
    let canvas = angular.element( '<canvas>' );
    canvas.addClass( Config.canvas.classes );
    // add our canvas to the root
    tElement.append( canvas );

    // compile -> postLink
    return this.postLink;
  }

  /**
   * Starts donwloading, creates the image element.
   *
   * Step 1. Set size of the placeholder canvas.
   *
   * Step 2. Download the placeholder.
   *
   * Step 3. Download the source image.
   *
   * @param {*} scope The local scope of the element
   * @param {DOMElement} element The div element
   *
   **/
  postLink( scope, element ) {

    let {
      placeholder,
      source,
      width,
      height
    } = scope;

    // check sizes
    width = Service.checkSize( width, Config.canvas.width );
    height = Service.checkSize( height, Config.canvas.height );


    // set dimension
    let canvas = element.find( 'canvas' )[ 0 ];
    canvas.width = width;
    canvas.height = height;

    // download image
    Service.download( placeholder ).then( ( image ) => {

      // get out pre-image and add it to the context.
      let ctx = canvas.getContext( '2d' );
      ctx.drawImage( image, 0, 0, width, height );

      // blur it! 🔥
      new BlurCanvas().blur( ctx, 0, 0, width, height, Config.blur.radius );

    } ).catch( ( err ) => {
      //  console.error( err );
    } );

    //console.group( 'postLink' );

    // remove attributes.
    element.removeAttr( 'source' ).removeAttr( 'placeholder' );

    //  waiting for construction of the DOM to start downloading
    angular.element( document ).ready( () => {
      //
      // run downloading the image
      Service.download( source ).then( ( image ) => {

        image.removeAttribute( 'crossorigin' );
        image.className += Config.image.classes;

        element.append( image );

        // @todo Here we can also remove the canvas element.

      } ).catch( ( err ) => {
        //  console.error( err );
      } );

    } ); //end ready()

    //console.groupEnd( 'postLink' );
  }

}

export default LazyDirective;
