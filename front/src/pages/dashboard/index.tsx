import { useState } from 'react'
import { canSSRAuth } from '@/utils/canSSRAuth'
import Head from 'next/head'
import styles from './style.module.scss'

import { Header } from '@/components/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '@/services/api'

type ItemProps = {
  id: String;
  description: string;
  start: string;
  closure: string;
  serviceId: string
  customerId: string
  status: boolean
}

interface HomeProps {
  appointments: ItemProps[]
}

export default function Dashboard({ appointments }: HomeProps) {

  const [appointmentList, setAppointmentList] = useState(appointments || [])

  function handleOpenModalView(id: string) {
    alert('ID Clicado: '+id)
  }

  return (
    <>
      <Head>
        <title>Tecnvs - Dashboard</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ordens de Serviço</h1>
            <button>
              <FiRefreshCcw size={25} color="#0000ff" />
            </button>
          </div>
          <article className={styles.listAppointments}>
            {appointmentList.map((item) => (
              <section key={item.id as string} className={styles.item}>
                <button onClick={ () => {handleOpenModalView(item.id as string)}}>
                  <div className={styles.tag}></div>
                  <span>{ item.description }</span>
                </button>
              </section>
            ))}
          </article>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/appointment");
  //console.log(response.data)
  return {
    props: {
      appointments: response.data
    },
  };  
})