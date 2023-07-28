import { ITransactions, IUserData } from "interfaces";
import { Storage } from "utils";

interface INewTransaction {
  user_id: number,
  category: string,
  type: string,
  value: number,
  date: string
}

export abstract class LocalDatabase {
  public static setUser(username: string) {
    const users = this.getUsersFromDb()

    users.forEach((user: IUserData) => {
      if (user.username === username) {
        throw new Error('Username indisponível!')
      }
    })

    const newIndex = users.length + 1
    const newUser = { id: newIndex, username }

    users.push(newUser)
    Storage.setItem('users', JSON.stringify(users))
    return newUser
  }

  public static getUser(usernameToFind: string) {
    const users = this.getUsersFromDb()
    const user = users.find(({ username }) => username === usernameToFind)
    if (!user) throw new Error('Usuário não encontrado')
    return user
  }

  public static setTransaction(newTransaction: INewTransaction) {
    const allTransactions = this.getTransactionsFromDb()
    const newTransactionsId = allTransactions.length + 1

    allTransactions.push({ id: newTransactionsId, ...newTransaction })
    Storage.setItem('transactions', JSON.stringify(allTransactions))

    return { id: newTransactionsId, ...newTransaction }
  }

  public static getTransactions(userId: number) {
    const transactions = this.getTransactionsFromDb()
    const userTransactions = transactions.filter(({ user_id }) => user_id === userId)
    return userTransactions
  }

  public static editTransaction(userId: number, transactionId: number, newData: INewTransaction) {
    const [transactions, foundIndex] = this.getTransactionsFromDbAndTransactionIndex(userId, transactionId)
    transactions.splice(foundIndex, 1, {
      id: transactionId, ...newData
    })
    this.updateTransactionsOnDb(transactions)
  }

  public static removeTransaction(userId: number, transactionId: number) {
    const [transactions, foundIndex] = this.getTransactionsFromDbAndTransactionIndex(userId, transactionId)
    transactions.splice(foundIndex, 1)
    this.updateTransactionsOnDb(transactions)
  }

  private static getUsersFromDb(): IUserData[] {
    const usersFromDb = Storage.getItem('users')
    const localUsers = usersFromDb ? JSON.parse(usersFromDb) : new Array()
    return localUsers
  }

  private static getTransactionsFromDb(): ITransactions[] {
    const transactionsFromDb = Storage.getItem('transactions')
    const localTransactions: ITransactions[] = transactionsFromDb ? JSON.parse(transactionsFromDb) : new Array()
    localTransactions.sort((a, b) => (new Date(a?.date).getTime()) - (new Date(b?.date).getTime()))
    return localTransactions
  }

  private static getTransactionsFromDbAndTransactionIndex(userId: number, transactionId: number): ([transactions: ITransactions[], foundIndex: number]) {
    if (!transactionId) throw new Error('TransactionId may not be undefined')
    if (!userId) throw new Error('UserId may not be undefined')
    const transactions = this.getTransactions(userId)
    const foundIndex = transactions.findIndex(({ user_id, id }) => (user_id === userId) && (transactionId === id))
    return [transactions, foundIndex]
  }

  private static updateTransactionsOnDb(transactions: ITransactions[]) {
    transactions.sort((a, b) => (new Date(a.date).getTime()) - (new Date(b.date).getTime()))
    Storage.setItem('transactions', JSON.stringify(transactions))
  }
}