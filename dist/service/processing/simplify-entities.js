"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplifyEntities = void 0;
const entity_types_1 = require("src/enum/entity-types");
const entity_1 = require("src/model/entity");
const entity_object_1 = require("src/model/entity-object");
const reference_1 = require("src/model/reference");
class SimplifyEntities {
    _simplifyConfig;
    constructor(simplifyConfig) {
        this._simplifyConfig = simplifyConfig.reduce((acc, cur) => {
            acc = { ...acc, [cur[1]]: cur[0] };
            return acc;
        }, {});
    }
    process(entities) {
        if (Object.keys(this._simplifyConfig).length === 0)
            return entities;
        const entitiesUpdatedReferences = this._processReferences(entities);
        return this._simplifyEntities(entitiesUpdatedReferences);
    }
    _simplifyEntities(entities) {
        const { toSimplifyObj, other } = entities.reduce((acc, cur) => {
            const simKey = this._findSimplifiedEntityByPath(cur.InProjectPath);
            if (!simKey) {
                acc.other.push(cur);
                return acc;
            }
            acc.toSimplifyObj[simKey] = acc.toSimplifyObj[simKey] ?? [];
            acc.toSimplifyObj[simKey].push(cur);
            return acc;
        }, { toSimplifyObj: {}, other: [] });
        const simplifiedEntities = Object.entries(toSimplifyObj).map(([simplifyName, simplifiedEntities]) => {
            const references = simplifiedEntities
                .map((e) => {
                return e.References.map((r) => reference_1.Reference.cloneAndModify(r));
            })
                .flat();
            return new entity_1.Entity({
                type: entity_types_1.EntityTypes.OBJECT,
                name: simplifyName,
                inProjectPath: this._simplifyConfig[simplifyName],
                isExported: true,
                references: this._removeDuplicatedReferences(references),
                meta: new entity_object_1.EntityObject({}),
            });
        });
        return [...other, ...simplifiedEntities];
    }
    _processReferences(entities) {
        return entities.map((entity) => {
            const references = entity.References.map((ref) => {
                const simKey = this._findSimplifiedEntityByPath(ref.InProjectPath);
                if (!simKey)
                    return ref;
                return reference_1.Reference.cloneAndModify(ref, { name: simKey, inProjectPath: this._simplifyConfig[simKey] });
            });
            const noDuplicatedReferences = this._removeDuplicatedReferences(references);
            return entity_1.Entity.cloneAndModify(entity, { references: noDuplicatedReferences });
        });
    }
    _removeDuplicatedReferences(references) {
        return references.reduce((acc, cur) => {
            if (acc.find((e) => e.Name === cur.Name && e.InProjectPath === cur.InProjectPath))
                return acc;
            acc.push(cur);
            return acc;
        }, []);
    }
    _findSimplifiedEntityByPath(path) {
        const found = Object.entries(this._simplifyConfig).find(([_, value]) => path.startsWith(value));
        if (!found)
            return undefined;
        return found[0];
    }
}
exports.SimplifyEntities = SimplifyEntities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxpZnktZW50aXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9wcm9jZXNzaW5nL3NpbXBsaWZ5LWVudGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFtRDtBQUNuRCw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBQ3RELG1EQUErQztBQUcvQyxNQUFhLGdCQUFnQjtJQUNSLGVBQWUsQ0FBeUI7SUFFM0QsWUFBWSxjQUFrQztRQUM1QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQTBCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pGLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDbEMsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDUixDQUFDO0lBRU0sT0FBTyxDQUFDLFFBQWtCO1FBQy9CLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUNuRSxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBQzFELENBQUM7SUFFUyxpQkFBaUIsQ0FBQyxRQUFrQjtRQUM1QyxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQzlDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ1gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENB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QztnQkFBRSxPQUFPLEdBQUcsQ0FBQTtZQUM3RixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUUsRUFBaUIsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFUywyQkFBMkIsQ0FBQyxJQUFZO1FBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDL0YsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLFNBQVMsQ0FBQTtRQUM1QixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0NBQ0Y7QUE3RUQsNENBNkVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvcmVmZXJlbmNlJ1xuaW1wb3J0IHsgUHJvY2Vzc2luZ1N0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJvY2Vzc2luZy9wcm9jZXNzaW5nLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBTaW1wbGlmeUVudGl0aWVzIGltcGxlbWVudHMgUHJvY2Vzc2luZ1N0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zaW1wbGlmeUNvbmZpZzogeyBbazogc3RyaW5nXTogc3RyaW5nIH1cblxuICBjb25zdHJ1Y3RvcihzaW1wbGlmeUNvbmZpZzogW3N0cmluZywgc3RyaW5nXVtdKSB7XG4gICAgdGhpcy5fc2ltcGxpZnlDb25maWcgPSBzaW1wbGlmeUNvbmZpZy5yZWR1Y2U8eyBbazogc3RyaW5nXTogc3RyaW5nIH0+KChhY2MsIGN1cikgPT4ge1xuICAgICAgYWNjID0geyAuLi5hY2MsIFtjdXJbMV1dOiBjdXJbMF0gfVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIHt9KVxuICB9XG5cbiAgcHVibGljIHByb2Nlc3MoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9zaW1wbGlmeUNvbmZpZykubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcbiAgICBjb25zdCBlbnRpdGllc1VwZGF0ZWRSZWZlcmVuY2VzID0gdGhpcy5fcHJvY2Vzc1JlZmVyZW5jZXMoZW50aXRpZXMpXG4gICAgcmV0dXJuIHRoaXMuX3NpbXBsaWZ5RW50aXRpZXMoZW50aXRpZXNVcGRhdGVkUmVmZXJlbmNlcylcbiAgfVxuXG4gIHByb3RlY3RlZCBfc2ltcGxpZnlFbnRpdGllcyhlbnRpdGllczogRW50aXR5W10pOiBFbnRpdHlbXSB7XG4gICAgY29uc3QgeyB0b1NpbXBsaWZ5T2JqLCBvdGhlciB9ID0gZW50aXRpZXMucmVkdWNlPHsgdG9TaW1wbGlmeU9iajogeyBbazogc3RyaW5nXTogRW50aXR5W10gfTsgb3RoZXI6IEVudGl0eVtdIH0+KFxuICAgICAgKGFjYywgY3VyKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpbUtleSA9IHRoaXMuX2ZpbmRTaW1wbGlmaWVkRW50aXR5QnlQYXRoKGN1ci5JblByb2plY3RQYXRoKVxuICAgICAgICBpZiAoIXNpbUtleSkge1xuICAgICAgICAgIGFjYy5vdGhlci5wdXNoKGN1cilcbiAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgIH1cbiAgICAgICAgYWNjLnRvU2ltcGxpZnlPYmpbc2ltS2V5XSA9IGFjYy50b1NpbXBsaWZ5T2JqW3NpbUtleV0gPz8gW11cbiAgICAgICAgYWNjLnRvU2ltcGxpZnlPYmpbc2ltS2V5XS5wdXNoKGN1cilcblxuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9LFxuICAgICAgeyB0b1NpbXBsaWZ5T2JqOiB7fSwgb3RoZXI6IFtdIH1cbiAgICApXG5cbiAgICBjb25zdCBzaW1wbGlmaWVkRW50aXRpZXMgPSBPYmplY3QuZW50cmllcyh0b1NpbXBsaWZ5T2JqKS5tYXAoKFtzaW1wbGlmeU5hbWUsIHNpbXBsaWZpZWRFbnRpdGllc10pID0+IHtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBzaW1wbGlmaWVkRW50aXRpZXNcbiAgICAgICAgLm1hcCgoZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBlLlJlZmVyZW5jZXMubWFwKChyKSA9PiBSZWZlcmVuY2UuY2xvbmVBbmRNb2RpZnkocikpXG4gICAgICAgIH0pXG4gICAgICAgIC5mbGF0KClcblxuICAgICAgcmV0dXJuIG5ldyBFbnRpdHkoe1xuICAgICAgICB0eXBlOiBFbnRpdHlUeXBlcy5PQkpFQ1QsXG4gICAgICAgIG5hbWU6IHNpbXBsaWZ5TmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5fc2ltcGxpZnlDb25maWdbc2ltcGxpZnlOYW1lXSxcbiAgICAgICAgaXNFeHBvcnRlZDogdHJ1ZSxcbiAgICAgICAgcmVmZXJlbmNlczogdGhpcy5fcmVtb3ZlRHVwbGljYXRlZFJlZmVyZW5jZXMocmVmZXJlbmNlcyksXG4gICAgICAgIG1ldGE6IG5ldyBFbnRpdHlPYmplY3Qoe30pLFxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIFsuLi5vdGhlciwgLi4uc2ltcGxpZmllZEVudGl0aWVzXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcm9jZXNzUmVmZXJlbmNlcyhlbnRpdGllczogRW50aXR5W10pOiBFbnRpdHlbXSB7XG4gICAgcmV0dXJuIGVudGl0aWVzLm1hcCgoZW50aXR5KSA9PiB7XG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZW50aXR5LlJlZmVyZW5jZXMubWFwKChyZWYpID0+IHtcbiAgICAgICAgY29uc3Qgc2ltS2V5ID0gdGhpcy5fZmluZFNpbXBsaWZpZWRFbnRpdHlCeVBhdGgocmVmLkluUHJvamVjdFBhdGgpXG4gICAgICAgIGlmICghc2ltS2V5KSByZXR1cm4gcmVmXG4gICAgICAgIHJldHVybiBSZWZlcmVuY2UuY2xvbmVBbmRNb2RpZnkocmVmLCB7IG5hbWU6IHNpbUtleSwgaW5Qcm9qZWN0UGF0aDogdGhpcy5fc2ltcGxpZnlDb25maWdbc2ltS2V5XSB9KVxuICAgICAgfSlcbiAgICAgIGNvbnN0IG5vRHVwbGljYXRlZFJlZmVyZW5jZXMgPSB0aGlzLl9yZW1vdmVEdXBsaWNhdGVkUmVmZXJlbmNlcyhyZWZlcmVuY2VzKVxuICAgICAgcmV0dXJuIEVudGl0eS5jbG9uZUFuZE1vZGlmeShlbnRpdHksIHsgcmVmZXJlbmNlczogbm9EdXBsaWNhdGVkUmVmZXJlbmNlcyB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JlbW92ZUR1cGxpY2F0ZWRSZWZlcmVuY2VzKHJlZmVyZW5jZXM6IFJlZmVyZW5jZVtdKTogUmVmZXJlbmNlW10ge1xuICAgIHJldHVybiByZWZlcmVuY2VzLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcbiAgICAgIGlmIChhY2MuZmluZCgoZSkgPT4gZS5OYW1lID09PSBjdXIuTmFtZSAmJiBlLkluUHJvamVjdFBhdGggPT09IGN1ci5JblByb2plY3RQYXRoKSkgcmV0dXJuIGFjY1xuICAgICAgYWNjLnB1c2goY3VyKVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdIGFzIFJlZmVyZW5jZVtdKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kU2ltcGxpZmllZEVudGl0eUJ5UGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGZvdW5kID0gT2JqZWN0LmVudHJpZXModGhpcy5fc2ltcGxpZnlDb25maWcpLmZpbmQoKFtfLCB2YWx1ZV0pID0+IHBhdGguc3RhcnRzV2l0aCh2YWx1ZSkpXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiBmb3VuZFswXVxuICB9XG59XG4iXX0=