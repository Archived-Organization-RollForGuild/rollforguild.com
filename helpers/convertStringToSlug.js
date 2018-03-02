export default function convertStringToSlug (string) {
  return encodeURIComponent(string.toLowerCase().replace(/[^\w\s-]/gi, '').replace(/\s|_/gi, '-').replace(/-+/gi, '-'))
}
