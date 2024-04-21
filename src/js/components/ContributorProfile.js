export function getContributorProfile({
  id,
  title,
  date,
  category,
  modelCount,
  tags,
  contributor,
}) {
  const { name, social } = contributor;
  const { github, twitter } = social;
  const tagsHtml = tags
    ? `<ul class="list-none flex flex-wrap gap-2">${tags
        .map(
          (tag) =>
            `<li class="bg-emerald-900 dark:bg-emerald-700 rounded-xl px-2 py-1 text-white text-sm">${tag}</li>`,
        )
        .join("")}</ul>`
    : "<p>없음</p>";

  // TODO: mb-6 나중에 제거 필요
  return `
    <article class="shadow-lg py-6 px-4 sm:px-6 lg:px-8 dark:bg-emerald-800 mb-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div class="mb-4 sm:mb-0">
            <h2 class="text-2xl sm:text-2xl lg:text-2xl font-semibold leading-tight text-gray-800 dark:text-white">${title}</h2>
            <p class="text-gray-600 dark:text-gray-400 font-semibold underline pt-3">${category}</p>
            <time datetime="${date}" class="block text-sm text-gray-500 dark:text-gray-400">
              ${date}
            </time>
            <div class="mt-4">
              ${tagsHtml}
            </div>
          </div>
          <div class="flex items-center justify-end">
            <div class="flex items-center">
              <h3 class="text-xl font-semibold pr-4 text-gray-800 dark:text-white">
                <span class="text-2xl sm:text-2xl lg:text-2xl">${name}</span>
              </h3>
              <div class="flex flex-row gap-x-4 inline-block">
                <a href="${
                  github ?? "#"
                }" class="text-blue-500 hover:text-blue-700 bg-white dark:bg-gray-800 p-0.5 rounded-lg" target="_blank" rel="noopener noreferrer">
                  <img src="./src/img/profile/github-logo.svg" class="w-6 h-6 sm:w-6 sm:h-6 rounded-full" alt="github-logo" />
                </a>
                <a href="${
                  twitter ?? "#"
                }" class="text-blue-500 hover:text-blue-700 bg-black dark:bg-gray-800 p-0.5 rounded-lg" target="_blank" rel="noopener noreferrer">
                  <img src="./src/img/profile/x-logo.svg" class="w-6 h-6 sm:w-6 sm:h-6 rounded-full" alt="x-logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}
