import { ErrorRequest } from "../classes/ErrorRequest";
import { getCustomRepository, Repository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { Compliment } from "../entities/Compliments";
import { IComplimentsRequest } from "../interfaces/IComplimentsRequest";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { User } from "../entities/User";
import { TagRepositories } from "../repositories/TagRepositories";
import { Tag } from "src/entities/Tag";

class CreateComplimentService {
  private complimentRepository: Repository<Compliment>;
  private usersRepository: Repository<User>;
  private tagsRepository: Repository<Tag>;
  constructor() {
    this.complimentRepository = getCustomRepository(ComplimentsRepositories);
    this.usersRepository = getCustomRepository(UsersRepositories);
    this.tagsRepository = getCustomRepository(TagRepositories);
  }

  async execute({
    user_sender_id,
    user_receiver_id,
    message,
    tag_id,
  }: IComplimentsRequest) {
    const UserReceiverExists = await this.usersRepository.findOne(
      user_receiver_id
    );
    if (user_receiver_id == user_sender_id) {
      throw new ErrorRequest("Incorret User Receiver");
    }

    if (!UserReceiverExists) {
      throw new ErrorRequest("User Receiver not found");
    }
    const TagExists = await this.tagsRepository.findOne(tag_id);
    if (!TagExists) {
      throw new ErrorRequest("Tag not found");
    }

    const Compliment = await this.complimentRepository.create({
      user_sender_id,
      user_receiver_id,
      message,
      tag_id,
    });
    await this.complimentRepository.save(Compliment);

    return Compliment;
  }
}

export { CreateComplimentService };
