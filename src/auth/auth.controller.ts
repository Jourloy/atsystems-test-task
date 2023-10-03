import { Express, Request, Response } from "express";
import AuthService from "./auth.service";
import bodyParser from "body-parser";
import { HttpError } from "../enum/error";

export default class AuthController {
	constructor(app: Express) {
		this.app = app;

		console.log(`Mapped /auth`);
		this.app.post("/auth", bodyParser.urlencoded({ extended: false }), async (req, res) => {
			this.auth(req, res);
		});
	}

	private app: Express;
	private service = new AuthService();

	public async auth(req: Request, res: Response) {
		this.service
			.auth(req.body)
			.then((status) => {
				if (!status) {
					res.status(400).send(HttpError.COOKIE_NOT_FOUND);
				}
				res.status(200).json(status);
			})
			.catch((err) => {
				console.log(err);
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
