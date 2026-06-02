function walk(node) {
  let child, next;

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
    case Node.DOCUMENT_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case Node.TEXT_NODE:
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  let text = textNode.nodeValue;

  // Replace Yen → ₽
  text = text.replace(/jpy|yen|¥|円/gi, "₽");

  // Replace ₽ with styled span
  if (text.includes("₽")) {
    const frag = document.createDocumentFragment();
    const parts = text.split("₽");

    parts.forEach((part, i) => {
      if (part) frag.appendChild(document.createTextNode(part));
      if (i < parts.length - 1) {
        const span = document.createElement("span");
        span.className = "ruble";
        span.textContent = "₽";
        frag.appendChild(span);
      }
    });

    textNode.replaceWith(frag);
  } else {
    textNode.nodeValue = text;
  }
}

walk(document.body);
