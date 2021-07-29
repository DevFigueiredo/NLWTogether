import { User } from "src/entities/User";
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
      throw new Error("Email Incorret");
    }

    if (userAlreadyExists) {
      throw new Error("User Already Exists");
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
