export const parseLink = (link) => {
    return link.split('/').join('%2F');
  }