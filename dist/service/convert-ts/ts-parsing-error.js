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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2luZy1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtcGFyc2luZy1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGNBQWUsU0FBUSxLQUFLO0lBQ2M7SUFBckQsWUFBWSxLQUFZLEVBQUUsT0FBZSxFQUFZLFVBQWU7UUFDbEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUQrQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBRWxFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFBO0lBQ2xDLENBQUM7Q0FDRjtBQWRELHdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRzUGFyc2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihlcnJvcjogRXJyb3IsIG1lc3NhZ2U6IHN0cmluZywgcHJvdGVjdGVkIF9zdGF0ZW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKGVycm9yLm1lc3NhZ2UpXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFja1xuICB9XG5cbiAgcHVibGljIGdldCBTdGF0ZW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVtZW50XG4gIH1cblxuICBwdWJsaWMgZ2V0IENhblByaW50Q29kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9zdGF0ZW1lbnQuZ2V0VGV4dFxuICB9XG59XG4iXX0=