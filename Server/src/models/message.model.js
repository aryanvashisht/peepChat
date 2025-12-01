import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
        validate:
            [{
                validator: function (v) {
                    return v.length > 0;
                },
                message:`Message cannot be empty!`
            },
            {
                validator: function (v) {
                    return v.trim().length > 0;
                },
                message:  `Message cannot be empty spaces only!`
            }]
    }
}, { timestamps: true })

export const Message = mongoose.model("Message", messageSchema);