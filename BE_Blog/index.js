import express from "express"
import cors from "cors"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import multer from "multer"



const app = express()
app.use(express.json())
app.use(cookieParser())
// app.use(cors({ origin: 'http://localhost:5173' }))


//It creates a file to save uploaded files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../FE_Blog/youtube2022/public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
res.status(200).json(file.filename)

})
app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)

app.use("/api/posts",postRoutes)

app.listen(8800,()=>{
    console.log('Connected');
    
})