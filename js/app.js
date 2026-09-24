/* Store logic: products, cart, checkout, search and category state. */
const PROPS = {
  "accent": "#B4532A",
  "imageShape": "Portrait",
  "showAnnouncement": true,
  "startScreen": "Home"
}; // accent, imageShape, showAnnouncement, startScreen

const PX = id => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=1000';
const PRODUCTS = [
  { id: 'p1', name: 'Wood-fired stoneware cup set', shop: 'Terra Studio', origin: 'Jaipur, India', price: 48, rating: 4.9, reviews: 812, category: 'Pottery', img: PX(29286722), desc: 'Thrown on the wheel from local clay and wood-fired for 36 hours. Ash marks and glaze pooling make every cup one of a kind.' },
  { id: 'p2', name: 'Hand-painted floral ceramic vase', shop: 'Bat Trang Ceramics', origin: 'Hanoi, Vietnam', price: 64, rating: 4.8, reviews: 301, category: 'Pottery', img: PX(28867382), desc: 'Each vase is brush-painted by hand with cobalt florals, a technique the family workshop has used for four generations.' },
  { id: 'p3', name: 'Handwoven bamboo storage basket', shop: 'Mekong Weavers', origin: 'Cần Thơ, Vietnam', price: 42, rating: 4.9, reviews: 1204, category: 'Baskets & Weaving', img: PX(33476890), desc: 'Hand-split bamboo woven in a tight twill pattern. Strong enough for everyday storage, beautiful enough to leave on display.' },
  { id: 'p4', name: 'Cotton macramé wall hanging', shop: 'Knot & Thread', origin: 'Lisbon, Portugal', price: 56, rating: 4.7, reviews: 540, category: 'Wall Décor', img: PX(5371357), desc: 'Hand-knotted from undyed recycled cotton rope on a driftwood dowel. Takes roughly nine hours to make.' },
  { id: 'p5', name: 'Hand-carved wooden wall panel', shop: 'Grain & Chisel', origin: 'Bali, Indonesia', price: 128, rating: 5.0, reviews: 188, category: 'Woodcraft', img: PX(5377650), desc: 'Carved by hand from sustainably harvested suar wood using traditional Balinese floral motifs.' },
  { id: 'p6', name: 'Celadon glazed bowl, set of 3', shop: 'Terra Studio', origin: 'Jaipur, India', price: 58, rating: 4.9, reviews: 422, category: 'Pottery', img: PX(10410342), desc: 'Nesting bowls finished in a soft celadon glaze. Food-safe, oven-safe, and made to be used every day.' },
  { id: 'p7', name: 'Bird motif hand-painted plates', shop: 'Casa Azulejo', origin: 'Puebla, Mexico', price: 72, rating: 4.8, reviews: 267, category: 'Pottery', img: PX(16131600), desc: 'Talavera-style plates painted freehand with songbirds and vines. Sold as a set of two.' },
  { id: 'p8', name: 'Matte stoneware bud vase', shop: 'Field Studio', origin: 'Kyoto, Japan', price: 36, rating: 4.9, reviews: 356, category: 'Pottery', img: PX(9858439), desc: 'A small, quiet vase with a raw matte exterior — made for a single stem or a few dried flowers.' },
  { id: 'p9', name: 'Handmade clay jug vase', shop: 'Atlas Clayworks', origin: 'Fez, Morocco', price: 54, rating: 4.9, reviews: 214, category: 'Pottery', img: PX(11975310), desc: 'Hand-built from local clay and burnished by hand. Each jug carries the marks of its making.' },
  { id: 'p10', name: 'Terracotta vase trio', shop: 'Atlas Clayworks', origin: 'Fez, Morocco', price: 88, rating: 4.8, reviews: 176, category: 'Pottery', img: PX(10011988), desc: 'Three unglazed terracotta vessels in graduated sizes, sun-dried and kiln-fired.' },
  { id: 'p11', name: 'Woven market baskets, set of 2', shop: 'Mekong Weavers', origin: 'Cần Thơ, Vietnam', price: 64, rating: 4.9, reviews: 390, category: 'Baskets & Weaving', img: PX(59722), desc: 'Nesting baskets woven from sun-dried rattan. Sturdy enough for the market, pretty enough for the shelf.' },
  { id: 'p12', name: 'Round rattan storage basket', shop: 'Mekong Weavers', origin: 'Cần Thơ, Vietnam', price: 38, rating: 4.8, reviews: 258, category: 'Baskets & Weaving', img: PX(14779441), desc: 'Tightly coiled rattan with a soft, natural sheen. Ideal for throws, plants or toys.' },
  { id: 'p13', name: 'Handwoven cotton throw', shop: 'North Weave', origin: 'Oaxaca, Mexico', price: 118, rating: 4.9, reviews: 142, category: 'Textiles', img: PX(37785750), desc: 'Loomed on a traditional backstrap loom from undyed cotton. Warm, breathable and made to soften with use.' },
  { id: 'p14', name: 'Hand-poured floral candle', shop: 'Hive Goods', origin: 'Provence, France', price: 26, rating: 4.7, reviews: 540, category: 'Home Décor', img: PX(20360915), desc: 'Soy and beeswax, poured by hand and set with dried flowers. Around 40 hours of burn time.' }
];
const SECTIONS = [
  { title: 'Pottery & ceramics', short: 'pottery', blurb: 'Wheel-thrown, hand-built and wood-fired — clay shaped by hand.', tint: '#EADFD2', cat: 'pottery', ids: ['p1', 'p2', 'p9', 'p10'] },
  { title: 'Baskets & weaving', short: 'weaving', blurb: 'Rattan, bamboo and cotton, woven using techniques passed down for generations.', tint: '#E4E3D3', cat: 'baskets', ids: ['p3', 'p11', 'p12', 'p13'] },
  { title: 'Wall & home décor', short: 'décor', blurb: 'Carved, knotted and painted pieces that make a house feel lived in.', tint: '#E6E0E3', cat: 'decor', ids: ['p4', 'p5', 'p7', 'p14'] }
];
const EXTRA = [PX(29286721), PX(6611418), PX(15440777)];
const CATEGORIES = [['Pottery', 15440777], ['Baskets', 14779441], ['Woodcraft', 5377650], ['Textiles', 37785750], ['Wall Décor', 5371357], ['Jewelry', 14122227]].map(([n, id], i) => ({ id: 'c' + i, name: n, img: PX(id) }));
const CATS = [
  { key: 'all', name: 'All handicrafts', match: null, img: 15440777, blurb: 'Every piece in the shop — made by hand, in small batches, by artisans around the world.' },
  { key: 'pottery', name: 'Pottery', match: ['Pottery'], img: 15440777, blurb: 'Wheel-thrown, hand-built and wood-fired. Cups, bowls, vases and plates shaped by hand from local clay.' },
  { key: 'baskets', name: 'Baskets & Weaving', match: ['Baskets & Weaving'], img: 14779441, blurb: 'Rattan, bamboo and seagrass, woven using techniques passed down for generations.' },
  { key: 'wood', name: 'Woodcraft', match: ['Woodcraft'], img: 5377650, blurb: 'Hand-carved panels, boards and objects from sustainably sourced timber.' },
  { key: 'textiles', name: 'Textiles', match: ['Textiles'], img: 37785750, blurb: 'Loomed, knotted and block-printed — throws, cushions and cloth with texture you can feel.' },
  { key: 'decor', name: 'Wall & Home Décor', match: ['Wall Décor', 'Home Décor', 'Woodcraft'], img: 5371357, blurb: 'Macramé, carvings, candles and painted pieces that make a house feel lived in.' },
  { key: 'jewelry', name: 'Jewelry', match: ['Jewelry'], img: 14122227, blurb: 'Hammered, cast and beaded by hand — small pieces with a maker behind every one.' }
];
const PRICE_F = [{ name: 'Any price', t: () => true }, { name: 'Under ৳40', t: p => p < 40 }, { name: '৳40 – ৳80', t: p => p >= 40 && p <= 80 }, { name: 'Over ৳80', t: p => p > 80 }];
const FINISHES = [{ name: 'Natural', swatch: '#D9C7A8' }, { name: 'Charcoal', swatch: '#3B3936' }, { name: 'Moss', swatch: '#7A8466' }];
const SIZES = ['Small', 'Medium', 'Large'];
const DETAILS = [
  { title: 'About this piece', body: '' },
  { title: 'Materials & care', body: 'Made from natural materials, so colour and texture vary slightly from piece to piece. Wipe clean with a soft, dry cloth; keep woven and wooden pieces out of direct sunlight.' },
  { title: 'Shipping & returns', body: 'Ships from the artisan within 3–5 business days in plastic-free packaging. Free returns within 30 days of delivery.' }
];
const KEY = 'loam-storefront';

