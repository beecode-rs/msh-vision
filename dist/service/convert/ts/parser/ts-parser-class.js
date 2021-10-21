"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const entity_1 = require("src/model/entity");
const entity_class_1 = require("src/model/entity-class");
const property_1 = require("src/model/property");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_relations_1 = require("src/service/convert/ts/ts-parser-import-relations");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
const constant_1 = require("src/util/constant");
class TsParserClass {
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
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                meta: new entity_class_1.EntityClass({
                    isAbstract,
                    references: [...imports, ...classRefs],
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
            .join(', ')
            .split(constant_1.constant.newRow)
            .join('');
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZDQUF5QztBQUN6Qyx5REFBb0Q7QUFDcEQsaURBQTZDO0FBQzdDLHVEQUE4QjtBQUc5QixrR0FBMkY7QUFDM0YsZ0ZBQTBFO0FBQzFFLGdEQUE0QztBQUU1QyxNQUFhLGFBQWE7SUFNeEIsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7SUFDckQsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxTQUFTLEdBQUcsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDMUIsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2hDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNuQyxD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Q0FDRjtBQXBGRCxzQ0FvRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWNsYXNzJ1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItaW1wb3J0LXJlbGF0aW9ucydcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJDbGFzcyBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gICAgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cyA9IGltcG9ydFBhcnNlUmVzdWx0cyA/PyBbXVxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eTxFbnRpdHlDbGFzcz5bXSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX3N0YXRlbWVudFsnbmFtZSddLmVzY2FwZWRUZXh0XG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG4gICAgY29uc3QgaXNBYnN0cmFjdCA9IHRzUGFyc2VyU2VydmljZS5pc0Fic3RyYWN0KHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICBjb25zdCBjbGFzc1JlZnMgPSB0c1BhcnNlclNlcnZpY2UuZmluZENsYXNzUmVsYXRpb25zKHtcbiAgICAgIHN0YXRlbWVudDogdGhpcy5fc3RhdGVtZW50LFxuICAgICAgcGFyc2VkU291cmNlOiB0aGlzLl9wYXJzZWRTb3VyY2UsXG4gICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc1JlZk5hbWVzID0gY2xhc3NSZWZzLm1hcCgoY3IpID0+IGNyLk5hbWUpXG4gICAgY29uc3QgaW1wb3J0cyA9IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zLmZpbmRJbXBvcnRSZWxhdGlvbnMoXG4gICAgICB0aGlzLl9zdGF0ZW1lbnQsXG4gICAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMuZmlsdGVyKChpcHIpID0+ICFjbGFzc1JlZk5hbWVzLmluY2x1ZGVzKGlwci5uYW1lKSlcbiAgICApXG5cbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5Q2xhc3Moe1xuICAgICAgICAgIGlzQWJzdHJhY3QsXG4gICAgICAgICAgcmVmZXJlbmNlczogWy4uLmltcG9ydHMsIC4uLmNsYXNzUmVmc10sXG4gICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKCk6IFByb3BlcnR5W10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRbJ21lbWJlcnMnXS5tYXAoKG1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IG1lbWJlci5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yID8gJ2NvbnN0cnVjdG9yJyA6IG1lbWJlci5uYW1lLmVzY2FwZWRUZXh0XG4gICAgICBjb25zdCByZXR1cm5UeXBlID0gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3IgPyAnJyA6IHRoaXMuX3JldHVyblR5cGVWYWx1ZShtZW1iZXIpXG5cbiAgICAgIGNvbnN0IGFjY2Vzc0xldmVsID0gdHNQYXJzZXJTZXJ2aWNlLmFjY2Vzc0xldmVsKG1lbWJlci5tb2RpZmllcnMpXG4gICAgICBjb25zdCBpc0Fic3RyYWN0ID0gdHNQYXJzZXJTZXJ2aWNlLmlzQWJzdHJhY3QobWVtYmVyLm1vZGlmaWVycylcbiAgICAgIGNvbnN0IGZ1bmN0aW9uUGFyYW1zID0gdGhpcy5fcHJvcGVydGllc1RvU3RyaW5nKG1lbWJlci5wYXJhbWV0ZXJzKVxuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGlzQWJzdHJhY3QsXG4gICAgICAgIGFjY2Vzc0xldmVsLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmV0dXJuVHlwZVZhbHVlKG1lbWJlcjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAobWVtYmVyLnR5cGUpIHJldHVybiBtZW1iZXIudHlwZS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcbiAgICBpZiAobWVtYmVyLmluaXRpYWxpemVyPy50ZXh0KSByZXR1cm4gYCA9ICR7bWVtYmVyLmluaXRpYWxpemVyLnRleHR9YFxuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcm9wZXJ0aWVzVG9TdHJpbmcocGFyYW1ldGVycz86IGFueVtdKTogc3RyaW5nIHtcbiAgICBpZiAoKHBhcmFtZXRlcnMgPz8gW10pLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gICAgcmV0dXJuIChwYXJhbWV0ZXJzID8/IFtdKVxuICAgICAgLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG4gICAgICAuam9pbignLCAnKVxuICAgICAgLnNwbGl0KGNvbnN0YW50Lm5ld1JvdylcbiAgICAgIC5qb2luKCcnKVxuICB9XG59XG4iXX0=