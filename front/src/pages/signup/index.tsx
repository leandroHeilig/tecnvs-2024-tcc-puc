import { useState, FormEvent, useContext } from 'react'
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/home.module.scss";
import logoImg from "../../../public/logo-2-branco.png";


import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from '@/contexts/AuthContext'


export default function SignUp() {
  
  const { signUp } = useContext(AuthContext)

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      alert('Por favor, preencha todos os campos')
      return
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);
  }
  
  return (
    <>
      <Head>
        <title>Crie a sua conta</title>
      </Head>
      <div className={styles.containerCenter}>
        <Link href="/">
          <Image src={logoImg} alt="Logo site" />
        </Link>

        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form onSubmit={ handleSignUp }>
            <Input
              placeholder="Digite o seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite o seu e-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Informa a sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
