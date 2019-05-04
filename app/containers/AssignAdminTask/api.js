import { adminTasksService } from '../../feathers';

export function getAdminTasksForUser(userId) {
  if (userId) {
    return adminTasksService
      .find({
        query: {
          userId,
        },
      })
      .then(res => res[0]); // this is called on auto complete . the above if condition is to avoid unwanted network requests
  }
  return [];
}

export function saveAdminTasksApi({ tasks, selectedUser }) {
  return adminTasksService.patch(
    null,
    { tasks },
    {
      query: {
        userId: selectedUser,
      },
    },
  );
}
