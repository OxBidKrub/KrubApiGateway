import { myDataSource } from "./app-data-source";
import express from "express";
import { User } from "./entity/user.entity";
import userRoute from "./router/user";
import userRepo from "./repo/userRepo";
import { loginLogic } from "./controller/userController";
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

const getUserById = async (call, callback) => {
  callback(null, await userRepo.getUserById(call.request.id));
};

const getAllUsers = async (call) => {
  const users = await userRepo.getAllUsers();
  users.forEach((value) => {
    call.write(value);
  });
  call.end();
};

const topup = async (call, callback) => {
  try {
    const res = await userRepo.topup(call.request.id, call.request.amount)
    callback(null, res);
  } catch (error) {
    console.log(error)
  }
};

const pay = async (call, callback) => {
  callback(
    null,
    await userRepo.pay(
      call.request.payerId,
      call.request.payeeId,
      call.request.amount
    )
  );
};

const getUserByEmail = async (call, callback) => {
  callback(null, await userRepo.getUserByEmail(call.request.email));
};

const createUser = async (call, callback) => {
  callback(null, await userRepo.createUser(call.request));
};

const updateUser = async (call, callback) => {
  callback(
    null,
    await userRepo.updateUser(call.request.id, call.request.mergeData)
  );
};

const deleteUser = async (call, callback) => {
  callback(null, await userRepo.deleteUser(call.request.id));
};

const login = async (call,callback) => {
  callback(null, await loginLogic(call.request.email,call.request.password))
}

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
  
  console.log("grpc listening on 50051")
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // start express server
    app.listen(PORT, ()=>{
      server.start();
      console.log("grpc listening on 50051")
    });
    console.log("server listening on PORT : " + PORT);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());

app.use(userRoute);


