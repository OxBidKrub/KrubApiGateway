"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PROTO_PATH = __dirname + "/../protos/user.proto";
var async = require("async");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
var stub = new UserService.UserService("userservice:50051", grpc.credentials.createInsecure());
const getAllUsers = (callback) => {
    var call = stub.getAllUsers({});
    const users = [];
    call.on("data", function (user) {
        console.log(user);
        users.push(user);
    });
    call.on("end", () => {
        callback(users);
    });
};
const getUserById = (uid) => {
    stub.getUserById(uid, (err, user) => {
        if (err) {
            return err;
        }
        else {
            return user;
        }
    });
};
const topup = (topupReq) => {
    stub.topup(topupReq, (err, topupRes) => {
        if (err) {
            return err;
        }
        else {
            return topupRes;
        }
    });
};
const pay = (payReq) => {
    stub.pay(payReq, (err, payRes) => {
        if (err) {
            return err;
        }
        else {
            return payRes;
        }
    });
};
;
const getUserByEmail = (email) => {
    stub.getUserByEmail(email, (err, user) => {
        if (err) {
            return err;
        }
        else {
            return user;
        }
    });
};
;
const createUser = (createUser) => {
    stub.createUser(createUserReq, (err, user) => {
        if (err) {
            return err;
        }
        else {
            return user;
        }
    });
};
;
const updateUser = (updateReq) => {
    stub.updateUser(updateReq, (err, user) => {
        if (err) {
            return err;
        }
        else {
            return user;
        }
    });
};
;
const deleteUser = (uid) => {
    stub.deleteUser(uid, (err, deleteRes) => {
        if (err) {
            return err;
        }
        else {
            return deleteRes;
        }
    });
};
;
const login = (Login) => {
    stub.login(Login, (err, acessToken) => {
        if (err) {
            return err;
        }
        else {
            return accessToken;
        }
    });
};
;
exports.default = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    topup,
    pay,
    createUser,
    updateUser,
    deleteUser,
    login,
    stub
};
//# sourceMappingURL=userStub.js.map