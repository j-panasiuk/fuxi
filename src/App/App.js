/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "../Card/Card";
import dictionary from "../dictionary.json";

function App() {
  return (
    <div css={cssApp}>
      <header>
        <h1 css={cssHeader}>复习</h1>
      </header>
      <div css={cssList}>
        {dictionary.map((entry, i) => (
          <Card key={i} {...entry} />
        ))}
      </div>
    </div>
  );
}

const cssApp = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const cssHeader = css`
  display: flex;
  flex: 0;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: #e8e8e8;
  color: #929292;
  height: 48px;
`;
const cssList = css`
  padding: 0.5rem;
`;

export default App;
