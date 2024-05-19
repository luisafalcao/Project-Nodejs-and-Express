import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import validarApartamento from '../model/apartamentoModel.js';
import bairroController from './zzzbairroController.js'

const fileName = fileURLToPath(import.meta.url)
const _dirname = dirname(fileName)
const apartamentosFilePath = path.join(_dirname, '../model/apartamentos.json');

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

    adicionarApartamentoPromise(apartamento)
        .then(novoApartamento => res.status(200).json(novoApartamento))
        .catch(err => res.status(500).send(err.message))
}

// EDITAR APARTAMENTOS
function editarApartamentoPromise(id, apartamento) {
    return new Promise((resolve, reject) => {
        fs.readFile(apartamentosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let apartamentos = JSON.parse(data)

                const index = apartamentos.findIndex(e => e.id === id)

                if (index === -1) {
                    reject(new Error('Apartamento não encontrado'))
                } else {
                    const apartamentoEdicao = {
                        ...apartamentos[index],
                        ...apartamento
                    }
                    apartamentos[index] = apartamentoEdicao

                    fs.writeFile(apartamentosFilePath, JSON.stringify(apartamentos), (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(apartamentoEdicao)
                        }
                    })
                }
            }
        })
    })
}

const editarApartamento = (req, res) => {
    const id = req.params.id
    const apartamento = req.body

    editarApartamentoPromise(id, apartamento)
        .then(apartamentoEdicao => res.status(200).json(apartamentoEdicao))
        .catch(err => res.status(500).send(err.message))
}


// DELETAR APARTAMENTOS
function removerApartamentoPromise(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(apartamentosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let apartamentos = JSON.parse(data)

                const index = apartamentos.findIndex(e => e.id === id)

                if (index === -1) {
                    reject(new Error('Apartamento não encontrado'))
                } else {
                    apartamentos.splice(index, 1)

                    fs.writeFile(apartamentosFilePath, JSON.stringify(apartamentos), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                }

            }
        })
    })
}

const removerApartamento = (req, res) => {
    const id = req.params.id

    removerApartamentoPromise(id)
        .then(() => res.status(200).json({ message: 'Apartamento removido' }))
        .catch(err => res.status(500).send(err.message))
}

export default { getApartamentos, adicionarApartamento, editarApartamento, removerApartamento }