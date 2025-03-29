import { User } from "./user.model";
import { checkBlockUser } from "./user.utils";

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
};

const updateUserFromDB = async (id: string, body: Record<string, unknown>) => {
    const result = await User.findByIdAndUpdate(id, body, { new: true });
    return result;
};

const blockUserFromDB = async (id: string, isBlocked: boolean) => {
    const user = await User.isUserExistsById(id);
    checkBlockUser(user,isBlocked);
    const result = await User.findByIdAndUpdate(id, { isBlocked }, { new: true });
    return result;
};

const getMe = async (id: string) => {
    const result = await User.isUserExistsByEmail(id);
    return result;
}

export const UserServices = {
    getAllUsersFromDB,
    updateUserFromDB,
    blockUserFromDB,
    getMe
};