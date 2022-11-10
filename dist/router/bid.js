"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const axios_1 = tslib_1.__importDefault(require("axios"));
const BIDAUCTION_HOST = process.env.BIDAUCTION_HOST;
const BIDAUCTION_PORT = process.env.BIDAUCTION_PORT;
const { createProxyMiddleware } = require("http-proxy-middleware");
var router = express_1.default.Router();
router.get("/bids", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .get(`http://${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids`, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => res.status(err.response.status).send(err.response.data));
    });
});
router.get("/bids/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .get(`http://${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids/${req.params.id}`, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
router.post("/bids", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .post(`http://${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids`, req.body, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
router.put("/bids/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .put(`http://${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids/${req.params.id}`, req.body, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
router.delete("/bids/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .delete(`http://${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids/${req.params.id}`, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
module.exports = router;
//# sourceMappingURL=bid.js.map