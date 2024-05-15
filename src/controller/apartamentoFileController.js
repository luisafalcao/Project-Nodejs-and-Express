import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import bairroController from './bairroController.js'
import validarApartamento from '../model/apartamentoModel.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const apartamentosFilePath = path.join(__dirname, '../model/apartamentos.json');

// LISTAR APARTAMENTOS
function getApartamentosPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile(apartamentosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let apartamentos = JSON.parse(data)
                resolve(apartamentos)
            }
        })
    })
}

const getApartamentos = (req, res) => {
    getApartamentosPromise()
        .then(apartamentos => res.status(200).json(apartamentos))
        .catch(err => res.status(500).send(err.message))
}

// ADICIONAR APARTAMENTO
function adicionarApartamentoPromise(apartamento) {
    return new Promise((resolve, reject) => {
        fs.readFile(apartamentosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let apartamentos = JSON.parse(data)

                if (apartamentos.some(ap => ap.referencia === apartamento.referencia)) {
                    reject(new Error('Apartamento já existe'))
                }

                const id = uuidv4()
                const novoApartamento = {
                    id,
                    ...apartamento
                }

                apartamentos.push(novoApartamento)

                fs.writeFile(apartamentosFilePath, JSON.stringify(apartamentos), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(novoApartamento);
                    }
                })
            }
        })
    })
}

const adicionarApartamento = (req, res) => {
    const apartamento = req.body

    const validador = validarApartamento(apartamento)

    if (!validador.valid) {
        return res.status(400).json({ message: 'Dados inválidos', errors: validador.errors })
    }

    if (!bairroController.bairros.includes(apartamento.bairro)) {
        return res.status(404).json({ message: 'Bairro não existe' })
    }

    adicionarApartamentoPromise(apartamento)
        .then(novoApartamento => res.status(200).json(novoApartamento))
        .catch(err => res.status(500).send(err.message))
}
export default { getApartamentos, adicionarApartamento }

