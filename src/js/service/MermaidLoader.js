// MermaidLoader.js
export default class MermaidLoader {
  constructor(selector, mermaidCode) {
    this.selector = selector;
    this.mermaidCode = mermaidCode;
  }

  async loadAndRenderMermaid() {
    if (!window.mermaid) {
      try {
        const mermaidModule = await import(
          "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"
        );
        window.mermaid = mermaidModule.default;
        window.mermaid.initialize({ startOnLoad: false });

        this.renderMermaid();
      } catch (error) {
        console.error("Failed to load Mermaid:", error);
      }
    } else {
      this.renderMermaid();
    }
  }

  renderMermaid() {
    const element = document.querySelector(this.selector);
    if (element) {
      element.innerHTML = `<pre class="mermaid">${this.mermaidCode}</pre>`;
      window.mermaid.init(undefined, element.querySelector(".mermaid"));
    }
  }
}
