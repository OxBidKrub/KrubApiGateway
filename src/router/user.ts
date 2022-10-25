import express from "express";
import { authenticateToken } from "../middleware/authorization";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import userRepo from "../repo/userStub";
import { loginLogic } from "../controller/userController";
import userStub from "../repo/userStub";

const {
  getAllUsers,
  topup,
  pay,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = userRepo;
var router = express.Router();
router.get("/users", authenticateToken, async function (req: any, res: any) {
  userStub.stub.getAllUsers(null, (err, data) => {
    if (!err) {
      res.send(data.users);
    }
    res.status(500).send(err);
  });
});

router.get("/users/getMyTokenInfo", authenticateToken, (req: any, res) => {
  res.send(req.user);
});

router.get("/users/getMyInfo", authenticateToken, (req: any, res) => {
  userStub.stub.getUserById({ id: req.user.id }, (err, data) => {
    if (!err) {
      res.send({ data });
    }
    res.status(500).send(err);
  });
});

router.post("/users/topup", authenticateToken, async (req: any, res) => {
  if (req.user.id == req.body.id) {
    try {
      userStub.stub.topup(
        { id: req.user.id, amount: req.body.amount },
        (err, data) => {
          if (!err) {
            res.send({ data });
          }
          res.status(500).send(err);
        }
      );
    } catch (error) {
      res.status(400).send("Topup not successful");
    }
  } else {
    res.status(400).send("Invalid Token");
  }
});

router.post("/users/pay", authenticateToken, async (req: any, res) => {
  if (req.user.id == req.body.payerId) {
    userStub.stub.pay(
      {
        payerId: req.user.id,
        payeeId: req.body.payeeId,
        amount: req.body.amount,
      },
      (err, data) => {
        if (!err) {
          res.send({ data });
        }
        res.status(500).send(err);
      }
    );
  } else {
    res.status(400).send("Invalid Token");
  }
});

router.get("/users/:id", async function (req: any, res: any) {
  const user = await getUserById(req.params.id);
  // const nonSensitiveData = {firstName:user.firstName,lastName:user.lastName}
  return res.send(user);
});

router.post("/users/login", async (req, res) => {
  try {
    userStub.stub.getUserByEmail(
      { email: req.body.email },
      async (err, data) => {
        if (!err) {
          const access = await loginLogic(data, req.body.password);
          console.log(access);
          res.send(access);
        }
        res.status(500).send(err);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/users", async function (req: any, res: any) {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const tempUser = { ...req.body, password: hashedPassword };

    const results = await createUser(tempUser);
    return res.send(results);
  } catch (error) {
    res.status(500).send(error.code || error);
  }
});

router.put("/users/:id", async function (req: any, res: any) {
  const results = await updateUser({ id: req.params.id, ...req.body });
  return res.send(results);
});

router.delete("/users/:id", async function (req: any, res: any) {
  try {
    const results = await deleteUser({ id: req.params.id });
    res.send("success");
  } catch (error) {
    res.status(500).send("error");
  }
});
export = router;
