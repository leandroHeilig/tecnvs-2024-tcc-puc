import styles from "./style.module.scss"
import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { setupAPIClient } from "@/services/api";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";

export default function Customer() {

  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [address, setAddress] = useState('')
  
  async function handleRegister(event: FormEvent) {
     event.preventDefault();
     
     if (name === "" || phone ==='' || address=== '' ) {
       return;
     }

     const apiClient = setupAPIClient();
     await apiClient.post("/customer", {
       name: name,
       phone: phone,
       email: email,
       address: address,
     });

     toast.success("Cliente cadastrado com sucesso");
    setName('')
    setPhone('')
    setEmail('')
    setAddress('')
  }

  return (
    <>
      <Head>Novo Cliente</Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Cliente</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome do cliente"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite o telefone do cliente"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite o e-mail do cliente"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite endereço do cliente"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
  return {
    props: {},
  }
})

