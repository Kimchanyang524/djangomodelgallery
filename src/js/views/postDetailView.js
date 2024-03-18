import CodeMirrorEditor from "../service/CodeMirrorEditor.js";
import { parseMarkdown } from "../util/markdownParser.js";
export async function createPostDetailView(fileName) {
  try {
    const response = await fetch(
      `${window.location.origin}/src/posts/${fileName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post detail");
    }
    const markdownContent = await response.text();

    const { htmlContent, mermaidCodeBlocks } = parseMarkdown(markdownContent);

    const postDetailSection = createPostDetailElement(
      htmlContent,
      mermaidCodeBlocks.join("\n") // 여러 개의 mermaid 코드 블록을 하나의 문자열로 결합
    );

    postDetailSection.mermaidCodeBlocks = mermaidCodeBlocks;
    return postDetailSection;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function createPostDetailElement(htmlContent, mermaidCodeBlocks) {
  const postDetailSection = document.createElement("section");
  postDetailSection.innerHTML = `
        <article class="prose">${htmlContent}</article>
        <div class="mermaid-code-editor-container"></div> 
        <Textarea class="language-mermaid"></Textarea>
    `;

  const editor = new CodeMirrorEditor(".language-mermaid", mermaidCodeBlocks);
  editor.initialize();

  return postDetailSection;
}
