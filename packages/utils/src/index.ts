export type Modify<T, R> = Omit<T, keyof R> & R;
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export type ArrayElementTypes<ArrayType extends readonly unknown[]> = ArrayType[number];

export type Awaited<T extends (...args: any) => Promise<any>> = ReturnType<T> extends PromiseLike<
  infer U
>
  ? U
  : ReturnType<T>;

export type JoinString<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? never : '.'}${P}`
    : never
  : never;

export type DeepKeyOf<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | JoinString<K, DeepKeyOf<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

export type DeepKeyValue<T, P extends DeepKeyOf<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends DeepKeyOf<T[K]>
      ? DeepKeyValue<T[K], Rest>
      : any
    : // If T[K] is possibly undefined or null, K does not extend keyof T, so we have to also check a non nullable version of T
    K extends keyof NonNullable<T>
    ? Rest extends DeepKeyOf<NonNullable<T>[K]>
      ? // Here we have to append undefined | null to the type because we explicitly turned T[K] to a non nullable version of itself
        DeepKeyValue<NonNullable<T>[K], Rest> | undefined | null
      : any
    : any
  : P extends keyof T
  ? T[P]
  : // Same here as above, but we're in the last part of the key (after the last ".")
  P extends keyof NonNullable<T>
  ? NonNullable<T>[P] | undefined | null
  : any;

// eslint-disable-next-line prettier/prettier
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];


// eslint-disable-next-line @typescript-eslint/ban-types
type Primitive = string | Function | number | boolean | symbol | undefined | null;
type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};
export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive
          ? TP // leave primitives and functions alone
          : TP extends any[]
          ? DeepOmitArray<TP, K> // Array special handling
          : DeepOmit<TP, K>
        : never;
    };

export type GqlIdentity<Type extends { __typename?: string; id: string }> = Pick<
  Type,
  '__typename' | 'id'
>;
