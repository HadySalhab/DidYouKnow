let db = {
	facts: [
		{
			id: "bFlsaSzSrFOdfFisda", //Primary-key
			username: "username", //Reference to user doc
			question: "Fact Question",
			answer: "Fact Answer",
			createdAt: "2020-09-30T13:12:22.470Z",
			likeCount: 75,
			commentCount: 10,
		},
	],
	users: [
		{
			authId: "BPwFympP2CUPvUR0tJcjG6gfplq2", //Reference to firebase auth collection
			email: "user@gmail.com",
			username: "user123", //Primary-key
			createdAt: "2020-09-30T13:12:22.470Z",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/did-you-know-e5c9c.appspot.com/o/hjsalhab.png?alt=media",
			bio: "Hello my name is x and i'm a software developer",
			location: "Sydney, AU",
			website: "www.user.com",
		},
	],
	comments: [
		{
			username: "user123", //Reference to user doc,
			fact: "bFlsaSzSrFOdfFisda", //Reference to fact doc
			body: "Nice one..",
			createdAt: "2020-09-30T13:12:22.470Z",
			id: "BFwFxxmpD2CUPvUYYYfplq2", //Primary key
		},
	],
	likes: [
		{
			username: "user123", //Reference to user doc,
			fact: "bFlsaSzSrFOdfFisda", //Reference to fact doc
			id: "BFwFxxmpD2CUPvUYYYfplq2", //Primary key
		},
	],
	notifications: [
		{
			createdAt: "2020-09-30T13:12:22.470Z",
			receiver: "user123", //Reference to user doc,
			sender: "user321", //Reference to user doc,
			type: "like | comment",
			read: false,
			fact: "bFlsaSzSrFOdfFisda", //Reference to fact doc
		},
	],
};
