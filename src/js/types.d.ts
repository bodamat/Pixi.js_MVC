// types.d.ts
/** Helping types to separate different type of numbers */
type int = number;
type double = number;

/** Signal types */
type Arr = readonly unknown[];
type SignalCallback<T extends Arr> = (...params: T) => void;
