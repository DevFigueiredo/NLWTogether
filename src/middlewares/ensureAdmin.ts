import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Verificar se o usuário é administrador
  const user_id = request.user_id;
  const usersRepository = getCustomRepository(UsersRepositories);
  const user = await usersRepository.findOne({ where: { id: user_id } });
  const { admin } = user;
  if (admin) {
    return next();
  }
  return response.status(401).json({ error: "User unauthorized" });
}