class Component extends DCLogic {
  state = { screen: 'home', pid: 'p1', img: 0, finish: 0, size: 1, qty: 1, cart: [], saved: [], cartOpen: false, gift: false, promo: '', promoOk: false, promoMsg: '', delivery: 0, pay: 0, orderNo: '', cat: 'all', q: '', query: '', qFocus: false, priceF: 0, freeOnly: false, sort: 'rel', favs: {}, open: 0 };

  componentDidMount() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) this.setState({ screen: s.screen, pid: s.pid, cat: s.cat || 'all' }); else if (this.props.startScreen === 'Product') this.setState({ screen: 'product' }); } catch (e) {}
  }
  goCat(key) { this.setState({ priceF: 0, freeOnly: false, sort: 'rel' }); this.go('category', null, key); }
  go(screen, pid, cat) {
    const next = { screen, pid: pid || this.state.pid, cat: cat || this.state.cat };
    this.setState({ ...next, img: 0, qty: 1, open: 0 });
    try { localStorage.setItem(KEY, JSON.stringify(screen === 'confirm' || screen === 'checkout' || screen === 'search' ? { ...next, screen: 'home' } : next)); } catch (e) {}
    window.scrollTo(0, 0);
  }
  card(p) {
    const fav = !!this.state.favs[p.id];
    const ck = (CATS.find(c => c.key !== 'all' && c.match.includes(p.category)) || CATS[0]).key;
    return { ...p, priceLabel: '৳' + p.price.toFixed(2), freeShip: p.price >= 60, onOpen: () => this.go('product', p.id), onCat: () => this.goCat(ck),
      onFav: () => this.setState(s => ({ favs: { ...s.favs, [p.id]: !s.favs[p.id] } })),
      favFill: fav ? 'currentColor' : 'none', favColor: fav ? (this.props.accent ?? '#B4532A') : '#1C1B19' };
  }
  setLine(key, fn) { this.setState(x => ({ cart: x.cart.map(c => c.key === key ? { ...c, qty: fn(c.qty) } : c).filter(c => c.qty > 0) })); }
  cartVals(accent) {
    const s = this.state, FREE = 60, $ = n => '৳' + n.toFixed(2);
    const items = s.cart.map(c => { const p = PRODUCTS.find(q => q.id === c.pid);
      return { ...c, name: p.name, shop: p.shop, thumb: p.img.replace('w=1000', 'w=300'), variant: FINISHES[c.finish].name + ' · ' + SIZES[c.size], lineTotal: $(p.price * c.qty), price: p.price,
        onInc: () => this.setLine(c.key, q => Math.min(9, q + 1)), onDec: () => this.setLine(c.key, q => q - 1), onRemove: () => this.setLine(c.key, () => 0), origin: p.origin, unit: $(p.price),
        onSave: () => this.setState(x => ({ cart: x.cart.filter(z => z.key !== c.key), saved: [...x.saved.filter(z => z.key !== c.key), c] })),
        onOpen: () => { this.setState({ cartOpen: false }); this.go('product', c.pid); } }; });
    const sub = items.reduce((a, i) => a + i.price * i.qty, 0), count = items.reduce((a, i) => a + i.qty, 0);
    const std = sub >= FREE || sub === 0 ? 0 : 8;
    const ship = s.delivery === 1 && sub > 0 ? 18 : std;
    const onCheckout = s.screen === 'checkout';
    const taxAmt = onCheckout ? Math.round(sub * 0.07 * 100) / 100 : 0;
    const DELIV = [{ name: 'Standard', eta: 'Arrives in 5–8 business days', price: std ? $(std) : 'Free' }, { name: 'Express', eta: 'Arrives in 2–3 business days', price: $(18) }];
    const PAY = ['Card', 'PayPal', 'Apple Pay'];
    const disc = s.promoOk ? Math.round(sub * 10) / 100 : 0;
    const saved = s.saved.map(c => { const p = PRODUCTS.find(q => q.id === c.pid);
      return { ...c, name: p.name, thumb: p.img.replace('w=1000', 'w=400'), variant: FINISHES[c.finish].name + ' · ' + SIZES[c.size], unit: $(p.price),
        onMove: () => this.setState(x => ({ saved: x.saved.filter(z => z.key !== c.key), cart: x.cart.some(z => z.key === c.key) ? x.cart : [...x.cart, c] })) }; });
    return { cartItems: items, cartCount: count, hasCart: count > 0, cartEmpty: count === 0,
      subtotal: $(sub), total: $(sub - disc + ship + taxAmt), tax: $(taxAmt),
      deliveryOpts: DELIV.map((d, i) => ({ ...d, border: i === s.delivery ? '#1C1B19' : '#D9D4CA', bg: i === s.delivery ? '#fff' : 'transparent', dot: i === s.delivery ? '#1C1B19' : 'transparent', onSelect: () => this.setState({ delivery: i }) })),
      payOpts: PAY.map((n, i) => ({ name: n, border: i === s.pay ? '#1C1B19' : '#D9D4CA', bg: i === s.pay ? '#1C1B19' : '#fff', color: i === s.pay ? '#FBFAF7' : '#1C1B19', onSelect: () => this.setState({ pay: i }) })),
      payCard: s.pay === 0, payOther: s.pay !== 0, payName: PAY[s.pay],
      goCheckout: () => { this.setState({ cartOpen: false }); this.go('checkout'); },
      placeOrder: () => { this.setState({ cart: [], promoOk: false, promoMsg: '', promo: '', orderNo: '#LM-' + Math.floor(100000 + Math.random() * 900000) }); this.go('confirm'); },
      orderNo: s.orderNo, discount: $(disc), hasDiscount: disc > 0,
      savedItems: saved, hasSaved: saved.length > 0, isGift: s.gift, toggleGift: () => this.setState(x => ({ gift: !x.gift })),
      promo: s.promo, promoMsg: s.promoMsg, onPromo: e => this.setState({ promo: e.target.value }),
      applyPromo: () => { const ok = s.promo.trim().toUpperCase() === 'HANDMADE10'; this.setState({ promoOk: ok, promoMsg: ok ? '10% off applied.' : 'That code isn\'t valid. Try HANDMADE10.' }); },
      goCart: () => { this.setState({ cartOpen: false }); this.go('cart'); }, shippingLabel: ship ? $(ship) : 'Free',
      shipMsg: sub >= FREE ? 'You\'ve unlocked free shipping.' : 'You\'re ' + $(FREE - sub) + ' away from free shipping.',
      shipPct: Math.min(100, sub / FREE * 100) + '%',
      cartTransform: s.cartOpen ? 'translateX(0)' : 'translateX(calc(100% + 60px))', cartOverlayOpacity: s.cartOpen ? 1 : 0, cartPointer: s.cartOpen ? 'auto' : 'none',
      openCart: () => this.setState({ cartOpen: true }), closeCart: () => this.setState({ cartOpen: false }) };
  }
  matches(p, q) {
    const hay = (p.name + ' ' + p.shop + ' ' + p.category + ' ' + p.origin + ' ' + (p.desc || '')).toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(w => hay.includes(w.replace(/s$/, '')));
  }
  search(q) {
    q = (q ?? this.state.q).trim(); if (!q) return;
    this.setState({ q, query: q, qFocus: false, priceF: 0, freeOnly: false, sort: 'rel' }); this.go('search');
    if (document.activeElement) document.activeElement.blur();
  }
  searchVals() {
    const s = this.state, q = s.q.trim().toLowerCase();
    const items = q ? PRODUCTS.filter(p => this.matches(p, q)).slice(0, 5) : [];
    const cats = q ? CATS.filter(c => c.key !== 'all' && c.name.toLowerCase().includes(q)).slice(0, 3) : [];
    return {
      q: s.q, showSuggest: s.qFocus && q.length > 0,
      suggestItems: items.map(p => ({ ...this.card(p), thumb: p.img.replace('w=1000', 'w=120'), onPick: e => { e.preventDefault(); this.setState({ qFocus: false, q: '' }); this.go('product', p.id); } })),
      suggestCats: cats.map(c => ({ name: c.name, onPick: e => { e.preventDefault(); this.setState({ qFocus: false, q: '' }); this.goCat(c.key); } })),
      hasSuggestItems: items.length > 0, hasSuggestCats: cats.length > 0, noSuggest: !items.length && !cats.length,
      onQ: e => this.setState({ q: e.target.value, qFocus: true }),
      onQKey: e => { if (e.key === 'Enter') this.search(e.target.value); if (e.key === 'Escape') { this.setState({ qFocus: false }); e.target.blur(); } },
      onQFocus: () => this.setState({ qFocus: true }), onQBlur: () => this.setState({ qFocus: false }),
      runSearch: e => { e.preventDefault(); this.search(); }
    };
  }
  catVals() {
    const s = this.state, onCat = s.screen === 'category';
    const searching = s.screen === 'search';
    const cat = searching ? { key: 'search', name: 'Results for “' + s.query + '”', blurb: 'Handmade pieces matching your search across every category.' } : (CATS.find(c => c.key === s.cat) || CATS[0]);
    let list = searching ? PRODUCTS.filter(p => this.matches(p, s.query)) : PRODUCTS.filter(p => !cat.match || cat.match.includes(p.category));
    const inCat = list.length;
    list = list.filter(p => PRICE_F[s.priceF].t(p.price) && (!s.freeOnly || p.price >= 60));
    if (s.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (s.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (s.sort === 'top') list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    const on = sel => ({ border: sel ? '#1C1B19' : '#D9D4CA', bg: sel ? '#1C1B19' : '#fff', color: sel ? '#FBFAF7' : '#1C1B19' });
    const NAV = [['pottery', 'Pottery'], ['baskets', 'Baskets & Weaving'], ['wood', 'Woodcraft'], ['textiles', 'Textiles'], ['decor', 'Wall Décor'], ['jewelry', 'Jewelry'], ['all', 'Shop all']];
    return {
      isCategory: onCat || searching, cat, showCatTiles: !searching,
      navCats: NAV.map(([k, n]) => { const a = onCat && s.cat === k; return { name: n, color: a ? '#1C1B19' : '#4A4741', weight: a ? 500 : 400, line: a ? '#1C1B19' : 'transparent', onClick: () => this.goCat(k) }; }),
      catTiles: CATS.map(c => ({ name: c.name, img: PX(c.img).replace('w=1000', 'w=240'), ring: c.key === cat.key ? '2px' : '0px', weight: c.key === cat.key ? 600 : 400, onClick: () => this.goCat(c.key) })),
      priceFilters: PRICE_F.map((f, i) => ({ name: f.name, ...on(i === s.priceF), onClick: () => this.setState({ priceF: i }) })),
      freeBorder: on(s.freeOnly).border, freeBg: on(s.freeOnly).bg, freeColor: on(s.freeOnly).color,
      toggleFree: () => this.setState(x => ({ freeOnly: !x.freeOnly })),
      sort: s.sort, onSort: e => this.setState({ sort: e.target.value }),
      catProducts: list.map(p => this.card(p)),
      resultLabel: list.length + (list.length === 1 ? ' piece' : ' pieces') + (list.length !== inCat ? ' of ' + inCat : ''),
      hasResults: list.length > 0, noResults: list.length === 0,
      hasFilters: s.priceF !== 0 || s.freeOnly,
      clearFilters: () => this.setState({ priceF: 0, freeOnly: false }),
      emptyTitle: searching && inCat === 0 ? 'Nothing found for “' + s.query + '”' : inCat === 0 ? 'New makers coming soon' : 'No pieces match those filters',
      emptyBody: searching && inCat === 0 ? 'Check the spelling, or try a broader word like “vase”, “basket” or “wood”.' : inCat === 0 ? 'We\'re welcoming new ' + cat.name.toLowerCase() + ' artisans this season. Check back soon.' : 'Try a different price range or clear your filters.',
      goAll: () => this.goCat('all')
    };
  }
  renderVals() {
    const s = this.state;
    const accent = this.props.accent ?? '#B4532A';
    const product = this.card(PRODUCTS.find(p => p.id === s.pid) || PRODUCTS[0]);
    const shape = this.props.imageShape ?? 'Portrait';
    return {
      accent, product,
      showAnnouncement: this.props.showAnnouncement ?? true,
      ratio: shape === 'Square' ? '1/1' : '4/5',
      radius: shape === 'Square' ? '12' : '14',
      isHome: s.screen === 'home', isProduct: s.screen === 'product', isCart: s.screen === 'cart', isCheckout: s.screen === 'checkout', isConfirm: s.screen === 'confirm',
      goHome: () => this.go('home'),
      categories: CATEGORIES.map((c, i) => ({ ...c, onClick: e => { e.preventDefault(); this.goCat(CATS[i + 1].key); } })),
      ...this.catVals(), ...this.searchVals(),
      products: PRODUCTS.slice(0, 8).map(p => this.card(p)),
      sections: SECTIONS.map(sec => ({ ...sec, onShop: e => { e.preventDefault(); this.goCat(sec.cat); }, count: sec.ids.length * 30 + ' pieces', items: sec.ids.map(id => this.card(PRODUCTS.find(p => p.id === id))) })),
      related: PRODUCTS.filter(p => p.id !== s.pid).slice(0, 4).map(p => this.card(p)),
      gallery: [product.img, ...EXTRA].map((src, i) => ({ n: i + 1, src, thumb: src.replace('w=1000', 'w=200'), display: i === s.img ? 'block' : 'none',
        border: i === s.img ? '#1C1B19' : 'transparent', onSelect: () => this.setState({ img: i }) })),
      finishName: FINISHES[s.finish].name,
      finishes: FINISHES.map((f, i) => ({ ...f, ring: i === s.finish ? '3.5px' : '0px', onSelect: () => this.setState({ finish: i }) })),
      sizes: SIZES.map((n, i) => ({ name: n, border: i === s.size ? '#1C1B19' : '#D9D4CA', bg: i === s.size ? '#1C1B19' : '#fff',
        color: i === s.size ? '#FBFAF7' : '#1C1B19', onSelect: () => this.setState({ size: i }) })),
      qty: s.qty,
      incQty: () => this.setState(x => ({ qty: Math.min(9, x.qty + 1) })),
      decQty: () => this.setState(x => ({ qty: Math.max(1, x.qty - 1) })),
      addLabel: 'Add to cart — ৳' + (product.price * s.qty).toFixed(2),
      addToCart: () => this.setState(x => {
        const key = x.pid + '|' + x.finish + '|' + x.size;
        const ex = x.cart.find(c => c.key === key);
        const cart = ex ? x.cart.map(c => c.key === key ? { ...c, qty: Math.min(9, c.qty + x.qty) } : c) : [...x.cart, { key, pid: x.pid, finish: x.finish, size: x.size, qty: x.qty }];
        return { cart, cartOpen: true };
      }),
      ...this.cartVals(accent),
      sizeLabel: 'Size', details: DETAILS.map((d, i) => ({ ...d, body: i === 0 ? product.desc : d.body, open: s.open === i, icon: s.open === i ? '−' : '+', onToggle: () => this.setState(x => ({ open: x.open === i ? -1 : i })) }))
    };
  }
}

mountDC(Component, PROPS, document.getElementById('root'), document.getElementById('app-template'));
