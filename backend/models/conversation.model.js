import mongoose from "mongoose";

const conschema=new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default: [],
    }]
},{
    timestamps: true
})

const Conversation=mongoose.model("Conversation",conschema);
export default Conversation;