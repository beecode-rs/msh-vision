"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printable = void 0;
const constant_1 = require("src/util/constant");
class Printable {
    constructor() {
        this._children = [];
    }
    print() {
        const bodyTemplate = [];
        bodyTemplate.push(...this._children.map((c) => c.print()));
        bodyTemplate.push(...this._print());
        const template = [];
        if (this._templateStart())
            template.push(this._templateStart());
        template.push(...this._indentRows(bodyTemplate));
        if (this._templateEnd())
            template.push(this._templateEnd());
        return template.join(constant_1.constant.newRow);
    }
    _indentRows(templates) {
        return templates.map((template) => template
            .split(constant_1.constant.newRow)
            .map((row) => `  ${row}`)
            .join(constant_1.constant.newRow));
    }
    addChildren(printable) {
        this._children.push(printable);
    }
}
exports.Printable = Printable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludC1lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQTRDO0FBRTVDLE1BQXNCLFNBQVM7SUFBL0I7UUFDWSxjQUFTLEdBQWdCLEVBQUUsQ0FBQTtJQStCdkMsQ0FBQztJQXpCUSxLQUFLO1FBQ1YsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFBO1FBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMxRCxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFFbkMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFBO1FBQzdCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7UUFDL0QsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFBO1FBRTNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFUyxXQUFXLENBQUMsU0FBbUI7UUFDdkMsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDaEMsUUFBUTthQUNMLEtBQUssQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQzthQUN0QixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDeEIsSUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQ3pCLENBQUE7SUFDSCxDQUFDO0lBRU0sV0FBVyxDQUFDLFNBQW9CO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7Q0FDRjtBQWhDRCw4QkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJpbnRhYmxlIHtcbiAgcHJvdGVjdGVkIF9jaGlsZHJlbjogUHJpbnRhYmxlW10gPSBbXVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmdcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9wcmludCgpOiBzdHJpbmdbXVxuXG4gIHB1YmxpYyBwcmludCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJvZHlUZW1wbGF0ZTogc3RyaW5nW10gPSBbXVxuICAgIGJvZHlUZW1wbGF0ZS5wdXNoKC4uLnRoaXMuX2NoaWxkcmVuLm1hcCgoYykgPT4gYy5wcmludCgpKSlcbiAgICBib2R5VGVtcGxhdGUucHVzaCguLi50aGlzLl9wcmludCgpKVxuXG4gICAgY29uc3QgdGVtcGxhdGU6IHN0cmluZ1tdID0gW11cbiAgICBpZiAodGhpcy5fdGVtcGxhdGVTdGFydCgpKSB0ZW1wbGF0ZS5wdXNoKHRoaXMuX3RlbXBsYXRlU3RhcnQoKSlcbiAgICB0ZW1wbGF0ZS5wdXNoKC4uLnRoaXMuX2luZGVudFJvd3MoYm9keVRlbXBsYXRlKSlcbiAgICBpZiAodGhpcy5fdGVtcGxhdGVFbmQoKSkgdGVtcGxhdGUucHVzaCh0aGlzLl90ZW1wbGF0ZUVuZCgpKVxuXG4gICAgcmV0dXJuIHRlbXBsYXRlLmpvaW4oY29uc3RhbnQubmV3Um93KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pbmRlbnRSb3dzKHRlbXBsYXRlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlcy5tYXAoKHRlbXBsYXRlKSA9PlxuICAgICAgdGVtcGxhdGVcbiAgICAgICAgLnNwbGl0KGNvbnN0YW50Lm5ld1JvdylcbiAgICAgICAgLm1hcCgocm93KSA9PiBgICAke3Jvd31gKVxuICAgICAgICAuam9pbihjb25zdGFudC5uZXdSb3cpXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFkZENoaWxkcmVuKHByaW50YWJsZTogUHJpbnRhYmxlKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChwcmludGFibGUpXG4gIH1cbn1cbiJdfQ==