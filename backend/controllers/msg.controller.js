import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverid } = req.params;
		const senderid = req.user._id;
		let conversation = await Conversation.findOne({
			participants: { $all: [senderid, receiverid] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderid, receiverid],
			});
		}

		const newMessage = new Message({
			senderid,
			receiverid,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);
		const receiverSocketId = getReceiverSocketId(receiverid);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(new ApiResponse(200,newMessage,"Message sent successfully"));
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json(new ApiError(500,"Error in sending"));
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(new ApiResponse(200,messages,"Messages fetched successfully"));
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json(new ApiError(500,"Couldn't get message"));
	}
};