class Follow {
    /**
     * Object with all the default settings in it.
     * The values may be overwritten
     * @type {{}}
     */
    default: object = {
        factor: 10,
        attribute: 'data-follow'
    }
    /**
     * Array where all the elements are stored in
     * @type {*[]}
     */
    elements: Array<FollowElement>

    /**
     * Constructor
     * @param options
     */
    constructor(options: object) {
        // set default values
        this.setDefaults(options)

        // initiate elements
        this.initiate()
    }

    /**
     * Initiate the script
     * Get all elements with the given attribute and activate the animation
     */
    initiate() {
        let targets: NodeListOf<HTMLElement> = document.querySelectorAll(`[${this.default['attribute']}]`)
        targets.forEach(target => this.elements.push(new FollowElement(target)))
    }

    getElement(target: HTMLElement) {
        let factor = target.getAttribute(this.default['attribute']) || this.default['factor']
        let initialPosition = this.getPosition(target)
        let initialTranslate = this.getTranslate(target)

        return {
            target: target,
            factor: factor,
            position: {
                initial: initialPosition,
                current: initialPosition
            },
            transform: {
                initial: '',
                current: '',
                translate: {
                    initial: initialTranslate,
                    current: initialTranslate
                }
            }
        }
    }

    /**
     * Get current absolute position of the target
     * @param target
     * @returns {{x: number, y: number}}
     */
    getPosition(target: HTMLElement) {
        // define absolute location of element relative to the body
        let bodyRectangular: ClientRect = document.body.getBoundingClientRect()
        let elemRect: ClientRect = target.getBoundingClientRect()
        let x: number = elemRect.left - bodyRectangular.left
        let y: number = elemRect.top - bodyRectangular.top

        // define dimensions of the element to get the posit
        let height: number = target.offsetHeight
        let width: number = target.offsetWidth

        x += (width / 2)
        y += (height / 2)

        return {
            x: x,
            y: y
        }
    }

    /**
     * Get the current values of the css transform translate property
     * If the property doesn't exist, the numbers will be 0
     * @param target
     * @returns {{x: number, y: number}}
     */
    getTranslate(target: HTMLElement) {
        let matches: Array = target.style.transform.match(/translate\(.*?\)/)
        let match : String = Array.isArray(matches) && matches.length > 0 ? matches[0] : null

        if (match) {
            let content : String = match.match(/\(.*?\)/)
            content = content.slice(0, -1)
            content = content.substr(1)
            let values : Array<Number> = content.split(', ')

            return new Position()
        } else {
            return undefined
        }
    }

    /**
     * Set follow-js defaults if they have been passed in the object initialization
     * @param options
     */
    setDefaults(options: object) {
        if (options && options['default']) {
            for (const property in this.default) {
                this.default[property] = options['default'][property] || this.default[property]
            }
        }
    }
}

/**
 * Element which the
 */
class FollowElement {
    target: HTMLElement
    factor: Number
    position: {
        initial: Position,
        current: Position
    }
    transform: {
        initial: String,
        current: String,
        translate: {
            initial: Position,
            current: Position
        }
    }

    constructor(target: HTMLElement) {
        let factor = target.getAttribute(this.default['attribute']) || this.default['factor']
    }

    set translate (position : Position) {

    }

    get translate () {

    }

    private getTranslate() {

    }
}

class Position {
    x: number
    y: number

    constructor (x: number, y: number) {
        this.x = x
        this.y = y
    }

    /**
     * Get Full Position as Object
     * @returns {{x: number, y: number}}
     */
    get full () {
        return {
            x: this.x,
            y: this.y
        }
    }
}
