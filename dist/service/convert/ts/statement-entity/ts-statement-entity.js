"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsStatementEntity = exports.TsStatementEntityType = void 0;
var TsStatementEntityType;
(function (TsStatementEntityType) {
    TsStatementEntityType["IMPORT"] = "import";
    TsStatementEntityType["OBJECT"] = "object";
    TsStatementEntityType["CLASS"] = "class";
    TsStatementEntityType["ENUM"] = "enum";
    TsStatementEntityType["TYPE"] = "type";
})(TsStatementEntityType = exports.TsStatementEntityType || (exports.TsStatementEntityType = {}));
class TsStatementEntity {
    constructor(partialEntity) {
        this.isExported = false;
        if (partialEntity)
            Object.assign(this, partialEntity, this);
    }
}
exports.TsStatementEntity = TsStatementEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc3RhdGVtZW50LWVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS90cy1zdGF0ZW1lbnQtZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLElBQVkscUJBTVg7QUFORCxXQUFZLHFCQUFxQjtJQUMvQiwwQ0FBaUIsQ0FBQTtJQUNqQiwwQ0FBaUIsQ0FBQTtJQUNqQix3Q0FBZSxDQUFBO0lBQ2Ysc0NBQWEsQ0FBQTtJQUNiLHNDQUFhLENBQUE7QUFDZixDQUFDLEVBTlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFNaEM7QUFFRCxNQUFhLGlCQUFpQjtJQUM1QixZQUFZLGFBQXlDO1FBSzlDLGVBQVUsR0FBRyxLQUFLLENBQUE7UUFKdkIsSUFBSSxhQUFhO1lBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzdELENBQUM7Q0FNRjtBQVRELDhDQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5cbmV4cG9ydCBlbnVtIFRzU3RhdGVtZW50RW50aXR5VHlwZSB7XG4gIElNUE9SVCA9ICdpbXBvcnQnLFxuICBPQkpFQ1QgPSAnb2JqZWN0JyxcbiAgQ0xBU1MgPSAnY2xhc3MnLFxuICBFTlVNID0gJ2VudW0nLFxuICBUWVBFID0gJ3R5cGUnLFxufVxuXG5leHBvcnQgY2xhc3MgVHNTdGF0ZW1lbnRFbnRpdHkge1xuICBjb25zdHJ1Y3RvcihwYXJ0aWFsRW50aXR5OiBQYXJ0aWFsPFRzU3RhdGVtZW50RW50aXR5Pikge1xuICAgIGlmIChwYXJ0aWFsRW50aXR5KSBPYmplY3QuYXNzaWduKHRoaXMsIHBhcnRpYWxFbnRpdHksIHRoaXMpXG4gIH1cbiAgcHVibGljIGVudGl0eVR5cGU6IFRzU3RhdGVtZW50RW50aXR5VHlwZVxuICBwdWJsaWMgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHVibGljIGlzRXhwb3J0ZWQgPSBmYWxzZVxuICBwdWJsaWMgbmFtZTogc3RyaW5nXG4gIHB1YmxpYyBwcm9wZXJ0aWVzOiBzdHJpbmdbXVxufVxuIl19