import defaultSettings from '@/settings'

const title = defaultSettings.title || 'MyDash!'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
