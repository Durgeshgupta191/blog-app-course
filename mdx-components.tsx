import type { ComponentType } from "react";

export interface MDXComponents {
  [key: string]: ComponentType<any>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
