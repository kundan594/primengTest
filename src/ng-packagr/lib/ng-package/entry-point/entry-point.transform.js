"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryPointTransformFactory = void 0;
const rxjs_1 = require("rxjs");
const node_1 = require("../../graph/node");
const select_1 = require("../../graph/select");
const transform_1 = require("../../graph/transform");
const log = require("../../utils/log");
const nodes_1 = require("../nodes");
/**
 * A re-write of the `transformSources()` script that transforms an entry point from sources to distributable format.
 *
 * Sources are TypeScript source files accompanied by HTML templates and xCSS stylesheets.
 * See the Angular Package Format for a detailed description of what the distributables include.
 *
 * The current transformation pipeline can be thought of as:
 *
 *  - clean
 *  - compileTs
 *  - downlevelTs
 *  - writeBundles
 *    - bundleToFesm15
 *    - bundleToUmd
 *    - bundleToUmdMin
 *  - relocateSourceMaps
 *  - writePackage
 *   - copyStagedFiles (bundles, esm, dts, metadata, sourcemaps)
 *   - writePackageJson
 *
 * The transformation pipeline is pluggable through the dependency injection system.
 * Sub-transformations are passed to this factory function as arguments.
 *
 * @param compileTs Transformation compiling typescript sources to ES2015 modules.
 * @param writeBundles Transformation flattening ES2015 modules to ESM2015, UMD, and minified UMD.
 * @param writePackage Transformation writing a distribution-ready `package.json` (for publishing to npm registry).
 */
const entryPointTransformFactory = (compileTs, writeBundles, writePackage) => rxjs_1.pipe(
//tap(() => log.info(`Building from sources for entry point`)),
transform_1.transformFromPromise(async (graph) => {
    // Peek the first entry point from the graph
    const entryPoint = graph.find(nodes_1.byEntryPoint().and(select_1.isInProgress));
    log.msg('\n------------------------------------------------------------------------------');
    log.msg(`Building entry point '${entryPoint.data.entryPoint.moduleId}'`);
    log.msg('------------------------------------------------------------------------------');
}), 
// TypeScript sources compilation
compileTs, 
// After TypeScript: bundling and write package
writeBundles, writePackage, transform_1.transformFromPromise(async (graph) => {
    const entryPoint = graph.find(nodes_1.byEntryPoint().and(select_1.isInProgress));
    entryPoint.state = node_1.STATE_DONE;
}));
exports.entryPointTransformFactory = entryPointTransformFactory;
//# sourceMappingURL=entry-point.transform.js.map