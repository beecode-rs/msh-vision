"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserImportRelations = void 0;
const reference_type_1 = require("src/enum/reference-type");
const ts_1 = __importDefault(require("src/module/ts"));
const reference_1 = require("src/service/model/reference");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0LXRzL3RzLXBhcnNlci1pbXBvcnQtcmVsYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUF1RDtBQUN2RCx1REFBOEI7QUFFOUIsMkRBQXVEO0FBRXZELE1BQU0sS0FBSyxHQUFHO0lBQ1osbUJBQW1CLEVBQUUsQ0FDbkIsU0FBZ0QsRUFDaEQsa0JBQStDLEVBQ2xDLEVBQUU7UUFDZixJQUFJLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDOUMsT0FBTyxrQkFBa0I7YUFDdEIsR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2dCQUFFLE9BQU07WUFDcEUsT0FBTyxJQUFJLHFCQUFTLENBQUM7Z0JBQ25CLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsYUFBYTtnQkFDOUMsSUFBSSxFQUFFLDhCQUFhLENBQUMsV0FBVzthQUNoQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUM7YUFDRCxNQUFNLENBQUMsT0FBTyxDQUFnQixDQUFBO0lBQ25DLENBQUM7SUFFRCxjQUFjLEVBQUUsQ0FBQyxjQUFzQixFQUFFLFNBQWMsRUFBVyxFQUFFO1FBQ2xFLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsV0FBVyxLQUFLLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUN4RyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFF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RSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDakMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsWUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDakMsWUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7WUFDckMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDakMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7WUFDOUIsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0I7WUFDbEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0I7WUFDbEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlO1lBQzdCLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLFlBQUUsQ0FBQyxVQUFVLENBQUMsMEJBQTBCO1lBQ3hDLFlBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO1lBQ3JDLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQy9CLFlBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCO1NBQ2pDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsdUJBQXVCLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL21vZGVsL3JlZmVyZW5jZSdcblxuY29uc3QgX3NlbGYgPSB7XG4gIGZpbmRJbXBvcnRSZWxhdGlvbnM6IChcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCB8IHRzLlZhcmlhYmxlRGVjbGFyYXRpb24sXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgKTogUmVmZXJlbmNlW10gPT4ge1xuICAgIGlmIChpbXBvcnRQYXJzZVJlc3VsdHMubGVuZ3RoID09PSAwKSByZXR1cm4gW11cbiAgICByZXR1cm4gaW1wb3J0UGFyc2VSZXN1bHRzXG4gICAgICAubWFwKChpbXBvcnRQYXJzZVJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoIV9zZWxmLmZpbmRJZGVudGlmaWVyKGltcG9ydFBhcnNlUmVzdWx0Lm5hbWUsIHN0YXRlbWVudCkpIHJldHVyblxuICAgICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZSh7XG4gICAgICAgICAgbmFtZTogaW1wb3J0UGFyc2VSZXN1bHQubmFtZSxcbiAgICAgICAgICBpblByb2plY3RQYXRoOiBpbXBvcnRQYXJzZVJlc3VsdC5pblByb2plY3RQYXRoLFxuICAgICAgICAgIHR5cGU6IFJlZmVyZW5jZVR5cGUuQVNTT0NJQVRJT04sXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZWZlcmVuY2VbXVxuICB9LFxuXG4gIGZpbmRJZGVudGlmaWVyOiAoaWRlbnRpZmllck5hbWU6IHN0cmluZywgc3RhdGVtZW50OiBhbnkpOiBib29sZWFuID0+IHtcbiAgICBpZiAoc3RhdGVtZW50LmtpbmQgPT09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllciAmJiBzdGF0ZW1lbnQuZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lKSByZXR1cm4gdHJ1ZVxuICAgIGlmICghX3NlbGYuaXNEZWNsYXJhdGlvbihzdGF0ZW1lbnQpICYmIHN0YXRlbWVudC5uYW1lPy5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpIHJldHVybiB0cnVlXG4gICAgLy8gaWYgKHN0YXRlbWVudC5leHByZXNzaW9uPy5yaWdodCAmJiBzdGF0ZW1lbnQuZXhwcmVzc2lvbi5yaWdodC5lc2NhcGVkVGV4dCA9PT0gaWRlbnRpZmllck5hbWUpIHJldHVybiB0cnVlXG4gICAgLy8gaWYgKFxuICAgIC8vICAgKHN0YXRlbWVudC5kZWNsYXJhdGlvbnMgPz8gW10pLmxlbmd0aCA+IDAgJiZcbiAgICAvLyAgIHN0YXRlbWVudC5kZWNsYXJhdGlvbnMuZmluZCgoZCkgPT4gZC5pbml0aWFsaXplcj8uZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lKVxuICAgIC8vICkge1xuICAgIC8vICAgcmV0dXJuIHRydWVcbiAgICAvLyB9XG5cbiAgICBpZiAoXG4gICAgICBbdHMuU3ludGF4S2luZC5UeXBlTGl0ZXJhbCwgdHMuU3ludGF4S2luZC5UeXBlUmVmZXJlbmNlXS5pbmNsdWRlcyhzdGF0ZW1lbnQua2luZCkgJiZcbiAgICAgIHN0YXRlbWVudC50eXBlTmFtZT8uZXNjYXBlZFRleHQgPT09IGlkZW50aWZpZXJOYW1lXG4gICAgKVxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGlmIChcbiAgICAgIF9zZWxmLnN0ZXBJbnRvTm9kZShpZGVudGlmaWVyTmFtZSwgc3RhdGVtZW50LCBbXG4gICAgICAgICdib2R5JyxcbiAgICAgICAgJ3RoZW5TdGF0ZW1lbnQnLFxuICAgICAgICAnZWxzZVN0YXRlbWVudCcsXG4gICAgICAgICdleHByZXNzaW9uJyxcbiAgICAgICAgJ2RlY2xhcmF0aW9uTGlzdCcsXG4gICAgICAgICdjYXNlQmxvY2snLFxuICAgICAgICAnaW5pdGlhbGl6ZXInLFxuICAgICAgICAndHlwZScsXG4gICAgICAgICdyaWdodCcsXG4gICAgICAgICd0cnlCbG9jaycsXG4gICAgICAgICdjYXRjaENsYXVzZScsXG4gICAgICAgICdmaW5hbGx5QmxvY2snLFxuICAgICAgICAnYmxvY2snLFxuICAgICAgXSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmIChcbiAgICAgIF9zZWxmLnN0ZXBJbnRvQXJyYXkoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudCwgW1xuICAgICAgICAnc3RhdGVtZW50cycsXG4gICAgICAgICdtZW1iZXJzJyxcbiAgICAgICAgJ2NsYXVzZXMnLFxuICAgICAgICAncHJvcGVydGllcycsXG4gICAgICAgICdwYXJhbWV0ZXJzJyxcbiAgICAgICAgJ2RlY2xhcmF0aW9ucycsXG4gICAgICAgICdhcmd1bWVudHMnLFxuICAgICAgICAndHlwZUFyZ3VtZW50cycsXG4gICAgICBdKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBbdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbiwgdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbl0uaW5jbHVkZXMoc3RhdGVtZW50LmtpbmQpICYmXG4gICAgICBfc2VsZi5zdGVwSW50b0FycmF5KGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnQsIFsnYXJndW1lbnRzJ10pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChbdHMuU3ludGF4S2luZC5Db25zdHJ1Y3Rvcl0uaW5jbHVkZXMoc3RhdGVtZW50LmtpbmQpICYmIF9zZWxmLnN0ZXBJbnRvQXJyYXkoaWRlbnRpZmllck5hbWUsIHN0YXRlbWVudCwgWydwYXJhbWV0ZXJzJ10pKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9LFxuXG4gIHN0ZXBJbnRvTm9kZTogKGlkZW50aWZpZXJOYW1lOiBzdHJpbmcsIHN0YXRlbWVudDogYW55LCBibG9ja05hbWVzOiBzdHJpbmdbXSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAhIWJsb2NrTmFtZXMuZmluZCgoYmxvY2spID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZW1lbnRbYmxvY2tdICYmIF9zZWxmLmZpbmRJZGVudGlmaWVyKGlkZW50aWZpZXJOYW1lLCBzdGF0ZW1lbnRbYmxvY2tdKVxuICAgIH0pXG4gIH0sXG4gIHN0ZXBJbnRvQXJyYXk6IChpZGVudGlmaWVyTmFtZTogc3RyaW5nLCBzdGF0ZW1lbnQ6IGFueSwgYmxvY2tOYW1lczogc3RyaW5nW10pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gISFibG9ja05hbWVzLmZpbmQoKGJsb2NrKSA9PiB7XG4gICAgICByZXR1cm4gKHN0YXRlbWVudFtibG9ja10gPz8gW10pLmxlbmd0aCA+IDAgJiYgc3RhdGVtZW50W2Jsb2NrXS5maW5kKChiKSA9PiBfc2VsZi5maW5kSWRlbnRpZmllcihpZGVudGlmaWVyTmFtZSwgYikpXG4gICAgfSlcbiAgfSxcblxuICBpc0RlY2xhcmF0aW9uOiAoc3RhdGVtZW50OiBhbnkpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgdHMuU3ludGF4S2luZC5NZXJnZURlY2xhcmF0aW9uTWFya2VyLFxuICAgICAgdHMuU3ludGF4S2luZC5FbmRPZkRlY2xhcmF0aW9uTWFya2VyLFxuICAgICAgdHMuU3ludGF4S2luZC5Qcm9wZXJ0eURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5NZXRob2REZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QsXG4gICAgICB0cy5TeW50YXhLaW5kLkZ1bmN0aW9uRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkludGVyZmFjZURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuRW51bURlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5Nb2R1bGVEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuTmFtZXNwYWNlRXhwb3J0RGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLkltcG9ydEVxdWFsc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuRXhwb3J0RGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLk1pc3NpbmdEZWNsYXJhdGlvbixcbiAgICBdLmluY2x1ZGVzKHN0YXRlbWVudC5raW5kKVxuICB9LFxufVxuZXhwb3J0IGNvbnN0IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zID0gX3NlbGZcbiJdfQ==