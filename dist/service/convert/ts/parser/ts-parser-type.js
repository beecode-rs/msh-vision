"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserType = void 0;
const entity_type_1 = require("src/model/entity-type");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserType {
    constructor(params) {
        const { statement, inProjectPath } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_type_1.EntityType({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
            }),
        ];
    }
}
exports.TsParserType = TsParserType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBa0Q7QUFHbEQsZ0ZBQTBFO0FBRTFFLE1BQWEsWUFBWTtJQUl2QixZQUFZLE1BQTBEO1FBQ3BFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO0lBQ3JDLENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUE7UUFDaEQsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RSxPQUFPO1lBQ0wsSUFBSSx3QkFBVSxDQUFDO2dCQUNiLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2FBQ1gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF0QkQsb0NBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktdHlwZSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlclR5cGUgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5VHlwZVtdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5VHlwZSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICB9KSxcbiAgICBdXG4gIH1cbn1cbiJdfQ==