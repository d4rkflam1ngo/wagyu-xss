const mongoose = require("mongoose");
const { Schema } = mongoose;

const implantSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    server: {
        type: String,
        required: [true, "Implant must have a server"]
    },
    payload: {
        type: String,
        required: [true, "Implant must contain a payload"]
    },
    callbackInterval: {
        type: Number,
        default: 10000,
        required: false
    },
    initialPayload: {
        id: {
            type: String,
            required: false,
            default: ""
        },
        name: {
            type: String,
            required: false,
            default: ""
        }, 
        payload: {
            type: String,
            required: false,
            default: ""
        }
    }
});

implantSchema.pre("save" , function(next) {
    this.payload = this.payload.split("%%IMPLANTID%%").join(this._id.toString());
    next();
});

const Implant = mongoose.model("Implant", implantSchema);
module.exports = Implant;