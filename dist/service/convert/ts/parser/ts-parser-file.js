"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserFile = void 0;
const entity_file_1 = require("src/model/entity-file");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_1 = require("src/service/convert/ts/parser/ts-parser-import");
class TsParserFile {
    constructor(params) {
        const { parsedSource, inProjectPath, fileName } = params;
        this._parsedSource = parsedSource;
        this._inProjectPath = inProjectPath;
        this._fileName = fileName;
    }
    parse() {
        const entityFile = new entity_file_1.EntityFile({
            name: this._fileName,
            inProjectPath: this._inProjectPath,
        });
        const imports = this._importsFromStatements();
        imports.forEach(({ name, inProjectPath }) => entityFile.addAssociation({ name, inProjectPath }));
        return [entityFile];
    }
    _importsFromStatements() {
        return this._parsedSource.statements
            .map((s) => this._importsFromStatement(s))
            .filter(Boolean)
            .flat();
    }
    _importsFromStatement(statement) {
        if (statement.kind != ts_1.default.SyntaxKind.ImportDeclaration)
            return [];
        return new ts_parser_import_1.TsParserImport({ statement, inProjectPath: this._inProjectPath }).parse();
    }
}
exports.TsParserFile = TsParserFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1REFBa0Q7QUFDbEQsdURBQThCO0FBRTlCLHFGQUEwRztBQUUxRyxNQUFhLFlBQVk7SUFLdkIsWUFBWSxNQUFnRjtRQUMxRixNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7SUFDM0IsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLFVBQVUsR0FBRyxJQUFJLHdCQUFVLENBQUM7WUFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNuQyxDQUFDLENBQUE7UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUE2QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzSCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVTLHNCQUFzQjtRQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTthQUNqQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsSUFBSSxFQUFFLENBQUE7SUFDWCxDQUFDO0lBQ1MscUJBQXFCLENBQUMsU0FBdUI7UUFDckQsSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDaEUsT0FBTyxJQUFJLGlDQUFjLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3RGLENBQUM7Q0FDRjtBQWhDRCxvQ0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlGaWxlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1maWxlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnQsIFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHQgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJGaWxlIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlOyBpblByb2plY3RQYXRoOiBzdHJpbmc7IGZpbGVOYW1lOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBpblByb2plY3RQYXRoLCBmaWxlTmFtZSB9ID0gcGFyYW1zXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9maWxlTmFtZSA9IGZpbGVOYW1lXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5RmlsZVtdIHtcbiAgICBjb25zdCBlbnRpdHlGaWxlID0gbmV3IEVudGl0eUZpbGUoe1xuICAgICAgbmFtZTogdGhpcy5fZmlsZU5hbWUsXG4gICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgIH0pXG4gICAgY29uc3QgaW1wb3J0cyA9IHRoaXMuX2ltcG9ydHNGcm9tU3RhdGVtZW50cygpXG4gICAgaW1wb3J0cy5mb3JFYWNoKCh7IG5hbWUsIGluUHJvamVjdFBhdGggfTogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCkgPT4gZW50aXR5RmlsZS5hZGRBc3NvY2lhdGlvbih7IG5hbWUsIGluUHJvamVjdFBhdGggfSkpXG4gICAgcmV0dXJuIFtlbnRpdHlGaWxlXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRzRnJvbVN0YXRlbWVudHMoKTogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyc2VkU291cmNlLnN0YXRlbWVudHNcbiAgICAgIC5tYXAoKHMpID0+IHRoaXMuX2ltcG9ydHNGcm9tU3RhdGVtZW50KHMpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmZsYXQoKVxuICB9XG4gIHByb3RlY3RlZCBfaW1wb3J0c0Zyb21TdGF0ZW1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W10ge1xuICAgIGlmIChzdGF0ZW1lbnQua2luZCAhPSB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uKSByZXR1cm4gW11cbiAgICByZXR1cm4gbmV3IFRzUGFyc2VySW1wb3J0KHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoIH0pLnBhcnNlKClcbiAgfVxufVxuIl19