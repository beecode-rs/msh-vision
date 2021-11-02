"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserType = void 0;
const entity_types_1 = require("src/enum/entity-types");
const reference_type_1 = require("src/enum/reference-type");
const ts_parser_service_1 = require("src/service/convert-ts/ts-parser-service");
const entity_1 = require("src/service/model/entity");
const entity_type_1 = require("src/service/model/entity-type");
const reference_1 = require("src/service/model/reference");
class TsParserType {
    _statement;
    _inProjectPath;
    _parsedSource;
    _importParseResults;
    constructor(params) {
        const { parsedSource, statement, inProjectPath, importParseResults } = params;
        this._parsedSource = parsedSource;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._importParseResults = importParseResults ?? [];
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const returnType = this._statement['type'].getText(this._parsedSource);
        const imports = this._findImportRelations(this._statement['type'], this._importParseResults);
        return [
            new entity_1.Entity({
                type: entity_types_1.EntityTypes.TYPE,
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                references: [...imports],
                meta: new entity_type_1.EntityType({
                    returnType,
                }),
            }),
        ];
    }
    _findImportRelations(statement, importParseResults) {
        if (importParseResults.length === 0)
            return [];
        return importParseResults
            .map((importParseResult) => {
            if (!this._findIdentifier(importParseResult.name, statement))
                return;
            return new reference_1.Reference({
                name: importParseResult.name,
                inProjectPath: importParseResult.inProjectPath,
                type: reference_type_1.ReferenceType.ASSOCIATION,
            });
        })
            .filter(Boolean);
    }
    _findIdentifier(identifierName, statement) {
        if (statement.escapedText === identifierName)
            return true;
        // if (!tsParserImportRelations.isDeclaration(statement) && statement.name?.escapedText === identifierName) return true
        // if (statement.expression?.right && statement.expression.right.escapedText === identifierName) return true
        // if (
        //   (statement.declarations ?? []).length > 0 &&
        //   statement.declarations.find((d) => d.initializer?.escapedText === identifierName)
        // ) {
        //   return true
        // }
        //
        // if (
        //   [ts.SyntaxKind.TypeLiteral, ts.SyntaxKind.TypeReference].includes(statement.kind) &&
        //   statement.typeName?.escapedText === identifierName
        // )
        //   return true
        if (this._stepIntoNode(identifierName, statement, ['checkType', 'extendsType', 'trueType', 'falseType', 'left', 'typeName'])) {
            return true;
        }
        // if (this._stepIntoArray(identifierName, statement, ['statements', 'members', 'clauses', 'properties'])) {
        //   return true
        // }
        // if (
        //   [ts.SyntaxKind.CallExpression, ts.SyntaxKind.CallExpression].includes(statement.kind) &&
        //   tsParserImportRelations.stepIntoArray(identifierName, statement, ['arguments'])
        // ) {
        //   return true
        // }
        //
        // if (
        //   [ts.SyntaxKind.Constructor].includes(statement.kind) &&
        //   tsParserImportRelations.stepIntoArray(identifierName, statement, ['parameters'])
        // ) {
        //   return true
        // }
        return false;
    }
    _stepIntoNode(identifierName, statement, blockNames) {
        return !!blockNames.find((block) => {
            return statement[block] && this._findIdentifier(identifierName, statement[block]);
        });
    }
    _stepIntoArray(identifierName, statement, blockNames) {
        return !!blockNames.find((block) => {
            return (statement[block] ?? []).length > 0 && statement[block].find((b) => this._findIdentifier(identifierName, b));
        });
    }
}
exports.TsParserType = TsParserType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0LXRzL3BhcnNlci90cy1wYXJzZXItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBbUQ7QUFDbkQsNERBQXVEO0FBS3ZELGdGQUEwRTtBQUMxRSxxREFBaUQ7QUFDakQsK0RBQTBEO0FBQzFELDJEQUF1RDtBQUV2RCxNQUFhLFlBQVk7SUFDSixVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUM1QixtQkFBbUIsQ0FBNkI7SUFFbkUsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdFLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7SUFDckQsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUV0RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENB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YyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckgsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUE5R0Qsb0NBOEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBSZWZlcmVuY2VUeXBlIH0gZnJvbSAnc3JjL2VudW0vcmVmZXJlbmNlLXR5cGUnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy90cy1wYXJzZXItaW1wb3J0LXJlbGF0aW9ucydcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvZW50aXR5LXR5cGUnXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9yZWZlcmVuY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlclR5cGUgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMgPSBpbXBvcnRQYXJzZVJlc3VsdHMgPz8gW11cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHk8RW50aXR5VHlwZXMuVFlQRT5bXSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX3N0YXRlbWVudFsnbmFtZSddLmVzY2FwZWRUZXh0XG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG4gICAgY29uc3QgcmV0dXJuVHlwZSA9IHRoaXMuX3N0YXRlbWVudFsndHlwZSddLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuXG4gICAgY29uc3QgaW1wb3J0cyA9IHRoaXMuX2ZpbmRJbXBvcnRSZWxhdGlvbnModGhpcy5fc3RhdGVtZW50Wyd0eXBlJ10sIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cylcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgdHlwZTogRW50aXR5VHlwZXMuVFlQRSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgcmVmZXJlbmNlczogWy4uLmltcG9ydHNdLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5VHlwZSh7XG4gICAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRJbXBvcnRSZWxhdGlvbnMoXG4gICAgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQgfCB0cy5WYXJpYWJsZURlY2xhcmF0aW9uLFxuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gICk6IFJlZmVyZW5jZVtdIHtcbiAgICBpZiAoaW1wb3J0UGFyc2VSZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdXG4gICAgcmV0dXJuIGltcG9ydFBhcnNlUmVzdWx0c1xuICAgICAgLm1hcCgoaW1wb3J0UGFyc2VSZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9maW5kSWRlbnRpZmllcihpbXBvcnRQYXJzZVJlc3VsdC5uYW1lLCBzdGF0ZW1lbnQpKSByZXR1cm5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWZlcmVuY2Uoe1xuICAgICAgICAgIG5hbWU6IGltcG9ydFBhcnNlUmVzdWx0Lm5hbWUsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogaW1wb3J0UGFyc2VSZXN1bHQuaW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgICB0eXBlOiBSZWZlcmVuY2VUeXBlLkFTU09DSUFUSU9OLFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVmZXJlbmNlW11cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZElkZW50aWZpZXIoaWRlbnRpZmllck5hbWU6IHN0cmluZywgc3RhdGVtZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoc3RhdGVtZW50LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICAvLyBpZiAoIXRzUGFyc2VySW1wb3J0UmVsYXRpb25zLmlzRGVjbGFyYXRpb24oc3RhdGVtZW50KSAmJiBzdGF0ZW1lbnQubmFtZT8uZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lKSByZXR1cm4gdHJ1ZVxuICAgIC8vIGlmIChzdGF0ZW1lbnQuZXhwcmVzc2lvbj8ucmlnaHQgJiYgc3RhdGVtZW50LmV4cHJlc3Npb24ucmlnaHQuZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lKSByZXR1cm4gdHJ1ZVxuICAgIC8vIGlmIChcbiAgICAvLyAgIChzdGF0ZW1lbnQuZGVjbGFyYXRpb25zID8/IFtdKS5sZW5ndGggPiAwICYmXG4gICAgLy8gICBzdGF0ZW1lbnQuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQuaW5pdGlhbGl6ZXI/LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSlcbiAgICAvLyApIHtcbiAgICAvLyAgIHJldHVybiB0cnVlXG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gaWYgKFxuICAgIC8vICAgW3RzLlN5bnRheEtpbmQuVHlwZUxpdGVyYWwsIHRzLlN5bnRheEtpbmQuVHlwZVJlZmVyZW5jZV0uaW5jbHVkZXMoc3RhdGVtZW50LmtpbmQpICYmXG4gICAgLy8gICBzdGF0ZW1lbnQudHlwZU5hbWU/LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZVxuICAgIC8vIClcbiAgICAvLyAgIHJldHVybiB0cnVlXG5cbiAgICBpZiAoXG4gICAgICB0aGlzLl9zdGVwSW50b05vZGUoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudCwgWydjaGVja1R5cGUnLCAnZXh0ZW5kc1R5cGUnLCAndHJ1ZVR5cGUnLCAnZmFsc2VUeXBlJywgJ2xlZnQnLCAndHlwZU5hbWUnXSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIC8vIGlmICh0aGlzLl9zdGVwSW50b0FycmF5KGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFsnc3RhdGVtZW50cycsICdtZW1iZXJzJywgJ2NsYXVzZXMnLCAncHJvcGVydGllcyddKSkge1xuICAgIC8vICAgcmV0dXJuIHRydWVcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAoXG4gICAgLy8gICBbdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbiwgdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbl0uaW5jbHVkZXMoc3RhdGVtZW50LmtpbmQpICYmXG4gICAgLy8gICB0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5zdGVwSW50b0FycmF5KGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFsnYXJndW1lbnRzJ10pXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm4gdHJ1ZVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGlmIChcbiAgICAvLyAgIFt0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yXS5pbmNsdWRlcyhzdGF0ZW1lbnQua2luZCkgJiZcbiAgICAvLyAgIHRzUGFyc2VySW1wb3J0UmVsYXRpb25zLnN0ZXBJbnRvQXJyYXkoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudCwgWydwYXJhbWV0ZXJzJ10pXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm4gdHJ1ZVxuICAgIC8vIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zdGVwSW50b05vZGUoaWRlbnRpZmllck5hbWU6IHN0cmluZywgc3RhdGVtZW50OiBhbnksIGJsb2NrTmFtZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhYmxvY2tOYW1lcy5maW5kKChibG9jaykgPT4ge1xuICAgICAgcmV0dXJuIHN0YXRlbWVudFtibG9ja10gJiYgdGhpcy5fZmluZElkZW50aWZpZXIoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudFtibG9ja10pXG4gICAgfSlcbiAgfVxuICBwcm90ZWN0ZWQgX3N0ZXBJbnRvQXJyYXkoaWRlbnRpZmllck5hbWU6IHN0cmluZywgc3RhdGVtZW50OiBhbnksIGJsb2NrTmFtZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhYmxvY2tOYW1lcy5maW5kKChibG9jaykgPT4ge1xuICAgICAgcmV0dXJuIChzdGF0ZW1lbnRbYmxvY2tdID8/IFtdKS5sZW5ndGggPiAwICYmIHN0YXRlbWVudFtibG9ja10uZmluZCgoYikgPT4gdGhpcy5fZmluZElkZW50aWZpZXIoaWRlbnRpZmllck5hbWUsIGIpKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==