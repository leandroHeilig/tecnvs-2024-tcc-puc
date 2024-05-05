import { useState, FormEvent } from 'react'
import Head from 'next/head'
import styles from './style.module.scss'

import { setupAPIClient } from '@/services/api'

import { Header } from '@/components/Header'
import { toast } from 'react-toastify'

import { canSSRAuth } from '@/utils/canSSRAuth'

export default function Category() {

  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()
    //alert('Categoria'+ name)
    if (name === '') {
      return
    }

    const apiClient = setupAPIClient()
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso')
    setName('')
  }

  return (
    <>
      <Head>
        <title>Tecnvs - Nova Categoria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastro de Categorias</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da Categoria"
              className={styles.input}
              value={name}
              onChange={ (e) => setName(e.target.value)}
            />
            <button className={ styles.buttonAdd} type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})