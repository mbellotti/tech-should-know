import React, { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { ArticleParams, ArticleStore, Tag } from "./types";

export const useArticleStore = (articleProps?: ArticleStore) => {
  const blank = {
    title: "",
    abstract: "",
    article: "",
    content: "",
    paperName: "",
    authors: [],
    permalink: "",
    submitName: "",
    submitLink: "",
    submissionBy: { name: "", link: "" },
    doi: "",
    references: [],
    notes: [],
    links: [{ link_title: "", link_url: "" }],
    tags: [] as string[],
  };
  const initialValue = articleProps || blank;
  const [article, setArticle] = useImmer<ArticleStore>(initialValue);
  const [oldPermalink, setOldPermalink] = useState<string>();

  useEffect(() => {
    if (article.permalink !== "") {
      localStorage.setItem(article.permalink, JSON.stringify(article));
    }
  }, [article]);

  useEffect(() => {
    if (oldPermalink) {
      localStorage.removeItem(oldPermalink);
      setOldPermalink(undefined);
    }
  }, [oldPermalink]);

  const upsert = useCallback((update: ArticleParams) => {
    setArticle((draft) => {
      const { authors, submitName, submitLink, links, tags, ...simpleProps } =
        update;
      const simple = Object.keys(simpleProps) as Array<
        keyof typeof simpleProps
      >;
      simple.forEach((prop) => {
        const thisProp = update[prop];
        if (thisProp != null) {
          draft[prop] = thisProp;
        }
      });
      if (authors) draft.authors = authors?.split(",").map((a) => a.trim());
      if (submitName) draft.submissionBy.name = submitName;
      if (submitLink) draft.submissionBy.link = submitLink;
      if (links) draft.links = links;
      if (tags) draft.tags = tags;
      return draft;
    });
  }, []);

  const clear = useCallback(() => {
    setArticle((draft) => {
      return blank;
    });
  }, []);

  return [article, clear, upsert] as const;
};
