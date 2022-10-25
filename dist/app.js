"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_data_source_1 = require("./app-data-source");
const express_1 = tslib_1.__importDefault(require("express"));
const user_1 = tslib_1.__importDefault(require("./router/user"));
const userRepo_1 = tslib_1.__importDefault(require("./repo/userRepo"));
const userController_1 = require("./controller/userController");
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
//grpc
var PROTO_PATH = __dirname + "/protos/user.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var UserService = protoDescriptor.UserService;
const getUserById = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield userRepo_1.default.getUserById(call.request.id));
});
const getAllUsers = (call) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepo_1.default.getAllUsers();
    users.forEach((value) => {
        call.write(value);
    });
    call.end();
});
const topup = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield userRepo_1.default.topup(call.request.id, call.request.amount);
        callback(null, res);
    }
    catch (error) {
        console.log(error);
    }
});
const pay = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield userRepo_1.default.pay(call.request.payerId, call.request.payeeId, call.request.amount));
});
const getUserByEmail = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield userRepo_1.default.getUserByEmail(call.request.email));
});
const createUser = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield userRepo_1.default.createUser(call.request));
});
const updateUser = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield userRepo_1.default.updateUser(call.request.id, call.request.mergeData));
});
const deleteUser = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield userRepo_1.default.deleteUser(call.request.id));
});
const login = (call, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    callback(null, yield (0, userController_1.loginLogic)(call.request.email, call.request.password));
});
function getServer() {
    var server = new grpc.Server();
    server.addService(UserService.UserService.service, {
        getUserById,
        getAllUsers,
        topup,
        pay,
        getUserByEmail,
        createUser,
        updateUser,
        deleteUser,
        login
    });
    return server;
}
var server = getServer();
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("grpc listening on 50051");
});
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    // start express server
    app.listen(PORT, () => {
        server.start();
        console.log("grpc listening on 50051");
    });
    console.log("server listening on PORT : " + PORT);
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(user_1.default);
//# sourceMappingURL=app.js.map