#!/usr/bin/env node

//var download = require('download-git-repo')
var program = require('commander')
//var exists = require('fs').existsSync
var path = require('path')


program
     .version(require('./package').version)
     .option('-i, --init', '初始化书籍文件夹')
     .option('-d, --dev', '以开发模式启动coodev 即时编译 不压缩')
     .option('-b, --build', '以生产模式启动')
     .option('-u, --update', '更新书籍内容')
     .option('-p, --publish', '提交到发布仓库')
     .parse(process.argv);
 
 /** init */
 if (program.init) {
     require('./src/new-book.js');
 }
 
