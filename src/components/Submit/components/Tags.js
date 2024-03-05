import { useState, useCallback, useRef, useEffect } from 'react';
import { AddLink} from '../../Icons.js'
import { Tag, TagGroup, Input } from 'rsuite';

import { updateMarkup, useForceUpdate } from '../utils/form';

const splitTags = (tagInput) => {
  let tagsGroup = tagInput.split(",");
  return tagsGroup.map(t => t.toLowerCase().trim())
}

export const Tags = ({value, markup}) =>{
    let tags = value.current.tags || []
    const [isEditing, setEditing] = useState(false);
    const inputRef = useRef([])
    const forceUpdate = useForceUpdate();
    
    const removeTag = (tag, tags) => {
      tags = tags.filter(item => item !== tag);
      value.current.tags = tags
      updateMarkup(value.current, markup.current)
      forceUpdate();
    };

    const addTag = useCallback( tag => {
      if (tag == "") {
        setEditing(false);
        return;
      }
      tags = [...tags, ...splitTags(tag)];
      value.current.tags = tags
      updateMarkup(value.current, markup.current)
      setEditing(false);
    },[tags, setEditing]);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    return(
    <TagGroup>
      {tags.map((item, index) => (
        <Tag key={index} closable onClose={() => removeTag(item, tags)}>
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
          onBlur={(e) => addTag(e.target.value)}
        />
      )}
    </TagGroup>
    );
  };
  