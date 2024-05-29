import { useState, ReactNode } from 'react'
import Modal from 'react-modal'
import { canSSRAuth } from '@/utils/canSSRAuth'
import Head from 'next/head'
import styles from './style.module.scss'
import { ModalAppointment } from '@/components/ModalAppointment'

import { Header } from '@/components/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '@/services/api'

type CustomerDetails = {
  name: string;
  email: string;
}

type AppointmentProps = {
  id: string;
  description: string;
  start: string;
  closure: string;
  serviceId: string;
  customerId: string;
  status: boolean;
  customer: {
    id: string;
    name: string;
    email: string;
  }
}

export type AppointmentItemProps = {
  id: string;
  appointment_id: string;
  service_id: string;
  description: string;
  service: {
    id: string;
    description: string;
    price: number;
  };
  appointments: {
    id: string;
    description: string;
    start: string;
    close: string;    
  }
};

interface HomeProps {
  appointments: AppointmentProps[];
}

export default function Dashboard({ appointments }: HomeProps) {
  const [appointmentList, setAppointmentList] = useState(appointments || [])
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails[]>()

  const [modalItem, setModalItem] = useState<AppointmentItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

   appointmentList.map((item) => {
    console.log('Leandro',item.customerId)
  })
  
  function handleCloseModal() {
    setModalVisible(false)
  }  

  async function handleCustomerDetail(customer_id: string) {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/customer/detail", {
      params: {
        customer_id: customer_id,
      },      
    })

    setCustomerDetails(response.data);
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

  async function handleAprove(id: string) {
    //alert('Aprovar OS: '+id)
    const apiClient = setupAPIClient()
    await apiClient.put("/appointment/approval", {
      appointment_id: id
    })

    const response = await apiClient.get("/appointment")
    setAppointmentList(response.data)

    setModalVisible(false)
  }

  async function handleRefresh() {
    const apiClient = setupAPIClient()
    const response = await apiClient.get("/appointment");
    setAppointmentList(response.data);
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
              <FiRefreshCcw size={25} color="#0000ff" onClick={handleRefresh} />
            </button>
          </div>
          <article className={styles.listAppointments}>
            {appointmentList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum apontamento / ordem de serviço pendente de aprovação...
              </span>
            )}

            {appointmentList.map( (item) => (
              
              <section key={item.id} className={styles.item}>
               
                <button
                  onClick={() => {
                    handleOpenModalView(item.id);
                    console.log(item);
                  }}
                >
                  <div className={styles.tag}></div>

                  <span>{item.description}</span>
                  <span>{item?.customer?.email}</span>    

               
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
            handleAproveOrder={handleAprove}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/appointment");
 //console.log('apontamento',response.data)
  return {
    props: {
      appointments: response.data
    },
  };  
})