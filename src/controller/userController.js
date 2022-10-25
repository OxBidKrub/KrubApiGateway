import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepo from "../repo/userStub";
const { getAllUsers, topup , pay, getUserById, createUser, updateUser, deleteUser, getUserByEmail} = userRepo

const loginLogic = async (user, password) => {
    
    if (user == null) {
      throw new Error("User not found");
    }
    try {
      if (await bcrypt.compare(password,user.password)) {
        const tokenData = {
          id: user.id,
          username: user.username,
          firstName:user.firstName,
          lastName:user.lastName,
          email: user.email,
          address:user.address,
        };
        const accessToken = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"7d"})
        return {accessToken:accessToken}
      } else {
        throw new Error("Incorrect password");
        
      }
    } catch (error) {
      
      
    }
  }

export {loginLogic}