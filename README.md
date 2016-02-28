Angular Lazy Image
======
> Just another lazy load image directive for AngularJS

The main goal of this directive is to show a way how we can implement the Medium progressive image loading.

# Demo
[Live demo on CodePen](http://codepen.io/anon/pen/ONJQZY)

# Usage
Nothing new under the sun: typical module injection + adding the directive element to your `html` files.  

### Angular
```js
  angular.module('app', [ 'ngLazyImage' ]);
```

### HTML
Add `<script>`s to your code:
```html
<script src="vendor/angular.min.js"></script>
<script src="build/angular.lazyimage.min.js"></script>
```

Add a `lazy-image` element to your html:
```html
<div>
  <lazy-image width="400" height="200" source="/image/source.jpg" placeholder="/image/placeholder.jpg" />
</div>
```
# Params

|Param      |Type   |Required |Default |Details |
|-----------|-------|---------|--------|--------|
|source     | url  |Yes      |none    | The source image |
|placeholder| url |Yes  |none    | A tiny version of the source image |
|width | integer | No  | 300    | The canvas width |
|height | integer | No  | 150    | The canvas height |
