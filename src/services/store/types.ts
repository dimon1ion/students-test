import * as modules from './exports.js';

export type importModules = typeof modules;
export type BasicStoreModuleKeys = keyof importModules;

// Все базовые объекты модулей
export type BasicStoreModules = {
    [K in BasicStoreModuleKeys]: InstanceType<importModules[K]>
}

// Шаблон для ключей StoreModules
export type StoreModuleNameTemplate<T extends BasicStoreModuleKeys> = T | `${T}${number}`;

// Ключи(имена) модулей
export type StoreModuleKeys = StoreModuleNameTemplate<BasicStoreModuleKeys>;
// Ключи(имена) копирующих модулей
export type StoreCopyModuleKeys = `${BasicStoreModuleKeys}${number}`;

// Все объекты модулей (базовые/копирующие)
export type StoreModules = {
    [Key in BasicStoreModuleKeys as StoreModuleNameTemplate<Key>]: BasicStoreModules[Key]
}

export type StoreBasicInitStates = {
    [K in BasicStoreModuleKeys]: ReturnType<BasicStoreModules[K]["initState"]>
}
export type StoreInitStates = {
    [Key in BasicStoreModuleKeys as StoreModuleNameTemplate<Key>]: StoreBasicInitStates[Key]
}

export type StoreConfigs = {
    [Key in BasicStoreModuleKeys]: ReturnType<BasicStoreModules[Key]["initConfig"]>
}

export interface IServerResponse<T> {
    data: T;
    message: string;
    status: string;
}

export interface ITaskState {
    load: (taskId: number, onError: (taskType?: string) => void) => void
}