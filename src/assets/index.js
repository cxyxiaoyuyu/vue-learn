const req = require.context('./svg',false,/\.svg$/)

req.keys().map(req)