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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY2xpL2hlbHAtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBNEM7QUFFL0IsUUFBQSxXQUFXLEdBQUc7SUFDekIsSUFBSSxFQUFFLEdBQVcsRUFBRTtRQUNqQixPQUFPO1lBQ0wseUJBQXlCO1lBQ3pCLEVBQUU7WUFDRixVQUFVO1lBQ1YsRUFBRTtZQUNGLEVBQUU7WUFDRiw0Q0FBNEM7WUFDNUMsRUFBRTtZQUNGLDhDQUE4QztTQUMvQyxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGNvbnN0IGhlbHBTZXJ2aWNlID0ge1xuICB0ZXh0OiAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgJ1VzYWdlOiB2aXNpb24gW2NvbW1hbmRdJyxcbiAgICAgICcnLFxuICAgICAgJ0NvbW1hbmQ6JyxcbiAgICAgICcnLFxuICAgICAgJycsXG4gICAgICAnICAgLXYgfCAtLXZlcnNpb24gICAgICAgICAgRGlzcGxheSB2ZXJzaW9uJyxcbiAgICAgICcnLFxuICAgICAgJyAgIC1oIHwgLS1oZWxwICAgICAgICAgICAgIERpc3BsYXkgdGhpcyBoZWxwJyxcbiAgICBdLmpvaW4oY29uc3RhbnQubmV3Um93KVxuICB9LFxufVxuIl19