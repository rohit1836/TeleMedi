const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./patientdb.js");
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// const tempelatePath = path.join(__dirname, '../templates')
// const publicPath = path.join(__dirname, '../public')

// app.use(express.static(publicPath))
app.use(express.static('public'))

// app.use("backend/", express.static('views'))

app.get("/",(req,res)=>{
    res.render('index.hbs')
})
app.get('/patientLogin', (req, res) => {
    res.render('patientLogin.hbs')
})
app.get('/adminLogin', (req, res) => {
    res.render('adminLogin.hbs')
})
app.get('/patientRegistration', (req, res) => {
    res.render('patientRegistration.hbs')
})
app.get('/doctorLogin', (req, res) => {
    res.render('doctorLogin.hbs')
})
app.get('/doctorRegistration', (req, res) => {
    res.render('doctorRegistration.hbs')
})
app.get('/patient', (req, res) => {
    res.render('patient.hbs')
})
app.get('/contact', (req, res) => {
    res.render('contact.hbs')
})
app.get('/about', (req, res) => {
    res.render('about.hbs')
})
app.get('/patientdashboardindex', (req, res) => {
    res.render('patientdashboardindex.hbs')
})
app.get('/doctordashboardindex', (req, res) => {
    res.render('doctordashboardindex.hbs')
})
app.get('/doctordashboardindex', (req, res) => {
    res.render('doctordashboardindex.hbs')
})



// Patient registration
app.post('/patientRegistration', async (req, res) => {
    
    const {username,name,password,email} = req.body;
    let user = await LogInCollection.findOne({username});
    if(user) return res.status(400).json("User exist")
     
    user = await LogInCollection.create({
    name,
    email,
    username,
    password
   })
   res.redirect("/patientdashboardindex")
})



// Patient Login
app.post('/patientLogin', async (req, res) => {
    const user = await LogInCollection.findOne({ username: req.body.username })
    if(!user) return res.status(400).json({sucess:"false",message:"User not found"})
    if (user.password !== req.body.password) return res.status(400).json({sucess:"false",message:"Incorrect password"})
    req.user = user;       
    res.status(201).redirect("/patientdashboardindex")
})



const DoctorCollection = require("./doctordb.js");

// Doctor registration
app.post('/doctorRegistration', async (req, res) => {
    
    const {username,fullName,password,email,phoneno,qualifications,department} = req.body;
    let user = await DoctorCollection.findOne({username});
    if(user) return res.status(400).json("User exist")
     
    user = await DoctorCollection.create({
    fullName,
    username,
    password,
    email,
    phoneno,
    qualifications,
    department
   })
   res.redirect("/doctordashboardindex")
})



// Doctor Login
app.post('/doctorLogin', async (req, res) => {
        const user = await DoctorCollection.findOne({ username: req.body.username })
        if(!user) return res.status(400).json({sucess:"false",message:"User not found"})
        if (user.password !== req.body.password) return res.status(400).json({sucess:"false",message:"Incorrect password"})
        req.user = user;       
        res.status(201).redirect("/doctordashboardindex")
})


app.listen(port, () => {
    console.log('port connected . . . listening at port 3000....');
})