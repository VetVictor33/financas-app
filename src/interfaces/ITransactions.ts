export interface ITransactions {
  id: number,
  user_id: number,
  category: string,
  type: string,
  value: number,
  date: string
}

export interface INewTransaction {
  user_id: number,
  category: string,
  type: string,
  value: number,
  date: string
}