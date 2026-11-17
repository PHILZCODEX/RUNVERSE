import React from 'react';
import { KeyRound, X, Check, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export const BrowserPasswordSavePrompt: React.FC = () => {
  const { savePasswordPrompt, savedCredentials, closeSavePasswordPrompt, confirmSavePassword } = useAuth();
  const { showToast } = useNotifications();

  if (!savePasswordPrompt || !savedCredentials) return null;

  const handleSave = () => {
    confirmSavePassword();
    showToast('Password Saved to Device', `Credentials for ${savedCredentials.username} saved securely on your browser.`, 'success');
  };

  const handleDismiss = () => {
    closeSavePasswordPrompt();
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300">
      <div className="p-4 rounded-2xl bg-black/95 text-white border border-brand-500/40 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Save Password to Phone / Browser?</span>
                <Shield className="w-3.5 h-3.5 text-brand-400" />
              </h4>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                Chrome / Safari password manager autofill
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-zinc-500 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-1 font-mono">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Account:</span>
            <span className="text-white font-bold">{savedCredentials.username}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Password:</span>
            <span className="text-brand-400 font-bold">{savedCredentials.passwordMasked}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white font-semibold transition"
          >
            Never
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold flex items-center gap-1 shadow-lg shadow-brand-500/25 transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Password</span>
          </button>
        </div>
      </div>
    </div>
  );
};

