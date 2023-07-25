'use client'
import { Input } from "components"
import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from 'react'
import { axios } from "services"

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    setFeedbackMessage('')
    switch (name) {
      case 'username':
        setUsername(value)
        setUsernameError(false)
        break;
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
    if (!username) {
      setUsernameError(true)
      setUsernameErrorMessage('Digite o username')
    }
    if (!email) {
      setEmailError(true)
      setEmailErrorMessage('Digite o email')
    }
    if (!password) {
      setPasswordError(true)
      setPasswordErrorMessage('Digite a senha')
    }

    if (passwordError || emailError || usernameError) return
    try {
      await axios.post('/register', { username, email, password })
      setFeedbackMessage("Usuário cadastrado com sucesso")
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        setFeedbackMessage("Não foi possível cadastrar este email")
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center text-white">
      <form className="bg-indigo-900 w-3/4 flex flex-col rounded-lg px-6 py-16 gap-2"
        onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="text"
          error={usernameError}
          errorMessage={usernameErrorMessage}
          value={username}
          onChange={handleInputChange} />
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
        >Cadastrar</button>
        <div className="flex gap-1 ">
          <p>Já possui cadastro?</p>
          <Link href={'/login'} className="hover:opacity-75">Fazer login</Link>
        </div>
      </form>
    </div>
  )
}
