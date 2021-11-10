"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectIndexFiles = void 0;
const project_targets_1 = require("./project-targets");
/** Gets the path of the index file in the given project. */
function getProjectIndexFiles(project) {
    const paths = project_targets_1.getTargetsByBuilderName(project, project_targets_1.defaultTargetBuilders.build)
        .filter(t => { var _a; return (_a = t.options) === null || _a === void 0 ? void 0 : _a.index; })
        .map(t => t.options.index);
    // Use a set to remove duplicate index files referenced in multiple build targets of a project.
    return Array.from(new Set(paths));
}
exports.getProjectIndexFiles = getProjectIndexFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1pbmRleC1maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay9zY2hlbWF0aWNzL3V0aWxzL3Byb2plY3QtaW5kZXgtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFJSCx1REFBaUY7QUFFakYsNERBQTREO0FBQzVELFNBQWdCLG9CQUFvQixDQUFDLE9BQTBCO0lBQzdELE1BQU0sS0FBSyxHQUFHLHlDQUF1QixDQUFDLE9BQU8sRUFBRSx1Q0FBcUIsQ0FBQyxLQUFLLENBQUM7U0FDeEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQUMsT0FBQSxNQUFBLENBQUMsQ0FBQyxPQUFPLDBDQUFFLEtBQUssQ0FBQSxFQUFBLENBQUM7U0FDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQVEsQ0FBQyxLQUFhLENBQUMsQ0FBQztJQUV0QywrRkFBK0Y7SUFDL0YsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQVBELG9EQU9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGF0aH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHtQcm9qZWN0RGVmaW5pdGlvbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUvc3JjL3dvcmtzcGFjZSc7XG5pbXBvcnQge2RlZmF1bHRUYXJnZXRCdWlsZGVycywgZ2V0VGFyZ2V0c0J5QnVpbGRlck5hbWV9IGZyb20gJy4vcHJvamVjdC10YXJnZXRzJztcblxuLyoqIEdldHMgdGhlIHBhdGggb2YgdGhlIGluZGV4IGZpbGUgaW4gdGhlIGdpdmVuIHByb2plY3QuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdEluZGV4RmlsZXMocHJvamVjdDogUHJvamVjdERlZmluaXRpb24pOiBQYXRoW10ge1xuICBjb25zdCBwYXRocyA9IGdldFRhcmdldHNCeUJ1aWxkZXJOYW1lKHByb2plY3QsIGRlZmF1bHRUYXJnZXRCdWlsZGVycy5idWlsZClcbiAgICAuZmlsdGVyKHQgPT4gdC5vcHRpb25zPy5pbmRleClcbiAgICAubWFwKHQgPT4gdC5vcHRpb25zIS5pbmRleCBhcyBQYXRoKTtcblxuICAvLyBVc2UgYSBzZXQgdG8gcmVtb3ZlIGR1cGxpY2F0ZSBpbmRleCBmaWxlcyByZWZlcmVuY2VkIGluIG11bHRpcGxlIGJ1aWxkIHRhcmdldHMgb2YgYSBwcm9qZWN0LlxuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHBhdGhzKSk7XG59XG4iXX0=