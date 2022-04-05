# butter-es6

#### Momentum scrolling JS library

_ES6 version of [butter.js by BCJdevelopment](https://github.com/BCJdevelopment/butter.js)_

---

## Demo

https://bcjdevelopment.github.io/butter.js/

---

## Installation & Usage

- #### Install the package

  ```
  npm i @butadpj/butter-es6
  ```

- #### Create a content wrapper with an id of "butter" (keep fixed html elements outside of content wrapper):

  ```HTML
  <div id="butter">
    Put web page content here...
  </div>
  ```

- #### Import & Initialize Butter

  ```javascript
  import Butter from 'butter-es6';

  Butter.init();
  ```

- #### Call butter.cancel() to disable momentum scrolling

  ```javascript
  Butter.cancel();
  ```

---

## Options

| Option        | default  | description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| wrapperId     | 'butter' | The id of the content wrapper                          |
| wrapperDamper | 0.07     | Changes speed of scroll (increase to speed scroll up)  |
| cancelOnTouch | false    | If true, calls butter.cancel() when touch event occurs |

#### NOTE: It is recommended to set cancelOnTouch to true to avoid scrolljacking on mobile devices since they intrinsically support momentum scrolling.

```javascript
Butter.init({
  cancelOnTouch: true,
  wrapperDamper: 0.05,
});
```

## License

Free and Open Source under the MIT License.
