import models from '../models/index';
import BaseRepository from './baseRepository';

class UserGroupsRepository extends BaseRepository {
  getWithUsers(id) {
    return this.model.findAll({
      where: { id },
      include: [
        {
          model: models.User,
        },
      ],
    });
  }

  getAllWithUsers() {
    return this.model.findAll({
      include: [
        {
          model: models.User,
        },
      ],
    });
  }

  getAllGroupsWithUsers() {
    return this.model.findAll({
      include: [
        {
          model: models.User,
        },
      ],
    });
  }
}

export default new UserGroupsRepository(models.UserGroups);
