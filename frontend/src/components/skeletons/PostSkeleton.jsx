const PostSkeleton = () => {
	return (
    <div className="skeleton-post">
      <div className="skeleton-post__container">
       <div className="skeleton-post__container__avatar"></div>
			 <div>
       	<div className="skeleton-post__container__line"></div>
       	<div className="skeleton-post__container__line"></div>
			 </div>
      </div>
      <div className="skeleton-post__btn"></div>
    </div>

	);
};
export default PostSkeleton;