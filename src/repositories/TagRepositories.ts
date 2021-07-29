import { Tag } from "../entities/Tag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Tag)
class TagRepositories extends Repository<Tag> {}

export { TagRepositories };
