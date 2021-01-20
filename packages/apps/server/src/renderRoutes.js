import widgetRoutes from "./routes/widgetRoutes.js";

export default (app) => {
  app.get("/", (_req, res) =>
    res.send("Server!<br><a href='/widgets'>Explore widgets</a>")
  );

  widgetRoutes(app);
};
