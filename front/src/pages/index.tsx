import { useContext, FormEvent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/home.module.scss'

import logoImg from '../../public/logo-2-branco.png'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    
    let data = {
      email: 'test@teste.com.br',
      password:'123456'
    }

    await signIn(data);
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
            <Input placeholder="Digite o seu e-mail" type="text" />
            <Input placeholder="Informa a sua senha" type="password" />
            <Button type="submit" loading={false}>
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
