import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberTextService {

  constructor() { }

  unidades(num: number) {

    switch (num) {
      case 1: return "UN";
      case 2: return "DOS";
      case 3: return "TRES";
      case 4: return "CUATRO";
      case 5: return "CINCO";
      case 6: return "SEIS";
      case 7: return "SIETE";
      case 8: return "OCHO";
      case 9: return "NUEVE";
    }

    return "";
  }

  decenas(num: number) {

    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);

    switch (decena) {
      case 1:
        switch (unidad) {
          case 0: return "DIEZ";
          case 1: return "ONCE";
          case 2: return "DOCE";
          case 3: return "TRECE";
          case 4: return "CATORCE";
          case 5: return "QUINCE";
          default: return "DIECI" + this.unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0: return "VEINTE";
          default: return "VEINTI" + this.unidades(unidad);
        }
      case 3: return this.decenasY("TREINTA", unidad);
      case 4: return this.decenasY("CUARENTA", unidad);
      case 5: return this.decenasY("CINCUENTA", unidad);
      case 6: return this.decenasY("SESENTA", unidad);
      case 7: return this.decenasY("SETENTA", unidad);
      case 8: return this.decenasY("OCHENTA", unidad);
      case 9: return this.decenasY("NOVENTA", unidad);
      case 0: return this.unidades(unidad);
    }
    return "";
  }

  decenasY(strSin: string, numUnidades: number) {
    if (numUnidades > 0)
      return strSin + " Y " + this.unidades(numUnidades)

    return strSin;
  }

  centenas(num: number) {
    let centenas: number = Math.floor(num / 100);
    let decenas: number = num - (centenas * 100);

    switch (centenas) {
      case 1:
        if (decenas > 0)
          return "CIENTO " + this.decenas(decenas);
        return "CIEN";
      case 2: return "DOSCIENTOS " + this.decenas(decenas);
      case 3: return "TRESCIENTOS " + this.decenas(decenas);
      case 4: return "CUATROCIENTOS " + this.decenas(decenas);
      case 5: return "QUINIENTOS " + this.decenas(decenas);
      case 6: return "SEISCIENTOS " + this.decenas(decenas);
      case 7: return "SETECIENTOS " + this.decenas(decenas);
      case 8: return "OCHOCIENTOS " + this.decenas(decenas);
      case 9: return "NOVECIENTOS " + this.decenas(decenas);
    }

    return this.decenas(decenas);
  }

  seccion(num: number, divisor: number, strSingular: string, strPlural: string) {
    let cientos: number = Math.floor(num / divisor)
    let resto: number = num - (cientos * divisor)

    let letras = "";

    if (cientos > 0)
      if (cientos > 1)
        letras = this.centenas(cientos) + " " + strPlural;
      else
        letras = strSingular;

    if (resto > 0)
      letras += "";

    return letras;
  }

  miles(num: number) {
    let divisor: number = 1000;
    let cientos: number = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = this.seccion(num, divisor, "UN MIL", "MIL");
    let strCentenas = this.centenas(resto);

    if (strMiles == "")
      return strCentenas;

    return strMiles + " " + strCentenas;
  }

  millones(num: number) {
    let divisor: number = 1000000;
    let cientos: number = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones: string = this.seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    let strMiles: any = this.miles(resto);

    if (strMillones == "")
      return strMiles;

    return strMillones + " " + strMiles;
  }

  numeroALetras(num: number) {
    var data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: "",
      letrasMonedaPlural: 'BOLIVIANOS',
      letrasMonedaSingular: 'BOLIVIANO',

      letrasMonedaCentavoPlural: "CENTAVOS",
      letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
      data.letrasCentavos = "CON " + (() => {
        if (data.centavos == 1)
          return this.millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
        else
          return this.millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
      })();
    };

    if (data.enteros == 0)
      return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
      return this.millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
      return this.millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }
}
