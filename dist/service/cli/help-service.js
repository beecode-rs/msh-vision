"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpService = void 0;
const constant_1 = require("../../util/constant");
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
        ].join(constant_1.constant.newRow);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY2xpL2hlbHAtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrREFBOEM7QUFFakMsUUFBQSxXQUFXLEdBQUc7SUFDekIsSUFBSSxFQUFFLEdBQVcsRUFBRTtRQUNqQixPQUFPO1lBQ0wseUJBQXlCO1lBQ3pCLEVBQUU7WUFDRixVQUFVO1lBQ1YsRUFBRTtZQUNGLEVBQUU7WUFDRiw0Q0FBNEM7WUFDNUMsRUFBRTtZQUNGLDhDQUE4QztTQUMvQyxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICcuLi8uLi91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY29uc3QgaGVscFNlcnZpY2UgPSB7XG4gIHRleHQ6ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICAnVXNhZ2U6IHZpc2lvbiBbY29tbWFuZF0nLFxuICAgICAgJycsXG4gICAgICAnQ29tbWFuZDonLFxuICAgICAgJycsXG4gICAgICAnJyxcbiAgICAgICcgICAtdiB8IC0tdmVyc2lvbiAgICAgICAgICBEaXNwbGF5IHZlcnNpb24nLFxuICAgICAgJycsXG4gICAgICAnICAgLWggfCAtLWhlbHAgICAgICAgICAgICAgRGlzcGxheSB0aGlzIGhlbHAnLFxuICAgIF0uam9pbihjb25zdGFudC5uZXdSb3cpXG4gIH0sXG59XG4iXX0=