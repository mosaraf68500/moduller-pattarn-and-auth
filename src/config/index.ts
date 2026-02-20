import path from "path";
import dotenv from "dotenv";


dotenv.config({ path: path.join(process.cwd(), ".env") });

const config={
    connection_string : process.env.CONNECTION_STR,
    port : process.env.PORT
}

export default config;