const ope = require("./operations/utils");
const axios = require("axios");
const fs = require('fs');

const test = {
  fiat: "ARS",
  page: 1,
  rows: 10,
  tradeType: "BUY",
  asset: "USDT",
  countries: [],
  proMerchantAds: false,
  shieldMerchantAds: false,
  publisherType: "merchant",
  payTypes: ["MercadoPagoNew"],
  classifies: ["mass", "profession"],
};

// Función para hacer la solicitud y guardar la respuesta
function makeRequestAndSaveResponse() {
  axios
    .post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", test)
    .then(function (response) {
    
      const operations = response.data.data;   
      let res = ope.Select(operations, ["price"]);
      
      // Crear un objeto con la fecha y hora
      const now = new Date();
      const dateTimeObj = { date: now.toLocaleString("es-AR", { timeZone:"America/Argentina/Buenos_Aires", day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(",", "")};

      // Añadir el objeto de fecha y hora al principio del array
      res.unshift(dateTimeObj);

      let salida = '';
      for (let i = 0; i < res.length; i++) {
        let value = Object.values(res[i])[0];
        
        if (res[i].hasOwnProperty('price')) {
          salida += `${value}, `;
        } else {
          salida += `${value}, `;
        }
      }

      console.log(salida);
      
      // Guardar la respuesta en un archivo de texto
      fs.appendFile('output.txt', JSON.stringify(res) + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Hacer la solicitud cada 30 segundos
setInterval(makeRequestAndSaveResponse, 1000);