import React, { FC, useEffect, useState } from "react";
import {
  useWatch,
  Controller,
  useFieldArray,
  Path,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import { Row, Col } from "react-bootstrap";
import { AddLink, Trash } from "../../../../Icons";

interface ReactHookProps<T extends FieldValues> {
  control: any;
  register: UseFormRegister<T>;
  upsert: (update: any) => void;
}

const Links = <T extends FieldValues>({
  control,
  register,
  upsert,
}: ReactHookProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const changes = useWatch({ name: "links", control }) as
    | {
        link_title: string;
        link_url: string;
      }[]
    | undefined;
  useEffect(() => {
    if (!changes) {
      return;
    }
    const links = changes.filter(
      (l) => l.link_title !== null || l.link_url !== null
    );
    if (links) {
      upsert({ links: links });
    }
  }, [changes]);

  return (
    <div>
      <Row className={"justify-content-start"}>
        <Col md={3} sm={4}>
          <h4>Related Links</h4>
        </Col>
        <Col sm={1}>
          <a onClick={() => append({ link_title: "", link_url: "" })}>
            <AddLink iconClass={"addLink"} />
          </a>
        </Col>
      </Row>
      {fields.map((input, index) => {
        return (
          <div className="input-group my-2" key={`links-${index}`}>
            <Controller
              render={({ field }) => (
                <input
                  className="form-control form-control-lg links"
                  placeholder="Title"
                  {...field}
                />
              )}
              name={`links.${index}.link_title`}
              control={control}
            />
            <Controller
              render={({ field }) => (
                <input
                  className="form-control form-control-lg links"
                  placeholder="URL"
                  {...field}
                />
              )}
              name={`links.${index}.link_url`}
              control={control}
            />

            <div className="input-group-append">
              <button
                className="btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                <Trash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Links;
