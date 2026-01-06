import { create } from 'zustand'
import {devtools} from 'zustand/middleware'

interface CreateSplitData {
  splitName: string
  people: {
    id: string
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
    people: {
      id: string
      amount: number
    }[]
  }[]
}

export type CreateSplitState = {
  createSplitData: CreateSplitData
  setCreateSplitData: (data: Partial<CreateSplitData>) => void
  // UI state
  showBankDetails: boolean
  setShowBankDetails: (show: boolean) => void
  isFormSubmitted: boolean
  setIsFormSubmitted: (isSubmitted: boolean) => void
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
    // UI state
    showBankDetails: false,
    setShowBankDetails: (show) => set({ showBankDetails: show }),
    isFormSubmitted: false,
    setIsFormSubmitted: (isSubmitted) => set({ isFormSubmitted: isSubmitted }),
  }))
)
