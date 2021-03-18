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
   * Position of the pointer (mouse or gyro) to use to calculate
   * @type {FollowPosition}
   */
  public pointer: FollowPosition = new FollowPosition(0, 0)

  /**
   * Because a phone isn't held completely flat, we calculate that the current holding position is in the center
   * @type {FollowPosition}
   */
  public mobileDifference: FollowPosition

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

    if (this.options.mobile && /Mobi/.test(navigator.userAgent)) {
      window.addEventListener('deviceorientation', (event: DeviceOrientationEvent): void => {
        if (!this.mobileDifference) {
          this.mobileDifference = new FollowPosition(event.gamma, event.beta)
        }

        // get height of screen
        const height: number = screen.height

        // get width of screen
        const width: number = screen.width

        // calculate current orientation position to be in center of screen
        const x: number = width / 2 + ((this.mobileDifference.x - event.gamma) * this.options.mobileFactor)
        const y: number = height / 2 + ((this.mobileDifference.y - event.beta) * this.options.mobileFactor)

        Follow.updatePointerPosition(new FollowPosition(x , y), context)
        Follow.animate(context)
      })
    } else {
      document.addEventListener('mousemove', (event: MouseEvent): void => {
        Follow.updatePointerPosition(new FollowPosition(event.clientX, event.clientY), context)
        Follow.animate(context)
      })
    }

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
        Math.round((context.pointer.x + context.scroll.x - element.position.x) / element.factor),
        Math.round((context.pointer.y + context.scroll.y - element.position.y) / element.factor)
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
   * Update the correct current pointer position
   * @param {FollowPosition} position
   * @param context
   */
  private static updatePointerPosition (position: FollowPosition, context: any): void {
    context.pointer.x = position.x
    context.pointer.y = position.y

    FollowDebug.addDot(context.options, context.pointer)
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