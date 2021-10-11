"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportReference = void 0;
const string_util_1 = require("src/util/string-util");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortHash = require('short-hash');
class ImportReference {
    constructor(partialEntity) {
        if (partialEntity)
            Object.assign(this, partialEntity, this);
    }
    get Id() {
        return `${string_util_1.stringUtil.snakeCase(this.name)}_${shortHash(this.filePath)}`;
    }
}
exports.ImportReference = ImportReference;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXJlZmVyZW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9pbXBvcnQtcmVmZXJlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNEQUFpRDtBQUVqRCw4REFBOEQ7QUFDOUQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBRXZDLE1BQWEsZUFBZTtJQUMxQixZQUFZLGFBQTJDO1FBQ3JELElBQUksYUFBYTtZQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsSUFBVyxFQUFFO1FBQ1gsT0FBTyxHQUFHLHdCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUE7SUFDekUsQ0FBQztDQUtGO0FBWkQsMENBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHJpbmdVdGlsIH0gZnJvbSAnc3JjL3V0aWwvc3RyaW5nLXV0aWwnXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG5jb25zdCBzaG9ydEhhc2ggPSByZXF1aXJlKCdzaG9ydC1oYXNoJylcblxuZXhwb3J0IGNsYXNzIEltcG9ydFJlZmVyZW5jZTxUID0gYW55PiB7XG4gIGNvbnN0cnVjdG9yKHBhcnRpYWxFbnRpdHk/OiBQYXJ0aWFsPEltcG9ydFJlZmVyZW5jZTxUPj4pIHtcbiAgICBpZiAocGFydGlhbEVudGl0eSkgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJ0aWFsRW50aXR5LCB0aGlzKVxuICB9XG5cbiAgcHVibGljIGdldCBJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtzdHJpbmdVdGlsLnNuYWtlQ2FzZSh0aGlzLm5hbWUpfV8ke3Nob3J0SGFzaCh0aGlzLmZpbGVQYXRoKX1gXG4gIH1cblxuICBwdWJsaWMgZmlsZVBhdGg6IHN0cmluZ1xuICBwdWJsaWMgbmFtZTogc3RyaW5nXG4gIHB1YmxpYyBhbGlhcz86IHN0cmluZ1xufVxuIl19