var mongoose =require('mongoose')


 
var options = {
   connectTimeoutMS: 5000,
   useUnifiedTopology: true,
   useNewUrlParser: true,
}
 
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}.@cluster0.g9yct.mongodb.net/GlouBDD?retryWrites=true&w=majority`,
options,
function(err){
   console.log(err);
}
)
