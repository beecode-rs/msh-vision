"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserService = void 0;
const ts_1 = __importDefault(require("src/module/ts"));
exports.tsParserService = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1REFBOEI7QUFFakIsUUFBQSxlQUFlLEdBQUc7SUFDN0IsVUFBVSxFQUFFLENBQUMsU0FBNkIsRUFBVyxFQUFFO1FBQ3JELElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUE7UUFDNUIsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFDRCx5QkFBeUIsRUFBRSxDQUFDLFdBQWdDLEVBQVksRUFBRTtRQUN4RSxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDdEUsQ0FBQztJQUNELHdCQUF3QixFQUFFLENBQ3hCLGVBQTJDLEVBQ3dCLEVBQUU7UUFDckUsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZO1lBQUUsT0FBTTtRQUMxQyxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTTtRQUNqQixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuXG5leHBvcnQgY29uc3QgdHNQYXJzZXJTZXJ2aWNlID0ge1xuICBpc0V4cG9ydGVkOiAobW9kaWZpZXJzPzogdHMuTW9kaWZpZXJzQXJyYXkpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIW1vZGlmaWVycykgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuICEhbW9kaWZpZXJzLmZpbmQoKG0pID0+IG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5FeHBvcnRLZXl3b3JkKVxuICB9LFxuICBwcm9wZXJ0aWVzRnJvbUluaXRpYWxpemVyOiAoaW5pdGlhbGl6ZXI6IHRzLkV4cHJlc3Npb24gfCBhbnkpOiBzdHJpbmdbXSA9PiB7XG4gICAgcmV0dXJuIChpbml0aWFsaXplci5wcm9wZXJ0aWVzID8/IFtdKS5tYXAoKHApID0+IHAubmFtZS5lc2NhcGVkVGV4dClcbiAgfSxcbiAgbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0OiAoXG4gICAgZGVjbGFyYXRpb25MaXN0OiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdFxuICApOiB7IG5hbWU6IHN0cmluZzsgZGVjbGFyYXRpb246IHRzLlZhcmlhYmxlRGVjbGFyYXRpb24gfSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgaWYgKCFkZWNsYXJhdGlvbkxpc3Q/LmRlY2xhcmF0aW9ucykgcmV0dXJuXG4gICAgY29uc3QgZGVjbCA9IGRlY2xhcmF0aW9uTGlzdC5kZWNsYXJhdGlvbnMuZmluZCgoZCkgPT4gZC5uYW1lKVxuICAgIGlmICghZGVjbCkgcmV0dXJuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IGRlY2wubmFtZVsnZXNjYXBlZFRleHQnXSxcbiAgICAgIGRlY2xhcmF0aW9uOiBkZWNsLFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==