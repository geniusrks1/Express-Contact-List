 // comand use in terminal
 //1. cd for current directory  // ls and pwd commands use to check current path or directory
 //2. npm init for package.json  libraries dependencies of express.js
 //3. npm install express for package-lock.json   libraries dependencies of express.js
 //4. nodemon index.js for running the port
 //5. ctr+c for killing the running port/server
 //6. npm install ejs setting up a template engine  will save on pacage.json

const express =require('express'); //  require it just like other libraries 
const path =require('path');
const port =8000;                  // server runs on port
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();               // call express as a function

// set template engine 
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList= [
        {
         name: "rohit kumar",
         phone: "7007814970"
        },
        {
            name:" mahesh",
            phone: "7007814971"
        },
        {
            name: "shayam",
            phone:"1234567890"
        }

    ]



app.get('/', function(req, res){


    Contact.find({}, function(err,contactList){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contactList
        });

    })
  
});



app.get('/practice',function(req,res){   // '/' for practice adress
    return res.render('practice',{
        title: 'let us practice'
    });
    });

    // controller
app.post('/create-contact',function(req,res){
        Contact.create({
            name: req.body.name,
            phone: req.body.phone
        }, function(err, newContact){
            if(err){console.log('Error in creating a contact!')
                return;}
                console.log('******', newContact);
                return res.redirect('back');
        })
    });

  // for deleting contact from list
    app.get('/delete-contact/', function(req, res){
        console.log(req.query);
        let id = req.query.id;
    
        // find the contact in database using id and delete
        Contact.findOneAndDelete(id, function(err){
            if(err){
                console.log('error in deleting the object');
                return;
            }
            return res.redirect('back');
        }) 
    });







app.listen(port, function(err){   // server running listening a request and sending back a response
    if(err){
        console.log('its a error',err);
    }
    console.log('my server running on port', port);
});
