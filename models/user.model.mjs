import mongoose from "mongoose";
import { YoutubeVideo } from "./youtube-video.model.mjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    downloads: {
      youtube_videos: [YoutubeVideo],
      default: []
    },
  },
  {
    methods: {

    },
    statics: {
      
    }
  }
);


export const User = mongoose.model('User', userSchema);
