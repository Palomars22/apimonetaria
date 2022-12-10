const cors = require("cors");
const express = require("express");
const app = express();
const axios = require("axios");
const port = 8080;

app.use(cors());

app.get("/exchangerate", async (req, res) => {
  let id = 2;
  const { data } = await axios(
    `https://economia.awesomeapi.com.br/json/list/USD-BRL/${id}`
  );

  let calculo = [];

  const diaHoje = (
    (parseFloat(data[0].high) + parseFloat(data[0].low)) /
    2
  ).toFixed(2);
  const diaOntem = (
    (parseFloat(data[1].high) + parseFloat(data[1].low)) /
    2
  ).toFixed(2);
  const media = ((parseFloat(diaHoje) + parseFloat(diaOntem)) / 2).toFixed(2);

  calculo = [
    {
      nome: `${data[0].code}-${data[0].codein}`,
      "highValue ": `R$ ${parseFloat(data[0].high).toFixed(2)}`,
      "lowValue ": `R$ ${parseFloat(data[0].low).toFixed(2)}`,
      "bid ": `R$ ${parseFloat(data[0].bid).toFixed(2)}`,
      "averageCurrentDay ": `R$ ${diaHoje}`,
      "averageLastTwoDays ": `R$  ${media}`,
    },
    {
      nome: `${data[0].code}-${data[0].codein}`,
      "highValue ": `R$ ${parseFloat(data[1].high).toFixed(2)}`,
      "lowValue ": `R$ ${parseFloat(data[1].low).toFixed(2)}`,
      "bid ": `R$ ${parseFloat(data[1].bid).toFixed(2)}`,
      "averageCurrentDay ": `R$ ${diaOntem}`,
      "averageLastTwoDays ": `R$  ${media}`,
    },
  ];

  return res.json(calculo);
});
app.listen(port, () => {
  console.log("conectado com sucesso na porta " + port);
});
