function convertirNumeroALetras(num) {
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenasSuperiores = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function convertirGrupo(num) {
        let letras = '';

        if (num === 100) {
            return 'cien';
        }

        if (num > 100) {
            letras += centenas[Math.floor(num / 100)] + ' ';
            num = num % 100;
        }

        if (num >= 10 && num <= 19) {
            letras += decenas[num - 10];
        } else if (num >= 20) {
            letras += decenasSuperiores[Math.floor(num / 10)];
            if (num % 10 > 0) {
                letras += ' y ' + unidades[num % 10];
            }
        } else if (num > 0) {
            letras += unidades[num];
        }

        return letras.trim();
    }

    function convertirMiles(num) {
        if (num === 0) {
            return '';
        } else if (num === 1) {
            return 'mil';
        } else {
            return convertirGrupo(num) + ' mil';
        }
    }

    function convertirMillones(num) {
        if (num === 0) {
            return '';
        } else if (num === 1) {
            return 'un millón';
        } else {
            return convertirGrupo(num) + ' millones';
        }
    }

    let resultado = '';
    let billones = Math.floor(num / 1000000000000);
    num -= billones * 1000000000000;

    let millones = Math.floor(num / 1000000);
    num -= millones * 1000000;

    let miles = Math.floor(num / 1000);
    num -= miles * 1000;

    let cientos = num;

    if (billones > 0) {
        resultado += convertirGrupo(billones) + ' billones ';
    }

    if (millones > 0) {
        resultado += convertirMillones(millones) + ' ';
    }

    if (miles > 0) {
        resultado += convertirMiles(miles) + ' ';
    }

    if (cientos > 0) {
        resultado += convertirGrupo(cientos);
    }

    return resultado.trim();
}
