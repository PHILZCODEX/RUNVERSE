import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const { showToast } = useNotifications();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('Deliver to Queen Esther Hostel / SUB Foyer');

  if (!isCartOpen) return null;

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      showToast('Order Placed Successfully!', 'The campus vendor has received your order and will contact you for hostel delivery.', 'success');
    }, 1200);
  };

  const handleFinish = () => {
    clearCart();
    setCheckoutSuccess(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-dark-900 border-l border-slate-200 dark:border-dark-700 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-dark-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Campus Cart</h3>
                <p className="text-xs text-slate-400">{cart.length} unique item(s)</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {checkoutSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Order Confirmed!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Your order reference <strong className="text-brand-500">RUN-ORD-{Math.floor(10000 + Math.random() * 90000)}</strong> has been sent to the vendor. Meet in a designated campus area for handoff.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-left text-xs space-y-1.5">
                  <p className="text-slate-400 font-medium">Pickup/Delivery Spot:</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{deliveryNote}</p>
                </div>
                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-dark-800 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Your cart is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse gadgets, textbooks, Redeemer's University apparel, and snacks on the REDVERSE Marketplace.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div 
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-200/80 dark:border-dark-700/80"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          Vendor: {item.product.vendorName}
                        </p>
                        <p className="font-extrabold text-xs text-brand-600 dark:text-brand-400 mt-1">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-slate-200 dark:bg-dark-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold hover:bg-slate-300 dark:hover:bg-dark-600"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-slate-200 dark:bg-dark-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold hover:bg-slate-300 dark:hover:bg-dark-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery Note */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Campus Delivery / Handoff Point
                  </label>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="e.g. Queen Esther Hall Wing C, SUB Foyer, CNS Lab"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Always verify items in public campus areas before final payment.</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with Total & Checkout */}
          {!checkoutSuccess && cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-dark-700 bg-slate-50/50 dark:bg-dark-950/50 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Subtotal</span>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Payment upon verified hostel handoff or direct vendor transfer.
              </p>
              <button
                disabled={isCheckingOut}
                onClick={handleSimulateCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-purple hover:from-brand-500 hover:to-accent-purple text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Campus Order...</span>
                ) : (
                  <>
                    <span>Proceed to Campus Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

