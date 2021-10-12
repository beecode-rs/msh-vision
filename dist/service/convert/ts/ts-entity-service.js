"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsEntityService = void 0;
const entity_1 = require("src/model/entity");
const typescript_1 = __importDefault(require("typescript"));
exports.tsEntityService = {
    extractEntities: ({ node, filePath }) => {
        // const entities: Entity[] = []
        const entities = node.statements
            .map((s) => exports.tsEntityService._returnEntityByKind(typescript_1.default.SyntaxKind[s.kind], s, filePath))
            .filter(Boolean);
        return entities;
    },
    _returnEntityByKind: (kind, nodeObject, filePath) => {
        switch (kind) {
            case 'ImportDeclaration':
                break;
            case 'TypeAliasDeclaration':
                return new entity_1.Entity({ filePath, name: nodeObject.name.escapedText }, entity_1.EntityType.TYPE);
        }
        return undefined;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLWVudGl0eS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZDQUFxRDtBQUNyRCw0REFBMkI7QUFFZCxRQUFBLGVBQWUsR0FBRztJQUM3QixlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQTZDLEVBQVksRUFBRTtRQUMzRixnQ0FBZ0M7UUFFaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyx1QkFBZSxDQUFDLG1CQUFtQixDQUFDLG9CQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDbkYsTUFBTSxDQUFDLE9BQU8sQ0FBYSxDQUFBO1FBRTlCLE9BQU8sUUFBUSxDQUFBO0lBQ2pCLENBQUM7SUFDRCxtQkFBbUIsRUFBRSxDQUFDLElBQVksRUFBRSxVQUF5QixFQUFFLFFBQWdCLEVBQXNCLEVBQUU7UUFDckcsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLG1CQUFtQjtnQkFDdEIsTUFBSztZQUNQLEtBQUssc0JBQXNCO2dCQUN6QixPQUFPLElBQUksZUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdEY7UUFDRCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSwgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgdHMgZnJvbSAndHlwZXNjcmlwdCdcblxuZXhwb3J0IGNvbnN0IHRzRW50aXR5U2VydmljZSA9IHtcbiAgZXh0cmFjdEVudGl0aWVzOiAoeyBub2RlLCBmaWxlUGF0aCB9OiB7IG5vZGU6IHRzLlNvdXJjZUZpbGU7IGZpbGVQYXRoOiBzdHJpbmcgfSk6IEVudGl0eVtdID0+IHtcbiAgICAvLyBjb25zdCBlbnRpdGllczogRW50aXR5W10gPSBbXVxuXG4gICAgY29uc3QgZW50aXRpZXMgPSBub2RlLnN0YXRlbWVudHNcbiAgICAgIC5tYXAoKHMpID0+IHRzRW50aXR5U2VydmljZS5fcmV0dXJuRW50aXR5QnlLaW5kKHRzLlN5bnRheEtpbmRbcy5raW5kXSwgcywgZmlsZVBhdGgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBFbnRpdHlbXVxuXG4gICAgcmV0dXJuIGVudGl0aWVzXG4gIH0sXG4gIF9yZXR1cm5FbnRpdHlCeUtpbmQ6IChraW5kOiBzdHJpbmcsIG5vZGVPYmplY3Q6IHRzLk5vZGUgfCBhbnksIGZpbGVQYXRoOiBzdHJpbmcpOiBFbnRpdHkgfCB1bmRlZmluZWQgPT4ge1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSAnSW1wb3J0RGVjbGFyYXRpb24nOlxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnVHlwZUFsaWFzRGVjbGFyYXRpb24nOlxuICAgICAgICByZXR1cm4gbmV3IEVudGl0eSh7IGZpbGVQYXRoLCBuYW1lOiBub2RlT2JqZWN0Lm5hbWUuZXNjYXBlZFRleHQgfSwgRW50aXR5VHlwZS5UWVBFKVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH0sXG59XG4iXX0=