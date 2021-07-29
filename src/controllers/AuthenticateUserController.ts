import { Request, Response } from "express";
import { IAuthenticateRequest } from "src/interfaces/IAuthenticateRequest";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password }: IAuthenticateRequest = request.body;
    const authenticateUserService = new AuthenticateUserService();

    const authenticate = await authenticateUserService.execute({
      email,
      password,
    });

    return response.status(201).json(authenticate);
  }
}

export { AuthenticateUserController };
