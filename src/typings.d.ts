export type TVideo = {
    id: string;
    title: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnailUrl: string;
    viewCount: number;
};

export type TGameState = "vs" | "won" | "lost";

export type WindowCustomised = typeof window & {
    umami: any;
};
