import { myDataSource } from "./app-data-source";
import express from "express";
import { User } from "./entity/user.entity";
import userRoute from "./router/user";
import userRepo from "./repo/userRepo";
import { loginLogic } from "./controller/userController";
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
import { getListUsers } from "./stub"
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
app.use(express.json());

app.use(userRoute);

app.listen(PORT, async () => {console.log("server listening on PORT : " + PORT);
    await getListUsers(()=>console.log("end"))});
    
  
