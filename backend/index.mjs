import { app } from "./src/server/serverApp.mjs";
import ENV from "./config.mjs"
// Bareer_Token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDAwMjkxMTJ9.zSUKV4okBZE0vsph-oUVXDmnJjlEnV7PuCwrQbLflUo
import "./src/server/routes.mjs"
app.listen(ENV.port, () => {
    console.log('Server is start');
})

