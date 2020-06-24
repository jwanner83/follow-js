# follow-js
An experimental, dependency free script that let elements follow your cursor without a huge overhead.

## Usage
1. Include the `follow.min.js` script in your project 
2. Add the `data-follow` attribute to elements which you want to follow the cursor
3. Set the factor on how big they should follow like so `data-follow="100"` (higher equals less movement, if you 
leave it empty, it is set to 10.
4. Initiate the script by either adding the `data-follow-auto` attribute to the script tag where you include the follow 
script or create an instance of the follow class with `let follow = new Follow()`

## Include Script
### local via npm
`npm i -s follow-js`

#### with auto init
`<script src"node_modules/follow-js/dist/follow.min.js" data-follow-auto></script>`
#### without auto init
`<script src"node_modules/follow-js/dist/follow.min.js"></script>`

### unpkg
#### with auto init
`<script src="https://unpkg.com/follow-js@2.1.0/dist/follow.min.js" data-follow-auto></script>`
#### without auto init
`<script src="https://unpkg.com/follow-js@2.1.0/dist/follow.min.js"></script>`

## Methods
### initiate
`yourFollowInstance.initiate()`

### destroy
`yourFollowInstance.destroy()`

### refresh
`yourFollowInstance.refresh()`

## Options
In the Class initialization, you have the option to set your own default values for the script. You have the following
options:
```js
let follow = new Follow({
    'defaults': {
        'factor': 50, // default is 10
        'attribute': 'follow', // default is 'data-follow'
        'initiate': false // default is true
    }
})
```
If you define that the `initiate` property is false, you have to call the `initiate()` function by yourself. Otherwise, 
it won't do anything 

## Examples
Have a look in the `examples` folder to see some magic. 

## Contribute
Feel free to open a Pull request or create a Issue on this project.

## Update Log
### v2.1.0
Complete rewrite with Typescript and classes

### v2.0.0
Complete rewrite with the css transform property instead of position absolute elements
