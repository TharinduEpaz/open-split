import { create } from 'zustand'

export type CreateSplitState = {
  createSplitData: Record<string, any>
  setCreateSplitData: (data: Record<string, any>) => void
}

export const useCreateSplit = create<CreateSplitState>((set) => ({
  createSplitData: {},
  setCreateSplitData: (data: Record<string, any>) =>
    set((state) => ({
      createSplitData: { ...state.createSplitData, ...data },
    })),
}))
