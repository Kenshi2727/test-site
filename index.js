import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import  prompt from "prompt-sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port= 3000;
let posts=[];
let titles=[];
let oldTitle;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/',(req,res)=>res.render('index.ejs'));

app.get('/create',(req,res)=>{
    res.render('create.ejs');
});

app.get('/about',(req,res)=>{
    res.render('about.ejs');
});

app.get('/view',(req,res)=>{
    res.render('view.ejs',res.locals={posts:posts,titles:titles});
});

app.get('/delete',(req,res)=>{
    res.render('delete.ejs');
});

app.get('/update',(req,res)=>{
    res.render('update.ejs');
});

app.post('/update',(req,res)=>{
    oldTitle=req.body.currentTitle;
    res.render('edit.ejs',res.locals={post:posts[titles.indexOf(oldTitle)],title:oldTitle});
});

app.post('/edit',(req,res)=>{
    if(posts.length>0 && titles.includes(oldTitle)){
        posts[titles.indexOf(oldTitle)]=req.body.newPost;
        titles[titles.indexOf(oldTitle)]=req.body.newTitle;
        res.render('index.ejs');
    }
    else{
        res.send('<h1>Post not found bosdhk!</h1>');
        setTimeout(()=>res.render('index.ejs'),3000);
    }
});

app.post('/delete',(req,res)=>{
    if(posts.length>0 && titles.includes(req.body.current)){
        posts.splice(titles.indexOf(req.body.current),1);
        //now deleting title
        titles.splice(titles.indexOf(req.body.current),1);
     
        res.render('index.ejs');
    }
    else{
        res.send('<h1>Post not found bosdhk!</h1>');
        setTimeout(()=>res.render('index.ejs'),3000);
    }
   
    
});

app.post('/submit',(req,res)=>{
    res.render('index.ejs');
    posts.push(req.body.new);
    titles.push(req.body.title);
    // console.log(posts);
    console.log(req.body);
});



app.listen(port,()=>console.log(`Server is running on port ${port}.`));




