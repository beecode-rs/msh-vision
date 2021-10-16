"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visionUseCase = void 0;
const convert_service_1 = require("src/service/convert/convert-service");
const file_service_1 = require("src/service/file-service");
exports.visionUseCase = {
    processFolder: async ({ folderPath, printStrategy }) => {
        const fileList = await file_service_1.fileService.fileListFromFolder({ folderPath });
        const convertStrategies = fileList
            .filter((f) => !f.endsWith('test.ts')) // TODO implement some mechanism to ignore files
            .map((f) => convert_service_1.convertService.strategyByFile({ filePath: f, folderPath }))
            .filter(Boolean);
        const entities = (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat();
        if (!entities)
            return;
        await printStrategy.print({ entities });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uLXVzZS1jYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZS1jYXNlL3Zpc2lvbi11c2UtY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBb0U7QUFFcEUsMkRBQXNEO0FBR3pDLFFBQUEsYUFBYSxHQUFHO0lBQzNCLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUF3RCxFQUFpQixFQUFFO1FBQzFILE1BQU0sUUFBUSxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFDckUsTUFBTSxpQkFBaUIsR0FBRyxRQUFRO2FBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO2FBQ3RGLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsZ0NBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDdEUsTUFBTSxDQUFDLE9BQU8sQ0FBc0IsQ0FBQTtRQUN2QyxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN4RixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU07UUFDckIsTUFBTSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnRTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC9jb252ZXJ0LXNlcnZpY2UnXG5pbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L2NvbnZlcnQtc3RyYXRlZ3knXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcbmltcG9ydCB7IFByaW50U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wcmludC1zdHJhdGVneSdcblxuZXhwb3J0IGNvbnN0IHZpc2lvblVzZUNhc2UgPSB7XG4gIHByb2Nlc3NGb2xkZXI6IGFzeW5jICh7IGZvbGRlclBhdGgsIHByaW50U3RyYXRlZ3kgfTogeyBmb2xkZXJQYXRoOiBzdHJpbmc7IHByaW50U3RyYXRlZ3k6IFByaW50U3RyYXRlZ3kgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gYXdhaXQgZmlsZVNlcnZpY2UuZmlsZUxpc3RGcm9tRm9sZGVyKHsgZm9sZGVyUGF0aCB9KVxuICAgIGNvbnN0IGNvbnZlcnRTdHJhdGVnaWVzID0gZmlsZUxpc3RcbiAgICAgIC5maWx0ZXIoKGYpID0+ICFmLmVuZHNXaXRoKCd0ZXN0LnRzJykpIC8vIFRPRE8gaW1wbGVtZW50IHNvbWUgbWVjaGFuaXNtIHRvIGlnbm9yZSBmaWxlc1xuICAgICAgLm1hcCgoZikgPT4gY29udmVydFNlcnZpY2Uuc3RyYXRlZ3lCeUZpbGUoeyBmaWxlUGF0aDogZiwgZm9sZGVyUGF0aCB9KSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgQ29udmVydFN0cmF0ZWd5W11cbiAgICBjb25zdCBlbnRpdGllcyA9IChhd2FpdCBQcm9taXNlLmFsbChjb252ZXJ0U3RyYXRlZ2llcy5tYXAoKGNzKSA9PiBjcy5jb252ZXJ0KCkpKSkuZmxhdCgpXG4gICAgaWYgKCFlbnRpdGllcykgcmV0dXJuXG4gICAgYXdhaXQgcHJpbnRTdHJhdGVneS5wcmludCh7IGVudGl0aWVzIH0pXG4gIH0sXG59XG4iXX0=