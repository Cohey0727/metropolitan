export interface Dictionary<T> {
  [K: string]: T;
}
export type Diff<T, U> = T extends U ? never : T;
