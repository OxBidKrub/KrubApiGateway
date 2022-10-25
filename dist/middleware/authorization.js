"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        console.log(user);
        next();
    });
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authorization.js.map