import express from "express";
import cors from 'cors'

import apartamentoRoutes from "./src/routes/apartamentoRoutes.js";
import bairroRoutes from "./src/routes/bairroRoutes.js";

const app = express();

const host = "127.0.0.1"
const port = 3000

app.use(express.json());
app.use('/apartamentos', apartamentoRoutes)
app.use('/bairros', bairroRoutes)

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js")
})

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`)
})
