import EventEMitter from "node:events";
import { spawn } from "node:child_process";


class YTDLPGetJSONInfo extends EventEMitter {
  #stdoutResult = "";
  // eslint-disable-next-line no-unused-private-class-members
  #stderrResult = "";
  #timeoutTimer; //instance setTimeout
  #timeoutNumber = 1000 * 60 * 5; // 5 menit
  #process;
  #code = null;
  #signal = null;
  constructor(youtubeVideoURL) {
    super();
    this.youtubeVideoURL = youtubeVideoURL;
    this.isStarted = false;

    this.on("stdout-data", (data) => {
      this.#stdoutResult += data ?? "";
    });
    this.on("stderr-data", (data) => {
      this.#stderrResult += data ?? "";
    });
    this.on("error", () => {
      this.#end();
    });
  }

  #sendResult() {
    try {
      this.emit("result", JSON.parse(this.#stdoutResult) || null);
    } catch (error){
      this.#stdoutResult = '{}';
      this.emit("error", error);
    }
  }

  #end() {
    this.#sendResult();
    this.emit("close", this.#code, this.#signal);
    this.#clearTimeoutTimer();
  }

  #startTimeoutTimer() {
    this.#timeoutTimer = setTimeout(() => {
      this.#end();
    }, this.#timeoutNumber);
  }

  #clearTimeoutTimer() {
    clearTimeout(this.#timeoutTimer);
  }

  start() {
    this.#startTimeoutTimer();

    this.#process = spawn(`yt-dlp`, [`-J`, `${this.youtubeVideoURL}`]);

    //saat spwan error
    this.#process.on("error", (error) => this.emit("error", error));

    //ksaat stdout data
    this.#process.stdout.on("data", (chunk) =>
      this.emit("stdout-data", chunk?.toString?.())
    );

    //saat stderr data
    this.#process.stderr.on("data", (data) =>
      this.emit("stderr-data", data?.toString?.())
    );

    //saat ytdlp closed
    this.#process.on("close", (code, signal) => {
      this.#code = code;
      this.#signal = signal;
      this.#end();
    });

    return this;
  }

  promise() {
    return new Promise((resolve, reject) => {
      this.start();
      this.on("result", (result) => {
        resolve(result);
      });
      this.on("error", (error) => {
        reject(error);
      });
    });
  }
}

export class youtubeOneVideo {
  constructor(youtubeVideoURL = '') {
    this.youtubeVideoURL = youtubeVideoURL;
  };

  downloadBest(){
    
  };

  getJSON() {
    return new YTDLPGetJSONInfo(this.youtubeVideoURL);
  };
};








// const ytvid1 = new youtubeOneVideo(
//   "https://www.youtube.com/watch?v=TDv56whosPQ"
  
// );
//  ytvid1
//   .getJSON().promise()
//   .then(result => console.log(result))
//   .catch(e => console.error(e));

  // ytvid1.start()
  // .on("result", (result) => {
  //   console.log({ result });
  // })
  // .on("error", (error) => {
  //   console.error({ error });
  // })
  // .on("close", (code, signal) => {
  //   console.error({ code, signal });
  // })
  // .on("stderr-data", (data) => {
  //   console.log({ stderr: data });
  // })
  // .on("stdout-data", (data) => {
  //   console.log({ stdout: data });
  // });
