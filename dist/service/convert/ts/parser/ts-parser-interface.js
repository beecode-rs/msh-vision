"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserInterface = void 0;
const entity_interface_1 = require("src/model/entity-interface");
const property_1 = require("src/model/property");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserInterface {
    constructor(params) {
        const { parsedSource, statement, inProjectPath } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const references = ts_parser_service_1.tsParserService.findClassRelations({
            statement: this._statement,
            parsedSource: this._parsedSource,
            inProjectPath: this._inProjectPath,
        });
        const properties = this._findProperties();
        return [
            new entity_interface_1.EntityInterface({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                references,
                properties,
            }),
        ];
    }
    _findProperties() {
        return this._statement['members'].map((member) => {
            const name = member.name.escapedText;
            const returnType = member.type.getText(this._parsedSource);
            const functionParams = (member.parameters ?? []).length === 0
                ? undefined
                : member.parameters.map((p) => p.getText(this._parsedSource)).join(', ');
            return new property_1.Property({
                name,
                accessLevel: property_1.PropertyAccessLevelType.PUBLIC,
                returnType,
                functionParams,
            });
        });
    }
}
exports.TsParserInterface = TsParserInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUVBQTREO0FBQzVELGlEQUFzRTtBQUd0RSxnRkFBMEU7QUFFMUUsTUFBYSxpQkFBaUI7SUFLNUIsWUFBWSxNQUF1RjtRQUNqRyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsa0JBQWtCLENBQUM7WUFDcEQsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzFCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNoQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDbkMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBRXpDLE9BQU87WUFDTCxJQUFJLGtDQUFlLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLFVBQVU7Z0JBQ1YsVUFBVTthQUNYLENBQUM7U0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMxRCxNQUFNLGNBQWMsR0FDbEIsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVFLE9BQU8sSUFBSSxtQkFBUSxDQUFDO2dCQUNsQixJQUFJO2dCQUNKLFdBQVcsRUFBRSxrQ0FBdUIsQ0FBQyxNQUFNO2dCQUMzQyxVQUFVO2dCQUNWLGNBQWM7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWxERCw4Q0FrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IFByb3BlcnR5LCBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckludGVyZmFjZSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGU7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5SW50ZXJmYWNlW10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IHRzUGFyc2VyU2VydmljZS5maW5kQ2xhc3NSZWxhdGlvbnMoe1xuICAgICAgc3RhdGVtZW50OiB0aGlzLl9zdGF0ZW1lbnQsXG4gICAgICBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgfSlcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHlJbnRlcmZhY2Uoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICByZWZlcmVuY2VzLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgfSksXG4gICAgXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kUHJvcGVydGllcygpOiBQcm9wZXJ0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBtZW1iZXIubmFtZS5lc2NhcGVkVGV4dFxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IG1lbWJlci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgICAgY29uc3QgZnVuY3Rpb25QYXJhbXMgPVxuICAgICAgICAobWVtYmVyLnBhcmFtZXRlcnMgPz8gW10pLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiBtZW1iZXIucGFyYW1ldGVycy5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKS5qb2luKCcsICcpXG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWNjZXNzTGV2ZWw6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBVQkxJQyxcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==