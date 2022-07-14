import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postComponentsConnection {
        edges {
          node {
            createdAt
            excerpt
            slug
            slugLink
            title
            author {
              title
              bio
              name
              id
              photo {
                url
              }
            }
            featuredImage {
              url
            }
            categories {
              title
              name
              slug
              slugLink
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postComponentsConnection.edges;
};

export const getPostDetails = async (slugLink) => {
  const query = gql`
    query GetPostDetails($slugLink: String!) {
      postComponentsConnection(where: { slugLink: $slugLink }) {
        createdAt
        excerpt
        slug
        slugLink
        title
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        categories {
          name
          slugLink
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slugLink });

  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
      query GetPostDetails() {
        postComponentsConnection(
          orderBy: createdAt_ASC
          last: 3
        )
      } {
        title
        featuredImage {
          url
        }
        createdAt
        slugLink
      }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (slugLink, categories) => {
  const query = gql`
    query GetPostDetails($slugLink: String!, $categories: [String!]) {
      postComponentsConnection(
        where: {
          slugLink_not: $slugLink
          AND: { categories_some: { slugLink_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slugLink
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slugLink, categories });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slugLink
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};
