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
    constructor({ parsedSource, inProjectPath, fileName, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1REFBa0Q7QUFDbEQsdURBQThCO0FBRTlCLHFGQUEwRztBQUUxRyxNQUFhLFlBQVk7SUFLdkIsWUFBWSxFQUNWLFlBQVksRUFDWixhQUFhLEVBQ2IsUUFBUSxHQUtUO1FBQ0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7SUFDM0IsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLFVBQVUsR0FBRyxJQUFJLHdCQUFVLENBQUM7WUFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNuQyxDQUFDLENBQUE7UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUE2QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzSCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVTLHNCQUFzQjtRQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTthQUNqQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsSUFBSSxFQUFFLENBQUE7SUFDWCxDQUFDO0lBQ1MscUJBQXFCLENBQUMsU0FBdUI7UUFDckQsSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDaEUsT0FBTyxJQUFJLGlDQUFjLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3RGLENBQUM7Q0FDRjtBQXZDRCxvQ0F1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlGaWxlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1maWxlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnQsIFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHQgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJGaWxlIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgcGFyc2VkU291cmNlLFxuICAgIGluUHJvamVjdFBhdGgsXG4gICAgZmlsZU5hbWUsXG4gIH06IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgICBmaWxlTmFtZTogc3RyaW5nXG4gIH0pIHtcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX2ZpbGVOYW1lID0gZmlsZU5hbWVcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHlGaWxlW10ge1xuICAgIGNvbnN0IGVudGl0eUZpbGUgPSBuZXcgRW50aXR5RmlsZSh7XG4gICAgICBuYW1lOiB0aGlzLl9maWxlTmFtZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgfSlcbiAgICBjb25zdCBpbXBvcnRzID0gdGhpcy5faW1wb3J0c0Zyb21TdGF0ZW1lbnRzKClcbiAgICBpbXBvcnRzLmZvckVhY2goKHsgbmFtZSwgaW5Qcm9qZWN0UGF0aCB9OiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0KSA9PiBlbnRpdHlGaWxlLmFkZEFzc29jaWF0aW9uKHsgbmFtZSwgaW5Qcm9qZWN0UGF0aCB9KSlcbiAgICByZXR1cm4gW2VudGl0eUZpbGVdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydHNGcm9tU3RhdGVtZW50cygpOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W10ge1xuICAgIHJldHVybiB0aGlzLl9wYXJzZWRTb3VyY2Uuc3RhdGVtZW50c1xuICAgICAgLm1hcCgocykgPT4gdGhpcy5faW1wb3J0c0Zyb21TdGF0ZW1lbnQocykpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuZmxhdCgpXG4gIH1cbiAgcHJvdGVjdGVkIF9pbXBvcnRzRnJvbVN0YXRlbWVudChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXSB7XG4gICAgaWYgKHN0YXRlbWVudC5raW5kICE9IHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24pIHJldHVybiBbXVxuICAgIHJldHVybiBuZXcgVHNQYXJzZXJJbXBvcnQoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSkucGFyc2UoKVxuICB9XG59XG4iXX0=