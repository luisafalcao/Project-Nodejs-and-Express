import express from "express";

import apartamentoController from "../controller/apartamentoFileController.js";

const router = express.Router()

router.get('/', apartamentoController.getApartamentos)
router.post('/adicionar', apartamentoController.adicionarApartamento)
router.put('/:id', apartamentoController.editarApartamento)
router.delete('/:id', apartamentoController.removerApartamento)

export default router