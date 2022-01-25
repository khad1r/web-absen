# Restfull Api Absensi

Web service sederhana untuk absensi dengan fitur geolocation dengan menggunakana node.js

---

## Requirements

Node.js, Mysql.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

## Install

    $ git clone https://github.com/khad1r/web-absen
    $ cd web-absen
    $ npm install

## Configure app

Open `.env` then edit it with your settings. You will need:

- Mysql Database;
- Another setting;
- One more setting;

## Running the project

Be sure you have run `XAMPP`

    $ Node index.js
