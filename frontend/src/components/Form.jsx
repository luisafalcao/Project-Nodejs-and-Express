/* eslint-disable react/prop-types */
import { useRef } from "react";
import { toast } from 'react-toastify';
import "./Form.css"

export default function Form({ api }) {
    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const referencia = e.target.elements.referencia.value;
            const endereco = e.target.elements.endereco.value;
            const bairro = e.target.elements.bairro.value;
            const cidade = e.target.elements.cidade.value;
            const cep = e.target.elements.cep.value;
            const quartos = e.target.elements.quartos.value;
            const banheiros = e.target.elements.banheiros.value;
            const metragem = e.target.elements.metragem.value;

            const res = await api.post("/apartamentos/adicionar", {
                referencia,
                endereco,
                bairro,
                cidade,
                cep,
                quartos,
                banheiros,
                metragem
            })
                .then(response => {
                    if (response.headers['content-type'].includes('application/json')) {
                        console.log('Res:', response.data);
                    } else {
                        console.error('Formato da res:', response.headers['content-type']);
                    }
                    return response.data;
                })
                .catch(error => {
                    if (error.response) {
                        // erro sem ser 200
                        console.log('Erro: Res Data:', error.response.data);
                        console.log('Error: Res Status:', error.response.status);
                        console.log('Error: Res Headers:', error.response.headers);
                    } else if (error.request) {
                        // a requisição foi mas a resposta não
                        console.log('Erro na resposta:', error.request);
                    } else {
                        // algum erro na hora da requisição
                        console.log('Erro na requisição:', error.message);
                    }
                    console.log('Error Config:', error.config);
                })
            return res
        } catch (error) {
            toast.error(error)
        }
    };

    return (
        <><form onSubmit={handleSubmit} ref={ref} className="form">
            <div className="form-content">
                <div className="coluna">
                    <div className="input-group">
                        <label htmlFor="referencia">Referência</label>
                        <input type="text" name="referencia" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" name="endereco" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" name="bairro" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" name="cidade" />
                    </div>
                </div>
                <div className="coluna">
                    <div className="input-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" name="cep" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="quartos">Quartos</label>
                        <input type="text" name="quartos" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="banheiros">Banheiros</label>
                        <input type="text" name="banheiros" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="metragem">Metragem</label>
                        <input type="text" name="metragem" />
                    </div>
                </div>
            </div>

            <input type="submit" value="Enviar" className="botao" />
        </form>

            <hr /></>

    );

}
