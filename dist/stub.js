"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.pay = exports.topup = exports.getUserByEmail = exports.getUserById = exports.getListUsers = void 0;
var PROTO_PATH = __dirname + "/protos/user.proto";
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
var client = new UserService.UserService("userservice:50051", grpc.credentials.createInsecure());
const getListUsers = (callback) => {
    var call = client.getAllUsers({});
    call.on("data", function (user) {
        console.log(user);
    });
    call.on("end", callback);
};
exports.getListUsers = getListUsers;
const getUserById = () => { };
exports.getUserById = getUserById;
const topup = () => { };
exports.topup = topup;
const pay = () => { };
exports.pay = pay;
const getUserByEmail = () => { };
exports.getUserByEmail = getUserByEmail;
const createUser = () => { };
exports.createUser = createUser;
const updateUser = () => { };
exports.updateUser = updateUser;
const deleteUser = () => { };
exports.deleteUser = deleteUser;
const login = () => { };
exports.login = login;
//# sourceMappingURL=stub.js.map