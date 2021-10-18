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
        if (_self.stepIntoNode(identifierName, statement, [
            'body',
            'thenStatement',
            'elseStatement',
            'expression',
            'declarationList',
            'caseBlock',
            'initializer',
        ])) {
            return true;
        }
        if (_self.stepIntoArray(identifierName, statement, ['statements', 'members', 'clauses', 'properties'])) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1pbXBvcnQtcmVsYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUF1RDtBQUN2RCxtREFBK0M7QUFDL0MsdURBQThCO0FBRzlCLE1BQU0sS0FBSyxHQUFHO0lBQ1osbUJBQW1CLEVBQUUsQ0FDbkIsU0FBZ0QsRUFDaEQsa0JBQStDLEVBQ2xDLEVBQUU7UUFDZixJQUFJLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDOUMsT0FBTyxrQkFBa0I7YUFDdEIsR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2dCQUFFLE9BQU07WUFDcEUsT0FBTyxJQUFJLHFCQUFTLENBQUM7Z0JBQ25CLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsYUFBYTtnQkFDOUMsSUFBSSxFQUFFLDhCQUFhLENBQUMsV0FBVzthQUNoQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUM7YUFDRCxNQUFNLENBQUMsT0FBTyxDQUFnQixDQUFBO0lBQ25DLENBQUM7SUFFRCxjQUFjLEVBQUUsQ0FBQyxjQUFzQixFQUFFLFNBQWMsRUFBVyxFQUFFO1FBQ2xFLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsV0FBVyxLQUFLLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUN4RyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxF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QyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLFlBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCO1NBQ2pDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsdUJBQXVCLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL3JlZmVyZW5jZSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5cbmNvbnN0IF9zZWxmID0ge1xuICBmaW5kSW1wb3J0UmVsYXRpb25zOiAoXG4gICAgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQgfCB0cy5WYXJpYWJsZURlY2xhcmF0aW9uLFxuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gICk6IFJlZmVyZW5jZVtdID0+IHtcbiAgICBpZiAoaW1wb3J0UGFyc2VSZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdXG4gICAgcmV0dXJuIGltcG9ydFBhcnNlUmVzdWx0c1xuICAgICAgLm1hcCgoaW1wb3J0UGFyc2VSZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKCFfc2VsZi5maW5kSWRlbnRpZmllcihpbXBvcnRQYXJzZVJlc3VsdC5uYW1lLCBzdGF0ZW1lbnQpKSByZXR1cm5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWZlcmVuY2Uoe1xuICAgICAgICAgIG5hbWU6IGltcG9ydFBhcnNlUmVzdWx0Lm5hbWUsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogaW1wb3J0UGFyc2VSZXN1bHQuaW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgICB0eXBlOiBSZWZlcmVuY2VUeXBlLkFTU09DSUFUSU9OLFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVmZXJlbmNlW11cbiAgfSxcblxuICBmaW5kSWRlbnRpZmllcjogKGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKHN0YXRlbWVudC5raW5kID09PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIgJiYgc3RhdGVtZW50LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSkgcmV0dXJuIHRydWVcbiAgICBpZiAoIV9zZWxmLmlzRGVjbGFyYXRpb24oc3RhdGVtZW50KSAmJiBzdGF0ZW1lbnQubmFtZT8uZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lKSByZXR1cm4gdHJ1ZVxuICAgIGlmIChzdGF0ZW1lbnQuZXhwcmVzc2lvbj8ucmlnaHQgJiYgc3RhdGVtZW50LmV4cHJlc3Npb24ucmlnaHQuZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lKSByZXR1cm4gdHJ1ZVxuICAgIGlmIChcbiAgICAgIChzdGF0ZW1lbnQuZGVjbGFyYXRpb25zID8/IFtdKS5sZW5ndGggPiAwICYmXG4gICAgICBzdGF0ZW1lbnQuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQuaW5pdGlhbGl6ZXI/LmVzY2FwZWRUZXh0ID09PSBpZGVudGlmaWVyTmFtZSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgX3NlbGYuc3RlcEludG9Ob2RlKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFtcbiAgICAgICAgJ2JvZHknLFxuICAgICAgICAndGhlblN0YXRlbWVudCcsXG4gICAgICAgICdlbHNlU3RhdGVtZW50JyxcbiAgICAgICAgJ2V4cHJlc3Npb24nLFxuICAgICAgICAnZGVjbGFyYXRpb25MaXN0JyxcbiAgICAgICAgJ2Nhc2VCbG9jaycsXG4gICAgICAgICdpbml0aWFsaXplcicsXG4gICAgICBdKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKF9zZWxmLnN0ZXBJbnRvQXJyYXkoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudCwgWydzdGF0ZW1lbnRzJywgJ21lbWJlcnMnLCAnY2xhdXNlcycsICdwcm9wZXJ0aWVzJ10pKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9LFxuXG4gIHN0ZXBJbnRvTm9kZTogKGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55LCBibG9ja05hbWVzOiBzdHJpbmdbXSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAhIWJsb2NrTmFtZXMuZmluZCgoYmxvY2spID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZW1lbnRbYmxvY2tdICYmIF9zZWxmLmZpbmRJZGVudGlmaWVyKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnRbYmxvY2tdKVxuICAgIH0pXG4gIH0sXG4gIHN0ZXBJbnRvQXJyYXk6IChpZGVudGlmaWVyTmFtZTogc3RyaW5nLCBzdGF0ZW1lbnQ6IGFueSwgYmxvY2tOYW1lczogc3RyaW5nW10pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gISFibG9ja05hbWVzLmZpbmQoKGJsb2NrKSA9PiB7XG4gICAgICByZXR1cm4gKHN0YXRlbWVudFtibG9ja10gPz8gW10pLmxlbmd0aCA+IDAgJiYgc3RhdGVtZW50W2Jsb2NrXS5maW5kKChiKSA9PiBfc2VsZi5maW5kSWRlbnRpZmllcihpZGVudGlmaWVyTmFtZSwgYikpXG4gICAgfSlcbiAgfSxcblxuICBpc0RlY2xhcmF0aW9uOiAoc3RhdGVtZW50OiBhbnkpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgdHMuU3ludGF4S2luZC5NZXJnZURlY2xhcmF0aW9uTWFya2VyLFxuICAgICAgdHMuU3ludGF4S2luZC5FbmRPZkRlY2xhcmF0aW9uTWFya2VyLFxuICAgICAgdHMuU3ludGF4S2luZC5Qcm9wZXJ0eURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5NZXRob2REZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QsXG4gICAgICB0cy5TeW50YXhLaW5kLkZ1bmN0aW9uRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkludGVyZmFjZURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuRW51bURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5Nb2R1bGVEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuTmFtZXNwYWNlRXhwb3J0RGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkltcG9ydEVxdWFsc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuRXhwb3J0RGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLk1pc3NpbmdEZWNsYXJhdGlvbixcbiAgICBdLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKVxuICB9LFxufVxuZXhwb3J0IGNvbnN0IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zID0gX3NlbGZcbiJdfQ==