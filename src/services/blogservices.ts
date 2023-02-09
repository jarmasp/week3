import { BlogPost } from "../models/blog";
 
const getAllBlogs = async () => {
  return await BlogPost.find();
};
 
const createBlog = async (blog: any) => {
  return await BlogPost.create(blog);
};

const getBlogById = async (id: any) => {
  return await BlogPost.findById(id);
};
 
const updateBlog = async (id: any, blog: any) => {
  return await BlogPost.findByIdAndUpdate(id, blog);
};
 
const deleteBlog = async (id: any) => {
  return await BlogPost.findByIdAndDelete(id);
};

export { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog}