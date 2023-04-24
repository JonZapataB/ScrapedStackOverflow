import mongoose from "../utils/mongoose.js";

const AnswerSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required:false
    },
    votes: {
        type: Number,
        default: 0,
    },
    user : {
        type: String,
        required: false,
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
});

const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;