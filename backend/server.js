import express from "express";
import { readFile } from "fs/promises";
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

// This will hold our student data after it's loaded.
let data = [];

//Read JSON FILE
async function loadStudents() {
  try {
    const fileData = await readFile('./data.json', 'utf-8');
    data = JSON.parse(fileData);
    console.log("Student data loaded successfully.");
  } catch (error) {
    console.error("Failed to load or parse data.json:", error);
    // Exit the process if the essential data can't be loaded.
    process.exit(1);
  }
}

//ENDPOINT
app.get('/api/search',(req,res)=>{
    const {name,room,roll} = req.query;
    let result = data;

    if(name){
        result = result.filter(s=> s.name.toLowerCase().includes(name.toLowerCase()));
    }
    if(roll){
        result = result.filter(s=>s.rollNumber.toLowerCase().includes(roll.toLowerCase()));
    }
    if(room){
        result = result.filter(s=> s.roomNumber.toLowerCase().includes(room.toLowerCase()));
    }
    res.json(result);
});

//Setting up Server
loadStudents().then(() => {
    app.listen(PORT, () => {
        console.log(`Application Running on ${PORT}`);
    });
});
