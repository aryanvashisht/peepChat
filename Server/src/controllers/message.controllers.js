import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReciverSocketId, io } from "../socketio/server.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
    console.log("send-message");

    const { id: receiverID } = req.params;
    const { message } = req.body;
    const senderID = req.user._id;

    if (!message || message.trim().length === 0) {
        throw new ApiError(400, "Message cannot be empty");
    }

    let conversation = await Conversation.findOne({
        participants: { $all: [senderID, receiverID] }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderID, receiverID],
            messages: []
        });
    }

    const newMessage = new Message({
        senderID,
        receiverID,
        message
    })
    console.log(newMessage, "newMessage");
    console.log(conversation, "conversation");

    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiversocketId = getReciverSocketId(receiverID.toString());

    if (receiversocketId) {
        console.log(receiversocketId, "receiversocketId");

        io.to(receiversocketId).emit("newMessage", {
            newMessage,
            conversationId: conversation._id
        });
    }

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage
    });
}
);

const getMessage = asyncHandler(async (req, res) => {
    console.log("get-messages");

    //gets converstations in which logged in user and chat user are participants
    const { id: chatUser } = req.params;
    const senderID = req.user._id;
    const conversation = await Conversation.findOne({
        participants: { $all: [senderID, chatUser] }
    }).populate('messages');

    if (!conversation) {
        return res.status(200).json({
            success: true,
            message: "No messages found",
            data: []
        });
    }

    const messages = conversation.messages;

    res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        data: messages
    });
}
);

export { sendMessage, getMessage };