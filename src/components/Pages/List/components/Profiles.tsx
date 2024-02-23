import React, { FC } from "react";

const Profiles: FC = () => {
  const profiles = ["rasmussen", "halpern", "clark", "dekker"];
  const p = profiles.map((pro) => (
    <a href={"../researcher/" + pro} key={`profile-${pro}`}>
      <img src={"../img/" + pro + ".jpg"} alt={pro} />
    </a>
  ));
  return <div className="profile-photo">{p}</div>;
};

export default Profiles;
