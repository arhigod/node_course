import csv from 'csvtojson';
import { existsSync, unlinkSync, mkdirSync, createReadStream, createWriteStream } from 'fs';

const PATH_CSV = './csv/example.csv';
const PATH_TXT = './output/file_new.txt';

if (existsSync(PATH_TXT)) {
  unlinkSync(PATH_TXT);
}
mkdirSync(PATH_TXT.replace(/[^/]*$/, ''), { recursive: true });

const readStream = createReadStream(PATH_CSV);
const writeStream = createWriteStream(PATH_TXT);

readStream.pipe(csv()).subscribe(
  json => writeStream.write(JSON.stringify(json) + '\n'),
  console.error,
  () => {
    readStream.destroy();
    writeStream.destroy();
  }
);
