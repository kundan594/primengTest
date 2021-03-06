"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const packagr_1 = require("../packagr");
/**
 * Command running an "one-off" build.
 *
 * @stable
 */
const build = opts => packagr_1.ngPackagr()
    .forProject(opts.project)
    .withOptions({ watch: opts.watch })
    .withTsConfig(opts.config)
    .build();
exports.build = build;
//# sourceMappingURL=build.command.js.map