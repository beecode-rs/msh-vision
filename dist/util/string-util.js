"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = void 0;
const change_case_1 = require("change-case");
const shortHash = require('short-hash'); // eslint-disable-line @typescript-eslint/no-var-requires
const _self = {
    camelCase: (name) => {
        return (0, change_case_1.camelCase)(name);
    },
    snakeCase: (name) => {
        return (0, change_case_1.snakeCase)(name);
    },
    stringToHash: (text) => {
        return shortHash(text);
    },
    uniqueEntityHash: (name, inProjectPath) => {
        const cleanName = _self.snakeCase(name);
        const hashPath = _self.stringToHash(inProjectPath);
        return `${cleanName}_${hashPath}`;
    },
};
exports.stringUtil = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBa0Q7QUFFbEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMseURBQXlEO0FBRWpHLE1BQU0sS0FBSyxHQUFHO0lBQ1osU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFVLEVBQUU7UUFDbEMsT0FBTyxJQUFBLHVCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNELFNBQVMsRUFBRSxDQUFDLElBQVksRUFBVSxFQUFFO1FBQ2xDLE9BQU8sSUFBQSx1QkFBUyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUNyQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFZLEVBQUUsYUFBcUIsRUFBVSxFQUFFO1FBQ2hFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNsRCxPQUFPLEdBQUcsU0FBUyxJQUFJLFFBQVEsRUFBRSxDQUFBO0lBQ25DLENBQUM7Q0FDRixDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FtZWxDYXNlLCBzbmFrZUNhc2UgfSBmcm9tICdjaGFuZ2UtY2FzZSdcblxuY29uc3Qgc2hvcnRIYXNoID0gcmVxdWlyZSgnc2hvcnQtaGFzaCcpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgY2FtZWxDYXNlOiAobmFtZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gY2FtZWxDYXNlKG5hbWUpXG4gIH0sXG4gIHNuYWtlQ2FzZTogKG5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHNuYWtlQ2FzZShuYW1lKVxuICB9LFxuICBzdHJpbmdUb0hhc2g6ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBzaG9ydEhhc2godGV4dClcbiAgfSxcbiAgdW5pcXVlRW50aXR5SGFzaDogKG5hbWU6IHN0cmluZywgaW5Qcm9qZWN0UGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBjbGVhbk5hbWUgPSBfc2VsZi5zbmFrZUNhc2UobmFtZSlcbiAgICBjb25zdCBoYXNoUGF0aCA9IF9zZWxmLnN0cmluZ1RvSGFzaChpblByb2plY3RQYXRoKVxuICAgIHJldHVybiBgJHtjbGVhbk5hbWV9XyR7aGFzaFBhdGh9YFxuICB9LFxufVxuXG5leHBvcnQgY29uc3Qgc3RyaW5nVXRpbCA9IF9zZWxmXG4iXX0=