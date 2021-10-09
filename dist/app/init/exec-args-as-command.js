"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecArgsAsCommand = void 0;
const cli_init_use_case_1 = require("../../use-case/cli-init-use-case");
const msh_node_app_1 = require("@beecode/msh-node-app");
class ExecArgsAsCommand extends msh_node_app_1.Initiate {
    constructor(args) {
        super();
        this.__args = args;
    }
    get Name() {
        return 'ArgsToCommand';
    }
    async _initFn() {
        await cli_init_use_case_1.cliInitUseCase.execArgsAsCommand(this.__args);
    }
    async _destroyFn() {
        // throw new Error('Method not implemented.')
    }
}
exports.ExecArgsAsCommand = ExecArgsAsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy1hcmdzLWFzLWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2luaXQvZXhlYy1hcmdzLWFzLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0VBQWlFO0FBQ2pFLHdEQUFnRDtBQUVoRCxNQUFhLGlCQUFrQixTQUFRLHVCQUFRO0lBRTdDLFlBQVksSUFBYztRQUN4QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLGVBQWUsQ0FBQTtJQUN4QixDQUFDO0lBQ1MsS0FBSyxDQUFDLE9BQU87UUFDckIsTUFBTSxrQ0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQ1MsS0FBSyxDQUFDLFVBQVU7UUFDeEIsNkNBQTZDO0lBQy9DLENBQUM7Q0FDRjtBQWhCRCw4Q0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGlJbml0VXNlQ2FzZSB9IGZyb20gJy4uLy4uL3VzZS1jYXNlL2NsaS1pbml0LXVzZS1jYXNlJ1xuaW1wb3J0IHsgSW5pdGlhdGUgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1hcHAnXG5cbmV4cG9ydCBjbGFzcyBFeGVjQXJnc0FzQ29tbWFuZCBleHRlbmRzIEluaXRpYXRlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfX2FyZ3M6IHN0cmluZ1tdXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX19hcmdzID0gYXJnc1xuICB9XG5cbiAgZ2V0IE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0FyZ3NUb0NvbW1hbmQnXG4gIH1cbiAgcHJvdGVjdGVkIGFzeW5jIF9pbml0Rm4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgY2xpSW5pdFVzZUNhc2UuZXhlY0FyZ3NBc0NvbW1hbmQodGhpcy5fX2FyZ3MpXG4gIH1cbiAgcHJvdGVjdGVkIGFzeW5jIF9kZXN0cm95Rm4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpXG4gIH1cbn1cbiJdfQ==