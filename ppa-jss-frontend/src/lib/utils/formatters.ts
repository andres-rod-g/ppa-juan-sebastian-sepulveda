export function beautifyNumber(numero: number) {
    // Convertir el número a una cadena para manipular los caracteres
    const numeroStr = numero.toString();
  
    // Separar la parte entera de la parte decimal (si la hay)
    const partes = numeroStr.split('.');
  
    // Formatear la parte entera
    const parteEntera = partes[0];
    let resultado = '';
    let contador = 0;
    for (let i = parteEntera.length - 1; i >= 0; i--) {
      resultado = parteEntera[i] + resultado;
      contador++;
      if (contador % 3 === 0 && i !== 0) {
        resultado = '.' + resultado;
      }
    }
  
    // Agregar la parte decimal si existe
    if (partes.length > 1) {
      resultado += ',' + partes[1];
    }
  
    return resultado;
  }
  