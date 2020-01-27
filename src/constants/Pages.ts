export interface IPageProperties {
  name: string;
  url: string;
}

export const ABOUT = { id: 'about', name: "About", url: "about" };
export const BLOG = { id: 'blog', name: "Blog", url: "blog" };
export const CAREER = { id: 'career', name: "Career", url: "career" };
export const CONTACTS = { id: 'contacts', name: "Contacts", url: "contacts" };
export const MAIN = { id: 'main', name: "Main", url: "" };
export const PAGES = [MAIN, ABOUT, BLOG, CAREER, CONTACTS];