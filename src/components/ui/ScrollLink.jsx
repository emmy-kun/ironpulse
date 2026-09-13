import { scrollToSection } from "../../lib/lenis";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollLink({ to, offset, className = "", children, onClick, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(to, offset);
    } else {
      navigate(`/#${to}`);
    }
    onClick?.(e);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export default ScrollLink;
