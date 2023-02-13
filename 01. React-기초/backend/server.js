import liveServer from "live-server";
import { resolve } from "node:path"; // node에 내장된 것
import { argv } from "node:process";
import parseArgv from "./parseArgv.js";

/* directories -------------------------------------------------------------- */

const frontendDir = resolve("frontend");

const DIR = {
  public: resolve(frontendDir, "public"),
  src: resolve(frontendDir, "src"),
};

/* parameters --------------------------------------------------------------- */

let params = {
  host: "localhost",
  port: 3000,
  root: DIR.public,
  file: "index.html", // entry point file(진입점)
  mount: [["/scripts", DIR.src]], // route(길) 설정
  open: false,
  wait: 200,
};

const customParams = parseArgv(argv);

// 이 구문의 정체는?
// 전개 구문(spread syntax) : 객체 합성 -> 너무나 흔하게 사용되는 문법
// 객체 합성때 자주 사용되었떤 이전 기술은?
// Object.assign() 클래스의 매서드 -> static method
// Object.prototype.toString() -> instance method
params = { ...params, ...customParams };
// ...customParams에 있는 내용을 기본값에 덮어쓴다라는 내용.

/* start server ------------------------------------------------------------- */

liveServer.start({ ...params, ...customParams });
