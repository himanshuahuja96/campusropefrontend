import feathers from '@feathersjs/client';
import findOne from 'feathers-findone';
const client = feathers();
// const restClient = feathers.rest('http://localhost:3030');
const restClient = feathers.rest('https://campusrope.herokuapp.com');

client.configure(restClient.fetch(window.fetch));
client.configure(findOne());
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  }),
);

export const userService = client.service('users');
export const constantsService = client.service('constants');
export const adminTasksService = client.service('admin-tasks');

export default client;
