import React, { useState } from 'react'

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import Sidebar from '../../components/common/Sidebar';

function HomePage() {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<div className='home-container'>
				{/* Header */}
				<div className='home-container__header'>
					<div
						className="home-container__header__title"
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='home-container__header__title__active'></div>
						)}
					</div>
					<div
						className='home-container__header__title'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='home-container__header__title__active'></div>
						)}
					</div>
				</div>

				{/*  CREATE POST INPUT */}
				<CreatePost />

				{/* POSTS */}
				<Posts feedType={feedType} />
			</div>
	
	);
}

export default HomePage
