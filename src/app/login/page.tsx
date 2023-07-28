'use client'
import { Input } from "components"
import { useUserDataContext } from "contexts"
import { LocalDatabase } from "services"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from 'react'
import { Storage } from "utils"

export default function Login() {
  const { setUser } = useUserDataContext()
  const [username, setUsername] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

  const [feedbackMessage, setFeedbackMessage] = useState('')

  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    setFeedbackMessage('')

    switch (name) {
      case 'username':
        setUsername(value)
        setUsernameError(false)
        break
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username) {
      setUsernameError(true)
      setUsernameErrorMessage('Digite o username')
      return
    }

    try {
      const { id, username: newUsername } = LocalDatabase.getUser(username)

      setUser({ id, username: newUsername })
      Storage.setSessionItem('username', newUsername)
      Storage.setSessionItem('userId', String(id))
      router.push('/')
    } catch (error) {
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
        {feedbackMessage && <p className='text-red-600'>{feedbackMessage}</p>}
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
