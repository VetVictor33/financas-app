'use client'
import { Input } from "components"
import { useUserDataContext } from "contexts/UserDataContext"
import { setCookie } from "helpers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from 'react'
import { axios } from "services"

export default function Login() {
  const { setUser } = useUserDataContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [feedbackMessage, setFeedbackMessage] = useState('')

  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    setFeedbackMessage('')

    switch (name) {
      case 'email':
        setEmail(value)
        setEmailError(false)
        break;
      case 'password':
        setPassword(value)
        setPasswordError(false)
        break;
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      setEmailError(true)
      setEmailErrorMessage('Digite o email')
    }
    if (!password) {
      setPasswordError(true)
      setPasswordErrorMessage('Digite a senha')
    }

    if (passwordError || emailError) return
    try {
      const { data } = await axios.post('/login', { email, password })
      const { accessToken, user } = data
      setUser({ id: user.id, username: user.name })
      setCookie('accessToken', accessToken)
      setCookie('usernameId', user.id)
      setCookie('username', user.username)
      router.push('/')
    } catch (error) {
      setFeedbackMessage('Credenciais inválidas')
    }
  }

  return (
    <div className="h-screen flex justify-center items-center text-white">
      <form className="bg-indigo-900 w-3/4 flex flex-col rounded-lg px-6 py-16 gap-2"
        onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email"
          type="email"
          error={emailError}
          errorMessage={emailErrorMessage}
          value={email}
          onChange={handleInputChange} />
        <Input
          name="password"
          label="Senha"
          type="password"
          error={passwordError}
          errorMessage={passwordErrorMessage}
          value={password}
          onChange={handleInputChange} />
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <button className="bg-white bg-opacity-30 hover:bg-opacity-60 py-2"
        >Entrar</button>
        <div className="flex gap-1 ">
          <p>Não possui cadastro?</p>
          <Link href={'/register'} className="hover:opacity-75">Cadastrar-se</Link>
        </div>
      </form>
    </div>
  )
}
