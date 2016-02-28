import '../node_modules/angular-mocks/angular-mocks';

const source = 'https://d262ilb51hltx0.cloudfront.net/fit/t/800/240/1*mWkIN-9FvzyvCqqbpW5Mdw.jpeg';
const placeholder = 'https://cdn-images-1.medium.com/freeze/fit/t/30/9/1*mWkIN-9FvzyvCqqbpW5Mdw.jpeg?q=20';

describe( 'The directive tests: ', () => {

  let element;
  let scope;
  let $compile;


  beforeEach( angular.mock.module( 'ngLazyImage' ) );

  beforeEach( angular.mock.inject( ( _$rootScope_, _$compile_ ) => {

    let $rootScope = _$rootScope_;
    $compile = _$compile_;

    scope = $rootScope.$new();
    scope.source = source;
    scope.placeholder = placeholder;

    recompileDirective(scope);

  } ) );

  function recompileDirective( scope ) {

    element = angular.element( '<lazy-image  source="{{source}}" placeholder="{{placeholder}}" data-width="{{width}}" data-height="{{height}}">' );

    $compile( element )( scope );

    scope.$digest();
  }

  it( 'Should properly create the canvas element', () => {


    let canvas = element.find( 'canvas' )[ 0 ];

    expect( canvas ).toBeDefined();

  } );

  it( 'Should have default canvas size', () => {

    recompileDirective( scope );

    let canvas = element.find( 'canvas' )[ 0 ];

    expect( canvas.width ).toBe( 300 );
    expect( canvas.height ).toBe( 150 );

  } );

  //
  it( 'Should properly set new canvas size ', () => {

    scope.width = 400;
    scope.height = 300;

    recompileDirective( scope );

    let canvas = element.find( 'canvas' )[ 0 ];

    expect( canvas.width ).toBe( 400 );
    expect( canvas.height ).toBe( 300 );

  } );

} );
