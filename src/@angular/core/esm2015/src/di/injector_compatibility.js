/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../util/ng_dev_mode';
import { getClosureSafeProperty } from '../util/property';
import { stringify } from '../util/stringify';
import { resolveForwardRef } from './forward_ref';
import { getInjectImplementation, injectRootLimpMode } from './inject_switch';
import { InjectFlags } from './interface/injector';
const _THROW_IF_NOT_FOUND = {};
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
/*
 * Name of a property (that we patch onto DI decorator), which is used as an annotation of which
 * InjectFlag this decorator represents. This allows to avoid direct references to the DI decorators
 * in the code, thus making them tree-shakable.
 */
const DI_DECORATOR_FLAG = '__NG_DI_FLAG__';
export const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
const NG_TOKEN_PATH = 'ngTokenPath';
const NEW_LINE = /\n/gm;
const NO_NEW_LINE = 'ɵ';
export const SOURCE = '__source';
const ɵ0 = getClosureSafeProperty;
export const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 });
/**
 * Current injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - `null`: `inject` can be called but there is no injector (limp-mode).
 * - Injector instance: Use the injector for resolution.
 */
let _currentInjector = undefined;
export function setCurrentInjector(injector) {
    const former = _currentInjector;
    _currentInjector = injector;
    return former;
}
export function injectInjectorOnly(token, flags = InjectFlags.Default) {
    if (_currentInjector === undefined) {
        throw new Error(`inject() must be called from an injection context`);
    }
    else if (_currentInjector === null) {
        return injectRootLimpMode(token, undefined, flags);
    }
    else {
        return _currentInjector.get(token, flags & InjectFlags.Optional ? null : undefined, flags);
    }
}
export function ɵɵinject(token, flags = InjectFlags.Default) {
    return (getInjectImplementation() || injectInjectorOnly)(resolveForwardRef(token), flags);
}
/**
 * Throws an error indicating that a factory function could not be generated by the compiler for a
 * particular class.
 *
 * This instruction allows the actual error message to be optimized away when ngDevMode is turned
 * off, saving bytes of generated code while still providing a good experience in dev mode.
 *
 * The name of the class is not mentioned here, but will be in the generated factory function name
 * and thus in the stack trace.
 *
 * @codeGenApi
 */
export function ɵɵinvalidFactoryDep(index) {
    const msg = ngDevMode ?
        `This constructor is not compatible with Angular Dependency Injection because its dependency at index ${index} of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index ${index} is correct and 2) the correct Angular decorators are defined for this class and its ancestors.` :
        'invalid';
    throw new Error(msg);
}
/**
 * Injects a token from the currently active injector.
 *
 * Must be used in the context of a factory function such as one defined for an
 * `InjectionToken`. Throws an error if not called from such a context.
 *
 * Within such a factory function, using this function to request injection of a dependency
 * is faster and more type-safe than providing an additional array of dependencies
 * (as has been common with `useFactory` providers).
 *
 * @param token The injection token for the dependency to be injected.
 * @param flags Optional flags that control how injection is executed.
 * The flags correspond to injection strategies that can be specified with
 * parameter decorators `@Host`, `@Self`, `@SkipSef`, and `@Optional`.
 * @returns the injected value if injection is successful, `null` otherwise.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 * @publicApi
 */
