// import { useState, useEffect } from 'react'
// import listaImg from '../assets/modified_image.png'
// import { Header } from './Header.jsx'
// import { Footer } from './Footer.jsx'

// import Axios from 'axios'

// import styles from '../styles/content.module.css'

// export function Content() {
//   const [repositories, setRepositories] = useState([])
//   const [nome, setNome] = useState('')
//   const [resumo, setResumo] = useState('')
//   const [autor, setAutor] = useState('')
//   const [imagem, setImagem] = useState('')
//   const [nota, setNota] = useState('')
//   const [success, setSuccess] = useState(false)
//   const baseURL = 'https://nodejs-livros.onrender.com/livros'

//   useEffect(() => {
//     async function getData() {
//       const response = await Axios.get(baseURL)
//       setRepositories(response.data)
//     }
//     getData()
//   }, [])

//   function handleInputValueNome(event) {
//     setNome(event.target.value)
//   }

//   function handleInputValueResumo(event) {
//     setResumo(event.target.value)
//   }

//   function handleInputValueImagem(event) {
//     setImagem(event.target.value)
//   }

//   function handleInputValueAutor(event) {
//     setAutor(event.target.value)
//   }

//   function handleInputValueNota(event) {
//     setNota(event.target.value)
//   }

//   function handleCreateMessage(event) {
//     event.preventDefault()

//     console.log('mensagem enviada', nome, resumo, autor, imagem, nota)

//     async function sendData() {
//       await Axios.post(baseURL, {
//         nome: nome,
//         resumo: resumo,
//         autor: autor,
//         imagem: imagem,
//         nota: nota
//       })
//       const response = await Axios.get(baseURL)
//       setRepositories(response.data)
//     }
//     sendData()

//     setSuccess(true)
//     setNome('')
//     setImagem('')
//     setResumo('')
//     setAutor('')
//     setNota('')
//   }

//   return (
//     <>
//       <Header
//         title='Gerenciador de leituras'
//         subtitle='Cadastre suas leituras e se divirta!'
//         image={listaImg}
//       />
//       <div className={styles.projectsContainer}>
//         <div className={styles.projectsContainer}>
//           <div className={styles.cardsRepoContainer}>
//             {repositories.map((repo) => {
//               return(
//                 <div key={repo._id} className={styles.cardRepo}>
//                 <div className={styles.cardImgContainer}>
//                   <img className={styles.cardRepoImage} src={repo.imagem} />
//                 </div>
//                 <details>
//                   <summary className={styles.cardRepoSummary}>
//                     {repo.nome}
//                   </summary>
//                   <p className={styles.cardRepoText}>{repo.minibio}</p>
//                   <q className={styles.cardRepoQuote}>{repo.citacao}</q>
//                 </details>
//               </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//       <div >
//         <h2 className={styles.projectsTitle}>Cadastre um livro:</h2>
//         <form  className={styles.form} onSubmit={handleCreateMessage}>
//           <input 
//             onChange={handleInputValueNome} 
//             placeholder="Digite o nome"
//             value={nome}
//             className={styles.formInput}
//           />
//           <textarea 
//             onChange={handleInputValueImagem} 
//             placeholder="Digite o link da imagem"
//             value={imagem}
//             className={styles.formTextArea}
//           />
//           <textarea 
//             onChange={handleInputValueAutor} 
//             placeholder="Digite o autor"
//             value={autor}
//             className={styles.formTextArea}
//           />
//           <textarea 
//             onChange={handleInputValueResumo} 
//             placeholder="Digite o resumo"
//             value={resumo}
//             className={styles.formTextArea}
//           />
//           <textarea 
//             onChange={handleInputValueNota} 
//             placeholder="Digite a nota"
//             value={nota}
//             className={styles.formTextArea}
//           />
//           <button className={styles.formButton} type="submit">Enviar</button>
//           {success && <p>Cadastro realizado com sucesso.</p>}
//         </form>
//       </div>
//       <Footer />
//     </>
//   )
// }
import { useState, useEffect } from 'react'
import listaImg from '../assets/modified_image.png'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [resumo, setResumo] = useState('')
  const [autor, setAutor] = useState('')
  const [imagem, setImagem] = useState('')
  const [nota, setNota] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://nodejs-livros.onrender.com/livros'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL);
      console.log("Dados recebidos:", response.data); // Verifica o primeiro item
      setRepositories(response.data);
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueResumo(event) {
    setResumo(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueAutor(event) {
    setAutor(event.target.value)
  }

  function handleInputValueNota(event) {
    setNota(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', nome, resumo, autor, imagem, nota)

    async function sendData() {
      await Axios.post(baseURL, {
        nome: nome,
        resumo: resumo,
        autor: autor,
        imagem: imagem,
        nota: nota
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setImagem('')
    setResumo('')
    setAutor('')
    setNota('')
  }
  
  // Função para remover livro
  async function handleRemove(id) {
    // Verifica se recebeu um ID válido
    if (!id) {
      console.error("ID inválido:", id);
      return;
    }
  
    try {
      console.log("Tentando remover livro com ID:", id);
      await Axios.delete(`${baseURL}/${id}`);
      
      // Atualiza a lista após remover
      const response = await Axios.get(baseURL);
      setRepositories(response.data);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao remover livro:", error);
      alert('Erro ao remover o livro. Tente novamente.');
    }
  }

  return (
    <>
      <Header
        title='Gerenciador de leituras'
        subtitle='Cadastre suas leituras e se divirta!'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => (
              <div key={repo._id} className={styles.cardRepo}>
                <div>
                  <h3>{repo.nome}</h3>
                </div>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.imagem} />
                </div>
                <div>
                  <p className={styles.cardRepoText}>
                    <strong>Autor:</strong> {repo.autor}
                  </p>
                </div>
                <div>
                  <p className={styles.cardRepoSummary}>
                    <strong>Resumo:</strong> {repo.resumo}
                  </p>
                </div>
                <div>
                  <p className={styles.cardRepoQuote}>
                    <strong>Nota:</strong> {repo.nota}
                  </p>
                </div>
                <button 
                  onClick={() => handleRemove(repo._id)} 
                  className={styles.removeTask}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.projectsTitle}>Cadastre um livro:</h2>
        <form className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueNome} 
            placeholder="Digite o nome"
            value={nome}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueImagem} 
            placeholder="Digite o link da imagem"
            value={imagem}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueAutor} 
            placeholder="Digite o autor"
            value={autor}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueResumo} 
            placeholder="Digite o resumo"
            value={resumo}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueNota} 
            placeholder="Digite a nota"
            value={nota}
            className={styles.formTextArea}
            type="number"
            min="0" 
            max="10"
            step="0.1"
          />
          <button className={styles.formButton} type="submit">Enviar</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}