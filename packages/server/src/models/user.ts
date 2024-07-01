import mongoose, { Document, Schema, Model } from "mongoose";

export type UserAttributes = {
    username: string;
    password: string;
}

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {},
        updatedAt: {}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;