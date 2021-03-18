/**
 * Object with all the settings in it.
 * The values may be overwritten
 */
export default class FollowOptions {
  /**
   * The factor how much the element moves with your cursor
   * @type {number}
   */
  public factor: number = 10

  /**
   * The attribute for the elements you want to follow
   * @type {string}
   */
  public attribute: string = 'data-follow'

  /**
   * If the object should automatically initiate the script on initialization of the class
   * @type {boolean}
   */
  public initiate: boolean = true

  /**
   * If the elements should follow on mobile with the gyro sensor
   * @type {boolean}
   */
  public mobile: boolean = true

  /**
   * The factor how fast the mobile fake cursor should move.
   * Higher equals more movement for all elements
   * @type {number}
   */
  public mobileFactor: number = 20

  /**
   * If debug mode is activated with log messages and visual helpers
   * @type {boolean}
   */
  public debug: boolean = false
}
