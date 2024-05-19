import express from "express";

import bairroController from "../controller/bairroFileController.js";

const router = express.Router()

router.get('/', bairroController.getBairros)
router.post('/adicionar', bairroController.adicionarBairro)
router.put('/:id', bairroController.editarBairro)
router.delete('/:id', bairroController.removerBairro)

export default router