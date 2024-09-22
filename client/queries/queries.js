import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($followingId: ID) {
    followUser(followingId: $followingId) {
      _id
    }
  }
`;

export const POST_DETAIL = gql`
  query GetPost($getPostId: ID) {
    getPost(id: $getPostId) {
      content
      author {
        name
        email
      }
      comments {
        name
        content
      }
      imgUrl
      likes {
        username
      }
      tags
    }
  }
`;

export const POSTS = gql`
  query Author {
    getPosts {
      author {
        name
      }
      imgUrl
      content
      likes {
        username
      }
      _id
      comments {
        content
        username
        name
      }
      tags
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($input: PostContent) {
    addPost(input: $input) {
      content
    }
  }
`;

export const ADD_LIKE = gql`
  mutation AddLike($postId: ID) {
    addLike(postId: $postId) {
      content
    }
  }
`;

export const FIND_USER = gql`
  query FindUser($name: String) {
    findUser(name: $name) {
      name
      _id
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Mutation($input: NewUserData) {
    addUser(input: $input) {
      _id
    }
  }
`;

export const PROFILE = gql`
  query ExampleQuery {
    userProfile {
      name
      imgUrl
      followings {
        _id
        name
      }
      followers {
        name
      }
      username
      _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentData!, $postId: ID!) {
    addComment(input: $input, postId: $postId) {
      _id
    }
  }
`;
