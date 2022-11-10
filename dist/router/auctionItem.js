"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const axios_1 = tslib_1.__importDefault(require("axios"));
const AUCTIONITEM_HOST = process.env.AUCTIONITEM_HOST;
const AUCTIONITEM_PORT = process.env.AUCTIONITEM_PORT;
const { createProxyMiddleware } = require("http-proxy-middleware");
var router = express_1.default.Router();
// const auctionItemProxy = createProxyMiddleware({
//   target: `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`, // for vhosted sites, changes host header to match to target's host
//   logger: console,
// });
// router.use('/auction-items', auctionItemProxy);
router.get("/auction-items", (req, res, next) => {
    axios_1.default
        .get(`http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`, {
        headers: { authorization: req.get("authorization") },
    })
        .then((data) => res.json(data.data))
        .catch((err) => res.sendStatus(403));
});
router.get("/auction-items/:id", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .get(`http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items/${req.params.id}`, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
router.post("/auction-items", authorization_1.authenticateToken, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .post(`http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`, req.body, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
router.put("/auction-items/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .put(`http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items/${req.params.id}`, req.body, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
router.delete("/auction-items/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .delete(`http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items/${req.params.id}`, {
            headers: { authorization: req.get("authorization") },
        })
            .then((data) => res.json(data.data))
            .catch((err) => {
            res.status(err.response.status).send(err.response.data);
        });
    });
});
module.exports = router;
//# sourceMappingURL=auctionItem.js.map