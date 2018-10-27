# PlacePuppies - the placeholder

PlacePuppies is a Node.js application built using [Express] framework.
The application purpose is useful for especially developers who just want to keep a placeholder for developing UIs.

## Requirements

To setup Vas2Nets you will need
- [Node > v8.9.1 (recommended latest)](https://nodejs.org/)
- [npm (recommended latest)](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Node
It will run the application as a server

### npm
The Javascript package manager

### Git
To checkout the code from the repository

## Setup
Make sure you have both Node.js  and npm installed in your computer by checking its versions in your system
~~~~
$ <program> -v
~~~~

Clone PlacePuppies repository.

~~~~
$ cd /var/www/
$ git clone https://github.com/godswill-aniakor/placepuppies.git
~~~~

Install PlacePuppies package dependencies

~~~~
$ npm install
~~~~

Install globally Unit Tests performer [mocha] (https://github.com/mochajs/mocha)

~~~~
$ sudo npm install mocha -g
~~~~

You should be ready to run your application for development
~~~~
$ npm run start
~~~~

Server should start and a message should be displayed to the console:
~~~~
$ Placepuppies REST server listening at http://localhost:3000/placepuppies
~~~~

## Test PlacePuppies

~~~
## Running UnitTests with code coverage

~~~~
$ npm run test
~~~~

## Debug on Visual Studio Code

It's easy to debug with Visual Studio Code both for unit tests and app run.
Add a file named "launch.json" in .vscode hidden folder, at the root of your project.
Paste the following content:

~~~ json

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Mocha tests",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
            "stopOnEntry": false,
            "args": ["-t", "10000", "test/**/*.spec.js"],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "test"
            },
            "console": "internalConsole",
            "outFiles": [
                "${workspaceRoot}"
            ]
        },
        {
            "name": "Debug Program",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/app.js"
        }
    ]
}

~~~

Now, if you want to run the application in debug mode (Ctr+Shift+D), choose one of the two available configurations ("Debug Mocha tests" or "Debug Program") and play "Start Debugging".
App will stop at your breakpoints.


