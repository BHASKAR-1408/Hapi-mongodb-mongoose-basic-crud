const hapi = require('hapi')
var  mongoose = require ("mongoose") ; 
const server = new hapi.Server({
    host:"localhost",
    port:4000
})

var db = {useNewUrlParser: true,useUnifiedTopology: true}
mongoose.connect('mongodb://localhost/bhaskar',db);

const Books = require('./mongoose')


server.route({
    method : "GET",
    path : "/get",
    handler : async (request, reply)=> {
        const res = await Books.find()
        return(res)
    },    
})

server.route({
    method : "POST",
    path : "/",
    handler : async (req,reply)=>{
        const res = await Books.create(req.payload)
        return({Data:"Inserted"})
        // return (req.payload)
    }
})  

// update endpoint

server.route({
    method:'PUT',
    path:'/update/{title}',
    handler:async(req)=>{
        let res = await Books.findOneAndUpdate({title:req.params.title},(req.payload),{useFindAndModify: false})
        return({Data:"Updated!"})
    }
})

// for deleting one element in collection of db

server.route({
    method:'DELETE',
    path:'/delete/{title}',
    handler:async(req)=>{
        let res = await Books.findOneAndDelete({title:req.params.title},{useFindAndModify: false})
        return({Data:"deleted successfully!"})
    }
})

server.start(console.log("hapi server is working"))