import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const compliments = await listTagsService.execute();
    return response.status(200).json(compliments);
  }
}
export { ListTagsController };
