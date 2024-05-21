/* eslint-disable react/prop-types */
import { FaTrash, FaEdit } from "react-icons/fa";
// import { toast } from 'react-toastify';
import "./Grid.css"

export default function Grid({ apartamentos, api }) {
  // const handleClick = async (e) => {

  //   const type = e.target.parentElement.parentElement.id
  //   const id
  //   try {
  //     const res = await api.delete(`/apartamentos/${id}`)
  //       .then(response => {
  //         if (response.headers['content-type'].includes('application/json')) {
  //           console.log('Res:', response.data);
  //         } else {
  //           console.error('Formato da res:', response.headers['content-type']);
  //         }
  //         return response.data;
  //       })
  //       .catch(error => {
  //         if (error.response) {
  //           // erro sem ser 200
  //           console.log('Erro: Res Data:', error.response.data);
  //           console.log('Error: Res Status:', error.response.status);
  //           console.log('Error: Res Headers:', error.response.headers);
  //         } else if (error.request) {
  //           // a requisição foi mas a resposta não
  //           console.log('Erro na resposta:', error.request);
  //         } else {
  //           // algum erro na hora da requisição
  //           console.log('Erro na requisição:', error.message);
  //         }
  //         console.log('Error Config:', error.config);
  //       })
  //     return res
  //   } catch (error) {
  //     toast.error(error)
  //   }
  // }

  return (
    <div className="apartamento-grid">
      {apartamentos.map(apartamento => (
        <div className="apartamento" key={apartamento.id}>
          <h3>{apartamento.referencia}</h3>
          <p><strong>Endereço:</strong> {apartamento.endereco}</p>
          <p><strong>Bairro:</strong> {apartamento.bairro}</p>
          <p><strong>Cidade:</strong> {apartamento.cidade}</p>
          <p><strong>CEP:</strong> {apartamento.cep}</p>
          <p><strong>Quartos:</strong> {apartamento.quartos}</p>
          <p><strong>Banheiros:</strong> {apartamento.banheiros}</p>
          <p><strong>Metragem:</strong> {apartamento.metragem} m<sup>2</sup></p>

          <div className="icon-container">
            <div id="editar">
              <FaEdit className="edit-icon" />
            </div>
            <div id="editar">
              <FaTrash className="delete-icon" />
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>

  );
}
