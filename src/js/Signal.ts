/**
 * Signal allows an object to send out a message that other objects can listen for and respond to. It's similar to the observer pattern
 * @example
 * ```
 * const someChange = new Signal<[number]>();
 * someChange.connect((number) => {
 *   console.log(`Received number: ${number}`);
 * })
 * someChange.emit(10);
 * ```
 *
 * @template T array types of data what you want to send out or listening for
 *
 * @public
 */
export class Signal<T extends Arr> {
  /** list of functions what will respond to when signal emitted */
  protected _callbacks: SignalCallback<T>[] = [];

  /**
   * connect to signal for listening for
   * @param callback function what will be responded to with params following the signal template
   */
  public connect(callback: SignalCallback<T>): void {
    this._callbacks.push(callback);
  }

  /**
   * send out a message to other objects what listening for signal
   * @param params data what you want to send following the signal template
   */
  public emit(...params: T): void {
    if (this._callbacks?.length) {
      this._callbacks.forEach((callback) => {
        callback(...params);
      });
    }
  }
}
