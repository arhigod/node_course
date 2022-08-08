import 'regenerator-runtime/runtime';
import { Op } from 'sequelize';
import crypto from 'crypto';
import UsersService from '../UsersService';

const testId = 13;
const testUser = { age: 42, login: 'testLogin', password: 'testPassword42', destroy: jest.fn(), update: jest.fn() };

const User = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn()
};

describe('UserService', () => {
  test('createUser', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(testId);
    const usersService = new UsersService(User);

    await usersService.createUser(testUser);

    expect(User.create).toHaveBeenCalledWith({ ...testUser, id: testId });
  });

  test('getUsers', async () => {
    const usersService = new UsersService(User);

    await usersService.getUsers({ loginSubstring: 'qwe', limit: 42 });

    expect(User.findAll).toHaveBeenCalledWith({
      where: { login: { [Op.startsWith]: 'qwe' } },
      order: [['login', 'ASC']],
      limit: 42
    });
  });

  test('getUser', async () => {
    const usersService = new UsersService(User);
    const findByPk = jest.spyOn(User, 'findByPk').mockReturnValue(testUser);

    const returnValue = await usersService.getUser(testId);

    expect(findByPk).toHaveBeenCalledWith(testId);
    expect(returnValue).toBe(testUser);
  });

  test('getUser with error', async () => {
    const usersService = new UsersService(User);
    jest.spyOn(User, 'findByPk').mockReturnValue(null);

    try {
      await usersService.getUser(testId);
    } catch (e) {
      expect(e.message).toBe(`User with id '${testId}' not found`);
    }
  });

  test('getUserByLogin', async () => {
    const usersService = new UsersService(User);
    const findOne = jest.spyOn(User, 'findOne').mockReturnValue(testUser);

    const returnValue = await usersService.getUserByLogin(testUser.login);

    expect(findOne).toHaveBeenCalledWith({ where: { login: testUser.login } });
    expect(returnValue).toBe(testUser);
  });

  test('getUserByLogin with error', async () => {
    const usersService = new UsersService(User);
    jest.spyOn(User, 'findOne').mockReturnValue(null);

    try {
      await usersService.getUserByLogin(testUser.login);
    } catch (e) {
      expect(e.message).toBe(`User with login '${testUser.login}' not found`);
    }
  });

  test('deleteUser', async () => {
    const usersService = new UsersService(User);
    const getUser = jest.spyOn(usersService, 'getUser').mockReturnValue(testUser);

    await usersService.deleteUser(testId);

    expect(getUser).toHaveBeenCalledWith(testId);
    expect(testUser.destroy).toHaveBeenCalled();
  });

  test('updateUser', async () => {
    const usersService = new UsersService(User);
    const getUser = jest.spyOn(usersService, 'getUser').mockReturnValue(testUser);

    await usersService.updateUser(testId, { age: 66 });

    expect(getUser).toHaveBeenCalledWith(testId);
    expect(testUser.update).toHaveBeenCalledWith({
      login: testUser.login,
      password: testUser.password,
      age: 66
    });
  });
});
