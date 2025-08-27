


import React, { useRef, useEffect } from 'react';
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, gutter, GutterMarker } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { linter, lintGutter, Diagnostic as LintDiagnostic } from "@codemirror/lint";
import { oneDark } from '@codemirror/theme-one-dark';
import type { Diagnostic } from '../types';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  path: string;
  diagnostics: Diagnostic[];
  breakpoints: number[];
  onBreakpointsChange: (path: string, newBreakpoints: number[]) => void;
  onEditorMount: (editor: EditorView) => void;
}

const languageConf = new Compartment();

const getLanguageExtension = (path: string) => {
    if (path.endsWith('.jsx') || path.endsWith('.tsx')) return javascript({ jsx: true, typescript: true });
    if (path.endsWith('.js')) return javascript({ jsx: true });
    if (path.endsWith('.ts')) return javascript({ typescript: true });
    if (path.endsWith('.html')) return html();
    if (path.endsWith('.css')) return css();
    return javascript();
};

const glassTheme = EditorView.theme({
    "&": {
        backgroundColor: "transparent",
        color: "#d4d4d4",
        height: "100%"
    },
    ".cm-content": {
        caretColor: "var(--accent)",
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "var(--accent)"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "rgba(79, 70, 229, 0.3)"
    },
    ".cm-gutters": {
        backgroundColor: "transparent",
        color: "#858585",
        border: "none"
    },
    ".cm-lineNumbers .cm-gutterElement": {
        padding: "0 8px",
    },
    ".cm-activeLineGutter": {
        backgroundColor: "rgba(255, 255, 255, 0.05)"
    }
}, {dark: true});

// Define a named class for the GutterMarker to avoid TypeScript inference issues.
class BreakpointMarker extends GutterMarker {
    toDOM() { return document.createTextNode("🔴"); }
}
const breakpointMarker = new BreakpointMarker();


const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
    value, onChange, path, diagnostics, breakpoints, onBreakpointsChange, onEditorMount
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const onUpdate = EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                onChange(update.state.doc.toString());
            }
        });

        const diagnosticLinter = linter(view => {
            return diagnostics.map((d): LintDiagnostic => ({
                from: view.state.doc.line(d.line).from + d.startCol - 1,
                to: view.state.doc.line(d.line).from + d.endCol - 1,
                severity: d.severity as "error" | "warning" | "info",
                message: d.message,
                source: d.source,
            }));
        });
        
        const breakpointGutter = gutter({
            class: "cm-breakpoint-gutter",
            // FIX: Use `lineMarker` for line-based markers, which is simpler and correct for breakpoints.
            // This avoids the TypeScript error with `.range()` and is more efficient.
            lineMarker: (view, line) => {
                const lineNumber = view.state.doc.lineAt(line.from).number;
                return breakpoints.includes(lineNumber) ? breakpointMarker : null;
            },
            initialSpacer: () => breakpointMarker,
            domEventHandlers: {
                mousedown(view, line, event) {
                    // FIX: Correctly get the line number from the BlockInfo object.
                    const lineNumber = view.state.doc.lineAt(line.from).number;
                    const newBreakpoints = breakpoints.includes(lineNumber)
                        ? breakpoints.filter(b => b !== lineNumber)
                        : [...breakpoints, lineNumber].sort((a,b) => a-b);
                    onBreakpointsChange(path, newBreakpoints);
                    return true;
                }
            }
        });

        const startState = EditorState.create({
            doc: value,
            extensions: [
                lineNumbers(),
                history(),
                keymap.of([...defaultKeymap, ...historyKeymap]),
                languageConf.of(getLanguageExtension(path)),
                onUpdate,
                oneDark, // Using a base theme for syntax highlighting
                glassTheme, // Overriding for glassy appearance
                diagnosticLinter,
                lintGutter(),
                breakpointGutter,
            ],
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current,
        });
        viewRef.current = view;
        onEditorMount(view);

        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, []);

    useEffect(() => {
        const view = viewRef.current;
        if (view) {
             view.dispatch({
                effects: languageConf.reconfigure(getLanguageExtension(path))
            });
        }
    }, [path]);
    
     useEffect(() => {
        const view = viewRef.current;
        if (view && value !== view.state.doc.toString()) {
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: value }
            });
        }
    }, [value]);

    useEffect(() => {
        // Force re-render of gutters when diagnostics or breakpoints change
        const view = viewRef.current;
        if(view) {
            view.dispatch({ effects: [] });
        }
    }, [diagnostics, breakpoints]);

    return <div ref={editorRef} className="h-full w-full overflow-y-auto" />;
};

export default CodeMirrorEditor;