import { useState } from "react";
import "./App.scss";

export default function App() {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const [cleanHtml, setCleanHtml] = useState("");

  async function readClipboard() {
    setError("");
    setHtml("");
    setCleanHtml("");

    try {
      const items = await navigator.clipboard.read();

      let foundHtml = "";

      for (const item of items) {
        if (item.types.includes("text/html")) {
          const blob = await item.getType("text/html");
          foundHtml = await blob.text();
        }
      }

      if (!foundHtml) {
        setError("В буфере нет text/html 😿 (или браузер не отдал HTML)");
        return;
      }

      setHtml(foundHtml);

      const cleaned = extractTasks(foundHtml);
      setCleanHtml(cleaned);
    } catch (err) {
      console.error(err);
      setError("Ошибка доступа к буферу: " + err);
    }
  }

  function extractTasks(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const tasks = doc.querySelectorAll(
      'div[class*="ExerciseStyles_exercise__k79gf"]',
    );

    const result = document.createElement("div");

    tasks.forEach((task) => {
      const clone = task.cloneNode(true) as HTMLElement;
      cleanTask(clone);
      result.appendChild(clone);
    });
    return result.innerHTML;
  }

  function cleanTask(node: HTMLElement) {
    //Удаляем ненужные блоки:
    node.querySelector('[class*="articul"]')?.remove();
    node.querySelector('[class*="evaluate"]')?.remove();
    node.querySelector('[class*="SupportBlock"]')?.remove();

    //Удаляем источники-приписки в скобках:
    const paragraphs = node.querySelectorAll("p");

    paragraphs.forEach((p) => {
      const text = (p.textContent ?? "").trim();

      if (text.startsWith("(")) {
        p.remove();
      }
    });

    return node;
  }

  return (
    <div className="App">
      <button onClick={readClipboard}>Прочитать HTML из буфера</button>

      {error && <p className="error">{error}</p>}

      {cleanHtml && (
        <>
          <div className="foundHtml">{html}</div>
          <div
            className="cleanHtml"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </>
      )}
    </div>
  );
}
