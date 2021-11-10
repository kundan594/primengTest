"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileSystemCompilerHost = exports.FileSystemHost = void 0;
const ts = require("typescript");
/**
 * Implementation of a TypeScript parse config host that relies fully on
 * a given virtual file system.
 */
class FileSystemHost {
    constructor(_fileSystem) {
        this._fileSystem = _fileSystem;
        this.useCaseSensitiveFileNames = ts.sys.useCaseSensitiveFileNames;
    }
    fileExists(path) {
        return this._fileSystem.fileExists(this._fileSystem.resolve(path));
    }
    readFile(path) {
        const content = this._fileSystem.read(this._fileSystem.resolve(path));
        if (content === null) {
            return undefined;
        }
        // Strip BOM as otherwise TSC methods (e.g. "getWidth") will return an offset which
        // which breaks the CLI UpdateRecorder. https://github.com/angular/angular/pull/30719
        return content.replace(/^\uFEFF/, '');
    }
    readDirectory(rootDir, extensions, excludes, includes, depth) {
        if (ts.matchFiles === undefined) {
            throw Error('Unable to read directory in virtual file system host. This means that ' +
                'TypeScript changed its file matching internals.\n\nPlease consider downgrading your ' +
                'TypeScript version, and report an issue in the Angular Components repository.');
        }
        return ts.matchFiles(rootDir, extensions, extensions, includes, this.useCaseSensitiveFileNames, '/', depth, p => this._getFileSystemEntries(p), p => this._fileSystem.resolve(p));
    }
    _getFileSystemEntries(path) {
        return this._fileSystem.readDirectory(this._fileSystem.resolve(path));
    }
}
exports.FileSystemHost = FileSystemHost;
/**
 * Creates a TypeScript compiler host that fully relies fully on the given
 * virtual file system. i.e. no interactions with the working directory.
 */
