import styles from "./style.module.scss";
import Head from "next/head";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";

import { setupAPIClient } from "@/services/api";
import { useState, FormEvent, ChangeEvent } from "react";

import { toast } from "react-toastify";
import { TextArea} from '@/components/ui/Input'

interface OrderProps {
  customerList: ItemCustomer[];
  serviceList: ItemService[]
}

type ItemCustomer = {
  id: string;
  name: string;
}

type ItemService = {
  id: string;
  description: string;
};


export default function Order({ customerList, serviceList }: OrderProps) {

  const [customers, setCustomers] = useState(customerList || []);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [services, setServices] = useState(serviceList || []);
  const [serviceSelected, setserviceSelected] = useState(0);

  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [clouser, setClouser ] = useState("");
  const [status, setStatus] = useState(false);
  const [customer, setCustomer] = useState(0);
  const [user, setUser] = useState("");

  console.log(user)

  function handleChangeCustomer(event) {
    setCustomerSelected(event.target.value);
  }

  function handleChangeService(event) {
    setserviceSelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      if (
        description === " " ||
        start === "" ||
        clouser === ""  
      ) {
        toast.warning("Preencha todos os campos")      
        
        return;
      }

      const apiClient = setupAPIClient();
      const appointement = await apiClient.post("/appointment", {
        description: description,
        start: start,
        clouser: clouser,
        status: status,
        customerId: customers[customerSelected].id,
      });

      console.log(appointement.data.id)

      // grava item da OS

      if (appointement) {
        const itemService = await apiClient.post("/Appointment/add", {
          appointment_id: appointement.data.id,
          service_id: services[serviceSelected].id,
          amount:1
        });
      }

      toast.success("OS aberta com sucesso");

    } catch (error) {
      console.log(error);
      toast.error("Falha ao cadastrar o registro.");
    }

    setDescription("");
    setStart("");
    setClouser("");
    setStatus(false)
    setCustomer(0);
    setCustomerSelected(0);
  }

  return (
    <>
      <Head>
        <title>Abertura de Apontamento</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Apontamento</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <p>Selecione o Cliente</p>
            <select value={customerSelected} onChange={handleChangeCustomer}>
              {customers.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <select value={serviceSelected} onChange={handleChangeService}>
              {services.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.description}
                  </option>
                );
              })}

            </select>
            <textarea
              placeholder="Descreva as atividades realizadas..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Hora de Inicio"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Hora de Finalização"
              value={clouser}
              onChange={(e) => setClouser(e.target.value)}
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
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/customer");
  const services = await apiClient.get("/product");

  return {
    props: {
      customerList: response.data,
      serviceList: services.data
    },
  };
});
