import * as helper from './helper'

window.follow = {
  debug: true,
  centerHelper: true,
  elements: [],
  attribute: 'data-follow',
  defaultFactor: 10,
  init: undefined,
  animate: undefined,
  log: undefined
}

follow.init = () => {
  // get all targets with attribute
  let targets = document.querySelectorAll(`[${follow.attribute}]`)

  // debug
  follow.log('targets', targets)

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
    follow.centerHelper && helper.dot(element.initialPosition.x, element.initialPosition.y)

    // push element to array
    follow.elements.push(element)
  }

  // debug
  follow.log('elements', follow.elements)
}

follow.animate = (event) => {
  // define mouse position
  let mouseX = event.clientX
  let mouseY = event.clientY

  // debug
  follow.log('mouseX', mouseX)
  follow.log('mouseY', mouseY)

  for (let element of follow.elements) {
    // debug
    follow.log('element', element)

    // get current position of element
    element.x = element.target.offsetLeft
    element.y = element.target.offsetTop

    // calculate future position
    let positionX = (mouseX - element.x) / element.factor
    let positionY = (mouseY - element.y) / element.factor

    // debug
    follow.log('future position x', positionX)
    follow.log('future position y', positionY)

    // set future position
    element.target.style.left = element.initialPosition.x + positionX + 'px'
    element.target.style.top = element.initialPosition.y + positionY + 'px'
  }
}

follow.log = (string, object = undefined) => {
  if (follow.debug) {
    if (object) {
      console.log(string, object)
    } else {
      console.log(string)
    }
  }
}

follow.init()
document.addEventListener('mousemove', follow.animate)