import { Image } from "react-bootstrap";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <Image src="/logo.jpg" width="100px" style={{ marginBottom: "20px" }} />
      <h3>Witaj w systemie zarządzania szwalnią.</h3>
      <h4>Wybierz z menu górnego opcję, aby przejść do kolejnego ekranu.</h4>
    </div>
  );
};

export default WelcomePage;
