import { getCustomRepository, Repository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { Compliment } from "../entities/Compliments";
class ListComplimentsByUserReceivedService {
  private complimentRepository: Repository<Compliment>;

  constructor() {
    this.complimentRepository = getCustomRepository(ComplimentsRepositories);
  }

  async execute(user_id: string) {
    const complimentsUser = await this.complimentRepository.find({
      where: { user_received: user_id },
      relations: ["user_sender", "user_received", "tag"],
    });

    return complimentsUser;
  }
}

export { ListComplimentsByUserReceivedService };
