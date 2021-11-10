"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasNgModuleImport = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
/**
 * Whether the Angular module in the given path imports the specified module class name.
 */
function hasNgModuleImport(tree, modulePath, className) {
    const moduleFileContent = tree.read(modulePath);
    if (!moduleFileContent) {
        throw new schematics_1.SchematicsException(`Could not read Angular module file: ${modulePath}`);
    }
    const parsedFile = ts.createSourceFile(modulePath, moduleFileContent.toString(), ts.ScriptTarget.Latest, true);
    const ngModuleMetadata = findNgModuleMetadata(parsedFile);
    if (!ngModuleMetadata) {
        throw new schematics_1.SchematicsException(`Could not find NgModule declaration inside: "${modulePath}"`);
    }
    for (let property of ngModuleMetadata.properties) {
        if (!ts.isPropertyAssignment(property) || property.name.getText() !== 'imports' ||
            !ts.isArrayLiteralExpression(property.initializer)) {
            continue;
        }
        if (property.initializer.elements.some(element => element.getText() === className)) {
            return true;
        }
    }
    return false;
}
exports.hasNgModuleImport = hasNgModuleImport;
/**
 * Resolves the last identifier that is part of the given expression. This helps resolving
 * identifiers of nested property access expressions (e.g. myNamespace.core.NgModule).
 */
function resolveIdentifierOfExpression(expression) {
    if (ts.isIdentifier(expression)) {
        return expression;
    }
    else if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.name)) {
        return expression.name;
    }
    return null;
}
/**
 * Finds a NgModule declaration within the specified TypeScript node and returns the
 * corresponding metadata for it. This function searches breadth first because
 * NgModule's are usually not nested within other expressions or declarations.
 */
