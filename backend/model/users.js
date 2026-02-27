import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String,
     required: true, 
     unique: true 
    },
  password: { type: String,
     required: true 
    },
});

export default mongoose.model("User", userSchema);