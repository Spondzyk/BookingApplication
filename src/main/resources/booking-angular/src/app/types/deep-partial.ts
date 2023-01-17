/**
 * Allows to express deep partial-ness. Primitive and built-in types are themselves.
 *
 * @see {@link https://stackoverflow.com/a/68699273}
 */
export type DeepPartial<T> = T extends Date | boolean | number | string | null | undefined // NOSONAR
  ? T | undefined
  : T extends (infer ArrayType)[]
    ? DeepPartial<ArrayType>[]
    : T extends readonly (infer ArrayType)[]
      ? readonly ArrayType[]
      : { [K in keyof T]?: DeepPartial<T[K]> };
