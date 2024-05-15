import { v4 as uuidv4 } from 'uuid';
import bairroController from "./bairroController.js";
import validarApartamento from '../model/apartamentoModel.js';

let apartamentos = []

const getApartamentos = (req, res) => {
    res.status(200).json(apartamentos)
}

const adicionarApartamento = (req, res) => {
    const apartamento = req.body

    try {
        const validador = validarApartamento(apartamento)
        if (!validador.valid) {
            return res.status(400).json({ message: 'Dados inválidos', errors: validador.errors })
        }
        if (apartamentos.some(apartamento => apartamento.endereco === req.body.endereco)) {
            return res.status(400).json({ message: "Apartamento já existe" })
        }
        if (!bairroController.bairros.includes(apartamento.bairro)) {
            return res.status(404).json({ message: "Bairro Inválido" })
        }
        apartamento.id = uuidv4()
        apartamentos.push(apartamento)
        res.status(200).json(apartamento)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro no servidor" })
    }
}

const editarApartamento = (req, res) => {
    const id = req.params.id
    const apartamento = req.body

    try {
        const index = apartamentos.findIndex(apartamento => apartamento.id === id)
        if (index === -1) {
            return res.status(404).json({ message: "Apartamento não encontrado" })
        }
        apartamentos[index] = {
            ...apartamentos[index],
            ...apartamento
        }
        res.status(200).json(apartamentos[index])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro no servidor' })
    }
}

const excluirApartamento = (req, res) => {
    const id = req.params.id

    try {
        const index = apartamentos.findIndex(apartamento => apartamento.id === id)
        if (index === -1) {
            return res.status(404).json({ message: 'Apartamento não encontrado' })
        }
        apartamentos.splice(index, 1)
        res.status(200).json({ message: 'Apartamento excluido' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro no servidor' })
    }
}

export default { getApartamentos, adicionarApartamento, editarApartamento, excluirApartamento }