export function clone (element) {
    // clone element
    let absolute = element.target.cloneNode(true)

    // give to the new element position absolute
    absolute.style.position = 'absolute'

    // add the correct dimensions to the element
    absolute.style.height = element.dimensions.height + 'px'
    absolute.style.width = element.dimensions.width + 'px'

    // position element to exact spot
    absolute.style.left = element.initialPosition.x - (element.dimensions.width / 2) + 'px'
    absolute.style.top = element.initialPosition.y - (element.dimensions.height / 2) + 'px'

    // append absolute element to the body
    document.body.append(absolute)

    // hide old element but not remove it to keep the space
    element.target.style.opacity = '0'

    // save element as before to add it back
    element.before = element.target

    // add new element as new target
    element.target = absolute
}