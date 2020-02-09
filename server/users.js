const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // checks the users array  and finds if the users is trying to signup with an existing username in the same room.
  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  // if the user name is not taken than we can create a new user and push into users array
  const user = { id, name, room };
  users.push(user);
  return { user };
};

// removes the user from array
const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, (1)[0]);
  }
};

// find the users
const getUser = id => users.find(user => user.id === id);

// filter through the users in the room
const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
