class Follow {
    /**
     * The options for the follow script
     * @type FollowDefaults
     */
    public defaults: FollowDefaults = new FollowDefaults

    /**
     * Array where all the elements are stored in
     * @type Array<FollowElement>
     */
    public elements: Array<FollowElement> = new Array<FollowElement>()

    /**
     * Constructor
     * @param options
     */
    constructor (options: object = undefined) {
        this.initiate()
    }

    /**
     * Initiate the script
     * Get all elements with the given attribute and activate the animation
     */
    public initiate () {
        let targets: NodeListOf<HTMLElement> = document.querySelectorAll(`[${this.defaults['attribute']}]`)
        targets.forEach(target => this.elements.push(new FollowElement(target, this.defaults)))

        let context = this
        document.addEventListener('mousemove', (event) => {
            Follow.animate(event, context)
        })
    }

    /**
     * Destroy the script
     * Remove all elements and set them to their normal position
     */
    public destroy () {
        this.elements = new Array<FollowElement>()
    }

    /**
     * Destroy the script and initiate it again with the same options
     */
    public refresh () {
        this.destroy()
        this.initiate()
    }

    /**
     * Animate the element
     * @param event
     * @param context
     */
    private static animate (event, context) {
        let mouse: FollowPosition = new FollowPosition(event.clientX, event.clientY)

        for (let element of context.elements) {
            let additional: FollowPosition = new FollowPosition(
                ((mouse.x - element.position.x) / element.factor),
                ((mouse.y - element.position.y) / element.factor)
            )

            // set the additional pixels as css transform translate
            element.target.style.transform = `translate(${additional.x}px, ${additional.y}px)`
        }
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
    /**
     * The HTML target of the Follow Element
     * @type HTMLElement
     */
    public target: HTMLElement

    /**
     * The factor which defines how fast the element follows
     * @type number
     */
    public factor: number

    /**
     * The position of the element
     * @type FollowPosition
     */
    public position: FollowPosition

    /**
     * Constructor
     * @param target
     * @param defaults
     */
    constructor (target: HTMLElement, defaults: FollowDefaults) {
        this.target = target
        this.factor = parseInt(target.getAttribute(defaults['attribute'])) || defaults['factor']
        this.position = this.getPosition()
    }

    /**
     * Get position of target to calculate translate values
     * @return {FollowPosition}
     */
    public getPosition () {
        // define absolute location of element
        let bodyRectangular: ClientRect = document.body.getBoundingClientRect()
        let elemRect: ClientRect = this.target.getBoundingClientRect()
        let x: number = elemRect.left - bodyRectangular.left
        let y: number = elemRect.top - bodyRectangular.top

        // calculate position center of element
        let height: number = this.target.offsetHeight
        let width: number = this.target.offsetWidth

        x += (width / 2)
        y += (height / 2)

        return new FollowPosition(x, y)
    }

    /**
     * Update the position of the element
     */
    public updatePosition () {
         this.position = this.getPosition()
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
     * @returns {{x: number, y: number, z: number}}
     */
    get full3d () {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
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

/**
 * Check if auto init is enabled and if true, auto initialize the script
 */
(() => {
    if (document.currentScript) {
        let value: string = document.currentScript.getAttribute('data-follow-auto')
        if (value === '' || value === 'true') {
            window['follow'] = new Follow()
        }
    }
})()