import {Links, Meta, Outlet, Scripts,} from "@remix-run/react";
import "./tailwind.css";
import './styles/globals.module.css'
import './styles/reset.css'
import './styles/root.css'


export function Layout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head title={'Product Cart with List'}>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
