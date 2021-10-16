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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3NoZWxsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQXlCO0FBQ3pCLGlEQUF3RDtBQUN4RCxnREFBNEM7QUFLL0IsUUFBQSxZQUFZLEdBQUc7SUFDMUIsSUFBSSxFQUFFLG9CQUFRLENBQUMsSUFBSTtJQUNuQixFQUFFLEVBQUUsb0JBQVEsQ0FBQyxFQUFFO0lBQ2YsS0FBSyxFQUFFLG9CQUFRLENBQUMsS0FBSztJQUNyQixlQUFlLEVBQUUsQ0FBQyxHQUFHLFdBQThCLEVBQVEsRUFBRTtRQUMzRCxNQUFNLFFBQVEsR0FBRyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN2RCxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxvQkFBWSxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxvQkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNuRixLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDO2dCQUFFLG9CQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3pGO0lBQ0gsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLE9BQTBCLEVBQW1CLEVBQUU7UUFDNUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUM3QixPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUMsRUFBRSxFQUFxQixDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUNELFVBQVUsRUFBRSxDQUFDLE9BQWUsRUFBUSxFQUFFO1FBQ3BDLG9CQUFRLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsWUFBWSxFQUFFLENBQUMsT0FBZSxFQUFRLEVBQUU7UUFDdEMsb0JBQVEsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgRXhlY1Jlc3VsdCwgc2hlbGxEYWwgfSBmcm9tICdzcmMvZGFsL3NoZWxsLWRhbCdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCB0eXBlIFByaW50U3RkTWVzc2FnZSA9IHtcbiAgW2tleTogc3RyaW5nXTogRXhlY1Jlc3VsdFxufVxuZXhwb3J0IGNvbnN0IHNoZWxsU2VydmljZSA9IHtcbiAgZXhlYzogc2hlbGxEYWwuZXhlYyxcbiAgY2Q6IHNoZWxsRGFsLmNkLFxuICBwcmludDogc2hlbGxEYWwucHJpbnQsXG4gIHByaW50U3RkTWVzc2FnZTogKC4uLm1lc3NhZ2VBcmdzOiBQcmludFN0ZE1lc3NhZ2VbXSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gc2hlbGxTZXJ2aWNlLl9qb2luUmVzdWx0cyhtZXNzYWdlQXJncylcbiAgICBmb3IgKGNvbnN0IFtrZXksIGV4ZWNSZXN1bHRdIG9mIE9iamVjdC5lbnRyaWVzKG1lc3NhZ2VzKSkge1xuICAgICAgc2hlbGxTZXJ2aWNlLnByaW50KGNoYWxrLmN5YW4oa2V5KSlcbiAgICAgIGZvciAoY29uc3QgbXNnIG9mIGV4ZWNSZXN1bHQuc3Rkb3V0LnNwbGl0KGNvbnN0YW50Lm5ld1JvdykpIHNoZWxsU2VydmljZS5wcmludChtc2cpXG4gICAgICBmb3IgKGNvbnN0IG1zZyBvZiBleGVjUmVzdWx0LnN0ZGVyci5zcGxpdChjb25zdGFudC5uZXdSb3cpKSBzaGVsbFNlcnZpY2UucHJpbnRFcnJvcihtc2cpXG4gICAgfVxuICB9LFxuICBfam9pblJlc3VsdHM6IChyZXN1bHRzOiBQcmludFN0ZE1lc3NhZ2VbXSk6IFByaW50U3RkTWVzc2FnZSA9PiB7XG4gICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKChhZ2csIGN1cikgPT4ge1xuICAgICAgYWdnID0gT2JqZWN0LmFzc2lnbihhZ2csIGN1cilcbiAgICAgIHJldHVybiBhZ2dcbiAgICB9LCB7fSBhcyBQcmludFN0ZE1lc3NhZ2UpXG4gIH0sXG4gIHByaW50RXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBzaGVsbERhbC5wcmludChjaGFsay5yZWQobWVzc2FnZSkpXG4gIH0sXG4gIHByaW50U3VjY2VzczogKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIHNoZWxsRGFsLnByaW50KGNoYWxrLmdyZWVuKG1lc3NhZ2UpKVxuICB9LFxufVxuIl19