"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheCompilerHost = void 0;
const ts = require("typescript");
const ng = require("@angular/compiler-cli");
const path = require("path");
const path_1 = require("../utils/path");
const log_1 = require("../utils/log");
const nodes_1 = require("../ng-package/nodes");
const node_1 = require("../graph/node");
function cacheCompilerHost(graph, entryPoint, compilerOptions, moduleResolutionCache, stylesheetProcessor, sourcesFileCache = entryPoint.cache.sourcesFileCache, setParentNodes = true) {
    const tsHost = ts.createCompilerHost(compilerOptions, setParentNodes);
    const compilerHost = ng.createCompilerHost({ options: compilerOptions, tsHost });
    const getNode = (fileName) => {
        const nodeUri = nodes_1.fileUrl(path_1.ensureUnixPath(fileName));
        let node = graph.get(nodeUri);
        if (!node) {
            node = new node_1.Node(nodeUri);
            graph.put(node);
        }
        return node;
    };
    const addDependee = (fileName) => {
        const node = getNode(fileName);
        entryPoint.dependsOn(node);
    };
    return {
        ...compilerHost,
        // ts specific
        fileExists: (fileName) => {
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (cache.exists === undefined) {
                cache.exists = compilerHost.fileExists.call(this, fileName);
            }
            return cache.exists;
        },
        getSourceFile: (fileName, languageVersion) => {
            addDependee(fileName);
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (!cache.sourceFile) {
                cache.sourceFile = compilerHost.getSourceFile.call(this, fileName, languageVersion);
            }
            return cache.sourceFile;
        },
        writeFile: (fileName, data, writeByteOrderMark, onError, sourceFiles) => {
            if (fileName.endsWith('.d.ts')) {
                sourceFiles.forEach(source => {
                    const cache = sourcesFileCache.getOrCreate(source.fileName);
                    if (!cache.declarationFileName) {
                        cache.declarationFileName = path_1.ensureUnixPath(fileName);
                    }
                });
            }
            compilerHost.writeFile.call(this, fileName, data, writeByteOrderMark, onError, sourceFiles);
        },
        readFile: (fileName) => {
            addDependee(fileName);
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (cache.content === undefined) {
                cache.content = compilerHost.readFile.call(this, fileName);
            }
            return cache.content;
        },
        // ng specific
        moduleNameToFileName: (moduleName, containingFile) => {
            const { resolvedModule } = ts.resolveModuleName(moduleName, path_1.ensureUnixPath(containingFile), compilerOptions, compilerHost, moduleResolutionCache);
            return resolvedModule && resolvedModule.resolvedFileName;
        },
        resolveModuleNames: (moduleNames, containingFile) => {
            return moduleNames.map(moduleName => {
                const { resolvedModule } = ts.resolveModuleName(moduleName, path_1.ensureUnixPath(containingFile), compilerOptions, compilerHost, moduleResolutionCache);
                return resolvedModule;
            });
        },
        resourceNameToFileName: (resourceName, containingFilePath) => {
            const resourcePath = path.resolve(path.dirname(containingFilePath), resourceName);
            const containingNode = getNode(containingFilePath);
            const resourceNode = getNode(resourcePath);
            containingNode.dependsOn(resourceNode);
            return resourcePath;
        },
        readResource: (fileName) => {
            addDependee(fileName);
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (cache.content === undefined) {
                if (/(html|htm|svg)$/.test(path.extname(fileName))) {
                    // template
                    cache.content = compilerHost.readFile.call(this, fileName);
                }
                else {
                    // stylesheet
                    try {
                        cache.content = stylesheetProcessor.process(fileName);
                    }
                    catch (err) {
                        log_1.error('\n' + err.message + ` in stylesheet file ${fileName}.`);
                        throw err;
                    }
                }
                if (cache.content === undefined) {
                    throw new Error(`Cannot read file ${fileName}.`);
                }
                ;
                cache.exists = true;
            }
            return cache.content;
        },
    };
}
exports.cacheCompilerHost = cacheCompilerHost;
//# sourceMappingURL=cache-compiler-host.js.map