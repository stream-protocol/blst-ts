# blst-ts
This repository is a fork of [chainsafe/blst-ts](https://github.com/chainsafe/blst-ts) which may be used as a staging area for changes that may (or may not) be upstreamed.

## Developing

Note that this repo contains a git submodule. Make sure the git submodule `blst` is populated before attempting to build locally. After cloning run:

```bash
git submodule update --init --recursive
```

## Web Assembly Support
_(NOTE: a copy of [emsdk](https://github.com/emscripten-core/emsdk) is required to build for web assembly. See [emscripten docs -> Building Projects](https://emscripten.org/docs/compiling/Building-Projects.html) for more information)_

To build for web assembly using emscripten:

```bash
# ensure enscripten sdk is active
/path/to/emsdk/emsdk activate
source /path/to/emsdk/emsdk_env.sh

CROSS_COMPILE=em CFLAGS="-o ./prebuild/emscripten/blst.js --pre-js ./prebuild/emscripten/pre.js --post-js ./prebuild/emscripten/post.js ./prebuild/emscripten/blst_glue_wrapper.cpp" ./blst/build.sh
```

Use webpack dev server to watch for changes and rebuild:
```bash
yarn webpack:serve
```

## License

Apache-2.0
