const mongoose=require('mongoose');
const suggestionSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maximum:100,
    },
    suggestion:{
        type:String,
        required:true,
    }
});
const Suggestion=mongoose.model('Suggestion',suggestionSchema);
module.exports=Suggestion;