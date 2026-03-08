import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdxComponents";

export default function MDXProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
