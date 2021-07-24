export type GetArrayItem<T extends Array<any>> = T extends Array<infer F> ? F : never
export type GetSetItem<S extends Set<any>> = S extends Set<infer T> ? T : never
export type GetMapItem<S extends Map<any, any>> = S extends Map<infer K, infer V> ? [K, V] : never //TODO: order error!
