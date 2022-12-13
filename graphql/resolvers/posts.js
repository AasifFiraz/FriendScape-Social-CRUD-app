const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      return posts;
    },
    async getPost(_, args) {
      const post = await Post.findById(args.PostId);
      if (!post) {
        throw new Error("Cannot find post");
      }
      return post;
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      try {
        const user = await checkAuth(context);
        if(body.trim() === "") {
          throw new Error("oops!, the post body is empty")
        }
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date(),
        });
        const post = await Post.create(newPost);
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    async deletePost(_, { postId }, context) {
      try {
        const user = await checkAuth(context);
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error(`Cannot delete post with id: ${postId}`);
        }

        if (user.id !== post.user.toString()) {
          throw new AuthenticationError(
            "You are not authorized to delete this post"
          );
        }
        await Post.findByIdAndDelete(postId);
        return "Post has been successfully deleted";
      } catch (error) {
        throw new Error(error);
      }
    },
    async createComment(_, { postId, body }, context) {
      try {
        const { username, id } = await checkAuth(context);
        if (body.trim() === "") {
          throw new Error("Comment body cannot be empty");
        }
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username,
            user: id,
            createdAt: new Date(),
          });
          await post.save();
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteComment(_, { postId, commentID }, context) {
      try {
        const { id } = await checkAuth(context);
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found");
        }

        const commentIndex = post.comments.findIndex((c) => c.id === commentID);
        if (post.comments[commentIndex].user.toString() === id) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new Error("You are not authorized to delete this comment");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { PostId }, context) {
      try {
        const { username, id } = await checkAuth(context);

        const post = await Post.findById(PostId);

        if (!post) {
          throw new Error("Post not found");
        }

        const isLiked = post.likes.find((like) => like.user.toString() === id);

        if (isLiked) {
          post.likes = post.likes.filter((like) => like.user.toString() !== id);
        } else {
          post.likes.unshift({
            username,
            user: id,
            createdAt: new Date(),
          });
        }
        await post.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
