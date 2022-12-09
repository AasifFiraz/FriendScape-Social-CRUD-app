const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getPosts() {
      return await Post.find({});
    },
    async getPost(_, args) {
      const post = await Post.findById(args.PostId);
      if (!post) {
        throw new Error("Cannot find post");
      }
      return post;
    },
  },
};
