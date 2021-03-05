import FollowPosition from './FollowPosition'
import FollowOptions from './FollowOptions'
import FollowElement from './FollowElement'

/**
 * Object with all debug methods
 */
export default class FollowDebug {
  /**
   * The amount of time which the visual helpers will be displayed on the page
   * @type {number}
   * @private
   */
  private static timeout = 5000

  /**
   * Add a dot to the dom
   * @param options
   * @param {FollowPosition} position
   * @param color
   */
  public static addDot (options: FollowOptions, position: FollowPosition, color = 'blue'): void {
    if (!options.debug) {
      return
    }

    const dot: HTMLDivElement = document.createElement('div')
    dot.style.height = '2px'
    dot.style.width = '2px'
    dot.style.position = 'absolute'
    dot.style.left = `${position.x}px`
    dot.style.top = `${position.y}px`
    dot.style.background = color
    dot.style.borderRadius = '100%'
    document.body.append(dot)

    setTimeout((): void => {
      dot.remove()
    }, this.timeout)
  }

  /**
   * Add a dot to the dom for the element
   * @param {FollowOptions} options
   * @param {FollowElement} element
   */
  public static addOriginalPosition (options: FollowOptions, element: FollowElement): void {
    if (!options.debug) {
      return
    }

    const copy: HTMLDivElement = document.createElement('div')
    copy.style.height = `${element.target.offsetHeight}px`
    copy.style.width = `${element.target.offsetWidth}px`
    copy.style.position = 'absolute'
    copy.style.left = `${element.position.x - (element.target.offsetHeight / 2)}px`
    copy.style.top = `${element.position.y - (element.target.offsetWidth / 2)}px`
    copy.style.border = '1px solid red'
    copy.style.background = 'none'
    document.body.append(copy)
  }

  /**
   * Add a log message if debug is enabled
   * @param options
   * @param {string} message
   * @param object
   * @private
   */
  public static addLog (options: FollowOptions, message: string, object: any = undefined): void {
    if (!options.debug) {
      return
    }

    if (object) {
      console.log(message, object)
    } else {
      console.log(message)
    }
  }
}