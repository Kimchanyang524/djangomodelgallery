import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export async function createPostDetailView(fileName) {
  try {
    const response = await fetch(
      `${window.location.origin}/src/posts/${fileName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post detail");
    }
    const markdownContent = await response.text();

    // marked 라이브러리 동적 로드
    // await loadMarkedLibrary();

    const htmlContent = marked.parse(markdownContent);

    const postDetailSection = document.createElement("section");
    postDetailSection.innerHTML = `
            <div class="prose">${htmlContent}</div>
        `;
    return postDetailSection;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
