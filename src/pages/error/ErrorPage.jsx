import { ReactElement, useState } from "react";

export default function ErrorPage({ children }) {
  const [hasError, setError] = useState(false);
  return (
    <>
      {hasError ? (
        <div className="container mx-auto text-center">
          <h3 className="text-lg">Uh Oh!...Error 500!</h3>
          <span className="text-sm">
            Something went wrong at our end. Don't worry, it's not you, it's us.
            Sorry about that.
          </span>
          <button onClick={() => window.open("/", "_self")}>
            Go Back To Homepage
          </button>
        </div>
      ) : (
        { ...children }
      )}
    </>
  );
}
