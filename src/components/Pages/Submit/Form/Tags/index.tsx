import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Tag, TagGroup, Input } from "rsuite";
import { ArticleParams } from "../store/types";
import { AddLink } from "../../../../Icons";

const removeTag = (
  tag: string,
  tags: string[],
  upsert: (update: ArticleParams) => void
) => {
  const nextTags = tags.filter((item) => item !== tag);
  upsert({ tags: nextTags });
};

const Tags: FC<{
  tags: string[];
  upsert: (update: ArticleParams) => void;
}> = ({ tags, upsert }) => {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = useCallback(
    (tag: string) => {
      if (tag == "") {
        setEditing(false);
        return;
      }
      upsert({ tags: [...tags, tag] });
    },
    [tags, setEditing]
  );

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditing(false);
  }, [tags]);

  return (
    <TagGroup>
      {tags.map((item, index) => (
        <Tag key={index} closable onClose={() => removeTag(item, tags, upsert)}>
          {item}
        </Tag>
      ))}
      {!isEditing && (
        <a className="btn" onClick={() => setEditing(true)}>
          <AddLink />
        </a>
      )}
      {isEditing && (
        <Input
          ref={inputRef}
          className="form-control form-control-sm"
          size="xs"
          style={{ width: 70 }}
          defaultValue={""}
          onBlur={(e) => update(e.target.value)}
        />
      )}
    </TagGroup>
  );
};

export default Tags;
