import { Request, Response } from "express";
import { ListComplimentsByUserSendedService } from "../services/ListComplimentsByUserSendedService";

class ListComplimentsByUserSendedController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listComplimentsByUserSendedService =
      new ListComplimentsByUserSendedService();

    const compliments = await listComplimentsByUserSendedService.execute(
      user_id
    );
    return response.status(200).json(compliments);
  }
}
export { ListComplimentsByUserSendedController };
