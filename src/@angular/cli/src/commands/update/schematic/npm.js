"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNpmPackageJson = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
const path = require("path");
const lockfile = require('@yarnpkg/lockfile');
const ini = require('ini');
const pacote = require('pacote');
const npmPackageJsonCache = new Map();
let npmrc;
function readOptions(logger, yarn = false, showPotentials = false) {
    var _a;
    const cwd = process.cwd();
    const baseFilename = yarn ? 'yarnrc' : 'npmrc';
    const dotFilename = '.' + baseFilename;
    let globalPrefix;
    if (process.env.PREFIX) {
        globalPrefix = process.env.PREFIX;
    }
    else {
        globalPrefix = path.dirname(process.execPath);
        if (process.platform !== 'win32') {
            globalPrefix = path.dirname(globalPrefix);
        }
    }
    const defaultConfigLocations = [
        (!yarn && process.env.NPM_CONFIG_GLOBALCONFIG) || path.join(globalPrefix, 'etc', baseFilename),
        (!yarn && process.env.NPM_CONFIG_USERCONFIG) || path.join(os_1.homedir(), dotFilename),
    ];
    const projectConfigLocations = [path.join(cwd, dotFilename)];
    const root = path.parse(cwd).root;
    for (let curDir = path.dirname(cwd); curDir && curDir !== root; curDir = path.dirname(curDir)) {
        projectConfigLocations.unshift(path.join(curDir, dotFilename));
    }
    if (showPotentials) {
        logger.info(`Locating potential ${baseFilename} files:`);
    }
    const options = {};
    for (const location of [...defaultConfigLocations, ...projectConfigLocations]) {
        if (fs_1.existsSync(location)) {
            if (showPotentials) {
                logger.info(`Trying '${location}'...found.`);
            }
            const data = fs_1.readFileSync(location, 'utf8');
            // Normalize RC options that are needed by 'npm-registry-fetch'.
            // See: https://github.com/npm/npm-registry-fetch/blob/ebddbe78a5f67118c1f7af2e02c8a22bcaf9e850/index.js#L99-L126
            const rcConfig = yarn ? lockfile.parse(data) : ini.parse(data);
            for (const [key, value] of Object.entries(rcConfig)) {
                let substitutedValue = value;
                // Substitute any environment variable references.
                if (typeof value === 'string') {
                    substitutedValue = value.replace(/\$\{([^\}]+)\}/, (_, name) => process.env[name] || '');
                }
                switch (key) {
                    // Unless auth options are scope with the registry url it appears that npm-registry-fetch ignores them,
                    // even though they are documented.
                    // https://github.com/npm/npm-registry-fetch/blob/8954f61d8d703e5eb7f3d93c9b40488f8b1b62ac/README.md
                    // https://github.com/npm/npm-registry-fetch/blob/8954f61d8d703e5eb7f3d93c9b40488f8b1b62ac/auth.js#L45-L91
                    case '_authToken':
                    case 'token':
                    case 'username':
                    case 'password':
                    case '_auth':
                    case 'auth':
                        (_a = options['forceAuth']) !== null && _a !== void 0 ? _a : (options['forceAuth'] = {});
                        options['forceAuth'][key] = substitutedValue;
                        break;
                    case 'noproxy':
                    case 'no-proxy':
                        options['noProxy'] = substitutedValue;
                        break;
                    case 'maxsockets':
                        options['maxSockets'] = substitutedValue;
                        break;
                    case 'https-proxy':
                    case 'proxy':
                        options['proxy'] = substitutedValue;
                        break;
                    case 'strict-ssl':
                        options['strictSSL'] = substitutedValue;
                        break;
                    case 'local-address':
                        options['localAddress'] = substitutedValue;
                        break;
                    case 'cafile':
                        if (typeof substitutedValue === 'string') {
                            const cafile = path.resolve(path.dirname(location), substitutedValue);
                            try {
                                options['ca'] = fs_1.readFileSync(cafile, 'utf8').replace(/\r?\n/g, '\n');
                            }
                            catch { }
                        }
                        break;
                    default:
                        options[key] = substitutedValue;
                        break;
                }
            }
        }
    }
    return options;
}
/**
 * Get the NPM repository's package.json for a package. This is p
 * @param {string} packageName The package name to fetch.
 * @param {string} registryUrl The NPM Registry URL to use.
 * @param {LoggerApi} logger A logger instance to log debug information.
 * @returns An observable that will put the pacakge.json content.
 * @private
 */
function getNpmPackageJson(packageName, logger, options) {
    const cachedResponse = npmPackageJsonCache.get(packageName);
    if (cachedResponse) {
        return cachedResponse;
    }
    if (!npmrc) {
        try {
            npmrc = readOptions(logger, false, options && options.verbose);
        }
        catch { }
        if (options && options.usingYarn) {
            try {
                npmrc = { ...npmrc, ...readOptions(logger, true, options && options.verbose) };
            }
            catch { }
        }
    }
    const resultPromise = pacote.packument(packageName, {
        fullMetadata: true,
        ...npmrc,
        ...(options && options.registryUrl ? { registry: options.registryUrl } : {}),
    });
    // TODO: find some way to test this
    const response = resultPromise.catch((err) => {
        logger.warn(err.message || err);
        return { requestedName: packageName };
    });
    npmPackageJsonCache.set(packageName, response);
    return response;
}
exports.getNpmPackageJson = getNpmPackageJson;
