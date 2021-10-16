"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserService = void 0;
const ts_1 = __importDefault(require("src/module/ts"));
const self = {
    isExported: (modifiers) => {
        if (!modifiers)
            return false;
        return !!modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.ExportKeyword);
    },
    propertiesFromInitializer: (initializer) => {
        return (initializer.properties ?? []).map((p) => p.name.escapedText);
    },
    nameFromDeclarationsList: (declarationList) => {
        if (!declarationList?.declarations)
            return;
        const decl = declarationList.declarations.find((d) => d.name);
        if (!decl)
            return;
        return {
            name: decl.name['escapedText'],
            declaration: decl,
        };
    },
    checkIfThereAreAnyExports: ({ parsedSource }) => {
        return !!parsedSource.statements.find((s) => self._isViableExportableStatementKind(s.kind) && self.isExported(s.modifiers));
    },
    _isViableExportableStatementKind: (kind) => {
        return [
            ts_1.default.SyntaxKind.TypeAliasDeclaration,
            ts_1.default.SyntaxKind.ClassDeclaration,
            ts_1.default.SyntaxKind.InterfaceDeclaration,
            ts_1.default.SyntaxKind.VariableDeclaration,
            ts_1.default.SyntaxKind.VariableStatement,
            ts_1.default.SyntaxKind.VariableDeclarationList,
        ].includes(kind);
    },
};
exports.tsParserService = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVEQUE4QjtBQUU5QixNQUFNLElBQUksR0FBRztJQUNYLFVBQVUsRUFBRSxDQUFDLFNBQTZCLEVBQVcsRUFBRTtRQUNyRCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFBO1FBQzVCLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN4RSxDQUFDO0lBQ0QseUJBQXlCLEVBQUUsQ0FBQyxXQUFnQyxFQUFZLEVBQUU7UUFDeEUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3RFLENBQUM7SUFDRCx3QkFBd0IsRUFBRSxDQUN4QixlQUEyQyxFQUN3QixFQUFFO1FBQ3JFLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWTtZQUFFLE9BQU07UUFDMUMsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU07UUFDakIsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFBO0lBQ0gsQ0FBQztJQUNELHlCQUF5QixFQUFFLENBQUMsRUFBRSxZQUFZLEVBQW1DLEVBQVcsRUFBRTtRQUN4RixPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBQzdILENBQUM7SUFDRCxnQ0FBZ0MsRUFBRSxDQUFDLElBQVksRUFBVyxFQUFFO1FBQzFELE9BQU87WUFDTCxZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtZQUNsQyxZQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtZQUM5QixZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtZQUNsQyxZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQjtZQUNqQyxZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUMvQixZQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtTQUN0QyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQixDQUFDO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFHLElBQUksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuXG5jb25zdCBzZWxmID0ge1xuICBpc0V4cG9ydGVkOiAobW9kaWZpZXJzPzogdHMuTW9kaWZpZXJzQXJyYXkpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIW1vZGlmaWVycykgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuICEhbW9kaWZpZXJzLmZpbmQoKG0pID0+IG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5FeHBvcnRLZXl3b3JkKVxuICB9LFxuICBwcm9wZXJ0aWVzRnJvbUluaXRpYWxpemVyOiAoaW5pdGlhbGl6ZXI6IHRzLkV4cHJlc3Npb24gfCBhbnkpOiBzdHJpbmdbXSA9PiB7XG4gICAgcmV0dXJuIChpbml0aWFsaXplci5wcm9wZXJ0aWVzID8/IFtdKS5tYXAoKHApID0+IHAubmFtZS5lc2NhcGVkVGV4dClcbiAgfSxcbiAgbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0OiAoXG4gICAgZGVjbGFyYXRpb25MaXN0OiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdFxuICApOiB7IG5hbWU6IHN0cmluZzsgZGVjbGFyYXRpb246IHRzLlZhcmlhYmxlRGVjbGFyYXRpb24gfSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgaWYgKCFkZWNsYXJhdGlvbkxpc3Q/LmRlY2xhcmF0aW9ucykgcmV0dXJuXG4gICAgY29uc3QgZGVjbCA9IGRlY2xhcmF0aW9uTGlzdC5kZWNsYXJhdGlvbnMuZmluZCgoZCkgPT4gZC5uYW1lKVxuICAgIGlmICghZGVjbCkgcmV0dXJuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IGRlY2wubmFtZVsnZXNjYXBlZFRleHQnXSxcbiAgICAgIGRlY2xhcmF0aW9uOiBkZWNsLFxuICAgIH1cbiAgfSxcbiAgY2hlY2tJZlRoZXJlQXJlQW55RXhwb3J0czogKHsgcGFyc2VkU291cmNlIH06IHsgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlIH0pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gISFwYXJzZWRTb3VyY2Uuc3RhdGVtZW50cy5maW5kKChzKSA9PiBzZWxmLl9pc1ZpYWJsZUV4cG9ydGFibGVTdGF0ZW1lbnRLaW5kKHMua2luZCkgJiYgc2VsZi5pc0V4cG9ydGVkKHMubW9kaWZpZXJzKSlcbiAgfSxcbiAgX2lzVmlhYmxlRXhwb3J0YWJsZVN0YXRlbWVudEtpbmQ6IChraW5kOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb24sXG4gICAgICB0cy5TeW50YXhLaW5kLlZhcmlhYmxlU3RhdGVtZW50LFxuICAgICAgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdCxcbiAgICBdLmluY2x1ZGVzKGtpbmQpXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCB0c1BhcnNlclNlcnZpY2UgPSBzZWxmXG4iXX0=