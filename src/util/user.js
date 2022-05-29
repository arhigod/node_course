import users from '../data/Users.json';

export const isLoginUniq = (login, id) => users.every(user => (id && user.id === id) || user.login !== login);
