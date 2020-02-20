const yargs = require('./src/yargsHandler');
const fs = require('fs');
yargs.parse();


// node app.js add --title="Somil" --body="Khandelwal"
// node app.js remove --title="Somil"
// node app.js list