import postgres from "postgres";
import {DB_NAME} from '../constants.js';

const sql = postgres({
    host                 : 'localhost',            
    port                 : 5432,          
    database             : DB_NAME,            
    username             : 'postgres',            
    password             : process.env.POSTGRES_PASSWORD 
});
export default sql