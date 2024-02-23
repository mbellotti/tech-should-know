import React, { FC, useState } from "react";
import { ReactComponent as CopyIcon } from "./../../../assets/icons/copy.svg";
import { ArticleStore } from "./Form/store/types";

const copyMarkup = (
  markup: ArticleStore,
  setClass: React.Dispatch<React.SetStateAction<string>>
) => {
  const type = "text/plain";
  const blob = new Blob([JSON.stringify(markup)], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  // Will need to fade out class
  navigator.clipboard
    .write(data)
    .then(() => setClass("copied"))
    .catch(() => console.log("Error: failed to copy"));
};

const Copy: FC<{ className: string; store: ArticleStore }> = ({
  className,
  store,
}) => {
  const [classes, setClasses] = useState(className);
  return (
    <CopyIcon
      className={"editorIcon " + classes}
      onClick={() => {
        copyMarkup(store, setClasses);
      }}
    />
  );
};
export default Copy;
