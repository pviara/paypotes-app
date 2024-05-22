export type Spy<T> = T & {
    calls: Record<keyof T, { count: number; history?: unknown[] }>;
};
