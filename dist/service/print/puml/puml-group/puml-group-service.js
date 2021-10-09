"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlGroupService = void 0;
exports.pumlGroupService = {
    printGroups: (groups) => {
        return Object.values(groups)
            .map((pg) => pg.print())
            .join('\n');
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWdyb3VwL3B1bWwtZ3JvdXAtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLGdCQUFnQixHQUFHO0lBQzlCLFdBQVcsRUFBRSxDQUFDLE1BQWtDLEVBQVUsRUFBRTtRQUMxRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3pCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNmLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWdyb3VwL3B1bWwtZ3JvdXAnXG5cbmV4cG9ydCBjb25zdCBwdW1sR3JvdXBTZXJ2aWNlID0ge1xuICBwcmludEdyb3VwczogKGdyb3VwczogeyBbazogc3RyaW5nXTogUHVtbEdyb3VwIH0pOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGdyb3VwcylcbiAgICAgIC5tYXAoKHBnKSA9PiBwZy5wcmludCgpKVxuICAgICAgLmpvaW4oJ1xcbicpXG4gIH0sXG59XG4iXX0=