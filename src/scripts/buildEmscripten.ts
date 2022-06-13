// TODO: integrate into exisitng build script

import {exec} from "./exec";
import os from "os";
import {ROOT_DIR} from "./paths";

const [tag = "latest"] = process.argv.slice(2);
const {uid, gid} = os.userInfo();

const cmd = "docker";

const cflags =
  "-o ./prebuild/emscripten/blst.js " +
  "--pre-js ./prebuild/emscripten/pre.js " +
  "--post-js ./prebuild/emscripten/post.js " +
  // Prepends blst_blue_wrapper.cpp to source files list.
  "/src/prebuild/emscripten/blst_glue_wrapper.cpp";

const args: string[] = [
  "run",
  "--rm",
  "-v",
  `${ROOT_DIR}:/src`,
  "-u",
  `${uid}:${gid}`,
  "-e",
  "CROSS_COMPILE=em",
  "-e",
  `CFLAGS=${cflags}`,
  `emscripten/emsdk:${tag}`,
  "/src/blst/build.sh",
];
// eslint-enable prettier/prettier

const opts = {cwd: ROOT_DIR};
exec(cmd, args, opts)
  .then(() => {
    console.log("Emscripten bindings built!");
  })
  .catch((reason: Error) => {
    console.error(reason);
    process.exit(1);
  });
