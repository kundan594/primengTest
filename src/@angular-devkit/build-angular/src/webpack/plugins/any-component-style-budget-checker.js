"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyComponentStyleBudgetChecker = void 0;
const path = require("path");
const webpack_1 = require("webpack");
const schema_1 = require("../../browser/schema");
const bundle_calculator_1 = require("../../utils/bundle-calculator");
const webpack_diagnostics_1 = require("../../utils/webpack-diagnostics");
const PLUGIN_NAME = 'AnyComponentStyleBudgetChecker';
/**
 * Check budget sizes for component styles by emitting a warning or error if a
 * budget is exceeded by a particular component's styles.
 */
class AnyComponentStyleBudgetChecker {
    constructor(budgets) {
        this.budgets = budgets.filter((budget) => budget.type === schema_1.Type.AnyComponentStyle);
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.processAssets.tap({
                name: PLUGIN_NAME,
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
            }, () => {
                // In AOT compilations component styles get processed in child compilations.
                if (!compilation.compiler.parentCompilation) {
                    return;
                }
                const cssExtensions = ['.css', '.scss', '.less', '.styl', '.sass'];
                const componentStyles = Object.keys(compilation.assets)
                    .filter((name) => cssExtensions.includes(path.extname(name)))
                    .map((name) => ({
                    size: compilation.assets[name].size(),
                    label: name,
                }));
                const thresholds = this.budgets.flatMap((budget) => [...bundle_calculator_1.calculateThresholds(budget)]);
                for (const { size, label } of componentStyles) {
                    for (const { severity, message } of bundle_calculator_1.checkThresholds(thresholds[Symbol.iterator](), size, label)) {
                        switch (severity) {
                            case bundle_calculator_1.ThresholdSeverity.Warning:
                                webpack_diagnostics_1.addWarning(compilation, message);
                                break;
                            case bundle_calculator_1.ThresholdSeverity.Error:
                                webpack_diagnostics_1.addError(compilation, message);
                                break;
                            default:
                                assertNever(severity);
                        }
                    }
                }
            });
        });
    }
}
exports.AnyComponentStyleBudgetChecker = AnyComponentStyleBudgetChecker;
function assertNever(input) {
    throw new Error(`Unexpected call to assertNever() with input: ${JSON.stringify(input, null /* replacer */, 4 /* tabSize */)}`);
}
