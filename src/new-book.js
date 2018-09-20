#!/usr/bin/env node


//var download = require('download-git-repo')
var program = require('commander')
var fs=require('fs')
exists = require('fs').existsSync
var path = require('path')  

var arguments = process.argv.splice(2)


    bookname="./_libarys/"+arguments[1];
    var libbooks=createfolder('_libarys');
    var mybook=createfolder(bookname);
    
    if(mybook>0){
        console.log(bookname + ' 该书籍已经存在！');  
    }
    else{
        console.log('在' + bookname + '下创建新书籍');
        readFile();
    }
    
     
 
function createfolder(sfolder){
    exist=exists(sfolder);
    if(exist){
        return 1;
    }
    else{
        fs.mkdirSync(sfolder);
        return 0;
    }
   
}

function savesource(sfolder){
    
}

function readFile(sfile){
    console.log('--------开始读取文件--------');
    fs.readFile(sfile, 'utf-8', function(err, data) {
        if (err) {
            console.log("读取失败");
        } else {
            console.log(data);
            return data;
        }
    });
    console.log('--------读取结束--------');
}
