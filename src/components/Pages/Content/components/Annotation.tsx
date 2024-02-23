import { Interweave } from "interweave";
import React, { FC } from "react";
import { Card } from "react-bootstrap";
import Notes from "../../../Notes";

const Annotation: FC<{ text: string; idx: number }> = ({ idx, text }) => {
  return (
    <Notes location={"#inline-" + idx}>
      <Card
        id={"note-" + idx}
        key={"note-" + idx}
        text="light"
        className="mb-2 card-bg"
      >
        <Card.Body>
          <Card.Text>
            <Interweave content={text} />
          </Card.Text>
        </Card.Body>
      </Card>
    </Notes>
  );
};

export default Annotation;
