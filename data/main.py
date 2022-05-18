import json

from tqdm import tqdm

from youtube import get_channel_best_videos, get_videos_statistics, _get_youtube_api_key

INTEREST_TO_NUMBER_OF_VIDEOS = {1: 20, 2: 14, 3: 7, 4: 3}

channels_file = open("channels.json", "r")
channels = json.load(channels_file)

videos = []

for channel in tqdm(channels, desc="Getting videos for youtubers"):
    channel_id = channel["id"]
    interest = channel["interest"]

    number_of_videos = INTEREST_TO_NUMBER_OF_VIDEOS[interest]

    channel_videos = get_channel_best_videos(channel_id, number_of_videos)
    videos.extend(get_videos_statistics(channel_videos))

videos_file = open("videos.json", "w")
json.dump(videos, videos_file)
print(json.dumps(videos))


