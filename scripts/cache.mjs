import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
const file='dist/sw.js';let sw=readFileSync(file,'utf8');const assets=readdirSync('dist/assets').map(x=>'./assets/'+x);sw=sw.replace('const CORE=[','const CORE=['+assets.map(x=>JSON.stringify(x)).join(',')+',');writeFileSync(file,sw);
