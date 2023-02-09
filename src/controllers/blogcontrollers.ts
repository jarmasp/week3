import {
  getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog
} from "../services/blogservices";
import {IncomingMessage, ServerResponse} from "http";

// import { getBodyData } from "../lib/utils"
 
const controllerGetAllBlogs = async (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {
  req: IncomingMessage;}) => {
  try {
    const blogs = await getAllBlogs();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(blogs));
  } catch (err) {
    if (err instanceof Error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    } else 
      console.error(err, 'Unexpected error') 
  }
};
 
const controllerCreateBlog = async (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;}) => {
  try {
    let body = ''
    req.on('data', (chunk: any) => { 
      body += chunk.toString()
    })
    req.on('end', async () => {
      const { title, content } = JSON.parse(body)
      const blog = {
        title,
        content
      };
      await createBlog(blog);
      res.writeHead(201, { "Content-Type": "application/json" })
      res.end(JSON.stringify(blog))
    })
  } catch (err) {
    if (err instanceof Error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    } else 
      console.error(err, 'Unexpected error') 
  }
};
 
const controllerGetBlogById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;}, id: any) => {
  try {
    const blog = await getBlogById(id);
    if (!blog) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: 'blog not found' }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(blog));
    }
  } catch (err) {
    if (err instanceof Error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    } else 
      console.error(err, 'Unexpected error') 
  }
};

const controllerDeleteBlog = async (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;}, id: any) => {
  try {
    const blog = await deleteBlog(id);
    if (!blog) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: 'blog not found' }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(blog));
    }
  } catch (err) {
    if (err instanceof Error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    } else 
      console.error(err, 'Unexpected error') 
  }
};
 
const controllerUpdateBlog = async (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;}, id: any) => {
  try {
    const blog = await getBlogById(id); 
    if (!blog) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: 'blog not found' }));
    } else {
      let body = ''
      req.on('data', (chunk: any) => { 
      body += chunk.toString()
    })
      req.on('end', async () => {
        const { title, content } = JSON.parse(body)
        const blogData = {
          title: title || blog.title,
          content: content || blog.content
        };
        await updateBlog(id, blogData);
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(blogData))
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    } else 
      console.error(err, 'Unexpected error') 
  }
};

export {
  controllerGetAllBlogs, controllerCreateBlog, controllerGetBlogById, controllerUpdateBlog, controllerDeleteBlog
}