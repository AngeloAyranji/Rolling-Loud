export const parseLink = (link) => {
  // // let tmp = link.replace('&', encodeURIComponent('&'));
  // let tmp = link.split('&').join('%26');
  return link.split('/').join('%2F');
}