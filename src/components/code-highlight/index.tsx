import { Highlight, themes } from "prism-react-renderer";

type CodeHighlightProps = {
  children: string;
  inline?: boolean;
  language?: string;
};

export function CodeHighlight({
  children,
  inline,
  language = "javascript",
}: CodeHighlightProps) {
  const code = children.trim();

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ style, tokens, getLineProps, getTokenProps }) =>
        inline ? (
          <code className="font-mono px-1 py-0.5 rounded text-xs" style={style}>
            {tokens.flatMap((line, i) =>
              line.map((token, j) => (
                <span key={`${i}-${j}`} {...getTokenProps({ token })} />
              )),
            )}
          </code>
        ) : (
          <pre
            className="font-mono mt-2 overflow-x-auto p-3 rounded-md text-xs"
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, j) => (
                  <span key={j} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )
      }
    </Highlight>
  );
}
