// samples/create_sample_zip.js - create a sample zip to test upload
const AdmZip = require('adm-zip');
const fs = require('fs-extra');
const path = require('path');

const out = path.join(__dirname, 'sample_project.zip');
const zip = new AdmZip();
zip.addFile('index.html', Buffer.from('<!doctype html><html><head><meta charset="utf-8"><title>Sample</title></head><body><h1>Sample Project</h1><p>Hello from sample.</p></body></html>'));
fs.ensureDirSync(path.join(__dirname, 'out'));
zip.writeZip(out);
console.log('sample zip created:', out);
