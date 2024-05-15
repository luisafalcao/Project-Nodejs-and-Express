import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const apartamentosFilePath = path.join(__dirname, '../model/apartamentos.json');

// GET
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

export default { getApartamentos }