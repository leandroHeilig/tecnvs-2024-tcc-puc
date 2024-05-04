import { createContext, ReactNode, useState, useEffect } from 'react'
import Router from 'next/router'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify'

import { api } from '@/services/apiClient'

// Obs: alterar o stric, no tsconfig para false

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
};

type UserProps = {
  id: string
  name: string
  email: string
};

type SignInProps = {
  email: string
  password: string
};

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
};

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token")
    Router.push('/')
  } catch (error) {
    console.log('error: erro ao deslogar da aplicação')    
  }
  
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    // recuperar token
    const { '@nextauth.token': token } = parseCookies()
    
    if (token) {
      api.get('/user').then( response => {
        const { id, name, email } = response.data
        setUser({
          id,
          name,
          email
        })
      })
        .catch(() => {
          //deslogad usuário
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    //console.log('e-mail: ', email)
    //console.log('senha: ', password)
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      //console.log(response.data)
      const { id, name, token } = response.data
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,// 1m
        path: '/'
      })

      setUser({
        id,
        name,
        email
      })

      // deixar configurado o token para as demais requisições
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      // Notifica usuário
      toast.success('Bem-vindo')

      // redireciona para página principal
      Router.push("/dashboard");

    } catch (error) {
      toast.error('Erro ao acessar o Sistema. Verifique o seu e-mail e senha')
      console.log('erro ao acessar o login', error)
    }
  }

  async function signUp({ name, email, password }:SignUpProps) {
    try {

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      console.log('ok. cadastrado')
      toast.success('Conta criada com sucesso')
      Router.push('/')

    } catch (error) {
      console.log('Erro ao criar a conta', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
