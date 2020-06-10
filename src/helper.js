export function getPosition(target, center = true) {
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