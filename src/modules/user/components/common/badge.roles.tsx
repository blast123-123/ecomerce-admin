export const getRoleName = (roleId: string) => {
  const roles: Record<string, string> = {
    ADMIN: 'ADMIN',
    USER: 'USER',
  }
  return roles[roleId] || roleId
}

export const getRoleBadgeVariant = (role: string) => {
  const variants: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
  > = {
    ADMIN: 'outline',
    USER: 'secondary',
  }
  return variants[role] || 'default'
}
