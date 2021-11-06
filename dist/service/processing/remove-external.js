"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveExternal = void 0;
class RemoveExternal {
    process(entities) {
        entities.forEach((entity) => {
            if (entity.References.length === 0)
                return;
            entity.References = entity.References.filter((r) => entities.find((e) => r.InProjectPath === e.InProjectPath));
        });
        return entities;
    }
}
exports.RemoveExternal = RemoveExternal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWV4dGVybmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJvY2Vzc2luZy9yZW1vdmUtZXh0ZXJuYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBYSxjQUFjO0lBQ2xCLE9BQU8sQ0FBQyxRQUFrQjtRQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLE9BQU07WUFDMUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtRQUNoSCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sUUFBUSxDQUFBO0lBQ2pCLENBQUM7Q0FDRjtBQVJELHdDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUHJvY2Vzc2luZ1N0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJvY2Vzc2luZy9wcm9jZXNzaW5nLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVFeHRlcm5hbCBpbXBsZW1lbnRzIFByb2Nlc3NpbmdTdHJhdGVneSB7XG4gIHB1YmxpYyBwcm9jZXNzKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdIHtcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IHtcbiAgICAgIGlmIChlbnRpdHkuUmVmZXJlbmNlcy5sZW5ndGggPT09IDApIHJldHVyblxuICAgICAgZW50aXR5LlJlZmVyZW5jZXMgPSBlbnRpdHkuUmVmZXJlbmNlcy5maWx0ZXIoKHIpID0+IGVudGl0aWVzLmZpbmQoKGUpID0+IHIuSW5Qcm9qZWN0UGF0aCA9PT0gZS5JblByb2plY3RQYXRoKSlcbiAgICB9KVxuICAgIHJldHVybiBlbnRpdGllc1xuICB9XG59XG4iXX0=