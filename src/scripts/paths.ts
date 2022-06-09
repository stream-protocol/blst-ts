import path from "path";

const ROOT_DIR = path.join(__dirname, "../..");
export const PREBUILD_DIR = path.join(ROOT_DIR, "prebuild", "swig");
export const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
export const BINDINGS_DIR = path.join(ROOT_DIR, "blst", "bindings", "node.js");

// Paths for blst_wrap.cpp
// Resolve path to absolute since it will be used from a different working dir
// when running blst_wrap.py
export const BLST_WRAP_CPP_PREBUILD = path.resolve(ROOT_DIR, "prebuild", "swig", "blst_wrap.cpp");

/**
 * Get binary name.
 * name: {platform}-{arch}-{v8 version}.node
 */
export function getBinaryName(): string {
  const platform = process.platform;
  const arch = process.arch;
  const nodeV8CppApiVersion = process.versions.modules;
  if (!process) throw new NotNodeJsError("global object");
  if (!platform) throw new NotNodeJsError("process.platform");
  if (!arch) throw new NotNodeJsError("process.arch");
  if (!process.versions.modules) throw new NotNodeJsError("process.versions.modules");

  return [platform, arch, nodeV8CppApiVersion, "binding.node"].join("-");
}

export function getBinaryPath(): string {
  return path.join(PREBUILD_DIR, getBinaryName());
}

export class NotNodeJsError extends Error {
  constructor(missingItem: string) {
    super(`BLST bindings loader should only run in a NodeJS context: ${missingItem}`);
  }
}
