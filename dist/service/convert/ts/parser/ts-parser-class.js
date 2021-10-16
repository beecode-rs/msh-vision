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
class TsParserClass {
    constructor({ parsedSource, statement, inProjectPath, }) {
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
            const returnType = this._returnTypeValue(member);
            const accessLevel = ts_parser_service_1.tsParserService.accessLevel(member.modifiers);
            const isAbstract = ts_parser_service_1.tsParserService.isAbstract(member.modifiers);
            const functionParams = (member.parameters ?? []).length === 0
                ? undefined
                : member.parameters.map((p) => p.getText(this._parsedSource)).join(', ');
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
        // if(member.kind === ts.SyntaxKind.Constructor) return ''
        if (member.type)
            return member.type.getText(this._parsedSource);
        if (member.initializer?.text)
            return ` = ${member.initializer.text}`;
        return '';
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCxpREFBNkM7QUFDN0MsdURBQThCO0FBRTlCLGdGQUEwRTtBQUUxRSxNQUFhLGFBQWE7SUFLeEIsWUFBWSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsYUFBYSxHQUtkO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNwRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDMUIsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2hDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNuQyxDQUFDLENBQUE7UUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFFekMsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBVyxDQUFDO1lBQ2xDLElBQUk7WUFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbEMsVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtTQUNYLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0QixDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUNoRyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDaEQsTUFBTSxXQUFXLEdBQUcsbUNBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMvRCxNQUFNLGNBQWMsR0FDbEIsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVFLE9BQU8sSUFBSSxtQkFBUSxDQUFDO2dCQUNsQixJQUFJO2dCQUNKLFVBQVU7Z0JBQ1YsV0FBVztnQkFDWCxVQUFVO2dCQUNWLGNBQWM7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxNQUFXO1FBQ3BDLDBEQUEwRDtRQUMxRCxJQUFJLE1BQU0sQ0FBQyxJQUFJO1lBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDL0QsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUk7WUFBRSxPQUFPLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNwRSxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQXJFRCxzQ0FxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlDbGFzcyB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktY2xhc3MnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckNsYXNzIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHBhcnNlZFNvdXJjZSxcbiAgICBzdGF0ZW1lbnQsXG4gICAgaW5Qcm9qZWN0UGF0aCxcbiAgfToge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIH0pIHtcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eUNsYXNzW10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuICAgIGNvbnN0IGlzQWJzdHJhY3QgPSB0c1BhcnNlclNlcnZpY2UuaXNBYnN0cmFjdCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IHRzUGFyc2VyU2VydmljZS5maW5kQ2xhc3NSZWxhdGlvbnMoe1xuICAgICAgc3RhdGVtZW50OiB0aGlzLl9zdGF0ZW1lbnQsXG4gICAgICBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgfSlcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoKVxuXG4gICAgY29uc3QgZW50aXR5Q2xhc3MgPSBuZXcgRW50aXR5Q2xhc3Moe1xuICAgICAgbmFtZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICBpc0V4cG9ydGVkLFxuICAgICAgaXNBYnN0cmFjdCxcbiAgICAgIHJlZmVyZW5jZXMsXG4gICAgICBwcm9wZXJ0aWVzLFxuICAgIH0pXG5cbiAgICByZXR1cm4gW2VudGl0eUNsYXNzXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kUHJvcGVydGllcygpOiBQcm9wZXJ0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvciA/ICdjb25zdHJ1Y3RvcicgOiBtZW1iZXIubmFtZS5lc2NhcGVkVGV4dFxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IHRoaXMuX3JldHVyblR5cGVWYWx1ZShtZW1iZXIpXG4gICAgICBjb25zdCBhY2Nlc3NMZXZlbCA9IHRzUGFyc2VyU2VydmljZS5hY2Nlc3NMZXZlbChtZW1iZXIubW9kaWZpZXJzKVxuICAgICAgY29uc3QgaXNBYnN0cmFjdCA9IHRzUGFyc2VyU2VydmljZS5pc0Fic3RyYWN0KG1lbWJlci5tb2RpZmllcnMpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgIChtZW1iZXIucGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IG1lbWJlci5wYXJhbWV0ZXJzLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpLmpvaW4oJywgJylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc0Fic3RyYWN0LFxuICAgICAgICBhY2Nlc3NMZXZlbCxcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JldHVyblR5cGVWYWx1ZShtZW1iZXI6IGFueSk6IHN0cmluZyB7XG4gICAgLy8gaWYobWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3IpIHJldHVybiAnJ1xuICAgIGlmIChtZW1iZXIudHlwZSkgcmV0dXJuIG1lbWJlci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgIGlmIChtZW1iZXIuaW5pdGlhbGl6ZXI/LnRleHQpIHJldHVybiBgID0gJHttZW1iZXIuaW5pdGlhbGl6ZXIudGV4dH1gXG4gICAgcmV0dXJuICcnXG4gIH1cbn1cbiJdfQ==