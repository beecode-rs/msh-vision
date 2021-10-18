"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = void 0;
const change_case_1 = require("change-case");
const shortHash = require('short-hash'); // eslint-disable-line @typescript-eslint/no-var-requires
const _self = {
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
        const cleanName = _self.snakeCase(name);
        const hashPath = _self.stringToHash(inProjectPath);
        return `${cleanName}_${hashPath}`;
    },
};
exports.stringUtil = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBa0Q7QUFFbEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMseURBQXlEO0FBRWpHLE1BQU0sS0FBSyxHQUFHO0lBQ1osU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFVLEVBQUU7UUFDbEMsT0FBTyx1QkFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUNsQyxPQUFPLHVCQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLElBQVksRUFBVSxFQUFFO1FBQ3JDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxnQkFBZ0IsRUFBRSxDQUFDLElBQVksRUFBRSxhQUFxQixFQUFVLEVBQUU7UUFDaEUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2xELE9BQU8sR0FBRyxTQUFTLElBQUksUUFBUSxFQUFFLENBQUE7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYW1lbENhc2UsIHNuYWtlQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJ1xuXG5jb25zdCBzaG9ydEhhc2ggPSByZXF1aXJlKCdzaG9ydC1oYXNoJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG5cbmNvbnN0IF9zZWxmID0ge1xuICBjYW1lbENhc2U6IChuYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBjYW1lbENhc2UobmFtZSlcbiAgfSxcbiAgc25ha2VDYXNlOiAobmFtZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gc25ha2VDYXNlKG5hbWUpXG4gIH0sXG4gIHN0cmluZ1RvSGFzaDogKHRleHQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHNob3J0SGFzaCh0ZXh0KVxuICB9LFxuICB1bmlxdWVFbnRpdHlIYXNoOiAobmFtZTogc3RyaW5nLCBpblByb2plY3RQYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGNsZWFuTmFtZSA9IF9zZWxmLnNuYWtlQ2FzZShuYW1lKVxuICAgIGNvbnN0IGhhc2hQYXRoID0gX3NlbGYuc3RyaW5nVG9IYXNoKGluUHJvamVjdFBhdGgpXG4gICAgcmV0dXJuIGAke2NsZWFuTmFtZX1fJHtoYXNoUGF0aH1gXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdVdGlsID0gX3NlbGZcbiJdfQ==