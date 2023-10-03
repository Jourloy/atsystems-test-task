import puppeteer, { Protocol } from "puppeteer";
import { HttpError } from "../enum/error";
import { redisClient } from "../main";

export default class AuthService {
	public async auth(props: { login: string; password: string }) {
		if (!props) throw new Error(HttpError.BODY_NOT_FOUND);
		if (!props.login) throw new Error(HttpError.LOGIN_NOT_FOUND);
		if (!props.password) throw new Error(HttpError.PASSWORD_NOT_FOUND);

		const browser = await puppeteer.launch({
			headless: `new`,
			executablePath: "/usr/bin/google-chrome",
			args: ["--no-sandbox"],
		});
		const page = await browser.newPage();

		page.goto(`https://trending.bid/login`);
		console.log(`Navigated to: https://trending.bid/login`);

		await page.waitForSelector(`input[name=username]`);
		console.log(`Found input[name=username]`);

		await page.focus("input[name=username]");
		console.log(`Focused input[name=username]`);

		await page.type("input[name=username]", props.login);
		console.log(`Set input[name=username] to: ${props.login}`);

		await page.type("input[name=password]", props.password);
		console.log(`Set input[name=password] to: ${props.password}`);

		await page.click(".btn-success");
		console.log(`Clicked button`);

		const cookies = await page.cookies();

		console.log(cookies);

		let authToken = false;
		let phpsessid = false;

		for (const cookie of cookies) {
			if (cookie.name === `auth`) {
				redisClient.set(`${props.login}_auth`, cookie.value);
				authToken = true;
			}
			if (cookie.name === `PHPSESSID`) {
				redisClient.set(`${props.login}_phpsessid`, cookie.value);
				phpsessid = true;
			}
		}

		setTimeout(() => browser.close(), 1000 * 5);

		if (phpsessid && authToken) return {status: `OK`};
		return null;
	}
}
