/*
let isOut = false

export function getPosition (target, center = true) {
    // define absolute location of element
    let bodyRectangular = document.body.getBoundingClientRect()
    let elemRect = target.getBoundingClientRect()
    let x = elemRect.left - bodyRectangular.left
    let y = elemRect.top - bodyRectangular.top

    // if position should be center of element get center
    if (center) {
        // define dimensions of the element
        let height = target.offsetHeight
        let width = target.offsetWidth

        x += (width / 2)
        y += (height / 2)
    }

    return {x: x, y: y}
}

export function transitToInit (event, duration = 200) {
    for (const element of follow.elements) {
        transit(element.target)
    }
}

export function transit (target, position = {x:0,y:0}, duration = 200) {
    let transitionBefore = getComputedStyle(target).transition

    // if duration is higher than 0 do transition
    if (duration > 0) {
        target.style.transition = duration + 'ms'

        // reset transition after animation is done
        setTimeout(() => {
            target.style.transition = transitionBefore
        }, duration + 10)
    }

    let transformAfter = ''

    if (position.x !== 0 && position.y !== 0) {
        // set transform to given position
        transformAfter = `translate(${position.x}px, ${position.y}px)`
    }
    // set transform back to normal
    target.style.transform = transformAfter
}

function transitToInitHelper (event) {
    let from = event.relatedTarget || event.toElement
    if (!from || from.nodeName === "HTML") {
        transitToInit(200)
    }
}

export function activateListeners () {
    document.addEventListener('mousemove', follow.animate)
    document.addEventListener('mouseout', transitToInitHelper)
}

export function destroyListeners () {
    document.removeEventListener('mousemove', follow.animate)
    document.removeEventListener('mouseout', transitToInitHelper)
}

export function buildTransform (element, translate = '') {
    // get current transform
    let current = element.target.style.transform

    // split current to get transform without translate
    let first = current.split('translate(')
    let second = []
    let without = ''

    if (first.length > 1) {
        // if translate exists
        second = first[1].split(')')
        without = first[0] + second[1].trim()
    } else {
        // if it isn't existing
        without = first[0]
    }

    // build together with new translate
    element.current.transform = `${without} ${translate}`

    return element.current.transform
}*/
