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
var db_query_exports = {};
__export(db_query_exports, {
  getAgeStats: () => getAgeStats,
  getBloodGroupStats: () => getBloodGroupStats,
  getDonationCount: () => getDonationCount,
  getGenderStats: () => getGenderStats
});
module.exports = __toCommonJS(db_query_exports);
var import_db = __toESM(require("../db"));
const getDonationCount = async (eventId) => {
  const sql = `SELECT count(*) FROM tbl_donations  WHERE "eventId" = '${eventId}'`;
  const { rows } = await import_db.default.query(sql);
  return rows?.[0] || { count: "0" };
};
const getAgeStats = async (eventID) => {
  const sql = `SELECT
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) <= 20) AS "20 under",
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) BETWEEN 21 AND 25) AS "20 to 25",
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) BETWEEN 26 AND 30) AS "25 to 30",
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) BETWEEN 31 AND 40) AS "30 to 40",
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) BETWEEN 41 AND 50) AS "40 to 50",
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) BETWEEN 51 AND 60) AS "50 to 60",
  COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM AGE("dop")) >= 61) AS "60+"
FROM tbl_donors
WHERE "uuid" IN (
    SELECT "donorId"
    FROM tbl_donations
    WHERE "eventId" = '${eventID}'
);`;
  const { rows } = await import_db.default.query(sql);
  return rows?.[0] || {
    "20 under": "0",
    "20 to 25": "0",
    "25 to 30": "0",
    "30 to 40": "0",
    "40 to 50": "0",
    "50 to 60": "0",
    "60+": "0"
  };
};
const getGenderStats = async (eventId) => {
  const sql = `SELECT
  COUNT(*) FILTER (WHERE "gender" = 'MALE') AS "Male",
  COUNT(*) FILTER (WHERE "gender" = 'FEMALE') AS "Female",
  COUNT(*) FILTER (WHERE "gender" = 'OTHER') AS "Other"
FROM tbl_donors
WHERE "uuid" IN (
    SELECT "donorId"
    FROM tbl_donations
    WHERE "eventId" = '${eventId}'
);`;
  const { rows } = await import_db.default.query(sql);
  return rows?.[0] || { count: "0" };
};
const getBloodGroupStats = async (eventId) => {
  const sql = `SELECT
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'A_POSITIVE') AS "A_POSITIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'B_POSITIVE') AS "B_POSITIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'AB_POSITIVE') AS "AB_POSITIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'O_POSITIVE') AS "O_POSITIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'A_NEGATIVE') AS "A_NEGATIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'B_NEGATIVE') AS "B_NEGATIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'AB_NEGATIVE') AS "AB_NEGATIVE",
  COUNT(*) FILTER (WHERE "bloodInfo"->>'group' = 'O_NEGATIVE') AS "O_NEGATIVE"
FROM tbl_donors
WHERE "uuid" IN (
    SELECT "donorId"
    FROM tbl_donations
    WHERE "eventId" = '${eventId}'
);`;
  const { rows } = await import_db.default.query(sql);
  return rows?.[0] || { count: "0" };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAgeStats,
  getBloodGroupStats,
  getDonationCount,
  getGenderStats
});
//# sourceMappingURL=db.query.js.map
