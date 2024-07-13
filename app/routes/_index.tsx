import type {MetaFunction} from "@remix-run/node";
import {PrimaryButton} from "~/components/buttons/primary_button/PrimaryButton"
import {CartButton} from "~/components/buttons/cart_button/CartButton"
import {RemoveIcon} from "~/components/icons/Icons"


export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export const loader = () => {



  return null
}
export default function Index() {
  return (
    <>
      <h1>Welcome to Remix!</h1>
      <PrimaryButton label={'Placeholder'}/>
      <CartButton/>
      <RemoveIcon/>
    </>
  );
}
