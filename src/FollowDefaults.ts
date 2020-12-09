/**
 * Object with all the default settings in it.
 * The values may be overwritten
 */
export default class FollowDefaults {
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
}
