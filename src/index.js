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
    animate: undefined
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

    // activate event listener
    document.addEventListener('mousemove', follow.animate)

    debug.log('elements', follow.elements)
}

follow.destroy = (duration = 300) => {
    // log
    debug.log('follow.destroy() called')

    // remove the event listener
    document.removeEventListener('mousemove', follow.animate)

    for (const element of follow.elements) {
        let transitionBefore = getComputedStyle(element.target).transition

        if (duration > 0) {
            element.target.style.transition = duration + 'ms'

            setTimeout(() => {
                element.target.style.transition = transitionBefore
            }, duration + 10)
        }
        element.target.style.transform = ''
    }

    // log
    debug.log('follow.destroy() finished')
}

follow.animate = (event) => {
    // define mouse position
    let mouseX = event.clientX
    let mouseY = event.clientY

    // firefox fallback because mouse is offset by y 15 and x 9 pixel
    /*if (navigator.userAgent.search("Firefox") !== -1) {
        mouseX += 9
        mouseY += 15
    }*/

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

        // set the additional pixels as css transform translate
        element.target.style.transform = `translate(${additionalX}px, ${additionalY}px)`

        // log
        debug.log('future position x', futureX)
        debug.log('future position y', futureY)
    }
}

follow.init()
