var mongoose =require('mongoose')
 
var options = {
   connectTimeoutMS: 5000,
   useUnifiedTopology: true,
   useNewUrlParser: true,
}
 
mongoose.connect('mongodb+srv://Olivia:98-vda-Oaf@cluster0.upihv.mongodb.net/GlouGlou?retryWrites=true&w=majority',
options,
function(err){
   console.log(err);
}
)

// 'mongodb+srv://Juliettefontaine:94Mongo.@cluster0.g9yct.mongodb.net/GlouBDD?retryWrites=true&w=majority'