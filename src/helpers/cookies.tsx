'use server'
import { cookies } from 'next/headers'

export const checkToken = () => {
  return cookies().get('accessToken')
}

export const setCookie = (name: string, value: string) => {
  cookies().set(name, value, { secure: true, httpOnly: true })
}

export const getCookie = (name: string) => {
  return cookies().get(name)
}