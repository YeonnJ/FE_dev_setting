module.exports = function myWebPackLoader(content) {
  return content.replace("console.log(", "alert(");
};
