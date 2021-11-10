/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is represented by
 * the `MyCustomComponent` constructor function.
 *
 * @publicApi
 */
export const Type = Function;
export function isType(v) {
    return typeof v === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVyZmFjZS90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUM7QUFFN0IsTUFBTSxVQUFVLE1BQU0sQ0FBQyxDQUFNO0lBQzNCLE9BQU8sT0FBTyxDQUFDLEtBQUssVUFBVSxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIGEgdHlwZSB0aGF0IGEgQ29tcG9uZW50IG9yIG90aGVyIG9iamVjdCBpcyBpbnN0YW5jZXMgb2YuXG4gKlxuICogQW4gZXhhbXBsZSBvZiBhIGBUeXBlYCBpcyBgTXlDdXN0b21Db21wb25lbnRgIGNsYXNzLCB3aGljaCBpbiBKYXZhU2NyaXB0IGlzIHJlcHJlc2VudGVkIGJ5XG4gKiB0aGUgYE15Q3VzdG9tQ29tcG9uZW50YCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBUeXBlID0gRnVuY3Rpb247XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUodjogYW55KTogdiBpcyBUeXBlPGFueT4ge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhbiBhYnN0cmFjdCBjbGFzcyBgVGAsIGlmIGFwcGxpZWQgdG8gYSBjb25jcmV0ZSBjbGFzcyBpdCB3b3VsZCBzdG9wIGJlaW5nXG4gKiBpbnN0YW50aWFibGUuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0VHlwZTxUPiBleHRlbmRzIEZ1bmN0aW9uIHtcbiAgcHJvdG90eXBlOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGU8VD4gZXh0ZW5kcyBGdW5jdGlvbiB7XG4gIG5ldyguLi5hcmdzOiBhbnlbXSk6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIE11dGFibGU8VCBleHRlbmRzIHtbeDogc3RyaW5nXTogYW55fSwgSyBleHRlbmRzIHN0cmluZz4gPSB7XG4gIFtQIGluIEtdOiBUW1BdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgd3JpdGFibGUgdHlwZSB2ZXJzaW9uIG9mIHR5cGUuXG4gKlxuICogVVNBR0U6XG4gKiBHaXZlbjpcbiAqIGBgYFxuICogaW50ZXJmYWNlIFBlcnNvbiB7cmVhZG9ubHkgbmFtZTogc3RyaW5nfVxuICogYGBgXG4gKlxuICogV2Ugd291bGQgbGlrZSB0byBnZXQgYSByZWFkL3dyaXRlIHZlcnNpb24gb2YgYFBlcnNvbmAuXG4gKiBgYGBcbiAqIGNvbnN0IFdyaXRhYmxlUGVyc29uID0gV3JpdGFibGU8UGVyc29uPjtcbiAqIGBgYFxuICpcbiAqIFRoZSByZXN1bHQgaXMgdGhhdCB5b3UgY2FuIGRvOlxuICpcbiAqIGBgYFxuICogY29uc3QgcmVhZG9ubHlQZXJzb246IFBlcnNvbiA9IHtuYW1lOiAnTWFycnknfTtcbiAqIHJlYWRvbmx5UGVyc29uLm5hbWUgPSAnSm9obic7IC8vIFR5cGVFcnJvclxuICogKHJlYWRvbmx5UGVyc29uIGFzIFdyaXRhYmxlUGVyc29uKS5uYW1lID0gJ0pvaG4nOyAvLyBPS1xuICpcbiAqIC8vIEVycm9yOiBDb3JyZWN0bHkgZGV0ZWN0cyB0aGF0IGBQZXJzb25gIGRpZCBub3QgaGF2ZSBgYWdlYCBwcm9wZXJ0eS5cbiAqIChyZWFkb25seVBlcnNvbiBhcyBXcml0YWJsZVBlcnNvbikuYWdlID0gMzA7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IHR5cGUgV3JpdGFibGU8VD4gPSB7XG4gIC1yZWFkb25seVtLIGluIGtleW9mIFRdOiBUW0tdO1xufTtcbiJdfQ==