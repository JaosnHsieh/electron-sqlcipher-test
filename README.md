### electron-sqlcipher-test

## Result

`@journeyapps/sqlcipher` works on `macOS v12.4`.

## Run on your local

`npm i`

`npm run static`

open another terminal session then

for testing encryption `npm run dev`

for stress testing image blob data rows `npm run image-stress-test`

or try

I use `DB Browser for SQLite v3.12.2 on macOS` and `vim` to check the `test.encrypt.db` and `test.db`.

It looks encrypted in the app and binary in vim.

![test-encrypt.db](./screenshot.png 'test-encrypt.db')

https://sqlitebrowser.org/dl/
