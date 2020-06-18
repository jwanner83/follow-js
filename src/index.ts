class Follow {
    /**
     * The options for the follow script
     * @type FollowDefaults
     */
    defaults: FollowDefaults = new FollowDefaults()

    /**
     * Array where all the elements are stored in
     * @type {Array<FollowElement>}
     */
    elements: Array<FollowElement>

    /**
     * Constructor
     * @param options
     */
    constructor (options: object) {
        // set defaults
        this.setDefaults(options)

        // initiate elements
        this.initiate()
    }

    /**
     * Initiate the script
     * Get all elements with the given attribute and activate the animation
     */
    initiate () {
        let targets: NodeListOf<HTMLElement> = document.querySelectorAll(`[${this.defaults['attribute']}]`)
        targets.forEach(target => this.elements.push(new FollowElement(target, this.defaults)))
    }

    /**
     * Destroy the script
     * Remove all elements and set them to their normal position
     */
    destroy () {
        this.elements = Array<FollowElement>()
    }

    /**
     * Set FollowOptions if they have been passed in the object initialization
     * @param options
     */
    setDefaults (options: object) {
        if (options && options['default']) {
            for (const property in this.defaults) {
                if (this.defaults.hasOwnProperty(property)) this.defaults[property] = options['default'][property] || this.defaults[property]
            }
        }
    }
}

class FollowElement {
    target: HTMLElement
    factor: Number
    transform: FollowTransform
    position: FollowPosition

    constructor (target: HTMLElement, defaults: FollowDefaults) {
        let factor = target.getAttribute(defaults['attribute']) || defaults['factor']
    }

    get translate () {
        return
    }
}

class FollowPosition {
    /**
     * X Value of Position
     * @type number
     */
    x: number

    /**
     * Y Value of Position
     * @type number
     */
    y: number

    /**
     * Z Value of Position
     * @type number
     */
    z: number

    /**
     * Constructor
     * @param x
     * @param y
     * @param z (optional)
     */
    constructor (x: number, y: number, z: number = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    /**
     * Get Full 2d Position as Object
     * @returns {{x: number, y: number}}
     */
    get full2d () {
        return {
            x: this.x,
            y: this.y
        }
    }

    /**
     * Get Full 3d Position as Object
     * @returns {{x: number, y: number}}
     */
    get full3d () {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}

class FollowTransform {
    target: HTMLElement
    translate: Array<FollowPosition>
    translate3d: Array<FollowPosition>
    rotate: Array<FollowPosition>

    constructor (target: HTMLElement) {

    }

    /**
     * This updates the transform properties to their newest stand
     * @param target (optional)
     */
    update (target: HTMLElement = this.target) {

    }

    /**
     * @return string
     */
    toString () {
        
    }
}

/**
 * Object with all the default settings in it.
 * The values may be overwritten
 */
class FollowDefaults {
    factor: number = 10
    attribute: string = 'data-follow'
}