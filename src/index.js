class Follow {
    // object with default values
    default = {
        factor: 10,
        attribute: 'data-follow'
    }

    // elements array
    elements = []

    constructor(options) {
        // set default values
        this.setDefaults(options)

        // initiate elements
        this.initiate()
    }

    /**
     * Initiate the script
     * Get all elements with the given attribute and activate the animation
     */
    initiate () {
        let targets = document.querySelectorAll(`[${this.default.attribute}]`)
        targets.forEach(target => {this.elements.push(this.getElement(target))})
    }

    getElement (target) {
        let factor = target.getAttribute(this.default.attribute) || this.default.factor

        let element = {
            target: target,
            factor: factor,
            position: {
                initial: {
                    x: 0,
                    y: 0
                },
                current: {
                    x: 0,
                    y: 0
                }
            },
            transform: {
                initial: {
                    x: 0,
                    y: 0
                },
                current: {
                    x: 0,
                    y: 0
                }
            }
        }

        // set initial and current position (both the same)
        element.position.initial = this.getPosition(target)
        element.position.current = element.position.initial

        // define initial transform
        element.initial.transform = getComputedStyle(element.target).transform

        // add debug dot to the initial position of the target
        debug.dot(element.initial.x, element.initial.y, 'red', 10000)

        if (element.target.style.transform.search(/\btranslate\b/) >= 0) {
            console.warn('follow-js: following element already has the css translate property and might have a weird behaviour. Try removing this property or give the data-follow attribute to a wrapper of this element.', element.target)
        }

        // push element to array
        follow.elements.push(element)
    }

    /**
     * Get current position of the target
     * @param target
     * @return object with x and y
     */
    getPosition (target) {
        // define absolute location of element relative to the body
        let bodyRectangular = document.body.getBoundingClientRect()
        let elemRect = target.getBoundingClientRect()
        let x = elemRect.left - bodyRectangular.left
        let y = elemRect.top - bodyRectangular.top

        // define dimensions of the element to get the posit
        let height = target.offsetHeight
        let width = target.offsetWidth

        x += (width / 2)
        y += (height / 2)

        return {
            x: x,
            y: y
        }
    }

    /**
     * Set follow-js defaults if they have been passed in the object initialization
     * @param options
     */
    setDefaults (options) {
        if (options && options.default) {
            for (const property in this.default) {
                this.default[property] = options.default[property] || this.default[property]
            }
        }
    }
}



/*
import * as helper from './helper'
import * as debug from './debug'

window.follow = {
    debug: {
        log: false,
        dot: false
    },
    elements: [],
    attribute: 'data-follow',
    defaultFactor: 10,
    init: undefined,
    destroy: undefined,
    animate: undefined,
    locked: false
}

follow.init = () => {
    // get all targets with attribute
    let targets = document.querySelectorAll(`[${follow.attribute}]`)

    debug.log('targets', targets)

    for (let target of targets) {
        // set the specified or the default factor
        let factor = target.getAttribute(follow.attribute) ? target.getAttribute(follow.attribute) : follow.defaultFactor

        // create element object
        let element = {
            target: target,
            factor: factor,
            position: {
                x: 0,
                y: 0
            },
            initial: {
                x: 0,
                y: 0,
                transform: ''
            },
            current: {
                transform: ''
            }
        }

        // define initial position
        let initialPosition = helper.getPosition(element.target)
        element.initial.x = initialPosition.x
        element.initial.y = initialPosition.y

        // define initial transform
        element.initial.transform = getComputedStyle(element.target).transform

        // add debug dot to the initial position of the target
        debug.dot(element.initial.x, element.initial.y, 'red', 10000)

        if (element.target.style.transform.search(/\btranslate\b/) >= 0) {
            console.warn('follow-js: following element already has the css translate property and might have a weird behaviour. Try removing this property or give the data-follow attribute to a wrapper of this element.', element.target)
        }

        // push element to array
        follow.elements.push(element)
    }

    // activate event listeners
    helper.activateListeners()

    debug.log('elements', follow.elements)
}

follow.destroy = (duration = 300) => {
    // remove the event listeners
    helper.destroyListeners()

    // transit elements to initial position
    helper.transitToInit()

    debug.log('follow destroyed')
}

follow.animate = (event) => {
    // if the script is locked (mostly because of an animation) dont do animation
    if (follow.locked) return

    // define mouse position
    let mouseX = event.clientX
    let mouseY = event.clientY

    // add debug dot to the mouse position
    debug.dot(mouseX, mouseY, 'blue')

    debug.log('mouseX', mouseX)
    debug.log('mouseY', mouseY)

    for (let element of follow.elements) {
        debug.log('element', element)

        // calculate additional pixels
        let additionalX = (mouseX - element.initial.x) / element.factor
        let additionalY = (mouseY - element.initial.y) / element.factor

        // calculate future position
        let futureX = (element.initial.x + additionalX)
        let futureY = (element.initial.y + additionalY)

        // add helper dot if wanted
        debug.dot(futureX, futureY, 'green')

        // log
        debug.log('future position x', futureX)
        debug.log('future position y', futureY)

        // set the additional pixels as css transform translate and keep other transform properties
        element.target.style.transform = helper.buildTransform(element, `translate(${additionalX}px, ${additionalY}px)`)
    }
}

follow.init()
*/
