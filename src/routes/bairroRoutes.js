import express from "express";
import bairroController from "../controller/bairroController.js";

const router = express.Router()

router.get('/', bairroController.getBairros)
router.post('/adicionar', bairroController.adicionarBairro)
router.delete('/:id', bairroController.excluirBairro)

export default router