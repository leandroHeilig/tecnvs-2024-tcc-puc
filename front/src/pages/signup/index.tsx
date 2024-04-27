import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/home.module.scss";
import logoImg from "../../../public/logo-2-branco.png";


import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


export default function SignUp() {
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
          <form>
            <Input placeholder="Digite o seu nome" type="text" />
            <Input placeholder="Digite o seu e-mail" type="text" />
            <Input placeholder="Informa a sua senha" type="password" />
            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
