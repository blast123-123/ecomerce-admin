import { create } from 'zustand'
import { UpdateUser } from '../types/user-type'

interface UserStoreUpdate {
  dataUpdateUser: UpdateUser
  updateUser: (data: UpdateUser) => void
}

export const useUserStoreUpdate = create<UserStoreUpdate>((set) => ({
  updateUser: (dataUpdateUser) => {
    set({
      dataUpdateUser,
    })
  },
  dataUpdateUser: {},
}))
