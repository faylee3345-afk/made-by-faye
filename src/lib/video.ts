export function youtubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return match?.[1];
}

export function bilibiliId(url: string) {
  const match = url.match(/BV[\w]+/);
  return match?.[0];
}

export function embedSrc(provider: string, url: string) {
  if (provider === "youtube") {
    const id = youtubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (provider === "bilibili") {
    const id = bilibiliId(url);
    return id
      ? `https://player.bilibili.com/player.html?bvid=${id}&autoplay=0`
      : url;
  }
  return url;
}
