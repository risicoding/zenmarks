export function convertToHttps(url:string) {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url.toLowerCase();
  }
  return url;
}
