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
    db.serialize(function () {
      // This is the default, but it is good to specify explicitly:
      db.run('PRAGMA cipher_compatibility = 4');

      // To open a database created with SQLCipher 3.x, use this:
      // db.run("PRAGMA cipher_compatibility = 3");

      db.run("PRAGMA key = 'mysecret'");
      db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');

      var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
      for (var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i);
      }
      stmt.finalize();

      db.each(
        'SELECT rowid AS id, info FROM lorem',
        function (err: any, row: any) {
          if (err) {
            console.error(err);
          }
          console.log(row.id + ': ' + row.info);
        },
      );
    });

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
