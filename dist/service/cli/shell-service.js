"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellService = void 0;
const chalk_1 = __importDefault(require("chalk"));
const shell_dal_1 = require("src/dal/shell-dal");
const constant_1 = require("src/util/constant");
exports.shellService = {
    exec: shell_dal_1.shellDal.exec,
    cd: shell_dal_1.shellDal.cd,
    print: shell_dal_1.shellDal.print,
    printStdMessage: (...messageArgs) => {
        const messages = exports.shellService._joinResults(messageArgs);
        for (const [key, execResult] of Object.entries(messages)) {
            exports.shellService.print(chalk_1.default.cyan(key));
            for (const msg of execResult.stdout.split(constant_1.constant.newRow))
                exports.shellService.print(msg);
            for (const msg of execResult.stderr.split(constant_1.constant.newRow))
                exports.shellService.printError(msg);
        }
    },
    _joinResults: (results) => {
        return results.reduce((agg, cur) => {
            agg = Object.assign(agg, cur);
            return agg;
        }, {});
    },
    printError: (message) => {
        shell_dal_1.shellDal.print(chalk_1.default.red(message));
    },
    printSuccess: (message) => {
        shell_dal_1.shellDal.print(chalk_1.default.green(message));
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NsaS9zaGVsbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUF5QjtBQUN6QixpREFBd0Q7QUFDeEQsZ0RBQTRDO0FBSy9CLFFBQUEsWUFBWSxHQUFHO0lBQzFCLElBQUksRUFBRSxvQkFBUSxDQUFDLElBQUk7SUFDbkIsRUFBRSxFQUFFLG9CQUFRLENBQUMsRUFBRTtJQUNmLEtBQUssRUFBRSxvQkFBUSxDQUFDLEtBQUs7SUFDckIsZUFBZSxFQUFFLENBQUMsR0FBRyxXQUE4QixFQUFRLEVBQUU7UUFDM0QsTUFBTSxRQUFRLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdkQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEQsb0JBQVksQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ25DLEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQUUsb0JBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbkYsS0FBSyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxvQkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUN6RjtJQUNILENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxPQUEwQixFQUFtQixFQUFFO1FBQzVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNqQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDN0IsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUUsRUFBcUIsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxVQUFVLEVBQUUsQ0FBQyxPQUFlLEVBQVEsRUFBRTtRQUNwQyxvQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLE9BQWUsRUFBUSxFQUFFO1FBQ3RDLG9CQUFRLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB7IEV4ZWNSZXN1bHQsIHNoZWxsRGFsIH0gZnJvbSAnc3JjL2RhbC9zaGVsbC1kYWwnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgdHlwZSBQcmludFN0ZE1lc3NhZ2UgPSB7XG4gIFtrZXk6IHN0cmluZ106IEV4ZWNSZXN1bHRcbn1cbmV4cG9ydCBjb25zdCBzaGVsbFNlcnZpY2UgPSB7XG4gIGV4ZWM6IHNoZWxsRGFsLmV4ZWMsXG4gIGNkOiBzaGVsbERhbC5jZCxcbiAgcHJpbnQ6IHNoZWxsRGFsLnByaW50LFxuICBwcmludFN0ZE1lc3NhZ2U6ICguLi5tZXNzYWdlQXJnczogUHJpbnRTdGRNZXNzYWdlW10pOiB2b2lkID0+IHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IHNoZWxsU2VydmljZS5fam9pblJlc3VsdHMobWVzc2FnZUFyZ3MpXG4gICAgZm9yIChjb25zdCBba2V5LCBleGVjUmVzdWx0XSBvZiBPYmplY3QuZW50cmllcyhtZXNzYWdlcykpIHtcbiAgICAgIHNoZWxsU2VydmljZS5wcmludChjaGFsay5jeWFuKGtleSkpXG4gICAgICBmb3IgKGNvbnN0IG1zZyBvZiBleGVjUmVzdWx0LnN0ZG91dC5zcGxpdChjb25zdGFudC5uZXdSb3cpKSBzaGVsbFNlcnZpY2UucHJpbnQobXNnKVxuICAgICAgZm9yIChjb25zdCBtc2cgb2YgZXhlY1Jlc3VsdC5zdGRlcnIuc3BsaXQoY29uc3RhbnQubmV3Um93KSkgc2hlbGxTZXJ2aWNlLnByaW50RXJyb3IobXNnKVxuICAgIH1cbiAgfSxcbiAgX2pvaW5SZXN1bHRzOiAocmVzdWx0czogUHJpbnRTdGRNZXNzYWdlW10pOiBQcmludFN0ZE1lc3NhZ2UgPT4ge1xuICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWdnLCBjdXIpID0+IHtcbiAgICAgIGFnZyA9IE9iamVjdC5hc3NpZ24oYWdnLCBjdXIpXG4gICAgICByZXR1cm4gYWdnXG4gICAgfSwge30gYXMgUHJpbnRTdGRNZXNzYWdlKVxuICB9LFxuICBwcmludEVycm9yOiAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgc2hlbGxEYWwucHJpbnQoY2hhbGsucmVkKG1lc3NhZ2UpKVxuICB9LFxuICBwcmludFN1Y2Nlc3M6IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBzaGVsbERhbC5wcmludChjaGFsay5ncmVlbihtZXNzYWdlKSlcbiAgfSxcbn1cbiJdfQ==