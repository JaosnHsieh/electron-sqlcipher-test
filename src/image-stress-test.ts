import { app, BrowserWindow } from 'electron';

type MainWindow = Electron.CrossProcessExports.BrowserWindow;

let mainWindow: MainWindow | null = null;

main();

function testSqlite() {
  var sqlite3 = require('sqlite3').verbose();
  var testDb = new sqlite3.Database('test.db');

  var sqlite3Encrypt = require('@journeyapps/sqlcipher').verbose();
  var testEncryptDb = new sqlite3Encrypt.Database('test-encrypt.db');

  const insert = (db: any) => {
    const file = require('fs').readFileSync('./test.png');
    db.serialize(async function () {
      db.run('PRAGMA cipher_compatibility = 4');

      // To open a database created with SQLCipher 3.x, use this:
      // db.run("PRAGMA cipher_compatibility = 3");

      db.run("PRAGMA key = 'mysecret'");
      db.run(
        'CREATE TABLE IF NOT EXISTS lorem (myid INTEGER PRIMARY KEY, info TEXT, myimage BLOB)',
      );
      var stmt = db.prepare(
        'INSERT INTO lorem(myid, info, myimage) VALUES (NULL, $info, $myimage)',
      );
      const rowNumber = 10000;
      console.log(`Inserting ${rowNumber} rows.....`);
      for (let i = 0; i < rowNumber; i++) {
        // await wait();
        stmt.run({
          $info: `Lorem ${Math.random()}`,
          $myimage: Buffer.from(file, 'hex'),
        });
      }
      stmt.finalize();
    });

    console.log('Done inserting');

    db.close();
  };
  insert(testDb);
  insert(testEncryptDb);
}
function main() {
  testSqlite();

  app.on('before-quit', () => {
    // cleanUp();
  });
  app.whenReady().then(async () => {
    await createWindow();
  });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 2048,
    height: 1000,
    // maxWidth: 1024,
    // minWidth: 1024,
    minHeight: 768,
    frame: true,
    resizable: true,
    maximizable: true,
    fullscreen: false,
    // backgroundColor: '#212121',
    show: true,
    webPreferences: {
      webSecurity: true,
      nodeIntegration: false,
      devTools: true,
      contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js'),
    },
    title: 'test-abc',
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  await mainWindow.loadURL('http://localhost:8080');
}

// function wait(ms = 500) {
//   return new Promise((ok) => setTimeout(ok, ms));
// }
