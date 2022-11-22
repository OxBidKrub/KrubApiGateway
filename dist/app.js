"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bid_1 = tslib_1.__importDefault(require("./router/bid"));
const user_1 = tslib_1.__importDefault(require("./router/user"));
const review_1 = tslib_1.__importDefault(require("./router/review"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const PORT = process.env.PORT || 9005;
const JWT_SECRET = process.env.JWT_SECRET;
//express
// myDataSource
//   .initialize()
//   .then(async () => {
//     console.log("Data Source has been initialized!");
//     // start express server
//     app.listen(PORT, () => {});
//     console.log("server listening on PORT : " + PORT);
//     await getListUsers(()=>console.log("end"))
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(user_1.default);
app.use(review_1.default);
// app.use(auctionItemRoute);
app.use(bid_1.default);
app.listen(PORT, () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("server listening on PORT : " + PORT);
}));
//# sourceMappingURL=app.js.map