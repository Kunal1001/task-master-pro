import 'dotenv/config'
import { app } from './app.js';


app.listen(process.env.PORT, ()=>{
    console.log(`Listening on PORT : ${process.env.PORT}`);
})