import * as helper from './helper'

window.follow = {
    debug: {
        log: false,
        dot: false
    },
    elements: [],
    attribute: 'data-follow',
    defaultFactor: 10,
    init: undefined,
    animate: undefined
}

follow.init = () => {
    // get all targets with attribute
    let targets = document.querySelectorAll(`[${follow.attribute}]`)

    // debug
    helper.log('targets', targets)

    for (let target of targets) {
        // set the specified or the default factor
        let factor = target.getAttribute(follow.attribute) ? target.getAttribute(follow.attribute) : follow.defaultFactor

        // create element object
        let element = {
            factor: factor,
            target: target,
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

        // define dimensions of the element
        element.dimensions.height = element.target.offsetHeight
        element.dimensions.width = element.target.offsetWidth

        // define the center of the element as initial position
        element.initialPosition.x = element.target.offsetLeft + (element.dimensions.width / 2)
        element.initialPosition.y = element.target.offsetTop + (element.dimensions.height / 2)

        // if center helper is wanted
        helper.dot(element.initialPosition.x, element.initialPosition.y, 'red', 10000)

        // push element to array
        follow.elements.push(element)
    }

    // debug
    helper.log('elements', follow.elements)
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
    helper.dot && helper.dot(mouseX, mouseY, 'blue')

    // debug
    helper.log('mouseX', mouseX)
    helper.log('mouseY', mouseY)

    for (let element of follow.elements) {
        // debug
        helper.log('element', element)

        // calculate additional pixels
        let additionalX = (mouseX - element.initialPosition.x) / element.factor
        let additionalY = (mouseY - element.initialPosition.y) / element.factor

        // calculate future position
        let futureX = (element.initialPosition.x + additionalX) - (element.dimensions.width / 2)
        let futureY = (element.initialPosition.y + additionalY) - (element.dimensions.height / 2)

        // set future position
        element.target.style.left = futureX + 'px'
        element.target.style.top = futureY + 'px'

        // add helper dot if wanted
        helper.dot && helper.dot(futureX, futureY, 'green')

        // debug
        helper.log('future position x', futureX)
        helper.log('future position y', futureY)
    }
}

follow.init()
document.addEventListener('mousemove', follow.animate)