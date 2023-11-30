document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${bg}" />
  `;
});

console.log(VERSION); // 'v.1.2.3'
console.log(PRODUCTION); // true
console.log(MAX_COUNT); // 999
console.log(api.domain); // 'http://dev.api.domain.com'
