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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELDZDQUF5QztBQUN6Qyx5REFBb0Q7QUFDcEQsaURBQTZDO0FBQzdDLHVEQUE4QjtBQUc5QixpR0FBMEY7QUFDMUYsK0VBQXlFO0FBQ3pFLGdEQUE0QztBQUU1QyxNQUFhLGFBQWE7SUFDTCxVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUM1QixtQkFBbUIsQ0FBNkI7SUFFbkUsWUFBbUIsTUFLbEI7UUFDQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDN0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixJQUFJLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDeEUsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RSxNQUFNLFNBQVMsR0FBRyxtQ0FBZSxDQUFDLGtCQUFrQixDQUFDO1lBQ25ELFNBQVMsRUFBRSxJQUFJLENB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QyxDQUFDO2FBQ3pDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ1YsS0FBSyxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQXRGRCxzQ0FzRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlDbGFzcyB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktY2xhc3MnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1pbXBvcnQtcmVsYXRpb25zJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyQ2xhc3MgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzID8/IFtdXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eVR5cGVzLkNMQVNTPltdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcbiAgICBjb25zdCBpc0Fic3RyYWN0ID0gdHNQYXJzZXJTZXJ2aWNlLmlzQWJzdHJhY3QodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIGNvbnN0IGNsYXNzUmVmcyA9IHRzUGFyc2VyU2VydmljZS5maW5kQ2xhc3NSZWxhdGlvbnMoe1xuICAgICAgc3RhdGVtZW50OiB0aGlzLl9zdGF0ZW1lbnQsXG4gICAgICBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzUmVmTmFtZXMgPSBjbGFzc1JlZnMubWFwKChjcikgPT4gY3IuTmFtZSlcbiAgICBjb25zdCBpbXBvcnRzID0gdHNQYXJzZXJJbXBvcnRSZWxhdGlvbnMuZmluZEltcG9ydFJlbGF0aW9ucyhcbiAgICAgIHRoaXMuX3N0YXRlbWVudCxcbiAgICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cy5maWx0ZXIoKGlwcikgPT4gIWNsYXNzUmVmTmFtZXMuaW5jbHVkZXMoaXByLm5hbWUpKVxuICAgIClcblxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9maW5kUHJvcGVydGllcygpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLkNMQVNTLFxuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICByZWZlcmVuY2VzOiBbLi4uaW1wb3J0cywgLi4uY2xhc3NSZWZzXSxcbiAgICAgICAgbWV0YTogbmV3IEVudGl0eUNsYXNzKHtcbiAgICAgICAgICBpc0Fic3RyYWN0LFxuICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kUHJvcGVydGllcygpOiBQcm9wZXJ0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvciA/ICdjb25zdHJ1Y3RvcicgOiBtZW1iZXIubmFtZS5lc2NhcGVkVGV4dFxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IG1lbWJlci5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yID8gJycgOiB0aGlzLl9yZXR1cm5UeXBlVmFsdWUobWVtYmVyKVxuXG4gICAgICBjb25zdCBhY2Nlc3NMZXZlbCA9IHRzUGFyc2VyU2VydmljZS5hY2Nlc3NMZXZlbChtZW1iZXIubW9kaWZpZXJzKVxuICAgICAgY29uc3QgaXNBYnN0cmFjdCA9IHRzUGFyc2VyU2VydmljZS5pc0Fic3RyYWN0KG1lbWJlci5tb2RpZmllcnMpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9IHRoaXMuX3Byb3BlcnRpZXNUb1N0cmluZyhtZW1iZXIucGFyYW1ldGVycylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc0Fic3RyYWN0LFxuICAgICAgICBhY2Nlc3NMZXZlbCxcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JldHVyblR5cGVWYWx1ZShtZW1iZXI6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKG1lbWJlci50eXBlKSByZXR1cm4gbWVtYmVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgaWYgKG1lbWJlci5pbml0aWFsaXplcj8udGV4dCkgcmV0dXJuIGAgPSAke21lbWJlci5pbml0aWFsaXplci50ZXh0fWBcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJvcGVydGllc1RvU3RyaW5nKHBhcmFtZXRlcnM/OiBhbnlbXSk6IHN0cmluZyB7XG4gICAgaWYgKChwYXJhbWV0ZXJzID8/IFtdKS5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuICAgIHJldHVybiAocGFyYW1ldGVycyA/PyBbXSlcbiAgICAgIC5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKVxuICAgICAgLm1hcCgocCkgPT4gcC5zcGxpdChjb25zdGFudC5uZXdSb3cpLmpvaW4oJ1xcXFxuJykpXG4gICAgICAuam9pbignLCAnKVxuICAgICAgLnNwbGl0KGNvbnN0YW50Lm5ld1JvdylcbiAgICAgIC5qb2luKCcnKVxuICB9XG59XG4iXX0=