#!/usr/bin/env node

 var fs = require('fs')
 var md=require('../lib/markdown.convert.js');
 var converter = new md.Converter();
 
 
 var arguments = process.argv;
 
 mydoc=fs.readFileSync("../_libarys/testbook/md/a.md","utf-8")
 html=converter.makeHtml(mydoc);
 fs.writeFile("../_libarys/testbook/md/a.html",html,function(err){
    if(err){
        console.log(err);
    }
    else console.log("convert md 2 html succeed")
 })
