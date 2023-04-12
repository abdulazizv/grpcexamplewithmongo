const mongoose = require("mongoose");
const {v4} = require("uuid");

const userSchema = mongoose.Schema(
    {
        id:{
            type: String,
            default: v4,
            unique: true
        },
        user_name: {
            type: String,
            unique: true
        },
        first_name: {
            type: String,
            maxLength: 100
        },
        last_name: {
            type: String,
            maxLength: 100
        },
        email : {
            type: String,
            unique: true
        }
    },
    {
        timestamps: {createdAt:"created_at", updatedAt: "updated_at"},
        toObject: { virtuals: true},
        toJSON: { virtuals: true}
    }
)

module.exports = mongoose.model("UserApp",userSchema);