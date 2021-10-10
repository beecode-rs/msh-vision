"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlGroupService = void 0;
exports.pumlGroupService = {
    printGroups: (groups) => {
        return Object.values(groups)
            .map((pg) => pg.print())
            .join('\n');
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9ncm91cC9wdW1sLWdyb3VwLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxnQkFBZ0IsR0FBRztJQUM5QixXQUFXLEVBQUUsQ0FBQyxNQUFrQyxFQUFVLEVBQUU7UUFDMUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN6QixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDZixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvZ3JvdXAvcHVtbC1ncm91cCdcblxuZXhwb3J0IGNvbnN0IHB1bWxHcm91cFNlcnZpY2UgPSB7XG4gIHByaW50R3JvdXBzOiAoZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBQdW1sR3JvdXAgfSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoZ3JvdXBzKVxuICAgICAgLm1hcCgocGcpID0+IHBnLnByaW50KCkpXG4gICAgICAuam9pbignXFxuJylcbiAgfSxcbn1cbiJdfQ==