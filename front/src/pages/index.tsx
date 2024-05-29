import { useContext, useState, FormEvent } from 'react'
//import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from "./home.module.scss";

import logoImg from '../../public/logo-2-branco.png'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { canSSRGuest } from '@/utils/canSSRGuest'

import { AuthContext } from '@/contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      alert('Preencha os dados para realizar o Login')
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Portal do Analista</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo site" />
        <div className={styles.login}>
          <h1>Portal do Analista</h1>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite o seu e-mail"
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Informa a sua senha"
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Login
            </Button>
          </form>
          <Link href="/signup" legacyBehavior>
            <span className={styles.text}>
              Não possui uma conta? cadastre-se
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props:{}
  }
})
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('teste SERVER SIDE PROPS')
  return {
    props: {}
  }
}
*/
