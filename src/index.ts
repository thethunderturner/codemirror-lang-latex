import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/highlight"

export const LatexLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        CommandName: t.keyword, // Highlighting \commands as keywords
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

// Define a highlight style where 'keyword' (our CommandName) is colored blue
const latexHighlightStyle = HighlightStyle.define([
  {tag: t.keyword, color: "blue"}
]);

export function latex() {
  return new LanguageSupport(LatexLanguage, [
    latexHighlightStyle
  ]);
}
