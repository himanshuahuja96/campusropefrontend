import { userService } from '../../feathers';

export const searchUser = term => {
  const regex = new RegExp(term, 'i');
  return userService
    .find({
      query: {
        name: regex,
        role: 'user',
        $limit: 20,
        $select: ['name'],
      },
    })
    .then(res => res.data);
};
