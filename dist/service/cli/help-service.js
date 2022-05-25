"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpService = void 0;
const constant_1 = require("src/util/constant");
exports.helpService = {
    text: () => {
        return [
            'Usage: vision [command]',
            '',
            'Command:',
            '',
            '',
            '   -v | --version          Display version',
            '',
            '   -h | --help             Display this help',
        ].join((0, constant_1.constant)().newRow);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY2xpL2hlbHAtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBNEM7QUFFL0IsUUFBQSxXQUFXLEdBQUc7SUFDekIsSUFBSSxFQUFFLEdBQVcsRUFBRTtRQUNqQixPQUFPO1lBQ0wseUJBQXlCO1lBQ3pCLEVBQUU7WUFDRixVQUFVO1lBQ1YsRUFBRTtZQUNGLEVBQUU7WUFDRiw0Q0FBNEM7WUFDNUMsRUFBRTtZQUNGLDhDQUE4QztTQUMvQyxDQUFDLElBQUksQ0FBQyxJQUFBLG1CQUFRLEdBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzQixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjb25zdCBoZWxwU2VydmljZSA9IHtcbiAgdGV4dDogKCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdVc2FnZTogdmlzaW9uIFtjb21tYW5kXScsXG4gICAgICAnJyxcbiAgICAgICdDb21tYW5kOicsXG4gICAgICAnJyxcbiAgICAgICcnLFxuICAgICAgJyAgIC12IHwgLS12ZXJzaW9uICAgICAgICAgIERpc3BsYXkgdmVyc2lvbicsXG4gICAgICAnJyxcbiAgICAgICcgICAtaCB8IC0taGVscCAgICAgICAgICAgICBEaXNwbGF5IHRoaXMgaGVscCcsXG4gICAgXS5qb2luKGNvbnN0YW50KCkubmV3Um93KVxuICB9LFxufVxuIl19