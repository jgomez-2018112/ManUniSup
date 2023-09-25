'use strict'

exports.eliminarCarateresEspeciales = async(texto)=>{
    return texto.replace(/[^a-zA-Z0-9\s]/g, '');
}

exports.contieneCaracteresEspeciales = async(texto)=>{
    for (const key in texto) {
        if (texto.hasOwnProperty(key)) {
          const value = texto[key];
    
          if (typeof value === 'string') {
            // Verifica si la cadena contiene caracteres especiales
            const contieneEspeciales = /[^a-zA-Z0-9\s]/g.test(value);
    
            if (contieneEspeciales) {
              return true; // Si se encuentra un carácter especial, devuelve true
            }
          } else if (typeof value === 'object') {
            // Si el valor es un objeto, verifica recursivamente el objeto interno
            if (contieneCaracteresEspeciales(value)) {
              return true; // Si se encuentra un carácter especial, devuelve true
            }
          }
        }
      }
    
      // Si no se encontraron caracteres especiales en ninguna propiedad del objeto, devuelve false
      return false;
}