import { Validator } from 'jsonschema';
const validator = new Validator()

const bairroSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        nome: { type: "string" },
        cidade: { type: "string" },
    },
    // "required": ['nome']
}

const validarBairro = e => {
    return validator.validate(e, bairroSchema)
}

export default validarBairro