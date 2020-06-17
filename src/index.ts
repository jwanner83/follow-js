class Follow {
    /**
     * Object with all the default settings in it.
     * The values may be overwritten
     * @type {{}}
     */
    default : object = {
        factor: 10,
        attribute: 'data-follow'
    }

    /**
     * Array where all the elements are stored in
     * @type {*[]}
     */
    elements : Array<object>

    /**
     * Constructor
     * @param options
     */
    constructor(options : object) {
        // set default values
        this.setDefaults(options)

        // initiate elements
        this.initiate()
    }

    /**
     * Initiate the script
     * Get all elements with the given attribute and activate the animation
     */
    initiate () {
        let targets = document.querySelectorAll(`[${this.default['attribute']}]`)
        targets.forEach(target => {this.elements.push(this.getElement(target))})
    }

    /**
     * Get the element with all the calculated values
     * @param target
     * @returns {{transform: {current: string, initial: string, translate: {current: {x: number, y: number}, initial:
     *  {x: number, y: number}}}, position: {current: {x: number, y: number}, initial: {x: number, y: number}},
     *  factor: string | number, target: *}}
     */
    getElement (target : Element) {
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
    getPosition (target : Element) {
        // define absolute location of element relative to the body
        let bodyRectangular = document.body.getBoundingClientRect()
        let elemRect = target.getBoundingClientRect()
        let x = elemRect.left - bodyRectangular.left
        let y = elemRect.top - bodyRectangular.top

        // define dimensions of the element to get the posit
        let height = target.offsetHeight
        let width = target.offsetWidth

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
    getTranslate (target : Element) {
        return {
            x: 0,
            y: 0
        }
    }

    /**
     * Set follow-js defaults if they have been passed in the object initialization
     * @param options
     */
    setDefaults (options : object) {
        if (options && options['default']) {
            for (const property in this.default) {
                this.default[property] = options['default'][property] || this.default[property]
            }
        }
    }
}