export const inject = ɵɵinject;
export function injectArgs(types) {
    const args = [];
    for (let i = 0; i < types.length; i++) {
        const arg = resolveForwardRef(types[i]);
        if (Array.isArray(arg)) {
            if (arg.length === 0) {
                throw new Error('Arguments array must have arguments.');
            }
            let type = undefined;
            let flags = InjectFlags.Default;
            for (let j = 0; j < arg.length; j++) {
                const meta = arg[j];
                const flag = getInjectFlag(meta);
                if (typeof flag === 'number') {
                    // Special case when we handle @Inject decorator.
                    if (flag === -1 /* Inject */) {
                        type = meta.token;
                    }
                    else {
                        flags |= flag;
                    }
                }
                else {
                    type = meta;
                }
            }
            args.push(ɵɵinject(type, flags));
        }
        else {
            args.push(ɵɵinject(arg));
        }
    }
    return args;
}
/**
 * Attaches a given InjectFlag to a given decorator using monkey-patching.
 * Since DI decorators can be used in providers `deps` array (when provider is configured using
 * `useFactory`) without initialization (e.g. `Host`) and as an instance (e.g. `new Host()`), we
 * attach the flag to make it available both as a static property and as a field on decorator
 * instance.
 *
 * @param decorator Provided DI decorator.
 * @param flag InjectFlag that should be applied.
 */
export function attachInjectFlag(decorator, flag) {
    decorator[DI_DECORATOR_FLAG] = flag;
    decorator.prototype[DI_DECORATOR_FLAG] = flag;
    return decorator;
}
/**
 * Reads monkey-patched property that contains InjectFlag attached to a decorator.
 *
 * @param token Token that may contain monkey-patched DI flags property.
 */
