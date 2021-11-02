"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroupFolder = void 0;
class PumlGroupFolder {
    _group;
    constructor(_group) {
        this._group = _group;
    }
    templateStart() {
        return `folder "${this._group.Name}" as ${this._group.Id} {`;
    }
    templateEnd() {
        return '}';
    }
}
exports.PumlGroupFolder = PumlGroupFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC1mb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC1wdW1sL2dyb3VwL3B1bWwtZ3JvdXAtZm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsZUFBZTtJQUNHO0lBQTdCLFlBQTZCLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDO0lBRTNDLGFBQWE7UUFDbEIsT0FBTyxXQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDOUQsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0NBQ0Y7QUFWRCwwQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1bWxHcm91cCwgUHVtbEdyb3VwU3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL2dyb3VwL3B1bWwtZ3JvdXAnXG5cbmV4cG9ydCBjbGFzcyBQdW1sR3JvdXBGb2xkZXIgaW1wbGVtZW50cyBQdW1sR3JvdXBTdHJhdGVneSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2dyb3VwOiBQdW1sR3JvdXApIHt9XG5cbiAgcHVibGljIHRlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGZvbGRlciBcIiR7dGhpcy5fZ3JvdXAuTmFtZX1cIiBhcyAke3RoaXMuX2dyb3VwLklkfSB7YFxuICB9XG5cbiAgcHVibGljIHRlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd9J1xuICB9XG59XG4iXX0=