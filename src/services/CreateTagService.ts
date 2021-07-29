import { Tag } from "../entities/Tag";
import { ErrorRequest } from "../classes/ErrorRequest";
import { getCustomRepository, Repository } from "typeorm";
import { ITagRequest } from "../interfaces/ITagRequest";
import { TagRepositories } from "../repositories/TagRepositories";

class CreateTagService {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getCustomRepository(TagRepositories);
  }

  async execute({ name }: ITagRequest) {
    const TagAlreadyExists = await this.tagsRepository.findOne({ name });

    if (!name) {
      throw new ErrorRequest("Tag Name Incorrect");
    }
    if (TagAlreadyExists) {
      throw new ErrorRequest("Tag Already Exists");
    }
    const Tag = this.tagsRepository.create({
      name,
    });

    await this.tagsRepository.save(Tag);

    return Tag;
  }
}

export { CreateTagService };
