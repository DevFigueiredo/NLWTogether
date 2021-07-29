import { Request, Response } from "express";
import { IComplimentsRequest } from "../interfaces/IComplimentsRequest";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const {
      user_receiver_id,
      user_sender_id,
      message,
      tag_id,
    }: IComplimentsRequest = request.body;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender_id,
      user_receiver_id,
      message,
      tag_id,
    });

    return response.status(201).json(compliment);
  }
}

export { CreateComplimentController };
