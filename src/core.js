const $ = (function () {
	class A {
		constructor(nodes) {
			this.nodes = nodes;
		}

		get length() {
			return this.nodes.length;
		}

		get(i) {
			return this.nodes[i];
		}

		ready(cb) {
			if (document.readyState !== 'loading'){
				cb();
			} else {
				document.addEventListener('DOMContentLoaded', cb);
			}
		}

		first() {
			return new A([this.get(0)]);
		}

		addClass(className) {
			this.nodes.forEach(el => { el.classList.add(className); })
		}

		removeClass(className) {
			this.nodes.forEach(el => { el.classList.remove(className); })
		}

		toggleClass(className, toggle) {
			this.nodes.forEach(el => { el.classList.toggle(className, toggle); })
		}

		hasClass(className) {
			if (!this.nodes.length) {
				return false;
			}
			return !this.nodes.find(el => !el.classList.contains(className));
		}

		after(content) {
			this.manipulate(content, 'afterend', HTMLElement.prototype.after);
		}

		before(content) {
			this.manipulate(content, 'beforebegin', HTMLElement.prototype.before);
		}

		append(content) {
			this.manipulate(content, 'beforeend', HTMLElement.prototype.append);
		}

		prepend(content) {
			this.manipulate(content, 'afterbegin', HTMLElement.prototype.prepend);
		}

		manipulate(content, place, func) {
			this.nodes.forEach(el => {
				if (typeof content === "string") {
					el.insertAdjacentHTML(place, content);
				} else if (content instanceof A) {
					func.apply(el, content.nodes);
				} else if (content instanceof Node) {
					func.call(el, content);
				}
			});
		}
	}

	return function (a) {
		let nodes = [];

		if (typeof a === 'string') {
			a = a.trim();
			if (!a.length) {
				return null;
			}
			if (a[0] === '<') {
				const div = document.createElement('div');
				div.insertAdjacentHTML('afterbegin', a);
				nodes = [div.firstChild];
			} else {
				nodes = Array.from(document.querySelectorAll(a));
			}
		} else if (typeof a === 'function') {
			$(document).ready(a);
		} else if (a && a.tagName || a === document) {
			nodes = [a];
		} else {
			return null;
		}

		return new A(nodes);
	};
})();
