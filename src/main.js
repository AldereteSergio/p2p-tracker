const ope = require("./operations/utils");
const axios = require("axios");
const fs = require("fs");
const envy = require("dotenv");
const { TIMEOUT } = require("dns");
const { log } = require("console");

envy.config()

const test = {
  fiat: process.env.FIAT,
  page: 1,
  rows: 10,
  tradeType: process.env.TRADE_TYPE,
  asset: process.env.ASSET,
  countries: [],
  proMerchantAds: false,
  shieldMerchantAds: false,
  publisherType: "merchant",
  payTypes: [process.env.PAYMENT_TYPE],
  classifies: ["mass", "profession"],
};

let lastData = "";

function makeRequestAndSaveResponse() {

  const timeout = process.env.TIMEOUT; // tiempo límite en milisegundos
  const showDateTime = process.env.SHOW_DATE_TIME.toLowerCase() === 'true';
  axios
    .post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", test, {
      timeout: timeout
    })
    .then(function (response) {
      const operations = response.data.data;
      let res = ope.Select(operations, ["price"]);

      // Convertir el objeto en una cadena para la comparación
      let dataString = JSON.stringify(res);

      if (dataString == lastData) {
        return;
      }
      lastData = dataString;

      // Crear un objeto con la fecha y hora
      const now = new Date();
      const dateTimeObj = {
        date: now
          .toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .replace(",", ""),
      };

      // Añadir el objeto de fecha y hora al principio del array si ShOW_DATE_TIME es verdadero
      if (showDateTime) {
        res.unshift(dateTimeObj);
      }
      
      let salida = "";
      for (let i = 0; i < res.length; i++) {
        let value = Object.values(res[i])[0];

        if (res[i].hasOwnProperty("price")) {
          salida += `${value}, `;
        } else {
          salida += `${value}, `;
        }
      }

      console.log(salida);

      // Guardar la respuesta en un archivo de texto
      fs.appendFile("/var/output.txt", salida + "\n", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    })
    .catch(function (error) {
      if (error.code === 'ECONNABORTED') {
        console.error('Tiempo de espera agotado, cancelando la solicitud.');
      } else {
        console.error(error);
      }
    });
    
}

setInterval(makeRequestAndSaveResponse, parseInt(process.env.TIMEOUT) + 1000);