import { Application } from 'express';
import app from "./Express";

class ServerCreator {
	private static PORT = process.env.PORT || 8080;
	static create = (app: Application) => app.listen(this.PORT, async() => {
		console.log(`App is running at: ${process.env.baseURL}:${this.PORT} 🚀`);
	})
};

const server = ServerCreator.create(app);

export default server;