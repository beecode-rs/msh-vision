"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = void 0;
const change_case_1 = require("change-case");
const shortHash = require('short-hash'); // eslint-disable-line @typescript-eslint/no-var-requires
const self = {
    camelCase: (name) => {
        return change_case_1.camelCase(name);
    },
    snakeCase: (name) => {
        return change_case_1.snakeCase(name);
    },
    stringToHash: (text) => {
        return shortHash(text);
    },
    uniqueEntityHash: (name, inProjectPath) => {
        const cleanName = self.snakeCase(name);
        const hashPath = self.stringToHash(inProjectPath);
        return `${cleanName}_${hashPath}`;
    },
};
exports.stringUtil = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBa0Q7QUFFbEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMseURBQXlEO0FBRWpHLE1BQU0sSUFBSSxHQUFHO0lBQ1gsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFVLEVBQUU7UUFDbEMsT0FBTyx1QkFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUNsQyxPQUFPLHVCQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLElBQVksRUFBVSxFQUFFO1FBQ3JDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxnQkFBZ0IsRUFBRSxDQUFDLElBQVksRUFBRSxhQUFxQixFQUFVLEVBQUU7UUFDaEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2pELE9BQU8sR0FBRyxTQUFTLElBQUksUUFBUSxFQUFFLENBQUE7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBRyxJQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYW1lbENhc2UsIHNuYWtlQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJ1xuXG5jb25zdCBzaG9ydEhhc2ggPSByZXF1aXJlKCdzaG9ydC1oYXNoJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG5cbmNvbnN0IHNlbGYgPSB7XG4gIGNhbWVsQ2FzZTogKG5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGNhbWVsQ2FzZShuYW1lKVxuICB9LFxuICBzbmFrZUNhc2U6IChuYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBzbmFrZUNhc2UobmFtZSlcbiAgfSxcbiAgc3RyaW5nVG9IYXNoOiAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gc2hvcnRIYXNoKHRleHQpXG4gIH0sXG4gIHVuaXF1ZUVudGl0eUhhc2g6IChuYW1lOiBzdHJpbmcsIGluUHJvamVjdFBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgY2xlYW5OYW1lID0gc2VsZi5zbmFrZUNhc2UobmFtZSlcbiAgICBjb25zdCBoYXNoUGF0aCA9IHNlbGYuc3RyaW5nVG9IYXNoKGluUHJvamVjdFBhdGgpXG4gICAgcmV0dXJuIGAke2NsZWFuTmFtZX1fJHtoYXNoUGF0aH1gXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdVdGlsID0gc2VsZlxuIl19