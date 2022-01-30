import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { MongoClient } from "mongodb"

const app = express()
app.use(express.json())

app.use(express.urlencoded())
app.use(cors())

const PORT = process.env.PORT || 9002;

mongoose.connect("mongodb://localhost:27017/techprimedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database Connected")
})

//Schema
const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String
})

const projectSchema = new mongoose.Schema({
    projectName : String,
    reason : String,
    type : String,
    division : String,
    category : String,
    priority : String,
    department : String,
    start : String,
    end : Date,
    location : String,
    status : String
})

//Model
const User = new mongoose.model("User",userSchema)

const Project = new mongoose.model("Project",projectSchema)

app.use(express.static(path.join(__dirname, "/<frontend>/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/<frontend>/build', 'index.html'));
});

//Login
app.post("/login",(req,resp) => {
    const { email , password} = req.body
    User.findOne({email: email},(err , user) => {
        if(user){
            if(password === user.password) {
                resp.send({
                    Success : "True",
                    message : "Valid Credentials" , user : user
                })
            } else {
                resp.send({
                    message : "InValid Password"
                })
            }
        } else {
            resp.send({message : "User Not Found"})
        }
    })
})


// Register
app.post("/register",(req,resp) => {
    const { name , email , password} = req.body
    User.findOne({email: email},(err , user) => {
        if(user){
            resp.send({
                message : "User Already registered"
            })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save( err => {
                if(err){
                    resp.send(err)
                }else{
                    resp.send({
                        message : "Successfully Registered , Please Login Now!"
                    })
                }
            })
        }
    })

})

//List Project
app.get("/projects",(req , resp) => {
    Project.find({} ,(err , projects) => {
        if(err) resp.send(err);
        resp.send(projects)
    })
})

//SearchBar
app.get('/search/:projectName',(req,res) => {
    var regex = new RegExp(req.params.projectName,'i');
    Project.find({projectName : regex}).then((result) => {
        res.status(200).json(result)
    })
})

// Total Counters
app.get('/projects/status', (req,resp) => {            
    
      Project.aggregate([
      {
        '$facet': {
          'Total': [
            {
              '$count': 'Registered'
            }
          ], 
          'Running': [
            {
              '$match': {
                'status': 'Running'
              }
            }, {
              '$count': 'Running'
            }
          ], 
          'Cancelled': [
            {
              '$match': {
                'status': 'Cancelled'
              }
            }, {
              '$count': 'Cancelled'
            }
          ], 
          'Closed': [
            {
              '$match': {
                'status': 'Closed'
              }
            }, {
              '$count': 'Closed'
            }
          ], 
          'Closure': [
            {
              '$match': {
                'status': 'Running', 
                'end': {
                  '$lt': new Date()
                }
              }
            }, {
              '$count': 'Closure'
            }
          ]
        }
      }
    ]).exec((error,result) => {
         if (error)
         return resp.send(error);
        resp.json(result);
      });
})

app.put("/updateRunning",async (req , res) => {
    const newStatus1 = req.body.newStatus1;
    const id = req.body.id;

    try{
        await Project.findById(id , (err , updatedStatus) => {
            updatedStatus.status = newStatus1;
            updatedStatus.save();
            res.send({
              Success : "true",
              message : "Project Running"
            }
            );
        }).clone()
    }
    catch(err){
        console.log(err)
    }
})

app.put("/updateClosed",async (req , res) => {
    const newStatus2 = req.body.newStatus2;
    const id = req.body.id;

    try{
        await Project.findById(id , (err , updatedStatus) => {
            updatedStatus.status = newStatus2;
            updatedStatus.save();
            res.json({
              Success : "true",
              message : "Project Closed"
            });
        }).clone()
    }
    catch(err){
        console.log(err)
    }
})

app.put("/updateCancelled",async (req , res) => {
    const newStatus3 = req.body.newStatus3;
    const id = req.body.id;

    try{
        await Project.findById(id , (err , updatedStatus) => {
            updatedStatus.status = newStatus3;
            updatedStatus.save();
            res.json({
              Success : "true",
              message : "Project Cancelled"
            });
        }).clone()
    }
    catch(err){
        console.log(err)
    }
})


//Insert Project
app.post("/insertproject",(req,resp) => {
    const { projectName ,reason, type, division, category, priority, department, start, end, location, status} = req.body
        Project.findOne({projectName: projectName},(err , project) => {
        if(project){
            resp.send({
                Success : "True",
                message : "Project Already Created"
            })
        } else {
            const project = new Project({
                projectName,
                reason,
                type,
                division,
                category,
                priority,
                department,
                start,
                end,
                location,
                status
            })
            project.save( err => {
                if(err){
                    resp.send(err)
                }else{
                    resp.send({
                        Success : "True",
                        message : "Project Created!"
                    })
                }
            })
        }
    }).clone()

})

//Chart Values
app.get('/chartdata', (req,resp) => {            
    
    Project.aggregate([
        {
          '$facet': {
            'Registered': [
              {
                '$group': {
                  '_id': '$department', 
                  'Registered': {
                    '$sum': 1
                  }
                }
              }, {
                '$sort': {
                  '_id': 1
                }
              }
            ], 
            'Completed': [
              {
                '$match': {
                  'status': 'Closed'
                }
              }, {
                '$group': {
                  '_id': '$department', 
                  'Completed': {
                    '$sum': 1
                  }
                }
              }, {
                '$sort': {
                  '_id': 1
                }
              }
            ]
          }
        }
      ]).exec((error,result) => {
           if (error)
           return resp.send(error);
          resp.json(result);
    });
})

if(process.env.NODE_ENV == "production") {
  app.use(express.static("techprime frontend/build"));
}

app.listen(PORT, () => {
  console.log(`Server Started at PORT no ${PORT}`)
} )