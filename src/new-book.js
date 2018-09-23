#!/usr/bin/env node


//var download = require('download-git-repo')
var program = require('commander')
//var readline = require('readline');
var readlineSync = require('readline-sync');
var iconv = require("iconv-lite");

var fs=require('fs')
var exists = require('fs').existsSync
var path = require('path')  

var arguments = process.argv;
var bookname;
var bookfolder;

for(i=0;i<arguments.length;i++){
    //console.log(arguments[i]);
}
if(arguments.length<4){
    
    console.log('\x1B[31m',"\n ERROR:  请输入书籍存放的文件夹")
    console.log("\x1B[37m","-----------------------------------")
    console.log(" Grammar:  \x1B[32mibook \x1B[33mnew \x1B[36mfoldername\x1B[37m\n")
    
    
}
else{
    donewbook();
}



function donewbook(){
    //判断图书仓库是否存在，不存在就创建
    //console.log("bf="+bf);
    var libroot="_libarys";
    if(exists(libroot)==false){
        console.log("create libary storage:"+libroot);
        fs.mkdirSync(libroot);
        }
    else console.log("have libary storage");
    
    //initbookconfig("");
    
    
    /*判断书籍文件夹是否存在，不存在就创建
    var bookroot=libroot+"/"+bf;
    if(exists(bookroot)==false){
        fs.mkdirSync(bookroot);
        console.log("create book folder:"+bookroot)
        //clonesource(bootroot);
        
    }
    else console.log("have book folder->"+bookroot);
    
    
   判断书籍config是否存在，不存在就创建*/
        
    
    
}
  
function initbookconfig(sfile){
    
    var tags=new Array(
        'book Name',
        'book Author',
        'book Language',
        'book Output-Encoding'
    )
    var values=new Array(
        '',
        '',
        'zh',
        'utf-8'
    )
    startnum=0;
    
    if(sfile!=""){
        var bconfig=sfile+"/book.json";
        if(!exists(bconfig)){
            flag=0;
            startnum=0;
        }
        else {
            flag=1;
            starnum=1
        }
        
        if(flag==1){
            var bookjson=fs.readFile(sfile,function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    return JSON.parse(data.toString);
                }
            });
            
            var i=0;
            for(var v in bookjson){
                values[i]=bookjson[v];
                i++;
            }
        }
        
    }
    
    

    for(i=startnum;i<tags.length;i++){
        tag=tags[i];
        ov=values[i];
        if(ov!=0){
            tag=tag+'('+ov+'): ';
        }
        else tag=tag+': ';
        res=readlineSync.question(tag);
        if(res!=""){
            if(i==0) {
                txt=iconv.encode(res,'utf8')
                //fs.writeFileSync("a.txt",res)
                //buf=new Buffer(res);
                
                }
            
            values[i]=res;
        }
    }
    console.log("========================");
    
    for(i=0;i<tags.length;i++){
        console.log(tags[i]+': '+values[i]);
    }
    console.log("========================");
    buffer=fs.readFileSync('a.txt');
    res=iconv.decode(buffer,'gbk');
    console.log(res);
    console.log(buffer.toString())
}



function clonesource(sfolder){
    
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

/*
搞不定的异步，放一边吧
readSync(labs).then((res) => {
   bookname=res;
   console.log(res);
});

function readSync(tips) {
    tips = tips || '> ';
 
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

*/


