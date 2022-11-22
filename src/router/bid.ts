import express from "express";
import { authenticateToken } from "../middleware/authorization";
import { Request, Response } from "express";
import axios from "axios";
import userStub from "repo/userStub";
const BIDAUCTION_HOST = process.env.BIDAUCTION_HOST;
const BIDAUCTION_PORT = process.env.BIDAUCTION_PORT;
const { createProxyMiddleware } = require("http-proxy-middleware");
var router = express.Router();
router.get(
  "/bids",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .get(`${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids`, {
        headers: { authorization: req.get("authorization") },
      })
      .then((data) => res.json(data.data))
      .catch((err) => res.status(err.response.status).send(err.response.data));
  }
);

router.get(
  "/bids/:id",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .get(`${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids/${req.params.id}`, {
        headers: { authorization: req.get("authorization") },
      })
      .then((data) => res.json(data.data))
      .catch((err) => {
        res.status(err.response.status).send(err.response.data);
      });
  }
);

router.post(
  "/bids",
  authenticateToken,
  async function (req: any, res: Response) {
    userStub.stub.getUserById({ id: req.user.id }, (err, user) => {
      if (!err) {
        if (user.money < req.body.price) {
          res.status(500).send("not enough money in your wallet");
        } else {
          axios
            .post(
              `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids`,
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
      } else {
        res.status(500).send(err);
      }
    });
  }
);

router.put(
  "/bids/:id",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .put(
        `${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids/${req.params.id}`,
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

router.delete(
  "/bids/:id",
  authenticateToken,
  async function (req: Request, res: Response) {
    axios
      .delete(`${BIDAUCTION_HOST}:${BIDAUCTION_PORT}/bids/${req.params.id}`, {
        headers: { authorization: req.get("authorization") },
      })
      .then((data) => res.json(data.data))
      .catch((err) => {
        res.status(err.response.status).send(err.response.data);
      });
  }
);

export = router;
