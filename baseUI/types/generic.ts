export type GetArrayItem<T extends Array<any>> = T extends Array<infer F> ? F : never
