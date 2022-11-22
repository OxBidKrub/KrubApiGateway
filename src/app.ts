import express from "express";
import userStub from "repo/userStub";
import bidRoute from "./router/bid";
import userRoute from "./router/user";
import reviewRoute from "./router/review";
import auctionItemRoute from "./router/auctionItem";
import cors from "cors";
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

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoute);
app.use(reviewRoute);
// app.use(auctionItemRoute);
app.use(bidRoute);
app.listen(PORT, async () => {
  console.log("server listening on PORT : " + PORT);
});
