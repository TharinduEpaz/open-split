import { create } from 'zustand'
import {devtools} from 'zustand/middleware'

interface CreateSplitData {
  splitName: string
  people: {
    firstName: string
    email: string
    bankDetails: {
      accName: string
      accountNo: string
      bank: string
      branch: string
    }
  }[]
  tasks: {
    taskName: string
    amount: number
    responsiblePeople: {
      personId: string
      amount: number
    }[]
  }[]
}

export type CreateSplitState = {
  createSplitData: CreateSplitData
  setCreateSplitData: (data: Partial<CreateSplitData>) => void
}

export const useCreateSplit = create<CreateSplitState>()(
  devtools((set) => ({
    createSplitData: {
      splitName: '',
      people: [],
      tasks: [],
    },
    setCreateSplitData: (data) =>
      set((state) => ({
        createSplitData: { ...state.createSplitData, ...data },
      })),
  }))
)
