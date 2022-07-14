import React from "react";

import { getPosts, getPostDetails } from "../../services";

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";

const PostDetails = ({ post }) => {
  console.log(post);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slugLink={post.slugLink} />
          <Comments slugLink={post.slugLink} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div classname="relative lg:sticky top-8">
            <PostWidget
              slugLink={post.slugLink}
              categories={post.categories.map((category) => category.slugLink)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slugLink);

  return {
    props: { posts: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slugLink } }) => ({ params: { slugLink } })),
    fallback: false,
  };
}
