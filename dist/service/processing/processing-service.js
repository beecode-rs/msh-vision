"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processingService = void 0;
const remove_external_1 = require("src/service/processing/remove-external");
const remove_ignored_paths_1 = require("src/service/processing/remove-ignored-paths");
const remove_types_1 = require("src/service/processing/remove-types");
const simplify_entities_1 = require("src/service/processing/simplify-entities");
const config_1 = require("src/util/config");
exports.processingService = {
    process: (entities) => {
        const processingStrategies = [];
        const { print: { ignorePaths, ignoreTypes, ignoreExternal, simplifyEntities }, } = (0, config_1.visionConfig)();
        if (ignorePaths.length > 0)
            processingStrategies.push(new remove_ignored_paths_1.RemoveIgnoredPaths(ignorePaths));
        if (ignoreExternal)
            processingStrategies.push(new remove_external_1.RemoveExternal());
        if (ignoreTypes)
            processingStrategies.push(new remove_types_1.RemoveTypes());
        if (simplifyEntities.length > 0)
            processingStrategies.push(new simplify_entities_1.SimplifyEntities(simplifyEntities));
        return processingStrategies.reduce((agg, cur) => {
            return cur.process(agg);
        }, entities);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc2luZy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJvY2Vzc2luZy9wcm9jZXNzaW5nLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNEVBQXVFO0FBQ3ZFLHNGQUFnRjtBQUNoRixzRUFBaUU7QUFDakUsZ0ZBQTJFO0FBQzNFLDRDQUE4QztBQU1qQyxRQUFBLGlCQUFpQixHQUFHO0lBQy9CLE9BQU8sRUFBRSxDQUFDLFFBQWtCLEVBQVksRUFBRTtRQUN4QyxNQUFNLG9CQUFvQixHQUF5QixFQUFFLENBQUE7UUFFckQsTUFBTSxFQUNKLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLEdBQ3RFLEdBQUcsSUFBQSxxQkFBWSxHQUFFLENBQUE7UUFFbEIsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx5Q0FBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQzFGLElBQUksY0FBYztZQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLGdDQUFjLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLElBQUksV0FBVztZQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLDBCQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQzdELElBQUksZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxvQ0FBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUE7UUFFbEcsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLENBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDeEQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFJlbW92ZUV4dGVybmFsIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJvY2Vzc2luZy9yZW1vdmUtZXh0ZXJuYWwnXG5pbXBvcnQgeyBSZW1vdmVJZ25vcmVkUGF0aHMgfSBmcm9tICdzcmMvc2VydmljZS9wcm9jZXNzaW5nL3JlbW92ZS1pZ25vcmVkLXBhdGhzJ1xuaW1wb3J0IHsgUmVtb3ZlVHlwZXMgfSBmcm9tICdzcmMvc2VydmljZS9wcm9jZXNzaW5nL3JlbW92ZS10eXBlcydcbmltcG9ydCB7IFNpbXBsaWZ5RW50aXRpZXMgfSBmcm9tICdzcmMvc2VydmljZS9wcm9jZXNzaW5nL3NpbXBsaWZ5LWVudGl0aWVzJ1xuaW1wb3J0IHsgdmlzaW9uQ29uZmlnIH0gZnJvbSAnc3JjL3V0aWwvY29uZmlnJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2Nlc3NpbmdTdHJhdGVneSB7XG4gIHByb2Nlc3MoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W11cbn1cblxuZXhwb3J0IGNvbnN0IHByb2Nlc3NpbmdTZXJ2aWNlID0ge1xuICBwcm9jZXNzOiAoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10gPT4ge1xuICAgIGNvbnN0IHByb2Nlc3NpbmdTdHJhdGVnaWVzOiBQcm9jZXNzaW5nU3RyYXRlZ3lbXSA9IFtdXG5cbiAgICBjb25zdCB7XG4gICAgICBwcmludDogeyBpZ25vcmVQYXRocywgaWdub3JlVHlwZXMsIGlnbm9yZUV4dGVybmFsLCBzaW1wbGlmeUVudGl0aWVzIH0sXG4gICAgfSA9IHZpc2lvbkNvbmZpZygpXG5cbiAgICBpZiAoaWdub3JlUGF0aHMubGVuZ3RoID4gMCkgcHJvY2Vzc2luZ1N0cmF0ZWdpZXMucHVzaChuZXcgUmVtb3ZlSWdub3JlZFBhdGhzKGlnbm9yZVBhdGhzKSlcbiAgICBpZiAoaWdub3JlRXh0ZXJuYWwpIHByb2Nlc3NpbmdTdHJhdGVnaWVzLnB1c2gobmV3IFJlbW92ZUV4dGVybmFsKCkpXG4gICAgaWYgKGlnbm9yZVR5cGVzKSBwcm9jZXNzaW5nU3RyYXRlZ2llcy5wdXNoKG5ldyBSZW1vdmVUeXBlcygpKVxuICAgIGlmIChzaW1wbGlmeUVudGl0aWVzLmxlbmd0aCA+IDApIHByb2Nlc3NpbmdTdHJhdGVnaWVzLnB1c2gobmV3IFNpbXBsaWZ5RW50aXRpZXMoc2ltcGxpZnlFbnRpdGllcykpXG5cbiAgICByZXR1cm4gcHJvY2Vzc2luZ1N0cmF0ZWdpZXMucmVkdWNlPEVudGl0eVtdPigoYWdnLCBjdXIpID0+IHtcbiAgICAgIHJldHVybiBjdXIucHJvY2VzcyhhZ2cpXG4gICAgfSwgZW50aXRpZXMpXG4gIH0sXG59XG4iXX0=