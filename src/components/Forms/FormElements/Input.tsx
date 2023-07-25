'use client'

import { HTMLInputTypeAttribute, ChangeEvent } from "react"

type InputProps = {
  name: string, label: string, type: HTMLInputTypeAttribute,
  value: string, error: boolean, errorMessage: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Input({ name, label, type, value, error, errorMessage, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label
          htmlFor={name}>{label}</label>
        {error && <span className="text-red-600 bg-white bg-opacity-30 px-1 rounded-md font-semibold">{errorMessage}</span>}
      </div>
      <input onChange={onChange} className="bg-white bg-opacity-10 border-white border p-2 rounded-md"
        id={name}
        name={name}
        type={type}
        value={value} />
    </div>
  )
}
