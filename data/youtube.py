import requests
import os

from utils import url_exists

YOUTUBE_API_KEYS = os.getenv('YOUTUBE_API_KEYS').split(',')
YOUTUBE_API_BASE_URL = "https://youtube.googleapis.com/youtube/v3/"
YOUTUBE_API_SEARCH_URL = YOUTUBE_API_BASE_URL + "search"
YOUTUBE_API_VIDEO_URL = YOUTUBE_API_BASE_URL + "videos"

youtube_api_calls = 0


def get_channel_best_videos(channel_id: str, number_of_videos: int):
    params = {
        "key": _get_youtube_api_key(),
        "channelId": channel_id,
        "maxResults": number_of_videos,
        "part": "snippet",
        "order": "viewCount",
        "type": "video",
    }

    response = requests.get(YOUTUBE_API_SEARCH_URL, params=params)
    response.raise_for_status()
    response_json = response.json()

    videos = []
    for result in response_json["items"]:
        video_id = result["id"]["videoId"]
        thumbnail_url = get_high_quality_thumbnail_url(video_id)
        if thumbnail_url:
            videos.append({
                "id": video_id,
                "title": result["snippet"]["title"],
                "channelId": result["snippet"]["channelId"],
                "channelTitle": result["snippet"]["channelTitle"],
                "publishedAt": result["snippet"]["publishedAt"],
                "thumbnailUrl": thumbnail_url,
            })

    return videos


def get_videos_statistics(videos: list):
    video_ids = [video["id"] for video in videos]

    params = {
        "key": _get_youtube_api_key(),
        "id": ','.join(video_ids),
        "part": "statistics",
    }

    response = requests.get(YOUTUBE_API_VIDEO_URL, params=params)
    response.raise_for_status()
    videos_statistics = {video["id"]: video["statistics"] for video in response.json()["items"]}

    return [{**video, "viewCount": int(videos_statistics[video["id"]]["viewCount"])} for video in videos]


def get_high_quality_thumbnail_url(video_id):
    url = f"https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg"
    return url if url_exists(url) else None


def _get_youtube_api_key():
    global youtube_api_calls
    youtube_api_calls += 1
    return YOUTUBE_API_KEYS[youtube_api_calls % len(YOUTUBE_API_KEYS)]
