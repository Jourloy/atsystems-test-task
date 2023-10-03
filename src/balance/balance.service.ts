import axios from "axios";
import { redisClient } from "../main";
import { HttpError } from "../enum/error";
import { ProfileInterface } from "./interfaces/balance.interface";

export default class BalanceService {
	public async checkBalance(login: string, token?: string) {

		let cookie = token;
		if (!cookie) {
			cookie = await redisClient.get(`${login}_auth`) || undefined;
			if (!cookie) throw new Error(HttpError.COOKIE_NOT_FOUND);
		}

		let PHPSESSID = await redisClient.get(`${login}_phpsessid`) || `cquqip8a0aljvtdqqhvd57us3j`;

		const replaced = cookie.replace(`=`, `%3D`);
		
		const resp = await axios.get<{code: number, data: ProfileInterface}>(`https://trending.bid/api/user/getprofile`, {headers: {Cookie: `auth=${replaced};PHPSESSID=${PHPSESSID};`}}).catch((err) => {
			console.log(err);
			throw new Error(`Internal server error`);
		})

		if (!resp || resp.status !== 200 || resp.data.code !== 200) throw new Error(`Server error`);

		return {status: `OK`, balance: resp.data.data.balance, currency: resp.data.data.currency};
	}
}