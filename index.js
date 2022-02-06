//node index.js nombreArchivo  txt euro 10000 
const axios = require('axios');
const fs = require('fs');

if (process.argv.length < 6) {
    console.log(`Faltan argumentos para la ejecucion`);
    process.exit(1);

}



//const nombre_archivo = process.argv[2];
//const extension = process.argv[3];
const divisa = process.argv[4];
let pesos = process.argv[5];


pesos = Number(pesos);


console.log(typeof pesos);


if (typeof pesos != 'number') {

    console.log("prueba");
    process.exit(1);
}

console.log(divisa);
console.log(pesos);

let valorCambio;

async function getdata() {

    let respuesta = await axios.get("https://mindicador.cl/api");

    valorCambio = pesos / respuesta.data[divisa].valor;

    const now = new Date();
    const mensaje = `A la fecha: ${now}\n Fue realizada cotización con los siguientes datos:\n
        Cantidad de pesos a convertir: ${pesos} pesos:\n
        Convertido a ${divisa} y da un total de:
        ${valorCambio}`;

    const nombre_archivo = `${process.argv[2]}.${process.argv[3]}`;

    fs.writeFile(nombre_archivo, mensaje,
        'UTF-8',
        function() {
            console.log('archivo creado')
        }
    )

}

getdata();