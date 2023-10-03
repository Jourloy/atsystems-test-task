export interface ProfileInterface {
	id: string;
	login: string;
	role: string;
	advertiser_tz: null;
	balance: number;
	emailConfirmed: boolean;
	isBetaTester: boolean;
	isAdminLoggedAsUser: boolean;
	payAllowed: boolean;
	email: string;
	skype: string;
	messenger: string;
	personalAccount: number;
	firstName: string;
	secondName: string;
	country: string;
	city: string;
	address: string;
	vatNumber: string;
	useVat: string;
	referrerPercent: string;
	referrer: string;
	phone: string;
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	newPassword2: string;
	notificationSettings: unknown;
	roundPrecision: string;
	moneyPrecision: string;
	manager: unknown;
	currency: string;
	lang: {
		list: string[];
		key: string;
	}
}