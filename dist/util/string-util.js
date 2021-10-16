"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = void 0;
const change_case_1 = require("change-case");
const shortHash = require('short-hash'); // eslint-disable-line @typescript-eslint/no-var-requires
exports.stringUtil = {
    camelCase: (name) => {
        return change_case_1.camelCase(name);
    },
    snakeCase: (name) => {
        return change_case_1.snakeCase(name);
    },
    stringToHash: (text) => {
        return shortHash(text);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBa0Q7QUFFbEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMseURBQXlEO0FBRXBGLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLFNBQVMsRUFBRSxDQUFDLElBQVksRUFBVSxFQUFFO1FBQ2xDLE9BQU8sdUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFVLEVBQUU7UUFDbEMsT0FBTyx1QkFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUNyQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbWVsQ2FzZSwgc25ha2VDYXNlIH0gZnJvbSAnY2hhbmdlLWNhc2UnXG5cbmNvbnN0IHNob3J0SGFzaCA9IHJlcXVpcmUoJ3Nob3J0LWhhc2gnKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcblxuZXhwb3J0IGNvbnN0IHN0cmluZ1V0aWwgPSB7XG4gIGNhbWVsQ2FzZTogKG5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGNhbWVsQ2FzZShuYW1lKVxuICB9LFxuICBzbmFrZUNhc2U6IChuYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBzbmFrZUNhc2UobmFtZSlcbiAgfSxcbiAgc3RyaW5nVG9IYXNoOiAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gc2hvcnRIYXNoKHRleHQpXG4gIH0sXG59XG4iXX0=