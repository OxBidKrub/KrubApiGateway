const tslib_1 = require("tslib");
var PROTO_PATH = __dirname + "/protos/user.proto";
var async = require('async');
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
var client = new UserService.UserService(":50051", grpc.credentials.createInsecure());
function getListUsers(callback) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var call = client.getAllUsers({});
        call.on("data", function (user) {
            console.log(user);
        });
        call.on("end", callback);
    });
}
getListUsers((value) => console.log("End of message"));
//# sourceMappingURL=client.js.map