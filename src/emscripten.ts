import "reflect-metadata";
import {Blst} from "./bindings";
import {container} from "tsyringe";

// TODO: move path to paths.ts
// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
export const blst: Blst = require("../prebuild/emscripten/blst");
container.register<Blst>("blst", {useValue: blst});

export * from "./lib";
