"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecArgsAsCommand = void 0;
const msh_node_app_1 = require("@beecode/msh-node-app");
const cli_init_use_case_1 = require("src/use-case/cli-init-use-case");
class ExecArgsAsCommand extends msh_node_app_1.LifeCycle {
    __args;
    constructor() {
        super({ name: 'ArgsToCommand' });
        this.__args = process.argv.slice(2);
    }
    async _createFn() {
        await cli_init_use_case_1.cliInitUseCase.execArgsAsCommand(this.__args);
    }
    async _destroyFn() {
        // throw new Error('Method not implemented.')
    }
}
exports.ExecArgsAsCommand = ExecArgsAsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy1hcmdzLWFzLWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2luaXQvZXhlYy1hcmdzLWFzLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQWlEO0FBQ2pELHNFQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHdCQUFTO0lBQzdCLE1BQU0sQ0FBVTtJQUVqQztRQUNFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVTLEtBQUssQ0FBQyxTQUFTO1FBQ3ZCLE1BQU0sa0NBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUNTLEtBQUssQ0FBQyxVQUFVO1FBQ3hCLDZDQUE2QztJQUMvQyxDQUFDO0NBQ0Y7QUFkRCw4Q0FjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpZmVDeWNsZSB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWFwcCdcbmltcG9ydCB7IGNsaUluaXRVc2VDYXNlIH0gZnJvbSAnc3JjL3VzZS1jYXNlL2NsaS1pbml0LXVzZS1jYXNlJ1xuXG5leHBvcnQgY2xhc3MgRXhlY0FyZ3NBc0NvbW1hbmQgZXh0ZW5kcyBMaWZlQ3ljbGUge1xuICBwcml2YXRlIHJlYWRvbmx5IF9fYXJnczogc3RyaW5nW11cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7IG5hbWU6ICdBcmdzVG9Db21tYW5kJyB9KVxuICAgIHRoaXMuX19hcmdzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpXG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgX2NyZWF0ZUZuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGNsaUluaXRVc2VDYXNlLmV4ZWNBcmdzQXNDb21tYW5kKHRoaXMuX19hcmdzKVxuICB9XG4gIHByb3RlY3RlZCBhc3luYyBfZGVzdHJveUZuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKVxuICB9XG59XG4iXX0=