import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import validarBairro from '../model/bairroModel.js';

const fileName = fileURLToPath(import.meta.url)
const _dirname = dirname(fileName)
const bairrosFilePath = path.join(_dirname, '../model/bairros.json');

// LISTAR BAIRROS
function getBairrosPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile(bairrosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let bairros = JSON.parse(data)
                resolve(bairros)
            }
        })
    })
}

const getBairros = (req, res) => {
    getBairrosPromise()
        .then(bairros => res.status(200).json(bairros))
        .catch(err => res.status(500).send(err.message))
}

// ADICIONAR BAIRRO
function adicionarBairroPromise(bairro) {
    return new Promise((resolve, reject) => {
        fs.readFile(bairrosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let bairros = JSON.parse(data)

                if (bairros.some((ap) => ap.nome === bairro.nome) && bairros.some((ap) => ap.cidade === bairro.cidade)) {
                    reject(new Error('Bairro já existe'))
                } else {
                    const id = uuidv4()
                    const novoBairro = {
                        id,
                        ...bairro
                    }

                    bairros.push(novoBairro)
                    fs.writeFile(bairrosFilePath, JSON.stringify(bairros), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(novoBairro);
                        }
                    })
                }
            }
        })
    })
}

const adicionarBairro = (req, res) => {
    const bairro = req.body

    const validador = validarBairro(bairro)

    if (!validador.valid) {
        return res.status(400).json({ message: 'Dados inválidos', errors: validador.errors })
    } else {
        adicionarBairroPromise(bairro)
            .then(novoBairro => res.status(200).json(novoBairro))
            .catch(err => res.status(500).send(err.message))
    }
}

// EDITAR BAIRROS
function editarBairroPromise(id, bairro) {
    return new Promise((resolve, reject) => {
        fs.readFile(bairrosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                let bairros = JSON.parse(data)

                const index = bairros.findIndex(e => e.id === id)

                if (index === -1) {
                    reject(new Error('Bairro não encontrado'))
                } else {
                    const bairroEdicao = {
                        ...bairros[index],
                        ...bairro
                    }
                    bairros[index] = bairroEdicao

                    fs.writeFile(bairrosFilePath, JSON.stringify(bairros), (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(bairroEdicao)
                        }
                    })
                }
            }
        })
    })
}

const editarBairro = (req, res) => {
    const id = req.params.id
    const bairro = req.body

    editarBairroPromise(id, bairro)
        .then(bairroEdicao => res.status(200).json(bairroEdicao))
        .catch(err => res.status(500).send(err.message))
}


// DELETAR BAIRROS
function removerBairroPromise(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(bairrosFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let bairros = JSON.parse(data)

                const index = bairros.findIndex(e => e.id === id)

                if (index === -1) {
                    reject(new Error('Bairro não encontrado'))
                } else {
                    bairros.splice(index, 1)

                    fs.writeFile(bairrosFilePath, JSON.stringify(bairros), (err) => {
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

const removerBairro = (req, res) => {
    const id = req.params.id

    removerBairroPromise(id)
        .then(() => res.status(200).json({ message: 'Bairro removido' }))
        .catch(err => res.status(500).send(err.message))
}

export default { getBairros, adicionarBairro, editarBairro, removerBairro }