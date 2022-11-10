import express from "express";
import { authenticateToken } from "../middleware/authorization";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import axios from "axios";
const AUCTIONITEM_HOST = process.env.AUCTIONITEM_HOST;
const AUCTIONITEM_PORT = process.env.AUCTIONITEM_PORT;
const { createProxyMiddleware } = require("http-proxy-middleware");
var router = express.Router();
// const auctionItemProxy = createProxyMiddleware({
//   target: `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`, // for vhosted sites, changes host header to match to target's host
//   logger: console,
// });
// router.use('/auction-items', auctionItemProxy);

router.get("/auction-items", (req: any, res, next) => {
  axios
    .get(`http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`, {
      headers: { authorization: req.get("authorization") },
    })
    .then((data) => res.json(data.data))
    .catch((err) => res.sendStatus(403));
});

router.get(
  "/auction-items/:id",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .get(
        `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items/${req.params.id}`,
        {
          headers: { authorization: req.get("authorization") },
        }
      )
      .then((data) => res.json(data.data))
      .catch((err) => {
        res.status(err.response.status).send(err.response.data);
      });
  }
);

router.post(
  "/auction-items",
  authenticateToken,
  async function (req: any, res: Response) {
    axios
      .post(
        `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`,
        req.body,
        {
          headers: { authorization: req.get("authorization") },
        }
      )
      .then((data) => res.json(data.data))
      .catch((err) => {
        res.status(err.response.status).send(err.response.data);
      });
  }
);

router.put("/auction-items/:id", async function (req: Request, res: Response) {
  axios
    .put(
      `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items/${req.params.id}`,
      req.body,
      {
        headers: { authorization: req.get("authorization") },
      }
    )
    .then((data) => res.json(data.data))
    .catch((err) => {
      res.status(err.response.status).send(err.response.data);
    });
});

router.delete("/auction-items/:id", async function (req: Request, res: Response) {
  axios
      .delete(
        `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items/${req.params.id}`,
        {
          headers: { authorization: req.get("authorization") },
        }
      )
      .then((data) => res.json(data.data))
      .catch((err) => {
        res.status(err.response.status).send(err.response.data);
      });
})

export = router;
