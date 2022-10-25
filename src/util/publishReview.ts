import { PubSub } from "@google-cloud/pubsub";

const pubSubClient = new PubSub();
const topicName = "projects/oxbidkrib-pubsub/topics/oxBidKrub-review";

export const PublishMessage = async (data: any) => {
  const dataBuffer = Buffer.from(JSON.stringify(data));

  try {
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);

    // process.exitCode = 1;
  }
};
