/* ======================
   FOLDER HOVER
====================== */

const folders = document.querySelectorAll(".folder-card img");

folders.forEach(folder => {
  folder.addEventListener("mouseenter", () => {
    folder.src = "assets/folder-open.png";
  });

  folder.addEventListener("mouseleave", () => {
    folder.src = "assets/folder-closed.png";
  });
});


/* ======================
   TERMINAL BUTTON
====================== */

const terminalBtn = document.getElementById("terminalBtn");
const terminalModal = document.getElementById("terminalModal");
const terminalWindow = document.getElementById("terminalWindow");

const closeTerminal = document.getElementById("closeTerminal");
const minimizeTerminal = document.getElementById("minimizeTerminal");
const expandTerminal = document.getElementById("expandTerminal");

function resetTerminalWindow() {
  terminalWindow.classList.remove("fullscreen");
  terminalWindow.style.transform = "";
  terminalWindow.style.opacity = "";
}

/* OPEN */

terminalBtn.addEventListener("click", () => {
  terminalModal.classList.add("active");
  resetTerminalWindow();
});

/* RED BUTTON - CLOSE */

closeTerminal.addEventListener("click", () => {
  terminalModal.classList.remove("active");
  resetTerminalWindow();
});

/* YELLOW BUTTON - MINIMIZE (JUST CLOSE) */

minimizeTerminal.addEventListener("click", () => {
  terminalModal.classList.remove("active");
  resetTerminalWindow();
});

/* GREEN BUTTON - FULLSCREEN */

expandTerminal.addEventListener("click", () => {
  terminalWindow.classList.toggle("fullscreen");
});

/* CLICK OUTSIDE TO CLOSE */

terminalModal.addEventListener("click", e => {
  if (e.target === terminalModal) {
    terminalModal.classList.remove("active");
    resetTerminalWindow();
  }
});


/* ======================
   MAIL MODAL
====================== */

const mailBtn = document.getElementById("mailBtn");
const mailModal = document.getElementById("mailModal");
const mailWindow = document.getElementById("mailWindow");

const closeMail = document.getElementById("closeMail");
const minimizeMail = document.getElementById("minimizeMail");
const expandMail = document.getElementById("expandMail");


function resetMailWindow() {
  mailWindow.classList.remove("fullscreen");
  mailWindow.style.transform = "";
  mailWindow.style.opacity = "";
}


/* OPEN */

mailBtn.addEventListener("click", () => {
  mailModal.classList.add("active");
  resetMailWindow();
});


/* RED BUTTON - CLOSE */

closeMail.addEventListener("click", () => {
  mailModal.classList.remove("active");
  resetMailWindow();
});


/* YELLOW BUTTON - MINIMIZE (JUST CLOSE) */

minimizeMail.addEventListener("click", () => {
  mailModal.classList.remove("active");
  resetMailWindow();
});


/* GREEN BUTTON - FULLSCREEN */

expandMail.addEventListener("click", () => {
  mailWindow.classList.toggle("fullscreen");
});


/* CLICK OUTSIDE TO CLOSE */

mailModal.addEventListener("click", e => {
  if (e.target === mailModal) {
    mailModal.classList.remove("active");
    resetMailWindow();
  }
});


/* ======================
   TEXT SCRAMBLE EFFECT
   preserves <br>, spans, colors
====================== */

const scrambleChars = "!<>-_\\/[]{}—=+*^?#";

function scrambleTextNode(node, delay = 0) {
  const originalText = node.nodeValue;
  const letters = originalText.split("");

  let frame = 0;
  const maxFrames = 22;

  setTimeout(() => {
    const interval = setInterval(() => {
      node.nodeValue = letters
        .map((char, index) => {
          if (char === " " || char === "\n") return char;

          if (frame > maxFrames + index * 1.5) {
            return char;
          }

          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      frame++;

      if (frame > maxFrames + letters.length * 1.5) {
        node.nodeValue = originalText;
        clearInterval(interval);
      }
    }, 28);
  }, delay);
}

function getTextNodes(element) {
  const textNodes = [];

  function walk(node) {
    node.childNodes.forEach(child => {
      if (
        child.nodeType === Node.TEXT_NODE &&
        child.nodeValue.trim() !== ""
      ) {
        textNodes.push(child);
      } else {
        walk(child);
      }
    });
  }

  walk(element);
  return textNodes;
}

window.addEventListener("load", () => {
  const textElements = document.querySelectorAll(
    "h1, h2, .hero p, .side-title, .services, .folder-card p"
  );

  textElements.forEach((el, index) => {
    const nodes = getTextNodes(el);

    nodes.forEach(node => {
      scrambleTextNode(node, index * 120);
    });
  });
});
