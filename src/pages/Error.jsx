import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // TODO opracować stronę błędu
  // przypadek 1 -> brak url - wtedy pusta strona
  // przypadek 2 -> zle zapytanie do api
  // MOZE przerobic bledy w backendzie
  const error = useRouteError();
  const navigate = useNavigate();
  console.log("Złapany error w Error Page! Poniżej treść:");
  console.error(error);

  return (
    <div>
      <h2>Błąd!</h2>
      <p>Kod: {error.response.data.errorCode}</p>
      <p>Status: {error.response.data.httpStatus}</p>
      <p>
        <b>{error.response.data.message}</b>
      </p>
      <button onClick={() => navigate(-1)}>Powrót</button>
    </div>
  );
};

export default ErrorPage;
