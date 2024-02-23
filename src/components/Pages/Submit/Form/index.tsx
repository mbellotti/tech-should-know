import React, { FC, useState } from "react";
import { ArticleParams, ArticleStore } from "./store/types";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactHookInput from "./ReactHookInput";
import Links from "./Links";
import Tags from "./Tags";
import ToolbarNormal from "./Toolbar.tsx";
import { useTipTap } from "./hooks/useTipTap";
import { EditorContent } from "@tiptap/react";

const validDOI = function (doi: string) {
  const r = /10.\d{4,9}\/[-._;()/:A-Z0-9]+/gi;
  return doi.match(r) != null;
};

async function validateReference(
  value: string,
  upsert: (update: ArticleParams) => void
) {
  if (!validDOI(value)) {
    return;
  }

  let references = [];
  const url = "https://api.crossref.org/works/" + value;
  const response = await fetch(url);
  try {
    const data = await response.json(); //If not available returns "Resource not found."
    references = data["message"]["reference"]
      .filter((r) => validDOI(r["doi"])) // No DOI, throw out
      .map((r) => {
        let title = r["article-title"] || r["volume-title"];
        return { cite: title, doi: r["key"] };
      });
  } catch (error) {
    console.log(error);
    return;
  } finally {
    upsert({ doi: value });
  }
}

const Form: FC<{
  store: ArticleStore;
  upsert: (update: ArticleParams) => void;
}> = ({ store, upsert }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ArticleParams>();

  const abstractEditor = useTipTap(store.abstract);
  const articleEditor = useTipTap(store.article, true);

  return (
    <form id="generator">
      <h4>Article Metadata</h4>
      <div className="input-group my-2">
        <ReactHookInput
          register={register}
          name={"title"}
          placeholder="Name of paper"
          onBlur={upsert}
        />
      </div>
      <div className="input-group my-2">
        <ReactHookInput
          register={register}
          name={"authors"}
          placeholder="Author(s) comma separated"
          onBlur={upsert}
        />
      </div>
      <div className="input-group my-2">
        <ReactHookInput
          register={register}
          name={"submitName"}
          placeholder="Your Name"
          onBlur={upsert}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">https://</span>
        </div>
        <ReactHookInput
          register={register}
          name={"submitLink"}
          placeholder="Link back to you"
          className="form-control"
          onBlur={upsert}
        />
      </div>
      <h4>Tags</h4>
      <div className="input-group my-2 tag-area">
        <Tags tags={store.tags} upsert={upsert} />
      </div>
      <br />
      <h4>Abstract</h4>
      <ToolbarNormal
        editor={abstractEditor}
        upsert={upsert}
        name={"abstract"}
        content={store.abstract}
      />
      <EditorContent editor={abstractEditor} />
      <br />
      <h4>Article Text</h4>

      <ToolbarNormal
        editor={articleEditor}
        upsert={upsert}
        name={"article"}
        content={store.article}
        notes={store.notes}
        showNote={true}
      />
      <EditorContent editor={articleEditor} />
      <br />
      <Links register={register} upsert={upsert} control={control} />
    </form>
  );
};

export default Form;
