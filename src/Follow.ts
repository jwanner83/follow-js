import FollowElement from './FollowElement'
import FollowPosition from './FollowPosition'
import FollowOptions from './FollowOptions'
import FollowDebug from './FollowDebug'

export default class Follow {
  /**
   * The options for the follow script
   * @type {FollowOptions}
   */
  public options: FollowOptions = new FollowOptions()

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
  constructor (options: any = undefined) {
    this.setOptions(options)
    this.options.initiate && this.initiate()
  }

  /**
   * Initiate the script
   * Get all elements with the given attribute and activate the animation
   */
  public initiate (): void {
    FollowDebug.addLog(this.options, 'follow.js instance is enabled')

    const targets: NodeListOf<HTMLElement> = document.querySelectorAll(`[${this.options['attribute']}]`)
    targets.forEach(target => this.elements.push(new FollowElement(target, this.options)))

    FollowDebug.addLog(this.options, `found ${targets.length} element(s) in the instance`)

    const context = this

    document.addEventListener('mousemove', (event: MouseEvent): void => {
      Follow.updateMousePosition(new FollowPosition(event.clientX, event.clientY), context)
      Follow.animate(context)
    })

    document.addEventListener('scroll', (): void => {
      Follow.updateScrollPosition(new FollowPosition(window.scrollX, window.scrollY), context)
      Follow.animate(context)
    })
  }

  /**
   * Destroy the script
   * Remove all elements and set them to their normal position
   */
  public destroy (): void {
    this.elements = new Array<FollowElement>()

    FollowDebug.addLog(this.options, 'follow.js instance is destroyed')
  }

  /**
   * Destroy the script and initiate it again with the same options
   */
  public refresh (): void {
    this.destroy()
    this.initiate()

    FollowDebug.addLog(this.options, 'follow.js instance is refreshed')
  }

  /**
   * Set FollowOptions if they have been passed in the object initialization
   * @param {object} options
   */
  public setOptions (options: any): void {
    if (options) {
      const customOptions: any = options.default || options

      for (const property in this.options) {
        if (Object.prototype.hasOwnProperty.call(this.options, property) && customOptions[property] !== undefined) {
          this.options[property] = customOptions[property]
        }
      }
    }
  }

  /**
   * Animate the element
   * @param context
   */
  private static animate (context: any): void {
    for (const element of context.elements) {
      const additional: FollowPosition = new FollowPosition(
        Math.round((context.mouse.x + context.scroll.x - element.position.x) / element.factor),
        Math.round((context.mouse.y + context.scroll.y - element.position.y) / element.factor)
      )

      // set the additional pixels as css transform translate
      element.setTranslate(additional)

      if (context.options.debug) {
        // prevent unnecessary calculations if debug mode is disabled
        const current: FollowPosition = new FollowPosition(
          element.position.x + additional.x,
          element.position.y + additional.y
        )
        FollowDebug.addDot(context.options, current, 'red')
      }
    }
  }

  /**
   * Update the correct current mouse position
   * @param {FollowPosition} position
   * @param context
   */
  private static updateMousePosition (position: FollowPosition, context: any): void {
    context.mouse.x = position.x
    context.mouse.y = position.y

    FollowDebug.addDot(context.options, context.mouse)
  }

  /**
   * Update the correct current scroll position
   * @param {FollowPosition} position
   * @param context
   */
  private static updateScrollPosition (position: FollowPosition, context: any): void {
    context.scroll.x = position.x
    context.scroll.y = position.y

    FollowDebug.addLog(context.options, `scroll event: x: ${context.scroll.x}, y: ${context.scroll.y}`)
  }
}

/**
 * Check if auto init is enabled and if true, auto initialize the script
 * To enable it, add the attribute 'data-follow-auto' to the place where you add the script in your code
 */
(() => {
  if (document.currentScript) {
    const value: string = document.currentScript.getAttribute('data-follow-auto')
    if (value === '' || value === 'true') {
      window['follow'] = new Follow()
    }
  }
})()