const fs = require('fs');
const path = require('path');

const envsPath = "src/enviroments";
const envMockDev = path.join(envsPath, 'enviroment.mock_dev.ts');
const envMockProd = path.join(envsPath, 'enviroment.mock_prod.ts');

const envDev = path.join(envsPath, 'enviroment.ts');
const envProd = path.join(envsPath, 'enviroment.prod.ts');

fs.createReadStream(envMockDev).pipe(fs.createWriteStream(envDev));
fs.createReadStream(envMockProd).pipe(fs.createWriteStream(envProd));