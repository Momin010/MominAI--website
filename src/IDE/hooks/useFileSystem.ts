
import { useState, useEffect, useCallback, useRef } from 'react';
import type { WebContainer } from '@webcontainer/api';
import { useWebContainer } from '../WebContainerProvider';
import type { Directory, FileSystemNode } from '../types';

const readDirectory = async (wc: WebContainer, path: string): Promise<Directory> => {
    const entries = await wc.fs.readdir(path, { withFileTypes: true });
    const children: { [key: string]: FileSystemNode } = {};

    for (const entry of entries) {
        const newPath = path === '/' ? `/${entry.name}` : `${path}/${entry.name}`;
        if (entry.isDirectory()) {
            children[entry.name] = await readDirectory(wc, newPath);
        } else {
            const content = await wc.fs.readFile(newPath, 'utf-8');
            children[entry.name] = { type: 'file', content };
        }
    }
    return { type: 'directory', children };
};

export const useFileSystem = () => {
    const { webContainer, isLoading: isWebContainerLoading } = useWebContainer();
    const [fs, setFs] = useState<Directory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isSyncing = useRef(false);

    const syncFsFromWebContainer = useCallback(async () => {
        if (!webContainer || isSyncing.current) return;
        isSyncing.current = true;
        setIsLoading(true);
        try {
            const root = await readDirectory(webContainer, '/');
            setFs(root);
        } catch (error) {
            console.error("Failed to sync filesystem from WebContainer:", error);
        } finally {
            setIsLoading(false);
            isSyncing.current = false;
        }
    }, [webContainer]);

    useEffect(() => {
        if (!isWebContainerLoading && webContainer) {
            syncFsFromWebContainer();
        }
    }, [isWebContainerLoading, webContainer, syncFsFromWebContainer]);

    const getNode = useCallback((path: string): FileSystemNode | null => {
        if (!fs || path === '/') return fs;
        const parts = path.split('/').filter(p => p);
        let currentNode: FileSystemNode = fs;
        for (const part of parts) {
            if (currentNode.type === 'directory' && currentNode.children[part]) {
                currentNode = currentNode.children[part];
            } else {
                return null;
            }
        }
        return currentNode;
    }, [fs]);

    const createNode = useCallback(async (path: string, type: 'file' | 'directory', content = '') => {
        if (!webContainer) return;
        if (type === 'file') {
            const parentDir = path.substring(0, path.lastIndexOf('/'));
            if(parentDir) {
                await webContainer.fs.mkdir(parentDir, { recursive: true });
            }
            await webContainer.fs.writeFile(path, content);
        } else {
            await webContainer.fs.mkdir(path, { recursive: true });
        }
        await syncFsFromWebContainer();
    }, [webContainer, syncFsFromWebContainer]);

    const updateNode = useCallback(async (path: string, content: string) => {
        if (!webContainer) return;
        await webContainer.fs.writeFile(path, content);
        
        // Optimistic update to avoid full re-read
        setFs(prevFs => {
            if (!prevFs) return null;
            const newFs = JSON.parse(JSON.stringify(prevFs)); // Deep clone
            const parts = path.split('/').filter(p => p);
            let currentNode: FileSystemNode = newFs;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (currentNode.type === 'directory') {
                    currentNode = currentNode.children[part];
                }
            }
            if (currentNode.type === 'directory') {
                const fileName = parts[parts.length - 1];
                const fileNode = currentNode.children[fileName];
                if (fileNode?.type === 'file') {
                    fileNode.content = content;
                }
            }
            return newFs;
        });
    }, [webContainer]);

    const deleteNode = useCallback(async (path: string) => {
        if (!webContainer) return;
        await webContainer.fs.rm(path, { recursive: true });
        await syncFsFromWebContainer();
    }, [webContainer, syncFsFromWebContainer]);
    
    const renameNode = useCallback(async (oldPath: string, newName: string) => {
        if (!webContainer) return;
        const parentPath = oldPath.substring(0, oldPath.lastIndexOf('/')) || '/';
        const newPath = parentPath === '/' ? `/${newName}` : `${parentPath}/${newName}`;
        await webContainer.fs.rename(oldPath, newPath);
        await syncFsFromWebContainer();
    }, [webContainer, syncFsFromWebContainer]);

    const moveNode = useCallback(async (sourcePath: string, destDir: string) => {
        if (!webContainer) return;
        const name = sourcePath.split('/').pop();
        if(!name) return;
        const newPath = destDir === '/' ? `/${name}` : `${destDir}/${name}`;
        await webContainer.fs.rename(sourcePath, newPath);
        await syncFsFromWebContainer();
    }, [webContainer, syncFsFromWebContainer]);
    
    const scaffoldProject = useCallback(async (files: Record<string, string>) => {
        if (!webContainer) return;
        setIsLoading(true);
        for (const path in files) {
            const content = files[path];
            const parentDir = path.substring(0, path.lastIndexOf('/'));
            if (parentDir) {
                await webContainer.fs.mkdir(parentDir, { recursive: true });
            }
            await webContainer.fs.writeFile(path, content);
        }
        await syncFsFromWebContainer();
    }, [webContainer, syncFsFromWebContainer]);
    
    const replaceFs = useCallback(async (newFs: Directory) => {
        if (!webContainer) return;
        setIsLoading(true);
        // A bit risky, maybe we should remove contents of root instead
        const entries = await webContainer.fs.readdir('/');
        for(const entry of entries) {
           await webContainer.fs.rm(`/${entry}`, { recursive: true });
        }
        
        const writeDir = async (dir: Directory, currentPath: string) => {
            for(const name in dir.children) {
                const child = dir.children[name];
                const newPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
                if(child.type === 'directory') {
                    await webContainer.fs.mkdir(newPath, { recursive: true });
                    await writeDir(child, newPath);
                } else {
                    await webContainer.fs.writeFile(newPath, child.content);
                }
            }
        }
        
        await writeDir(newFs, '/');
        await syncFsFromWebContainer();

    }, [webContainer, syncFsFromWebContainer]);

    return {
        fs,
        isLoading: isLoading || isWebContainerLoading,
        createNode,
        readNode: (path: string) => {
            const node = getNode(path);
            return node?.type === 'file' ? node.content : null;
        },
        updateNode,
        deleteNode,
        renameNode,
        moveNode,
        scaffoldProject,
        getNode,
        replaceFs,
    };
};
