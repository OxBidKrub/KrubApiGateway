declare namespace _default {
    export { getAllUsers };
    export { getUserById };
    export { getUserByEmail };
    export { topup };
    export { pay };
    export { createUser };
    export { updateUser };
    export { deleteUser };
    export { login };
    export { stub };
}
export default _default;
declare function getAllUsers(callback: any): void;
declare function getUserById(uid: any): void;
declare function getUserByEmail(email: any): void;
declare function topup(topupReq: any): void;
declare function pay(payReq: any): void;
declare function createUser(createUser: any): void;
declare function updateUser(updateReq: any): void;
declare function deleteUser(uid: any): void;
declare function login(Login: any): void;
declare var stub: any;
