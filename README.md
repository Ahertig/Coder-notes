# README.md

## GHA Capstone project: "Coder Notes"
Ksenia, Zhengshi, Alyssa, Dorothy

![Coder Notes](http://codernotes.herokuapp.com/img/logo.png)

Coder Notes is a free, open-source notebook designed for coders. 

Popular note-taking apps aren’t exactly coder-friendly. It takes extra time to separate code from regular notes, and searching for particular snippets can be a pain. Coder Notes fixes these problems.

The Coder Notes interface formats code appropriately with Angular Markdown and HighlightJS, which is a huge leg up on Evernote, where code is formatted exactly as the rest of the text. Coders can organize notes by tag or notebook and—rather than toggling to a repl.it window—can execute code directly within the note with the help of Tonic, a sandboxed NodeJS environment. 

## Deployed at
www.codernotes.us

## Features

- Share notes with friends
- Make them publicly searchable to the world
- Export notes as Gists
- Save code snippets from any website with the Coder Notes [Chrome Extension](https://chrome.google.com/webstore/detail/coder-notes/ajpkpmmiaofbkfchcombbcgjpibnpgfp?hl=en).

## Additional NPM modules used
* Font Awesome https://www.npmjs.com/package/font-awesome
* Angular Markdown
* Marked

## Test user
**Email:** grace@gracehopperacademy.com
**Password:** 123

## Chrome Extension installation instructions

https://developer.chrome.com/extensions/getstarted

1. Visit chrome://extensions
2. Ensure that the Developer mode checkbox is checked
3. Click "Load unpacked extension…" and load the "chrome-extension" folder from this repo

## Tips on markdown 

* To start an isolated code snippet (inline), use a backtick: `\``
* To start a code _block_, start each line of the block with four spaces: `    `
