import { Op } from 'sequelize';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';

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

  async getUserByLogin(login) {
    const user = await this.model.findOne({ where: { login } });

    if (user) {
      return user;
    } else {
      throw Error(`User with login '${login}' not found`);
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

  async authorizeUser(login, password) {
    const user = await this.getUserByLogin(login);

    if (user.password !== password) {
      throw Error(`Login and/or password are incorrect`);
    }

    return jwt.sign({ login }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_MAX_AGE });
  }
}
