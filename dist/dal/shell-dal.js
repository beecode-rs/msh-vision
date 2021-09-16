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
        logger_1.logger.debug(exports.shellDal.pwd());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGwtZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhbC9zaGVsbC1kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTJCO0FBQzNCLDRDQUF3QztBQVEzQixRQUFBLFFBQVEsR0FBRztJQUN0QixJQUFJLEVBQUUsQ0FBQyxHQUFXLEVBQXVCLEVBQUUsQ0FDekMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN0QixlQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUM1QixpQkFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pELE1BQU0sYUFBYSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUE7WUFDaEMsT0FBTyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7UUFDbkQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUM7SUFDSixLQUFLLEVBQUUsQ0FBQyxPQUFlLEVBQVEsRUFBRTtRQUMvQixpQkFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBQ0QsRUFBRSxFQUFFLENBQUMsR0FBVyxFQUFRLEVBQUU7UUFDeEIsaUJBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZixDQUFDO0lBQ0QsR0FBRyxFQUFFLEdBQVcsRUFBRTtRQUNoQixPQUFPLGlCQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDcEIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IHR5cGUgRXhlY1Jlc3VsdCA9IHtcbiAgc3Rkb3V0OiBzdHJpbmdcbiAgc3RkZXJyOiBzdHJpbmdcbiAgZXJyb3JPY2N1cnJlZDogYm9vbGVhblxufVxuXG5leHBvcnQgY29uc3Qgc2hlbGxEYWwgPSB7XG4gIGV4ZWM6IChjbWQ6IHN0cmluZyk6IFByb21pc2U8RXhlY1Jlc3VsdD4gPT5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgbG9nZ2VyLmRlYnVnKHNoZWxsRGFsLnB3ZCgpKVxuICAgICAgc2hlbGwuZXhlYyhjbWQsIHsgc2lsZW50OiB0cnVlIH0sIChjb2RlLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICBjb25zdCBlcnJvck9jY3VycmVkID0gY29kZSAhPT0gMFxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IHN0ZG91dCwgc3RkZXJyLCBlcnJvck9jY3VycmVkIH0pXG4gICAgICB9KVxuICAgIH0pLFxuICBwcmludDogKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHNoZWxsLmVjaG8obWVzc2FnZSlcbiAgfSxcbiAgY2Q6IChkaXI6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHNoZWxsLmNkKGRpcilcbiAgfSxcbiAgcHdkOiAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gc2hlbGwucHdkKClcbiAgfSxcbn1cbiJdfQ==