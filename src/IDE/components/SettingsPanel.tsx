

import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { fetchGithubUser } from '../services/githubService';
import GithubAuthModal from './GithubAuthModal';
import { useNotifications } from '../App';
import type { SupabaseUser } from '../types';
import * as supabaseService from '../services/supabaseService';
import SupabaseAuthModal from './SupabaseAuthModal';

interface SettingsPanelProps {
  githubToken: string | null;
  setGithubToken: (token: string | null) => void;
  supabaseUser: SupabaseUser | null;
  supabaseUrl: string | null;
  setSupabaseUrl: (url: string | null) => void;
  supabaseAnonKey: string | null;
  setSupabaseAnonKey: (key: string | null) => void;
  geminiApiKey: string | null;
  setGeminiApiKey: (key: string | null) => void;
}

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    githubToken,
    setGithubToken,
    supabaseUser,
    supabaseUrl,
    setSupabaseUrl,
    supabaseAnonKey,
    setSupabaseAnonKey,
    geminiApiKey,
    setGeminiApiKey
}) => {
    const { theme, setTheme } = useTheme();
    const [isGithubAuthModalOpen, setIsGithubAuthModalOpen] = useState(false);
    const [isSupabaseAuthModalOpen, setIsSupabaseAuthModalOpen] = useState(false);
    const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const { addNotification } = useNotifications();
    
    const [localSupabaseUrl, setLocalSupabaseUrl] = useState(supabaseUrl || '');
    const [localSupabaseAnonKey, setLocalSupabaseAnonKey] = useState(supabaseAnonKey || '');
    const [localGeminiKey, setLocalGeminiKey] = useState('');


    useEffect(() => {
        const getUser = async () => {
            if (githubToken) {
                setIsLoadingUser(true);
                try {
                    const user = await fetchGithubUser(githubToken);
                    setGithubUser(user);
                } catch (error) {
                    addNotification({ type: 'error', message: 'Invalid GitHub token. Please reconnect.' });
                    setGithubToken(null);
                    setGithubUser(null);
                } finally {
                    setIsLoadingUser(false);
                }
            } else {
                setGithubUser(null);
            }
        };
        getUser();
    }, [githubToken, setGithubToken, addNotification]);

    const handleGithubDisconnect = () => {
        setGithubToken(null);
        addNotification({ type: 'info', message: 'Disconnected from GitHub.' });
    };

    const handleSupabaseDisconnect = async () => {
        const { error } = await supabaseService.signOut();
        if (error) {
            addNotification({ type: 'error', message: `Sign out failed: ${error.message}` });
        }
        setLocalSupabaseUrl('');
        setLocalSupabaseAnonKey('');
        setSupabaseUrl(null);
        setSupabaseAnonKey(null);
        localStorage.removeItem('supabaseUrl');
        localStorage.removeItem('supabaseAnonKey');
        addNotification({ type: 'info', message: 'Disconnected from Supabase and credentials cleared.' });
    };

    const handleSaveSupabaseConfig = () => {
        if (!localSupabaseUrl.trim() || !localSupabaseAnonKey.trim()) {
            addNotification({ type: 'warning', message: 'Both Supabase URL and Key are required.' });
            return;
        }
        localStorage.setItem('supabaseUrl', localSupabaseUrl);
        localStorage.setItem('supabaseAnonKey', localSupabaseAnonKey);
        setSupabaseUrl(localSupabaseUrl);
        setSupabaseAnonKey(localSupabaseAnonKey);
        addNotification({ type: 'success', message: 'Supabase configuration saved. You can now connect.' });
    };

    const handleSaveGeminiKey = () => {
        if (localGeminiKey.trim()) {
            setGeminiApiKey(localGeminiKey.trim());
            addNotification({ type: 'success', message: 'Gemini API Key saved.' });
            setLocalGeminiKey('');
        }
    };
    
    const handleClearGeminiKey = () => {
        setGeminiApiKey(null);
        addNotification({ type: 'info', message: 'Gemini API Key cleared.' });
    };


    return (
        <div className="text-gray-200 h-full flex flex-col bg-transparent">
            <div className="p-2 border-b border-[var(--border-color)] flex-shrink-0">
                <h2 className="text-sm font-bold uppercase tracking-wider">Settings</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-6">
                <div>
                    <h3 className="text-md font-semibold mb-2 text-white">Gemini API Key</h3>
                    {geminiApiKey ? (
                        <div className="bg-[var(--gray-dark)]/50 border border-[var(--border-color)] p-4 rounded-lg flex items-center justify-between">
                            <p className="text-sm text-green-400">API Key is set and active.</p>
                            <button onClick={handleClearGeminiKey} className="bg-red-500/80 hover:bg-red-500/70 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                                Clear Key
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[var(--gray-dark)]/50 border border-[var(--border-color)] p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-3">
                                Provide your own Gemini API key to enable all AI features. 
                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline ml-1">
                                    Get a key from Google AI Studio.
                                </a>
                            </p>
                            <div className="flex space-x-2">
                                <input
                                    type="password"
                                    placeholder="Enter your API Key..."
                                    value={localGeminiKey}
                                    onChange={(e) => setLocalGeminiKey(e.target.value)}
                                    className="flex-grow bg-[var(--gray-dark)] border border-[var(--border-color)] p-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
                                />
                                <button onClick={handleSaveGeminiKey} className="bg-[var(--accent)]/80 hover:brightness-125 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* GitHub Integration Section */}
                <div>
                    <h3 className="text-md font-semibold mb-2 text-white">GitHub Integration</h3>
                    {githubUser ? (
                        <div className="bg-[var(--gray-dark)]/50 border border-[var(--border-color)] p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img src={githubUser.avatar_url} alt="GitHub avatar" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{githubUser.login}</p>
                                        <a href={githubUser.html_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline">View Profile</a>
                                    </div>
                                </div>
                                <button onClick={handleGithubDisconnect} className="bg-red-500/80 hover:bg-red-500/70 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsGithubAuthModalOpen(true)} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Connect to GitHub
                        </button>
                    )}
                </div>

                {/* Supabase Integration Section */}
                <div>
                    <h3 className="text-md font-semibold mb-2 text-white">Supabase Cloud Sync</h3>
                    {supabaseUser ? (
                        <div className="bg-[var(--gray-dark)]/50 border border-[var(--border-color)] p-4 rounded-lg flex items-center justify-between">
                             <p className="text-sm">Connected as <span className="font-semibold">{supabaseUser.email}</span></p>
                             <button onClick={handleSupabaseDisconnect} className="bg-red-500/80 hover:bg-red-500/70 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
                                Disconnect
                            </button>
                        </div>
                    ) : (
                         <div className="bg-[var(--gray-dark)]/50 border border-[var(--border-color)] p-4 rounded-lg space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Supabase URL</label>
                                <input type="text" value={localSupabaseUrl} onChange={(e) => setLocalSupabaseUrl(e.target.value)} placeholder="https://<project-ref>.supabase.co" className="w-full bg-[var(--gray-dark)] border border-[var(--border-color)] p-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Supabase Anon Key</label>
                                <input type="password" value={localSupabaseAnonKey} onChange={(e) => setLocalSupabaseAnonKey(e.target.value)} placeholder="Your anon public key" className="w-full bg-[var(--gray-dark)] border border-[var(--border-color)] p-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button onClick={handleSaveSupabaseConfig} className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">Save Config</button>
                                <button onClick={() => setIsSupabaseAuthModalOpen(true)} disabled={!supabaseUrl || !supabaseAnonKey} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold disabled:opacity-50">Connect</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Theme Selector Section */}
                <div>
                    <h3 className="text-md font-semibold mb-2 text-white">Theme</h3>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                        className="w-full bg-[var(--gray-dark)] border border-[var(--border-color)] p-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                        <option value="deep-space">Deep Space (Dark)</option>
                        <option value="nordic-light">Nordic Light</option>
                    </select>
                </div>
            </div>
             {isGithubAuthModalOpen && (
                <GithubAuthModal
                    onClose={() => setIsGithubAuthModalOpen(false)}
                    onConnect={(token) => {
                        setGithubToken(token);
                        setIsGithubAuthModalOpen(false);
                        addNotification({ type: 'success', message: 'Successfully connected to GitHub!' });
                    }}
                />
            )}
            {isSupabaseAuthModalOpen && (
                <SupabaseAuthModal 
                    onClose={() => setIsSupabaseAuthModalOpen(false)} 
                    addNotification={addNotification} 
                />
            )}
        </div>
    );
};

export default SettingsPanel;
