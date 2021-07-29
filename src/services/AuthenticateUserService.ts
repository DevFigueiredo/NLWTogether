import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository, Repository } from "typeorm";
import { ErrorRequest } from "../classes/ErrorRequest";
import { IAuthenticateRequest } from "src/interfaces/IAuthenticateRequest";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
class AuthenticateUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ email, password }: IAuthenticateRequest) {
    const userExists = await this.usersRepository.findOne({ email });
    if (!userExists) {
      throw new ErrorRequest("Email/Password incorret!");
    }
    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new ErrorRequest("Email/Password incorret!");
    }

    const token = sign(
      {
        email: userExists.email,
      },
      process.env.SECRET_KEY,
      {
        subject: userExists.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
