export default class MathHelper {

  /**
   * Returns a random number between min and max, inclusive.
   */
  static getRandomNumber(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  }

}
