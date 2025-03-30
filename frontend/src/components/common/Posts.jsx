import React, { useEffect } from 'react'
import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../utils/apiConfig';

function Posts({feedType,username,userId}) {

  const getEndPoint = ()=>{
    switch (feedType){
      case "forYou":
        return "/posts/all";
      case "following":
        return "/posts/following";
      case "posts":
        return `/posts/user/${username}`;
      case "likes":
        return `/posts/likes/${userId}`;
      default:
        return "/posts/all";
    }
  }

  const POST_ENDPOINT = getEndPoint()
  const {data:posts,isLoading,refetch,isRefetching}  = useQuery({
    queryKey: ["posts"],
    queryFn: async()=>{
      try {
        const res = await fetchApi(POST_ENDPOINT)
        const data = await res.json()

        if(!res.ok) throw new Error(data.error || "Something went wrong!")
        return data;

      } catch (error) {
        throw new Error(error.message)
      }
    }
  })

  useEffect(()=>{
    refetch()
  },[feedType,refetch,username])

  return (
    <>
    {(isLoading || isRefetching) && (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
   
    )}
    {!isLoading && !isRefetching && posts?.length === 0 && <p className='noPosts'>No posts in this tab. Switch 👻</p>}
    {!isLoading && !isRefetching && posts && (
      <div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    )}
  </>
  )
}

export default Posts
