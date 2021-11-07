"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const entity_types_1 = require("src/enum/entity-types");
const entity_1 = require("src/model/entity");
const entity_class_1 = require("src/model/entity-class");
const property_1 = require("src/model/property");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_relations_1 = require("src/service/parser-ts/ts-parser-import-relations");
const ts_parser_service_1 = require("src/service/parser-ts/ts-parser-service");
const constant_1 = require("src/util/constant");
class TsParserClass {
    _statement;
    _inProjectPath;
    _parsedSource;
    _importParseResults;
    constructor(params) {
        const { parsedSource, statement, inProjectPath, importParseResults } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
        this._importParseResults = importParseResults ?? [];
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const isAbstract = ts_parser_service_1.tsParserService.isAbstract(this._statement.modifiers);
        const classRefs = ts_parser_service_1.tsParserService.findClassRelations({
            statement: this._statement,
            parsedSource: this._parsedSource,
            inProjectPath: this._inProjectPath,
        });
        const classRefNames = classRefs.map((cr) => cr.Name);
        const imports = ts_parser_import_relations_1.tsParserImportRelations.findImportRelations(this._statement, this._importParseResults.filter((ipr) => !classRefNames.includes(ipr.name)));
        const properties = this._findProperties();
        return [
            new entity_1.Entity({
                type: entity_types_1.EntityTypes.CLASS,
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                references: [...imports, ...classRefs],
                meta: new entity_class_1.EntityClass({
                    isAbstract,
                    properties,
                }),
            }),
        ];
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
            .map((p) => p.split(constant_1.constant.newRow).join('\\n'))
            .join(', ')
            .split(constant_1.constant.newRow)
            .join('');
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELDZDQUF5QztBQUN6Qyx5REFBb0Q7QUFDcEQsaURBQTZDO0FBQzdDLHVEQUE4QjtBQUc5QixpR0FBMEY7QUFDMUYsK0VBQXlFO0FBQ3pFLGdEQUE0QztBQUU1QyxNQUFhLGFBQWE7SUFDTCxVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUM1QixtQkFBbUIsQ0FBNkI7SUFFbkUsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7SUFDckQsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxTQUFTLEdBQUcsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRCxTQUFTLEVBQUUsSUFBSSxDQUFD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Q0FBQzthQUN6QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNWLEtBQUssQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQzthQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDYixDQUFDO0NBQ0Y7QUF0RkQsc0NBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWNsYXNzJ1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHQgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyB0c1BhcnNlckltcG9ydFJlbGF0aW9ucyB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzZXItaW1wb3J0LXJlbGF0aW9ucydcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzZXItc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckNsYXNzIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzID8/IFtdXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eVR5cGVzLkNMQVNTPltdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcbiAgICBjb25zdCBpc0Fic3RyYWN0ID0gdHNQYXJzZXJTZXJ2aWNlLmlzQWJzdHJhY3QodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIGNvbnN0IGNsYXNzUmVmcyA9IHRzUGFyc2VyU2VydmljZS5maW5kQ2xhc3NSZWxhdGlvbnMoe1xuICAgICAgc3RhdGVtZW50OiB0aGlzLl9zdGF0ZW1lbnQsXG4gICAgICBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzUmVmTmFtZXMgPSBjbGFzc1JlZnMubWFwKChjcikgPT4gY3IuTmFtZSlcbiAgICBjb25zdCBpbXBvcnRzID0gdHNQYXJzZXJJbXBvcnRSZWxhdGlvbnMuZmluZEltcG9ydFJlbGF0aW9ucyhcbiAgICAgIHRoaXMuX3N0YXRlbWVudCxcbiAgICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cy5maWx0ZXIoKGlwcikgPT4gIWNsYXNzUmVmTmFtZXMuaW5jbHVkZXMoaXByLm5hbWUpKVxuICAgIClcblxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9maW5kUHJvcGVydGllcygpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLkNMQVNTLFxuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICByZWZlcmVuY2VzOiBbLi4uaW1wb3J0cywgLi4uY2xhc3NSZWZzXSxcbiAgICAgICAgbWV0YTogbmV3IEVudGl0eUNsYXNzKHtcbiAgICAgICAgICBpc0Fic3RyYWN0LFxuICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kUHJvcGVydGllcygpOiBQcm9wZXJ0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvciA/ICdjb25zdHJ1Y3RvcicgOiBtZW1iZXIubmFtZS5lc2NhcGVkVGV4dFxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IG1lbWJlci5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yID8gJycgOiB0aGlzLl9yZXR1cm5UeXBlVmFsdWUobWVtYmVyKVxuXG4gICAgICBjb25zdCBhY2Nlc3NMZXZlbCA9IHRzUGFyc2VyU2VydmljZS5hY2Nlc3NMZXZlbChtZW1iZXIubW9kaWZpZXJzKVxuICAgICAgY29uc3QgaXNBYnN0cmFjdCA9IHRzUGFyc2VyU2VydmljZS5pc0Fic3RyYWN0KG1lbWJlci5tb2RpZmllcnMpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9IHRoaXMuX3Byb3BlcnRpZXNUb1N0cmluZyhtZW1iZXIucGFyYW1ldGVycylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc0Fic3RyYWN0LFxuICAgICAgICBhY2Nlc3NMZXZlbCxcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JldHVyblR5cGVWYWx1ZShtZW1iZXI6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKG1lbWJlci50eXBlKSByZXR1cm4gbWVtYmVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgaWYgKG1lbWJlci5pbml0aWFsaXplcj8udGV4dCkgcmV0dXJuIGAgPSAke21lbWJlci5pbml0aWFsaXplci50ZXh0fWBcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJvcGVydGllc1RvU3RyaW5nKHBhcmFtZXRlcnM/OiBhbnlbXSk6IHN0cmluZyB7XG4gICAgaWYgKChwYXJhbWV0ZXJzID8/IFtdKS5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuICAgIHJldHVybiAocGFyYW1ldGVycyA/PyBbXSlcbiAgICAgIC5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKVxuICAgICAgLm1hcCgocCkgPT4gcC5zcGxpdChjb25zdGFudC5uZXdSb3cpLmpvaW4oJ1xcXFxuJykpXG4gICAgICAuam9pbignLCAnKVxuICAgICAgLnNwbGl0KGNvbnN0YW50Lm5ld1JvdylcbiAgICAgIC5qb2luKCcnKVxuICB9XG59XG4iXX0=