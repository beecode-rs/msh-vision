"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellService = void 0;
const chalk_1 = __importDefault(require("chalk"));
const shell_dal_1 = require("src/dal/shell-dal");
exports.shellService = {
    exec: shell_dal_1.shellDal.exec,
    cd: shell_dal_1.shellDal.cd,
    print: shell_dal_1.shellDal.print,
    printStdMessage: (...messageArgs) => {
        const messages = exports.shellService._joinResults(messageArgs);
        for (const [key, execResult] of Object.entries(messages)) {
            exports.shellService.print(chalk_1.default.cyan(key));
            for (const msg of execResult.stdout.split('\n'))
                exports.shellService.print(msg);
            for (const msg of execResult.stderr.split('\n'))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3NoZWxsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQXlCO0FBQ3pCLGlEQUF3RDtBQUszQyxRQUFBLFlBQVksR0FBRztJQUMxQixJQUFJLEVBQUUsb0JBQVEsQ0FBQyxJQUFJO0lBQ25CLEVBQUUsRUFBRSxvQkFBUSxDQUFDLEVBQUU7SUFDZixLQUFLLEVBQUUsb0JBQVEsQ0FBQyxLQUFLO0lBQ3JCLGVBQWUsRUFBRSxDQUFDLEdBQUcsV0FBOEIsRUFBUSxFQUFFO1FBQzNELE1BQU0sUUFBUSxHQUFHLG9CQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZELEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hELG9CQUFZLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBRSxvQkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN4RSxLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBRSxvQkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUM5RTtJQUNILENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxPQUEwQixFQUFtQixFQUFFO1FBQzVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNqQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDN0IsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUUsRUFBcUIsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxVQUFVLEVBQUUsQ0FBQyxPQUFlLEVBQVEsRUFBRTtRQUNwQyxvQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLE9BQWUsRUFBUSxFQUFFO1FBQ3RDLG9CQUFRLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB7IEV4ZWNSZXN1bHQsIHNoZWxsRGFsIH0gZnJvbSAnc3JjL2RhbC9zaGVsbC1kYWwnXG5cbmV4cG9ydCB0eXBlIFByaW50U3RkTWVzc2FnZSA9IHtcbiAgW2tleTogc3RyaW5nXTogRXhlY1Jlc3VsdFxufVxuZXhwb3J0IGNvbnN0IHNoZWxsU2VydmljZSA9IHtcbiAgZXhlYzogc2hlbGxEYWwuZXhlYyxcbiAgY2Q6IHNoZWxsRGFsLmNkLFxuICBwcmludDogc2hlbGxEYWwucHJpbnQsXG4gIHByaW50U3RkTWVzc2FnZTogKC4uLm1lc3NhZ2VBcmdzOiBQcmludFN0ZE1lc3NhZ2VbXSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gc2hlbGxTZXJ2aWNlLl9qb2luUmVzdWx0cyhtZXNzYWdlQXJncylcbiAgICBmb3IgKGNvbnN0IFtrZXksIGV4ZWNSZXN1bHRdIG9mIE9iamVjdC5lbnRyaWVzKG1lc3NhZ2VzKSkge1xuICAgICAgc2hlbGxTZXJ2aWNlLnByaW50KGNoYWxrLmN5YW4oa2V5KSlcbiAgICAgIGZvciAoY29uc3QgbXNnIG9mIGV4ZWNSZXN1bHQuc3Rkb3V0LnNwbGl0KCdcXG4nKSkgc2hlbGxTZXJ2aWNlLnByaW50KG1zZylcbiAgICAgIGZvciAoY29uc3QgbXNnIG9mIGV4ZWNSZXN1bHQuc3RkZXJyLnNwbGl0KCdcXG4nKSkgc2hlbGxTZXJ2aWNlLnByaW50RXJyb3IobXNnKVxuICAgIH1cbiAgfSxcbiAgX2pvaW5SZXN1bHRzOiAocmVzdWx0czogUHJpbnRTdGRNZXNzYWdlW10pOiBQcmludFN0ZE1lc3NhZ2UgPT4ge1xuICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWdnLCBjdXIpID0+IHtcbiAgICAgIGFnZyA9IE9iamVjdC5hc3NpZ24oYWdnLCBjdXIpXG4gICAgICByZXR1cm4gYWdnXG4gICAgfSwge30gYXMgUHJpbnRTdGRNZXNzYWdlKVxuICB9LFxuICBwcmludEVycm9yOiAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgc2hlbGxEYWwucHJpbnQoY2hhbGsucmVkKG1lc3NhZ2UpKVxuICB9LFxuICBwcmludFN1Y2Nlc3M6IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBzaGVsbERhbC5wcmludChjaGFsay5ncmVlbihtZXNzYWdlKSlcbiAgfSxcbn1cbiJdfQ==