const cp = require('child_process');

module.exports = class {
    constructor(port,metrics) {
        cp.execSync(`cloudflared tunnel --url="http://localhost${port}" --metrics localhost:${metrics}`);
    }
}
