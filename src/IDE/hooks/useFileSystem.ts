
import { useState, useEffect, useCallback } from 'react';
import type { WebContainer } from '@webcontainer/api';
import { useWebContainer } from '../WebContainerProvider.tsx';
import type { Directory, FileSystemNode, File } from '../types.ts';

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
    const { webContainer, fs: initialFs } = useWebContainer();
    const [fs, setFs] = useState<Directory | null>(initialFs);
    
    useEffect(() => {
        if (initialFs) {
            setFs(initialFs);
        }
    }, [initialFs]);

    const syncFsFromWebContainer = useCallback(async () => {
        if (!webContainer) return;
        try {
            const root = await readDirectory(webContainer, '/');
            setFs(root);
        } catch (error) {
            console.error("Failed to re-sync filesystem from WebContainer:", error);
        }
    }, [webContainer]);

    const updateNode = useCallback(async (path: string, content: string) => {
        if (!webContainer) return;
        await webContainer.fs.writeFile(path, content);
        
        setFs(prevFs => {
            if (!prevFs) return null;
            const newFs = JSON.parse(JSON.stringify(prevFs));
            const parts = path.split('/').filter(p => p);
            let currentNode: Directory = newFs;

            for (let i = 0; i < parts.length - 1; i++) {
                currentNode = currentNode.children[parts[i]] as Directory;
            }

            const fileName = parts[parts.length - 1];
            const fileNode = currentNode.children[fileName];
            if (fileNode?.type === 'file') {
                (fileNode as File).content = content;
            }
            return newFs;
        });
    }, [webContainer]);
    
    const createNode = useCallback(async (path: string, type: 'file' | 'directory', content = '') => {
        if (!webContainer) return;
        if (type === 'file') {
            await webContainer.fs.writeFile(path, content);
        } else {
            await webContainer.fs.mkdir(path, { recursive: true });
        }
        await syncFsFromWebContainer();
    }, [webContainer, syncFsFromWebContainer]);

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

    return {
        fs,
        updateNode,
        createNode,
        deleteNode,
        renameNode,
        moveNode,
    };
};
