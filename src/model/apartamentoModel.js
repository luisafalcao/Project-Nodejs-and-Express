import { Validator } from 'jsonschema';
const validator = new Validator()

const apartamentoSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        referencia: { type: "string" },
        endereco: { type: "string" },
        bairro: { type: "string" },
        quartos: { type: "number" },
        banheiros: { type: "number" },
        metragem: { type: "number" }
    },
    "required": ['referencia', 'endereco', 'bairro']
}

const validarApartamento = e => {
    return validator.validate(e, apartamentoSchema)
}

export default validarApartamento