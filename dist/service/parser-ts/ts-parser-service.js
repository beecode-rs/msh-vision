"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserService = void 0;
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const reference_type_1 = require("src/enum/reference-type");
const reference_1 = require("src/model/reference");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_1 = require("src/service/parser-ts/parser/ts-parser-import");
const logger_1 = require("src/util/logger");
const _self = {
    isExported: (modifiers) => {
        if (!modifiers)
            return false;
        return !!modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.ExportKeyword);
    },
    isAbstract: (modifiers) => {
        if (!modifiers)
            return false;
        return !!modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.AbstractKeyword);
    },
    accessLevel: (modifiers) => {
        if (!modifiers)
            return property_access_level_type_1.PropertyAccessLevelType.NO_MODIFIER;
        if (modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.PublicKeyword))
            return property_access_level_type_1.PropertyAccessLevelType.PUBLIC;
        if (modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.PrivateKeyword))
            return property_access_level_type_1.PropertyAccessLevelType.PRIVATE;
        if (modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.ProtectedKeyword))
            return property_access_level_type_1.PropertyAccessLevelType.PROTECTED;
        return property_access_level_type_1.PropertyAccessLevelType.NO_MODIFIER;
    },
    checkIfThereAreAnyExports: (parsedSource) => {
        return !!parsedSource.statements.find((s) => _self._isViableExportableStatementKind(s.kind) && _self.isExported(s.modifiers));
    },
    _isViableExportableStatementKind: (kind) => {
        return [
            ts_1.default.SyntaxKind.TypeAliasDeclaration,
            ts_1.default.SyntaxKind.ClassDeclaration,
            ts_1.default.SyntaxKind.InterfaceDeclaration,
            ts_1.default.SyntaxKind.VariableDeclaration,
            ts_1.default.SyntaxKind.VariableStatement,
            ts_1.default.SyntaxKind.VariableDeclarationList,
            ts_1.default.SyntaxKind.EnumDeclaration,
        ].includes(kind);
    },
    findClassRelations: (params) => {
        const { statement, parsedSource, inProjectPath } = params;
        const extendImplements = (statement['heritageClauses'] ?? [])
            .map((heritage) => {
            const type = heritage.getText(parsedSource).split(' ')[0];
            return (heritage.types ?? []).map((t) => ({ type, name: t.expression.escapedText }));
        })
            .flat();
        if (extendImplements.length === 0)
            return [];
        const fileImports = parsedSource.statements
            .map((statement) => new ts_parser_import_1.TsParserImport({ statement, inProjectPath }).parse())
            .flat();
        return extendImplements
            .map((ei) => {
            const fileImport = fileImports.find((fi) => {
                return fi.name === ei.name;
            });
            if (!fileImport) {
                (0, logger_1.logger)().warn(`Import not found for ${JSON.stringify(ei)}`);
                return;
            }
            return new reference_1.Reference({
                name: ei.name,
                type: ei.type === 'implements' ? reference_type_1.ReferenceType.IMPLEMENTATION : reference_type_1.ReferenceType.INHERITANCE,
                inProjectPath: fileImport.inProjectPath,
            });
        })
            .filter(Boolean);
    },
    importsFromStatements: (params) => {
        const { parsedSource, inProjectPath } = params;
        return parsedSource.statements
            .map((statement) => _self.importsFromStatement({ statement, inProjectPath }))
            .filter(Boolean)
            .flat();
    },
    importsFromStatement: (params) => {
        const { statement, inProjectPath } = params;
        if (statement.kind != ts_1.default.SyntaxKind.ImportDeclaration)
            return [];
        return new ts_parser_import_1.TsParserImport({ statement, inProjectPath }).parse();
    },
    entityLinksFromStatements: (params) => {
        const { parsedSource, inProjectPath } = params;
        return parsedSource.statements
            .map((statement) => _self.entityLinksFromStatement({ statement, inProjectPath }))
            .filter(Boolean)
            .flat();
    },
    entityLinksFromStatement: (params) => {
        const { statement, inProjectPath } = params;
        if (!_self._isViableExportableStatementKind(statement.kind))
            return [];
        // TODO find a better solution to finding entity links
        if (statement['name'])
            return [{ name: statement['name'].escapedText, inProjectPath }];
        if (statement['declarationList'] && statement['declarationList'].declarations[0].name.escapedText)
            return [{ name: statement['declarationList'].declarations[0].name.escapedText, inProjectPath }];
        return [];
    },
};
exports.tsParserService = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQTZFO0FBQzdFLDREQUF1RDtBQUN2RCxtREFBK0M7QUFDL0MsdURBQThCO0FBQzlCLG9GQUF5RztBQUN6Ryw0Q0FBd0M7QUFFeEMsTUFBTSxLQUFLLEdBQUc7SUFDWixVQUFVLEVBQUUsQ0FBQyxTQUE2QixFQUFXLEVBQUU7UUFDckQsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUM1QixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUNELFVBQVUsRUFBRSxDQUFDLFNBQTZCLEVBQVcsRUFBRTtRQUNyRCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFBO1FBQzVCLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQUMsU0FBNkIsRUFBMkIsRUFBRTtRQUN0RSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sb0RBQXVCLENBQUMsV0FBVyxDQUFBO1FBQzFELElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUFFLE9BQU8sb0RBQXVCLENBQUMsTUFBTSxDQUFBO1FB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dmVsVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3Byb3BlcnR5LWFjY2Vzcy1sZXZlbC10eXBlJ1xuaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL3JlZmVyZW5jZSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnQsIFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHQgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmNvbnN0IF9zZWxmID0ge1xuICBpc0V4cG9ydGVkOiAobW9kaWZpZXJzPzogdHMuTW9kaWZpZXJzQXJyYXkpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIW1vZGlmaWVycykgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuICEhbW9kaWZpZXJzLmZpbmQoKG0pID0+IG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5FeHBvcnRLZXl3b3JkKVxuICB9LFxuICBpc0Fic3RyYWN0OiAobW9kaWZpZXJzPzogdHMuTW9kaWZpZXJzQXJyYXkpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIW1vZGlmaWVycykgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuICEhbW9kaWZpZXJzLmZpbmQoKG0pID0+IG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5BYnN0cmFjdEtleXdvcmQpXG4gIH0sXG4gIGFjY2Vzc0xldmVsOiAobW9kaWZpZXJzPzogdHMuTW9kaWZpZXJzQXJyYXkpOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSA9PiB7XG4gICAgaWYgKCFtb2RpZmllcnMpIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5OT19NT0RJRklFUlxuICAgIGlmIChtb2RpZmllcnMuZmluZCgobSkgPT4gbS5raW5kID09PSB0cy5TeW50YXhLaW5kLlB1YmxpY0tleXdvcmQpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDXG4gICAgaWYgKG1vZGlmaWVycy5maW5kKChtKSA9PiBtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuUHJpdmF0ZUtleXdvcmQpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJJVkFURVxuICAgIGlmIChtb2RpZmllcnMuZmluZCgobSkgPT4gbS5raW5kID09PSB0cy5TeW50YXhLaW5kLlByb3RlY3RlZEtleXdvcmQpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEXG4gICAgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLk5PX01PRElGSUVSXG4gIH0sXG4gIGNoZWNrSWZUaGVyZUFyZUFueUV4cG9ydHM6IChwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGUpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gISFwYXJzZWRTb3VyY2Uuc3RhdGVtZW50cy5maW5kKChzKSA9PiBfc2VsZi5faXNWaWFibGVFeHBvcnRhYmxlU3RhdGVtZW50S2luZChzLmtpbmQpICYmIF9zZWxmLmlzRXhwb3J0ZWQocy5tb2RpZmllcnMpKVxuICB9LFxuICBfaXNWaWFibGVFeHBvcnRhYmxlU3RhdGVtZW50S2luZDogKGtpbmQ6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQsXG4gICAgICB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0LFxuICAgICAgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb24sXG4gICAgXS5pbmNsdWRlcyhraW5kKVxuICB9LFxuICBmaW5kQ2xhc3NSZWxhdGlvbnM6IChwYXJhbXM6IHsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZTsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pOiBSZWZlcmVuY2VbXSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZW1lbnQsIHBhcnNlZFNvdXJjZSwgaW5Qcm9qZWN0UGF0aCB9ID0gcGFyYW1zXG4gICAgY29uc3QgZXh0ZW5kSW1wbGVtZW50cyA9IChzdGF0ZW1lbnRbJ2hlcml0YWdlQ2xhdXNlcyddID8/IFtdKVxuICAgICAgLm1hcCgoaGVyaXRhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGhlcml0YWdlLmdldFRleHQocGFyc2VkU291cmNlKS5zcGxpdCgnICcpWzBdXG4gICAgICAgIHJldHVybiAoaGVyaXRhZ2UudHlwZXMgPz8gW10pLm1hcCgodCkgPT4gKHsgdHlwZSwgbmFtZTogdC5leHByZXNzaW9uLmVzY2FwZWRUZXh0IH0pKVxuICAgICAgfSlcbiAgICAgIC5mbGF0KCkgYXMgeyB0eXBlOiAnaW1wbGVtZW50cycgfCAnZXh0ZW5kcyc7IG5hbWU6IHN0cmluZyB9W11cbiAgICBpZiAoZXh0ZW5kSW1wbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBbXVxuXG4gICAgY29uc3QgZmlsZUltcG9ydHMgPSBwYXJzZWRTb3VyY2Uuc3RhdGVtZW50c1xuICAgICAgLm1hcCgoc3RhdGVtZW50KSA9PiBuZXcgVHNQYXJzZXJJbXBvcnQoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSkucGFyc2UoKSlcbiAgICAgIC5mbGF0KClcblxuICAgIHJldHVybiBleHRlbmRJbXBsZW1lbnRzXG4gICAgICAubWFwKChlaSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSW1wb3J0ID0gZmlsZUltcG9ydHMuZmluZCgoZmkpID0+IHtcbiAgICAgICAgICByZXR1cm4gZmkubmFtZSA9PT0gZWkubmFtZVxuICAgICAgICB9KVxuICAgICAgICBpZiAoIWZpbGVJbXBvcnQpIHtcbiAgICAgICAgICBsb2dnZXIoKS53YXJuKGBJbXBvcnQgbm90IGZvdW5kIGZvciAke0pTT04uc3RyaW5naWZ5KGVpKX1gKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHtcbiAgICAgICAgICBuYW1lOiBlaS5uYW1lLFxuICAgICAgICAgIHR5cGU6IGVpLnR5cGUgPT09ICdpbXBsZW1lbnRzJyA/IFJlZmVyZW5jZVR5cGUuSU1QTEVNRU5UQVRJT04gOiBSZWZlcmVuY2VUeXBlLklOSEVSSVRBTkNFLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IGZpbGVJbXBvcnQuaW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlZmVyZW5jZVtdXG4gIH0sXG4gIGltcG9ydHNGcm9tU3RhdGVtZW50czogKHBhcmFtczogeyBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGU7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KTogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdID0+IHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgaW5Qcm9qZWN0UGF0aCB9ID0gcGFyYW1zXG4gICAgcmV0dXJuIHBhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzXG4gICAgICAubWFwKChzdGF0ZW1lbnQpID0+IF9zZWxmLmltcG9ydHNGcm9tU3RhdGVtZW50KHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmZsYXQoKVxuICB9LFxuICBpbXBvcnRzRnJvbVN0YXRlbWVudDogKHBhcmFtczogeyBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudDsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W10gPT4ge1xuICAgIGNvbnN0IHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0gPSBwYXJhbXNcbiAgICBpZiAoc3RhdGVtZW50LmtpbmQgIT0gdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbikgcmV0dXJuIFtdXG4gICAgcmV0dXJuIG5ldyBUc1BhcnNlckltcG9ydCh7IHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9KS5wYXJzZSgpXG4gIH0sXG4gIGVudGl0eUxpbmtzRnJvbVN0YXRlbWVudHM6IChwYXJhbXM6IHsgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlOyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSk6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXSA9PiB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHJldHVybiBwYXJzZWRTb3VyY2Uuc3RhdGVtZW50c1xuICAgICAgLm1hcCgoc3RhdGVtZW50KSA9PiBfc2VsZi5lbnRpdHlMaW5rc0Zyb21TdGF0ZW1lbnQoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuZmxhdCgpXG4gIH0sXG4gIGVudGl0eUxpbmtzRnJvbVN0YXRlbWVudDogKHBhcmFtczogeyBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudDsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W10gPT4ge1xuICAgIGNvbnN0IHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0gPSBwYXJhbXNcbiAgICBpZiAoIV9zZWxmLl9pc1ZpYWJsZUV4cG9ydGFibGVTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudC5raW5kKSkgcmV0dXJuIFtdXG5cbiAgICAvLyBUT0RPIGZpbmQgYSBiZXR0ZXIgc29sdXRpb24gdG8gZmluZGluZyBlbnRpdHkgbGlua3NcbiAgICBpZiAoc3RhdGVtZW50WyduYW1lJ10pIHJldHVybiBbeyBuYW1lOiBzdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dCwgaW5Qcm9qZWN0UGF0aCB9XVxuICAgIGlmIChzdGF0ZW1lbnRbJ2RlY2xhcmF0aW9uTGlzdCddICYmIHN0YXRlbWVudFsnZGVjbGFyYXRpb25MaXN0J10uZGVjbGFyYXRpb25zWzBdLm5hbWUuZXNjYXBlZFRleHQpXG4gICAgICByZXR1cm4gW3sgbmFtZTogc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXS5kZWNsYXJhdGlvbnNbMF0ubmFtZS5lc2NhcGVkVGV4dCwgaW5Qcm9qZWN0UGF0aCB9XVxuXG4gICAgcmV0dXJuIFtdXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCB0c1BhcnNlclNlcnZpY2UgPSBfc2VsZlxuIl19