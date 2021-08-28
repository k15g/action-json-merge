import * as child_process from 'child_process'
import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
const merge = require('lodash.merge')

async function run() {

    // Get inputs
    var file = core.getInput('file', { required: true })
    var data = core.getInput('data', { required: true })

    // Prepare functions for handling source data
    var func_parse = JSON.parse
    var func_dump = JSON.stringify

    // Merge content of file and provided yaml data
    var content = merge(
        func_parse(fs.readFileSync(file).toString()),
        yaml.load(data))

    // Write content to file
    fs.writeFileSync(file, func_dump(content))
}

run()