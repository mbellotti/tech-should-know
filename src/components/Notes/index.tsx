import React, { FC, PropsWithChildren, useEffect, useState } from "react";

const alignNotes = (
  location: string,
  setPosition: React.Dispatch<React.SetStateAction<number>>
) => {
  let inline = document.querySelector(location);
  if (inline) {
    let pos = inline.getBoundingClientRect();
    setPosition(pos.top + window.scrollY);
  }
};
const Notes: FC<{ location: string } & PropsWithChildren> = ({
  children,
  location,
}) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    alignNotes(location, setPosition);
    window.addEventListener("resize", () => {
      alignNotes(location, setPosition);
    });
    return () => {
      window.removeEventListener("resize", () => {
        alignNotes(location, setPosition);
      });
    };
  }, [location]);

  return (
    <div className="Notes-outer-wrapper">
      <div
        className="Notes-inner-wrapper"
        style={{
          position: "relative",
          top: position,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Notes;
