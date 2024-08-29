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

  templateStart();
  window.addEventListener("DOMContentLoaded", () => {
    templateEnd();
  });
})();
