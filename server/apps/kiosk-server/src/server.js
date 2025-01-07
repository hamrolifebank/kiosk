var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_path = __toESM(require("path"));
var import_dotenv = __toESM(require("dotenv"));
var import_routes = require("./routes");
import_dotenv.default.config();
const app = (0, import_express.default)();
const PORT = 4505;
app.use((0, import_cors.default)());
app.use("/api", import_routes.routes);
app.use(import_express.default.static(import_path.default.join(__dirname, "../../../ui")));
app.use(import_express.default.static(import_path.default.join(__dirname, "../../../../../../data")));
app.use((req, res) => {
  res.status(404).send("Page not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
