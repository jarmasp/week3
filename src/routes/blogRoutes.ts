import {
  controllerGetAllBlogs, controllerCreateBlog, controllerGetBlogById, controllerUpdateBlog, controllerDeleteBlog
} from "../controllers/blogcontrollers";
import {IncomingMessage, ServerResponse} from "http";

const router = async function (req: IncomingMessage, res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;}) {
  if (req.url === "/api/blog") {
    if (req.method === "GET") {
      controllerGetAllBlogs(req, res)
    } else if (req.method === "POST") {
      controllerCreateBlog(req, res)
    }
  } else if (req?.url?.match(/\/api\/blog\/([0-9]+)/)) {
    if (req.method === "GET") {
      const id = req.url.split('/')[3]
      controllerGetBlogById(req, res, id)
    } else if (req.method === "PUT") {
      const id = req.url.split('/')[3]
      controllerUpdateBlog(req, res, id)
    } else if (req.method === "DELETE") {
      const id = req.url.split('/')[3]
      controllerDeleteBlog(req, res, id)
    }
  }
}

export { router }
