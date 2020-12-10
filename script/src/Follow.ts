import FollowElement from './FollowElement'
import FollowPosition from './FollowPosition'
import FollowDefaults from './FollowDefaults'

class Follow {
  /**
   * The options for the follow script
   * @type {FollowDefaults}
   */
  public defaults: FollowDefaults = new FollowDefaults()

  /**
   * Array where all the elements are stored in
   * @type Array<FollowElement>
   */
  public elements: Array<FollowElement> = new Array<FollowElement>()

  /**
   * Position of the Mouse to use to calculate
   * @type {FollowPosition}
   */
  public mouse: FollowPosition = new FollowPosition(0, 0)

  /**
   * Current scroll position to use to calculate
   * @type {FollowPosition}
   */
  public scroll: FollowPosition = new FollowPosition(0, 0)

  /**
   * Constructor
   * @param {object} options
   */
  constructor (options: object = undefined) {
    this.setDefaults(options)
    this.defaults.initiate && this.initiate()
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
      Follow.updateMousePosition(new FollowPosition(event.clientX, event.clientY), context)
      Follow.animate(context)
    })

    document.addEventListener('scroll', () => {
      Follow.updateScrollPosition(new FollowPosition(window.scrollX, window.scrollY), context)
      Follow.animate(context)
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
   * @param context
   */
  private static animate (context: any) {
    for (let element of context.elements) {
      let additional: FollowPosition = new FollowPosition(
        parseFloat(((context.mouse.x + context.scroll.x - element.position.x) / element.factor).toString()),
        parseFloat(((context.mouse.y + context.scroll.y - element.position.y) / element.factor).toString())
      )

      // set the additional pixels as css transform translate
      element.setTranslate(additional)
    }
  }

  /**
   * Update the correct current mouse position
   * @param {FollowPosition} position
   * @param context
   */
  private static updateMousePosition (position: FollowPosition, context: any) {
    context.mouse.x = position.x
    context.mouse.y = position.y
  }

  /**
   * Update the correct current scroll position
   * @param {FollowPosition} position
   * @param context
   */
  private static updateScrollPosition (position: FollowPosition, context: any) {
    context.scroll.x = position.x
    context.scroll.y = position.y
  }

  /**
   * Set FollowOptions if they have been passed in the object initialization
   * @param {object} options
   */
  setDefaults (options: object) {
    if (options && options['defaults']) {
      for (const property in this.defaults) {
        if (this.defaults.hasOwnProperty(property) && options['defaults'][property] !== undefined) {
          this.defaults[property] = options['defaults'][property]
        }
      }
    }
  }
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