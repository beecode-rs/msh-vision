"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroupRectangle = void 0;
class PumlGroupRectangle {
    _group;
    constructor(_group) {
        this._group = _group;
    }
    templateStart() {
        return `rectangle "${this._group.Name}" as ${this._group.Id} {`;
    }
    templateEnd() {
        return '}';
    }
}
exports.PumlGroupRectangle = PumlGroupRectangle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC1yZWN0YW5nbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC1wdW1sL2dyb3VwL3B1bWwtZ3JvdXAtcmVjdGFuZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsa0JBQWtCO0lBQ0E7SUFBN0IsWUFBNkIsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUFHLENBQUM7SUFFM0MsYUFBYTtRQUNsQixPQUFPLGNBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNqRSxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7Q0FDRjtBQVZELGdEQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbEdyb3VwLCBQdW1sR3JvdXBTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cCdcblxuZXhwb3J0IGNsYXNzIFB1bWxHcm91cFJlY3RhbmdsZSBpbXBsZW1lbnRzIFB1bWxHcm91cFN0cmF0ZWd5IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfZ3JvdXA6IFB1bWxHcm91cCkge31cblxuICBwdWJsaWMgdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgcmVjdGFuZ2xlIFwiJHt0aGlzLl9ncm91cC5OYW1lfVwiIGFzICR7dGhpcy5fZ3JvdXAuSWR9IHtgXG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cbn1cbiJdfQ==