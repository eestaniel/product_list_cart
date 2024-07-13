import styles from "./PrimaryButton.module.css"
import globals from '~/styles/globals.module.css'

interface PrimaryButtonProps {
  label: string,
  onClick: () => void

}

export const PrimaryButton = ({label, onClick}:PrimaryButtonProps) => {
 return (
  <button
    className={`${styles.button_container} ${globals.text_preset_3}`}
    onClick={onClick}
  >
    {label}
  </button>
 )
};

