import {TVideo} from "../typings";

import videos from "../assets/json/videos.json";

let lastVideo: TVideo | null = null;

export const getRandomVideo: () => TVideo = () => {
    const pickableVideos: TVideo[] = videos.filter(
        (video: TVideo) => video !== lastVideo
    );
    const randomIndex = Math.floor(Math.random() * pickableVideos.length);
    const randomVideo = pickableVideos[randomIndex];
    lastVideo = randomVideo;
    return randomVideo;
};
