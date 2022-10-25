var PROTO_PATH =  __dirname + "/protos/user.proto";
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
var client = new UserService.UserService(
  "userservice:50051",
  grpc.credentials.createInsecure()
);

const getListUsers = (callback) => {
  var call = client.getAllUsers({});
  call.on("data", function (user) {
    console.log(user);
  });
  call.on("end", callback);
};

const getUserById = () => {};

const topup = () => {};
const pay = () => {};
const getUserByEmail = () => {};
const createUser = () => {};
const updateUser = () => {};
const deleteUser = () => {};
const login = () => {};

export {
  getListUsers,
  getUserById,
  getUserByEmail,
  topup,
  pay,
  createUser,
  updateUser,
  deleteUser,
  login,
};
