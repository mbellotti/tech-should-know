import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AddLink,Trash } from '../../Icons';

import { updateMarkup } from '../utils/form';

export const Links = ({value, markup}) => {
    
    const [inputFields, setInputFields] = useState(value.current.links 
        || [{link_title: '', link_url: ''}])

    const handleFormChange = (event) => {
        let data = [...inputFields];
        let index = parseInt(event.target.getAttribute("data-key"))
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        value.links = data
        updateMarkup(value.current, markup.current)
     }

    const addLink = (e) => {
        e.preventDefault();
        let newfield = { link_title: '', link_url: '' }
        let data = [...inputFields, newfield]
        value.links = data
        updateMarkup(value.current, markup.current)
        setInputFields(data)
    }

    const removeLink = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        value.links = data
        updateMarkup(value.current, markup.current)
        setInputFields(data)
    }

    return (
        <div>
            <Row className={"justify-content-start"}>
            <Col md={3} sm={4}>
          <h4>Related Links</h4>
          </Col><Col sm={1}>
          <button onClick={addLink} className="btn">
            <AddLink iconClass={"addLink"} onClick={addLink}/>
            </button>
          </Col>
          </Row>
            {inputFields.map((input, index) => {
              return (
                <div class="input-group my-2">
                  <input
                    class="form-control form-control-lg links"
                    type="text"
                    name='link_title'
                    placeholder='Title'
                    data-key={index}
                    defaultValue={input.link_title}
                    onBlur={handleFormChange}
                  />
                  <input
                    class="form-control form-control-lg links"
                    type="text"
                    name='link_url'
                    placeholder='URL'
                    data-key={index}
                    defaultValue={input.link_url}
                    onBlur={handleFormChange}
                  />
                  <div class="input-group-append">
                        <button class="btn" type="button" onClick={(e) => {e.preventDefault(); removeLink(index)}}><Trash/></button>
                  </div>
                </div>
              )
            })}
        </div>
      );
}
