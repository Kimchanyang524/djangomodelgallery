// utils/markdownParser.js

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

/**
 * Markdown 문자열을 파싱하여 HTML과 mermaid 코드 블록을 반환합니다.
 * @param {string} markdownContent 마크다운 형식의 문자열
 * @return {object} HTML 문자열과 mermaid 코드 블록 배열을 포함한 객체
 */
export function parseMarkdown(markdownContent) {
  const mermaidCodeBlocks = [];

  marked.use({
    renderer: {
      code(code, infostring) {
        if (infostring === "mermaid") {
          mermaidCodeBlocks.push(code);
          return '<div class="mermaid-placeholder"></div>';
        }
        return `<pre><code class="${infostring}">${code}</code></pre>`;
      },
    },
  });

  const htmlContent = marked.parse(markdownContent);

  return {
    htmlContent,
    mermaidCodeBlocks,
  };
}
