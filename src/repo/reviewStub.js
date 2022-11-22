var PROTO_PATH = __dirname + "/../protos/review.proto";
var async = require("async");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  defaults: true,
  longs: String,
});
const REVIEW_SERVICE_HOST = process.env.REVIEW_SERVICE_HOST || "reviewservice";
const REVIEW_SERVICE_PORT = process.env.REVIEW_SERVICE_PORT || "8005";

var ReviewService = grpc.loadPackageDefinition(packageDefinition).ReviewService;
var stub = new ReviewService.ReviewService(
  `${REVIEW_SERVICE_HOST}:${REVIEW_SERVICE_PORT}`,
  grpc.credentials.createInsecure()
  //   grpc.credentials.createSsl()
);

const getAllReviews = (uid) => {
  stub.getReviewById(uid, (err, result) => {
    console.log("STUB", err, result);
    if (err) {
      return err;
    } else {
      return result;
    }
  });
};

export default {
  getAllReviews,
  stub,
};
