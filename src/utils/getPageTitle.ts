import setting from "@/setting";

const { title } = setting

export default function getPageTitle(pageTitle: string):string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
