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
            firstTransform: true,
            position: {
                x: 0,
                y: 0
            },
            initial: {
                x: 0,
                y: 0
            },
        }

        // define initial position
        element.initial = helper.getPosition(element.target)

        // add debug dot to the initial position of the target
        debug.dot(element.initial.x, element.initial.y, 'red', 10000)

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

        // set the additional pixels as css transform translate
        element.target.style.transform = `translate(${additionalX}px, ${additionalY}px)`
    }
}

follow.init()
