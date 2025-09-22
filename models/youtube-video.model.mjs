import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
const { Schema, Types } = mongoose;

const formatSchema = new Schema(
  {
    format_id: {
      type: String,
      required: true,
    },
    format_note: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    manifest_url: {
      type: String,
      required: false,
    },
    language: {
      type: [String, null],
      required: false,
    },
    ext: {
      type: String,
      required: true,
    },
    protocol: {
      type: String,
      required: false,
    },
    quality: {
      type: Number,
      required: false,
    },
    acodec: {
      type: String,
      required: false,
    },
    vcodec: {
      type: String,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    video_ext: {
      type: String,
      required: false,
    },
    audio_ext: {
      type: String,
      required: false,
    },
    abr: {
      type: String,
      required: false,
    },
    vbr: {
      type: String,
      required: false,
    },
    resolution: {
      type: String,
      required: false,
    },
    format: {
      type: String,
      required: false,
    },
  },
  {
    _id: false,
  }
);

const thumnailSchema = new Schema({
  url: String,
  preference: Number,
  id: Number,
});

const youtubeVideoSchema = new Schema(
  {
    uuid: {
      type: Types.UUID,
      required: true,
      default: () => randomUUID(),
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    formats: {
      type: [formatSchema],
      required: true,
    },
    thumbnails: {
      type: [thumnailSchema],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    channel_id: {
      type: String,
      required: false,
    },
    channel_url: String,
    duration: {
      type: Number,
      required: false,
    },
    view_count: {
      type: Number,
      required: false,
    },
    average_rating: {
      type: [Number, String],
      required: false,
    },
    age_limit: {
      type: Number,
      required: false,
      default: 0,
    },
    webpage_url: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    playable_in_embed: {
      type: Boolean,
      required: false,
      default: false,
    },
    live_status: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    media_type: {
      type: String,
      required: false,
    },
    release_timestamp: {
      type: [String, Date],
      required: false,
    },
    comment_count: {
      type: Number,
      required: false,
    },
    like_count: {
      type: Number,
      required: false,
    },
    channel: {
      type: String,
      required: false,
    },
    channel_follower_count: {
      type: Number,
      required: false,
    },
    uploader: {
      type: String,
      required: false,
    },
    uploader_id: {
      type: String,
      required: false,
    },
    uploader_url: {
      type: String,
      required: false,
    },
    channel_is_verified: {
      type: Boolean,
      required: false,
    },
    upload_date: {
      type: String,
      required: false,
    },
    timestamp: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    availability: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    original_url: {
      type: String,
      required: false,
    },
    webpage_url_basename: {
      type: String,
      required: false,
    },
    webpage_url_domain: {
      type: String,
      required: false,
    },
    extractor: {
      type: String,
      required: false,
    },
    extractor_key: {
      type: String,
      required: false,
    },
    display_id: {
      type: String,
      required: false,
    },
    fulltitle: {
      type: String,
      required: false,
    },
    duration_string: {
      type: String,
      required: false,
    },
    release_year: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    is_live: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
    },
    was_live: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
    },
    epoch: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },
    format: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    format_id: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    ext: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    protocol: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    language: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    format_note: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    filesize_approx: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    abr: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    asr: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    tbr: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },
    vbr: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },
    width: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },
    height: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },
    resolution: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    fps: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },

    dynamic_range: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    vcodec: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    aspect_ratio: {
      type: mongoose.Schema.Types.Number,
      required: false,
    },
  },
  {
    methods: {},
    statics: {},
  }
);

export const YoutubeVideo = mongoose.model(
  "youtubeVideo",
  youtubeVideoSchema
);

