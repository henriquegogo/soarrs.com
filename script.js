(function() {
  function templateStart() {
    document.write(`
    <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "c7173534a70d465a9e59e528c0123cb3"}'></script><!-- End Cloudflare Web Analytics -->
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
    window.addEventListener("hashchange", (event) => {
      const hash = location.hash.slice(1);
      document.title = hash ? `${title} / ${hash}` : title;
    });
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }

  function highlight(selector) {
    document.body.innerHTML += `
      <style>${selector} span * { color: inherit !important }</style>
    `;
    document.querySelectorAll(selector).forEach((element) => {
      element.style.backgroundColor = "#333";
      element.style.color = "#FFF";
      element.style.fontFamily = "monospace";
      element.style.padding = "25px";
      element.style.whiteSpace = "pre-wrap";
      element.innerHTML = element.innerHTML.startsWith("&lt;")
        ? element.innerHTML
        .replace( // Comments
          /(&lt;!--.+--&gt;)/gs,
          "<span style =color:#808080>$1</span>"
        ).replace( // Attributes
          /(\w+)=/g,
          "<span style =color:#87afd7>$1</span>="
        ).replace( // Strings
          /([^>])(")(.*?)(")|([^>])(')(.*?)(')/g,
          "$1<span style =color:#afd700>$2$3$4</span>"
        ).replace( // Tag open
          /&lt;(\w*)/g,
          "<span style =color:#87afd7>&lt;</span><span style =color:#8787af>$1</span>"
        ).replace( // Tag close
          /(\w*)&gt;/g,
          "<span style =color:#8787af>$1</span><span style =color:#87afd7>&gt;</span>"
        )
        : element.innerHTML
        .replace( // Comments
          /(\/\/ .+|# .+)/g,
          "<span style =color:#808080>$1</span>"
        ).replace( // Comments
          /(\/\*.+\*\/)/gs,
          "<span style =color:#808080>$1</span>"
        ).replace( // Declarations
          /([^\w]|^)(struct|var|let|const|new|def|fn|class|function|int|enum|void|float|char|str|string|public|pub|private|interface|impl|from|import|with)([^\w])/g,
          "$1<span style =color:#87afd7>$2</span>$3"
        ).replace( // Statements
          /([^\w]|^| )(=>|===|==|!=|<=|>=|\+=|-=|\+|-|\/|\*|=|return|if|else|elsif|then|switch|case|default|while|for|foreach|in|of|or|and|not|try|except|finally|throw|catch)([^\w])/g,
          "$1<span style =color:#8787af>$2</span>$3"
        ).replace( // Consts and keywords
          /([^\w]|^)(true|false|True|False|None|Null|NULL|this|self|document|window|console|Math|[A-Z_]{3,})([^\w])/g,
          "$1<span style =color:#ff8700>$2</span>$3"
        ).replace( // Functions
          /(\w+)\(/g,
          "<span style =color:#ffffaf>$1</span>("
        ).replace( // JSON Strings
          /: ("|')(.*?)("|')/g,
          ": <span style =color:#87afd7>$1$2$3</span>"
        ).replace( // Strings
          /([^>])(")(.*?)(")|([^>])(')(.*?)(')/g,
          "$1<span style =color:#afd700>$2$3$4</span>"
        );
    });
  }

  templateStart();
  window.addEventListener("DOMContentLoaded", () => {
    templateEnd();
    highlight("pre");
  });
})();
