import styles from './style.module.scss'
import Head from "next/head"

import { canSSRAuth } from '@/utils/canSSRAuth'
import { Header } from '@/components/Header'

import { setupAPIClient } from '@/services/api'
import { useState } from 'react'

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

  function handleChangeCategory(event) {
    setCategorySelected(event.target.value);
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
          <form className={styles.form}>
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
              placeholder="Digite a descição do Produto"
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Digite o preço do Produto"
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