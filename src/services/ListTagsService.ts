import { Tag } from "../entities/Tag";
import { ErrorRequest } from "../classes/ErrorRequest";
import { getCustomRepository, Repository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";

class ListTagsService {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getCustomRepository(TagRepositories);
  }

  async execute() {
    const TagsExists = await this.tagsRepository.find();
    return TagsExists;
  }
}

export { ListTagsService };
