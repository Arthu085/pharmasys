import { jwtDecode } from "jwt-decode";

interface JwtPayload {
	exp: number;
	iat: number;
	[key: string]: unknown;
}

export const jwtUtil = {
	decode: (token: string): JwtPayload | null => {
		try {
			return jwtDecode<JwtPayload>(token);
		} catch {
			return null;
		}
	},

	isExpired: (token: string): boolean => {
		const payload = jwtUtil.decode(token);
		if (!payload || !payload.exp) {
			return true;
		}

		const currentTime = Math.floor(Date.now() / 1000);
		return payload.exp < currentTime;
	},

	getTimeToExpire: (token: string): number => {
		const payload = jwtUtil.decode(token);
		if (!payload || !payload.exp) {
			return 0;
		}

		const currentTime = Math.floor(Date.now() / 1000);
		const timeToExpire = payload.exp - currentTime;
		return timeToExpire > 0 ? timeToExpire : 0;
	},

	isExpiringSoon: (token: string, thresholdSeconds = 300): boolean => {
		const timeToExpire = jwtUtil.getTimeToExpire(token);
		return timeToExpire > 0 && timeToExpire < thresholdSeconds;
	},
};
