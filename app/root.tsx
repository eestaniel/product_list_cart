import {Links, Meta, Outlet, Scripts,} from "@remix-run/react";
import "./tailwind.css";
import './styles/globals.module.css'
import './styles/reset.css'
import './styles/root.css'
import {LinksFunction} from "@remix-run/node"

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/assets/images/favicon-32x32.png", type: "image/png" }
  ];
};

export function Layout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
      <title>Product List with Cart</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="viewport-fit=cover, initial-scale=1"/>

      <Meta/>
      <Links/>
    </head>
    <body id="modal-root">
    {children}
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}
