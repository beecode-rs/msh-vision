"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptParserEntityService = void 0;
const entity_1 = require("src/model/entity");
const file_service_1 = require("src/service/file-service");
const typescript_parser_1 = require("typescript-parser");
exports.typescriptParserEntityService = {
    extractEntities: ({ file, filePath }) => {
        const entities = [];
        entities.push(...file.declarations
            .filter((d) => d.isExported)
            .map((d) => new entity_1.Entity({ filePath, name: d.name }, exports.typescriptParserEntityService.typeFromInstance(d))));
        if (entities.length === 0)
            entities.push(new entity_1.Entity({ filePath, name: file_service_1.fileService.fileNameFromPath(filePath) }));
        return entities;
    },
    typeFromInstance: (instance) => {
        if (instance instanceof typescript_parser_1.ClassDeclaration)
            return entity_1.EntityType.CLASS;
        if (instance instanceof typescript_parser_1.TypeAliasDeclaration)
            return entity_1.EntityType.TYPE;
        // if (instance instanceof AccessorDeclaration) return EntityType.
        // if (instance instanceof ConstructorDeclaration) return EntityType.
        // if (instance instanceof DeclarationInfo) return EntityType.
        // if (instance instanceof DeclarationVisibility) return EntityType.
        // if (instance instanceof DefaultDeclaration) return EntityType.
        // if (instance instanceof EnumDeclaration) return EntityType.
        // if (instance instanceof FunctionDeclaration) return EntityType.
        // if (instance instanceof InterfaceDeclaration) return EntityType.
        // if (instance instanceof MethodDeclaration) return EntityType.
        // if (instance instanceof ModuleDeclaration) return EntityType.
        // if (instance instanceof ParameterDeclaration) return EntityType.
        // if (instance instanceof PropertyDeclaration) return EntityType.
        // if (instance instanceof VariableDeclaration) return EntityType.
        return entity_1.EntityType.OBJECT;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC1wYXJzZXItZW50aXR5LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3R5cGVzY3JpcHQtcGFyc2VyL3R5cGVzY3JpcHQtcGFyc2VyLWVudGl0eS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFxRDtBQUNyRCwyREFBc0Q7QUFDdEQseURBQWdGO0FBRW5FLFFBQUEsNkJBQTZCLEdBQUc7SUFDM0MsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFvQyxFQUFZLEVBQUU7UUFDbEYsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFBO1FBRTdCLFFBQVEsQ0FBQyxJQUFJLENBQ1gsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7YUFDaEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLHFDQUE2QixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDekcsQ0FBQTtRQUVELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsMEJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNoSCxPQUFPLFFBQVEsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFhLEVBQWMsRUFBRTtRQUM5QyxJQUFJLFFBQVEsWUFBWSxvQ0FBZ0I7WUFBRSxPQUFPLG1CQUFVLENBQUMsS0FBSyxDQUFBO1FBQ2pFLElBQUksUUFBUSxZQUFZLHdDQUFvQjtZQUFFLE9BQU8sbUJBQVUsQ0FBQyxJQUFJLENBQUE7UUFFcEUsa0VBQWtFO1FBQ2xFLHFFQUFxRTtRQUNyRSw4REFBOEQ7UUFDOUQsb0VBQW9FO1FBQ3BFLGlFQUFpRTtRQUNqRSw4REFBOEQ7UUFDOUQsa0VBQWtFO1FBQ2xFLG1FQUFtRTtRQUNuRSxnRUFBZ0U7UUFDaEUsZ0VBQWdFO1FBQ2hFLG1FQUFtRTtRQUNuRSxrRUFBa0U7UUFDbEUsa0VBQWtFO1FBRWxFLE9BQU8sbUJBQVUsQ0FBQyxNQUFNLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIEVudGl0eVR5cGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBDbGFzc0RlY2xhcmF0aW9uLCBGaWxlLCBUeXBlQWxpYXNEZWNsYXJhdGlvbiB9IGZyb20gJ3R5cGVzY3JpcHQtcGFyc2VyJ1xuXG5leHBvcnQgY29uc3QgdHlwZXNjcmlwdFBhcnNlckVudGl0eVNlcnZpY2UgPSB7XG4gIGV4dHJhY3RFbnRpdGllczogKHsgZmlsZSwgZmlsZVBhdGggfTogeyBmaWxlOiBGaWxlOyBmaWxlUGF0aDogc3RyaW5nIH0pOiBFbnRpdHlbXSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXM6IEVudGl0eVtdID0gW11cblxuICAgIGVudGl0aWVzLnB1c2goXG4gICAgICAuLi5maWxlLmRlY2xhcmF0aW9uc1xuICAgICAgICAuZmlsdGVyKChkOiBhbnkpID0+IGQuaXNFeHBvcnRlZClcbiAgICAgICAgLm1hcCgoZCkgPT4gbmV3IEVudGl0eSh7IGZpbGVQYXRoLCBuYW1lOiBkLm5hbWUgfSwgdHlwZXNjcmlwdFBhcnNlckVudGl0eVNlcnZpY2UudHlwZUZyb21JbnN0YW5jZShkKSkpXG4gICAgKVxuXG4gICAgaWYgKGVudGl0aWVzLmxlbmd0aCA9PT0gMCkgZW50aXRpZXMucHVzaChuZXcgRW50aXR5KHsgZmlsZVBhdGgsIG5hbWU6IGZpbGVTZXJ2aWNlLmZpbGVOYW1lRnJvbVBhdGgoZmlsZVBhdGgpIH0pKVxuICAgIHJldHVybiBlbnRpdGllc1xuICB9LFxuICB0eXBlRnJvbUluc3RhbmNlOiAoaW5zdGFuY2U6IGFueSk6IEVudGl0eVR5cGUgPT4ge1xuICAgIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIENsYXNzRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLkNMQVNTXG4gICAgaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgVHlwZUFsaWFzRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlRZUEVcblxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIEFjY2Vzc29yRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIERlY2xhcmF0aW9uSW5mbykgcmV0dXJuIEVudGl0eVR5cGUuXG4gICAgLy8gaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgRGVjbGFyYXRpb25WaXNpYmlsaXR5KSByZXR1cm4gRW50aXR5VHlwZS5cbiAgICAvLyBpZiAoaW5zdGFuY2UgaW5zdGFuY2VvZiBEZWZhdWx0RGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIEVudW1EZWNsYXJhdGlvbikgcmV0dXJuIEVudGl0eVR5cGUuXG4gICAgLy8gaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgRnVuY3Rpb25EZWNsYXJhdGlvbikgcmV0dXJuIEVudGl0eVR5cGUuXG4gICAgLy8gaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgSW50ZXJmYWNlRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIE1ldGhvZERlY2xhcmF0aW9uKSByZXR1cm4gRW50aXR5VHlwZS5cbiAgICAvLyBpZiAoaW5zdGFuY2UgaW5zdGFuY2VvZiBNb2R1bGVEZWNsYXJhdGlvbikgcmV0dXJuIEVudGl0eVR5cGUuXG4gICAgLy8gaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgUGFyYW1ldGVyRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIFByb3BlcnR5RGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuICAgIC8vIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIFZhcmlhYmxlRGVjbGFyYXRpb24pIHJldHVybiBFbnRpdHlUeXBlLlxuXG4gICAgcmV0dXJuIEVudGl0eVR5cGUuT0JKRUNUXG4gIH0sXG59XG4iXX0=