// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorOf<T> = new(...args: any[]) => T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor = new(...args: any[]) => any;

export type SupportedLang = 'text' | 'json';
