import * as fs from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';
import * as child_process from 'child_process';

const env = process.argv[2];
const project = 'PocketCards';
const reset = '\x1b[0m';
const fgBlue = '\x1b[34m';

fs.mkdirSync(path.join(__dirname, './dist/zip'));

if (env === 'dev') {
  const output = './dist/zip/packaged.zip';

  const zip = new AdmZip();
  zip.addLocalFolder('./lib');
  zip.addLocalFolder('./dist/tsc/src');

  zip.writeZip(output);

  const folders: string[] = [];
  fs.readdirSync(path.join(__dirname, './dist/tsc/src/appsync')).forEach((file) => {
    if (file !== 'commons') folders.push(file);
  });

  folders.forEach((folder) => {
    const cmd = `aws lambda update-function-code --function-name ${env}-${project}-${folder} --zip-file fileb://${path.join(__dirname, output)} --publish`;

    console.log(`${fgBlue}${cmd}${reset}`);
    child_process.execSync(cmd);
  });
}

if (env === 'prod') {
  const prefix = './dist/prod';
  const folders: string[] = [];
  fs.readdirSync(path.join(__dirname, prefix)).forEach((file) => {
    folders.push(file);
  });
}

// const folders: string[] = [];
// fs.readdirSync('./src').forEach((file) => {
//   if (file !== 'commons') folders.push(file);
// });

// fs.mkdirSync(path.join(__dirname, 'distzip'));

// folders.forEach((folder) => {
//   const zip = new AdmZip();

//   zip.addLocalFolder(`./src/${folder}`, folder);
//   zip.addLocalFolder('./src/commons', 'commons');

//   zip.writeZip(`./distzip/${folder}.zip`);
// });

// fs.readdirSync('./distzip').forEach((file) => {

// });
