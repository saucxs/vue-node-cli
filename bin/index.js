#!/usr/bin/env node

const program = require('commander');
const version = require('../package.json').version;


program
	.version(version)
	.command('init', 'create a new front-end && back-end frame')
	.parse(process.argv);

