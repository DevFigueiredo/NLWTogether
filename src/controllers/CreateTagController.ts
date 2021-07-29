import { Request, Response } from "express";
import { ITagRequest } from "src/interfaces/ITagRequest";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {
  async handle(request: Request, response: Response) {
    const { name }: ITagRequest = request.body;
    const createTagService = new CreateTagService();

    const user = await createTagService.execute({ name });

    return response.status(201).json(user);
  }
}

export { CreateTagController };
