/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../../util/property';
/**
 * Construct an injectable definition which defines how a token will be constructed by the DI
 * system, and in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export function ɵɵdefineInjectable(opts) {
    return {
        token: opts.token,
        providedIn: opts.providedIn || null,
        factory: opts.factory,
        value: undefined,
    };
}
/**
 * @deprecated in v8, delete after v10. This API should be used only by generated code, and that
 * code should now use ɵɵdefineInjectable instead.
 * @publicApi
 */
export const defineInjectable = ɵɵdefineInjectable;
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @codeGenApi
 */
export function ɵɵdefineInjector(options) {
    return { providers: options.providers || [], imports: options.imports || [] };
}
/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
export function getInjectableDef(type) {
    return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
}
/**
 * Return definition only if it is defined directly on `type` and is not inherited from a base
 * class of `type`.
 */
function getOwnDefinition(type, field) {
    return type.hasOwnProperty(field) ? type[field] : null;
}
/**
 * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
 *
 * @param type A type which may have `ɵprov`, via inheritance.
 *
 * @deprecated Will be removed in a future version of Angular, where an error will occur in the
 *     scenario if we find the `ɵprov` on an ancestor only.
 */
export function getInheritedInjectableDef(type) {
    const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
    if (def) {
        const typeName = getTypeName(type);
        // TODO(FW-1307): Re-add ngDevMode when closure can handle it
        // ngDevMode &&
        console.warn(`DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.\n` +
            `This will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`);
        return def;
    }
    else {
        return null;
    }
}
/** Gets the name of a type, accounting for some cross-browser differences. */
function getTypeName(type) {
    // `Function.prototype.name` behaves differently between IE and other browsers. In most browsers
    // it'll always return the name of the function itself, no matter how many other functions it
    // inherits from. On IE the function doesn't have its own `name` property, but it takes it from
    // the lowest level in the prototype chain. E.g. if we have `class Foo extends Parent` most
    // browsers will evaluate `Foo.name` to `Foo` while IE will return `Parent`. We work around
    // the issue by converting the function to a string and parsing its name out that way via a regex.
    if (type.hasOwnProperty('name')) {
        return type.name;
    }
    const match = ('' + type).match(/^function\s*([^\s(]+)/);
    return match === null ? '' : match[1];
}
/**
 * Read the injector def type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have an injector def (`ɵinj`)
 */
export function getInjectorDef(type) {
    return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ?
        type[NG_INJ_DEF] :
        null;
}
export const NG_PROV_DEF = getClosureSafeProperty({ ɵprov: getClosureSafeProperty });
export const NG_INJ_DEF = getClosureSafeProperty({ ɵinj: getClosureSafeProperty });
// We need to keep these around so we can read off old defs if new defs are unavailable
export const NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
export const NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2ludGVyZmFjZS9kZWZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBbUgzRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBSSxJQUdyQztJQUNDLE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFpQixJQUFJLElBQUk7UUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1FBQ3JCLEtBQUssRUFBRSxTQUFTO0tBQ2EsQ0FBQztBQUNsQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQTZDO0lBQzVFLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDLENBQUM7QUFDOUUsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFJLElBQVM7SUFDM0MsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsZ0JBQWdCLENBQUksSUFBUyxFQUFFLEtBQWE7SUFDbkQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBSSxJQUFTO0lBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRW5FLElBQUksR0FBRyxFQUFFO1FBQ1AsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLDZEQUE2RDtRQUM3RCxlQUFlO1FBQ2YsT0FBTyxDQUFDLElBQUksQ0FDUiw0Q0FDSSxRQUFRLDhFQUE4RTtZQUMxRiw4RkFDSSxRQUFRLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsOEVBQThFO0FBQzlFLFNBQVMsV0FBVyxDQUFDLElBQVM7SUFDNUIsZ0dBQWdHO0lBQ2hHLDZGQUE2RjtJQUM3RiwrRkFBK0Y7SUFDL0YsMkZBQTJGO0lBQzNGLDJGQUEyRjtJQUMzRixrR0FBa0c7SUFDbEcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjtJQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFJLElBQVM7SUFDekMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLElBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQztBQUNYLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ25GLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFFakYsdUZBQXVGO0FBQ3ZGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNuRyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxhQUFhLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSBmcm9tICcuLi8uLi91dGlsL3Byb3BlcnR5JztcbmltcG9ydCB7Q2xhc3NQcm92aWRlciwgQ29uc3RydWN0b3JQcm92aWRlciwgRXhpc3RpbmdQcm92aWRlciwgRmFjdG9yeVByb3ZpZGVyLCBTdGF0aWNDbGFzc1Byb3ZpZGVyLCBWYWx1ZVByb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuXG5cbi8qKlxuICogSW5mb3JtYXRpb24gYWJvdXQgaG93IGEgdHlwZSBvciBgSW5qZWN0aW9uVG9rZW5gIGludGVyZmFjZXMgd2l0aCB0aGUgREkgc3lzdGVtLlxuICpcbiAqIEF0IGEgbWluaW11bSwgdGhpcyBpbmNsdWRlcyBhIGBmYWN0b3J5YCB3aGljaCBkZWZpbmVzIGhvdyB0byBjcmVhdGUgdGhlIGdpdmVuIHR5cGUgYFRgLCBwb3NzaWJseVxuICogcmVxdWVzdGluZyBpbmplY3Rpb24gb2Ygb3RoZXIgdHlwZXMgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIE9wdGlvbmFsbHksIGEgYHByb3ZpZGVkSW5gIHBhcmFtZXRlciBzcGVjaWZpZXMgdGhhdCB0aGUgZ2l2ZW4gdHlwZSBiZWxvbmdzIHRvIGEgcGFydGljdWxhclxuICogYEluamVjdG9yYCwgYE5nTW9kdWxlYCwgb3IgYSBzcGVjaWFsIHNjb3BlIChlLmcuIGAncm9vdCdgKS4gQSB2YWx1ZSBvZiBgbnVsbGAgaW5kaWNhdGVzXG4gKiB0aGF0IHRoZSBpbmplY3RhYmxlIGRvZXMgbm90IGJlbG9uZyB0byBhbnkgc2NvcGUuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqIEBwdWJsaWNBcGkgVGhlIFZpZXdFbmdpbmUgY29tcGlsZXIgZW1pdHMgY29kZSB3aXRoIHRoaXMgdHlwZSBmb3IgaW5qZWN0YWJsZXMuIFRoaXMgY29kZSBpc1xuICogICBkZXBsb3llZCB0byBucG0sIGFuZCBzaG91bGQgYmUgdHJlYXRlZCBhcyBwdWJsaWMgYXBpLlxuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgybXJtUluamVjdGFibGVEZWNsYXJhdGlvbjxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhhdCB0aGUgZ2l2ZW4gdHlwZSBiZWxvbmdzIHRvIGEgcGFydGljdWxhciBpbmplY3RvcjpcbiAgICogLSBgSW5qZWN0b3JUeXBlYCBzdWNoIGFzIGBOZ01vZHVsZWAsXG4gICAqIC0gYCdyb290J2AgdGhlIHJvb3QgaW5qZWN0b3JcbiAgICogLSBgJ2FueSdgIGFsbCBpbmplY3RvcnMuXG4gICAqIC0gYG51bGxgLCBkb2VzIG5vdCBiZWxvbmcgdG8gYW55IGluamVjdG9yLiBNdXN0IGJlIGV4cGxpY2l0bHkgbGlzdGVkIGluIHRoZSBpbmplY3RvclxuICAgKiAgIGBwcm92aWRlcnNgLlxuICAgKi9cbiAgcHJvdmlkZWRJbjogSW5qZWN0b3JUeXBlPGFueT58J3Jvb3QnfCdwbGF0Zm9ybSd8J2FueSd8bnVsbDtcblxuICAvKipcbiAgICogVGhlIHRva2VuIHRvIHdoaWNoIHRoaXMgZGVmaW5pdGlvbiBiZWxvbmdzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBtYXkgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSB0eXBlIHRoYXQgdGhlIGBmYWN0b3J5YCB3aWxsIGNyZWF0ZS5cbiAgICovXG4gIHRva2VuOiB1bmtub3duO1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB0byBleGVjdXRlIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZS5cbiAgICovXG4gIGZhY3Rvcnk6ICh0PzogVHlwZTxhbnk+KSA9PiBUO1xuXG4gIC8qKlxuICAgKiBJbiBhIGNhc2Ugb2Ygbm8gZXhwbGljaXQgaW5qZWN0b3IsIGEgbG9jYXRpb24gd2hlcmUgdGhlIGluc3RhbmNlIG9mIHRoZSBpbmplY3RhYmxlIGlzIHN0b3JlZC5cbiAgICovXG4gIHZhbHVlOiBUfHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgcHJvdmlkZXJzIHRvIGJlIGluY2x1ZGVkIGluIGFuIGBJbmplY3RvcmAgYXMgd2VsbCBhcyBob3cgdGhlIGdpdmVuIHR5cGVcbiAqIHdoaWNoIGNhcnJpZXMgdGhlIGluZm9ybWF0aW9uIHNob3VsZCBiZSBjcmVhdGVkIGJ5IHRoZSBESSBzeXN0ZW0uXG4gKlxuICogQW4gYEluamVjdG9yRGVmYCBjYW4gaW1wb3J0IG90aGVyIHR5cGVzIHdoaWNoIGhhdmUgYEluamVjdG9yRGVmc2AsIGZvcm1pbmcgYSBkZWVwIG5lc3RlZFxuICogc3RydWN0dXJlIG9mIHByb3ZpZGVycyB3aXRoIGEgZGVmaW5lZCBwcmlvcml0eSAoaWRlbnRpY2FsbHkgdG8gaG93IGBOZ01vZHVsZWBzIGFsc28gaGF2ZVxuICogYW4gaW1wb3J0L2RlcGVuZGVuY3kgc3RydWN0dXJlKS5cbiAqXG4gKiBOT1RFOiBUaGlzIGlzIGEgcHJpdmF0ZSB0eXBlIGFuZCBzaG91bGQgbm90IGJlIGV4cG9ydGVkXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSDJtcm1SW5qZWN0b3JEZWY8VD4ge1xuICAvLyBUT0RPKGFseGh1Yik6IE5hcnJvdyBkb3duIHRoZSB0eXBlIGhlcmUgb25jZSBkZWNvcmF0b3JzIHByb3Blcmx5IGNoYW5nZSB0aGUgcmV0dXJuIHR5cGUgb2YgdGhlXG4gIC8vIGNsYXNzIHRoZXkgYXJlIGRlY29yYXRpbmcgKHRvIGFkZCB0aGUgybVwcm92IHByb3BlcnR5IGZvciBleGFtcGxlKS5cbiAgcHJvdmlkZXJzOiAoVHlwZTxhbnk+fFZhbHVlUHJvdmlkZXJ8RXhpc3RpbmdQcm92aWRlcnxGYWN0b3J5UHJvdmlkZXJ8Q29uc3RydWN0b3JQcm92aWRlcnxcbiAgICAgICAgICAgICAgU3RhdGljQ2xhc3NQcm92aWRlcnxDbGFzc1Byb3ZpZGVyfGFueVtdKVtdO1xuXG4gIGltcG9ydHM6IChJbmplY3RvclR5cGU8YW55PnxJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzPGFueT4pW107XG59XG5cbi8qKlxuICogQSBgVHlwZWAgd2hpY2ggaGFzIGEgYMm1cHJvdjogybXJtUluamVjdGFibGVEZWNsYXJhdGlvbmAgc3RhdGljIGZpZWxkLlxuICpcbiAqIGBJbmplY3RhYmxlVHlwZWBzIGNvbnRhaW4gdGhlaXIgb3duIERlcGVuZGVuY3kgSW5qZWN0aW9uIG1ldGFkYXRhIGFuZCBhcmUgdXNhYmxlIGluIGFuXG4gKiBgSW5qZWN0b3JEZWZgLWJhc2VkIGBTdGF0aWNJbmplY3Rvci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZVR5cGU8VD4gZXh0ZW5kcyBUeXBlPFQ+IHtcbiAgLyoqXG4gICAqIE9wYXF1ZSB0eXBlIHdob3NlIHN0cnVjdHVyZSBpcyBoaWdobHkgdmVyc2lvbiBkZXBlbmRlbnQuIERvIG5vdCByZWx5IG9uIGFueSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgybVwcm92OiB1bmtub3duO1xufVxuXG4vKipcbiAqIEEgdHlwZSB3aGljaCBoYXMgYW4gYEluamVjdG9yRGVmYCBzdGF0aWMgZmllbGQuXG4gKlxuICogYEluamVjdG9yVHlwZXNgIGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSBhIGBTdGF0aWNJbmplY3RvcmAuXG4gKlxuICogVGhpcyBpcyBhbiBvcGFxdWUgdHlwZSB3aG9zZSBzdHJ1Y3R1cmUgaXMgaGlnaGx5IHZlcnNpb24gZGVwZW5kZW50LiBEbyBub3QgcmVseSBvbiBhbnlcbiAqIHByb3BlcnRpZXMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdG9yVHlwZTxUPiBleHRlbmRzIFR5cGU8VD4ge1xuICDJtWZhYz86IHVua25vd247XG4gIMm1aW5qOiB1bmtub3duO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgYEluamVjdG9yRGVmYCBlcXVpdmFsZW50IG9mIGEgYE1vZHVsZVdpdGhQcm92aWRlcnNgLCBhbiBgSW5qZWN0b3JUeXBlYCB3aXRoIGFuXG4gKiBhc3NvY2lhdGVkIGFycmF5IG9mIHByb3ZpZGVycy5cbiAqXG4gKiBPYmplY3RzIG9mIHRoaXMgdHlwZSBjYW4gYmUgbGlzdGVkIGluIHRoZSBpbXBvcnRzIHNlY3Rpb24gb2YgYW4gYEluamVjdG9yRGVmYC5cbiAqXG4gKiBOT1RFOiBUaGlzIGlzIGEgcHJpdmF0ZSB0eXBlIGFuZCBzaG91bGQgbm90IGJlIGV4cG9ydGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxUPiB7XG4gIG5nTW9kdWxlOiBJbmplY3RvclR5cGU8VD47XG4gIHByb3ZpZGVycz86IChUeXBlPGFueT58VmFsdWVQcm92aWRlcnxFeGlzdGluZ1Byb3ZpZGVyfEZhY3RvcnlQcm92aWRlcnxDb25zdHJ1Y3RvclByb3ZpZGVyfFxuICAgICAgICAgICAgICAgU3RhdGljQ2xhc3NQcm92aWRlcnxDbGFzc1Byb3ZpZGVyfGFueVtdKVtdO1xufVxuXG5cbi8qKlxuICogQ29uc3RydWN0IGFuIGluamVjdGFibGUgZGVmaW5pdGlvbiB3aGljaCBkZWZpbmVzIGhvdyBhIHRva2VuIHdpbGwgYmUgY29uc3RydWN0ZWQgYnkgdGhlIERJXG4gKiBzeXN0ZW0sIGFuZCBpbiB3aGljaCBpbmplY3RvcnMgKGlmIGFueSkgaXQgd2lsbCBiZSBhdmFpbGFibGUuXG4gKlxuICogVGhpcyBzaG91bGQgYmUgYXNzaWduZWQgdG8gYSBzdGF0aWMgYMm1cHJvdmAgZmllbGQgb24gYSB0eXBlLCB3aGljaCB3aWxsIHRoZW4gYmUgYW5cbiAqIGBJbmplY3RhYmxlVHlwZWAuXG4gKlxuICogT3B0aW9uczpcbiAqICogYHByb3ZpZGVkSW5gIGRldGVybWluZXMgd2hpY2ggaW5qZWN0b3JzIHdpbGwgaW5jbHVkZSB0aGUgaW5qZWN0YWJsZSwgYnkgZWl0aGVyIGFzc29jaWF0aW5nIGl0XG4gKiAgIHdpdGggYW4gYEBOZ01vZHVsZWAgb3Igb3RoZXIgYEluamVjdG9yVHlwZWAsIG9yIGJ5IHNwZWNpZnlpbmcgdGhhdCB0aGlzIGluamVjdGFibGUgc2hvdWxkIGJlXG4gKiAgIHByb3ZpZGVkIGluIHRoZSBgJ3Jvb3QnYCBpbmplY3Rvciwgd2hpY2ggd2lsbCBiZSB0aGUgYXBwbGljYXRpb24tbGV2ZWwgaW5qZWN0b3IgaW4gbW9zdCBhcHBzLlxuICogKiBgZmFjdG9yeWAgZ2l2ZXMgdGhlIHplcm8gYXJndW1lbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGluamVjdGFibGUuXG4gKiAgIFRoZSBmYWN0b3J5IGNhbiBjYWxsIGBpbmplY3RgIHRvIGFjY2VzcyB0aGUgYEluamVjdG9yYCBhbmQgcmVxdWVzdCBpbmplY3Rpb24gb2YgZGVwZW5kZW5jaWVzLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKiBAcHVibGljQXBpIFRoaXMgaW5zdHJ1Y3Rpb24gaGFzIGJlZW4gZW1pdHRlZCBieSBWaWV3RW5naW5lIGZvciBzb21lIHRpbWUgYW5kIGlzIGRlcGxveWVkIHRvIG5wbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZpbmVJbmplY3RhYmxlPFQ+KG9wdHM6IHtcbiAgdG9rZW46IHVua25vd24sXG4gIHByb3ZpZGVkSW4/OiBUeXBlPGFueT58J3Jvb3QnfCdwbGF0Zm9ybSd8J2FueSd8bnVsbCwgZmFjdG9yeTogKCkgPT4gVCxcbn0pOiB1bmtub3duIHtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogb3B0cy50b2tlbixcbiAgICBwcm92aWRlZEluOiBvcHRzLnByb3ZpZGVkSW4gYXMgYW55IHx8IG51bGwsXG4gICAgZmFjdG9yeTogb3B0cy5mYWN0b3J5LFxuICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gIH0gYXMgybXJtUluamVjdGFibGVEZWNsYXJhdGlvbjxUPjtcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBpbiB2OCwgZGVsZXRlIGFmdGVyIHYxMC4gVGhpcyBBUEkgc2hvdWxkIGJlIHVzZWQgb25seSBieSBnZW5lcmF0ZWQgY29kZSwgYW5kIHRoYXRcbiAqIGNvZGUgc2hvdWxkIG5vdyB1c2UgybXJtWRlZmluZUluamVjdGFibGUgaW5zdGVhZC5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUluamVjdGFibGUgPSDJtcm1ZGVmaW5lSW5qZWN0YWJsZTtcblxuLyoqXG4gKiBDb25zdHJ1Y3QgYW4gYEluamVjdG9yRGVmYCB3aGljaCBjb25maWd1cmVzIGFuIGluamVjdG9yLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIGFzc2lnbmVkIHRvIGEgc3RhdGljIGluamVjdG9yIGRlZiAoYMm1aW5qYCkgZmllbGQgb24gYSB0eXBlLCB3aGljaCB3aWxsIHRoZW4gYmUgYW5cbiAqIGBJbmplY3RvclR5cGVgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogKiBgcHJvdmlkZXJzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgcHJvdmlkZXJzIHRvIGFkZCB0byB0aGUgaW5qZWN0b3IuIEVhY2ggcHJvdmlkZXIgbXVzdFxuICogICBlaXRoZXIgaGF2ZSBhIGZhY3Rvcnkgb3IgcG9pbnQgdG8gYSB0eXBlIHdoaWNoIGhhcyBhIGDJtXByb3ZgIHN0YXRpYyBwcm9wZXJ0eSAodGhlXG4gKiAgIHR5cGUgbXVzdCBiZSBhbiBgSW5qZWN0YWJsZVR5cGVgKS5cbiAqICogYGltcG9ydHNgOiBhbiBvcHRpb25hbCBhcnJheSBvZiBpbXBvcnRzIG9mIG90aGVyIGBJbmplY3RvclR5cGVgcyBvciBgSW5qZWN0b3JUeXBlV2l0aE1vZHVsZWBzXG4gKiAgIHdob3NlIHByb3ZpZGVycyB3aWxsIGFsc28gYmUgYWRkZWQgdG8gdGhlIGluamVjdG9yLiBMb2NhbGx5IHByb3ZpZGVkIHR5cGVzIHdpbGwgb3ZlcnJpZGVcbiAqICAgcHJvdmlkZXJzIGZyb20gaW1wb3J0cy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmluZUluamVjdG9yKG9wdGlvbnM6IHtwcm92aWRlcnM/OiBhbnlbXSwgaW1wb3J0cz86IGFueVtdfSk6IHVua25vd24ge1xuICByZXR1cm4ge3Byb3ZpZGVyczogb3B0aW9ucy5wcm92aWRlcnMgfHwgW10sIGltcG9ydHM6IG9wdGlvbnMuaW1wb3J0cyB8fCBbXX07XG59XG5cbi8qKlxuICogUmVhZCB0aGUgaW5qZWN0YWJsZSBkZWYgKGDJtXByb3ZgKSBmb3IgYHR5cGVgIGluIGEgd2F5IHdoaWNoIGlzIGltbXVuZSB0byBhY2NpZGVudGFsbHkgcmVhZGluZ1xuICogaW5oZXJpdGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB0eXBlIEEgdHlwZSB3aGljaCBtYXkgaGF2ZSBpdHMgb3duIChub24taW5oZXJpdGVkKSBgybVwcm92YC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluamVjdGFibGVEZWY8VD4odHlwZTogYW55KTogybXJtUluamVjdGFibGVEZWNsYXJhdGlvbjxUPnxudWxsIHtcbiAgcmV0dXJuIGdldE93bkRlZmluaXRpb24odHlwZSwgTkdfUFJPVl9ERUYpIHx8IGdldE93bkRlZmluaXRpb24odHlwZSwgTkdfSU5KRUNUQUJMRV9ERUYpO1xufVxuXG4vKipcbiAqIFJldHVybiBkZWZpbml0aW9uIG9ubHkgaWYgaXQgaXMgZGVmaW5lZCBkaXJlY3RseSBvbiBgdHlwZWAgYW5kIGlzIG5vdCBpbmhlcml0ZWQgZnJvbSBhIGJhc2VcbiAqIGNsYXNzIG9mIGB0eXBlYC5cbiAqL1xuZnVuY3Rpb24gZ2V0T3duRGVmaW5pdGlvbjxUPih0eXBlOiBhbnksIGZpZWxkOiBzdHJpbmcpOiDJtcm1SW5qZWN0YWJsZURlY2xhcmF0aW9uPFQ+fG51bGwge1xuICByZXR1cm4gdHlwZS5oYXNPd25Qcm9wZXJ0eShmaWVsZCkgPyB0eXBlW2ZpZWxkXSA6IG51bGw7XG59XG5cbi8qKlxuICogUmVhZCB0aGUgaW5qZWN0YWJsZSBkZWYgKGDJtXByb3ZgKSBmb3IgYHR5cGVgIG9yIHJlYWQgdGhlIGDJtXByb3ZgIGZyb20gb25lIG9mIGl0cyBhbmNlc3RvcnMuXG4gKlxuICogQHBhcmFtIHR5cGUgQSB0eXBlIHdoaWNoIG1heSBoYXZlIGDJtXByb3ZgLCB2aWEgaW5oZXJpdGFuY2UuXG4gKlxuICogQGRlcHJlY2F0ZWQgV2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgQW5ndWxhciwgd2hlcmUgYW4gZXJyb3Igd2lsbCBvY2N1ciBpbiB0aGVcbiAqICAgICBzY2VuYXJpbyBpZiB3ZSBmaW5kIHRoZSBgybVwcm92YCBvbiBhbiBhbmNlc3RvciBvbmx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5oZXJpdGVkSW5qZWN0YWJsZURlZjxUPih0eXBlOiBhbnkpOiDJtcm1SW5qZWN0YWJsZURlY2xhcmF0aW9uPFQ+fG51bGwge1xuICBjb25zdCBkZWYgPSB0eXBlICYmICh0eXBlW05HX1BST1ZfREVGXSB8fCB0eXBlW05HX0lOSkVDVEFCTEVfREVGXSk7XG5cbiAgaWYgKGRlZikge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gZ2V0VHlwZU5hbWUodHlwZSk7XG4gICAgLy8gVE9ETyhGVy0xMzA3KTogUmUtYWRkIG5nRGV2TW9kZSB3aGVuIGNsb3N1cmUgY2FuIGhhbmRsZSBpdFxuICAgIC8vIG5nRGV2TW9kZSAmJlxuICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYERFUFJFQ0FURUQ6IERJIGlzIGluc3RhbnRpYXRpbmcgYSB0b2tlbiBcIiR7XG4gICAgICAgICAgICB0eXBlTmFtZX1cIiB0aGF0IGluaGVyaXRzIGl0cyBASW5qZWN0YWJsZSBkZWNvcmF0b3IgYnV0IGRvZXMgbm90IHByb3ZpZGUgb25lIGl0c2VsZi5cXG5gICtcbiAgICAgICAgYFRoaXMgd2lsbCBiZWNvbWUgYW4gZXJyb3IgaW4gYSBmdXR1cmUgdmVyc2lvbiBvZiBBbmd1bGFyLiBQbGVhc2UgYWRkIEBJbmplY3RhYmxlKCkgdG8gdGhlIFwiJHtcbiAgICAgICAgICAgIHR5cGVOYW1lfVwiIGNsYXNzLmApO1xuICAgIHJldHVybiBkZWY7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqIEdldHMgdGhlIG5hbWUgb2YgYSB0eXBlLCBhY2NvdW50aW5nIGZvciBzb21lIGNyb3NzLWJyb3dzZXIgZGlmZmVyZW5jZXMuICovXG5mdW5jdGlvbiBnZXRUeXBlTmFtZSh0eXBlOiBhbnkpOiBzdHJpbmcge1xuICAvLyBgRnVuY3Rpb24ucHJvdG90eXBlLm5hbWVgIGJlaGF2ZXMgZGlmZmVyZW50bHkgYmV0d2VlbiBJRSBhbmQgb3RoZXIgYnJvd3NlcnMuIEluIG1vc3QgYnJvd3NlcnNcbiAgLy8gaXQnbGwgYWx3YXlzIHJldHVybiB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gaXRzZWxmLCBubyBtYXR0ZXIgaG93IG1hbnkgb3RoZXIgZnVuY3Rpb25zIGl0XG4gIC8vIGluaGVyaXRzIGZyb20uIE9uIElFIHRoZSBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgaXRzIG93biBgbmFtZWAgcHJvcGVydHksIGJ1dCBpdCB0YWtlcyBpdCBmcm9tXG4gIC8vIHRoZSBsb3dlc3QgbGV2ZWwgaW4gdGhlIHByb3RvdHlwZSBjaGFpbi4gRS5nLiBpZiB3ZSBoYXZlIGBjbGFzcyBGb28gZXh0ZW5kcyBQYXJlbnRgIG1vc3RcbiAgLy8gYnJvd3NlcnMgd2lsbCBldmFsdWF0ZSBgRm9vLm5hbWVgIHRvIGBGb29gIHdoaWxlIElFIHdpbGwgcmV0dXJuIGBQYXJlbnRgLiBXZSB3b3JrIGFyb3VuZFxuICAvLyB0aGUgaXNzdWUgYnkgY29udmVydGluZyB0aGUgZnVuY3Rpb24gdG8gYSBzdHJpbmcgYW5kIHBhcnNpbmcgaXRzIG5hbWUgb3V0IHRoYXQgd2F5IHZpYSBhIHJlZ2V4LlxuICBpZiAodHlwZS5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpKSB7XG4gICAgcmV0dXJuIHR5cGUubmFtZTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gKCcnICsgdHlwZSkubWF0Y2goL15mdW5jdGlvblxccyooW15cXHMoXSspLyk7XG4gIHJldHVybiBtYXRjaCA9PT0gbnVsbCA/ICcnIDogbWF0Y2hbMV07XG59XG5cbi8qKlxuICogUmVhZCB0aGUgaW5qZWN0b3IgZGVmIHR5cGUgaW4gYSB3YXkgd2hpY2ggaXMgaW1tdW5lIHRvIGFjY2lkZW50YWxseSByZWFkaW5nIGluaGVyaXRlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gdHlwZSB0eXBlIHdoaWNoIG1heSBoYXZlIGFuIGluamVjdG9yIGRlZiAoYMm1aW5qYClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluamVjdG9yRGVmPFQ+KHR5cGU6IGFueSk6IMm1ybVJbmplY3RvckRlZjxUPnxudWxsIHtcbiAgcmV0dXJuIHR5cGUgJiYgKHR5cGUuaGFzT3duUHJvcGVydHkoTkdfSU5KX0RFRikgfHwgdHlwZS5oYXNPd25Qcm9wZXJ0eShOR19JTkpFQ1RPUl9ERUYpKSA/XG4gICAgICAodHlwZSBhcyBhbnkpW05HX0lOSl9ERUZdIDpcbiAgICAgIG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBOR19QUk9WX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe8m1cHJvdjogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuZXhwb3J0IGNvbnN0IE5HX0lOSl9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtWluajogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG4vLyBXZSBuZWVkIHRvIGtlZXAgdGhlc2UgYXJvdW5kIHNvIHdlIGNhbiByZWFkIG9mZiBvbGQgZGVmcyBpZiBuZXcgZGVmcyBhcmUgdW5hdmFpbGFibGVcbmV4cG9ydCBjb25zdCBOR19JTkpFQ1RBQkxFX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nSW5qZWN0YWJsZURlZjogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuZXhwb3J0IGNvbnN0IE5HX0lOSkVDVE9SX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nSW5qZWN0b3JEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbiJdfQ==