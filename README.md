# p2p-tracker
Este repositorio lanza una request cada 6 segundos (default) a la api del p2p de binance y lo guarda en un txt. La request trae los valores del USDT en ARS de los ultimos 10 vendedores por mercado pago. Estos valores son predeterminados pero se pueden modificar por terminal.

Un ejemplo, ARS/USDT:
```
2023-11-08 16:11:28 > binance-track-dolar-cripto@1.0.0 start
2023-11-08 16:11:28 > node src/main.js
2023-11-08 16:11:28 
2023-11-08 16:11:35 853.00, 853.00, 853.80, 853.85, 853.93, 853.94, 854.00, 854.80, 854.90, 854.99, 
2023-11-08 16:12:47 853.00, 853.80, 853.85, 853.93, 853.94, 854.00, 854.80, 854.90, 854.99, 855.00, 
2023-11-08 16:12:53 853.00, 853.73, 853.78, 853.80, 853.85, 853.93, 853.94, 854.00, 854.80, 854.90,
```

## Como instalarlo
El repositorio se encuentra en docker hub **https://hub.docker.com/repository/docker/alderetesergio/p2p-tracker/general** 

Tambien podes usar y correrlo:

```
docker pull alderetesergio/p2p-tracker
```

## Como ejecutarlo

Directamente desde el docker, en la imagen. RUN

## Valores de entorno por defecto

Tenemos los siguientes valores env:
- Tiempo limite que se espera a que la solicitud a la api de binance responda, en milisegundos.
```
ENV TIMEOUT=5000
```
- Moneda fiat (ARS, USD, etc)
```
ENV FIAT=ARS 
```
- Tipo de transaccion BUY, SELL (Sin importar si usas buy o sell, siempre muestra los valores de BUY)
```
ENV TRADE_TYPE=BUY 
```
- La moneda objetivo USDT
```
ENV ASSET=USDT 
```
- El medio de pago, solo funciona uno a la vez.
```
ENV PAYMENT_TYPE=MercadoPagoNew 
```
- TRUE para imprimir fecha y hora (gmt-3), FALSE para no hacerlo
```
ENV SHOW_DATE_TIME=FALSE
``` 


## Como configurar las variables de entorno
- Usando la opción -e al ejecutar el contenedor para definir variables de entorno. Por ejemplo, al querer cambiar el tipo de FIAT por USD:
```
docker run -e FIAT=USD alderetesergio/p2p-tracker
```

Si se cambia el valor FIAT, deberia cambiarse tambien el metodo de pago. Ya que es improbable encontrar USD/CYN por mercado pago.

Les dejo una lista de algunos de los metodos de pago en Argentina.
- Bru bank ("BancoBrubankNew")
- Lemon Cash ("LemonCash")
- Transferencia Bancaria Argentina ("BankArgentina")
- Uala ("UalaNew")
- Naranja X ("NaranjaX")
- Todos los metodos de pago ("")