export function getInjectFlag(token) {
    return token[DI_DECORATOR_FLAG];
}
export function catchInjectorError(e, token, injectorErrorName, source) {
    const tokenPath = e[NG_TEMP_TOKEN_PATH];
    if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
    }
    e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[NG_TEMP_TOKEN_PATH] = null;
    throw e;
}
export function formatError(text, obj, injectorErrorName, source = null) {
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    let context = stringify(obj);
    if (Array.isArray(obj)) {
        context = obj.map(stringify).join(' -> ');
    }
    else if (typeof obj === 'object') {
        let parts = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                parts.push(key + ':' + (typeof value === 'string' ? JSON.stringify(value) : stringify(value)));
            }
        }
        context = `{${parts.join(', ')}}`;
    }
    return `${injectorErrorName}${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfY29tcGF0aWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdG9yX2NvbXBhdGliaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxxQkFBcUIsQ0FBQztBQUc3QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTVFLE9BQU8sRUFBaUIsV0FBVyxFQUFzQixNQUFNLHNCQUFzQixDQUFDO0FBS3RGLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBQy9CLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDO0FBRXREOzs7O0dBSUc7QUFDSCxNQUFNLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO0FBRTNDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO0FBQ3BELE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUNwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFDeEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7V0FHcUMsc0JBQXNCO0FBRDVGLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FDbEIsc0JBQXNCLENBQWdCLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLElBQXdCLEVBQUMsQ0FBQyxDQUFDO0FBRS9GOzs7OztHQUtHO0FBQ0gsSUFBSSxnQkFBZ0IsR0FBNEIsU0FBUyxDQUFD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SSxPQUFPLE1BQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJy4uL3V0aWwvbmdfZGV2X21vZGUnO1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vdXRpbC9wcm9wZXJ0eSc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnknO1xuXG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcbmltcG9ydCB7Z2V0SW5qZWN0SW1wbGVtZW50YXRpb24sIGluamVjdFJvb3RMaW1wTW9kZX0gZnJvbSAnLi9pbmplY3Rfc3dpdGNoJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IHtEZWNvcmF0b3JGbGFncywgSW5qZWN0RmxhZ3MsIEludGVybmFsSW5qZWN0RmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlL2luamVjdG9yJztcbmltcG9ydCB7VmFsdWVQcm92aWRlcn0gZnJvbSAnLi9pbnRlcmZhY2UvcHJvdmlkZXInO1xuaW1wb3J0IHtQcm92aWRlclRva2VufSBmcm9tICcuL3Byb3ZpZGVyX3Rva2VuJztcblxuXG5jb25zdCBfVEhST1dfSUZfTk9UX0ZPVU5EID0ge307XG5leHBvcnQgY29uc3QgVEhST1dfSUZfTk9UX0ZPVU5EID0gX1RIUk9XX0lGX05PVF9GT1VORDtcblxuLypcbiAqIE5hbWUgb2YgYSBwcm9wZXJ0eSAodGhhdCB3ZSBwYXRjaCBvbnRvIERJIGRlY29yYXRvciksIHdoaWNoIGlzIHVzZWQgYXMgYW4gYW5ub3RhdGlvbiBvZiB3aGljaFxuICogSW5qZWN0RmxhZyB0aGlzIGRlY29yYXRvciByZXByZXNlbnRzLiBUaGlzIGFsbG93cyB0byBhdm9pZCBkaXJlY3QgcmVmZXJlbmNlcyB0byB0aGUgREkgZGVjb3JhdG9yc1xuICogaW4gdGhlIGNvZGUsIHRodXMgbWFraW5nIHRoZW0gdHJlZS1zaGFrYWJsZS5cbiAqL1xuY29uc3QgRElfREVDT1JBVE9SX0ZMQUcgPSAnX19OR19ESV9GTEFHX18nO1xuXG5leHBvcnQgY29uc3QgTkdfVEVNUF9UT0tFTl9QQVRIID0gJ25nVGVtcFRva2VuUGF0aCc7XG5jb25zdCBOR19UT0tFTl9QQVRIID0gJ25nVG9rZW5QYXRoJztcbmNvbnN0IE5FV19MSU5FID0gL1xcbi9nbTtcbmNvbnN0IE5PX05FV19MSU5FID0gJ8m1JztcbmV4cG9ydCBjb25zdCBTT1VSQ0UgPSAnX19zb3VyY2UnO1xuXG5leHBvcnQgY29uc3QgVVNFX1ZBTFVFID1cbiAgICBnZXRDbG9zdXJlU2FmZVByb3BlcnR5PFZhbHVlUHJvdmlkZXI+KHtwcm92aWRlOiBTdHJpbmcsIHVzZVZhbHVlOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5cbi8qKlxuICogQ3VycmVudCBpbmplY3RvciB2YWx1ZSB1c2VkIGJ5IGBpbmplY3RgLlxuICogLSBgdW5kZWZpbmVkYDogaXQgaXMgYW4gZXJyb3IgdG8gY2FsbCBgaW5qZWN0YFxuICogLSBgbnVsbGA6IGBpbmplY3RgIGNhbiBiZSBjYWxsZWQgYnV0IHRoZXJlIGlzIG5vIGluamVjdG9yIChsaW1wLW1vZGUpLlxuICogLSBJbmplY3RvciBpbnN0YW5jZTogVXNlIHRoZSBpbmplY3RvciBmb3IgcmVzb2x1dGlvbi5cbiAqL1xubGV0IF9jdXJyZW50SW5qZWN0b3I6IEluamVjdG9yfHVuZGVmaW5lZHxudWxsID0gdW5kZWZpbmVkO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudEluamVjdG9yKGluamVjdG9yOiBJbmplY3RvcnxudWxsfHVuZGVmaW5lZCk6IEluamVjdG9yfHVuZGVmaW5lZHxudWxsIHtcbiAgY29uc3QgZm9ybWVyID0gX2N1cnJlbnRJbmplY3RvcjtcbiAgX2N1cnJlbnRJbmplY3RvciA9IGluamVjdG9yO1xuICByZXR1cm4gZm9ybWVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SW5qZWN0b3JPbmx5PFQ+KHRva2VuOiBQcm92aWRlclRva2VuPFQ+KTogVDtcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RJbmplY3Rvck9ubHk8VD4odG9rZW46IFByb3ZpZGVyVG9rZW48VD4sIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUfG51bGw7XG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SW5qZWN0b3JPbmx5PFQ+KHRva2VuOiBQcm92aWRlclRva2VuPFQ+LCBmbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBUfFxuICAgIG51bGwge1xuICBpZiAoX2N1cnJlbnRJbmplY3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBpbmplY3QoKSBtdXN0IGJlIGNhbGxlZCBmcm9tIGFuIGluamVjdGlvbiBjb250ZXh0YCk7XG4gIH0gZWxzZSBpZiAoX2N1cnJlbnRJbmplY3RvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBpbmplY3RSb290TGltcE1vZGUodG9rZW4sIHVuZGVmaW5lZCwgZmxhZ3MpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfY3VycmVudEluamVjdG9yLmdldCh0b2tlbiwgZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCA/IG51bGwgOiB1bmRlZmluZWQsIGZsYWdzKTtcbiAgfVxufVxuXG4vKipcbiAqIEdlbmVyYXRlZCBpbnN0cnVjdGlvbjogSW5qZWN0cyBhIHRva2VuIGZyb20gdGhlIGN1cnJlbnRseSBhY3RpdmUgaW5qZWN0b3IuXG4gKlxuICogTXVzdCBiZSB1c2VkIGluIHRoZSBjb250ZXh0IG9mIGEgZmFjdG9yeSBmdW5jdGlvbiBzdWNoIGFzIG9uZSBkZWZpbmVkIGZvciBhblxuICogYEluamVjdGlvblRva2VuYC4gVGhyb3dzIGFuIGVycm9yIGlmIG5vdCBjYWxsZWQgZnJvbSBzdWNoIGEgY29udGV4dC5cbiAqXG4gKiAoQWRkaXRpb25hbCBkb2N1bWVudGF0aW9uIG1vdmVkIHRvIGBpbmplY3RgLCBhcyBpdCBpcyB0aGUgcHVibGljIEFQSSwgYW5kIGFuIGFsaWFzIGZvciB0aGlzXG4gKiBpbnN0cnVjdGlvbilcbiAqXG4gKiBAc2VlIGluamVjdFxuICogQGNvZGVHZW5BcGlcbiAqIEBwdWJsaWNBcGkgVGhpcyBpbnN0cnVjdGlvbiBoYXMgYmVlbiBlbWl0dGVkIGJ5IFZpZXdFbmdpbmUgZm9yIHNvbWUgdGltZSBhbmQgaXMgZGVwbG95ZWQgdG8gbnBtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWluamVjdDxUPih0b2tlbjogUHJvdmlkZXJUb2tlbjxUPik6IFQ7XG5leHBvcnQgZnVuY3Rpb24gybXJtWluamVjdDxUPih0b2tlbjogUHJvdmlkZXJUb2tlbjxUPiwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFR8bnVsbDtcbmV4cG9ydCBmdW5jdGlvbiDJtcm1aW5qZWN0PFQ+KHRva2VuOiBQcm92aWRlclRva2VuPFQ+LCBmbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBUfG51bGwge1xuICByZXR1cm4gKGdldEluamVjdEltcGxlbWVudGF0aW9uKCkgfHwgaW5qZWN0SW5qZWN0b3JPbmx5KShyZXNvbHZlRm9yd2FyZFJlZih0b2tlbiksIGZsYWdzKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgZmFjdG9yeSBmdW5jdGlvbiBjb3VsZCBub3QgYmUgZ2VuZXJhdGVkIGJ5IHRoZSBjb21waWxlciBmb3IgYVxuICogcGFydGljdWxhciBjbGFzcy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFsbG93cyB0aGUgYWN0dWFsIGVycm9yIG1lc3NhZ2UgdG8gYmUgb3B0aW1pemVkIGF3YXkgd2hlbiBuZ0Rldk1vZGUgaXMgdHVybmVkXG4gKiBvZmYsIHNhdmluZyBieXRlcyBvZiBnZW5lcmF0ZWQgY29kZSB3aGlsZSBzdGlsbCBwcm92aWRpbmcgYSBnb29kIGV4cGVyaWVuY2UgaW4gZGV2IG1vZGUuXG4gKlxuICogVGhlIG5hbWUgb2YgdGhlIGNsYXNzIGlzIG5vdCBtZW50aW9uZWQgaGVyZSwgYnV0IHdpbGwgYmUgaW4gdGhlIGdlbmVyYXRlZCBmYWN0b3J5IGZ1bmN0aW9uIG5hbWVcbiAqIGFuZCB0aHVzIGluIHRoZSBzdGFjayB0cmFjZS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWludmFsaWRGYWN0b3J5RGVwKGluZGV4OiBudW1iZXIpOiBuZXZlciB7XG4gIGNvbnN0IG1zZyA9IG5nRGV2TW9kZSA/XG4gICAgICBgVGhpcyBjb25zdHJ1Y3RvciBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEFuZ3VsYXIgRGVwZW5kZW5jeSBJbmplY3Rpb24gYmVjYXVzZSBpdHMgZGVwZW5kZW5jeSBhdCBpbmRleCAke1xuICAgICAgICAgIGluZGV4fSBvZiB0aGUgcGFyYW1ldGVyIGxpc3QgaXMgaW52YWxpZC5cblRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgZGVwZW5kZW5jeSB0eXBlIGlzIGEgcHJpbWl0aXZlIGxpa2UgYSBzdHJpbmcgb3IgaWYgYW4gYW5jZXN0b3Igb2YgdGhpcyBjbGFzcyBpcyBtaXNzaW5nIGFuIEFuZ3VsYXIgZGVjb3JhdG9yLlxuXG5QbGVhc2UgY2hlY2sgdGhhdCAxKSB0aGUgdHlwZSBmb3IgdGhlIHBhcmFtZXRlciBhdCBpbmRleCAke1xuICAgICAgICAgIGluZGV4fSBpcyBjb3JyZWN0IGFuZCAyKSB0aGUgY29ycmVjdCBBbmd1bGFyIGRlY29yYXRvcnMgYXJlIGRlZmluZWQgZm9yIHRoaXMgY2xhc3MgYW5kIGl0cyBhbmNlc3RvcnMuYCA6XG4gICAgICAnaW52YWxpZCc7XG4gIHRocm93IG5ldyBFcnJvcihtc2cpO1xufVxuXG4vKipcbiAqIEluamVjdHMgYSB0b2tlbiBmcm9tIHRoZSBjdXJyZW50bHkgYWN0aXZlIGluamVjdG9yLlxuICpcbiAqIE11c3QgYmUgdXNlZCBpbiB0aGUgY29udGV4dCBvZiBhIGZhY3RvcnkgZnVuY3Rpb24gc3VjaCBhcyBvbmUgZGVmaW5lZCBmb3IgYW5cbiAqIGBJbmplY3Rpb25Ub2tlbmAuIFRocm93cyBhbiBlcnJvciBpZiBub3QgY2FsbGVkIGZyb20gc3VjaCBhIGNvbnRleHQuXG4gKlxuICogV2l0aGluIHN1Y2ggYSBmYWN0b3J5IGZ1bmN0aW9uLCB1c2luZyB0aGlzIGZ1bmN0aW9uIHRvIHJlcXVlc3QgaW5qZWN0aW9uIG9mIGEgZGVwZW5kZW5jeVxuICogaXMgZmFzdGVyIGFuZCBtb3JlIHR5cGUtc2FmZSB0aGFuIHByb3ZpZGluZyBhbiBhZGRpdGlvbmFsIGFycmF5IG9mIGRlcGVuZGVuY2llc1xuICogKGFzIGhhcyBiZWVuIGNvbW1vbiB3aXRoIGB1c2VGYWN0b3J5YCBwcm92aWRlcnMpLlxuICpcbiAqIEBwYXJhbSB0b2tlbiBUaGUgaW5qZWN0aW9uIHRva2VuIGZvciB0aGUgZGVwZW5kZW5jeSB0byBiZSBpbmplY3RlZC5cbiAqIEBwYXJhbSBmbGFncyBPcHRpb25hbCBmbGFncyB0aGF0IGNvbnRyb2wgaG93IGluamVjdGlvbiBpcyBleGVjdXRlZC5cbiAqIFRoZSBmbGFncyBjb3JyZXNwb25kIHRvIGluamVjdGlvbiBzdHJhdGVnaWVzIHRoYXQgY2FuIGJlIHNwZWNpZmllZCB3aXRoXG4gKiBwYXJhbWV0ZXIgZGVjb3JhdG9ycyBgQEhvc3RgLCBgQFNlbGZgLCBgQFNraXBTZWZgLCBhbmQgYEBPcHRpb25hbGAuXG4gKiBAcmV0dXJucyB0aGUgaW5qZWN0ZWQgdmFsdWUgaWYgaW5qZWN0aW9uIGlzIHN1Y2Nlc3NmdWwsIGBudWxsYCBvdGhlcndpc2UuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2luamVjdG9yX3NwZWMudHMgcmVnaW9uPSdTaGFrYWJsZUluamVjdGlvblRva2VuJ31cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBpbmplY3QgPSDJtcm1aW5qZWN0O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXJncyh0eXBlczogKFByb3ZpZGVyVG9rZW48YW55PnxhbnlbXSlbXSk6IGFueVtdIHtcbiAgY29uc3QgYXJnczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFyZyA9IHJlc29sdmVGb3J3YXJkUmVmKHR5cGVzW2ldKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICBpZiAoYXJnLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50cyBhcnJheSBtdXN0IGhhdmUgYXJndW1lbnRzLicpO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGU6IFR5cGU8YW55Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgZmxhZ3M6IEluamVjdEZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcmcubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFyZ1tqXTtcbiAgICAgICAgY29uc3QgZmxhZyA9IGdldEluamVjdEZsYWcobWV0YSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmxhZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAvLyBTcGVjaWFsIGNhc2Ugd2hlbiB3ZSBoYW5kbGUgQEluamVjdCBkZWNvcmF0b3IuXG4gICAgICAgICAgaWYgKGZsYWcgPT09IERlY29yYXRvckZsYWdzLkluamVjdCkge1xuICAgICAgICAgICAgdHlwZSA9IG1ldGEudG9rZW47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsYWdzIHw9IGZsYWc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHR5cGUgPSBtZXRhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFyZ3MucHVzaCjJtcm1aW5qZWN0KHR5cGUhLCBmbGFncykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzLnB1c2goybXJtWluamVjdChhcmcpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFyZ3M7XG59XG5cbi8qKlxuICogQXR0YWNoZXMgYSBnaXZlbiBJbmplY3RGbGFnIHRvIGEgZ2l2ZW4gZGVjb3JhdG9yIHVzaW5nIG1vbmtleS1wYXRjaGluZy5cbiAqIFNpbmNlIERJIGRlY29yYXRvcnMgY2FuIGJlIHVzZWQgaW4gcHJvdmlkZXJzIGBkZXBzYCBhcnJheSAod2hlbiBwcm92aWRlciBpcyBjb25maWd1cmVkIHVzaW5nXG4gKiBgdXNlRmFjdG9yeWApIHdpdGhvdXQgaW5pdGlhbGl6YXRpb24gKGUuZy4gYEhvc3RgKSBhbmQgYXMgYW4gaW5zdGFuY2UgKGUuZy4gYG5ldyBIb3N0KClgKSwgd2VcbiAqIGF0dGFjaCB0aGUgZmxhZyB0byBtYWtlIGl0IGF2YWlsYWJsZSBib3RoIGFzIGEgc3RhdGljIHByb3BlcnR5IGFuZCBhcyBhIGZpZWxkIG9uIGRlY29yYXRvclxuICogaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIGRlY29yYXRvciBQcm92aWRlZCBESSBkZWNvcmF0b3IuXG4gKiBAcGFyYW0gZmxhZyBJbmplY3RGbGFnIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hJbmplY3RGbGFnKGRlY29yYXRvcjogYW55LCBmbGFnOiBJbnRlcm5hbEluamVjdEZsYWdzfERlY29yYXRvckZsYWdzKTogYW55IHtcbiAgZGVjb3JhdG9yW0RJX0RFQ09SQVRPUl9GTEFHXSA9IGZsYWc7XG4gIGRlY29yYXRvci5wcm90b3R5cGVbRElfREVDT1JBVE9SX0ZMQUddID0gZmxhZztcbiAgcmV0dXJuIGRlY29yYXRvcjtcbn1cblxuLyoqXG4gKiBSZWFkcyBtb25rZXktcGF0Y2hlZCBwcm9wZXJ0eSB0aGF0IGNvbnRhaW5zIEluamVjdEZsYWcgYXR0YWNoZWQgdG8gYSBkZWNvcmF0b3IuXG4gKlxuICogQHBhcmFtIHRva2VuIFRva2VuIHRoYXQgbWF5IGNvbnRhaW4gbW9ua2V5LXBhdGNoZWQgREkgZmxhZ3MgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RGbGFnKHRva2VuOiBhbnkpOiBudW1iZXJ8dW5kZWZpbmVkIHtcbiAgcmV0dXJuIHRva2VuW0RJX0RFQ09SQVRPUl9GTEFHXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhdGNoSW5qZWN0b3JFcnJvcihcbiAgICBlOiBhbnksIHRva2VuOiBhbnksIGluamVjdG9yRXJyb3JOYW1lOiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nfG51bGwpOiBuZXZlciB7XG4gIGNvbnN0IHRva2VuUGF0aDogYW55W10gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF07XG4gIGlmICh0b2tlbltTT1VSQ0VdKSB7XG4gICAgdG9rZW5QYXRoLnVuc2hpZnQodG9rZW5bU09VUkNFXSk7XG4gIH1cbiAgZS5tZXNzYWdlID0gZm9ybWF0RXJyb3IoJ1xcbicgKyBlLm1lc3NhZ2UsIHRva2VuUGF0aCwgaW5qZWN0b3JFcnJvck5hbWUsIHNvdXJjZSk7XG4gIGVbTkdfVE9LRU5fUEFUSF0gPSB0b2tlblBhdGg7XG4gIGVbTkdfVEVNUF9UT0tFTl9QQVRIXSA9IG51bGw7XG4gIHRocm93IGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihcbiAgICB0ZXh0OiBzdHJpbmcsIG9iajogYW55LCBpbmplY3RvckVycm9yTmFtZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZ3xudWxsID0gbnVsbCk6IHN0cmluZyB7XG4gIHRleHQgPSB0ZXh0ICYmIHRleHQuY2hhckF0KDApID09PSAnXFxuJyAmJiB0ZXh0LmNoYXJBdCgxKSA9PSBOT19ORVdfTElORSA/IHRleHQuc3Vic3RyKDIpIDogdGV4dDtcbiAgbGV0IGNvbnRleHQgPSBzdHJpbmdpZnkob2JqKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIGNvbnRleHQgPSBvYmoubWFwKHN0cmluZ2lmeSkuam9pbignIC0+ICcpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgbGV0IHBhcnRzID0gPHN0cmluZ1tdPltdO1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgcGFydHMucHVzaChcbiAgICAgICAgICAgIGtleSArICc6JyArICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogc3RyaW5naWZ5KHZhbHVlKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0ID0gYHske3BhcnRzLmpvaW4oJywgJyl9fWA7XG4gIH1cbiAgcmV0dXJuIGAke2luamVjdG9yRXJyb3JOYW1lfSR7c291cmNlID8gJygnICsgc291cmNlICsgJyknIDogJyd9WyR7Y29udGV4dH1dOiAke1xuICAgICAgdGV4dC5yZXBsYWNlKE5FV19MSU5FLCAnXFxuICAnKX1gO1xufVxuIl19