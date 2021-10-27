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
        if (statement.expression?.right && statement.expression.right.escapedText === identifierName)
            return true;
        if ((statement.declarations ?? []).length > 0 &&
            statement.declarations.find((d) => d.initializer?.escapedText === identifierName)) {
            return true;
        }
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
        ])) {
            return true;
        }
        if (_self.stepIntoArray(identifierName, statement, ['statements', 'members', 'clauses', 'properties'])) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1pbXBvcnQtcmVsYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUF1RDtBQUN2RCxtREFBK0M7QUFDL0MsdURBQThCO0FBRzlCLE1BQU0sS0FBSyxHQUFHO0lBQ1osbUJBQW1CLEVBQUUsQ0FDbkIsU0FBZ0QsRUFDaEQsa0JBQStDLEVBQ2xDLEVBQUU7UUFDZixJQUFJLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDOUMsT0FBTyxrQkFBa0I7YUFDdEIsR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2dCQUFFLE9BQU07WUFDcEUsT0FBTyxJQUFJLHFCQUFTLENBQUM7Z0JBQ25CLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsYUFBYTtnQkFDOUMsSUFBSSxFQUFFLDhCQUFhLENBQUMsV0FBVzthQUNoQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUM7YUFDRCxNQUFNLENBQUMsT0FBTyxDQUFnQixDQUFBO0lBQ25DLENBQUM7SUFFRCxjQUFjLEVBQUUsQ0FBQyxjQUFzQixFQUFFLFNBQWMsRUFBVyxFQUFFO1FBQ2xFLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsV0FBVyxLQUFLLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUN4RyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxF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QUE7SUFDSixDQUFDO0lBRUQsYUFBYSxFQUFFLENBQUMsU0FBYyxFQUFXLEVBQUU7UUFDekMsT0FBTztZQUNMLFlBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCO1lBQ3BDLFlBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCO1lBQ3BDLFlBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQ2pDLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLFlBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQ2pDLFlBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO1lBQ3JDLFlBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQ2pDLFlBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO1lBQzlCLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO1lBQ2xDLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO1lBQ2xDLFlBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZTtZQUM3QixZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixZQUFFLENBQUMsVUFBVSxDQUFDLDBCQUEwQjtZQUN4QyxZQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtZQUNyQyxZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixZQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQjtTQUNqQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQztDQUNGLENBQUE7QUFDWSxRQUFBLHVCQUF1QixHQUFHLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZmVyZW5jZVR5cGUgfSBmcm9tICdzcmMvZW51bS9yZWZlcmVuY2UtdHlwZSdcbmltcG9ydCB7IFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9yZWZlcmVuY2UnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHQgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgZmluZEltcG9ydFJlbGF0aW9uczogKFxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50IHwgdHMuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICApOiBSZWZlcmVuY2VbXSA9PiB7XG4gICAgaWYgKGltcG9ydFBhcnNlUmVzdWx0cy5sZW5ndGggPT09IDApIHJldHVybiBbXVxuICAgIHJldHVybiBpbXBvcnRQYXJzZVJlc3VsdHNcbiAgICAgIC5tYXAoKGltcG9ydFBhcnNlUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICghX3NlbGYuZmluZElkZW50aWZpZXIoaW1wb3J0UGFyc2VSZXN1bHQubmFtZSwgc3RhdGVtZW50KSkgcmV0dXJuXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHtcbiAgICAgICAgICBuYW1lOiBpbXBvcnRQYXJzZVJlc3VsdC5uYW1lLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IGltcG9ydFBhcnNlUmVzdWx0LmluUHJvamVjdFBhdGgsXG4gICAgICAgICAgdHlwZTogUmVmZXJlbmNlVHlwZS5BU1NPQ0lBVElPTixcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlZmVyZW5jZVtdXG4gIH0sXG5cbiAgZmluZElkZW50aWZpZXI6IChpZGVudGlmaWVyTmFtZTogc3RyaW5nLCBzdGF0ZW1lbnQ6IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgIGlmIChzdGF0ZW1lbnQua2luZCA9PT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyICYmIHN0YXRlbWVudC5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpIHJldHVybiB0cnVlXG4gICAgaWYgKCFfc2VsZi5pc0RlY2xhcmF0aW9uKHN0YXRlbWVudCkgJiYgc3RhdGVtZW50Lm5hbWU/LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICBpZiAoc3RhdGVtZW50LmV4cHJlc3Npb24/LnJpZ2h0ICYmIHN0YXRlbWVudC5leHByZXNzaW9uLnJpZ2h0LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICBpZiAoXG4gICAgICAoc3RhdGVtZW50LmRlY2xhcmF0aW9ucyA/PyBbXSkubGVuZ3RoID4gMCAmJlxuICAgICAgc3RhdGVtZW50LmRlY2xhcmF0aW9ucy5maW5kKChkKSA9PiBkLmluaXRpYWxpemVyPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIFt0cy5TeW50YXhLaW5kLlR5cGVMaXRlcmFsLCB0cy5TeW50YXhLaW5kLlR5cGVSZWZlcmVuY2VdLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKSAmJlxuICAgICAgc3RhdGVtZW50LnR5cGVOYW1lPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWVcbiAgICApXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKFxuICAgICAgX3NlbGYuc3RlcEludG9Ob2RlKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFtcbiAgICAgICAgJ2JvZHknLFxuICAgICAgICAndGhlblN0YXRlbWVudCcsXG4gICAgICAgICdlbHNlU3RhdGVtZW50JyxcbiAgICAgICAgJ2V4cHJlc3Npb24nLFxuICAgICAgICAnZGVjbGFyYXRpb25MaXN0JyxcbiAgICAgICAgJ2Nhc2VCbG9jaycsXG4gICAgICAgICdpbml0aWFsaXplcicsXG4gICAgICAgICd0eXBlJyxcbiAgICAgIF0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoX3NlbGYuc3RlcEludG9BcnJheShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbJ3N0YXRlbWVudHMnLCAnbWVtYmVycycsICdjbGF1c2VzJywgJ3Byb3BlcnRpZXMnXSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgW3RzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb24sIHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb25dLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKSAmJlxuICAgICAgX3NlbGYuc3RlcEludG9BcnJheShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbJ2FyZ3VtZW50cyddKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpZiAoW3RzLlN5bnRheEtpbmQuQ29uc3RydWN0b3JdLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKSAmJiBfc2VsZi5zdGVwSW50b0FycmF5KGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFsncGFyYW1ldGVycyddKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSxcblxuICBzdGVwSW50b05vZGU6IChpZGVudGlmaWVyTmFtZTogc3RyaW5nLCBzdGF0ZW1lbnQ6IGFueSwgYmxvY2tOYW1lczogc3RyaW5nW10pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gISFibG9ja05hbWVzLmZpbmQoKGJsb2NrKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGVtZW50W2Jsb2NrXSAmJiBfc2VsZi5maW5kSWRlbnRpZmllcihpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50W2Jsb2NrXSlcbiAgICB9KVxuICB9LFxuICBzdGVwSW50b0FycmF5OiAoaWRlbnRpZmllck5hbWU6IHN0cmluZywgc3RhdGVtZW50OiBhbnksIGJsb2NrTmFtZXM6IHN0cmluZ1tdKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuICEhYmxvY2tOYW1lcy5maW5kKChibG9jaykgPT4ge1xuICAgICAgcmV0dXJuIChzdGF0ZW1lbnRbYmxvY2tdID8/IFtdKS5sZW5ndGggPiAwICYmIHN0YXRlbWVudFtibG9ja10uZmluZCgoYikgPT4gX3NlbGYuZmluZElkZW50aWZpZXIoaWRlbnRpZmllck5hbWUsIGIpKVxuICAgIH0pXG4gIH0sXG5cbiAgaXNEZWNsYXJhdGlvbjogKHN0YXRlbWVudDogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRzLlN5bnRheEtpbmQuTWVyZ2VEZWNsYXJhdGlvbk1hcmtlcixcbiAgICAgIHRzLlN5bnRheEtpbmQuRW5kT2ZEZWNsYXJhdGlvbk1hcmtlcixcbiAgICAgIHRzLlN5bnRheEtpbmQuUHJvcGVydHlEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuTWV0aG9kRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0LFxuICAgICAgdHMuU3ludGF4S2luZC5GdW5jdGlvbkRlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkVudW1EZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuTW9kdWxlRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLk5hbWVzcGFjZUV4cG9ydERlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5JbXBvcnRFcXVhbHNEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkV4cG9ydERlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5NaXNzaW5nRGVjbGFyYXRpb24sXG4gICAgXS5pbmNsdWRlcyhzdGF0ZW1lbnQua2luZClcbiAgfSxcbn1cbmV4cG9ydCBjb25zdCB0c1BhcnNlckltcG9ydFJlbGF0aW9ucyA9IF9zZWxmXG4iXX0=