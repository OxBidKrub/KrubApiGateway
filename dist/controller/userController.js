"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLogic = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userStub_1 = tslib_1.__importDefault(require("../repo/userStub"));
const { getAllUsers, topup, pay, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = userStub_1.default;
const loginLogic = (user, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (user == null) {
        throw new Error("User not found");
    }
    try {
        if (yield bcrypt_1.default.compare(password, user.password)) {
            const tokenData = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
            };
            const accessToken = yield jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "7d" });
            return { accessToken: accessToken };
        }
        else {
            throw new Error("Incorrect password");
        }
    }
    catch (error) {
    }
});
exports.loginLogic = loginLogic;
//# sourceMappingURL=userController.js.map