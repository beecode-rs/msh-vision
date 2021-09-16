"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecArgsAsCommand = void 0;
const msh_node_app_1 = require("@beecode/msh-node-app");
const cli_init_1 = require("src/use-case/cli-init");
class ExecArgsAsCommand extends msh_node_app_1.Initiate {
    constructor(args) {
        super();
        this.__args = args;
    }
    get Name() {
        return 'ArgsToCommand';
    }
    async _initFn() {
        await cli_init_1.cliInit.execArgsAsCommand(this.__args);
    }
    async _destroyFn() {
        // throw new Error('Method not implemented.')
    }
}
exports.ExecArgsAsCommand = ExecArgsAsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy1hcmdzLWFzLWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2luaXQvZXhlYy1hcmdzLWFzLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQWdEO0FBQ2hELG9EQUErQztBQUUvQyxNQUFhLGlCQUFrQixTQUFRLHVCQUFRO0lBRTdDLFlBQVksSUFBYztRQUN4QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLGVBQWUsQ0FBQTtJQUN4QixDQUFDO0lBQ1MsS0FBSyxDQUFDLE9BQU87UUFDckIsTUFBTSxrQkFBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBQ1MsS0FBSyxDQUFDLFVBQVU7UUFDeEIsNkNBQTZDO0lBQy9DLENBQUM7Q0FDRjtBQWhCRCw4Q0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbml0aWF0ZSB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWFwcCdcbmltcG9ydCB7IGNsaUluaXQgfSBmcm9tICdzcmMvdXNlLWNhc2UvY2xpLWluaXQnXG5cbmV4cG9ydCBjbGFzcyBFeGVjQXJnc0FzQ29tbWFuZCBleHRlbmRzIEluaXRpYXRlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfX2FyZ3M6IHN0cmluZ1tdXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX19hcmdzID0gYXJnc1xuICB9XG5cbiAgZ2V0IE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0FyZ3NUb0NvbW1hbmQnXG4gIH1cbiAgcHJvdGVjdGVkIGFzeW5jIF9pbml0Rm4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgY2xpSW5pdC5leGVjQXJnc0FzQ29tbWFuZCh0aGlzLl9fYXJncylcbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgX2Rlc3Ryb3lGbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJylcbiAgfVxufVxuIl19