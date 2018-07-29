export default (url) => {
  let a;
  if (!a) a = document.createElement('a');
  a.href = url;
  return a.href;
};
