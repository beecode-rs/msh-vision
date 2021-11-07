"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserInterface = void 0;
const entity_types_1 = require("src/enum/entity-types");
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const entity_1 = require("src/model/entity");
const entity_interface_1 = require("src/model/entity-interface");
const property_1 = require("src/model/property");
const ts_parser_service_1 = require("src/service/parser-ts/ts-parser-service");
class TsParserInterface {
    _statement;
    _inProjectPath;
    _parsedSource;
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
            new entity_1.Entity({
                type: entity_types_1.EntityTypes.INTERFACE,
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                meta: new entity_interface_1.EntityInterface({
                    references,
                    properties,
                }),
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
                accessLevel: property_access_level_type_1.PropertyAccessLevelType.PUBLIC,
                returnType,
                functionParams,
            });
        });
    }
}
exports.TsParserInterface = TsParserInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBbUQ7QUFDbkQsb0ZBQTZFO0FBQzdFLDZDQUF5QztBQUN6QyxpRUFBNEQ7QUFDNUQsaURBQTZDO0FBRzdDLCtFQUF5RTtBQUV6RSxNQUFhLGlCQUFpQjtJQUNULFVBQVUsQ0FBYztJQUN4QixjQUFjLENBQVE7SUFDdEIsYUFBYSxDQUFlO0lBRS9DLFlBQVksTUFBdUY7UUFDakcsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO0lBQ25DLENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUE7UUFDaEQsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RSxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLGtCQUFrQixDQUFDO1lBQ3BELFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMxQixZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDaEMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ25DLENBQUMsQ0FBQTtRQUNGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUV6QyxPQUFPO1lBQ0wsSUFBSSxlQUFNLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLDBCQUFXLENBQUMsU0FBUztnQkFDM0IsSUFBSTtnQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ2xDLFVBQVU7Z0JBQ1YsSUFBSSxFQUFFLElBQUksa0NBQWUsQ0FBQztvQkFDeEIsVUFBVTtvQkFDVixVQUFVO2lCQUNYLENBQUM7YUFDSCxDQUFDO1NBQ0gsQ0FBQTtJQUNILENBQUM7SUFFUyxlQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUNwQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDMUQsTUFBTSxjQUFjLEdBQ2xCLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ1gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1RSxPQUFPLElBQUksbUJBQVEsQ0FBQztnQkFDbEIsSUFBSTtnQkFDSixXQUFXLEVBQUUsb0RBQXVCLENBQUMsTUFBTTtnQkFDM0MsVUFBVTtnQkFDVixjQUFjO2FBQ2YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFyREQsOENBcURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3Byb3BlcnR5LWFjY2Vzcy1sZXZlbC10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eUludGVyZmFjZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktaW50ZXJmYWNlJ1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VySW50ZXJmYWNlIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZTsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9ID0gcGFyYW1zXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHk8RW50aXR5VHlwZXMuSU5URVJGQUNFPltdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIGNvbnN0IHJlZmVyZW5jZXMgPSB0c1BhcnNlclNlcnZpY2UuZmluZENsYXNzUmVsYXRpb25zKHtcbiAgICAgIHN0YXRlbWVudDogdGhpcy5fc3RhdGVtZW50LFxuICAgICAgcGFyc2VkU291cmNlOiB0aGlzLl9wYXJzZWRTb3VyY2UsXG4gICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgIH0pXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2ZpbmRQcm9wZXJ0aWVzKClcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgdHlwZTogRW50aXR5VHlwZXMuSU5URVJGQUNFLFxuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5SW50ZXJmYWNlKHtcbiAgICAgICAgICByZWZlcmVuY2VzLFxuICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kUHJvcGVydGllcygpOiBQcm9wZXJ0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBtZW1iZXIubmFtZS5lc2NhcGVkVGV4dFxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IG1lbWJlci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgICAgY29uc3QgZnVuY3Rpb25QYXJhbXMgPVxuICAgICAgICAobWVtYmVyLnBhcmFtZXRlcnMgPz8gW10pLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiBtZW1iZXIucGFyYW1ldGVycy5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKS5qb2luKCcsICcpXG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWNjZXNzTGV2ZWw6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBVQkxJQyxcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==