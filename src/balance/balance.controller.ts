import { Express, Request, Response } from "express";
import BalanceService from "./balance.service";
import { HttpError } from "../enum/error";

export default class BalanceController {
	constructor(app: Express) {
		this.app = app;

		console.log(`Mapped /balance`);
		this.app.get(`/balance`, async (req, res) => {
			this.checkBalance(req, res);
		});

		this.app.get(`/balance/auth`, async (req, res) => {
			this.checkBalanceWithToken(req, res);
		})
	}

	private app: Express;
	private service = new BalanceService();

	public async checkBalance(req: Request, res: Response) {
		const login = req.query[`login`];
		if (!login || typeof(login) !== `string`) throw new Error(HttpError.LOGIN_NOT_FOUND);

		this.service
			.checkBalance(login)
			.then((status) => {
				res.status(200).json(status);
			})
			.catch((err) => {
				if (err.message === HttpError.BODY_NOT_FOUND) {
					res.status(400).send(HttpError.BODY_NOT_FOUND);
				} else if (err.message === HttpError.LOGIN_NOT_FOUND) {
					res.status(400).send(HttpError.LOGIN_NOT_FOUND);
				} else if (err.message === HttpError.PASSWORD_NOT_FOUND) {
					res.status(400).send(HttpError.PASSWORD_NOT_FOUND);
				} else res.status(500).send(err.message);
			});
	}

	public async checkBalanceWithToken(req: Request, res: Response) {
		const login = req.query[`login`];
		const auth = req.query[`auth`];
		if (!login || typeof(login) !== `string`) throw new Error(HttpError.LOGIN_NOT_FOUND);
		if (!auth || typeof(auth) !== `string`) throw new Error(HttpError.AUTH_NOT_FOUND);

		this.service
			.checkBalance(login, auth)
			.then((status) => {
				res.status(200).json(status);
			})
			.catch((err) => {
				if (err.message === HttpError.BODY_NOT_FOUND) {
					res.status(400).send(HttpError.BODY_NOT_FOUND);
				} else if (err.message === HttpError.LOGIN_NOT_FOUND) {
					res.status(400).send(HttpError.LOGIN_NOT_FOUND);
				} else if (err.message === HttpError.PASSWORD_NOT_FOUND) {
					res.status(400).send(HttpError.PASSWORD_NOT_FOUND);
				} else res.status(500).send(err.message);
			});
	}
}
