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

        // if container has position relative, remove element and add back on top of all
        let parent = element.target.parentElement

        while (true) {
            if (parent.tagName === 'BODY') {
                break
            }
            if (getComputedStyle(parent).position === 'relative') {
                // clone element
                let absoluteElement = element.target.cloneNode(true)

                // give to the new element position absolute
                absoluteElement.style.position = 'absolute'

                // add the correct dimensions to the element
                absoluteElement.style.height = element.dimensions.height + 'px'
                absoluteElement.style.width = element.dimensions.width + 'px'

                // position element to exact spot
                absoluteElement.style.left = element.initialPosition.x - (element.dimensions.width / 2) + 'px'
                absoluteElement.style.top = element.initialPosition.y - (element.dimensions.height / 2) + 'px'

                // append absolute element to the body
                document.body.append(absoluteElement)

                // hide old element but not remove it to keep the space
                element.target.style.opacity = '0'

                // add new element as new target
                element.target = absoluteElement
                break
            }
            parent = parent.parentElement
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

    // set the initial position for all elements
    for (const element of follow.elements) {
        element.target.style.left = element.initialPosition.x - (element.dimensions.width / 2) + 'px'
        element.target.style.top = element.initialPosition.y - (element.dimensions.height / 2) + 'px'
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
