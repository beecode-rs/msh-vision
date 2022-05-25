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
            for (const msg of execResult.stdout.split((0, constant_1.constant)().newRow))
                exports.shellService.print(msg);
            for (const msg of execResult.stderr.split((0, constant_1.constant)().newRow))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NsaS9zaGVsbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUF5QjtBQUN6QixpREFBd0Q7QUFDeEQsZ0RBQTRDO0FBSy9CLFFBQUEsWUFBWSxHQUFHO0lBQzFCLElBQUksRUFBRSxvQkFBUSxDQUFDLElBQUk7SUFDbkIsRUFBRSxFQUFFLG9CQUFRLENBQUMsRUFBRTtJQUNmLEtBQUssRUFBRSxvQkFBUSxDQUFDLEtBQUs7SUFDckIsZUFBZSxFQUFFLENBQUMsR0FBRyxXQUE4QixFQUFRLEVBQUU7UUFDM0QsTUFBTSxRQUFRLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdkQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEQsb0JBQVksQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ25DLEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBQSxtQkFBUSxHQUFFLENBQUMsTUFBTSxDQUFDO2dCQUFFLG9CQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3JGLEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBQSxtQkFBUSxHQUFFLENBQUMsTUFBTSxDQUFDO2dCQUFFLG9CQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzNGO0lBQ0gsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLE9BQTBCLEVBQW1CLEVBQUU7UUFDNUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUM3QixPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUMsRUFBRSxFQUFxQixDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUNELFVBQVUsRUFBRSxDQUFDLE9BQWUsRUFBUSxFQUFFO1FBQ3BDLG9CQUFRLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsWUFBWSxFQUFFLENBQUMsT0FBZSxFQUFRLEVBQUU7UUFDdEMsb0JBQVEsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgRXhlY1Jlc3VsdCwgc2hlbGxEYWwgfSBmcm9tICdzcmMvZGFsL3NoZWxsLWRhbCdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCB0eXBlIFByaW50U3RkTWVzc2FnZSA9IHtcbiAgW2tleTogc3RyaW5nXTogRXhlY1Jlc3VsdFxufVxuZXhwb3J0IGNvbnN0IHNoZWxsU2VydmljZSA9IHtcbiAgZXhlYzogc2hlbGxEYWwuZXhlYyxcbiAgY2Q6IHNoZWxsRGFsLmNkLFxuICBwcmludDogc2hlbGxEYWwucHJpbnQsXG4gIHByaW50U3RkTWVzc2FnZTogKC4uLm1lc3NhZ2VBcmdzOiBQcmludFN0ZE1lc3NhZ2VbXSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gc2hlbGxTZXJ2aWNlLl9qb2luUmVzdWx0cyhtZXNzYWdlQXJncylcbiAgICBmb3IgKGNvbnN0IFtrZXksIGV4ZWNSZXN1bHRdIG9mIE9iamVjdC5lbnRyaWVzKG1lc3NhZ2VzKSkge1xuICAgICAgc2hlbGxTZXJ2aWNlLnByaW50KGNoYWxrLmN5YW4oa2V5KSlcbiAgICAgIGZvciAoY29uc3QgbXNnIG9mIGV4ZWNSZXN1bHQuc3Rkb3V0LnNwbGl0KGNvbnN0YW50KCkubmV3Um93KSkgc2hlbGxTZXJ2aWNlLnByaW50KG1zZylcbiAgICAgIGZvciAoY29uc3QgbXNnIG9mIGV4ZWNSZXN1bHQuc3RkZXJyLnNwbGl0KGNvbnN0YW50KCkubmV3Um93KSkgc2hlbGxTZXJ2aWNlLnByaW50RXJyb3IobXNnKVxuICAgIH1cbiAgfSxcbiAgX2pvaW5SZXN1bHRzOiAocmVzdWx0czogUHJpbnRTdGRNZXNzYWdlW10pOiBQcmludFN0ZE1lc3NhZ2UgPT4ge1xuICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWdnLCBjdXIpID0+IHtcbiAgICAgIGFnZyA9IE9iamVjdC5hc3NpZ24oYWdnLCBjdXIpXG4gICAgICByZXR1cm4gYWdnXG4gICAgfSwge30gYXMgUHJpbnRTdGRNZXNzYWdlKVxuICB9LFxuICBwcmludEVycm9yOiAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgc2hlbGxEYWwucHJpbnQoY2hhbGsucmVkKG1lc3NhZ2UpKVxuICB9LFxuICBwcmludFN1Y2Nlc3M6IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBzaGVsbERhbC5wcmludChjaGFsay5ncmVlbihtZXNzYWdlKSlcbiAgfSxcbn1cbiJdfQ==