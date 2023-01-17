/** An object of "primitive" types. */
export type PrimitiveObject<T> = Record<keyof T, unknown> | { [key in keyof T]: PrimitiveObjectProp };

/**
 * Represents "primitive" types only, meaning no classes and types that need special serialization logic such as
 * `BigInteger` or `Date`.
 */
export type PrimitiveObjectProp =
  | PrimitiveObjectProp[]
  | boolean
  | number
  | string
  | { [key: string]: PrimitiveObjectProp }
  | null
  | undefined;
