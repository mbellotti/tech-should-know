import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Editor, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plugin } from "prosemirror-state";
import { PluginKey } from "@tiptap/pm/state";

const InlineNote = Highlight.extend({
  priority: 1000,
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: "",
        // Take the attribute values
        renderHTML: (attributes: HTMLElement) => {
          console.log(attributes);
          // … and return an object with HTML attributes.
          if (attributes.id != "") {
            return {
              id: attributes.id,
            };
          }
          return {
            id: `inline-${1}`,
          };
        },
        parseHTML: (element: HTMLElement) => element.getAttribute("id"),
      },
      class: {
        default: "inlineNote",
      },
    };
  },
});

export const NoteEdit = Extension.create({
  name: "NoteEdit",
  addStorage() {
    return {
      id: null,
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: new PluginKey("NoteEdit"),
        props: {
          handleDoubleClick(view, pos, event) {
            const id = event.target.id;
            if (id && id.slice(0, 7) == "inline-") {
              const idx = id.slice(7, id.length);
              const event = new CustomEvent("showNote", { detail: idx });

              document.dispatchEvent(event);
            }
          },
        },
      }),
    ];
  },
});

const additionalExtensions = [NoteEdit, InlineNote];

export const useTipTap = (content: string, additional?: boolean) => {
  let extensions = [
    Underline,
    TextStyle.configure(),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  if (additional) {
    extensions = extensions.concat(additionalExtensions);
  }

  return new Editor({
    content: content,
    extensions: extensions,
  });
};
