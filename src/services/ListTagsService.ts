import { Tag } from "../entities/Tag";
import { ErrorRequest } from "../classes/ErrorRequest";
import { getCustomRepository, Repository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";
import { classToPlain } from "class-transformer";
class ListTagsService {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getCustomRepository(TagRepositories);
  }

  async execute() {
    const TagsExists = await this.tagsRepository.find();

    return classToPlain(TagsExists);
  }
}

export { ListTagsService };
