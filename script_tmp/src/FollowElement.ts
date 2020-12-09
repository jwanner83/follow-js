import FollowPosition from './FollowPosition'
import FollowDefaults from './FollowDefaults'

export default class FollowElement {
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
    if (position.x === 0) position.x = 0.1
    if (position.y === 0) position.y = 0.1

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