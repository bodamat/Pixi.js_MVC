/**
 * Helping util for randomize values
 */
export class Utils {
  /**
   * Generate random integer number in range
   * @param min minimum integer number
   * @param max maximum integer number
   * @returns random integer number
   */
  public static getRandomIntInRange(min: int, max: int): int {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random color
   * @returns color like number
   */
  public static getRandomColor(): number {
    const MAX = 16777215;
    return Math.floor(Math.random() * MAX);
  }

  /**
   * Generate random double numbers in range
   * @param min minimum double number
   * @param max maximum double number
   * @returns random double number
   */
  public static getRandomInRange(min: double, max: double): double {
    return Math.random() * (max - min) + min;
  }
}
