/**
 * 将类型 T 中的某些字段 K 设置为必选，其余字段可选。
 *
 * @template T - 要操作的原始类型。
 * @template K - 在类型 T 中需要强制为必选的字段。
 *
 *
 * 例如：
 * ```ts
 * interface Hero {
 *   id: string;
 *   name: string;
 *   age: number;
 * }
 *
 * type HeroWithRequiredId = WithRequired<Hero, 'id'>;
 * // HeroWithRequiredId 等价于: { id: string; name?: string; age?: number; }
 * ```
 */
export type WithRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Partial<Omit<T, K>>;

/**
 * 将类型 T 中的某些字段 K 设置为必选且非null，其余字段保持不变。
 *
 * @template T - 要操作的原始类型。
 * @template K - 在类型 T 中需要强制为必选的字段。
 *
 * 例如：
 * ```ts
 * interface Hero {
 *  id？: string | null;
 *  name？: string;
 *  age: number;
 * }
 *
 * type HeroWithRequiredId = SpecifyRequired<Hero, 'id'>;
 * // HeroWithRequiredId 等价于: { id: string; name？: string; age: number; }
 * ```
 */
export type SpecifyRequired<T, K extends keyof T> = T extends {
  [key in K]: T[K];
}
  ? T & { [P in K]: Exclude<T[P], null | undefined> }
  : T;
