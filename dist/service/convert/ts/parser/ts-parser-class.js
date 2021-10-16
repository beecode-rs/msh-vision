"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const reference_type_1 = require("src/enum/reference-type");
const entity_class_1 = require("src/model/entity-class");
const reference_1 = require("src/model/reference");
const ts_parser_import_1 = require("src/service/convert/ts/parser/ts-parser-import");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
const logger_1 = require("src/util/logger");
class TsParserClass {
    constructor({ parsedSource, statement, inProjectPath, }) {
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        // const properties = this._statement['members'].map((m) => m.name?.escapedText)
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const references = this._findRelations();
        const entityClass = new entity_class_1.EntityClass({
            name,
            inProjectPath: this._inProjectPath,
            isExported,
            references,
        });
        return [entityClass];
    }
    _findRelations() {
        const extendImplements = (this._statement['heritageClauses'] ?? [])
            .map((heritage) => {
            const type = heritage.getText(this._parsedSource).split(' ')[0];
            return (heritage.types ?? []).map((t) => ({ type, name: t.expression.escapedText }));
        })
            .flat();
        if (extendImplements.length === 0)
            return [];
        const fileImports = this._parsedSource.statements
            .map((statement) => new ts_parser_import_1.TsParserImport({ statement, inProjectPath: this._inProjectPath }).parse())
            .flat();
        return extendImplements
            .map((ei) => {
            const fileImport = fileImports.find((fi) => {
                return fi.name === ei.name;
            });
            if (!fileImport) {
                logger_1.logger.warn(`Import not found for ${JSON.stringify(ei)}`);
                return;
            }
            return new reference_1.Reference({
                name: ei.name,
                type: ei.type === 'implements' ? reference_type_1.ReferenceType.IMPLEMENTATION : reference_type_1.ReferenceType.INHERITANCE,
                inProjectPath: fileImport.inProjectPath,
            });
        })
            .filter(Boolean);
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUF1RDtBQUN2RCx5REFBb0Q7QUFDcEQsbURBQStDO0FBRy9DLHFGQUErRTtBQUMvRSxnRkFBMEU7QUFDMUUsNENBQXdDO0FBRXhDLE1BQWEsYUFBYTtJQUt4QixZQUFZLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxhQUFhLEdBS2Q7UUFDQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtJQUNuQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELGdGQUFnRjtRQUNoRixNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUV4QyxNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFXLENBQUM7WUFDbEMsSUFBSTtZQUNKLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNsQyxVQUFVO1lBQ1YsVUFBVTtTQUNYLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0QixDQUFDO0lBRVMsY0FBYztRQUN0QixNQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoRSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDL0QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN0RixDQUFDLENBQUM7YUFDRCxJQUFJLEVBQXdELENBQUE7UUFDL0QsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFBO1FBRTVDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTthQUM5QyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksaUNBQWMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDakcsSUFBSSxFQUFFLENBQUE7UUFFVCxPQUFPLGdCQUFnQjthQUNwQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNWLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDekMsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLGVBQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN6RCxPQUFNO2FBQ1A7WUFDRCxPQUFPLElBQUkscUJBQVMsQ0FBQztnQkFDbkIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO2dCQUNiLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsOEJBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLDhCQUFhLENBQUMsV0FBVztnQkFDekYsYUFBYSxFQUFFLFVBQVUsQ0FBQyxhQUFhO2FBQ3hDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQzthQUNELE1BQU0sQ0FBQyxPQUFPLENBQWdCLENBQUE7SUFDbkMsQ0FBQztDQUNGO0FBbEVELHNDQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZmVyZW5jZVR5cGUgfSBmcm9tICdzcmMvZW51bS9yZWZlcmVuY2UtdHlwZSdcbmltcG9ydCB7IEVudGl0eUNsYXNzIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1jbGFzcydcbmltcG9ydCB7IFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9yZWZlcmVuY2UnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJDbGFzcyBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBwYXJzZWRTb3VyY2UsXG4gICAgc3RhdGVtZW50LFxuICAgIGluUHJvamVjdFBhdGgsXG4gIH06IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICB9KSB7XG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHlDbGFzc1tdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICAvLyBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtKSA9PiBtLm5hbWU/LmVzY2FwZWRUZXh0KVxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IHRoaXMuX2ZpbmRSZWxhdGlvbnMoKVxuXG4gICAgY29uc3QgZW50aXR5Q2xhc3MgPSBuZXcgRW50aXR5Q2xhc3Moe1xuICAgICAgbmFtZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICBpc0V4cG9ydGVkLFxuICAgICAgcmVmZXJlbmNlcyxcbiAgICB9KVxuXG4gICAgcmV0dXJuIFtlbnRpdHlDbGFzc11cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZFJlbGF0aW9ucygpOiBSZWZlcmVuY2VbXSB7XG4gICAgY29uc3QgZXh0ZW5kSW1wbGVtZW50cyA9ICh0aGlzLl9zdGF0ZW1lbnRbJ2hlcml0YWdlQ2xhdXNlcyddID8/IFtdKVxuICAgICAgLm1hcCgoaGVyaXRhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGhlcml0YWdlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKS5zcGxpdCgnICcpWzBdXG4gICAgICAgIHJldHVybiAoaGVyaXRhZ2UudHlwZXMgPz8gW10pLm1hcCgodCkgPT4gKHsgdHlwZSwgbmFtZTogdC5leHByZXNzaW9uLmVzY2FwZWRUZXh0IH0pKVxuICAgICAgfSlcbiAgICAgIC5mbGF0KCkgYXMgeyB0eXBlOiAnaW1wbGVtZW50cycgfCAnZXh0ZW5kcyc7IG5hbWU6IHN0cmluZyB9W11cbiAgICBpZiAoZXh0ZW5kSW1wbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBbXVxuXG4gICAgY29uc3QgZmlsZUltcG9ydHMgPSB0aGlzLl9wYXJzZWRTb3VyY2Uuc3RhdGVtZW50c1xuICAgICAgLm1hcCgoc3RhdGVtZW50KSA9PiBuZXcgVHNQYXJzZXJJbXBvcnQoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSkucGFyc2UoKSlcbiAgICAgIC5mbGF0KClcblxuICAgIHJldHVybiBleHRlbmRJbXBsZW1lbnRzXG4gICAgICAubWFwKChlaSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSW1wb3J0ID0gZmlsZUltcG9ydHMuZmluZCgoZmkpID0+IHtcbiAgICAgICAgICByZXR1cm4gZmkubmFtZSA9PT0gZWkubmFtZVxuICAgICAgICB9KVxuICAgICAgICBpZiAoIWZpbGVJbXBvcnQpIHtcbiAgICAgICAgICBsb2dnZXIud2FybihgSW1wb3J0IG5vdCBmb3VuZCBmb3IgJHtKU09OLnN0cmluZ2lmeShlaSl9YClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZSh7XG4gICAgICAgICAgbmFtZTogZWkubmFtZSxcbiAgICAgICAgICB0eXBlOiBlaS50eXBlID09PSAnaW1wbGVtZW50cycgPyBSZWZlcmVuY2VUeXBlLklNUExFTUVOVEFUSU9OIDogUmVmZXJlbmNlVHlwZS5JTkhFUklUQU5DRSxcbiAgICAgICAgICBpblByb2plY3RQYXRoOiBmaWxlSW1wb3J0LmluUHJvamVjdFBhdGgsXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZWZlcmVuY2VbXVxuICB9XG59XG4iXX0=