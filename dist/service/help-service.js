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
        ].join(constant_1.constant.newRow);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvaGVscC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUE0QztBQUUvQixRQUFBLFdBQVcsR0FBRztJQUN6QixJQUFJLEVBQUUsR0FBVyxFQUFFO1FBQ2pCLE9BQU87WUFDTCx5QkFBeUI7WUFDekIsRUFBRTtZQUNGLFVBQVU7WUFDVixFQUFFO1lBQ0YsRUFBRTtZQUNGLDRDQUE0QztZQUM1QyxFQUFFO1lBQ0YsOENBQThDO1NBQy9DLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDekIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY29uc3QgaGVscFNlcnZpY2UgPSB7XG4gIHRleHQ6ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICAnVXNhZ2U6IHZpc2lvbiBbY29tbWFuZF0nLFxuICAgICAgJycsXG4gICAgICAnQ29tbWFuZDonLFxuICAgICAgJycsXG4gICAgICAnJyxcbiAgICAgICcgICAtdiB8IC0tdmVyc2lvbiAgICAgICAgICBEaXNwbGF5IHZlcnNpb24nLFxuICAgICAgJycsXG4gICAgICAnICAgLWggfCAtLWhlbHAgICAgICAgICAgICAgRGlzcGxheSB0aGlzIGhlbHAnLFxuICAgIF0uam9pbihjb25zdGFudC5uZXdSb3cpXG4gIH0sXG59XG4iXX0=