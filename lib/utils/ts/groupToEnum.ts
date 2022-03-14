

export type GroupToEnum<T extends string> = {
  [P in T]: T;
}

export type GroupToEnumUpper<T extends string> = {
  [P in Uppercase<T>]: T;
}