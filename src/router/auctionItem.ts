import express from "express";
import { authenticateToken } from "../middleware/authorization";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import axios from "axios";
const BIDAUCTION_HOST = process.env.BIDAUCTION_HOST;
const BIDAUCTION_PORT = process.env.BIDAUCTION_PORT;
const { createProxyMiddleware } = require("http-proxy-middleware");
var router = express.Router();
// const auctionItemProxy = createProxyMiddleware({
//   target: `http://${AUCTIONITEM_HOST}:${AUCTIONITEM_PORT}/auction-items`, // for vhosted sites, changes host header to match to target's host
//   logger: console,
// });
// router.use('/auction-items', auctionItemProxy);

router.get("/auction-items", (req: any, res, next) => {
  axios
    .get(`${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items`, {
      headers: { authorization: req.get("authorization") },
    })
    .then((data) => res.json(data.data))
    .catch((err) => res.status(err.response.status).send(err.response.data));
});

router.get(
  "/auction-items/:id",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .get(
        `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items/${req.params.id}`,
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

router.get(
  "/auction-items/itemByOwner",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .get(
        `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items/itemByOwner`,
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

router.get(
  "/auction-items/itemByBidder",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .get(
        `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items/itemByBidder`,
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
        `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items`,
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
      `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items/${req.params.id}`,
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
        `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/auction-items/${req.params.id}`,
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
