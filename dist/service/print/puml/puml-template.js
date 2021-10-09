"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlTemplate = void 0;
class PumlTemplate {
    constructor() {
        this._templateStart = '@startuml';
        this._templateEnd = '@enduml';
        this._children = [];
    }
    print() {
        const template = [];
        template.push(this._templateStart);
        template.push(...this._children.map((c) => c.print()));
        template.push(this._templateEnd);
        return template.join('\n');
    }
    addChildren(printable) {
        this._children.push(printable);
    }
}
exports.PumlTemplate = PumlTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC10ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLFlBQVk7SUFBekI7UUFDcUIsbUJBQWMsR0FBRyxXQUFXLENBQUE7UUFDNUIsaUJBQVksR0FBRyxTQUFTLENBQUE7UUFDakMsY0FBUyxHQUFnQixFQUFFLENBQUE7SUFhdkMsQ0FBQztJQVhRLEtBQUs7UUFDVixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7UUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBRU0sV0FBVyxDQUFDLFNBQW9CO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7Q0FDRjtBQWhCRCxvQ0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmludGFibGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wcmludGFibGUnXG5cbmV4cG9ydCBjbGFzcyBQdW1sVGVtcGxhdGUgaW1wbGVtZW50cyBQcmludGFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3RlbXBsYXRlU3RhcnQgPSAnQHN0YXJ0dW1sJ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3RlbXBsYXRlRW5kID0gJ0BlbmR1bWwnXG4gIHByb3RlY3RlZCBfY2hpbGRyZW46IFByaW50YWJsZVtdID0gW11cblxuICBwdWJsaWMgcHJpbnQoKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wbGF0ZTogc3RyaW5nW10gPSBbXVxuICAgIHRlbXBsYXRlLnB1c2godGhpcy5fdGVtcGxhdGVTdGFydClcbiAgICB0ZW1wbGF0ZS5wdXNoKC4uLnRoaXMuX2NoaWxkcmVuLm1hcCgoYykgPT4gYy5wcmludCgpKSlcbiAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuX3RlbXBsYXRlRW5kKVxuICAgIHJldHVybiB0ZW1wbGF0ZS5qb2luKCdcXG4nKVxuICB9XG5cbiAgcHVibGljIGFkZENoaWxkcmVuKHByaW50YWJsZTogUHJpbnRhYmxlKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChwcmludGFibGUpXG4gIH1cbn1cbiJdfQ==