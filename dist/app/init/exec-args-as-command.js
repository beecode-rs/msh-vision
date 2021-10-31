"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecArgsAsCommand = void 0;
const msh_node_app_1 = require("@beecode/msh-node-app");
const cli_init_use_case_1 = require("src/use-case/cli-init-use-case");
class ExecArgsAsCommand extends msh_node_app_1.Initiate {
    __args;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy1hcmdzLWFzLWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2luaXQvZXhlYy1hcmdzLWFzLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQWdEO0FBQ2hELHNFQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHVCQUFRO0lBQzVCLE1BQU0sQ0FBVTtJQUNqQyxZQUFZLElBQWM7UUFDeEIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtJQUNwQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQztJQUNTLEtBQUssQ0FBQyxPQUFPO1FBQ3JCLE1BQU0sa0NBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUNTLEtBQUssQ0FBQyxVQUFVO1FBQ3hCLDZDQUE2QztJQUMvQyxDQUFDO0NBQ0Y7QUFoQkQsOENBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5pdGlhdGUgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1hcHAnXG5pbXBvcnQgeyBjbGlJbml0VXNlQ2FzZSB9IGZyb20gJ3NyYy91c2UtY2FzZS9jbGktaW5pdC11c2UtY2FzZSdcblxuZXhwb3J0IGNsYXNzIEV4ZWNBcmdzQXNDb21tYW5kIGV4dGVuZHMgSW5pdGlhdGUge1xuICBwcml2YXRlIHJlYWRvbmx5IF9fYXJnczogc3RyaW5nW11cbiAgY29uc3RydWN0b3IoYXJnczogc3RyaW5nW10pIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fX2FyZ3MgPSBhcmdzXG4gIH1cblxuICBnZXQgTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnQXJnc1RvQ29tbWFuZCdcbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgX2luaXRGbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBjbGlJbml0VXNlQ2FzZS5leGVjQXJnc0FzQ29tbWFuZCh0aGlzLl9fYXJncylcbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgX2Rlc3Ryb3lGbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJylcbiAgfVxufVxuIl19