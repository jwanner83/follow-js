export default class FollowPosition {
  /**
   * X Value of Position
   * @type number
   */
  public x: number

  /**
   * Y Value of Position
   * @type number
   */
  public y: number

  /**
   * Z Value of Position
   * @type number
   */
  public z: number

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