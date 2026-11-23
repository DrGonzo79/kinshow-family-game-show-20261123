import type {NextConfig} from "next";
const repo="kinshow-family-game-show-20261123";
const pages=process.env.PAGES_BUILD==="true";
const config:NextConfig={output:"export",trailingSlash:true,images:{unoptimized:true},allowedDevOrigins:["127.0.0.1"],basePath:pages?`/${repo}`:"",assetPrefix:pages?`/${repo}/`:undefined};
export default config;
