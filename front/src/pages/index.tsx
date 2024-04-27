import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'

import logoImg from '../../public/logo-2-branco.png'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>Portal do Analista</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo site" />
        <div className={styles.login}>
          <Input placeholder="Digite o seu e-mail" type='text' />
          <Input placeholder="Informa a sua senha" type='password' />
          <Button
            type='submit'
            loading={false}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
