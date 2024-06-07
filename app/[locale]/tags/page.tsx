"use client";

import { postsEn, postsEs } from "#site/content";
import { Tag } from "@/components/tag";
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TagPage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const pathLocale = pathname.split("/")[1];
    setLocale(pathLocale);
  }, [pathname]);

  const posts = locale === "es" ? postsEs : postsEn;

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Tags</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-3">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </div>
  );
}
