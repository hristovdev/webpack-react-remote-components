import express from "express";
import renderRoutes from "./renderRoutes.js";
import setMiddleware from "./setMiddleware.js";

const app = express();
const port = 5001;

setMiddleware(app);
renderRoutes(app);

app.listen(port, () => console.info(`App store listening on port ${port}!`));
