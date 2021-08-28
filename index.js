"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const fs = require("fs");
const yaml = require("js-yaml");
const merge = require('lodash.merge');
async function run() {
    var file = core.getInput('file', { required: true });
    var data = core.getInput('data', { required: true });
    var func_parse = JSON.parse;
    var func_dump = JSON.stringify;
    var content = merge(func_parse(fs.readFileSync(file).toString()), yaml.load(data));
    fs.writeFileSync(file, func_dump(content));
}
run();
