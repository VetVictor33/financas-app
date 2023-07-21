import { ITransactions, IUserData } from "interfaces";
import { Dispatch, SetStateAction } from "react";

export interface IUserDataContext {
  user: IUserData,
  setUser: Dispatch<SetStateAction<IUserData>>
  transactions: ITransactions[],
  setTransactions: Dispatch<SetStateAction<ITransactions[]>>
  paginatedTransactions: ITransactions[],
  setPaginatedTransactions: Dispatch<SetStateAction<ITransactions[]>>
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
}