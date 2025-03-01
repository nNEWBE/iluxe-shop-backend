import { User } from "./user.model";
import { isUserExistsAndNotBlocked } from "./user.utils";

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
};

const blockUserFromDB = async (id: string, isBlocked: boolean) => {
    const user = await User.isUserExistsById(id);
    isUserExistsAndNotBlocked(user);
    const result = await User.findByIdAndUpdate(id, { isBlocked }, { new: true });
    return result;
};

const getMe = async (id: string) => {
    const result = await User.isUserExistsByEmail(id);
    return result;
}

export const UserServices = {
    getAllUsersFromDB,
    blockUserFromDB,
    getMe
};