import { randomUUID } from 'crypto';

export default class GroupsService {
  constructor(model) {
    this.model = model;
  }

  async createGroup(group) {
    return this.model.create({ id: randomUUID(), ...group });
  }

  async getGroups({ limit }) {
    return this.model.findAll({
      order: [['name', 'ASC']],
      limit: limit ?? null
    });
  }

  async getGroup(id) {
    const group = await this.model.findByPk(id);

    if (group) {
      return group;
    } else {
      throw Error(`Group with id '${id}' not found`);
    }
  }

  async deleteGroup(id) {
    const group = await this.getGroup(id);

    return group.destroy();
  }

  async updateGroup(id, { name, permissions }) {
    const group = await this.getGroup(id);

    return group.update({
      name: name ?? group.name,
      permissions: permissions ?? group.permissions
    });
  }
}
