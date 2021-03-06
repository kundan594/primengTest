/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Base URL for the error details page.
// Keep this value in sync with a similar const in
// `packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.ts`.
const ERROR_DETAILS_PAGE_BASE_URL = 'https://angular.io/errors';
export class RuntimeError extends Error {
    constructor(code, message) {
        super(formatRuntimeError(code, message));
        this.code = code;
    }
}
// Contains a set of error messages that have details guides at angular.io.
// Full list of available error guides can be found at https://angular.io/errors
/* tslint:disable:no-toplevel-property-access */
export const RUNTIME_ERRORS_WITH_GUIDES = new Set([
    "100" /* EXPRESSION_CHANGED_AFTER_CHECKED */,
    "200" /* CYCLIC_DI_DEPENDENCY */,
    "201" /* PROVIDER_NOT_FOUND */,
    "300" /* MULTIPLE_COMPONENTS_MATCH */,
    "301" /* EXPORT_NOT_FOUND */,
    "302" /* PIPE_NOT_FOUND */,
]);
/* tslint:enable:no-toplevel-property-access */
/** Called to format a runtime error */
export function formatRuntimeError(code, message) {
    const fullCode = code ? `NG0${code}: ` : '';
    let errorMessage = `${fullCode}${message}`;
    // Some runtime errors are still thrown without `ngDevMode` (for example
    // `throwProviderNotFoundError`), so we add `ngDevMode` check here to avoid pulling
    // `RUNTIME_ERRORS_WITH_GUIDES` symbol into prod bundles.
    // TODO: revisit all instances where `RuntimeError` is thrown and see if `ngDevMode` can be added
    // there instead to tree-shake more devmode-only code (and eventually remove `ngDevMode` check
    // from this code).
    if (ngDevMode && RUNTIME_ERRORS_WITH_GUIDES.has(code)) {
        errorMessage = `${errorMessage}. Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/NG0${code}`;
    }
    return errorMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvZXJyb3JfY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCx1Q0FBdUM7QUFDdkMsa0RBQWtEO0FBQ2xELG1FQUFtRTtBQUNuRSxNQUFNLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDO0FBNkJoRSxNQUFNLE9BQU8sWUFBYSxTQUFRLEtBQUs7SUFDckMsWUFBbUIsSUFBc0IsRUFBRSxPQUFlO1FBQ3hELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUR4QixTQUFJLEdBQUosSUFBSSxDQUFrQjtJQUV6QyxDQUFDO0NBQ0Y7QUFFRCwyRUFBMkU7QUFDM0UsZ0ZBQWdGO0FBQ2hGLGdEQUFnRDtBQUNoRCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLEdBQUcsQ0FBQzs7Ozs7OztDQU9qRCxDQUFDLENBQUM7QUFDSCwrQ0FBK0M7QUFFL0MsdUNBQXVDO0FBQ3ZDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxJQUFzQixFQUFFLE9BQWU7SUFDeEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFNUMsSUFBSSxZQUFZLEdBQUcsR0FBRyxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFFM0Msd0VBQXdFO0lBQ3hFLG1GQUFtRjtJQUNuRix5REFBeUQ7SUFDekQsaUdBQWlHO0lBQ2pHLDhGQUE4RjtJQUM5RixtQkFBbUI7SUFDbkIsSUFBSSxTQUFTLElBQUksMEJBQTBCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JELFlBQVksR0FBRyxHQUFHLFlBQVksa0JBQWtCLDJCQUEyQixPQUFPLElBQUksRUFBRSxDQUFDO0tBQzFGO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBCYXNlIFVSTCBmb3IgdGhlIGVycm9yIGRldGFpbHMgcGFnZS5cbi8vIEtlZXAgdGhpcyB2YWx1ZSBpbiBzeW5jIHdpdGggYSBzaW1pbGFyIGNvbnN0IGluXG4vLyBgcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9kaWFnbm9zdGljcy9zcmMvZXJyb3JfY29kZS50c2AuXG5jb25zdCBFUlJPUl9ERVRBSUxTX1BBR0VfQkFTRV9VUkwgPSAnaHR0cHM6Ly9hbmd1bGFyLmlvL2Vycm9ycyc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIFJ1bnRpbWVFcnJvckNvZGUge1xuICAvLyBJbnRlcm5hbCBFcnJvcnNcblxuICAvLyBDaGFuZ2UgRGV0ZWN0aW9uIEVycm9yc1xuICBFWFBSRVNTSU9OX0NIQU5HRURfQUZURVJfQ0hFQ0tFRCA9ICcxMDAnLFxuXG4gIC8vIERlcGVuZGVuY3kgSW5qZWN0aW9uIEVycm9yc1xuICBDWUNMSUNfRElfREVQRU5ERU5DWSA9ICcyMDAnLFxuICBQUk9WSURFUl9OT1RfRk9VTkQgPSAnMjAxJyxcblxuICAvLyBUZW1wbGF0ZSBFcnJvcnNcbiAgTVVMVElQTEVfQ09NUE9ORU5UU19NQVRDSCA9ICczMDAnLFxuICBFWFBPUlRfTk9UX0ZPVU5EID0gJzMwMScsXG4gIFBJUEVfTk9UX0ZPVU5EID0gJzMwMicsXG4gIFVOS05PV05fQklORElORyA9ICczMDMnLFxuICBVTktOT1dOX0VMRU1FTlQgPSAnMzA0JyxcbiAgVEVNUExBVEVfU1RSVUNUVVJFX0VSUk9SID0gJzMwNSdcblxuICAvLyBTdHlsaW5nIEVycm9yc1xuXG4gIC8vIERlY2xhcmF0aW9ucyBFcnJvcnNcblxuICAvLyBpMThuIEVycm9yc1xuXG4gIC8vIENvbXBpbGF0aW9uIEVycm9yc1xufVxuXG5leHBvcnQgY2xhc3MgUnVudGltZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29kZTogUnVudGltZUVycm9yQ29kZSwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoZm9ybWF0UnVudGltZUVycm9yKGNvZGUsIG1lc3NhZ2UpKTtcbiAgfVxufVxuXG4vLyBDb250YWlucyBhIHNldCBvZiBlcnJvciBtZXNzYWdlcyB0aGF0IGhhdmUgZGV0YWlscyBndWlkZXMgYXQgYW5ndWxhci5pby5cbi8vIEZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgZXJyb3IgZ3VpZGVzIGNhbiBiZSBmb3VuZCBhdCBodHRwczovL2FuZ3VsYXIuaW8vZXJyb3JzXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby10b3BsZXZlbC1wcm9wZXJ0eS1hY2Nlc3MgKi9cbmV4cG9ydCBjb25zdCBSVU5USU1FX0VSUk9SU19XSVRIX0dVSURFUyA9IG5ldyBTZXQoW1xuICBSdW50aW1lRXJyb3JDb2RlLkVYUFJFU1NJT05fQ0hBTkdFRF9BRlRFUl9DSEVDS0VELFxuICBSdW50aW1lRXJyb3JDb2RlLkNZQ0xJQ19ESV9ERVBFTkRFTkNZLFxuICBSdW50aW1lRXJyb3JDb2RlLlBST1ZJREVSX05PVF9GT1VORCxcbiAgUnVudGltZUVycm9yQ29kZS5NVUxUSVBMRV9DT01QT05FTlRTX01BVENILFxuICBSdW50aW1lRXJyb3JDb2RlLkVYUE9SVF9OT1RfRk9VTkQsXG4gIFJ1bnRpbWVFcnJvckNvZGUuUElQRV9OT1RfRk9VTkQsXG5dKTtcbi8qIHRzbGludDplbmFibGU6bm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzICovXG5cbi8qKiBDYWxsZWQgdG8gZm9ybWF0IGEgcnVudGltZSBlcnJvciAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFJ1bnRpbWVFcnJvcihjb2RlOiBSdW50aW1lRXJyb3JDb2RlLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmdWxsQ29kZSA9IGNvZGUgPyBgTkcwJHtjb2RlfTogYCA6ICcnO1xuXG4gIGxldCBlcnJvck1lc3NhZ2UgPSBgJHtmdWxsQ29kZX0ke21lc3NhZ2V9YDtcblxuICAvLyBTb21lIHJ1bnRpbWUgZXJyb3JzIGFyZSBzdGlsbCB0aHJvd24gd2l0aG91dCBgbmdEZXZNb2RlYCAoZm9yIGV4YW1wbGVcbiAgLy8gYHRocm93UHJvdmlkZXJOb3RGb3VuZEVycm9yYCksIHNvIHdlIGFkZCBgbmdEZXZNb2RlYCBjaGVjayBoZXJlIHRvIGF2b2lkIHB1bGxpbmdcbiAgLy8gYFJVTlRJTUVfRVJST1JTX1dJVEhfR1VJREVTYCBzeW1ib2wgaW50byBwcm9kIGJ1bmRsZXMuXG4gIC8vIFRPRE86IHJldmlzaXQgYWxsIGluc3RhbmNlcyB3aGVyZSBgUnVudGltZUVycm9yYCBpcyB0aHJvd24gYW5kIHNlZSBpZiBgbmdEZXZNb2RlYCBjYW4gYmUgYWRkZWRcbiAgLy8gdGhlcmUgaW5zdGVhZCB0byB0cmVlLXNoYWtlIG1vcmUgZGV2bW9kZS1vbmx5IGNvZGUgKGFuZCBldmVudHVhbGx5IHJlbW92ZSBgbmdEZXZNb2RlYCBjaGVja1xuICAvLyBmcm9tIHRoaXMgY29kZSkuXG4gIGlmIChuZ0Rldk1vZGUgJiYgUlVOVElNRV9FUlJPUlNfV0lUSF9HVUlERVMuaGFzKGNvZGUpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gYCR7ZXJyb3JNZXNzYWdlfS4gRmluZCBtb3JlIGF0ICR7RVJST1JfREVUQUlMU19QQUdFX0JBU0VfVVJMfS9ORzAke2NvZGV9YDtcbiAgfVxuICByZXR1cm4gZXJyb3JNZXNzYWdlO1xufVxuIl19