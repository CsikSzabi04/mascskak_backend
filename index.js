import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

let macskak = [
    {id:1, nev:"Cirmos", kor:2, szin:"szürke"},
    {id:2, nev:"Kutya", kor:1, szin:"fekete"},
];

let nextId = 3;

function indexOf(id){
    let i = 0; while( i<macskak.length && macskak[i].id != id ) i++;
    if( i<macskak.length ) return i; else return -1;
}

function addMacska(req, resp){
    if(req.body.nev && req.body.kor && req.body.szin){
        const macska = {id:nextId++, nev:req.body.nev, kor:req.body.kor, szin:req.body.szin}
        macskak.push(macska);
        resp.send(macska);
    }else resp.send({error: "Error in parameters!"});
}

function delMacska(req, resp){
    if(req.params.id){
        let i = indexOf(req.body.id);
        if(i != -1){
            const macska = macska.splice(i, 1);
            resp.send(macska[0]);
        }else resp.send({error: "Error ID!"});
    }else resp.send({error: "Error in parameters!"});
}


function modMacska(req, resp){
    if(req.body.id && req.body.nev && req.body.kor && req.body.szin){
        let i = indexOf(req.body.id*1)
        if(i != -1){
            const macska = { id:nextId++, nev:req.body.nev, kor:req.body.kor*1, szin:req.body.szin }
            macskak[i] = macska
            resp.send(macska)
        }else resp.send({error: "Error ID!"});
    }else resp.send({error: "Error in parameters!"});
}

app.get("/", (req, resp) => resp.send("<h1>Macskák v1.0.0</h1>"));
app.get("/macskak", (req, resp) => resp.send(macskak));
app.post("/macska", addMacska);
app.delete("/macska/:id", delMacska);
app.put("/macska", modMacska);

app.listen(88, (error) => {
    if(error) console.log(error); else console.log("Server is on port 88: ");
})