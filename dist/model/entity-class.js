"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityClass = void 0;
class EntityClass {
    _isAbstract;
    _properties;
    constructor(params) {
        const { isAbstract, properties } = params;
        this._isAbstract = isAbstract ?? false;
        this._properties = properties ?? [];
    }
    get IsAbstract() {
        return this._isAbstract;
    }
    get Properties() {
        return this._properties;
    }
}
exports.EntityClass = EntityClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS1jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLFdBQVc7SUFDSCxXQUFXLENBQVM7SUFDcEIsV0FBVyxDQUFZO0lBRTFDLFlBQVksTUFBeUQ7UUFDbkUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksS0FBSyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0NBQ0Y7QUFqQkQsa0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlDbGFzcyB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfaXNBYnN0cmFjdDogYm9vbGVhblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Byb3BlcnRpZXM6IFByb3BlcnR5W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgaXNBYnN0cmFjdD86IGJvb2xlYW47IHByb3BlcnRpZXM/OiBQcm9wZXJ0eVtdIH0pIHtcbiAgICBjb25zdCB7IGlzQWJzdHJhY3QsIHByb3BlcnRpZXMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX2lzQWJzdHJhY3QgPSBpc0Fic3RyYWN0ID8/IGZhbHNlXG4gICAgdGhpcy5fcHJvcGVydGllcyA9IHByb3BlcnRpZXMgPz8gW11cbiAgfVxuXG4gIHB1YmxpYyBnZXQgSXNBYnN0cmFjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNBYnN0cmFjdFxuICB9XG5cbiAgcHVibGljIGdldCBQcm9wZXJ0aWVzKCk6IFByb3BlcnR5W10ge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzXG4gIH1cbn1cbiJdfQ==