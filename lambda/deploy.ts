import * as fs from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';
import * as child_process from 'child_process';

const folders: string[] = [];
fs.readdirSync('./src').forEach((file) => {
  if (file !== 'commons') folders.push(file);
});

fs.mkdirSync(path.join(__dirname, 'distzip'));

folders.forEach((folder) => {
  const zip = new AdmZip();

  zip.addLocalFolder(`./src/${folder}`, folder);
  zip.addLocalFolder('./src/commons', 'commons');

  zip.writeZip(`./distzip/${folder}.zip`);
});

fs.readdirSync('./distzip').forEach((file) => {
  const filepath = path.join(__dirname, `./distzip/appsync/${file}`);
  const cmd = `aws lambda update-function-code --function-name dev-pocketcards-${file.slice(0, -4)} --zip-file fileb://${filepath} --publish`;

  child_process.execSync(cmd);
});
