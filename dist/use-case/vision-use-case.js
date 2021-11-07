"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visionUseCase = void 0;
const file_dao_1 = require("src/dal/file-dao");
const parser_service_1 = require("src/service/parser-service");
exports.visionUseCase = {
    parseFolder: async (params) => {
        const { folderPath } = params;
        const fileList = await file_dao_1.fileDao.fileListFromFolder(folderPath);
        const convertStrategies = fileList
            .map((f) => parser_service_1.parserService.strategyByFile({ filePath: f, folderPath }))
            .filter(Boolean);
        return (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uLXVzZS1jYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZS1jYXNlL3Zpc2lvbi11c2UtY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMEM7QUFFMUMsK0RBQTJFO0FBRTlELFFBQUEsYUFBYSxHQUFHO0lBQzNCLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBOEIsRUFBcUIsRUFBRTtRQUN2RSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sa0JBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM3RCxNQUFNLGlCQUFpQixHQUFHLFFBQVE7YUFDL0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyw4QkFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUNyRSxNQUFNLENBQUMsT0FBTyxDQUFzQixDQUFBO1FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDaEYsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWxlRGFvIH0gZnJvbSAnc3JjL2RhbC9maWxlLWRhbydcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3ksIHBhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNvbnN0IHZpc2lvblVzZUNhc2UgPSB7XG4gIHBhcnNlRm9sZGVyOiBhc3luYyAocGFyYW1zOiB7IGZvbGRlclBhdGg6IHN0cmluZyB9KTogUHJvbWlzZTxFbnRpdHlbXT4gPT4ge1xuICAgIGNvbnN0IHsgZm9sZGVyUGF0aCB9ID0gcGFyYW1zXG4gICAgY29uc3QgZmlsZUxpc3QgPSBhd2FpdCBmaWxlRGFvLmZpbGVMaXN0RnJvbUZvbGRlcihmb2xkZXJQYXRoKVxuICAgIGNvbnN0IGNvbnZlcnRTdHJhdGVnaWVzID0gZmlsZUxpc3RcbiAgICAgIC5tYXAoKGYpID0+IHBhcnNlclNlcnZpY2Uuc3RyYXRlZ3lCeUZpbGUoeyBmaWxlUGF0aDogZiwgZm9sZGVyUGF0aCB9KSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgQ29udmVydFN0cmF0ZWd5W11cbiAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKGNvbnZlcnRTdHJhdGVnaWVzLm1hcCgoY3MpID0+IGNzLmNvbnZlcnQoKSkpKS5mbGF0KClcbiAgfSxcbn1cbiJdfQ==