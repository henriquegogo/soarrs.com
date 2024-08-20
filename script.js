(function() {
  function templateStart() {
    document.write(`
    <header>
      <a href="/" title="Home">
        <img src="assets/logo.png" alt="SOARRS" />
        <span>SOARRS</span>
      </a>
      <nav>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
    `);
  }

  function templateEnd() {
    document.body.innerHTML += `
    </main>
    `;
    const title = document.title;
    window.addEventListener("hashchange", () => {
      const hash = location.hash.slice(1);
      document.title = hash ? `${title} / ${hash}` : title;
    });
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }

  function highlight(selector) {
    document.body.innerHTML += `<style>${selector} span * { color: inherit !important }</style>`;
    document.querySelectorAll(selector).forEach((element) => {
      Object.assign(element.style, {
        backgroundColor: "#333", color: "#FFF", fontFamily: "monospace", padding: "25px", whiteSpace: "pre-wrap"
      });
      element.innerHTML = element.innerHTML
        .replace(/(&lt;!--.+--&gt;|\/\/ .+|# .+)/g, "<span style =color:#808080>$1</span>")   // Comments
        .replace(/(\w+)([\(])/g, "<span style =color:#ffffaf>$1</span>$2")                    // Functions
        .replace(/(\w+)( [\+-:]?= |: |[\[\.])/g, "<span style =color:#87afd7>$1</span>$2")    // Variables
        .replace(/(&lt;[\/\w]+|(?<![\=-])&gt;|[{}$\[\]\(\)])/g, "<span style =color:#8787af>$1</span>") // Blocks
        .replace(/(&amp;|\||[!<>=]=[=]?|\?)/g, "<span style =color:#ff8700>$1</span>")        // Operators
        .replace(/([\w-]+)=/g, "<span style =color:#87afd7>$1</span>=")                       // Attributes
        .replace(/(".*?")|('.*?')/g, "<span style =color:#afd700>$1</span>")                  // Strings
    });
  }

  templateStart();
  window.addEventListener("DOMContentLoaded", () => {
    templateEnd();
    highlight(".highlight");
  });
})();
