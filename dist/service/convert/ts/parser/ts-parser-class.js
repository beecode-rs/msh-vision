"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const entity_class_1 = require("src/model/entity-class");
const property_1 = require("src/model/property");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
const constant_1 = require("src/util/constant");
class TsParserClass {
    constructor(params) {
        const { parsedSource, statement, inProjectPath } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const isAbstract = ts_parser_service_1.tsParserService.isAbstract(this._statement.modifiers);
        const references = ts_parser_service_1.tsParserService.findClassRelations({
            statement: this._statement,
            parsedSource: this._parsedSource,
            inProjectPath: this._inProjectPath,
        });
        const properties = this._findProperties();
        const entityClass = new entity_class_1.EntityClass({
            name,
            inProjectPath: this._inProjectPath,
            isExported,
            isAbstract,
            references,
            properties,
        });
        return [entityClass];
    }
    _findProperties() {
        return this._statement['members'].map((member) => {
            const name = member.kind === ts_1.default.SyntaxKind.Constructor ? 'constructor' : member.name.escapedText;
            const returnType = member.kind === ts_1.default.SyntaxKind.Constructor ? '' : this._returnTypeValue(member);
            const accessLevel = ts_parser_service_1.tsParserService.accessLevel(member.modifiers);
            const isAbstract = ts_parser_service_1.tsParserService.isAbstract(member.modifiers);
            const functionParams = this._propertiesToString(member.parameters);
            return new property_1.Property({
                name,
                isAbstract,
                accessLevel,
                returnType,
                functionParams,
            });
        });
    }
    _returnTypeValue(member) {
        if (member.type)
            return member.type.getText(this._parsedSource);
        if (member.initializer?.text)
            return ` = ${member.initializer.text}`;
        return '';
    }
    _propertiesToString(parameters) {
        if ((parameters ?? []).length === 0)
            return '';
        return (parameters ?? [])
            .map((p) => p.getText(this._parsedSource))
            .join(', ')
            .split(constant_1.constant.newRow)
            .join('');
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCxpREFBNkM7QUFDN0MsdURBQThCO0FBRTlCLGdGQUEwRTtBQUMxRSxnREFBNEM7QUFFNUMsTUFBYSxhQUFhO0lBS3hCLFlBQVksTUFBdUY7UUFDakcsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO0lBQ25DLENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUE7UUFDaEQsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN4RSxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsa0JBQWtCLENBQUM7WUFDcEQsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzFCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNoQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDbkMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBRXpDLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQztZQUNsQyxJQUFJO1lBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ2xDLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7U0FDWCxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDdEIsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDaEcsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFakcsTUFBTSxXQUFXLEdBQUcsbUNBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMvRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2xFLE9BQU8sSUFBSSxtQkFBUSxDQUFDO2dCQUNsQixJQUFJO2dCQUNKLFVBQVU7Z0JBQ1YsV0FBVztnQkFDWCxVQUFVO2dCQUNWLGNBQWM7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxNQUFXO1FBQ3BDLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUMvRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSTtZQUFFLE9BQU8sTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3BFLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVTLG1CQUFtQixDQUFDLFVBQWtCO1FBQzlDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQzthQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixLQUFLLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUM7YUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBcEVELHNDQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eUNsYXNzIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1jbGFzcydcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckNsYXNzIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZTsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9ID0gcGFyYW1zXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHlDbGFzc1tdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcbiAgICBjb25zdCBpc0Fic3RyYWN0ID0gdHNQYXJzZXJTZXJ2aWNlLmlzQWJzdHJhY3QodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIGNvbnN0IHJlZmVyZW5jZXMgPSB0c1BhcnNlclNlcnZpY2UuZmluZENsYXNzUmVsYXRpb25zKHtcbiAgICAgIHN0YXRlbWVudDogdGhpcy5fc3RhdGVtZW50LFxuICAgICAgcGFyc2VkU291cmNlOiB0aGlzLl9wYXJzZWRTb3VyY2UsXG4gICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgIH0pXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2ZpbmRQcm9wZXJ0aWVzKClcblxuICAgIGNvbnN0IGVudGl0eUNsYXNzID0gbmV3IEVudGl0eUNsYXNzKHtcbiAgICAgIG5hbWUsXG4gICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgaXNFeHBvcnRlZCxcbiAgICAgIGlzQWJzdHJhY3QsXG4gICAgICByZWZlcmVuY2VzLFxuICAgICAgcHJvcGVydGllcyxcbiAgICB9KVxuXG4gICAgcmV0dXJuIFtlbnRpdHlDbGFzc11cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZFByb3BlcnRpZXMoKTogUHJvcGVydHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlbWVudFsnbWVtYmVycyddLm1hcCgobWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3IgPyAnY29uc3RydWN0b3InIDogbWVtYmVyLm5hbWUuZXNjYXBlZFRleHRcbiAgICAgIGNvbnN0IHJldHVyblR5cGUgPSBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvciA/ICcnIDogdGhpcy5fcmV0dXJuVHlwZVZhbHVlKG1lbWJlcilcblxuICAgICAgY29uc3QgYWNjZXNzTGV2ZWwgPSB0c1BhcnNlclNlcnZpY2UuYWNjZXNzTGV2ZWwobWVtYmVyLm1vZGlmaWVycylcbiAgICAgIGNvbnN0IGlzQWJzdHJhY3QgPSB0c1BhcnNlclNlcnZpY2UuaXNBYnN0cmFjdChtZW1iZXIubW9kaWZpZXJzKVxuICAgICAgY29uc3QgZnVuY3Rpb25QYXJhbXMgPSB0aGlzLl9wcm9wZXJ0aWVzVG9TdHJpbmcobWVtYmVyLnBhcmFtZXRlcnMpXG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaXNBYnN0cmFjdCxcbiAgICAgICAgYWNjZXNzTGV2ZWwsXG4gICAgICAgIHJldHVyblR5cGUsXG4gICAgICAgIGZ1bmN0aW9uUGFyYW1zLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZXR1cm5UeXBlVmFsdWUobWVtYmVyOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChtZW1iZXIudHlwZSkgcmV0dXJuIG1lbWJlci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgIGlmIChtZW1iZXIuaW5pdGlhbGl6ZXI/LnRleHQpIHJldHVybiBgID0gJHttZW1iZXIuaW5pdGlhbGl6ZXIudGV4dH1gXG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBwcm90ZWN0ZWQgX3Byb3BlcnRpZXNUb1N0cmluZyhwYXJhbWV0ZXJzPzogYW55W10pOiBzdHJpbmcge1xuICAgIGlmICgocGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgICByZXR1cm4gKHBhcmFtZXRlcnMgPz8gW10pXG4gICAgICAubWFwKChwKSA9PiBwLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKSlcbiAgICAgIC5qb2luKCcsICcpXG4gICAgICAuc3BsaXQoY29uc3RhbnQubmV3Um93KVxuICAgICAgLmpvaW4oJycpXG4gIH1cbn1cbiJdfQ==