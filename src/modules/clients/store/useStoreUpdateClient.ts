import { create } from 'zustand'
import { UpdateClient } from '../types/client-type'

interface ClientStoreUpdate {
  dataUpdateClient: UpdateClient
  updateClient: (data: UpdateClient) => void
}

export const useClientStoreUpdate = create<ClientStoreUpdate>((set) => ({
  updateClient: (dataUpdateClient) => {
    set({
      dataUpdateClient,
    })
  },
  dataUpdateClient: {
    id: '',
    details_service: '',
    dni: '',
    phone: '',
    stado: '',
  },
}))
