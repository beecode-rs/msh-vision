"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlEntity = void 0;
const constant_1 = require("src/util/constant");
class PumlEntity {
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
exports.PumlEntity = PumlEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUE0QztBQUU1QyxNQUFzQixVQUFVO0lBQWhDO1FBQ1ksY0FBUyxHQUFpQixFQUFFLENBQUE7SUErQnhDLENBQUM7SUF6QlEsS0FBSztRQUNWLE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQTtRQUNqQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDMUQsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBRW5DLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQTtRQUM3QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDaEQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTtRQUUzRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRVMsV0FBVyxDQUFDLFNBQW1CO1FBQ3ZDLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQ2hDLFFBQVE7YUFDTCxLQUFLLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUM7YUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ3hCLElBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUN6QixDQUFBO0lBQ0gsQ0FBQztJQUVNLFdBQVcsQ0FBQyxTQUFxQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0NBQ0Y7QUFoQ0QsZ0NBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgX2NoaWxkcmVuOiBQdW1sRW50aXR5W10gPSBbXVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmdcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9wcmludCgpOiBzdHJpbmdbXVxuXG4gIHB1YmxpYyBwcmludCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJvZHlUZW1wbGF0ZTogc3RyaW5nW10gPSBbXVxuICAgIGJvZHlUZW1wbGF0ZS5wdXNoKC4uLnRoaXMuX2NoaWxkcmVuLm1hcCgoYykgPT4gYy5wcmludCgpKSlcbiAgICBib2R5VGVtcGxhdGUucHVzaCguLi50aGlzLl9wcmludCgpKVxuXG4gICAgY29uc3QgdGVtcGxhdGU6IHN0cmluZ1tdID0gW11cbiAgICBpZiAodGhpcy5fdGVtcGxhdGVTdGFydCgpKSB0ZW1wbGF0ZS5wdXNoKHRoaXMuX3RlbXBsYXRlU3RhcnQoKSlcbiAgICB0ZW1wbGF0ZS5wdXNoKC4uLnRoaXMuX2luZGVudFJvd3MoYm9keVRlbXBsYXRlKSlcbiAgICBpZiAodGhpcy5fdGVtcGxhdGVFbmQoKSkgdGVtcGxhdGUucHVzaCh0aGlzLl90ZW1wbGF0ZUVuZCgpKVxuXG4gICAgcmV0dXJuIHRlbXBsYXRlLmpvaW4oY29uc3RhbnQubmV3Um93KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pbmRlbnRSb3dzKHRlbXBsYXRlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlcy5tYXAoKHRlbXBsYXRlKSA9PlxuICAgICAgdGVtcGxhdGVcbiAgICAgICAgLnNwbGl0KGNvbnN0YW50Lm5ld1JvdylcbiAgICAgICAgLm1hcCgocm93KSA9PiBgICAke3Jvd31gKVxuICAgICAgICAuam9pbihjb25zdGFudC5uZXdSb3cpXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFkZENoaWxkcmVuKHByaW50YWJsZTogUHVtbEVudGl0eSk6IHZvaWQge1xuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2gocHJpbnRhYmxlKVxuICB9XG59XG4iXX0=