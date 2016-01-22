#RFSwitcher

A tiny Node.js RPC server to fire commands to the codesend command line utility (created by Tim Leland http://github.com/timleland ). This project is used to power the lights in my custom home automation setup. Read more about it here:  https://medium.com/@arvinsingla/apple-homekit-hacking-3d2902e7a1df

## Installation ##

`npm install`

## Execution ##

`node switcher.js`

## Usage ##

The server operates on port 80. To trigger a code send send an http request to the following url. Replacing yourserver with the server address (if on the same machine this will be `localhost`), and the rf code you wish to send.

`http://<yourserver>/api/switch/<code_to_send>`

## Thanks ##

Tim Leland (@timleland) for doing all the leg work for the Pi wiring and command line utility. 
