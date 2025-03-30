import React from 'react'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useFollow from '../../hooks/useFollow';
import LoadingSpinner from './LoadingSpinner';

function RightPanel() {
  const {data:suggestedUsers,isLoading}= useQuery({
    queryKey:["suggestedUsers"],
    queryFn: async()=>{
      try {
        const res = await fetch("/api/users/suggests")

        const data = await res.json()

        if(!res.ok) throw new Error(data.error || "Something went wrong!")

        return data;
         
      } catch (error) {
        throw new Error(error.message)
      }
    }
  })


  const {followUnfollow,isPending} = useFollow()

  if(suggestedUsers?.length === 0) return (
    <div className='right-panel-empty'>

    </div>
  )


  return (
  <div className='right-panel'>
      <div className='right-panel__container'>
        <p className='right-panel__container__header'>Who to follow</p>
        <div className='right-panel__container__users'>
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className='right-panel__container__users__user link'
                key={user._id}
              >
                <div className='right-panel__container__users__user__info'>  
                  <img src={user.profileImg || "/avatar-placeholder.png"} className='right-panel__container__users__user__info__avatar'/>
                 
                  <div>
                      <p>
                          {user.fullname}
                      </p>
                      <p>
                        @{user.username}
                      </p>
                  </div>
                  
                </div>
                <button
                    onClick={(e) => {
                      e.preventDefault()
                      followUnfollow(user._id)
                    }}
                  >
                    {isPending ? <LoadingSpinner size={"sm"} />: "Follow"}
                  </button>
               
              </Link>
            ))}
        </div>
      </div>
  </div>
  )
}

export default RightPanel
