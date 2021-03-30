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

        this.updatePointerPosition(new FollowPosition(x , y))
        this.animate()
      })
    } else {
      document.addEventListener('mousemove', (event: MouseEvent): void => {
        this.updatePointerPosition(new FollowPosition(event.clientX, event.clientY))
        this.animate()
      })
    }

    document.addEventListener('scroll', (): void => {
      this.updateScrollPosition(new FollowPosition(window.scrollX, window.scrollY))
      this.animate()
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
   */
  private animate (): void {
    for (const element of this.elements) {
      const additional: FollowPosition = new FollowPosition(
        Math.round((this.pointer.x + this.scroll.x - element.position.x) / element.factor),
        Math.round((this.pointer.y + this.scroll.y - element.position.y) / element.factor)
      )

      // set the additional pixels as css transform translate
      element.setTranslate(additional)

      if (this.options.debug) {
        // prevent unnecessary calculations if debug mode is disabled
        const current: FollowPosition = new FollowPosition(
          element.position.x + additional.x,
          element.position.y + additional.y
        )
        FollowDebug.addDot(this.options, current, 'red')
      }
    }
  }

  /**
   * Update the correct current pointer position
   * @param {FollowPosition} position
   */
  private updatePointerPosition (position: FollowPosition): void {
    this.pointer.x = position.x
    this.pointer.y = position.y

    FollowDebug.addDot(this.options, this.pointer)
  }

  /**
   * Update the correct current scroll position
   * @param {FollowPosition} position
   */
  private updateScrollPosition (position: FollowPosition): void {
    this.scroll.x = position.x
    this.scroll.y = position.y

    FollowDebug.addLog(this.options, `scroll event: x: ${this.scroll.x}, y: ${this.scroll.y}`)
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