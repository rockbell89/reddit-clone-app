import { isEmpty } from "class-validator";
import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Post from "../entity/Post";
import Sub from "../entity/Sub";
import { User } from "../entity/User";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail({
      where: {
        identifier,
        slug,
      },
      relations: ["sub"],
    });
    if (res.locals.user) {
      return res.send(post);
    }
  } catch (error) {
    return res.status(500).json({ error: "문제가 발생했습니다. 1" });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(title)) errors.title = "이름은 비워둘 수 없습니다.";
    if (isEmpty(body)) errors.body = "제목은 비워두 수 없습니다.";
  } catch (error) {
    return res.status(500).json({ error: "문제가 발생했습니다. 1" });
  }

  try {
    const user: User = res.locals.user;
    const post = new Post();
    post.title = title;
    post.body = body;
    post.subName = sub;
    post.username = user.username;
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: `문제가 발생했습니다.  ${error}` });
  }
};

const router = Router();

router.get("/:identifier/:slug", userMiddleware, authMiddleware, getPost);
router.post("/create", userMiddleware, authMiddleware, createPost);
export default router;
