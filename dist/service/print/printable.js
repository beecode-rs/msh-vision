"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printable = void 0;
class Printable {
    constructor() {
        this._children = [];
        this._level = 0;
    }
    get Level() {
        return this._level;
    }
    set Level(lev) {
        this._level = lev;
    }
    print() {
        const template = [];
        template.push(this._templateStart());
        template.push(...this._children.map((c) => c.print()));
        template.push(...this._print());
        template.push(this._templateEnd());
        return this._indentByLevel(template.join('\n'));
    }
    _indentByLevel(template) {
        if (this._level === 0)
            return template;
        return template
            .split('\n')
            .map((t) => `  ${t}`)
            .join('\n');
    }
    addChildren(printable) {
        printable.Level = this.Level + 1;
        this._children.push(printable);
    }
}
exports.Printable = Printable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHJpbnRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQXNCLFNBQVM7SUFBL0I7UUFDWSxjQUFTLEdBQWdCLEVBQUUsQ0FBQTtRQUMzQixXQUFNLEdBQUcsQ0FBQyxDQUFBO0lBbUN0QixDQUFDO0lBakNDLElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBQ0QsSUFBVyxLQUFLLENBQUMsR0FBVztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtJQUNuQixDQUFDO0lBTU0sS0FBSztRQUNWLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQTtRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO1FBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTtRQUVsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFUyxjQUFjLENBQUMsUUFBZ0I7UUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUN0QyxPQUFPLFFBQVE7YUFDWixLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1gsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNmLENBQUM7SUFFTSxXQUFXLENBQUMsU0FBb0I7UUFDckMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0NBQ0Y7QUFyQ0QsOEJBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCBfY2hpbGRyZW46IFByaW50YWJsZVtdID0gW11cbiAgcHJvdGVjdGVkIF9sZXZlbCA9IDBcblxuICBwdWJsaWMgZ2V0IExldmVsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xldmVsXG4gIH1cbiAgcHVibGljIHNldCBMZXZlbChsZXY6IG51bWJlcikge1xuICAgIHRoaXMuX2xldmVsID0gbGV2XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3RlbXBsYXRlRW5kKCk6IHN0cmluZ1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfcHJpbnQoKTogc3RyaW5nW11cblxuICBwdWJsaWMgcHJpbnQoKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wbGF0ZTogc3RyaW5nW10gPSBbXVxuICAgIHRlbXBsYXRlLnB1c2godGhpcy5fdGVtcGxhdGVTdGFydCgpKVxuICAgIHRlbXBsYXRlLnB1c2goLi4udGhpcy5fY2hpbGRyZW4ubWFwKChjKSA9PiBjLnByaW50KCkpKVxuICAgIHRlbXBsYXRlLnB1c2goLi4udGhpcy5fcHJpbnQoKSlcbiAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuX3RlbXBsYXRlRW5kKCkpXG5cbiAgICByZXR1cm4gdGhpcy5faW5kZW50QnlMZXZlbCh0ZW1wbGF0ZS5qb2luKCdcXG4nKSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW5kZW50QnlMZXZlbCh0ZW1wbGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fbGV2ZWwgPT09IDApIHJldHVybiB0ZW1wbGF0ZVxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgLm1hcCgodCkgPT4gYCAgJHt0fWApXG4gICAgICAuam9pbignXFxuJylcbiAgfVxuXG4gIHB1YmxpYyBhZGRDaGlsZHJlbihwcmludGFibGU6IFByaW50YWJsZSk6IHZvaWQge1xuICAgIHByaW50YWJsZS5MZXZlbCA9IHRoaXMuTGV2ZWwgKyAxXG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChwcmludGFibGUpXG4gIH1cbn1cbiJdfQ==