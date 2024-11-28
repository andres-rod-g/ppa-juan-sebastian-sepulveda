function isEnumValue<T extends object>(value: string, enumObject: T): boolean {
    return Object.values(enumObject).includes(value as T[keyof T]);
}
  

export default {
    isEnumValue
}