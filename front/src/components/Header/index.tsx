import styles from './styles.module.scss'

import { useContext } from 'react'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext'

export function Header() {

  const { signOut } = useContext(AuthContext)
  
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/logo-2-branco.png" alt="logo" />
        </Link>
        <nav className={styles.menuNav}>
          <Link href="/category" legacyBehavior>
            <a href="">Categoria</a>
          </Link>

          <Link href="/product" legacyBehavior>
            <a href="">Serviços</a>
          </Link>

          <Link href="/appointments" legacyBehavior>
            <a href="">Apontamentos</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#fff" />
          </button>
        </nav>
      </div>
    </header>
  );
}