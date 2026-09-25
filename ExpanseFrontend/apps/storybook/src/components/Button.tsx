import React from "react"

export interface ButtonProps {
  label?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  label = "Button",
  onClick,
}) => {
  return (
    <button onClick={onClick} style={{ padding: "8px 12px", borderRadius: 4 }}>
      {label}
    </button>
  )
}

export default Button
