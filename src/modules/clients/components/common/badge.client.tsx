export const getEstadoName = (clientId: string) => {
  const roles: Record<string, string> = {
    Pendiente: 'Pendiente',
    Proceso: 'Proceso',
    Finalizado: 'Finalizado',
  }
  return roles[clientId] || clientId
}

export const getEstadoBadgeClass = (estado: string): string => {
  const classes: Record<string, string> = {
    Pendiente: 'bg-red-100 text-red-800',
    Proceso: 'bg-blue-100 text-blue-800',
    Finalizado: 'bg-green-100 text-green-800',
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}
