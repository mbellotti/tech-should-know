import React, { FC, useState } from "react";
import { ArticleStore } from "./Form/store/types";

const DisplayArticleMarkup: FC<{ store: ArticleStore }> = ({ store }) => {
  return (
    <div id="display" className="markupBody">
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};

export default DisplayArticleMarkup;
