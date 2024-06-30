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
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);