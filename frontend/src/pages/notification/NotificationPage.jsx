import React, { useState } from 'react'
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useMutation, useQueryClient,useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchApi } from '../../utils/apiConfig';


import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";


function NotificationPage() {
  const [showDropDown,setShowDropDown] = useState(false)
	
  const queryClient = useQueryClient()

  const {data:notifications,isLoading} = useQuery({
    queryKey: ["notifications"],
    queryFn: async()=>{
      try {
        const res = await fetchApi("/api/notifications/")
        const data = await res.json()

        if(!res.ok) throw new Error(data.error || "Something went wrong!")

        return data.reverse()
        
      } catch (error) {
        throw new Error(error.message)
      }
    }
  })

  const {mutate:deleteAllNotifications,isPending} = useMutation({
    mutationFn: async()=>{
      try {
        const res = await fetchApi("/api/notifications/",{
          method: "DELETE",
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.error || "Something went wrong!")

      } catch (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: ()=>{
      toast.success("Notifications is deleted")
      queryClient.invalidateQueries({queryKey:["notifications"]})
    },
    onError: ()=>{
      toast.error(error.message)
    }
  })

	const deleteNotifications = () => {
    if(isPending) return
    deleteAllNotifications()
	};

  return (
    <>
    <div className='notifications'>
      <div className='notifications__header'>
        <p>Notifications</p>
        <div className='notifications__header__dropdown'>
          <IoSettingsOutline className='notifications__header__dropdown__btn' onClick={()=>setShowDropDown(!showDropDown)} />
        {showDropDown&& <ul
            tabIndex={0}
            className='notifications__header__dropdown__content'
          >
            <li>
              <a onClick={deleteNotifications}>Delete all notifications</a>
            </li>
          </ul>}
        </div>
      </div>
      {isLoading && (
        <div className='notifications__loadingContainer'>
          <LoadingSpinner size='lg' />
        </div>
      )}
      {notifications?.length === 0 && <div className='notifications__empty'>No notifications 🤔</div>}
      {notifications?.map((notification) => (
        <div className='notifications__notification' key={notification._id}>
          <div className='notifications__notification__container'>
            {notification.type === "follow" && <FaUser className='notifications__notification__container__followIcon' />}
            {notification.type === "like" && <FaHeart className='notifications__notification__container__likeIcon' />}
            <Link to={`/profile/${notification.from.username}`} className='link'>
             
              <img src={notification.from.profileImg || "/avatar-placeholder.png"} className='notifications__notification__container__avater' />
              
              <div className='notifications__notification__container__userInfo'>
                <span className='font-bold'>@{notification.from.username}</span>{" "}
                {notification.type === "follow" ? "followed you" : "liked your post"}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}

export default NotificationPage
