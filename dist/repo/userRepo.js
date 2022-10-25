"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_data_source_1 = require("../app-data-source");
const user_entity_1 = require("../entity/user.entity");
const getAllUsers = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).find(); });
const getUserById = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
        id: id,
    });
});
const topup = (id, amount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const topup = yield app_data_source_1.myDataSource.transaction("SERIALIZABLE", (transactionalEntityManager) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const user = yield transactionalEntityManager
                .getRepository(user_entity_1.User)
                .findOneBy({ id });
            user.money += amount;
            yield transactionalEntityManager.getRepository(user_entity_1.User).save(user);
            return { message: "Topup successfull" };
        }));
        return { message: "Topup successfull" };
    }
    catch (error) {
        console.log(error);
        return { error: "Topup failed" };
    }
});
const pay = (payerId, payeeId, amount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const pay = yield app_data_source_1.myDataSource.transaction("SERIALIZABLE", (transactionalEntityManager) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const payer = yield transactionalEntityManager
                .getRepository(user_entity_1.User)
                .findOneBy({ id: payerId });
            const payee = yield transactionalEntityManager
                .getRepository(user_entity_1.User)
                .findOneBy({ id: payeeId });
            payer.money -= amount;
            payee.money += amount;
            yield transactionalEntityManager
                .getRepository(user_entity_1.User)
                .save([payer, payee]);
        }));
        return { message: "Payment successful" };
    }
    catch (error) {
        return { error: 'payment failed' };
    }
});
const getUserByEmail = (email) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
        email: email,
    });
});
const createUser = (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const createdUser = app_data_source_1.myDataSource.getRepository(user_entity_1.User).create(user);
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(createdUser);
});
const updateUser = (id, mergeData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
        id,
    });
    app_data_source_1.myDataSource.getRepository(user_entity_1.User).merge(user, mergeData);
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
});
const deleteUser = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).delete(id);
});
exports.default = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    topup,
    pay,
    createUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=userRepo.js.map