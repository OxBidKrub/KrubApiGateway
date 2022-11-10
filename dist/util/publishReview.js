"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishMessage = void 0;
const tslib_1 = require("tslib");
const pubsub_1 = require("@google-cloud/pubsub");
const pubSubClient = new pubsub_1.PubSub();
const topicName = "projects/oxbidkrib-pubsub/topics/oxBidKrub-review";
const PublishMessage = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try {
        const messageId = yield pubSubClient
            .topic(topicName)
            .publishMessage({ data: dataBuffer });
        console.log(`Message ${messageId} published.`);
    }
    catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        // process.exitCode = 1;
    }
});
exports.PublishMessage = PublishMessage;
//# sourceMappingURL=publishReview.js.map