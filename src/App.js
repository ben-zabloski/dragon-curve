import { useCallback, useEffect, useState } from "react";
import { DragonCurve } from "./DragonCurve";
import "./App.css";

function App() {
  const [viewElement, setViewElement] = useState();

  const viewElementRef = useCallback((element) => {
    setViewElement(element);
  });

  useEffect(() => {
    if (!viewElement) return;

    const application = new DragonCurve({ backgroundColor: 0xffffff });

    viewElement.appendChild(application.view);
  }, [viewElement]);

  return (
    <div className="App">
      <div>Dragon Curve</div>
      <div ref={viewElementRef} />
    </div>
  );
}

export default App;
