"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellDal = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const logger_1 = require("src/util/logger");
exports.shellDal = {
    exec: (cmd) => new Promise((resolve) => {
        (0, logger_1.logger)().debug(exports.shellDal.pwd());
        shelljs_1.default.exec(cmd, { silent: true }, (code, stdout, stderr) => {
            const errorOccurred = code !== 0;
            return resolve({ stdout, stderr, errorOccurred });
        });
    }),
    print: (message) => {
        shelljs_1.default.echo(message);
    },
    cd: (dir) => {
        shelljs_1.default.cd(dir);
    },
    pwd: () => {
        return shelljs_1.default.pwd();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGwtZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhbC9zaGVsbC1kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTJCO0FBQzNCLDRDQUF3QztBQVEzQixRQUFBLFFBQVEsR0FBRztJQUN0QixJQUFJLEVBQUUsQ0FBQyxHQUFXLEVBQXVCLEVBQUUsQ0FDekMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN0QixJQUFBLGVBQU0sR0FBRSxDQUFDLEtBQUssQ0FBQyxnQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDOUIsaUJBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6RCxNQUFNLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFBO1lBQ2hDLE9BQU8sT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDO0lBQ0osS0FBSyxFQUFFLENBQUMsT0FBZSxFQUFRLEVBQUU7UUFDL0IsaUJBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUNELEVBQUUsRUFBRSxDQUFDLEdBQVcsRUFBUSxFQUFFO1FBQ3hCLGlCQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2YsQ0FBQztJQUNELEdBQUcsRUFBRSxHQUFXLEVBQUU7UUFDaEIsT0FBTyxpQkFBSyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNoZWxsIGZyb20gJ3NoZWxsanMnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCB0eXBlIEV4ZWNSZXN1bHQgPSB7XG4gIHN0ZG91dDogc3RyaW5nXG4gIHN0ZGVycjogc3RyaW5nXG4gIGVycm9yT2NjdXJyZWQ6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IHNoZWxsRGFsID0ge1xuICBleGVjOiAoY21kOiBzdHJpbmcpOiBQcm9taXNlPEV4ZWNSZXN1bHQ+ID0+XG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGxvZ2dlcigpLmRlYnVnKHNoZWxsRGFsLnB3ZCgpKVxuICAgICAgc2hlbGwuZXhlYyhjbWQsIHsgc2lsZW50OiB0cnVlIH0sIChjb2RlLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICBjb25zdCBlcnJvck9jY3VycmVkID0gY29kZSAhPT0gMFxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IHN0ZG91dCwgc3RkZXJyLCBlcnJvck9jY3VycmVkIH0pXG4gICAgICB9KVxuICAgIH0pLFxuICBwcmludDogKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHNoZWxsLmVjaG8obWVzc2FnZSlcbiAgfSxcbiAgY2Q6IChkaXI6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHNoZWxsLmNkKGRpcilcbiAgfSxcbiAgcHdkOiAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gc2hlbGwucHdkKClcbiAgfSxcbn1cbiJdfQ==