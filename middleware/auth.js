import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		//401
		throw new UnauthenticatedError("Authentication Invalid");
	}
	const token = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: payload.userId };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Authentication Invalid");
	}
};

export default auth;
