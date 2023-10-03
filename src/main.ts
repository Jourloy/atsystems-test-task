import express from "express";
import AuthController from "./auth/auth.controller";
import redis, { RedisClientType } from "redis";
import BalanceController from "./balance/balance.controller";

require("dotenv").config();

const port = process.env.PORT || 8992;

export const redisClient = redis.createClient({ url: `redis://Test-redis` });

(async () => {
	redisClient.on("error", (error) => console.error(`Error : ${error}`));
	await redisClient.connect();
})();

const app = express();

new AuthController(app);
new BalanceController(app);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
