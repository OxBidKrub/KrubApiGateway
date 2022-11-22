import express from "express";
import { authenticateToken } from "../middleware/authorization";

import { Request, Response } from "express";
import reviewRepo from "../repo/reviewStub";

import reviewStub from "../repo/reviewStub";
import { PublishMessage } from "../util/publishReview";

const { getAllReviews } = reviewRepo;
var router = express.Router();
router.get("/review/:id", async function (req: Request, res: Response) {
  //   console.log("REVIEWSTUB", reviewStub);
  reviewStub.stub.getReviewById({ id: req.params.id }, (err, data) => {
    console.log("DATA == > ", data, "ERR ==> ", err);
    if (!err) {
      res.send(data.reviews);
    } else {
      res.status(500).send(err);
    }
  });
});

router.post("/reviews", async function (req: Request, res: Response) {
  try {
    const data = req.body;
    console.log(data);
    await PublishMessage(data);
    res.send("success");
  } catch (error) {
    res.status(500).send("error");
  }
});

export = router;
