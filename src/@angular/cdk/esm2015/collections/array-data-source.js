/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isObservable, of as observableOf } from 'rxjs';
import { DataSource } from './data-source';
/** DataSource wrapper for a native array. */
export class ArrayDataSource extends DataSource {
    constructor(_data) {
        super();
        this._data = _data;
    }
    connect() {
        return isObservable(this._data) ? this._data : observableOf(this._data);
    }
    disconnect() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL2NvbGxlY3Rpb25zL2FycmF5LWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBYSxZQUFZLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLDZDQUE2QztBQUM3QyxNQUFNLE9BQU8sZUFBbUIsU0FBUSxVQUFhO0lBQ25ELFlBQW9CLEtBQThDO1FBQ2hFLEtBQUssRUFBRSxDQUFDO1FBRFUsVUFBSyxHQUFMLEtBQUssQ0FBeUM7SUFFbEUsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFVBQVUsS0FBSSxDQUFDO0NBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEYXRhU291cmNlfSBmcm9tICcuL2RhdGEtc291cmNlJztcblxuXG4vKiogRGF0YVNvdXJjZSB3cmFwcGVyIGZvciBhIG5hdGl2ZSBhcnJheS4gKi9cbmV4cG9ydCBjbGFzcyBBcnJheURhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YTogcmVhZG9ubHkgVFtdIHwgT2JzZXJ2YWJsZTxyZWFkb25seSBUW10+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNvbm5lY3QoKTogT2JzZXJ2YWJsZTxyZWFkb25seSBUW10+IHtcbiAgICByZXR1cm4gaXNPYnNlcnZhYmxlKHRoaXMuX2RhdGEpID8gdGhpcy5fZGF0YSA6IG9ic2VydmFibGVPZih0aGlzLl9kYXRhKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7fVxufVxuIl19