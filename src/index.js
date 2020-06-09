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

    // log
    debug.log('targets', targets)

    for (let target of targets) {
        // set the specified or the default factor
        let factor = target.getAttribute(follow.attribute) ? target.getAttribute(follow.attribute) : follow.defaultFactor

        // create element object
        let element = {
            factor: factor,
            target: target,
            before: undefined,
            x: 0,
            y: 0,
            dimensions: {
                height: 0,
                width: 0
            },
            initialPosition: {
                x: 0,
                y: 0
            },
        }

        // define absolute dimensions of the element
        let bodyRectangular = document.body.getBoundingClientRect()
        let elemRect = element.target.getBoundingClientRect()
        let offsetLeft   = elemRect.left - bodyRectangular.left
        let offsetTop   = elemRect.top - bodyRectangular.top

        // define dimensions of the element
        element.dimensions.height = element.target.offsetHeight
        element.dimensions.width = element.target.offsetWidth

        // define the center of the element as initial position
        element.initialPosition.x = offsetLeft + (element.dimensions.width / 2)
        element.initialPosition.y = offsetTop + (element.dimensions.height / 2)

        // if center helper is wanted
        debug.dot(element.initialPosition.x, element.initialPosition.y, 'red', 10000)

        // if position isn't absolute clone element
        if (getComputedStyle(element.target).position !== 'absolute') {
            helper.clone(element)
        } else {
            // if container has position relative, remove element and add back on top of all
            let parent = element.target.parentElement

            while (true) {
                // if parent is body break out of while
                if (parent.tagName === 'BODY') {
                    break
                    // else if position is relative
                } else if (getComputedStyle(parent).position === 'relative') {
                    helper.clone(element)
                    break
                }
                parent = parent.parentElement
            }
        }

        // push element to array
        follow.elements.push(element)
    }

    // activate event listener
    document.addEventListener('mousemove', follow.animate)

    // log
    debug.log('elements', follow.elements)
}

follow.destroy = () => {
    // log
    debug.log('follow.destroy called')

    // remove the event listener
    document.removeEventListener('mousemove', follow.animate)

    for (const element of follow.elements) {
        if (element.before) {
            // if before element exists, bring it back and remove absolute element
            element.before.style.opacity = '1'
            element.target.remove()
        } else {
            // set the initial position for all elements
            element.target.style.left = element.initialPosition.x - (element.dimensions.width / 2) + 'px'
            element.target.style.top = element.initialPosition.y - (element.dimensions.height / 2) + 'px'
        }
    }

    // log
    debug.log('follow.destroy() finished')
}

follow.animate = (event) => {
    // define mouse position
    let mouseX = event.clientX
    let mouseY = event.clientY

    // firefox fallback because mouse is offset by y 15 and x 9 pixel
    if (navigator.userAgent.search("Firefox") !== -1) {
        mouseX += 9
        mouseY += 15
    }

    // add dot for mouse
    debug.dot(mouseX, mouseY, 'blue')

    // log
    debug.log('mouseX', mouseX)
    debug.log('mouseY', mouseY)

    for (let element of follow.elements) {
        // log
        debug.log('element', element)

        // calculate additional pixels
        let additionalX = (mouseX - element.initialPosition.x) / element.factor
        let additionalY = (mouseY - element.initialPosition.y) / element.factor

        // calculate future position
        let futureX = (element.initialPosition.x + additionalX)
        let futureY = (element.initialPosition.y + additionalY)

        // add helper dot if wanted
        debug.dot(futureX, futureY, 'green')

        // set future position
        element.target.style.left = futureX - (element.dimensions.width / 2) + 'px'
        element.target.style.top = futureY - (element.dimensions.height / 2) + 'px'

        // log
        debug.log('future position x', futureX)
        debug.log('future position y', futureY)
    }
}

follow.init()
