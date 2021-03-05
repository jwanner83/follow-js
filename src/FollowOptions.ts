/**
 * Object with all the settings in it.
 * The values may be overwritten
 */
export default class FollowOptions {
  /**
   * The factor how much the element moves with your cursor
   * @type {number}
   */
  public factor = 10

  /**
   * The attribute for the elements you want to follow
   * @type {string}
   */
  public attribute = 'data-follow'

  /**
   * If the object should automatically initiate the script on initialization of the class
   * @type {boolean}
   */
  public initiate = true

  /**
   * If debug mode is activated with log messages and visual helpers
   * @type {boolean}
   */
  public debug = false
}
