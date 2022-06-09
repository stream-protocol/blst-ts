import "reflect-metadata";
import {getBinaryPath} from "./scripts/paths";
import {Blst} from "./bindings";
import {container} from "tsyringe";

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
export const blst: Blst = require(getBinaryPath());
container.register<Blst>("blst", {useValue: blst});

export * from "./lib";
