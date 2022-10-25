import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";

const getAllUsers = async () => await myDataSource.getRepository(User).find();

const getUserById = async (id: string) =>
  await myDataSource.getRepository(User).findOneBy({
    id: id,
  });

const topup = async (id: string, amount: number) => {
  try {
    const topup = await myDataSource.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOneBy({ id });
        user.money += amount;
        await transactionalEntityManager.getRepository(User).save(user);
        return { message: "Topup successfull" };
      }
    );
    return { message: "Topup successfull" };
  } catch (error) {
    console.log(error);
    return { error: "Topup failed" };
  }
};

const pay = async (payerId: string, payeeId: string, amount: number) => {
  try {
    const pay = await myDataSource.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        const payer = await transactionalEntityManager
          .getRepository(User)
          .findOneBy({ id: payerId });
        const payee = await transactionalEntityManager
          .getRepository(User)
          .findOneBy({ id: payeeId });
        payer.money -= amount;
        payee.money += amount;
        await transactionalEntityManager
          .getRepository(User)
          .save([payer, payee]);
      }
    );
    return { message: "Payment successful" };
  } catch (error) {
    return {error:'payment failed'}
  }
};

const getUserByEmail = async (email: string) =>
  await myDataSource.getRepository(User).findOneBy({
    email: email,
  });

const createUser = async (user: object) => {
  const createdUser = myDataSource.getRepository(User).create(user);
  return await myDataSource.getRepository(User).save(createdUser);
};

const updateUser = async (id: string, mergeData: object) => {
  const user = await myDataSource.getRepository(User).findOneBy({
    id,
  });
  myDataSource.getRepository(User).merge(user, mergeData);
  return await myDataSource.getRepository(User).save(user);
};

const deleteUser = async (id: string) => {
  return await myDataSource.getRepository(User).delete(id);
};

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  topup,
  pay,
  createUser,
  updateUser,
  deleteUser,
};
