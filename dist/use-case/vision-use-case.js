"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visionUseCase = void 0;
const file_dao_1 = require("src/dal/file-dao");
const parser_service_1 = require("src/service/parser-service");
const _self = {
    parseFolder: async (params) => {
        const { projectRootPath, projectSrcFolderPath } = params;
        const fileList = await file_dao_1.fileDao.fileListFromFolder({ rootFolder: projectRootPath, folderPath: projectSrcFolderPath });
        const convertStrategies = fileList
            .map((f) => parser_service_1.parserService.strategyByFile({ filePath: f, projectRootPath }))
            .filter(Boolean);
        return (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat();
    },
};
exports.visionUseCase = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uLXVzZS1jYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZS1jYXNlL3Zpc2lvbi11c2UtY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMEM7QUFFMUMsK0RBQTJFO0FBRTNFLE1BQU0sS0FBSyxHQUFHO0lBQ1osV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFpRSxFQUFxQixFQUFFO1FBQzFHLE1BQU0sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxrQkFBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO1FBQ3BILE1BQU0saUJBQWlCLEdBQUcsUUFBUTthQUMvQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLDhCQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO2FBQzFFLE1BQU0sQ0FBQyxPQUFPLENBQXNCLENBQUE7UUFDdkMsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNoRixDQUFDO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsYUFBYSxHQUFHLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbGVEYW8gfSBmcm9tICdzcmMvZGFsL2ZpbGUtZGFvJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IENvbnZlcnRTdHJhdGVneSwgcGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci1zZXJ2aWNlJ1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgcGFyc2VGb2xkZXI6IGFzeW5jIChwYXJhbXM6IHsgcHJvamVjdFJvb3RQYXRoOiBzdHJpbmc7IHByb2plY3RTcmNGb2xkZXJQYXRoOiBzdHJpbmcgfSk6IFByb21pc2U8RW50aXR5W10+ID0+IHtcbiAgICBjb25zdCB7IHByb2plY3RSb290UGF0aCwgcHJvamVjdFNyY0ZvbGRlclBhdGggfSA9IHBhcmFtc1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gYXdhaXQgZmlsZURhby5maWxlTGlzdEZyb21Gb2xkZXIoeyByb290Rm9sZGVyOiBwcm9qZWN0Um9vdFBhdGgsIGZvbGRlclBhdGg6IHByb2plY3RTcmNGb2xkZXJQYXRoIH0pXG4gICAgY29uc3QgY29udmVydFN0cmF0ZWdpZXMgPSBmaWxlTGlzdFxuICAgICAgLm1hcCgoZikgPT4gcGFyc2VyU2VydmljZS5zdHJhdGVneUJ5RmlsZSh7IGZpbGVQYXRoOiBmLCBwcm9qZWN0Um9vdFBhdGggfSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIENvbnZlcnRTdHJhdGVneVtdXG4gICAgcmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbChjb252ZXJ0U3RyYXRlZ2llcy5tYXAoKGNzKSA9PiBjcy5jb252ZXJ0KCkpKSkuZmxhdCgpXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCB2aXNpb25Vc2VDYXNlID0gX3NlbGZcbiJdfQ==