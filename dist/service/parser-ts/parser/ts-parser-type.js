"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserType = void 0;
const entity_types_1 = require("src/enum/entity-types");
const reference_type_1 = require("src/enum/reference-type");
const entity_1 = require("src/model/entity");
const entity_type_1 = require("src/model/entity-type");
const reference_1 = require("src/model/reference");
const ts_parser_service_1 = require("src/service/parser-ts/ts-parser-service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFtRDtBQUNuRCw0REFBdUQ7QUFDdkQsNkNBQXlDO0FBQ3pDLHVEQUFrRDtBQUNsRCxtREFBK0M7QUFLL0MsK0VBQXlFO0FBRXpFLE1BQWEsWUFBWTtJQUNKLFVBQVUsQ0FBYztJQUN4QixjQUFjLENBQVE7SUFDdEIsYUFBYSxDQUFlO0lBQzVCLG1CQUFtQixDQUE2QjtJQUVuRSxZQUFZLE1BS1g7UUFDQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDN0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixJQUFJLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDeEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRXRFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FB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LEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNySCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTlHRCxvQ0E4R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IFJlZmVyZW5jZVR5cGUgfSBmcm9tICdzcmMvZW51bS9yZWZlcmVuY2UtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS10eXBlJ1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL3JlZmVyZW5jZSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1pbXBvcnQtcmVsYXRpb25zJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJUeXBlIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzID8/IFtdXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eVR5cGVzLlRZUEU+W10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuICAgIGNvbnN0IHJldHVyblR5cGUgPSB0aGlzLl9zdGF0ZW1lbnRbJ3R5cGUnXS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcblxuICAgIGNvbnN0IGltcG9ydHMgPSB0aGlzLl9maW5kSW1wb3J0UmVsYXRpb25zKHRoaXMuX3N0YXRlbWVudFsndHlwZSddLCB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLlRZUEUsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIHJlZmVyZW5jZXM6IFsuLi5pbXBvcnRzXSxcbiAgICAgICAgbWV0YTogbmV3IEVudGl0eVR5cGUoe1xuICAgICAgICAgIHJldHVyblR5cGUsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kSW1wb3J0UmVsYXRpb25zKFxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50IHwgdHMuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICApOiBSZWZlcmVuY2VbXSB7XG4gICAgaWYgKGltcG9ydFBhcnNlUmVzdWx0cy5sZW5ndGggPT09IDApIHJldHVybiBbXVxuICAgIHJldHVybiBpbXBvcnRQYXJzZVJlc3VsdHNcbiAgICAgIC5tYXAoKGltcG9ydFBhcnNlUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fZmluZElkZW50aWZpZXIoaW1wb3J0UGFyc2VSZXN1bHQubmFtZSwgc3RhdGVtZW50KSkgcmV0dXJuXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHtcbiAgICAgICAgICBuYW1lOiBpbXBvcnRQYXJzZVJlc3VsdC5uYW1lLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IGltcG9ydFBhcnNlUmVzdWx0LmluUHJvamVjdFBhdGgsXG4gICAgICAgICAgdHlwZTogUmVmZXJlbmNlVHlwZS5BU1NPQ0lBVElPTixcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlZmVyZW5jZVtdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRJZGVudGlmaWVyKGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHN0YXRlbWVudC5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpIHJldHVybiB0cnVlXG4gICAgLy8gaWYgKCF0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5pc0RlY2xhcmF0aW9uKHN0YXRlbWVudCkgJiYgc3RhdGVtZW50Lm5hbWU/LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICAvLyBpZiAoc3RhdGVtZW50LmV4cHJlc3Npb24/LnJpZ2h0ICYmIHN0YXRlbWVudC5leHByZXNzaW9uLnJpZ2h0LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICAvLyBpZiAoXG4gICAgLy8gICAoc3RhdGVtZW50LmRlY2xhcmF0aW9ucyA/PyBbXSkubGVuZ3RoID4gMCAmJlxuICAgIC8vICAgc3RhdGVtZW50LmRlY2xhcmF0aW9ucy5maW5kKChkKSA9PiBkLmluaXRpYWxpemVyPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm4gdHJ1ZVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGlmIChcbiAgICAvLyAgIFt0cy5TeW50YXhLaW5kLlR5cGVMaXRlcmFsLCB0cy5TeW50YXhLaW5kLlR5cGVSZWZlcmVuY2VdLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKSAmJlxuICAgIC8vICAgc3RhdGVtZW50LnR5cGVOYW1lPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWVcbiAgICAvLyApXG4gICAgLy8gICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fc3RlcEludG9Ob2RlKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFsnY2hlY2tUeXBlJywgJ2V4dGVuZHNUeXBlJywgJ3RydWVUeXBlJywgJ2ZhbHNlVHlwZScsICdsZWZ0JywgJ3R5cGVOYW1lJ10pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICAvLyBpZiAodGhpcy5fc3RlcEludG9BcnJheShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbJ3N0YXRlbWVudHMnLCAnbWVtYmVycycsICdjbGF1c2VzJywgJ3Byb3BlcnRpZXMnXSkpIHtcbiAgICAvLyAgIHJldHVybiB0cnVlXG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKFxuICAgIC8vICAgW3RzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb24sIHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb25dLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKSAmJlxuICAgIC8vICAgdHNQYXJzZXJJbXBvcnRSZWxhdGlvbnMuc3RlcEludG9BcnJheShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbJ2FyZ3VtZW50cyddKVxuICAgIC8vICkge1xuICAgIC8vICAgcmV0dXJuIHRydWVcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBpZiAoXG4gICAgLy8gICBbdHMuU3ludGF4S2luZC5Db25zdHJ1Y3Rvcl0uaW5jbHVkZXMoc3RhdGVtZW50LmtpbmQpICYmXG4gICAgLy8gICB0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5zdGVwSW50b0FycmF5KGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFsncGFyYW1ldGVycyddKVxuICAgIC8vICkge1xuICAgIC8vICAgcmV0dXJuIHRydWVcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3RlcEludG9Ob2RlKGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55LCBibG9ja05hbWVzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWJsb2NrTmFtZXMuZmluZCgoYmxvY2spID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZW1lbnRbYmxvY2tdICYmIHRoaXMuX2ZpbmRJZGVudGlmaWVyKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnRbYmxvY2tdKVxuICAgIH0pXG4gIH1cbiAgcHJvdGVjdGVkIF9zdGVwSW50b0FycmF5KGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55LCBibG9ja05hbWVzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWJsb2NrTmFtZXMuZmluZCgoYmxvY2spID0+IHtcbiAgICAgIHJldHVybiAoc3RhdGVtZW50W2Jsb2NrXSA/PyBbXSkubGVuZ3RoID4gMCAmJiBzdGF0ZW1lbnRbYmxvY2tdLmZpbmQoKGIpID0+IHRoaXMuX2ZpbmRJZGVudGlmaWVyKGlkZW50aWZpZXJOYW1lLCBiKSlcbiAgICB9KVxuICB9XG59XG4iXX0=