# follow-js
A dependency free script that let elements follow your cursor without a huge overhead.

## Usage
1. Include the `follow.min.js` script to your project
2. Add the `data-follow` attribute to the `position: absolute` elements which you want to follow the cursor
3. Set the factor on how big they should follow like so `data-follow="100"` (higher equals less movement, if you 
leave it empty, it is set to 10.

## Include Script
### local via npm
1. `npm i follow-js`
2. `<script src"node_modules/follow-js/dist/follow.min.js"></script>`

### unpkg
1. `<script src="https://unpkg.com/follow-js@1.1.0/dist/follow.min.js"></script>`

## Options
### Dynamically add new elements
If you want to add a new element with the follow animation, fire the `follow.destroy()` method, which resets all the 
elements to its initial position. Then add the new element and fire `follow.init()` to re initialize the script. 

## Special behaviours
### position relative container
If you have an element which is inside an `position: relative` container (as you can see in the examples in 
`relative-container.html`) the element will be removed from the inside of the container and moved to the body. It will 
stay at the exact position on the page as before but will correctly follow the cursor. This might generate some problems 
if you would like to have a special styling for those.

## Restriction
### position absolute
Currently, the script only works on `position: absolute` elements.

### transition
In the current state, the script won't work properly with a transition on the element. 

### transform: translate(-50%, -50%)
The transform property won't currently work because this one calculates the element completely different from we the way 
we do which would require a complete rewrite of the script.

## Examples
Have a look in the `examples` folder to see some magic. 

## Contribute
Feel free to open a Pull request or create a Issue on this project.

### Debug the Script
If you want to improve the script or see why something isn't working as expected, you have two debugging methods.

#### log
If you want to see some log, you can either set in your application the follow.debug.log variable to true. If you can
edit the source code, you can set the variable at the top of the script to true.

#### visual 
To get some visual help, you can set the `follow.debug.dot` variable to true. This will show dots at the important 
places of the script.