#!/usr/bin/env node

var readline = require('readline');
var fs=require('fs')
var exists = require('fs').existsSync

bookroot=process.cwd();

    var tags=new Array(
        'book Name',
        'book Author',
        'book Language'
    )
    var values=new Array(
        '',
        '',
        'zh'
    )

//下面终于解决了readline输入中文值并写入文件乱码的问题
//readline 同步 中文输入始终乱码
//改为异步，能够成功
//readline.question()就是一个坑
//引导用户一步一步输入，realine.setPrompt()改提示语，通过'line'取得每次输入的数据    

const rinput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var linenum=0;
tag=tags[linenum];
rinput.setPrompt('\x1B[32m'+tag+": \x1B[37m");
rinput.prompt();


rinput.on('line', (lineinput)=> {
    linenum++;
    //console.log(linenum);
    tag=tags[linenum];
    if(linenum==1){
        if(lineinput==''){
            rinput.setPrompt('');
            console.log("\x1B[35mBook Name Can NOT be Null");
            linenum--;
            tag=tags[linenum];
        }
    }
    
        if(linenum>values.length-1) rinput.close();
        if (linenum>0) values[linenum-1]=lineinput;
        rinput.setPrompt('\x1B[32m'+tag+": \x1B[37m");
        rinput.prompt();
});

rinput.on('close',()=>{
    
    nowpath=process.cwd();
    mybookpath=createfolder(nowpath,values[0]);
    if(mybookpath!=""){
        console.log("creating book init data... ...");
        
        jsonstr=getbookjson(values);
        
        fs.writeFileSync(mybookpath+'\\'+'book.json',jsonstr);
        createfolder(mybookpath,'md');
        
        console.log('Create New book \x1B[33m'+values[0]+'\x1B[37m OK');
    }
    else{
        console.log("Exists Book: \x1B[33m"+values[0]+"\x1B[37m");
    }
    process.exit(0);
});

//=============================================================
// followings private function

function createfolder(p,s){
    s=foldername(s);
    ff=p+'\\'+s;
    if(exists(ff)==false){
        fs.mkdirSync(ff);
        //console.log("Create folder:  \x1B[33m"+ff+"\x1B[37m");
        
        return ff;
    }
    else{
        //console.log("Exists Folder: \x1B[33m"+ff+"\x1B[37m");
        return "";
    }
}

function getbookjson(arr){
    var labarr=new Array(
        'title',
        'creator',
        'language',
        'encoding',
        'doctype',
        'contributor',
        'identifier'
    );
    var labvalues=new Array(
        '',
        '',
        'zh',
        'utf-8',
        'EBOK',
        'ZFiBook',
        ''
    );
    
    console.log("\r\nbook Info:")
    console.log("=================================");
    
    str='   {\r\n';
    for(ilab=0;ilab<labarr.length;ilab++){
        if(ilab<arr.length){
            labvalues[ilab]=arr[ilab]
        }
        strelement='        "'+labarr[ilab]+'":"'+labvalues[ilab]+'"';
        if(ilab<labarr.length-1) strelement=strelement+',\r\n';
        else strelement=strelement+'\r\n';
        str=str+strelement;
        console.log(labarr[ilab]+': '+labvalues[ilab]);
    }
    str=str+'   }\r\n';
    
    console.log("=================================");
    
    return str;
}

function foldername(s){
    s=s.replace(/\\/ig,"_");
    s=s.replace(/\*/ig,"_");
    s=s.replace(/\?/ig,"_");
    s=s.replace(/\"/ig,"");
    s=s.replace(/\|/ig,"_");
    s=s.replace(/\s/ig,"_");
    s=s.replace(/\:/ig,"_");
    s=s.replace(/\</ig,"_");
    s=s.replace(/\>/ig,"_");
    return s;
    
}

