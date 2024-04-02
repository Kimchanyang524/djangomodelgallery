import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { modelFunctions } from "../../postsModelList/index.js";

/**
 * Markdown 문자열에서 프론트매터를 추출하고, HTML로 파싱된 본문과 함께 반환합니다.
 * 프론트매터는 YAML 형식으로 마크다운 최상단에 위치해 있으며, '---'로 구분됩니다.
 *
 * @param {string} markdownContent 마크다운 형식의 문자열.
 * @return {object} HTML 문자열, mermaid 코드 블록 배열, ERD 코드 블록 배열, Django 코드 블록 배열, 프론트매터 데이터를 포함한 객체.
 */
export function parseMarkdown(markdownContent) {
  const frontMatterRegex = /^---\s*\n([\s\S]+?)\n---/;
  let frontMatter = {};
  let contentWithoutFrontMatter = markdownContent;

  const frontMatterMatch = markdownContent.match(frontMatterRegex);
  if (frontMatterMatch) {
    const frontMatterString = frontMatterMatch[1];
    contentWithoutFrontMatter = markdownContent
      .replace(frontMatterMatch[0], "")
      .trim();

    frontMatterString.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());
      frontMatter[key] = value;
    });
  }

  const modelFunctionRegex = /\$(\w+)\((.*?)\)/g;
  contentWithoutFrontMatter = contentWithoutFrontMatter.replace(
    modelFunctionRegex,
    (match, functionName, optionsString) => {
      if (modelFunctions.hasOwnProperty(functionName)) {
        let options = {};
        if (optionsString.trim() !== "") {
          options = JSON.parse(
            optionsString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'),
          );
        }
        return modelFunctions[functionName](options);
      }
      return match;
    },
  );

  const codeBlocks = {
    mermaid: [],
    viz: [],
    django: [],
  };

  marked.use({
    renderer: {
      code(code, infostring) {
        if (infostring === "mermaid") {
          codeBlocks.mermaid.push(code);
          return '<div class="mermaid-placeholder"></div>';
        }
        if (infostring === "viz") {
          codeBlocks.viz.push(code);
          return '<div class="viz-placeholder"></div>';
        }
        if (infostring.startsWith("python")) {
          const lines = code.split("\n");
          const firstLine = lines[0].trim();
          if (firstLine.startsWith("#")) {
            const djangoCodeName = firstLine.replace(/^#\s*/, "");
            const djangoCode = lines.slice(1).join("\n");

            if (djangoCode.includes("$")) {
              const [filePath, functionString] = djangoCodeName.split("$");
              const functionName = functionString.split("(")[0];
              if (modelFunctions.hasOwnProperty(functionName)) {
                const optionsString =
                  functionString.match(/\((.*?)\)/)?.[1] || "{}";
                const options = JSON.parse(
                  optionsString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'),
                );
                const functionResult = modelFunctions[functionName](options);
                const codeWithFunctionResult = [
                  `# ${filePath}`,
                  functionResult,
                  ...lines.slice(1),
                ].join("\n");
                return `<pre><code class="${infostring}">${codeWithFunctionResult}</code></pre>`;
              }
            }

            codeBlocks.django.push({
              name: djangoCodeName,
              code: djangoCode,
            });
          }
        }

        return `<pre><code class="${infostring}">${code}</code></pre>`;
      },
    },
  });

  const htmlContent = marked.parse(contentWithoutFrontMatter);
  return {
    htmlContent,
    mermaidCodeBlocks: codeBlocks.mermaid,
    vizCodeBlocks: codeBlocks.viz,
    djangoCodeBlocks: codeBlocks.django,
    frontMatter,
  };
}
