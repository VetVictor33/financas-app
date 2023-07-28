'use client'
import { Input } from "components"
import { LocalDatabase } from "services"
import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from 'react'

export default function Register() {
  const [username, setUsername] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [error, setError] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    setFeedbackMessage('')
    setError(false)
    switch (name) {
      case 'username':
        setUsername(value)
        setUsernameError(false)
        break;
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username) {
      setUsernameError(true)
      setUsernameErrorMessage('Digite o username')
    }

    if (usernameError) return
    try {
      LocalDatabase.setUser(username)
      setFeedbackMessage("Usuário cadastrado com sucesso")
    } catch (error) {
      setError(true)
      //@ts-ignore
      setFeedbackMessage(error.message)
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
          onChange={handleInputChange}
          inputClassName="text-black"
        />
        {feedbackMessage && <p className={`${error ? 'text-red-600' : 'text-green-600'}`}
        >{feedbackMessage}</p>}
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
