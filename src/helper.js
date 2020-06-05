// adds a dot to the given position if enabled
export function dot (x, y, color = 'red', timeout = 3000) {
    if (follow.debug.dot) {
        let dot = document.createElement('i')
        dot.style.position = 'absolute'
        dot.style.height = '1px'
        dot.style.width = '1px'
        dot.style.backgroundColor = color
        dot.style.zIndex = '100'
        dot.style.left = x + 'px'
        dot.style.top = y + 'px'
        document.body.append(dot)

        // because of performance issues remove the dot after the timeout
        setTimeout(() => {
            dot.remove()
        }, timeout)
    }
}

// log if enabled
export function log (string, object = undefined) {
    if (follow.debug.log) {
        if (object) {
            console.log(string, object)
        } else {
            console.log(string)
        }
    }
}