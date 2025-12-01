import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating refresh and access Token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    console.log("registerUser-code");

    const { username, name, email, password } = req.body;

    if ([name, email, username, password].some((field) =>
        field?.trim() === ""
    )) {
        throw new ApiError(
            400,
            "All fields are required"
        )
    }

    const existeduser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existeduser) {
        throw new ApiError(
            409,
            "Username or email already exists"
        )
    }

    const user = await User.create({
        username,
        name,
        email,
        password
    })

    const CreatedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: CreatedUser
    })
})

const loginUser = asyncHandler(async (req, res) => {
    console.log("loginUser-code");

    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(
            404,
            "User does not exist"
        )
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "User logged in successfully",
            data: loggedInUser,
            refreshToken,
            accessToken
        })
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ 
            success: true,
            message: "User logged out successfuly!" })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Refresh token is required")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    console.log(decodedToken?.gfg);
    console.log(decodedToken?._id);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(401, "Invalid Refresh token");
    }

    if (user?.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ accessToken, refreshToken, user,message: "Token refreshed successfuly" })
})

const getUsers = asyncHandler(async (req, res) => {
    console.log("get-all-users");
    
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password -refreshToken");

    if (!users) {
        throw new ApiError(404, "no users found");
    }

    return res
        .status(200)
        .json({ users, success: 1, message: "All users fetched successfuly" })
})

export { registerUser, loginUser, refreshAccessToken, logoutUser, getUsers };