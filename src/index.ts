import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/highlight"

// Define the LaTeX language
export const latexLanguage = LRLanguage.define({
  name: "latex",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

// Define a highlight style for LaTeX commands
const latexHighlightStyle = HighlightStyle.define([
  {tag: t.keyword, color: "blue"} // LaTeX commands appear blue
]);

// Export the LaTeX language support
export function latex() {
  return new LanguageSupport(latexLanguage, [
    latexHighlightStyle
  ]);
}
