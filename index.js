#!/usr/bin/env node
const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs')
const log = require('tracer').colorConsole()

program
  .version('1.0.0')
  .description('react-quick-start-cli')
program
  .command('create <dir>')
  .action(function(dir) {
    if (dir) {
      let pwd = shell.pwd()
        log.info(`clone code from git...`)
        let programDir = `${pwd}/${dir}`
        clone('https://github.com/janetleung/react-demo.git', programDir, null, function() {
          shell.rm('-rf', `${programDir}/.git`)
          shell.rm('-rf', `${programDir}/README.md`)
          shell.cd(`${programDir}`)
          log.info('install program dependencies')
          shell.exec('npm i', {}, function(code, stdout, stderr) {
            log.info('success! you can run "npm run start" start a local dev server at port 3000')
            shell.exec('npm run dev')
          })
        })
    } else {
      log.error('please enter program name')
    }
  })
program.parse(process.argv)
