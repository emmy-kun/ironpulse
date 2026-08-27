import { scrollToSection } from "../../lib/lenis";

function ScrollLink({ to, offset, className = "", children, onClick, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    scrollToSection(to, offset);
    onClick?.(e);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export default ScrollLink;
