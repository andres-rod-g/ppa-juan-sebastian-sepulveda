export function stringToEnum<T extends { [key: string]: string | number }>(enumType: T, value: string): T[keyof T] | undefined {
    // Verificamos si el valor existe en el enum
    if (Object.values(enumType).includes(value as T[keyof T])) {
      return value as T[keyof T];
    }
    // Retornamos undefined si no es un valor válido del enum
    return undefined;
  }