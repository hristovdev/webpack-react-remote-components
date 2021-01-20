import glob from "glob";
import mime from "mime";
import path from "path";

const __dirname = path.resolve();

const resolveAvailableWidgets = () =>
  new Promise((resolve, reject) =>
    glob(
      path.resolve(__dirname, "..", "..", "widgets", "**/dist/*.js"),
      {},
      (er, files) => {
        if (er) {
          reject(error);
        }

        let paths = [];

        files.forEach((widgetPath) => {
          var extension = path.extname(widgetPath);
          var fileName = path.basename(widgetPath, extension);

          paths.push({
            path: widgetPath,
            name: fileName,
          });
        });

        resolve(paths);
      }
    )
  );

const availableWidgets = [];
const getWidgetPaths = async () => {
  if (!availableWidgets.length) {
    const resolvedWidgets = await resolveAvailableWidgets();

    availableWidgets.push(...resolvedWidgets);
  }

  return availableWidgets;
};

export default (app) => {
  app.get("/widgets", async (_req, res) => {
    const widgets = await getWidgetPaths();
    const response = widgets
      .map((widget) => {
        return `<a href='/widgets/${widget.name}'>${widget.name}</a>`;
      })
      .join("<br />");

    return res.send(response);
  });

  app.get("/widgets/:widgetName", async (req, res) => {
    const { widgetName } = req.params;

    if (!widgetName) {
      return res.status(400).send("No widget name specified");
    }

    const widgets = await getWidgetPaths();
    const widget = widgets.find(
      (x) => x.name.toLowerCase() === widgetName.toLowerCase()
    );

    if (widget) {
      var filename = path.basename(widget.path);
      var mimetype = mime.lookup(widget.path);

      res.setHeader("Content-disposition", "attachment; filename=" + filename);
      res.setHeader("Content-type", mimetype);

      return res.download(path.resolve(widget.path));
    }

    return res.status(404).send("Not found");
  });
};
