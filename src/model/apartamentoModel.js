import { Validator } from 'jsonschema';
const validator = new Validator()

const apartamentoSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        referencia: { type: "string" },
        endereco: { type: "string" },
        bairro: { type: "string" },
        cidade: { type: "string" },
        cep: { type: "string" },
        quartos: { type: "string" },
        banheiros: { type: "string" },
        metragem: { type: "string" }
    }
}

const validarApartamento = e => {
    return validator.validate(e, apartamentoSchema)
}

export default validarApartamento