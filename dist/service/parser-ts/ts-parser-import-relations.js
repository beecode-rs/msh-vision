"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserImportRelations = void 0;
const reference_type_1 = require("src/enum/reference-type");
const reference_1 = require("src/model/reference");
const ts_1 = __importDefault(require("src/module/ts"));
const _self = {
    findImportRelations: (statement, importParseResults) => {
        if (importParseResults.length === 0)
            return [];
        return importParseResults
            .map((importParseResult) => {
            if (!_self.findIdentifier(importParseResult.name, statement))
                return;
            return new reference_1.Reference({
                name: importParseResult.name,
                inProjectPath: importParseResult.inProjectPath,
                type: reference_type_1.ReferenceType.ASSOCIATION,
            });
        })
            .filter(Boolean);
    },
    findIdentifier: (identifierName, statement) => {
        if (statement.kind === ts_1.default.SyntaxKind.Identifier && statement.escapedText === identifierName)
            return true;
        if (!_self.isDeclaration(statement) && statement.name?.escapedText === identifierName)
            return true;
        // if (statement.expression?.right && statement.expression.right.escapedText === identifierName) return true
        // if (
        //   (statement.declarations ?? []).length > 0 &&
        //   statement.declarations.find((d) => d.initializer?.escapedText === identifierName)
        // ) {
        //   return true
        // }
        if ([ts_1.default.SyntaxKind.TypeLiteral, ts_1.default.SyntaxKind.TypeReference].includes(statement.kind) &&
            statement.typeName?.escapedText === identifierName)
            return true;
        if (_self.stepIntoNode(identifierName, statement, [
            'body',
            'thenStatement',
            'elseStatement',
            'expression',
            'declarationList',
            'caseBlock',
            'initializer',
            'type',
            'right',
            'tryBlock',
            'catchClause',
            'finallyBlock',
            'block',
        ])) {
            return true;
        }
        if (_self.stepIntoArray(identifierName, statement, [
            'statements',
            'members',
            'clauses',
            'properties',
            'parameters',
            'declarations',
            'arguments',
            'typeArguments',
        ])) {
            return true;
        }
        if ([ts_1.default.SyntaxKind.CallExpression, ts_1.default.SyntaxKind.CallExpression].includes(statement.kind) &&
            _self.stepIntoArray(identifierName, statement, ['arguments'])) {
            return true;
        }
        if ([ts_1.default.SyntaxKind.Constructor].includes(statement.kind) && _self.stepIntoArray(identifierName, statement, ['parameters'])) {
            return true;
        }
        return false;
    },
    stepIntoNode: (identifierName, statement, blockNames) => {
        return !!blockNames.find((block) => {
            return statement[block] && _self.findIdentifier(identifierName, statement[block]);
        });
    },
    stepIntoArray: (identifierName, statement, blockNames) => {
        return !!blockNames.find((block) => {
            return (statement[block] ?? []).length > 0 && statement[block].find((b) => _self.findIdentifier(identifierName, b));
        });
    },
    isDeclaration: (statement) => {
        return [
            ts_1.default.SyntaxKind.MergeDeclarationMarker,
            ts_1.default.SyntaxKind.EndOfDeclarationMarker,
            ts_1.default.SyntaxKind.PropertyDeclaration,
            ts_1.default.SyntaxKind.MethodDeclaration,
            ts_1.default.SyntaxKind.VariableDeclaration,
            ts_1.default.SyntaxKind.VariableDeclarationList,
            ts_1.default.SyntaxKind.FunctionDeclaration,
            ts_1.default.SyntaxKind.ClassDeclaration,
            ts_1.default.SyntaxKind.InterfaceDeclaration,
            ts_1.default.SyntaxKind.TypeAliasDeclaration,
            ts_1.default.SyntaxKind.EnumDeclaration,
            ts_1.default.SyntaxKind.ModuleDeclaration,
            ts_1.default.SyntaxKind.NamespaceExportDeclaration,
            ts_1.default.SyntaxKind.ImportEqualsDeclaration,
            ts_1.default.SyntaxKind.ImportDeclaration,
            ts_1.default.SyntaxKind.ExportDeclaration,
            ts_1.default.SyntaxKind.MissingDeclaration,
        ].includes(statement.kind);
    },
};
exports.tsParserImportRelations = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELG1EQUErQztBQUMvQyx1REFBOEI7QUFHOUIsTUFBTSxLQUFLLEdBQUc7SUFDWixtQkFBbUIsRUFBRSxDQUNuQixTQUFnRCxFQUNoRCxrQkFBK0MsRUFDbEMsRUFBRTtRQUNmLElBQUksa0JBQWtCLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLGtCQUFrQjthQUN0QixHQUFHLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7Z0JBQUUsT0FBTTtZQUNwRSxPQUFPLElBQUkscUJBQVMsQ0FBQztnQkFDbkIsSUFBSSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQzVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhO2dCQUM5QyxJQUFJLEVBQUUsOEJBQWEsQ0FBQyxXQUFXO2FBQ2hDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQzthQUNELE1BQU0sQ0FBQyxPQUFPLENBQWdCLENBQUE7SUFDbkMsQ0FBQztJQUVELGNBQWMsRUFBRSxDQUFDLGNBQXNCLEVBQUUsU0FBYyxFQUFXLEVBQUU7UUFDbEUsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxXQUFXLEtBQUssY0FBYztZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQ3hHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUs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LENBQUMsVUFBVSxDQUFDLG1CQUFtQjtZQUNqQyxZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQjtZQUNqQyxZQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtZQUNyQyxZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQjtZQUNqQyxZQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtZQUM5QixZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtZQUNsQyxZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtZQUNsQyxZQUFFLENBQUMsVUFBVSxDQUFDLGVBQWU7WUFDN0IsWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsWUFBRSxDQUFDLFVBQVUsQ0FBQywwQkFBMEI7WUFDeEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7WUFDckMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsWUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0I7U0FDakMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FDRixDQUFBO0FBQ1ksUUFBQSx1QkFBdUIsR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWZlcmVuY2VUeXBlIH0gZnJvbSAnc3JjL2VudW0vcmVmZXJlbmNlLXR5cGUnXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvcmVmZXJlbmNlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgZmluZEltcG9ydFJlbGF0aW9uczogKFxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50IHwgdHMuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICApOiBSZWZlcmVuY2VbXSA9PiB7XG4gICAgaWYgKGltcG9ydFBhcnNlUmVzdWx0cy5sZW5ndGggPT09IDApIHJldHVybiBbXVxuICAgIHJldHVybiBpbXBvcnRQYXJzZVJlc3VsdHNcbiAgICAgIC5tYXAoKGltcG9ydFBhcnNlUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICghX3NlbGYuZmluZElkZW50aWZpZXIoaW1wb3J0UGFyc2VSZXN1bHQubmFtZSwgc3RhdGVtZW50KSkgcmV0dXJuXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHtcbiAgICAgICAgICBuYW1lOiBpbXBvcnRQYXJzZVJlc3VsdC5uYW1lLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IGltcG9ydFBhcnNlUmVzdWx0LmluUHJvamVjdFBhdGgsXG4gICAgICAgICAgdHlwZTogUmVmZXJlbmNlVHlwZS5BU1NPQ0lBVElPTixcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlZmVyZW5jZVtdXG4gIH0sXG5cbiAgZmluZElkZW50aWZpZXI6IChpZGVudGlmaWVyTmFtZTogc3RyaW5nLCBzdGF0ZW1lbnQ6IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgIGlmIChzdGF0ZW1lbnQua2luZCA9PT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyICYmIHN0YXRlbWVudC5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpIHJldHVybiB0cnVlXG4gICAgaWYgKCFfc2VsZi5pc0RlY2xhcmF0aW9uKHN0YXRlbWVudCkgJiYgc3RhdGVtZW50Lm5hbWU/LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICAvLyBpZiAoc3RhdGVtZW50LmV4cHJlc3Npb24/LnJpZ2h0ICYmIHN0YXRlbWVudC5leHByZXNzaW9uLnJpZ2h0LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICAvLyBpZiAoXG4gICAgLy8gICAoc3RhdGVtZW50LmRlY2xhcmF0aW9ucyA/PyBbXSkubGVuZ3RoID4gMCAmJlxuICAgIC8vICAgc3RhdGVtZW50LmRlY2xhcmF0aW9ucy5maW5kKChkKSA9PiBkLmluaXRpYWxpemVyPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpXG4gICAgLy8gKSB7XG4gICAgLy8gICByZXR1cm4gdHJ1ZVxuICAgIC8vIH1cblxuICAgIGlmIChcbiAgICAgIFt0cy5TeW50YXhLaW5kLlR5cGVMaXRlcmFsLCB0cy5TeW50YXhLaW5kLlR5cGVSZWZlcmVuY2VdLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKSAmJlxuICAgICAgc3RhdGVtZW50LnR5cGVOYW1lPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWVcbiAgICApXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKFxuICAgICAgX3NlbGYuc3RlcEludG9Ob2RlKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFtcbiAgICAgICAgJ2JvZHknLFxuICAgICAgICAndGhlblN0YXRlbWVudCcsXG4gICAgICAgICdlbHNlU3RhdGVtZW50JyxcbiAgICAgICAgJ2V4cHJlc3Npb24nLFxuICAgICAgICAnZGVjbGFyYXRpb25MaXN0JyxcbiAgICAgICAgJ2Nhc2VCbG9jaycsXG4gICAgICAgICdpbml0aWFsaXplcicsXG4gICAgICAgICd0eXBlJyxcbiAgICAgICAgJ3JpZ2h0JyxcbiAgICAgICAgJ3RyeUJsb2NrJyxcbiAgICAgICAgJ2NhdGNoQ2xhdXNlJyxcbiAgICAgICAgJ2ZpbmFsbHlCbG9jaycsXG4gICAgICAgICdibG9jaycsXG4gICAgICBdKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKFxuICAgICAgX3NlbGYuc3RlcEludG9BcnJheShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbXG4gICAgICAgICdzdGF0ZW1lbnRzJyxcbiAgICAgICAgJ21lbWJlcnMnLFxuICAgICAgICAnY2xhdXNlcycsXG4gICAgICAgICdwcm9wZXJ0aWVzJyxcbiAgICAgICAgJ3BhcmFtZXRlcnMnLFxuICAgICAgICAnZGVjbGFyYXRpb25zJyxcbiAgICAgICAgJ2FyZ3VtZW50cycsXG4gICAgICAgICd0eXBlQXJndW1lbnRzJyxcbiAgICAgIF0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIFt0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uLCB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uXS5pbmNsdWRlcyhzdGF0ZW1lbnQua2luZCkgJiZcbiAgICAgIF9zZWxmLnN0ZXBJbnRvQXJyYXkoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudCwgWydhcmd1bWVudHMnXSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKFt0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yXS5pbmNsdWRlcyhzdGF0ZW1lbnQua2luZCkgJiYgX3NlbGYuc3RlcEludG9BcnJheShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbJ3BhcmFtZXRlcnMnXSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0sXG5cbiAgc3RlcEludG9Ob2RlOiAoaWRlbnRpZmllck5hbWU6IHN0cmluZywgc3RhdGVtZW50OiBhbnksIGJsb2NrTmFtZXM6IHN0cmluZ1tdKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuICEhYmxvY2tOYW1lcy5maW5kKChibG9jaykgPT4ge1xuICAgICAgcmV0dXJuIHN0YXRlbWVudFtibG9ja10gJiYgX3NlbGYuZmluZElkZW50aWZpZXIoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudFtibG9ja10pXG4gICAgfSlcbiAgfSxcbiAgc3RlcEludG9BcnJheTogKGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55LCBibG9ja05hbWVzOiBzdHJpbmdbXSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAhIWJsb2NrTmFtZXMuZmluZCgoYmxvY2spID0+IHtcbiAgICAgIHJldHVybiAoc3RhdGVtZW50W2Jsb2NrXSA/PyBbXSkubGVuZ3RoID4gMCAmJiBzdGF0ZW1lbnRbYmxvY2tdLmZpbmQoKGIpID0+IF9zZWxmLmZpbmRJZGVudGlmaWVyKGlkZW50aWZpZXJOYW1lLCBiKSlcbiAgICB9KVxuICB9LFxuXG4gIGlzRGVjbGFyYXRpb246IChzdGF0ZW1lbnQ6IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB0cy5TeW50YXhLaW5kLk1lcmdlRGVjbGFyYXRpb25NYXJrZXIsXG4gICAgICB0cy5TeW50YXhLaW5kLkVuZE9mRGVjbGFyYXRpb25NYXJrZXIsXG4gICAgICB0cy5TeW50YXhLaW5kLlByb3BlcnR5RGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLk1ldGhvZERlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdCxcbiAgICAgIHRzLlN5bnRheEtpbmQuRnVuY3Rpb25EZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLk1vZHVsZURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5OYW1lc3BhY2VFeHBvcnREZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuSW1wb3J0RXF1YWxzRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5FeHBvcnREZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuTWlzc2luZ0RlY2xhcmF0aW9uLFxuICAgIF0uaW5jbHVkZXMoc3RhdGVtZW50LmtpbmQpXG4gIH0sXG59XG5leHBvcnQgY29uc3QgdHNQYXJzZXJJbXBvcnRSZWxhdGlvbnMgPSBfc2VsZlxuIl19