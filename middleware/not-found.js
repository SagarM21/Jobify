const notFoundMiddleware = (req, res) => {
	res.status(404).send("Routes does not exist");
};

export default notFoundMiddleware
