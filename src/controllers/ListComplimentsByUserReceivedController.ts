import { Request, Response } from "express";
import { ListComplimentsByUserReceivedService } from "../services/ListComplimentsByUserReceivedService";

class ListComplimentsByUserReceivedController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listComplimentsByUserReceivedService =
      new ListComplimentsByUserReceivedService();

    const compliments = await listComplimentsByUserReceivedService.execute(
      user_id
    );
    return response.status(200).json(compliments);
  }
}
export { ListComplimentsByUserReceivedController };
