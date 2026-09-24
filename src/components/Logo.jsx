import React from "react";
import "./Logo.css";

export default function Logo({ size = "md", onClick }) {
  return (
    <div
      className={`sl-logo sl-logo--${size}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className="sl-logo__mark">SL</span>
      <span className="sl-logo__sep"></span>
      <span className="sl-logo__text">IA</span>
    </div>
  );
}
