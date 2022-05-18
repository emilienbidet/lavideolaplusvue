import {TVideo} from "../typings";

import videos from "../assets/json/videos.json";

export const getRandomVideo: () => TVideo = () => {
    const video = videos[Math.floor(Math.random() * videos.length)];
    return video;
};
