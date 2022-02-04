# follow.js

**follow.js** is an experimental, dependency free script that lets elements follow your cursor without a huge overhead.

## [Documentation / Examples](https://jwanner83.github.io/follow-js/)

## Getting started

### Include script

You can do this through [npm](https://www.npmjs.com/package/follow-js) `npm i -s follow-js` ...

```js
import Follow from "follow-js";
```

... with [skypack.dev](https://www.skypack.dev/view/follow-js) ...

```js
import Follow from "https://cdn.skypack.dev/follow-js";
```

... or download the `follow.min.js` file and include it in your html.

```html
<script src="follow.min.js"></script>
```

Otherwise, you have the option to use it with unpkg, jsdeliver or similar services.

### Add elements

To create an element which follows the cursor, you now have to add the `data-follow` attribute (the name of
the attribute can be changed through the options) to any tag you want.

```html
<div data-follow>...</div>
```

### Initialization

After you included the script in your application, you have to initialize follow.js. This can be done
automatically, if you included it via script tag and add the <code>data-follow-auto</code> attribute to it

```html
<script src="follow.min.js" data-follow-auto></script>
```

or manually through js.

```js
const follow = new Follow();
```

## Options

You have the possibility to define or override the default options of an instance, according to your needs.
To do so, you have to pass an object with the wanted options in it to the constructor as following:

```js
const follow = new Follow({
  debug: true,
  factor: 50,
  attribute: "follow",
  initiate: false,
});
```

### Available options

| Option    | Description                                                                                                                                                                                               | Default Value |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| debug     | Adds console log to the script and as well some visual helpers like the position of the mouse as well as the origin location of an object...                                                              | `false`       |
| factor    | The default factor of elements who doesn't define it explicitly with an own factor                                                                                                                        | `10`          |
| attribute | The attribute which is used to get all elements which should follow the cursor.                                                                                                                           | `data-follow` |
| initiate  | If the script should automatically start with the following elements after creating a new instance. If this is set to false, you have to initiate the instance by your own through the `initiate` method. | `true`        |

## Methods

After you initialized a new follow instance, you have multiple methods available. You can call them on your
instance as following:

```js
const follow = new Follow() < br > follow.destroy();
```

### Available methods

| Method     | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| `initiate` | Initiate the script, get all elements which will follow the cursor and start following.        |
| `destroy`  | Stop all following and calculating.                                                            |
| `refresh`  | Restart the instance. This method first calls the `destroy` and after that the `start` method. |

## Featured projects

If you want your project that you've done with the follow.js Script to be featured on this page, please open
an issue with the link to the project and a short description.

## Links

follow.js is open source. You can find the source code on [Github](https://github.com/jwanner83/follow-js), and the distributed version on [npm](https://www.npmjs.com/package/follow-js).

## Issues / Questions

If you have any issues or questions with the script, you can [open an issue on Github](https://github.com/jwanner83/follow-js/issues/new).

## Contributions

Any contributions are welcome. Please fork the project and develop with small, focused commits so its easier
for the reviewer to understand what you've done. After you're done with development, create a pull request to
the development branch. We'll then have a look at the code and give you feedback.

## Version history

| Version | Description                                                                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.3.0   | Include types in distributed es version                                                                                                                    |
| 2.2.1   | Fixing es module support                                                                                                                                   |
| 2.2.0   | - Adding debug mode to script<br>- Change initialization with options<br>- Rename FollowDefaults to FollowOptions<br>- Fixing error with multiple elements |
| 2.1.3   | Split TypeScript classes into separate files and change bundler to rollup                                                                                  |
| 2.1.2   | Fixing readme version number                                                                                                                               |
| 2.1.1   | Fixing scroll bug to enable custom cursor                                                                                                                  |
| 2.1.0   | Complete rewrite with TypeScript and classes                                                                                                               |
| 2.0.0   | Complete rewrite with the css transform property instead of cloned position absolute elements                                                              |
