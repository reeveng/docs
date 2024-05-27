export type Metadata = {
	title: string;
	publishedOnDate: string;
	teaser: string;
	editedOnDate?: string;
	description: string;
	slug?: string;
};

export type Post = {
	metadata: Metadata;
};

export type PostLink = {
	slug: string;
	post: Post;
};

export type Likes = {
	amount: number;
};

export type PostInformation = Metadata &
	Likes & {
		content;
	};
