import rss from "@astrojs/rss";
import { getPosts } from "../services/api";

export async function GET(context: any) {
  let posts: any[] = [];
  try {
    posts = await getPosts({ limit: 100, page: 1, sort: "-createdAt" });
  } catch {
    posts = [];
  }

  return rss({
    title: "VivaTDAH",
    description: "Conteúdo informativo e acessível sobre TDAH",
    site: context.site,
    items: posts.map((p) => ({
      title: p.title,
      description: p.description ?? "",
      link: `/post/${p.slug}`,
      pubDate: p.createdAt ? new Date(p.createdAt) : new Date(),
    })),
  });
}

