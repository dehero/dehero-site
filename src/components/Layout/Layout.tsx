import type { Component, JSX } from 'solid-js';

export interface LayoutProps {
  children?: JSX.Element;
}

export const Layout: Component<LayoutProps> = (props) => {
  return <>TEST{props.children}</>;
};
