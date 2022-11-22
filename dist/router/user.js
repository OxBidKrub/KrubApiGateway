"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userStub_1 = tslib_1.__importDefault(require("../repo/userStub"));
const userStub_2 = tslib_1.__importDefault(require("../repo/userStub"));
const publishReview_1 = require("../util/publishReview");
const { getAllUsers, topup, pay, getUserById, createUser, updateUser, deleteUser, getUserByEmail, } = userStub_1.default;
var router = express_1.default.Router();
router.get("/users", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        userStub_2.default.stub.getAllUsers(null, (err, data) => {
            if (!err) {
                res.send(data.users);
            }
            else {
                res.status(500).send(err);
            }
        });
    });
});
router.get("/users/getMyTokenInfo", authorization_1.authenticateToken, (req, res) => {
    res.send(req.user);
});
router.get("/users/getMyInfo", authorization_1.authenticateToken, (req, res) => {
    userStub_2.default.stub.getUserById({ id: req.user.id }, (err, data) => {
        if (!err) {
            res.send({ data });
        }
        else {
            res.status(500).send(err);
        }
    });
});
router.post("/users/topup", authorization_1.authenticateToken, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id == req.body.id) {
        try {
            userStub_2.default.stub.topup({ id: req.user.id, amount: req.body.amount }, (err, data) => {
                if (!err) {
                    res.send(data);
                }
                else {
                    res.status(500).send(err);
                }
            });
        }
        catch (error) {
            res.status(400).send("Topup unsuccessful");
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
}));
router.post("/users/pay", authorization_1.authenticateToken, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id == req.body.payerId) {
        userStub_2.default.stub.pay({
            payerId: req.user.id,
            payeeId: req.body.payeeId,
            amount: req.body.amount,
        }, (err, data) => {
            if (!err) {
                res.send(data);
            }
            else {
                res.status(500).send({ error: "top up unsuccessfull" });
            }
        });
    }
    else {
        res.status(400).send("Invalid Token");
    }
}));
router.get("/users/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield getUserById(req.params.id);
        userStub_2.default.stub.getUserById({ id: req.body.id }, (err, data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!err) {
                const nonSenstive = (({ username, firstName, lastName, money, email, phoneNumber, address, }) => ({
                    username,
                    firstName,
                    lastName,
                    money,
                    email,
                    phoneNumber,
                    address,
                }))(data);
                res.send(nonSenstive);
            }
            else {
                res.status(500).send(err);
            }
        }));
        // const nonSensitiveData = {firstName:user.firstName,lastName:user.lastName}
        //return res.send(user);
    });
});
router.post("/users/login", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        userStub_2.default.stub.login({ email: req.body.email, password: req.body.password }, (err, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (!err) {
                res.send(data);
            }
            else {
                res.status(500).send(err);
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
router.post("/users", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const salt = yield bcrypt_1.default.genSalt();
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            const tempUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                money: req.body.money,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
            };
            console.log(tempUser);
            userStub_2.default.stub.createUser(tempUser, (err, data) => {
                if (!err) {
                    res.send(data);
                }
                else {
                    res.status(500).send({ error: "user creation failed" });
                }
            });
        }
        catch (error) {
            res.status(500).send("error");
        }
    });
});
router.put("/users/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (req.user.id == req.params.id) {
            userStub_2.default.stub.updateUser(Object.assign({ id: req.params.id }, req.body), (err, data) => {
                if (!err) {
                    res.send(data);
                }
                else {
                    res.status(500).send({ error: "user creation failed" });
                }
            });
        }
        else {
            res.status(400).send({ error: "Token Invalid" });
        }
    });
});
router.delete("/users/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (req.user.id == req.params.id) {
            userStub_2.default.stub.deleteUser({ id: req.params.id }, (err, data) => {
                if (!err) {
                    res.send(data);
                }
                else {
                    res.status(500).send({ error: "user creation failed" });
                }
            });
        }
        else {
            res.status(400).send({ error: "Token Invalid" });
        }
    });
});
router.post("/reviews", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data);
            yield (0, publishReview_1.PublishMessage)(data);
            res.send("success");
        }
        catch (error) {
            res.status(500).send("error");
        }
    });
});
module.exports = router;
//# sourceMappingURL=user.js.map