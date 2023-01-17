import {PrimitiveObject} from "../types/primitive-objects";

/**
 * @returns Typed keys of the {@link obj}
 * @see {@link https://stackoverflow.com/questions/55012174}
 */
export function objKeys<T extends PrimitiveObject<T>>(obj: T | undefined): (keyof T)[] {
  return Object.keys(obj ?? {}) as (keyof T)[];
}

export function isObj(obj: unknown): obj is PrimitiveObject<typeof obj> {
  return !!obj && typeof obj === "object" && !Array.isArray(obj);
}

/**
 * Performs a deep merge of objects and returns a new object.
 *
 * @param objects - Objects to merge (starting with the first)
 * @returns New object with merged key/values
 */
export function mergeDeep<T extends PrimitiveObject<T>>(...objects: T[]): T {
  return objects.reduce((acc, obj) => {
    objKeys(obj).forEach(key => {
      const pVal = acc[key];
      const oVal = obj[key];
      if (isObj(pVal) && isObj(oVal)) {
        acc[key] = mergeDeep(pVal, oVal);
      } else {
        acc[key] = oVal;
      }
    });
    return acc;
  }, {} as T);
}
