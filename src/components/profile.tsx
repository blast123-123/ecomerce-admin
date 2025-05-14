'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfile } from '@/modules/user/services/queries.service'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Profile = () => {
  const { data, isLoading } = useGetProfile()
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-8 w-8" />
      ) : (
        <>
          <div className="text-sm font-medium">{data?.firstName || 'Name'}</div>
          <Avatar className="h-8 flex items-center justify-center w-8">
            <AvatarImage alt="@usuario" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </>
      )}
    </>
  )
}

export default Profile
