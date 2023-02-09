import { connect, Schema, model } from 'mongoose';
 
const blogSchema = new Schema({
  title: String,
  content: String,
  createdAt: {type: Date, default: Date.now}
});
 
const BlogPost = model('blogPost', blogSchema);

export { BlogPost }