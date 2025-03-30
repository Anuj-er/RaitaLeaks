const ProfileHeaderSkeleton = () => {
	return (
    <div className="skeleton-profile">
			 <div className="skeleton-profile__lineContainer">
       	<div className="skeleton-profile__lineContainer__line"></div>
       	<div className="skeleton-profile__lineContainer__line"></div>
			 </div>
      <div className="skeleton-profile__container">
       <div className="skeleton-profile__container__avatar"></div>
       <div className="skeleton-profile__container__btn"></div>
      </div>
       <div className="skeleton-profile__container__rightBtn"></div>
			<div className="skeleton-profile__lineContainer two">
       	<div className="skeleton-profile__lineContainer__line"></div>
       	<div className="skeleton-profile__lineContainer__line"></div>
       	<div className="skeleton-profile__lineContainer__line"></div>
			 </div>
    </div>
	);
};
export default ProfileHeaderSkeleton;