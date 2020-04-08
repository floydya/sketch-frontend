import React from "react";
import { Breadcrumb as BaseBreadcrumb } from "antd";
import { Portal } from "~/components";

interface IBreadcrumbs {
  items: {
    name: string;
    href?: string;
  }[];
}

const Breadcrumb: React.FC<IBreadcrumbs> = ({ items }) => (
  <Portal selector="#breadcrumbs">
    <BaseBreadcrumb>
      {items.map((item) => (
        <BaseBreadcrumb.Item key={item.name}>{item.name}</BaseBreadcrumb.Item>
      ))}
    </BaseBreadcrumb>
  </Portal>
);

export default Breadcrumb;
