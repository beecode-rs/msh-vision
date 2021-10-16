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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3N0YXRlbWVudC1lbnRpdHkvcGFyc2VyL3RzLXBhcnNlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVEQUE4QjtBQUVqQixRQUFBLGVBQWUsR0FBRztJQUM3QixVQUFVLEVBQUUsQ0FBQyxTQUE2QixFQUFXLEVBQUU7UUFDckQsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUM1QixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUNELHlCQUF5QixFQUFFLENBQUMsV0FBZ0MsRUFBWSxFQUFFO1FBQ3hFLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBQ0Qsd0JBQXdCLEVBQUUsQ0FDeEIsZUFBMkMsRUFDd0IsRUFBRTtRQUNyRSxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVk7WUFBRSxPQUFNO1FBQzFDLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0QsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFNO1FBQ2pCLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5cbmV4cG9ydCBjb25zdCB0c1BhcnNlclNlcnZpY2UgPSB7XG4gIGlzRXhwb3J0ZWQ6IChtb2RpZmllcnM/OiB0cy5Nb2RpZmllcnNBcnJheSk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghbW9kaWZpZXJzKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gISFtb2RpZmllcnMuZmluZCgobSkgPT4gbS5raW5kID09PSB0cy5TeW50YXhLaW5kLkV4cG9ydEtleXdvcmQpXG4gIH0sXG4gIHByb3BlcnRpZXNGcm9tSW5pdGlhbGl6ZXI6IChpbml0aWFsaXplcjogdHMuRXhwcmVzc2lvbiB8IGFueSk6IHN0cmluZ1tdID0+IHtcbiAgICByZXR1cm4gKGluaXRpYWxpemVyLnByb3BlcnRpZXMgPz8gW10pLm1hcCgocCkgPT4gcC5uYW1lLmVzY2FwZWRUZXh0KVxuICB9LFxuICBuYW1lRnJvbURlY2xhcmF0aW9uc0xpc3Q6IChcbiAgICBkZWNsYXJhdGlvbkxpc3Q6IHRzLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0XG4gICk6IHsgbmFtZTogc3RyaW5nOyBkZWNsYXJhdGlvbjogdHMuVmFyaWFibGVEZWNsYXJhdGlvbiB9IHwgdW5kZWZpbmVkID0+IHtcbiAgICBpZiAoIWRlY2xhcmF0aW9uTGlzdD8uZGVjbGFyYXRpb25zKSByZXR1cm5cbiAgICBjb25zdCBkZWNsID0gZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9ucy5maW5kKChkKSA9PiBkLm5hbWUpXG4gICAgaWYgKCFkZWNsKSByZXR1cm5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogZGVjbC5uYW1lWydlc2NhcGVkVGV4dCddLFxuICAgICAgZGVjbGFyYXRpb246IGRlY2wsXG4gICAgfVxuICB9LFxufVxuIl19