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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2luZy1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzaW5nLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsY0FBZSxTQUFRLEtBQUs7SUFDcUI7SUFBNUQsWUFBbUIsS0FBWSxFQUFFLE9BQWUsRUFBWSxVQUFlO1FBQ3pFLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFEc0MsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUV6RSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7SUFDMUIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDeEIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNyQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQTtJQUNsQyxDQUFDO0NBQ0Y7QUFkRCx3Q0FjQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUc1BhcnNpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKGVycm9yOiBFcnJvciwgbWVzc2FnZTogc3RyaW5nLCBwcm90ZWN0ZWQgX3N0YXRlbWVudDogYW55KSB7XG4gICAgc3VwZXIoZXJyb3IubWVzc2FnZSlcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlXG4gICAgdGhpcy5zdGFjayA9IGVycm9yLnN0YWNrXG4gIH1cblxuICBwdWJsaWMgZ2V0IFN0YXRlbWVudCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ2FuUHJpbnRDb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3N0YXRlbWVudC5nZXRUZXh0XG4gIH1cbn1cbiJdfQ==