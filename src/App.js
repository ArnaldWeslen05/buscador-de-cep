import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './service/api';
import './style.css';


function App(){

    const [input, setInput] = useState('')
    const [cep , setCep] = useState({})



    async function headleSearch(){
         
        if(input === ''){
            alert('precha o espaço vazio')
            return;
        }
        try{
            const response = await api.get(`${input}/json`);
          setCep(response.data)
          setInput("")
        }catch{

            alert("erro ao buscar");
            setInput("")
        }
    }
   

    return(
        <div className="container">
           <h1 className="title">Buscar CEP</h1>

           <div className="ContainerInput">
            <input type="text" placeholder="Digite seu cep..." value={input} onChange={(e)=> setInput (e.target.value)}/>

           <button className='buttonProcura'onClick={headleSearch} >
                <FiSearch size={25} color='#fff'/>
           </button>
           </div>
         

            {Object.keys(cep).length > 0 && (
                <main className='main'>
                    <h2>CEP: {cep.cep}</h2>
                    <span>{cep.logradouro}</span>
                    <span>{cep.bairro}</span>
                    <span>{cep.localidade} - {cep.uf}</span>
                    <span>DDD: {cep.ddd}</span>
               </main>
            )}
        </div>
    )

}
export default App;