"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParsingError = void 0;
class TsParsingError extends Error {
    _statement;
    constructor(error, message, _statement) {
        super(error.message);
        this._statement = _statement;
        this.message = message;
        this.stack = error.stack;
    }
    get Statement() {
        return this._statement;
    }
    get CanPrintCode() {
        return !!this._statement.getText;
    }
}
exports.TsParsingError = TsParsingError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2luZy1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzaW5nLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsY0FBZSxTQUFRLEtBQUs7SUFDYztJQUFyRCxZQUFZLEtBQVksRUFBRSxPQUFlLEVBQVksVUFBZTtRQUNsRSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRCtCLGVBQVUsR0FBVixVQUFVLENBQUs7UUFFbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO0lBQzFCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDckIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUE7SUFDbEMsQ0FBQztDQUNGO0FBZEQsd0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVHNQYXJzaW5nRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGVycm9yOiBFcnJvciwgbWVzc2FnZTogc3RyaW5nLCBwcm90ZWN0ZWQgX3N0YXRlbWVudDogYW55KSB7XG4gICAgc3VwZXIoZXJyb3IubWVzc2FnZSlcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlXG4gICAgdGhpcy5zdGFjayA9IGVycm9yLnN0YWNrXG4gIH1cblxuICBwdWJsaWMgZ2V0IFN0YXRlbWVudCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ2FuUHJpbnRDb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3N0YXRlbWVudC5nZXRUZXh0XG4gIH1cbn1cbiJdfQ==