function findNgModuleMetadata(rootNode) {
    // Add immediate child nodes of the root node to the queue.
    const nodeQueue = [...rootNode.getChildren()];
    while (nodeQueue.length) {
        const node = nodeQueue.shift();
        if (ts.isDecorator(node) && ts.isCallExpression(node.expression) &&
            isNgModuleCallExpression(node.expression)) {
            return node.expression.arguments[0];
        }
        else {
            nodeQueue.push(...node.getChildren());
        }
    }
    return null;
}
/** Whether the specified call expression is referring to a NgModule definition. */
function isNgModuleCallExpression(callExpression) {
    if (!callExpression.arguments.length ||
        !ts.isObjectLiteralExpression(callExpression.arguments[0])) {
        return false;
    }
    // The `NgModule` call expression name is never referring to a `PrivateIdentifier`.
    const decoratorIdentifier = resolveIdentifierOfExpression(callExpression.expression);
    return decoratorIdentifier ? decoratorIdentifier.text === 'NgModule' : false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbW9kdWxlLWltcG9ydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL3NjaGVtYXRpY3MvdXRpbHMvYXN0L25nLW1vZHVsZS1pbXBvcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILDJEQUFxRTtBQUNyRSxpQ0FBaUM7QUFFakM7O0dBRUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxJQUFVLEVBQUUsVUFBa0IsRUFBRSxTQUFpQjtJQUNqRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQ3RCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyx1Q0FBdUMsVUFBVSxFQUFFLENBQUMsQ0FBQztLQUNwRjtJQUVELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQzNFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFMUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBQ3JCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxnREFBZ0QsVUFBVSxHQUFHLENBQUMsQ0FBQztLQUM5RjtJQUVELEtBQUssSUFBSSxRQUFRLElBQUksZ0JBQWlCLENBQUMsVUFBVSxFQUFFO1FBQ2pELElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxTQUFTO1lBQzNFLENBQUMsRUFBRSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0RCxTQUFTO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxTQUFTLENBQUMsRUFBRTtZQUNsRixPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUEzQkQsOENBMkJDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyw2QkFBNkIsQ0FBQyxVQUF5QjtJQUM5RCxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDL0IsT0FBTyxVQUFVLENBQUM7S0FDbkI7U0FBTSxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4RixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUM7S0FDeEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxRQUFpQjtJQUM3QywyREFBMkQ7SUFDM0QsTUFBTSxTQUFTLEdBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBRXpELE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUN2QixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFHLENBQUM7UUFFaEMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzVELHdCQUF3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBK0IsQ0FBQztTQUNuRTthQUFNO1lBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxtRkFBbUY7QUFDbkYsU0FBUyx3QkFBd0IsQ0FBQyxjQUFpQztJQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1FBQ2hDLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM5RCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsbUZBQW1GO0lBQ25GLE1BQU0sbUJBQW1CLEdBQUcsNkJBQTZCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JGLE9BQU8sbUJBQW1CLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMvRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2NoZW1hdGljc0V4Y2VwdGlvbiwgVHJlZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbi8qKlxuICogV2hldGhlciB0aGUgQW5ndWxhciBtb2R1bGUgaW4gdGhlIGdpdmVuIHBhdGggaW1wb3J0cyB0aGUgc3BlY2lmaWVkIG1vZHVsZSBjbGFzcyBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzTmdNb2R1bGVJbXBvcnQodHJlZTogVHJlZSwgbW9kdWxlUGF0aDogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBtb2R1bGVGaWxlQ29udGVudCA9IHRyZWUucmVhZChtb2R1bGVQYXRoKTtcblxuICBpZiAoIW1vZHVsZUZpbGVDb250ZW50KSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYENvdWxkIG5vdCByZWFkIEFuZ3VsYXIgbW9kdWxlIGZpbGU6ICR7bW9kdWxlUGF0aH1gKTtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZEZpbGUgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIG1vZHVsZUZpbGVDb250ZW50LnRvU3RyaW5nKCksXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcbiAgY29uc3QgbmdNb2R1bGVNZXRhZGF0YSA9IGZpbmROZ01vZHVsZU1ldGFkYXRhKHBhcnNlZEZpbGUpO1xuXG4gIGlmICghbmdNb2R1bGVNZXRhZGF0YSkge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBDb3VsZCBub3QgZmluZCBOZ01vZHVsZSBkZWNsYXJhdGlvbiBpbnNpZGU6IFwiJHttb2R1bGVQYXRofVwiYCk7XG4gIH1cblxuICBmb3IgKGxldCBwcm9wZXJ0eSBvZiBuZ01vZHVsZU1ldGFkYXRhIS5wcm9wZXJ0aWVzKSB7XG4gICAgaWYgKCF0cy5pc1Byb3BlcnR5QXNzaWdubWVudChwcm9wZXJ0eSkgfHwgcHJvcGVydHkubmFtZS5nZXRUZXh0KCkgIT09ICdpbXBvcnRzJyB8fFxuICAgICAgICAhdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKHByb3BlcnR5LmluaXRpYWxpemVyKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnR5LmluaXRpYWxpemVyLmVsZW1lbnRzLnNvbWUoZWxlbWVudCA9PiBlbGVtZW50LmdldFRleHQoKSA9PT0gY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBsYXN0IGlkZW50aWZpZXIgdGhhdCBpcyBwYXJ0IG9mIHRoZSBnaXZlbiBleHByZXNzaW9uLiBUaGlzIGhlbHBzIHJlc29sdmluZ1xuICogaWRlbnRpZmllcnMgb2YgbmVzdGVkIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9ucyAoZS5nLiBteU5hbWVzcGFjZS5jb3JlLk5nTW9kdWxlKS5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUlkZW50aWZpZXJPZkV4cHJlc3Npb24oZXhwcmVzc2lvbjogdHMuRXhwcmVzc2lvbik6IHRzLklkZW50aWZpZXIgfCBudWxsIHtcbiAgaWYgKHRzLmlzSWRlbnRpZmllcihleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBleHByZXNzaW9uO1xuICB9IGVsc2UgaWYgKHRzLmlzUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uKGV4cHJlc3Npb24pICYmIHRzLmlzSWRlbnRpZmllcihleHByZXNzaW9uLm5hbWUpKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24ubmFtZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIE5nTW9kdWxlIGRlY2xhcmF0aW9uIHdpdGhpbiB0aGUgc3BlY2lmaWVkIFR5cGVTY3JpcHQgbm9kZSBhbmQgcmV0dXJucyB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgZm9yIGl0LiBUaGlzIGZ1bmN0aW9uIHNlYXJjaGVzIGJyZWFkdGggZmlyc3QgYmVjYXVzZVxuICogTmdNb2R1bGUncyBhcmUgdXN1YWxseSBub3QgbmVzdGVkIHdpdGhpbiBvdGhlciBleHByZXNzaW9ucyBvciBkZWNsYXJhdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGZpbmROZ01vZHVsZU1ldGFkYXRhKHJvb3ROb2RlOiB0cy5Ob2RlKTogdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24gfCBudWxsIHtcbiAgLy8gQWRkIGltbWVkaWF0ZSBjaGlsZCBub2RlcyBvZiB0aGUgcm9vdCBub2RlIHRvIHRoZSBxdWV1ZS5cbiAgY29uc3Qgbm9kZVF1ZXVlOiB0cy5Ob2RlW10gPSBbLi4ucm9vdE5vZGUuZ2V0Q2hpbGRyZW4oKV07XG5cbiAgd2hpbGUgKG5vZGVRdWV1ZS5sZW5ndGgpIHtcbiAgICBjb25zdCBub2RlID0gbm9kZVF1ZXVlLnNoaWZ0KCkhO1xuXG4gICAgaWYgKHRzLmlzRGVjb3JhdG9yKG5vZGUpICYmIHRzLmlzQ2FsbEV4cHJlc3Npb24obm9kZS5leHByZXNzaW9uKSAmJlxuICAgICAgICBpc05nTW9kdWxlQ2FsbEV4cHJlc3Npb24obm9kZS5leHByZXNzaW9uKSkge1xuICAgICAgcmV0dXJuIG5vZGUuZXhwcmVzc2lvbi5hcmd1bWVudHNbMF0gYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb247XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGVRdWV1ZS5wdXNoKC4uLm5vZGUuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBXaGV0aGVyIHRoZSBzcGVjaWZpZWQgY2FsbCBleHByZXNzaW9uIGlzIHJlZmVycmluZyB0byBhIE5nTW9kdWxlIGRlZmluaXRpb24uICovXG5mdW5jdGlvbiBpc05nTW9kdWxlQ2FsbEV4cHJlc3Npb24oY2FsbEV4cHJlc3Npb246IHRzLkNhbGxFeHByZXNzaW9uKTogYm9vbGVhbiB7XG4gIGlmICghY2FsbEV4cHJlc3Npb24uYXJndW1lbnRzLmxlbmd0aCB8fFxuICAgICAgIXRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24oY2FsbEV4cHJlc3Npb24uYXJndW1lbnRzWzBdKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRoZSBgTmdNb2R1bGVgIGNhbGwgZXhwcmVzc2lvbiBuYW1lIGlzIG5ldmVyIHJlZmVycmluZyB0byBhIGBQcml2YXRlSWRlbnRpZmllcmAuXG4gIGNvbnN0IGRlY29yYXRvcklkZW50aWZpZXIgPSByZXNvbHZlSWRlbnRpZmllck9mRXhwcmVzc2lvbihjYWxsRXhwcmVzc2lvbi5leHByZXNzaW9uKTtcbiAgcmV0dXJuIGRlY29yYXRvcklkZW50aWZpZXIgPyBkZWNvcmF0b3JJZGVudGlmaWVyLnRleHQgPT09ICdOZ01vZHVsZScgOiBmYWxzZTtcbn1cbiJdfQ==