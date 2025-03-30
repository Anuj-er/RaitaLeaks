import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


function CreatePost() {
  const [text, setText] = useState("");
	const [img, setImg] = useState(null);

	const imgRef = useRef(null);

  const queryClient = useQueryClient()
  const {data:authUser} = useQuery({queryKey:["authUser"]})

  const {mutate:createPost,isPending,isError,error} = useMutation({
    mutationFn: async({text,img})=>{
      try {
        const res = await fetch("/api/posts/create",{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({text,img})
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.error || "Something went wrong!")
        return data

      } catch (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: ()=>{
      setImg(null)
      setText("")
      toast.success("Post created successfully")
      queryClient.invalidateQueries({queryKey:["posts"]})
    }
  })

	const handleSubmit = (e) => {
		e.preventDefault();
    createPost({text,img})
	};

	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
  return (
  <div className='create-post'>
    <img src={authUser.profileImg || "/avatar-placeholder.png"} className='create-post__avatar' />

    <form className='create-post__form' onSubmit={handleSubmit}>
        <textarea
          className='create-post__form__textarea'
          placeholder='What is happening?!'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

      {img && (
        <div className='create-post__form__upload'>
          <IoCloseSharp
            className='create-post__form__upload__close-icon'
            onClick={() => {
              setImg(null);
              imgRef.current.value = null;
            }}
          />
          <img src={img} className='create-post__form__upload__image' />
        </div>
      )}

      <div className='create-post__form__data'>
        <div className='create-post__form__data__left'>
          <CiImageOn
            className='create-post__form__data__left__icon'
            onClick={() => imgRef.current.click()}
          />
          <BsEmojiSmileFill className='create-post__form__data__left__icon' />
        </div>
        <input type='file' hidden ref={imgRef} onChange={handleImgChange} />
        <button className='create-post__form__data__btn'>
          {isPending ? "Posting..." : "Post"}
        </button>
      </div>
      {isError && <div className='error'>Something went wrong</div>}
    </form>
  </div>
  )
}

export default CreatePost
