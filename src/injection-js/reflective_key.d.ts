/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 * @experimental
 */
export declare class ReflectiveKey {
    token: Object;
    id: number;
    /**
     * Private
     */
    constructor(token: Object, id: number);
    /**
     * Returns a stringified token.
     */
    get displayName(): string;
    /**
     * Retrieves a `Key` for a token.
     */
    static get(token: Object): ReflectiveKey;
    /**
     * @returns the number of keys registered in the system.
     */
    static get numberOfKeys(): number;
}
