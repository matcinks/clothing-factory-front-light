import { redirect, useActionData } from "react-router-dom";

import { login } from "../util/api";

import AppContainer from "../components/AppContainer";
import LoginForm from "../components/login/LoginForm";

const RootLayout = () => {
  const isToken = sessionStorage.getItem("token");
  const error = useActionData();

  return <>{isToken ? <AppContainer /> : <LoginForm error={error} />};</>;
};

export default RootLayout;

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    const userData = {
      name: formData.get("username"),
      password: formData.get("password"),
    };
    const response = await login(userData);
    // put token to session storage
    sessionStorage.setItem("token", response.token);
    // put username to session storage
    sessionStorage.setItem("name", response.userBasicDetails.name);
    // put user role to session storage
    sessionStorage.setItem("role", response.userBasicDetails.role);
  } catch (e) {
    return "Nie udało się zalogować, spróbuj ponownie.";
  }
  return redirect("/");
};
