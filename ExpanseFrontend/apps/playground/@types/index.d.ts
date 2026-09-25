/*
    Each declare module statement is essentially telling TypeScript that there will be modules (files) with these specified extensions, and TypeScript should recognize them as valid modules without trying to infer their actual implementation. This is commonly used when working with non-JavaScript files (like images, stylesheets, etc.) in a TypeScript project.

    For example, if you have an image file example.png in your project, you can import it in a TypeScript/JavaScript file like this:

    import image from './example.png';
*/
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
// declare module '*.svg'
declare module "*.gif";
declare module "*.svg" {
  const content: any;
  export default content;
}
