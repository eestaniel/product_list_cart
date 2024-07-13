import styles from "./PrimaryButton.module.css"
import globals from '~/globals.module.css'

interface PrimaryButtonProps {
  label: string

}

export const PrimaryButton = ({label}:PrimaryButtonProps) => {
 return (
  <button className={`${styles.button_container} ${globals.text_preset_3}`}>
    {label}
  </button>
 )
};

