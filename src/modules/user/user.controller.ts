import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { User } from "./user.model";

const getAllUsers = catchAsync(async (req, res) => {
    const result = await User.find({});
    sendResponse(res, {
        success: true,
        message: 'Users fetched successfully',
        statusCode: httpStatus.OK,
        data: result
    });
});

export const UserController = {
    getAllUsers
};