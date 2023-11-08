# Use an official Node.js runtime as a parent image
FROM node:18.18-alpine

# Set the working directory to /app
WORKDIR /app/p2p-tracker

# Copy the current directory contents into the container at /app
COPY ./src/operations /app/p2p-tracker/src/operations
COPY ./src/main.js /app/p2p-tracker/src/main.js
COPY package.json /app/p2p-tracker/package.json
COPY package-lock.json /app/p2p-tracker/package-lock.json


# Install any needed packages specified in package.json
RUN npm install

# Define environment variable
ENV NODE_ENV=production
    #Tiempo limite que se espera a que la solicitud a la api de binance responda
ENV TIMEOUT=5000
    #url del HOST de binance
ENV BINANCE_HOST=https://p2p.binance.com 
    #path del endpoint que tiene los datos monitoreados
ENV BINANCE_P2P_ENDPOINT=/bapi/c2c/v2/friendly/c2c/adv/search 
    #moneda fiat
ENV FIAT=ARS 
    #tipo de transaccion BUY, SELL
ENV TRADE_TYPE=BUY 
    #la moneda objetivo USDT
ENV ASSET=USDT 
    #Un solo medio de pago
ENV PAYMENT_TYPE=MercadoPagoNew 
ENV SHOW_DATE_TIME=FALSE
# Run the app when the container launches
CMD ["npm", "start"]
