// let http = require('http');

// let fs = require('fs');

// let path = require('path');

// let rootPath = path.join(__dirname,'www');
// // console.log(__filename);
// // console.log(__dirname);
// // console.log(rootPath);

// http.createServer((request,respones)=>{
//     let filePath = path.join(rootPath,request.url);
//     // console.log(filePath);
//     let isExist = fs.existsSync(filePath);
//     if(isExist){//目录存在
//          fs.readdir(filePath,(err,files)=>{
//             console.log(files);
//             if(err){//不是文件夹,是文件
//                 fs.readFile(filePath,(err,data)=>{
//                     respones.end(data);
//                 })
//             }else{
//                 //是文件夹
//                 console.log(files);
//                 if(files.indexOf('index.html')!=-1){//有首页
//                     fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
//                         if(err){
//                             console.log(err);
//                         }else{
//                             respones.end(data);
//                         }
//                     })
//                 }else{//没有首页
//                     let backData = '';
//                     for(let i =0;i<files.length;i++){
//                         backData+=`<h2><a href="${request.url=='/'?'':request.url}/${files[i]}">${files[i]}</a></h2>`
//                     }
//                     respones.writeHead(200,{
//                         'content-type':'text/html;charset:utf-8'
//                     });
//                     respones.end(backData);
//                 }
//             }
//          });
//     }else{

//         respones.end('<h1>404 <span>not find</span></h1> ');
//     }
// }).listen(80,'127.0.0.1',()=>{
//     console.log('监听成功');
// });

let http = require('http');
let fs = require('fs');
let path = require('path');
let querystring = require('querystring');
//设置根目录
let rootPath=path.join(__dirname,'www');
console.log(rootPath);

http.createServer((requset,response)=>{
    filePath = path.join(rootPath,querystring.unescape(requset.url));
    console.log(requset.url);
    let isExist = fs.existsSync(filePath);//判断路径是否存在
    if(isExist){
        fs.readdir(filePath,(err,files)=>{//判断是文件还是文件夹
            if(err){//是文件
                fs.readFile(filePath,(err,data)=>{
                    if(err){
                        console.log(err);
                    }else{

                        response.end(data);
                    }
                });
            }else{//是文件夹
                if(files.indexOf('index.html')!=-1){
                    fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
                        if(err){
                            console.log(err);
                        }else{
                            response.end(data);
                        }
                    });
                }else{
                    let backData = '';
                    
                    for(let i = 0; i < files.length; i++){
                       
                        backData+=`<h2><a href="${requset.url=='/'?'':requset.url}/${files[i]}">${files[i]}</a></h2>`
                    }
                    response.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    response.end(backData);
                }
            }
        });

    }else{//不存在 直接返回404
        response.writeHead(404,{'content-type':'text/html;charset=utf-8'});
        response.end('<h2>404   not find</h2>');
    }
}).listen(80,'127.0.0.1',(err,data)=>{
    console.log('17.0.0.1:80  开始监听');
})