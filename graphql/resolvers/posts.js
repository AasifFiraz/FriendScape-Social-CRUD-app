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
        console.log(user.id, post.user.toString());
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
  },
};
