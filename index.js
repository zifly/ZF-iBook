#!/usr/bin/env node

//var download = require('download-git-repo')
var program = require('commander')
//var exists = require('fs').existsSync
var path = require('path')


program
     .version(require('./package').version)
     .option('-i, new', '初始化书籍文件夹')
     .option('-l,--load', '加载书籍')
     .option('-d, --dev', '即时编译 不压缩')
     .option('-b, --build', '以生产模式启动')
     .option('-u, --update', '更新书籍内容')
     .option('-p, --publish', '提交到发布仓库')
     .parse(process.argv);
 
 /** init */
 if (program.new) {
     require('./src/new-book.js');
 }
 
 
