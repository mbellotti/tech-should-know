import React, { FC } from "react";

const ArticleList: FC<{ articles: { uri: string; title: string }[] }> = ({
  articles,
}) => {
  const a = articles.map((article, index) => (
    <li key={`article-${index}`}>
      <a href={"items/" + article.uri}>{article.title}</a>
    </li>
  ));
  return <ul>{a}</ul>;
};
export default ArticleList;
