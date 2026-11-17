import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Tag, 
  ShieldCheck, 
  Plus, 
  Star, 
  ShoppingCart, 
  Phone, 
  ExternalLink, 
  MapPin, 
  MessageSquare, 
  AlertTriangle,
  X,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { DataService } from '../services/dataService';
import { MarketplaceProduct } from '../types';

export const MarketplacePage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useNotifications();

  const [products, setProducts] = useState<MarketplaceProduct[]>(() => DataService.getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New Product Form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(15000);
  const [newCategory, setNewCategory] = useState<MarketplaceProduct['category']>('electronics');
  const [newCondition, setNewCondition] = useState<MarketplaceProduct['condition']>('new');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600');
  const [newLocation, setNewLocation] = useState('Student Union Building (SUB) Ground Floor');

  const categories = [
    'All',
    'electronics',
    'fashion',
    'hostel',
    'books',
    'food',
    'services',
    'phones',
    'accessories'
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created = DataService.createProduct({
      vendorId: 'vendor-1',
      vendorName: 'CampusTech Hub',
      vendorVerified: true,
      title: newTitle,
      description: newDesc,
      price: newPrice,
      category: newCategory,
      images: [newImage],
      condition: newCondition,
      inStock: true,
      locationHint: newLocation,
      whatsappContact: '+2348149990011'
    });

    setProducts(DataService.getProducts());
    setIsAddProductOpen(false);
    setNewTitle('');
    setNewDesc('');
    showToast('Listing Published!', `${created.title} is now visible on the campus marketplace.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-run-crimson text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
            Verified Redeemer's University Student & Commercial Commerce
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">REDVERSE Campus Marketplace</h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-normal">
            Buy and sell academic calculators, chargers, hoodies, hostel room essentials, snacks, and design services safely within the campus grounds.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            <span>List an Item</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-dark-900/40 text-white border border-white/20 text-xs font-bold hover:bg-dark-900/60 transition flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Open Cart</span>
          </button>
        </div>
      </div>

      {/* Campus Safety Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 dark:text-amber-300 space-y-0.5">
          <p className="font-bold">Campus Transaction Safety Guidelines:</p>
          <p className="text-[11px] leading-relaxed">
            REDVERSE is a university directory and communication ecosystem. Always meet sellers during daylight hours in populated areas (Student Union Building foyer, University Auditorium, or Senate ground floor). Never transfer funds prior to physical item verification.
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search power banks, scientific calculators, hoodies, project printing, hostel essentials..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-dark-800 text-slate-900 dark:text-white border border-slate-200 dark:border-dark-700 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap capitalize transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Items' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="group rounded-3xl bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-dark-750 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-amber-500/50 transition duration-200"
          >
            <div>
              <div 
                onClick={() => setSelectedProduct(product)}
                className="relative h-48 overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/90 dark:bg-dark-900/90 text-slate-800 dark:text-slate-200 shadow-sm capitalize backdrop-blur-md">
                    {product.condition.replace('_', ' ')}
                  </span>
                  {product.isPromoted && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
                      PROMOTED
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] truncate">
                    <span>{product.vendorName}</span>
                    {product.vendorVerified && (
                      <span title="Verified Campus Vendor">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{product.vendorRating}</span>
                  </div>
                </div>

                <h3 
                  onClick={() => setSelectedProduct(product)}
                  className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1 cursor-pointer group-hover:text-amber-500 transition-colors"
                >
                  {product.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1 truncate">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{product.locationHint}</span>
                </p>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-100 dark:border-dark-750 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Campus Price</span>
                <span className="font-black text-base text-slate-900 dark:text-white">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    showToast('Added to Cart', `${product.title} added to your cart.`, 'success');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100 dark:bg-dark-900 relative">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 dark:bg-dark-900/90 text-slate-900 dark:text-white capitalize shadow">
                {selectedProduct.condition.replace('_', ' ')}
              </span>
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 uppercase">
                    {selectedProduct.category}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-black text-lg text-slate-900 dark:text-white mt-2">
                  {selectedProduct.title}
                </h3>

                <p className="text-xl font-black text-amber-500 mt-1">
                  ₦{selectedProduct.price.toLocaleString()}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-dark-800 border border-slate-200/60 dark:border-dark-700 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Vendor:</span>
                    <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      {selectedProduct.vendorName}
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Handoff Spot:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{selectedProduct.locationHint}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    showToast('Added to Cart', `${selectedProduct.title} is in your cart.`, 'success');
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Campus Cart</span>
                </button>

                <a
                  href={`https://wa.me/${selectedProduct.whatsappContact?.replace(/\D/g, '') || '2348149990011'}?text=Hi, I found your listing "${encodeURIComponent(selectedProduct.title)}" on REDVERSE.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Vendor on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-dark-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-700 pb-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white">Create Marketplace Listing</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Romoss 20,000mAh Power Bank (Fast Charging)"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Price (₦ Naira)</label>
                  <input
                    type="number"
                    min={500}
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="electronics">Electronics & Gadgets</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="hostel">Hostel Essentials</option>
                    <option value="books">Textbooks & Notes</option>
                    <option value="services">Campus Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe condition, specifications, warranty, or hostel delivery availability..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Campus Pickup / Handoff Spot</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. SUB Store #04 or Queen Esther Wing B"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
