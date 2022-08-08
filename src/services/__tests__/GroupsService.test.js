import 'regenerator-runtime/runtime';
import crypto from 'crypto';
import GroupsService from '../GroupsService';

const testId = 13;
const testGroup = { name: 'testName', permissions: 'testPermissions', destroy: jest.fn(), update: jest.fn() };

const Group = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn()
};

describe('GroupsService', () => {
  test('createGroup', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(testId);
    const groupsService = new GroupsService(Group);

    await groupsService.createGroup(testGroup);

    expect(Group.create).toHaveBeenCalledWith({ ...testGroup, id: testId });
  });

  test('getGroup', async () => {
    const groupsService = new GroupsService(Group);
    const findByPk = jest.spyOn(Group, 'findByPk').mockReturnValue(testGroup);

    const returnValue = await groupsService.getGroup(testId);

    expect(findByPk).toHaveBeenCalledWith(testId);
    expect(returnValue).toBe(testGroup);
  });

  test('getGroup with error', async () => {
    const groupsService = new GroupsService(Group);
    jest.spyOn(Group, 'findByPk').mockReturnValue(null);

    try {
      await groupsService.getGroup(testId);
    } catch (e) {
      expect(e.message).toBe(`Group with id '${testId}' not found`);
    }
  });

  test('deleteGroup', async () => {
    const groupsService = new GroupsService(Group);
    const getGroup = jest.spyOn(groupsService, 'getGroup').mockReturnValue(testGroup);

    await groupsService.deleteGroup(testId);

    expect(getGroup).toHaveBeenCalledWith(testId);
    expect(testGroup.destroy).toHaveBeenCalled();
  });

  test('updateGroup', async () => {
    const groupsService = new GroupsService(Group);
    const getGroup = jest.spyOn(groupsService, 'getGroup').mockReturnValue(testGroup);

    await groupsService.updateGroup(testId, { name: 'qwe' });

    expect(getGroup).toHaveBeenCalledWith(testId);
    expect(testGroup.update).toHaveBeenCalledWith({
      permissions: testGroup.permissions,
      name: 'qwe'
    });
  });
});
