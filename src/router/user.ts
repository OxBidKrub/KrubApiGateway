import express from 'express';
import { authenticateToken } from '../middleware/authorization';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import userRepo from '../repo/userRepo';
import { loginLogic } from '../controller/userController';

const { getAllUsers, topup , pay, getUserById, createUser, updateUser, deleteUser, getUserByEmail} = userRepo
var router = express.Router();
router.get("/users", async function (req: Request, res: Response) {
    const users = await getAllUsers()
    res.json(users);
  });
  
  router.get('/users/getMyTokenInfo',authenticateToken,(req : any,res) => {
      res.send(req.user)
  })

  router.get('/users/getMyInfo',authenticateToken,(req : any,res) => {
    const result = getUserById(req.user.id)
    res.send(result)
})
  
  router.post('/users/topup',authenticateToken,async (req : any,res) => {
      if(req.user.id == req.body.id){
         try {
           const topupres =  await topup(req.user.id,req.body.amount);
          res.send("Topup success")
         } catch (error) {
          res.status(400).send("Topup not successful")
         }
         
      }else{
          res.status(400).send("Invalid Token")
      }
      
  })
  
  router.post('/users/pay',authenticateToken,async (req : any,res) => {
      if(req.user.id == req.body.payerId){
         try {
           const paymentres =  await pay(req.user.id,req.body.payeeId,req.body.amount);
           res.send(paymentres)
         } catch (error) {
          res.status(400).send("payment not successfull")
         }
         
         
      }else{
          res.status(400).send("Invalid Token")
      }
  })
  
  router.get("/users/:id", async function (req: any, res: any) {
    const user = await getUserById(req.params.id)
    const nonSensitiveData = {firstName:user.firstName,lastName:user.lastName}
    return res.send(user);
  });
  
  
  router.post("/users/login",async (req,res) =>{
      try {
          const access = await loginLogic(req.body.email,req.body.password)
          res.send(access)
      } catch (error) {
        res.status(500).send(error)
      }
  });
  
  router.post("/users", async function (req: any, res: any) {
    console.log(req.body);
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const tempUser = { ...req.body, password: hashedPassword };
     
      const results = await createUser(tempUser)
      return res.send(results);
    } catch (error) {
      res.status(500).send(error.code || error);
    }
  });
  
  router.put("/users/:id", async function (req: any, res: any) {
    const results = await updateUser(req.params.id,req.body)
    return res.send(results);
  });
  
  router.delete("/users/:id", async function (req:any, res: any) {
    try {
      const results = await deleteUser(req.params.id)
      res.send("success");
    } catch (error) {
      res.status(500).send("error")
    }
  });
  export=router;