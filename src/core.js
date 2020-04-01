'use strict';

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
			this.nodes.forEach(el => { el.classList.add(className); });
			return this;
		}

		removeClass(className) {
			this.nodes.forEach(el => { el.classList.remove(className); });
			return this;
		}

		toggleClass(className, toggle) {
			this.nodes.forEach(el => { el.classList.toggle(className, toggle); });
			return this;
		}

		hasClass(className) {
			if (!this.nodes.length) {
				return false;
			}
			return !this.nodes.find(el => !el.classList.contains(className));
		}

		after(content) {
			return this.manipulate(content, 'afterend', HTMLElement.prototype.after);
		}

		before(content) {
			return this.manipulate(content, 'beforebegin', HTMLElement.prototype.before);
		}

		append(content) {
			return this.manipulate(content, 'beforeend', HTMLElement.prototype.append);
		}

		prepend(content) {
			return this.manipulate(content, 'afterbegin', HTMLElement.prototype.prepend);
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

			return this;
		}

		text() {
			return this.nodes.reduce((a, v) => a + v.textContent, '');
		}

		val(value) {
			if (typeof value === 'undefined') {
				switch (this.nodes.length) {
					case 0: return undefined;
					case 1: return this.nodes[0].value;
					default: return '';
				}
			}

			this.nodes.forEach(el => { el.value = value; })

			return this;
		}

		attr(name, value) {
			if (typeof value === 'undefined') {
				return this.nodes.length ? this.nodes[0].getAttribute(name) : undefined;
			}

			this.nodes.forEach(el => { el.setAttribute(name, value); });
			return this;
		}

		removeAttr(name) {
			this.nodes.forEach(el => { el.removeAttribute(name); });
			return this;
		}

		html(html) {
			if (typeof html === 'undefined') {
				return this.nodes.reduce((a, v) => a + v.innerHTML, '');
			}

			this.nodes.forEach(el => { el.innerHTML = html; });

			return this;
		}

		each(fn) {
			this.nodes.forEach((el, i) => { fn.call(el, i, el); });
			return this;
		}

		map(fn) {
			return this.nodes.map((el, i) => fn.call(el, i, el));
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
