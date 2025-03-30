export const POSTS = [
	{
		_id: "1",
		text: "Exploring the beauty of the Northern Lights 🌌✨",
		img: "/posts/northern-lights.png",
		user: {
			username: "aurora_hunter",
			profileImg: "/avatars/user1.png",
			fullName: "Liam Thompson",
		},
		comments: [
			{
				_id: "1",
				text: "Absolutely breathtaking!",
				user: {
					username: "stella23",
					profileImg: "/avatars/user2.png",
					fullName: "Stella Carter",
				},
			},
			{
				_id: "2",
				text: "Nature at its finest! 🌿",
				user: {
					username: "nature_lover",
					profileImg: "/avatars/user3.png",
					fullName: "Ava Green",
				},
			},
		],
		likes: ["6658s101", "6658s102", "6658s103", "6658s104"],
	},
	{
		_id: "2",
		text: "Just finished a 10K marathon! 🏃‍♂️💨",
		img: "/posts/marathon.png",
		user: {
			username: "fit_freak",
			profileImg: "/avatars/user4.png",
			fullName: "Noah Williams",
		},
		comments: [
			{
				_id: "1",
				text: "Congrats! 💪",
				user: {
					username: "emma_j",
					profileImg: "/avatars/user5.png",
					fullName: "Emma Johnson",
				},
			},
		],
		likes: ["6658s105", "6658s106", "6658s107", "6658s108"],
	},
	{
		_id: "3",
		text: "Sunset over the Grand Canyon 🌅",
		img: "/posts/grand-canyon.png",
		user: {
			username: "wanderlust",
			profileImg: "/avatars/user6.png",
			fullName: "Sophia Lee",
		},
		comments: [],
		likes: ["6658s109", "6658s110", "6658s111", "6658s112", "6658s113"],
	},
	{
		_id: "4",
		text: "Learning React Native this week. Any tips? 📱🤓",
		img: "/posts/react-native.png",
		user: {
			username: "dev_guru",
			profileImg: "/avatars/user7.png",
			fullName: "Ethan Walker",
		},
		comments: [
			{
				_id: "1",
				text: "Start with Expo! Makes things easier 🚀",
				user: {
					username: "tech_nerd",
					profileImg: "/avatars/user8.png",
					fullName: "Mia Roberts",
				},
			},
		],
		likes: [
			"6658s114",
			"6658s115",
			"6658s116",
			"6658s117",
			"6658s118",
			"6658s119",
		],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		fullName: "Liam Thompson",
		username: "aurora_hunter",
		profileImg: "/avatars/user1.png",
	},
	{
		_id: "2",
		fullName: "Sophia Lee",
		username: "wanderlust",
		profileImg: "/avatars/user6.png",
	},
	{
		_id: "3",
		fullName: "Noah Williams",
		username: "fit_freak",
		profileImg: "/avatars/user4.png",
	},
	{
		_id: "4",
		fullName: "Ethan Walker",
		username: "dev_guru",
		profileImg: "/avatars/user7.png",
	},
];