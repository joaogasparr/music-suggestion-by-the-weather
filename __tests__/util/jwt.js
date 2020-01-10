import faker from 'faker';
import jwt from 'jsonwebtoken';

import authConfig from '../../src/config/auth';

export default async () => {
  const id = faker.random.number();

  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
};
