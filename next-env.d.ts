/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.module.less" {
  const resource: { [key: string]: string };
  export = resource;
}
