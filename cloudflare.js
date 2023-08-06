const cp = require('child_process');

cp.execSync(`cloudflared tunnel --url "http://localhost:4070" --metrics localhost:4071`);
