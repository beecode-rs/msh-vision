"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = void 0;
const change_case_1 = require("change-case");
exports.stringUtil = {
    camelCase: (name) => {
        return change_case_1.camelCase(name);
    },
    snakeCase: (name) => {
        return change_case_1.snakeCase(name);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBa0Q7QUFFckMsUUFBQSxVQUFVLEdBQUc7SUFDeEIsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFVLEVBQUU7UUFDbEMsT0FBTyx1QkFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUNsQyxPQUFPLHVCQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYW1lbENhc2UsIHNuYWtlQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJ1xuXG5leHBvcnQgY29uc3Qgc3RyaW5nVXRpbCA9IHtcbiAgY2FtZWxDYXNlOiAobmFtZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gY2FtZWxDYXNlKG5hbWUpXG4gIH0sXG4gIHNuYWtlQ2FzZTogKG5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHNuYWtlQ2FzZShuYW1lKVxuICB9LFxufVxuIl19