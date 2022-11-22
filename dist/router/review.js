"use strict";
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const reviewStub_1 = tslib_1.__importDefault(require("../repo/reviewStub"));
const reviewStub_2 = tslib_1.__importDefault(require("../repo/reviewStub"));
const publishReview_1 = require("../util/publishReview");
const { getAllReviews } = reviewStub_1.default;
var router = express_1.default.Router();
router.get("/review/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        //   console.log("REVIEWSTUB", reviewStub);
        reviewStub_2.default.stub.getReviewById({ id: req.params.id }, (err, data) => {
            console.log("DATA == > ", data, "ERR ==> ", err);
            if (!err) {
                res.send(data.reviews);
            }
            else {
                res.status(500).send(err);
            }
        });
    });
});
router.post("/reviews", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data);
            yield (0, publishReview_1.PublishMessage)(data);
            res.send("success");
        }
        catch (error) {
            res.status(500).send("error");
        }
    });
});
module.exports = router;
//# sourceMappingURL=review.js.map