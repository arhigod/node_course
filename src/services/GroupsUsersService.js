import db from '../data-access/db';

export default class GroupUsersService {
  constructor(modelUsersGroups) {
    this.modelUsersGroups = modelUsersGroups;
  }

  async getGroupsUsers() {
    return this.modelUsersGroups.findAll();
  }

  async createGroupUsers(groupId, userIds) {
    const t = await db.transaction();

    try {
      const responses = await Promise.all(
        userIds.map(async userId => await this.modelUsersGroups.create({ groupId, userId }, { transaction: t }))
      );

      await t.commit();

      return responses;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  }
}
