import { Op } from 'sequelize';
import { randomUUID } from 'crypto';

export default class UsersService {
  constructor(model) {
    this.model = model;
  }

  async createUser(user) {
    return this.model.create({ id: randomUUID(), ...user });
  }

  async getUsers({ loginSubstring = '', limit }) {
    return this.model.findAll({
      where: { login: { [Op.startsWith]: loginSubstring } },
      order: [['login', 'ASC']],
      limit: limit ?? null
    });
  }

  async getUser(id) {
    const user = await this.model.findByPk(id);

    if (user) {
      return user;
    } else {
      throw Error(`User with id '${id}' not found`);
    }
  }

  async deleteUser(id) {
    const user = await this.getUser(id);

    return user.destroy();
  }

  async updateUser(id, { login, password, age }) {
    const user = await this.getUser(id);

    return user.update({
      login: login ?? user.login,
      password: password ?? user.password,
      age: age ?? user.age
    });
  }
}
