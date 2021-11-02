"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const entity_types_1 = require("src/enum/entity-types");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_relations_1 = require("src/service/convert-ts/ts-parser-import-relations");
const ts_parser_service_1 = require("src/service/convert-ts/ts-parser-service");
const entity_1 = require("src/service/model/entity");
const entity_class_1 = require("src/service/model/entity-class");
const property_1 = require("src/service/model/property");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFtRDtBQUNuRCx1REFBOEI7QUFHOUIsa0dBQTJGO0FBQzNGLGdGQUEwRTtBQUMxRSxxREFBaUQ7QUFDakQsaUVBQTREO0FBQzVELHlEQUFxRDtBQUNyRCxnREFBNEM7QUFFNUMsTUFBYSxhQUFhO0lBQ0wsVUFBVSxDQUFjO0lBQ3hCLGNBQWMsQ0FBUTtJQUN0QixhQUFhLENBQWU7SUFDNUIsbUJBQW1CLENBQTZCO0lBRW5FLFlBQVksTUFLWDtRQUNDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLElBQUksRUFBRSxDQUFBO0lBQ3JELENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUE7UUFDaEQsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN4RSxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sU0FBUyxHQUFHLG1DQUFlLENBQUMsa0JBQWtCLENBQUM7WUFDbkQsU0FBUyxFQUFFLElBQUksQ0FB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LENBQUM7YUFDekMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixLQUFLLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUM7YUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBdEZELHNDQXNGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyB0c1BhcnNlckltcG9ydFJlbGF0aW9ucyB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0LXRzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHktY2xhc3MnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyQ2xhc3MgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMgPSBpbXBvcnRQYXJzZVJlc3VsdHMgPz8gW11cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHk8RW50aXR5VHlwZXMuQ0xBU1M+W10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuICAgIGNvbnN0IGlzQWJzdHJhY3QgPSB0c1BhcnNlclNlcnZpY2UuaXNBYnN0cmFjdCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgY2xhc3NSZWZzID0gdHNQYXJzZXJTZXJ2aWNlLmZpbmRDbGFzc1JlbGF0aW9ucyh7XG4gICAgICBzdGF0ZW1lbnQ6IHRoaXMuX3N0YXRlbWVudCxcbiAgICAgIHBhcnNlZFNvdXJjZTogdGhpcy5fcGFyc2VkU291cmNlLFxuICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NSZWZOYW1lcyA9IGNsYXNzUmVmcy5tYXAoKGNyKSA9PiBjci5OYW1lKVxuICAgIGNvbnN0IGltcG9ydHMgPSB0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5maW5kSW1wb3J0UmVsYXRpb25zKFxuICAgICAgdGhpcy5fc3RhdGVtZW50LFxuICAgICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzLmZpbHRlcigoaXByKSA9PiAhY2xhc3NSZWZOYW1lcy5pbmNsdWRlcyhpcHIubmFtZSkpXG4gICAgKVxuXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2ZpbmRQcm9wZXJ0aWVzKClcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgdHlwZTogRW50aXR5VHlwZXMuQ0xBU1MsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIHJlZmVyZW5jZXM6IFsuLi5pbXBvcnRzLCAuLi5jbGFzc1JlZnNdLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5Q2xhc3Moe1xuICAgICAgICAgIGlzQWJzdHJhY3QsXG4gICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKCk6IFByb3BlcnR5W10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRbJ21lbWJlcnMnXS5tYXAoKG1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IG1lbWJlci5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yID8gJ2NvbnN0cnVjdG9yJyA6IG1lbWJlci5uYW1lLmVzY2FwZWRUZXh0XG4gICAgICBjb25zdCByZXR1cm5UeXBlID0gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3IgPyAnJyA6IHRoaXMuX3JldHVyblR5cGVWYWx1ZShtZW1iZXIpXG5cbiAgICAgIGNvbnN0IGFjY2Vzc0xldmVsID0gdHNQYXJzZXJTZXJ2aWNlLmFjY2Vzc0xldmVsKG1lbWJlci5tb2RpZmllcnMpXG4gICAgICBjb25zdCBpc0Fic3RyYWN0ID0gdHNQYXJzZXJTZXJ2aWNlLmlzQWJzdHJhY3QobWVtYmVyLm1vZGlmaWVycylcbiAgICAgIGNvbnN0IGZ1bmN0aW9uUGFyYW1zID0gdGhpcy5fcHJvcGVydGllc1RvU3RyaW5nKG1lbWJlci5wYXJhbWV0ZXJzKVxuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGlzQWJzdHJhY3QsXG4gICAgICAgIGFjY2Vzc0xldmVsLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmV0dXJuVHlwZVZhbHVlKG1lbWJlcjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAobWVtYmVyLnR5cGUpIHJldHVybiBtZW1iZXIudHlwZS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcbiAgICBpZiAobWVtYmVyLmluaXRpYWxpemVyPy50ZXh0KSByZXR1cm4gYCA9ICR7bWVtYmVyLmluaXRpYWxpemVyLnRleHR9YFxuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcm9wZXJ0aWVzVG9TdHJpbmcocGFyYW1ldGVycz86IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoKHBhcmFtZXRlcnMgPz8gW10pLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gICAgcmV0dXJuIChwYXJhbWV0ZXJzID8/IFtdKVxuICAgICAgLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG4gICAgICAubWFwKChwKSA9PiBwLnNwbGl0KGNvbnN0YW50Lm5ld1Jvdykuam9pbignXFxcXG4nKSlcbiAgICAgIC5qb2luKCcsICcpXG4gICAgICAuc3BsaXQoY29uc3RhbnQubmV3Um93KVxuICAgICAgLmpvaW4oJycpXG4gIH1cbn1cbiJdfQ==