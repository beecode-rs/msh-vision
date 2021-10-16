"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const reference_type_1 = require("src/enum/reference-type");
const entity_class_1 = require("src/model/entity-class");
const property_1 = require("src/model/property");
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
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const isAbstract = ts_parser_service_1.tsParserService.isAbstract(this._statement.modifiers);
        const references = this._findRelations();
        const properties = this._findProperties();
        const entityClass = new entity_class_1.EntityClass({
            name,
            inProjectPath: this._inProjectPath,
            isExported,
            isAbstract,
            references,
            properties,
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
    _findProperties() {
        return this._statement['members'].map((member) => {
            const name = member.name.escapedText;
            const accessLevel = ts_parser_service_1.tsParserService.accessLevel(member.modifiers);
            const isAbstract = ts_parser_service_1.tsParserService.isAbstract(member.modifiers);
            const returnType = member.type.getText(this._parsedSource);
            const functionParams = member.parameters.length === 0 ? undefined : member.parameters.map((p) => p.getText(this._parsedSource)).join(', ');
            return new property_1.Property({
                name,
                isAbstract,
                accessLevel,
                returnType,
                functionParams,
            });
        });
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUF1RDtBQUN2RCx5REFBb0Q7QUFDcEQsaURBQTZDO0FBQzdDLG1EQUErQztBQUcvQyxxRkFBK0U7QUFDL0UsZ0ZBQTBFO0FBQzFFLDRDQUF3QztBQUV4QyxNQUFhLGFBQWE7SUFLeEIsWUFBWSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsYUFBYSxHQUtkO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUV6QyxNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFXLENBQUM7WUFDbEMsSUFBSTtZQUNKLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNsQyxVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1NBQ1gsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFD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YUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckgsT0FBTyxJQUFJLG1CQUFRLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osVUFBVTtnQkFDVixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsY0FBYzthQUNmLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBdkZELHNDQXVGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZmVyZW5jZVR5cGUgfSBmcm9tICdzcmMvZW51bS9yZWZlcmVuY2UtdHlwZSdcbmltcG9ydCB7IEVudGl0eUNsYXNzIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1jbGFzcydcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL3JlZmVyZW5jZSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IFRzUGFyc2VySW1wb3J0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckNsYXNzIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHBhcnNlZFNvdXJjZSxcbiAgICBzdGF0ZW1lbnQsXG4gICAgaW5Qcm9qZWN0UGF0aCxcbiAgfToge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIH0pIHtcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eUNsYXNzW10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuICAgIGNvbnN0IGlzQWJzdHJhY3QgPSB0c1BhcnNlclNlcnZpY2UuaXNBYnN0cmFjdCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IHRoaXMuX2ZpbmRSZWxhdGlvbnMoKVxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9maW5kUHJvcGVydGllcygpXG5cbiAgICBjb25zdCBlbnRpdHlDbGFzcyA9IG5ldyBFbnRpdHlDbGFzcyh7XG4gICAgICBuYW1lLFxuICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICBpc0Fic3RyYWN0LFxuICAgICAgcmVmZXJlbmNlcyxcbiAgICAgIHByb3BlcnRpZXMsXG4gICAgfSlcblxuICAgIHJldHVybiBbZW50aXR5Q2xhc3NdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRSZWxhdGlvbnMoKTogUmVmZXJlbmNlW10ge1xuICAgIGNvbnN0IGV4dGVuZEltcGxlbWVudHMgPSAodGhpcy5fc3RhdGVtZW50WydoZXJpdGFnZUNsYXVzZXMnXSA/PyBbXSlcbiAgICAgIC5tYXAoKGhlcml0YWdlKSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBoZXJpdGFnZS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkuc3BsaXQoJyAnKVswXVxuICAgICAgICByZXR1cm4gKGhlcml0YWdlLnR5cGVzID8/IFtdKS5tYXAoKHQpID0+ICh7IHR5cGUsIG5hbWU6IHQuZXhwcmVzc2lvbi5lc2NhcGVkVGV4dCB9KSlcbiAgICAgIH0pXG4gICAgICAuZmxhdCgpIGFzIHsgdHlwZTogJ2ltcGxlbWVudHMnIHwgJ2V4dGVuZHMnOyBuYW1lOiBzdHJpbmcgfVtdXG4gICAgaWYgKGV4dGVuZEltcGxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gW11cblxuICAgIGNvbnN0IGZpbGVJbXBvcnRzID0gdGhpcy5fcGFyc2VkU291cmNlLnN0YXRlbWVudHNcbiAgICAgIC5tYXAoKHN0YXRlbWVudCkgPT4gbmV3IFRzUGFyc2VySW1wb3J0KHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoIH0pLnBhcnNlKCkpXG4gICAgICAuZmxhdCgpXG5cbiAgICByZXR1cm4gZXh0ZW5kSW1wbGVtZW50c1xuICAgICAgLm1hcCgoZWkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUltcG9ydCA9IGZpbGVJbXBvcnRzLmZpbmQoKGZpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZpLm5hbWUgPT09IGVpLm5hbWVcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCFmaWxlSW1wb3J0KSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oYEltcG9ydCBub3QgZm91bmQgZm9yICR7SlNPTi5zdHJpbmdpZnkoZWkpfWApXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSZWZlcmVuY2Uoe1xuICAgICAgICAgIG5hbWU6IGVpLm5hbWUsXG4gICAgICAgICAgdHlwZTogZWkudHlwZSA9PT0gJ2ltcGxlbWVudHMnID8gUmVmZXJlbmNlVHlwZS5JTVBMRU1FTlRBVElPTiA6IFJlZmVyZW5jZVR5cGUuSU5IRVJJVEFOQ0UsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogZmlsZUltcG9ydC5pblByb2plY3RQYXRoLFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVmZXJlbmNlW11cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZFByb3BlcnRpZXMoKTogUHJvcGVydHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlbWVudFsnbWVtYmVycyddLm1hcCgobWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gbWVtYmVyLm5hbWUuZXNjYXBlZFRleHRcbiAgICAgIGNvbnN0IGFjY2Vzc0xldmVsID0gdHNQYXJzZXJTZXJ2aWNlLmFjY2Vzc0xldmVsKG1lbWJlci5tb2RpZmllcnMpXG4gICAgICBjb25zdCBpc0Fic3RyYWN0ID0gdHNQYXJzZXJTZXJ2aWNlLmlzQWJzdHJhY3QobWVtYmVyLm1vZGlmaWVycylcbiAgICAgIGNvbnN0IHJldHVyblR5cGUgPSBtZW1iZXIudHlwZS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcbiAgICAgIGNvbnN0IGZ1bmN0aW9uUGFyYW1zID1cbiAgICAgICAgbWVtYmVyLnBhcmFtZXRlcnMubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogbWVtYmVyLnBhcmFtZXRlcnMubWFwKChwKSA9PiBwLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKSkuam9pbignLCAnKVxuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGlzQWJzdHJhY3QsXG4gICAgICAgIGFjY2Vzc0xldmVsLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuIl19