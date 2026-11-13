import type { Post } from "../types";

const photos = {
  travel:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  mountain:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  city: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",
  flowers:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85",
  road: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
  marathon:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85",
  journal:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
};

export const categories = ["All posts", "Travel", "Life", "Stories", "Poetry"] as const;

export type Category = (typeof categories)[number];

export function getPostPath(post: { title: string; slug?: string }) {
  const slug = post.slug || post.title
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-");
  return `/posts/${slug}`;
}

export const posts: Post[] = [
  {
    title: "A Drive To The Mountains",
    category: "Travel",
    readTime: "7 min read",
    views: "189",
    image: photos.road,
    date: "A little escape",
    excerpt:
      "Windows down, winding roads ahead, and the kind of mountain air that makes the whole world feel quiet for a while.",
  },
  {
    title: "My First Marathon",
    category: "Life",
    readTime: "4 min read",
    views: "177",
    image: photos.marathon,
    date: "A story in motion",
    excerpt:
      "The finish line was only one small part of it. This is about the early mornings, the doubts, and showing up anyway.",
  },
  {
    title: "A day off #2",
    category: "Life",
    readTime: "7 min read",
    views: "119",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    date: "Slow days",
    excerpt:
      "A gentle reminder that doing nothing for a little while can be its own kind of doing something.",
  },
  {
    title: "A day off #1..",
    category: "Life",
    readTime: "7 min read",
    views: "170",
    image: "https://static.wixstatic.com/media/7f52a9_c399bfa4ff344411988031b964bb184b~mv2.png",
    date: "Slow days",
    excerpt:
      "A handful of unhurried hours, a change of scenery, and permission to let the day unfold on its own.",
  },
  {
    title: "Chikmagalur - A prayer that was unexpectedly answered!",
    category: "Travel",
    readTime: "2 min read",
    views: "166",
    image: photos.mountain,
    date: "Chikmagalur",
    excerpt:
      "A little getaway that turned into something much more meaningful than I expected.",
  },
  {
    title: "Jan - Journal 24 Series",
    category: "Stories",
    readTime: "11 min read",
    views: "103",
    image: "https://static.wixstatic.com/media/7f52a9_abfa27f8028c43e28a88fe37f356475d~mv2.png",
    date: "Journal 24",
    excerpt:
      "A month of tiny moments, collected one day and one page at a time.",
  },
  {
    title: "Garba Night - 18 Oct 23 @Palace Grounds",
    category: "Life",
    readTime: "6 min read",
    views: "117",
    image: photos.city,
    date: "Bengaluru",
    excerpt:
      "Music, colour, and a night that made standing still feel impossible.",
  },
  {
    title: "Some good old habits!",
    category: "Stories",
    readTime: "3 min read",
    views: "107",
    image: photos.flowers,
    date: "Little things",
    excerpt:
      "Some of the best parts of growing up are the familiar things we choose to keep.",
  },
  {
    title: "The Indihood Baddies",
    category: "Stories",
    readTime: "3 min read",
    views: "195",
    image: "https://static.wixstatic.com/media/7f52a9_b9ac4c89f82b4c6b8671759ba5a349ae~mv2.jpg",
    date: "The people",
    excerpt:
      "A small love letter to the people who make ordinary days a lot more fun.",
  },
  {
    title: "MANGALORE DAYS",
    category: "Travel",
    readTime: "9 min read",
    views: "148",
    image: "https://static.wixstatic.com/media/7f52a9_207e7a244c2d4fbdb9035d3cf6f25173~mv2.jpg",
    date: "Mangalore",
    excerpt:
      "Salt in the air, familiar streets, and a few days that still feel like a postcard.",
  },
  {
    title: "KASHMIR DIARIES",
    category: "Travel",
    readTime: "3 min read",
    views: "106",
    image: "https://static.wixstatic.com/media/7f52a9_df88e883dc174a0784089b4bd3f91237~mv2.jpeg",
    date: "Kashmir",
    excerpt:
      "A few frames from the mountains and a place that stays with you long after you leave.",
  },
  {
    title: "Tiny Tales Everywhere #1",
    category: "Stories",
    readTime: "3 min read",
    views: "180",
    image: photos.journal,
    date: "Tiny tales",
    excerpt:
      "Little stories are everywhere; sometimes you just have to pause long enough to notice.",
  },
  {
    title: "My latest stint at Mixed Martial Arts",
    category: "Life",
    readTime: "9 min read",
    views: "172",
    image: photos.marathon,
    date: "Learning",
    excerpt:
      "A new challenge, a lot of learning, and a reminder that being a beginner can be brilliant.",
  },
  {
    title: "The Last Samurai",
    category: "Stories",
    readTime: "3 min read",
    views: "139",
    image: photos.mountain,
    date: "A reflection",
    excerpt: "A story about courage, change, and the lessons we carry forward.",
  },
  {
    title: "Couplets",
    category: "Poetry",
    readTime: "2 min read",
    views: "81",
    image: photos.flowers,
    date: "Poetry",
    excerpt: "A few lines for the feelings that are easier to write than to say.",
  },
  {
    title: "#MainBhiShaayar",
    category: "Poetry",
    readTime: "1 min read",
    views: "132",
    image: photos.journal,
    date: "Poetry",
    excerpt: "Because there is a poet in all of us, waiting for the right moment.",
  },
  {
    title: "Bangalore Diaries- My First Trek",
    category: "Travel",
    readTime: "6 min read",
    views: "134",
    image: photos.mountain,
    date: "Bengaluru",
    excerpt:
      "My first trek: tired legs, new views, and the joy of reaching the top together.",
  },
  {
    title: "Kalari Kabila :D",
    category: "Life",
    readTime: "4 min read",
    views: "119",
    image: photos.city,
    date: "A good day",
    excerpt: "An unexpected adventure and a day that still makes me smile.",
  },
  {
    title: "Football Fairies- Part 2",
    category: "Stories",
    readTime: "3 min read",
    views: "176",
    image: photos.flowers,
    date: "Football fairies",
    excerpt: "Back with more memories from our very own football fairies.",
  },
  {
    title: "SOMETIMES YOU WIN, SOMETIMES YOU LOSE",
    category: "Life",
    readTime: "1 min read",
    views: "127",
    image: photos.road,
    date: "Perspective",
    excerpt: "A short note on letting both outcomes teach you something.",
  },
  {
    title: "Football Fairies",
    category: "Stories",
    readTime: "4 min read",
    views: "140",
    image: photos.flowers,
    date: "The people",
    excerpt: "A team, a field, and all the stories that happen around the game.",
  },
  {
    title: "To all the farewells I have said..",
    category: "Poetry",
    readTime: "2 min read",
    views: "186",
    image: photos.journal,
    date: "Poetry",
    excerpt: "For every goodbye that made room for a new beginning.",
  },
  {
    title: "My first work anniversary : Growing an year older in BOA!!",
    category: "Life",
    readTime: "9 min read",
    views: "176",
    image: photos.city,
    date: "Work & life",
    excerpt:
      "One year of new beginnings, big lessons, and figuring things out as I went.",
  },
  {
    title: "Why do people go ??",
    category: "Poetry",
    readTime: "2 min read",
    views: "88",
    image: photos.journal,
    date: "Poetry",
    excerpt: "A question I wrote down while trying to understand what stays.",
  },
  {
    title: "Be BOLD For Change :)",
    category: "Life",
    readTime: "6 min read",
    views: "175",
    image: photos.flowers,
    date: "Perspective",
    excerpt: "A reminder to be brave enough to make a little space for change.",
  },
  {
    title: "Ankush Bhaiya :D",
    category: "Stories",
    readTime: "3 min read",
    views: "95",
    image: photos.city,
    date: "The people",
    excerpt: "A story about a person who made a lasting impression.",
  },
  {
    title: "Never Have I Ever: An honest account of my first coming of age trip :D",
    category: "Travel",
    readTime: "6 min read",
    views: "165",
    image: photos.travel,
    date: "Growing up",
    excerpt: "A first trip, a lot of firsts, and a story I still love telling.",
  },
  {
    title: "FINALLY I COME TO LIKE IT : LIFE @ BOA",
    category: "Life",
    readTime: "7 min read",
    views: "135",
    image: photos.city,
    date: "Work & life",
    excerpt: "Finding my feet, finding my people, and learning to enjoy the ride.",
  },
  {
    title: "My partner in crime ;)",
    category: "Stories",
    readTime: "7 min read",
    views: "139",
    image: photos.flowers,
    date: "The people",
    excerpt: "Some friendships make every ordinary plan feel like an adventure.",
  },
  {
    title: "A Perfect Dinner Date",
    category: "Stories",
    readTime: "3 min read",
    views: "144",
    image: photos.travel,
    date: "A little romance",
    excerpt: "The ingredients for a perfect evening are sometimes very simple.",
  },
  {
    title: "A Dream",
    category: "Poetry",
    readTime: "6 min read",
    views: "183",
    image: photos.journal,
    date: "Poetry",
    excerpt: "A dream I wanted to keep for a little longer.",
  },
  {
    title: "Love And Life",
    category: "Poetry",
    readTime: "7 min read",
    views: "102",
    image: photos.flowers,
    date: "Poetry",
    excerpt: "A small collection of thoughts on love, life, and all the in-between.",
  },
  {
    title: "Ishu DON",
    category: "Stories",
    readTime: "5 min read",
    views: "155",
    image: photos.city,
    date: "The people",
    excerpt: "A larger-than-life character and a few memories worth keeping.",
  },
  {
    title: "PADHE LIKHE GAWAAR ..",
    category: "Stories",
    readTime: "4 min read",
    views: "195",
    image: photos.journal,
    date: "A story",
    excerpt: "An affectionate story about friends and the names we give each other.",
  },
  {
    title: "Anup Bhaiya",
    category: "Stories",
    readTime: "1 min read",
    views: "115",
    image: photos.travel,
    date: "The people",
    excerpt: "A little note of gratitude for someone who made a difference.",
  },
];
