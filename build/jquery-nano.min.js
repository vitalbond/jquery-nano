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
	}

	return function (a) {
		let nodes = [];

		if (typeof a === 'string') {
			nodes = Array.from(document.querySelectorAll(a));
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
