// ----------------------------------------------------------------------

import userStore from "../stores/UserStore";

const {username} = userStore

const account = {
  displayName: username,
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
