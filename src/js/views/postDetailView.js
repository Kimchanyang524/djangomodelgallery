import { getContributorProfile } from "../components/ContributorProfile.js";
import CodeMirrorEditor from "../service/CodeMirrorEditor.js";
import DjangoCodeBlocksEditor from "../service/DjangoCodeBlocksEditor.js";
import VizRenderer from "../service/VizRenderer.js";
import { fetchPostDetail } from "../util/fetchPostDetail.js";
import { parseMarkdown } from "../util/markdownParser.js";
import { throttle } from "../util/throttle.js";

export async function createPostDetailView(fileName) {
  try {
    const { markdownContent, postDetail } = await fetchPostDetail(fileName);
    const { htmlContent, mermaidCodeBlocks, vizCodeBlocks, djangoCodeBlocks } =
      parseMarkdown(markdownContent);
    console.log(
      "🚀 ~ createPostDetailView ~ djangoCodeBlocks:",
      djangoCodeBlocks,
    );
    const postDetailSection = createPostDetailElement(
      htmlContent,
      postDetail,
      mermaidCodeBlocks.join("\n"),
      vizCodeBlocks,
      djangoCodeBlocks,
    );
    postDetailSection.mermaidCodeBlocks = mermaidCodeBlocks;

    return postDetailSection;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function createPostDetailElement(
  htmlContent,
  postDetail,
  mermaidCodeBlocks,
  vizCodeBlocks,
  djangoCodeBlocks,
) {
  // 메인 컨테이너의 클래스를 초기화
  const main = document.querySelector("main");
  main.className = "";
  const postDetailSection = document.createElement("section");
  const contributorProfile = getContributorProfile(postDetail);
  console.log("🚀 ~ djangoCodeBlocks:", djangoCodeBlocks);
  postDetailSection.innerHTML =
    contributorProfile +
    `
    <section class="grid gap-4 grid-cols-1 md:grid-cols-2">
      <article class="prose 2xl:prose-xl w-full h-full overflow-y-auto px-10 pt-5">${htmlContent}</article>
      <div class="flex flex-col relative">
        <div class="django-container w-full"></div>
        <div class="viz-image-holder"></div>
      </div>
    </section>
   
   
    <section class="mermaid">
    <div class="mb-20 mr-10 ml-10">
      <Textarea class="language-viz"></Textarea>
      ${mermaidCodeBlocks} 
      <button class="mt-5 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" id="resetZoom">Reset Zoom</button>
      <button class="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" id="downloadSVG" data-format="svg">Download SVG</button>
    </div>
    </section>
  `;

  const vizRenderer = new VizRenderer();

  const svgString = await vizRenderer.renderSVG(vizCodeBlocks[0], {
    scale: 2,
  });

  const ERDBlock = postDetailSection.querySelector(".viz-image-holder");
  ERDBlock.innerHTML = svgString;

  const models = new DjangoCodeBlocksEditor(
    ".django-container",
    djangoCodeBlocks,
    true,
  );
  models.initialize();

  const editor = new CodeMirrorEditor(".language-viz", vizCodeBlocks[0]);

  editor.initialize().then(() => {
    editor.editor.on(
      "change",
      throttle(async () => {
        const currentValue = editor.getValue();

        // Viz DOT 구문 유효성 검사 로직을 여기에 추가
        try {
          // TODO: png 다운로드 기능 추가
          const svgString = await vizRenderer.renderSVG(currentValue, {
            scale: 2,
          });
          document.querySelector(".viz-image-holder").innerHTML = svgString;
        } catch (error) {
          console.error("Viz rendering error:", error);
        }
      }, 1000),
    );
  });

  return postDetailSection;
}
