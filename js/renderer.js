/* Tiny template renderer: resolves {{ path }} holes, <sc-for>, <sc-if>,
   on* event attributes and style-hover/focus/active, then morphs the live DOM. */
(function () {
  const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  const WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  const dynStyle = document.createElement('style'); document.head.appendChild(dynStyle);
  const pseudoCache = new Map();

  function get(path, scope) {
    if (path === 'true') return true; if (path === 'false') return false; if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^['"].*['"]$/.test(path)) return path.slice(1, -1);
    let v = scope;
    for (const k of path.split('.')) { if (v == null) return undefined; v = v[k]; }
    return v;
  }
  function interp(str, scope) {
    const m = str.match(WHOLE); if (m) return get(m[1], scope);
    return str.replace(HOLE, (_, p) => { const v = get(p, scope); return v == null ? '' : String(v); });
  }
  function pseudoClass(kind, css) {
    const key = kind + '|' + css;
    if (!pseudoCache.has(key)) {
      const cls = 'dc' + pseudoCache.size;
      const decl = css.split(';').map(d => d.trim()).filter(Boolean).map(d => d + ' !important').join(';');
      dynStyle.appendChild(document.createTextNode('.' + cls + ':' + kind + '{' + decl + '}\n'));
      pseudoCache.set(key, cls);
    }
    return pseudoCache.get(key);
  }
  function evtName(attr, el) {
    const n = attr.slice(2).toLowerCase();
    if (n === 'change') { const t = (el.getAttribute('type') || '').toLowerCase(); return (el.localName === 'textarea' || (el.localName === 'input' && t !== 'checkbox' && t !== 'radio')) ? 'input' : 'change'; }
    if (n === 'focus') return 'focusin'; if (n === 'blur') return 'focusout';
    return n;
  }
  function buildImageSlot(node, scope, out) {
    const img = document.createElement(node.getAttribute('src') ? 'img' : 'div');
    const shape = node.getAttribute('shape') || 'rect';
    const radius = interp(node.getAttribute('radius') || '12', scope);
    const r = shape === 'circle' || shape === 'pill' ? '999px' : shape === 'rounded' ? (String(radius).match(/px|%/) ? radius : radius + 'px') : '0';
    const srcv = interp(node.getAttribute('src') || '', scope);
    if (srcv) { img.setAttribute('src', srcv); img.setAttribute('loading', 'lazy'); img.setAttribute('alt', String(interp(node.getAttribute('placeholder') || '', scope) ?? '')); }
    img.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;background:#EFEBE3;border-radius:' + r);
    out.__needsRel = true;
    out.appendChild(img);
  }
  function build(tplParent, scope, out) {
    for (const node of tplParent.childNodes) {
      if (node.nodeType === 3) { out.appendChild(document.createTextNode(String(interp(node.nodeValue, scope) ?? ''))); continue; }
      if (node.nodeType !== 1) continue;
      const tag = node.localName;
      if (tag === 'sc-for') {
        const list = get((node.getAttribute('list') || '').replace(/[{}\s]/g, ''), scope) || [];
        const as = node.getAttribute('as') || 'item';
        list.forEach((item, i) => build(node.content || node, Object.assign({}, scope, { [as]: item, $index: i }), out));
        continue;
      }
      if (tag === 'sc-if') { if (get((node.getAttribute('value') || '').replace(/[{}\s]/g, ''), scope)) build(node, scope, out); continue; }
      if (tag === 'image-slot') { buildImageSlot(node, scope, out); if (out.__needsRel && !/position\s*:/.test(out.getAttribute('style') || '')) out.style.position = 'relative'; continue; }
      const el = node.namespaceURI && node.namespaceURI !== 'http://www.w3.org/1999/xhtml' ? document.createElementNS(node.namespaceURI, node.localName) : document.createElement(tag);
      const props = {}; const classes = [];
      for (const a of node.attributes) {
        const n = a.name;
        if (n.startsWith('hint-')) continue;
        if (/^on[a-z]/i.test(n)) { const fn = interp(a.value, scope); if (typeof fn === 'function') (el.__h || (el.__h = {}))[evtName(n, node)] = fn; continue; }
        if (n === 'style-hover' || n === 'style-focus' || n === 'style-active') { classes.push(pseudoClass(n.slice(6), String(interp(a.value, scope)))); continue; }
        if (n === 'value') { props.value = interp(a.value, scope); continue; }
        if (n === 'checked') { props.checked = !!interp(a.value, scope); continue; }
        if (n === 'defaultchecked') { el.setAttribute('checked', ''); continue; }
        const v = interp(a.value, scope);
        if (v === false || v == null) continue;
        el.setAttribute(n, v === true ? '' : String(v));
      }
      if (classes.length) el.setAttribute('class', ((el.getAttribute('class') || '') + ' ' + classes.join(' ')).trim());
      build(node, scope, el);
      el.__props = props;
      applyProps(el, props);
      out.appendChild(el);
    }
  }
  function applyProps(el, props) {
    if ('value' in props) { const v = props.value == null ? '' : String(props.value); if (el.value !== v) el.value = v; }
    if ('checked' in props && el.checked !== props.checked) el.checked = props.checked;
  }
  function morph(a, b) {
    if (a.nodeType !== b.nodeType || a.nodeName !== b.nodeName) { a.replaceWith(b); return; }
    if (a.nodeType === 3) { if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue; return; }
    for (const at of [...a.attributes]) if (!b.hasAttribute(at.name)) a.removeAttribute(at.name);
    for (const at of b.attributes) if (a.getAttribute(at.name) !== at.value) a.setAttribute(at.name, at.value);
    a.__h = b.__h;
    morphChildren(a, b);
    if (b.__props) applyProps(a, b.__props);
  }
  function morphChildren(a, b) {
    const ac = [...a.childNodes], bc = [...b.childNodes];
    for (let i = 0; i < bc.length; i++) { if (i < ac.length) morph(ac[i], bc[i]); else a.appendChild(bc[i]); }
    for (let i = bc.length; i < ac.length; i++) ac[i].remove();
  }
  function delegate(root) {
    ['click', 'mousedown', 'input', 'change', 'keydown', 'focusin', 'focusout'].forEach(type => {
      root.addEventListener(type, ev => {
        let el = ev.target;
        while (el && el !== root) { if (el.__h && el.__h[type]) { el.__h[type](ev); if (ev.cancelBubble) break; } el = el.parentNode; }
      });
    });
  }

  class DCLogic {
    constructor() { this.props = {}; this.state = {}; this.__queued = false; }
    setState(update, cb) {
      const patch = typeof update === 'function' ? update(this.state, this.props) : update;
      this.state = Object.assign({}, this.state, patch);
      if (cb) (this.__cbs || (this.__cbs = [])).push(cb);
      if (!this.__queued) { this.__queued = true; queueMicrotask(() => { this.__queued = false; this.__render(); const c = this.__cbs; this.__cbs = null; c && c.forEach(f => f()); }); }
    }
    forceUpdate() { this.setState({}); }
  }

  window.DCLogic = DCLogic;
  window.mountDC = function (Component, props, root, template) {
    const comp = new Component(); comp.props = props;
    comp.__render = function () {
      const vals = Object.assign({}, props, comp.renderVals ? comp.renderVals() : {});
      const frag = document.createElement('div');
      build(template.content, vals, frag);
      morphChildren(root, frag);
    };
    delegate(root);
    comp.__render();
    if (comp.componentDidMount) comp.componentDidMount();
    return comp;
  };
})();
