import { useEffect, useState } from "react";
import useUpdate from "../../hooks/useUpdate";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const EditProfileModal = ({authUser}) => {
	const [formData, setFormData] = useState({
		fullname: "",
		username: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

	const {updateProfile,updateProfilePending} = useUpdate()

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(()=>{
		if(authUser){
			setFormData({
				fullname: authUser.fullname,
				username: authUser.username,
				email: authUser.email,
				bio: authUser.bio,
				link: authUser.link,
				newPassword: "",
				currentPassword: "",
			})
		}
	},[authUser])

	return (
		<>
			<button
				className='editButton'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='editContainer'>
				<div className='editContainer__updateData'>
					<h3 className='editContainer__updateData__header'>Update Profile</h3>
					<form
						className='editContainer__updateData__form'
						onSubmit={(e) => {
							e.preventDefault();
							if(updateProfilePending) return
							updateProfile(formData)
						}}
					>
						<div className='editContainer__updateData__form__inputContainer'>
							<input
								type='text'
								placeholder='Full Name'
								value={formData.fullname}
								name='fullname'
								onChange={handleInputChange}
							/>
							<input
								type='text'
								placeholder='Username'
								value={formData.username}
								name='username'
								onChange={handleInputChange}
							/>
						</div>
						<div className='editContainer__updateData__form__inputContainer'>
							<input
								type='email'
								placeholder='Email'
								value={formData.email}
								name='email'
								onChange={handleInputChange}
							/>
							<textarea
								placeholder='Bio'
								value={formData.bio}
								className="editContainer__updateData__form__inputContainer__textarea"
								name='bio'
								onChange={handleInputChange}
							/>
						</div>
						<div className='editContainer__updateData__form__inputContainer'>
							<input
								type='password'
								placeholder='Current Password'
								value={formData.currentPassword}
								name='currentPassword'
								onChange={handleInputChange}
							/>
							<input
								type='password'
								placeholder='New Password'
								value={formData.newPassword}
								name='newPassword'
								onChange={handleInputChange}
							/>
						</div>
						<input
							type='text'
							placeholder='Link'
							value={formData.link}
							name='link'
							onChange={handleInputChange}
						/>
						<button className='editContainer__updateData__form__btn'>{updateProfilePending?<LoadingSpinner size={"sm"} />:"Update"}</button>
					</form>
				</div>
				<form method='dialog' className='editContainer__closeBtn'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;