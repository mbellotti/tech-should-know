import { Reference, Work } from "../../Submit/Form/store/types";
import React, { FC } from "react";

const Extras: FC<{ references: Reference[]; works: Work[] }> = ({
  references,
  works,
}) => {
  const r = references.map((ref) => (
    <li key={ref.doi}>
      <a href={"https://www.doi.org/" + ref.doi}>{ref.cite}</a>
    </li>
  ));
  const w = works.map((link) => (
    <li key={link.link_title}>
      <a href={link.link_url}>{link.link_title}</a>
    </li>
  ));

  return (
    <div className="accordion accordion-flush" id="extra">
      <div className="accordion-item">
        <h2 className="accordion-header" id="extra-read-more-heading">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#extra-read-more"
            aria-expanded="true"
            aria-controls="extra-read-more"
          >
            Read More
          </button>
        </h2>
        <div
          id="extra-read-more"
          className="accordion-collapse show"
          aria-labelledby="extra-read-more-heading"
          data-bs-parent="#extra"
        >
          <div className="accordion-body">
            <ul>{w}</ul>
          </div>
        </div>
      </div>
      {references.length > 0 && (
        <div className="accordion-item">
          <h2 className="accordion-header" id="extra-reference-heading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#extra-reference"
              aria-expanded="false"
              aria-controls="extra-reference"
            >
              References
            </button>
          </h2>
          <div
            id="extra-reference"
            className="accordion-collapse collapse"
            aria-labelledby="extra-reference-heading"
            data-bs-parent="#extra"
          >
            <div className="accordion-body">
              <ul>{r}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Extras;
