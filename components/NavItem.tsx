import { useState } from "react";

interface props {
    href: string,
    label: string,
    tooltip: React.ReactNode
}
function NavItem({ href, label, tooltip } : props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="nav-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}   // keyboard accessibility
      onBlur={() => setIsHovered(false)}
      style={{ position: "relative", display: "inline-block", padding: "10px" }}
    >
      <div className="label">{label}</div>

      {isHovered && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            background: "black",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip}
        </div>
      )}
    </a>
  );
}

export default NavItem;

