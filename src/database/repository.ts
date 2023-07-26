import { axios } from "services"

export const getTransactions = async () => {
  const response = await axios.get('/transactions')
  return response
}