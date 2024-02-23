import React, { FC } from "react";

const ExtraTags: FC<{ tags: string[] }> = ({ tags }) => {
  const t = tags.map((tag) => (
    <span className="badge rounded-pill bg-secondary m-2" key={tag}>
      <a href={"../tag/" + tag}>{tag}</a>
    </span>
  ));
  return <div className="tagGroup">{t}</div>;
};

export default ExtraTags;
