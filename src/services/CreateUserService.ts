import { ErrorRequest } from "../classes/ErrorRequest";
import { User } from "../entities/User";
import { getCustomRepository, Repository } from "typeorm";
import { IUserRequest } from "../interfaces/IUserRequest";
import { UsersRepositories } from "../repositories/UsersRepositories";

class CreateUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ name, email, admin }: IUserRequest) {
    const userAlreadyExists = await this.usersRepository.findOne({ email });
    if (!email) {
      throw new ErrorRequest("Email Incorret");
    }

    if (userAlreadyExists) {
      throw new ErrorRequest("User Already Exists");
    }

    const user = this.usersRepository.create({
      name,
      email,
      admin,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
