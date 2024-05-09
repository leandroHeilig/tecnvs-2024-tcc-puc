import styles from './style.module.scss'
import Head from "next/head"

import { canSSRAuth } from '@/utils/canSSRAuth'
import { Header } from '@/components/Header'

import { setupAPIClient } from '@/services/api'
import { useState, FormEvent, ChangeEvent } from 'react'

import { toast } from 'react-toastify'

type ItemProps = {
  id: string
  name: string
}

interface CategoryProps {
  categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {
  //console.log(categoryList);
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0)

  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState("")

  function handleChangeCategory(event) {
    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    try {

      if (name === ' ' || price === '') {
        toast.warning('Preencha todos os campos')
        return
      }

      const apiClient = setupAPIClient();
      await apiClient.post("/product", {
        description: name,
        price: price,
        category_id: categories[categorySelected].id,
      });

      toast.success("Produto cadastrado com sucesso");
      
      
    } catch (error) {
      console.log(error)
      toast.error('Falha ao cadastrar o registro.')
    }

    setName("");
    setPrice("");
    
  }

  return (
    <>
      <Head>
        <title>Novo Produto/ Serviço</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Produto ou Serviço</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              className={styles.input}
              placeholder="Digite o nome do Produto / Serviço"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            <input
              type="text"
              className={styles.input}
              placeholder="Digite o preço do Produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/category')
  //console.log(response.data)
  return {
    props: {
      categoryList: response.data
    }
  }
})