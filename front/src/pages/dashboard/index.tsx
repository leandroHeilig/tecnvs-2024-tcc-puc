import { useState } from 'react'
import Modal from 'react-modal'
import { canSSRAuth } from '@/utils/canSSRAuth'
import Head from 'next/head'
import styles from './style.module.scss'
import { ModalAppointment } from '@/components/ModalAppointment'

import { Header } from '@/components/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '@/services/api'

type AppointmentProps = {
  id: string;
  description: string;
  start: string;
  closure: string;
  serviceId: string;
  customerId: string;
  status: boolean;
}

export type AppointmentItemProps = {
  id: String;
  description: string;
  start: string;
  closure: string;
  serviceId: string;
  customerId: string;
  status: boolean;
};

interface HomeProps {
  appointments: AppointmentProps[];
}

export default function Dashboard({ appointments }: HomeProps) {
  const [appointmentList, setAppointmentList] = useState(appointments || [])

  const [modalItem, setModalItem] = useState<AppointmentItemProps>();
  const [modalVisible, setModalVisible] = useState(false)
  
  function handleCloseModal() {
    setModalVisible(false)
  }  

  async function handleOpenModalView(appointment_id: string) {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/appointment/detail", {
      params: {
        appointment_id: appointment_id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  Modal.setAppElement('#__next')

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
              <section key={item.id} className={styles.item}>
                <button
                  onClick={() => {
                    handleOpenModalView(item.id);
                  }}
                >
                  <div className={styles.tag}></div>
                  <span>{item.id}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible && (
          <ModalAppointment
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            appointment={modalItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/appointment");
 // console.log(response.data)
  return {
    props: {
      appointments: response.data
    },
  };  
})