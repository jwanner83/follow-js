export function dot (x, y) {
    let helper = document.createElement('i')
    helper.style.position = 'absolute'
    helper.style.height = '1px'
    helper.style.width = '1px'
    helper.style.backgroundColor = 'red'
    helper.style.zIndex = '100'
    helper.style.left = x
    helper.style.top = y
    document.body.append(helper)
}