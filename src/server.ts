import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';

let server : Server;
const PORT = 5000;

async function main() {
    
    try{
        await mongoose.connect('mongodb+srv://library_manager:library321@cluster0.cff0s1a.mongodb.net/librarayDB?retryWrites=true&w=majority&appName=Cluster0');
        server = app.listen( PORT ,()=>{
            console.log(`App is listening on port ${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

main()