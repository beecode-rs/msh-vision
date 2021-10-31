"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visionUseCase = void 0;
const convert_service_1 = require("src/service/convert-service");
const file_service_1 = require("src/service/file-service");
const config_1 = require("src/util/config");
exports.visionUseCase = {
    processFolder: async (params) => {
        const { folderPath, printStrategy } = params;
        const fileList = await file_service_1.fileService.fileListFromFolder(folderPath);
        const convertStrategies = fileList
            .map((f) => convert_service_1.convertService.strategyByFile({ filePath: f, folderPath }))
            .filter(Boolean);
        const entities = (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat();
        if (!entities)
            return;
        const cleanEntities = exports.visionUseCase._removeIgnoredPaths(entities);
        const noExternalEntities = exports.visionUseCase._removeExternal(cleanEntities);
        await printStrategy.print({ entities: noExternalEntities });
    },
    _removeIgnoredPaths: (entities) => {
        const { print: { ignorePaths }, } = (0, config_1.visionConfig)();
        if (ignorePaths.length === 0)
            return entities;
        const removedIgnoredEntities = entities.filter((e) => !ignorePaths.find((ip) => e.InProjectPath.startsWith(ip)));
        removedIgnoredEntities.forEach((rie) => rie.removeIgnoredReferences(ignorePaths));
        return removedIgnoredEntities;
    },
    _removeExternal: (entities) => {
        if (!(0, config_1.visionConfig)().print.ignoreExternal)
            return entities;
        entities.forEach((entity) => {
            if (entity.References.length === 0)
                return;
            entity.References = entity.References.filter((r) => entities.find((e) => r.InProjectPath === e.InProjectPath));
        });
        return entities;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uLXVzZS1jYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZS1jYXNlL3Zpc2lvbi11c2UtY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpRUFBNkU7QUFDN0UsMkRBQXNEO0FBR3RELDRDQUE4QztBQUVqQyxRQUFBLGFBQWEsR0FBRztJQUMzQixhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQTRELEVBQWlCLEVBQUU7UUFDbkcsTUFBTSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDNUMsTUFBTSxRQUFRLEdBQUcsTUFBTSwwQkFBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0saUJBQWlCLEdBQUcsUUFBUTthQUMvQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGdDQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ3RFLE1BQU0sQ0FBQyxPQUFPLENBQXNCLENBQUE7UUFDdkMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDeEYsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFNO1FBQ3JCLE1BQU0sYUFBYSxHQUFHLHFCQUFhLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDakUsTUFBTSxrQkFBa0IsR0FBRyxxQkFBYSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN2RSxNQUFNLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFDRCxtQkFBbUIsRUFBRSxDQUFDLFFBQWtCLEVBQVksRUFBRTtRQUNwRCxNQUFNLEVBQ0osS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLEdBQ3ZCLEdBQUcsSUFBQSxxQkFBWSxHQUFFLENBQUE7UUFDbEIsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUM3QyxNQUFNLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hILHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7UUFDakYsT0FBTyxzQkFBc0IsQ0FBQTtJQUMvQixDQUFDO0lBQ0QsZUFBZSxFQUFFLENBQUMsUUFBa0IsRUFBWSxFQUFFO1FBQ2hELElBQUksQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYztZQUFFLE9BQU8sUUFBUSxDQUFBO1FBQ3pELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMxQixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQUUsT0FBTTtZQUMxQyxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBQ2hILENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3ksIGNvbnZlcnRTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC1zZXJ2aWNlJ1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtc3RyYXRlZ3knXG5pbXBvcnQgeyB2aXNpb25Db25maWcgfSBmcm9tICdzcmMvdXRpbC9jb25maWcnXG5cbmV4cG9ydCBjb25zdCB2aXNpb25Vc2VDYXNlID0ge1xuICBwcm9jZXNzRm9sZGVyOiBhc3luYyAocGFyYW1zOiB7IGZvbGRlclBhdGg6IHN0cmluZzsgcHJpbnRTdHJhdGVneTogUHJpbnRTdHJhdGVneSB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBmb2xkZXJQYXRoLCBwcmludFN0cmF0ZWd5IH0gPSBwYXJhbXNcbiAgICBjb25zdCBmaWxlTGlzdCA9IGF3YWl0IGZpbGVTZXJ2aWNlLmZpbGVMaXN0RnJvbUZvbGRlcihmb2xkZXJQYXRoKVxuICAgIGNvbnN0IGNvbnZlcnRTdHJhdGVnaWVzID0gZmlsZUxpc3RcbiAgICAgIC5tYXAoKGYpID0+IGNvbnZlcnRTZXJ2aWNlLnN0cmF0ZWd5QnlGaWxlKHsgZmlsZVBhdGg6IGYsIGZvbGRlclBhdGggfSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIENvbnZlcnRTdHJhdGVneVtdXG4gICAgY29uc3QgZW50aXRpZXMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoY29udmVydFN0cmF0ZWdpZXMubWFwKChjcykgPT4gY3MuY29udmVydCgpKSkpLmZsYXQoKVxuICAgIGlmICghZW50aXRpZXMpIHJldHVyblxuICAgIGNvbnN0IGNsZWFuRW50aXRpZXMgPSB2aXNpb25Vc2VDYXNlLl9yZW1vdmVJZ25vcmVkUGF0aHMoZW50aXRpZXMpXG4gICAgY29uc3Qgbm9FeHRlcm5hbEVudGl0aWVzID0gdmlzaW9uVXNlQ2FzZS5fcmVtb3ZlRXh0ZXJuYWwoY2xlYW5FbnRpdGllcylcbiAgICBhd2FpdCBwcmludFN0cmF0ZWd5LnByaW50KHsgZW50aXRpZXM6IG5vRXh0ZXJuYWxFbnRpdGllcyB9KVxuICB9LFxuICBfcmVtb3ZlSWdub3JlZFBhdGhzOiAoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10gPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHByaW50OiB7IGlnbm9yZVBhdGhzIH0sXG4gICAgfSA9IHZpc2lvbkNvbmZpZygpXG4gICAgaWYgKGlnbm9yZVBhdGhzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG4gICAgY29uc3QgcmVtb3ZlZElnbm9yZWRFbnRpdGllcyA9IGVudGl0aWVzLmZpbHRlcigoZSkgPT4gIWlnbm9yZVBhdGhzLmZpbmQoKGlwKSA9PiBlLkluUHJvamVjdFBhdGguc3RhcnRzV2l0aChpcCkpKVxuICAgIHJlbW92ZWRJZ25vcmVkRW50aXRpZXMuZm9yRWFjaCgocmllKSA9PiByaWUucmVtb3ZlSWdub3JlZFJlZmVyZW5jZXMoaWdub3JlUGF0aHMpKVxuICAgIHJldHVybiByZW1vdmVkSWdub3JlZEVudGl0aWVzXG4gIH0sXG4gIF9yZW1vdmVFeHRlcm5hbDogKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdID0+IHtcbiAgICBpZiAoIXZpc2lvbkNvbmZpZygpLnByaW50Lmlnbm9yZUV4dGVybmFsKSByZXR1cm4gZW50aXRpZXNcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IHtcbiAgICAgIGlmIChlbnRpdHkuUmVmZXJlbmNlcy5sZW5ndGggPT09IDApIHJldHVyblxuICAgICAgZW50aXR5LlJlZmVyZW5jZXMgPSBlbnRpdHkuUmVmZXJlbmNlcy5maWx0ZXIoKHIpID0+IGVudGl0aWVzLmZpbmQoKGUpID0+IHIuSW5Qcm9qZWN0UGF0aCA9PT0gZS5JblByb2plY3RQYXRoKSlcbiAgICB9KVxuICAgIHJldHVybiBlbnRpdGllc1xuICB9LFxufVxuIl19