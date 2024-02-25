import { useState } from 'react';
import { AddLink} from '../../Icons.js'
import { Tag, TagGroup, Input } from 'rsuite';

import { updateMarkup } from '../utils/form';

export const Tags = ({value, markup}) =>{
    const [tags, setTags] = useState(value.current.tags || []);
    const [typing, setTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const splitTags = (tagInput) => {
      let tagsGroup = tagInput.split(",");
      return tagsGroup.map(t => t.toLowerCase().trim())
    }
  
    const removeTag = tag => {
      const nextTags = tags.filter(item => item !== tag);
      setTags(nextTags);
      value.current.tags = nextTags
      updateMarkup(value.current, markup)
    };
  
    const addTag = () => {
      const nextTags = inputValue ? [...tags, ...splitTags(inputValue)] : tags;
      setTags(nextTags);
      setTyping(false);
      setInputValue('');
      value.current.tags = nextTags
      updateMarkup(value.current, markup)
    };
  
    const handleButtonClick = (e) => {
      e.preventDefault();
      setTyping(true);
    };
  
    const renderInput = () => {
      if (typing) {
        return (
          <Input
            className="form-control form-control-sm"
            size="xs"
            style={{ width: 70 }}
            value={inputValue}
            onChange={setInputValue}
            onBlur={addTag}
            onPressEnter={addTag}
          />
        );
      }
  
      return (
        <button
          className="btn"
          onClick={handleButtonClick}>
            <AddLink /></button>
      );
    };
    return (
      <TagGroup>
        {tags.map((item, index) => (
          <Tag key={index} closable onClose={() => removeTag(item)}>
            {item}
          </Tag>
        ))}
        {renderInput()}
      </TagGroup>
    );
  };
  