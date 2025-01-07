var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var routes_exports = {};
__export(routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"));
var import_db = require("./services/db.query");
const router = import_express.default.Router();
router.get("/", async (req, res, next) => {
  res.json({ message: "Hello from the APIsss!" });
});
router.get(
  "/slides",
  async (req, res, next) => {
    const slides = [
      {
        url: "https://placehold.co/1400x800/FF0000/FFFFFF?text=Hamro LifeBank",
        duration: 3e3,
        isPhoto: true
      },
      {
        url: "/stats/blood",
        duration: 12e3,
        isPriority: true
      },
      {
        url: "/stats/age",
        duration: 12e3,
        isPriority: true
      },
      {
        url: "/stats/gender",
        duration: 12e3,
        isPriority: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/1.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/2.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/3.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/4.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/5.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/6.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/donors/7.jpg",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/1.png",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/2.png",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/3.png",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/4.png",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/5.png",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/6.png",
        isPhoto: true
      },
      {
        url: "https://assets.rumsan.net/hamro-lifebank/hlb-display/facts/7.png",
        isPhoto: true
      }
    ];
    res.json(slides);
  }
);
router.get(
  "/stats/total",
  async (req, res, next) => {
    (0, import_db.getDonationCount)(process.env.EVENT_ID).then((data) => res.json(data)).catch(next);
  }
);
router.get(
  "/stats/age",
  async (req, res, next) => {
    (0, import_db.getAgeStats)(process.env.EVENT_ID).then((data) => res.json(data)).catch(next);
  }
);
router.get(
  "/stats/blood",
  async (req, res, next) => {
    (0, import_db.getBloodGroupStats)(process.env.EVENT_ID).then((data) => res.json(data)).catch(next);
  }
);
router.get(
  "/stats/gender",
  async (req, res, next) => {
    (0, import_db.getGenderStats)(process.env.EVENT_ID).then((data) => res.json(data)).catch(next);
  }
);
const routes = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
//# sourceMappingURL=routes.js.map