function createFileSystemCompilerHost(options, fileSystem) {
    const host = ts.createCompilerHost(options, true);
    const virtualHost = new FileSystemHost(fileSystem);
    host.readFile = virtualHost.readFile.bind(virtualHost);
    host.readDirectory = virtualHost.readDirectory.bind(virtualHost);
    host.fileExists = virtualHost.fileExists.bind(virtualHost);
    host.directoryExists = (dirPath) => fileSystem.directoryExists(fileSystem.resolve(dirPath));
    host.getCurrentDirectory = () => '/';
    host.getCanonicalFileName = p => fileSystem.resolve(p);
    return host;
}
exports.createFileSystemCompilerHost = createFileSystemCompilerHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay9zY2hlbWF0aWNzL3VwZGF0ZS10b29sL3V0aWxzL3ZpcnR1YWwtaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCxpQ0FBaUM7QUF3QmpDOzs7R0FHRztBQUNILE1BQWEsY0FBYztJQUd6QixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUYzQyw4QkFBeUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBRWYsQ0FBQztJQUUvQyxVQUFVLENBQUMsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFZO1FBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3BCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsbUZBQW1GO1FBQ25GLHFGQUFxRjtRQUNyRixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhLENBQ1QsT0FBZSxFQUFFLFVBQW9CLEVBQUUsUUFBNEIsRUFBRSxRQUFrQixFQUN2RixLQUFjO1FBQ2hCLElBQUksRUFBRSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDL0IsTUFBTSxLQUFLLENBQ1Asd0VBQXdFO2dCQUN4RSxzRkFBc0Y7Z0JBQ3RGLCtFQUErRSxDQUFDLENBQUM7U0FDdEY7UUFDRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQ2hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFDckYsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxJQUFZO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0Y7QUFwQ0Qsd0NBb0NDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsNEJBQTRCLENBQ3hDLE9BQTJCLEVBQUUsVUFBc0I7SUFDckQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVuRCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM1RixJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBYkQsb0VBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge0ZpbGVTeXN0ZW19IGZyb20gJy4uL2ZpbGUtc3lzdGVtJztcblxuLy8gV2UgdXNlIFR5cGVTY3JpcHQncyBuYXRpdmUgYHRzLm1hdGNoRmlsZXNgIHV0aWxpdHkgZm9yIHRoZSB2aXJ0dWFsIGZpbGUgc3lzdGVtXG4vLyBob3N0cywgYXMgdGhhdCBmdW5jdGlvbiBpbXBsZW1lbnRzIGNvbXBsZXggbG9naWMgZm9yIG1hdGNoaW5nIGZpbGVzIHdpdGggcmVzcGVjdFxuLy8gdG8gcm9vdCBkaXJlY3RvcnksIGV4dGVuc2lvbnMsIGV4Y2x1ZGVzLCBpbmNsdWRlcyBldGMuIFRoZSBmdW5jdGlvbiBpcyBjdXJyZW50bHlcbi8vIGludGVybmFsIGJ1dCB3ZSBjYW4gdXNlIGl0IGFzIHRoZSBBUEkgbW9zdCBsaWtlbHkgd2lsbCBub3QgY2hhbmdlIGFueSB0aW1lIHNvb24sXG4vLyBub3IgZG9lcyBpdCBzZWVtIGxpa2UgdGhpcyBpcyBiZWluZyBtYWRlIHB1YmxpYyBhbnkgdGltZSBzb29uLlxuLy8gUmVsYXRlZCBpc3N1ZSBmb3IgdHJhY2tpbmc6IGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM3OTMuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvYmxvYi9iMzk3ZDFmZDRhYmQwZWRlZjg1YWRmMGFmZDkxYzAzMGJiMGI0OTU1L3NyYy9jb21waWxlci91dGlsaXRpZXMudHMjTDYxOTJcbmRlY2xhcmUgbW9kdWxlICd0eXBlc2NyaXB0JyB7XG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlsZVN5c3RlbUVudHJpZXMge1xuICAgIHJlYWRvbmx5IGZpbGVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgICByZWFkb25seSBkaXJlY3RvcmllczogcmVhZG9ubHkgc3RyaW5nW107XG4gIH1cblxuICBleHBvcnQgY29uc3QgbWF0Y2hGaWxlczogdW5kZWZpbmVkfFxuICAgICAgKChwYXRoOiBzdHJpbmcsIGV4dGVuc2lvbnM6IHJlYWRvbmx5IHN0cmluZ1tdfHVuZGVmaW5lZCxcbiAgICAgICAgZXhjbHVkZXM6IHJlYWRvbmx5IHN0cmluZ1tdfHVuZGVmaW5lZCwgaW5jbHVkZXM6IHJlYWRvbmx5IHN0cmluZ1tdfHVuZGVmaW5lZCxcbiAgICAgICAgdXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lczogYm9vbGVhbiwgY3VycmVudERpcmVjdG9yeTogc3RyaW5nLCBkZXB0aDogbnVtYmVyfHVuZGVmaW5lZCxcbiAgICAgICAgZ2V0RmlsZVN5c3RlbUVudHJpZXM6IChwYXRoOiBzdHJpbmcpID0+IEZpbGVTeXN0ZW1FbnRyaWVzLFxuICAgICAgICByZWFscGF0aDogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nKSA9PiBzdHJpbmdbXSk7XG59XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgYSBUeXBlU2NyaXB0IHBhcnNlIGNvbmZpZyBob3N0IHRoYXQgcmVsaWVzIGZ1bGx5IG9uXG4gKiBhIGdpdmVuIHZpcnR1YWwgZmlsZSBzeXN0ZW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlU3lzdGVtSG9zdCBpbXBsZW1lbnRzIHRzLlBhcnNlQ29uZmlnSG9zdCB7XG4gIHVzZUNhc2VTZW5zaXRpdmVGaWxlTmFtZXMgPSB0cy5zeXMudXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9maWxlU3lzdGVtOiBGaWxlU3lzdGVtKSB7fVxuXG4gIGZpbGVFeGlzdHMocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVTeXN0ZW0uZmlsZUV4aXN0cyh0aGlzLl9maWxlU3lzdGVtLnJlc29sdmUocGF0aCkpO1xuICB9XG5cbiAgcmVhZEZpbGUocGF0aDogc3RyaW5nKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuX2ZpbGVTeXN0ZW0ucmVhZCh0aGlzLl9maWxlU3lzdGVtLnJlc29sdmUocGF0aCkpO1xuICAgIGlmIChjb250ZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBTdHJpcCBCT00gYXMgb3RoZXJ3aXNlIFRTQyBtZXRob2RzIChlLmcuIFwiZ2V0V2lkdGhcIikgd2lsbCByZXR1cm4gYW4gb2Zmc2V0IHdoaWNoXG4gICAgLy8gd2hpY2ggYnJlYWtzIHRoZSBDTEkgVXBkYXRlUmVjb3JkZXIuIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvcHVsbC8zMDcxOVxuICAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoL15cXHVGRUZGLywgJycpO1xuICB9XG5cbiAgcmVhZERpcmVjdG9yeShcbiAgICAgIHJvb3REaXI6IHN0cmluZywgZXh0ZW5zaW9uczogc3RyaW5nW10sIGV4Y2x1ZGVzOiBzdHJpbmdbXXx1bmRlZmluZWQsIGluY2x1ZGVzOiBzdHJpbmdbXSxcbiAgICAgIGRlcHRoPzogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIGlmICh0cy5tYXRjaEZpbGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICdVbmFibGUgdG8gcmVhZCBkaXJlY3RvcnkgaW4gdmlydHVhbCBmaWxlIHN5c3RlbSBob3N0LiBUaGlzIG1lYW5zIHRoYXQgJyArXG4gICAgICAgICAgJ1R5cGVTY3JpcHQgY2hhbmdlZCBpdHMgZmlsZSBtYXRjaGluZyBpbnRlcm5hbHMuXFxuXFxuUGxlYXNlIGNvbnNpZGVyIGRvd25ncmFkaW5nIHlvdXIgJyArXG4gICAgICAgICAgJ1R5cGVTY3JpcHQgdmVyc2lvbiwgYW5kIHJlcG9ydCBhbiBpc3N1ZSBpbiB0aGUgQW5ndWxhciBDb21wb25lbnRzIHJlcG9zaXRvcnkuJyk7XG4gICAgfVxuICAgIHJldHVybiB0cy5tYXRjaEZpbGVzKFxuICAgICAgICByb290RGlyLCBleHRlbnNpb25zLCBleHRlbnNpb25zLCBpbmNsdWRlcywgdGhpcy51c2VDYXNlU2Vuc2l0aXZlRmlsZU5hbWVzLCAnLycsIGRlcHRoLFxuICAgICAgICBwID0+IHRoaXMuX2dldEZpbGVTeXN0ZW1FbnRyaWVzKHApLCBwID0+IHRoaXMuX2ZpbGVTeXN0ZW0ucmVzb2x2ZShwKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGaWxlU3lzdGVtRW50cmllcyhwYXRoOiBzdHJpbmcpOiB0cy5GaWxlU3lzdGVtRW50cmllcyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVTeXN0ZW0ucmVhZERpcmVjdG9yeSh0aGlzLl9maWxlU3lzdGVtLnJlc29sdmUocGF0aCkpO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFR5cGVTY3JpcHQgY29tcGlsZXIgaG9zdCB0aGF0IGZ1bGx5IHJlbGllcyBmdWxseSBvbiB0aGUgZ2l2ZW5cbiAqIHZpcnR1YWwgZmlsZSBzeXN0ZW0uIGkuZS4gbm8gaW50ZXJhY3Rpb25zIHdpdGggdGhlIHdvcmtpbmcgZGlyZWN0b3J5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsZVN5c3RlbUNvbXBpbGVySG9zdChcbiAgICBvcHRpb25zOiB0cy5Db21waWxlck9wdGlvbnMsIGZpbGVTeXN0ZW06IEZpbGVTeXN0ZW0pOiB0cy5Db21waWxlckhvc3Qge1xuICBjb25zdCBob3N0ID0gdHMuY3JlYXRlQ29tcGlsZXJIb3N0KG9wdGlvbnMsIHRydWUpO1xuICBjb25zdCB2aXJ0dWFsSG9zdCA9IG5ldyBGaWxlU3lzdGVtSG9zdChmaWxlU3lzdGVtKTtcblxuICBob3N0LnJlYWRGaWxlID0gdmlydHVhbEhvc3QucmVhZEZpbGUuYmluZCh2aXJ0dWFsSG9zdCk7XG4gIGhvc3QucmVhZERpcmVjdG9yeSA9IHZpcnR1YWxIb3N0LnJlYWREaXJlY3RvcnkuYmluZCh2aXJ0dWFsSG9zdCk7XG4gIGhvc3QuZmlsZUV4aXN0cyA9IHZpcnR1YWxIb3N0LmZpbGVFeGlzdHMuYmluZCh2aXJ0dWFsSG9zdCk7XG4gIGhvc3QuZGlyZWN0b3J5RXhpc3RzID0gKGRpclBhdGgpID0+IGZpbGVTeXN0ZW0uZGlyZWN0b3J5RXhpc3RzKGZpbGVTeXN0ZW0ucmVzb2x2ZShkaXJQYXRoKSk7XG4gIGhvc3QuZ2V0Q3VycmVudERpcmVjdG9yeSA9ICgpID0+ICcvJztcbiAgaG9zdC5nZXRDYW5vbmljYWxGaWxlTmFtZSA9IHAgPT4gZmlsZVN5c3RlbS5yZXNvbHZlKHApO1xuXG4gIHJldHVybiBob3N0O1xufVxuIl19