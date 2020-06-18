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
     * @param {object} options
     */
    constructor (options: object = undefined) {
        this.setDefaults(options)
        this.initiate()
    }

    /**
     * Initiate the script
     * Get all elements with the given attribute and activate the animation
     */
    public initiate () {
        let targets: NodeListOf<HTMLElement> = document.querySelectorAll(`[${this.defaults['attribute']}]`)
        targets.forEach(target => this.elements.push(new FollowElement(target, this.defaults)))

        // because a class intern function which is called inside an eventListener on the document doesn't have the
        // right context to the class to use class properties, we need to define the context into a variable and set
        // it as attribute to the function
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
     * @param {MouseEvent} event
     * @param context
     */
    private static animate (event: MouseEvent, context) {
        let mouse: FollowPosition = new FollowPosition(event.clientX, event.clientY)

        for (let element of context.elements) {
            let additional: FollowPosition = new FollowPosition(
                Number(parseFloat(((mouse.x - element.position.x) / element.factor).toString()).toFixed(2)),
                Number(parseFloat(((mouse.y - element.position.y) / element.factor).toString()).toFixed(2))
            )

            // set the additional pixels as css transform translate
            element.setTranslate(additional)
        }
    }

    /**
     * Set FollowOptions if they have been passed in the object initialization
     * @param {object} options
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
     * The current translate property
     * @type string
     */
    public translate: string

    /**
     * Constructor
     * @param {HTMLElement} target
     * @param {FollowDefaults} defaults
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

    /**
     * Replace the new translate property with the old one
     * @param {FollowPosition} position
     */
    public setTranslate (position: FollowPosition) {
        // if value is exactly zero, change to 0.01 because the css interpreter in the browser interprets it different
        if (position.x === 0) position.x = 0.01
        if (position.y === 0) position.y = 0.01

        let transform: string = this.target.style.transform
        let translate: string = `translate(${position.x}px, ${position.y}px)`

        if (this.translate) {
            transform = transform.replace(this.translate, translate)
        } else {
            transform += ` ${translate}`.trim()
        }

        this.translate = translate
        this.target.style.transform = transform
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
     * @param {number} x
     * @param {number} y
     * @param {number} z (optional)
     */
    constructor (x: number, y: number, z: number = 0) {
        this.x = x
        this.y = y
        this.z = z
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
 * To enable it, add the attribute 'data-follow-auto' to the place where you add the script in your code
 */
(() => {
    if (document.currentScript) {
        let value: string = document.currentScript.getAttribute('data-follow-auto')
        if (value === '' || value === 'true') {
            window['follow'] = new Follow()
        }
    }
})()