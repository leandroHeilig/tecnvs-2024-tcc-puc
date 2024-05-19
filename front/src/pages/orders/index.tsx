import styles from "./style.module.scss";
import Head from "next/head";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";

import { setupAPIClient } from "@/services/api";
import { useState, FormEvent, ChangeEvent } from "react";

import { toast } from "react-toastify";

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
  name: string;
};



export default function Order({ customerList, serviceList }: OrderProps) {

  const [customers, setCustomers] = useState(customerList || []);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [services, setServices] = useState(serviceList || []);
  const [serviceSelected, setserviceSelected] = useState(0);

  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [clouser, setClousre] = useState("");
  const [status, setStatus] = useState(false);
  const [customer, setCustomer] = useState("");
  const [user, setUser] = useState("");

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
        clouser === "" ||
        customer === "" ||
        user === ""
      ) {
        toast.warning("Preencha todos os campos");
        return;
      }

      const apiClient = setupAPIClient();
      await apiClient.post("/appointment", {
        description: description,
        start: start,
        clouser: clouser,
        status: status,
        customerId: customers[customerSelected].id,

      });

      toast.success("OS aberta com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao cadastrar o registro.");
    }

    setDescription("");
    setStart("");
    setClousre('')
    setStatus(false)
    setCustomer('');
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
            <select value={customerSelected} onChange={handleChangeCustomer}>
              {customers.map((item, index) => {
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
              placeholder="Digite suas atividades"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

  return {
    props: {

    },
  };
});
