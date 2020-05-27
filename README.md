# follow-js
A script that let elements follow your cursor without a huge overhead.

## Usage
1. Include the ```index.js``` script to your project
2. Add the ```data-follow``` attribute to the ```position: absolute``` elements which you want to follow the cursor
3. Set the factor on how big they should follow like so ```data-follow="100"``` (higher equals more movement, if you 
leave it empty, it is set to 10.

## Options
### Dynamically add new elements
If a new element is added to the dom which has the ```data-follow``` attribute, fire the ```follow.init()``` function 
to re initialize the script. Otherwise the element wont follow the cursor.

### Debug the Script
We all know that ```console.log()``` is the best debugging tool. So set the ```follow.debug``` variable to true in your
browser, to see all relevant information about what is currently happening in the script.

## Restriction
### position absolute
Currently, the script only works on ```position: absolute``` elements.

### transition
In the current state, the script wont work properly with a transition on the element. 

## Contribute
Feel free to open a Pullrequest or create a Issue on this project.