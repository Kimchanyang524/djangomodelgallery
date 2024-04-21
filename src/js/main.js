import { initializeTheme } from "./util/initializeTheme.js";

import { filterButtons } from "./constants/filterList.js";
import MainFilterManager from "./service/MainFilterManager.js";
import { fetchPosts } from "./util/fetchPost.js";
import { applySavedTheme, toggleTheme } from "./util/toggleTheme.js";
import { createPostDetailView } from "./views/postDetailView.js";
import { createPostView } from "./views/postListView.js";

async function renderPostDetail(fileName) {
  try {
    const postDetailView = await createPostDetailView(fileName);
    if (postDetailView) {
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = "";
      mainElement.appendChild(postDetailView);
    } else {
      console.error(
        `Failed to render post detail for post fileName: ${fileName}`,
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function renderMainContent() {
  const main = document.querySelector("main");
  main.classList.add("mt-6", "grid", "gap-4", "md:grid-cols-2", "xl:grid-cols-3", "max-w-6xl", "mx-auto");

  try {
    const posts = await fetchPosts();
    const postSections = posts.map((post) => {
      const postSection = createPostView(post);
      postSection.addEventListener("click", (event) => {
        if (event.target.tagName === "A" && event.target.dataset.id) {
          const postId = event.target.dataset.id;

          renderPostDetail(posts[parseInt(postId) - 1].fileName);
        }
      });
      return postSection;
    });

    main.innerHTML = "";

    postSections.forEach((section) => main.appendChild(section));
  } catch (error) {
    console.error(
      "데이터를 가져오는데 실패했습니다. 애러명을 확인해주세요.",
      error,
    );
    main.innerHTML =
      "<p>데이터를 가져오는데 실패했습니다. console에 찍힌 애러명을 확인해주세요.</p>";
  }
}

applySavedTheme();

document
  .querySelector(".theme-toggle-button")
  .addEventListener("click", toggleTheme);

initializeTheme();
renderMainContent();

document.addEventListener("DOMContentLoaded", () => {
  const mainFilterManager = new MainFilterManager(renderMainContent);

  const filterContainer = document.getElementById("filter");
  // filter 창 스타일
  // 오른쪽 상단에 위치
  filterContainer.classList.add("flex", "justify-end", "gap-2", "py-4", "px-8");

  // 검색창 버튼
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "검색어를 입력하세요";
  searchInput.classList.add("border", "border-gray-300", "rounded-md", "p-2");
  searchInput.id = "searchInput";
  filterContainer.appendChild(searchInput);

  // 검색 필터 버튼
  filterButtons.forEach((button) => {
    const btn = document.createElement("button");
    btn.classList.add("bg-gray-200", "hover:bg-gray-300", "rounded-md", "p-2");
    btn.id = button.id;
    btn.textContent = button.text;
    filterContainer.appendChild(btn);

    mainFilterManager.addFilter(button.id, button.param, button.value);
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    mainFilterManager.clearFilters();
  });

  renderMainContent();
});
