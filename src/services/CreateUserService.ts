import { ErrorRequest } from "../classes/ErrorRequest";
import { User } from "../entities/User";
import { getCustomRepository, Repository } from "typeorm";
import { IUserRequest } from "../interfaces/IUserRequest";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
class CreateUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ name, email, admin, password }: IUserRequest) {
    const userAlreadyExists = await this.usersRepository.findOne({ email });
    if (!email) {
      throw new ErrorRequest("Email Incorret");
    }

    if (userAlreadyExists) {
      throw new ErrorRequest("User Already Exists");
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await this.usersRepository.save(user);
    delete user.password;
    return user;
  }
}

export { CreateUserService };
