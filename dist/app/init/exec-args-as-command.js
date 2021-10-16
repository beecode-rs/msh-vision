"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecArgsAsCommand = void 0;
const msh_node_app_1 = require("@beecode/msh-node-app");
const cli_init_use_case_1 = require("src/use-case/cli-init-use-case");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy1hcmdzLWFzLWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2luaXQvZXhlYy1hcmdzLWFzLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQWdEO0FBQ2hELHNFQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHVCQUFRO0lBRTdDLFlBQVksSUFBYztRQUN4QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLGVBQWUsQ0FBQTtJQUN4QixDQUFDO0lBQ1MsS0FBSyxDQUFDLE9BQU87UUFDckIsTUFBTSxrQ0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQ1MsS0FBSyxDQUFDLFVBQVU7UUFDeEIsNkNBQTZDO0lBQy9DLENBQUM7Q0FDRjtBQWhCRCw4Q0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbml0aWF0ZSB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWFwcCdcbmltcG9ydCB7IGNsaUluaXRVc2VDYXNlIH0gZnJvbSAnc3JjL3VzZS1jYXNlL2NsaS1pbml0LXVzZS1jYXNlJ1xuXG5leHBvcnQgY2xhc3MgRXhlY0FyZ3NBc0NvbW1hbmQgZXh0ZW5kcyBJbml0aWF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX19hcmdzOiBzdHJpbmdbXVxuICBjb25zdHJ1Y3RvcihhcmdzOiBzdHJpbmdbXSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9fYXJncyA9IGFyZ3NcbiAgfVxuXG4gIGdldCBOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdBcmdzVG9Db21tYW5kJ1xuICB9XG4gIHByb3RlY3RlZCBhc3luYyBfaW5pdEZuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGNsaUluaXRVc2VDYXNlLmV4ZWNBcmdzQXNDb21tYW5kKHRoaXMuX19hcmdzKVxuICB9XG4gIHByb3RlY3RlZCBhc3luYyBfZGVzdHJveUZuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKVxuICB9XG59XG4iXX0=