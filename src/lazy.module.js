import Directive from './lazy.directive';

angular.module( 'ngLazyImage', [] )
  .directive( 'lazyImage', () => new Directive() );
