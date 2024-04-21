export function createPostView(post) {
  const postSection = document.createElement("section");
  postSection.classList.add(..."lg:max-w-sm overflow-hidden bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-poitner col-span-1 w-auto cursor-pointer rounded-2xl border border-graylv2 p-4".split(" "));
  postSection.innerHTML = `
        <h2 class="font-bold text-2xl mb-3"><a href="#" data-id="${post.id}">${post.title}</a></h2>
        <p>태그: ${post.tags.join(", ")}</p>
        <p class="inline-block">기여자: <a href="${
          post.contributor.social.github
        }" target="_blank">${post.contributor.name}</a></p>
        <p>트위터: <a href="${
          post.contributor.social.twitter
        }" target="_blank">@${post.contributor.name}</a></p>
        <p class="text-graylv3 text-sm inline-block font-normal">작성일: ${post.date}</p>
        <p class="inline-block bg-activation text-primary md:text-sm font-medium mb-3 px-3 py-1.5 rounded-lg transition duration-200 ease-in-out hover:bg-blue-400 hover:text-white">${post.category}</p>
        `;
  return postSection;
}
