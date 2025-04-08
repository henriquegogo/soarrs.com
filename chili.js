function chili(selector) {
  document.head.insertAdjacentHTML('beforeend', `<style>${selector} span * { color: inherit !important }</style>`);
  document.querySelectorAll(selector).forEach((element) => {
    Object.assign(element.style, {
      backgroundColor: "#111", color: "#bbb", fontFamily: "monospace", padding: "25px", whiteSpace: "pre-wrap"
    });
    element.innerHTML = element.innerHTML
      .replace(/(&lt;!--.+--&gt;|\/\/ .+|# .+)/g, "<span style =color:#666>$1</span>")                 // Comments
      .replace(/(\w+)([\(])|(\b[A-Z][A-Z0-9_]+\b)/g, "<span style =color:#6bf>$1$3</span>$2")          // Func/Const
      .replace(/(&lt;[\/\w]+|(?<![\=-])&gt;|[{}$\[\]\(\)])/g, "<span style =color:#b6d>$1</span>")     // Blocks/Tags
      .replace(/(&amp;|\||[!<>=]=[=]?|\?)/g, "<span style =color:#d86>$1</span>")                      // Operators
      .replace(/(".*?"|'.*?')/g, "<span style =color:#bd0>$1</span>")                                  // Strings
      .replace(/(\w+)( [\+-:]?= |: |[\[\.])|([\w-]+)(\=)/g, "<span style =color:#db6>$1$3</span>$2$4") // Var/Attr
  });
}
