module.exports = String.prototype.stripTags = function () {
  const node = document.createElement('div')
  node.innerHTML = this
  return node.textContent
}
