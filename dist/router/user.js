"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userRepo_1 = tslib_1.__importDefault(require("../repo/userRepo"));
const userController_1 = require("../controller/userController");
const { getAllUsers, topup, pay, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = userRepo_1.default;
var router = express_1.default.Router();
router.get("/users", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const users = yield getAllUsers();
        res.json(users);
    });
});
router.get('/users/getMyTokenInfo', authorization_1.authenticateToken, (req, res) => {
    res.send(req.user);
});
router.get('/users/getMyInfo', authorization_1.authenticateToken, (req, res) => {
    const result = getUserById(req.user.id);
    res.send(result);
});
router.post('/users/topup', authorization_1.authenticateToken, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id == req.body.id) {
        try {
            const topupres = yield topup(req.user.id, req.body.amount);
            res.send("Topup success");
        }
        catch (error) {
            res.status(400).send("Topup not successful");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
}));
router.post('/users/pay', authorization_1.authenticateToken, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id == req.body.payerId) {
        try {
            const paymentres = yield pay(req.user.id, req.body.payeeId, req.body.amount);
            res.send(paymentres);
        }
        catch (error) {
            res.status(400).send("payment not successfull");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
}));
router.get("/users/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield getUserById(req.params.id);
        const nonSensitiveData = { firstName: user.firstName, lastName: user.lastName };
        return res.send(user);
    });
});
router.post("/users/login", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const access = yield (0, userController_1.loginLogic)(req.body.email, req.body.password);
        res.send(access);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.post("/users", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const salt = yield bcrypt_1.default.genSalt();
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            const tempUser = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
            const results = yield createUser(tempUser);
            return res.send(results);
        }
        catch (error) {
            res.status(500).send(error.code || error);
        }
    });
});
router.put("/users/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const results = yield updateUser(req.params.id, req.body);
        return res.send(results);
    });
});
router.delete("/users/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield deleteUser(req.params.id);
            res.send("success");
        }
        catch (error) {
            res.status(500).send("error");
        }
    });
});
module.exports = router;
//# sourceMappingURL=user.js.map