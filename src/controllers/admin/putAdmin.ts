import  UserModel from '../../models/UserModel'

const toggleAdminStatus = async (userID: string): Promise<string> => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: userID
      }
    });

    if (!user) {
      throw new Error("The ID does not exist");
    }

    user.admin = !user.admin;
    await user.save();

    if (user.admin) {
      return `${user.name} ${user.lastName} is now an admin`;
    } else {
      return `${user.name} ${user.lastName} is now a regular user`;
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while updating user admin status";
    throw new Error(errorMessage);
  }
};

export default toggleAdminStatus;
