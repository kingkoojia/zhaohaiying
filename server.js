const http=require('http'),fs=require('fs'),path=require('path');
const dir='C:\\Users\\Elsa Jia\\Documents\\律师\\website-v3';
const mime={'html':'text/html;charset=utf-8','css':'text/css','js':'text/javascript','png':'image/png','jpg':'image/jpeg'};
http.createServer((req,res)=>{
  let url=req.url.split('?')[0];
  if(url==='/')url='/index.html';
  const file=path.join(dir,url);
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404);res.end('404 '+url)}
    else{const ext=path.extname(file).slice(1);res.writeHead(200,{'Content-Type':mime[ext]||'text/plain'});res.end(data)}
  })
}).listen(8080)
