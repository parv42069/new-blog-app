import User from '../../models/User';
export default {
  Query: {
    async user(_: any, { id }: any) {
      const user = await User.findById(id);
      return user;
    },
    async users() {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    async addNewUser(_: any, { addUserInput: { username, email } }: any) {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        const newUser = new User({
          username: username,
          email: email.toLowerCase(),
        });
        await newUser.save();
        return newUser;
      }
      return existingUser;
    },
  },
};
