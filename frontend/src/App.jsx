import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Form from "./components/Form.jsx";
import Grid from "./components/Grid.jsx";

function App() {
  const [apartamentos, setApartamentos] = useState([])

  const api = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: {
      'Accept': 'application/json'
    }
  })

  const getApartamentos = async () => {

    try {
      const res = await api.get("/apartamentos", {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      })
        .then(response => {
          if (response.headers['content-type'].includes('application/json')) {
            // console.log('Res:', response.data);
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
      setApartamentos(res)
    } catch (error) {
      toast.error(error)
    }

  }

  useEffect(() => {
    getApartamentos()
  }, [setApartamentos])

  return (
    <>
      <div className='container'>
        <h2> Lista de Apartamentos </h2>
        <Form api={api} />
        <Grid apartamentos={apartamentos} api={api} />
      </div>

      <ToastContainer autoClose={4000} />
    </>
  )
}

export default App
