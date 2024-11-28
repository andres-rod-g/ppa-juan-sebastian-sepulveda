function moreThanOneStringOnArray(arr: string[]): boolean {
    const set = new Set<string>();

    for (const valor of arr) {
        if (set.has(valor)) {
            return true; // Si el valor ya está en el Set, hay repetición
        }
        set.add(valor); // Agregar el valor al Set si no está
    }

    return false; // No se encontraron repeticiones
}

export default {
    moreThanOneStringOnArray
}