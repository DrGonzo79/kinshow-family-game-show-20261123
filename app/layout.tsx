import type {Metadata} from "next"; import "./globals.css";
export const metadata:Metadata={title:"KinShow — family stories, show-ready",description:"Turn family memories into a host-ready milestone game show."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
