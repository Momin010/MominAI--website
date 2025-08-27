// This service contains functions to programmatically control the Monaco editor instance,
// simulating a user's actions based on the AI agent's commands.

declare const window: any;

const TYPING_DELAY_MS = 20; // ms between each character typed by the AI

/**
 * Types text into the editor at the current cursor position with a realistic delay.
 */
export const typeText = async (editor: any, text: string): Promise<void> => {
    if (!editor) return;
    const model = editor.getModel();
    if (!model) return;

    // Split by character to simulate typing, preserving newlines
    const characters = text.split('');

    for (const char of characters) {
        const position = editor.getPosition();
        const range = new window.monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
        
        // Use executeEdits for better performance and undo/redo stack integration
        model.pushEditOperations(
            [], // previous selections
            [{
                range: range,
                text: char,
                forceMoveMarkers: true,
            }],
            () => null // undo callback
        );
        
        // Trigger a re-layout to ensure the editor viewport follows the typing
        editor.revealPosition(editor.getPosition(), window.monaco.editor.ScrollType.Immediate);
        
        await new Promise(resolve => setTimeout(resolve, TYPING_DELAY_MS));
    }
};

/**
 * Moves the cursor to a specific line and column.
 */
export const moveCursor = async (editor: any, line: number, column: number): Promise<void> => {
    if (!editor) return;
    const position = { lineNumber: line, column: column };
    editor.setPosition(position);
    editor.revealPosition(position, window.monaco.editor.ScrollType.Immediate);
    editor.focus();
};

/**
 * Selects a block of text from a start to an end position.
 */
export const selectText = async (editor: any, startLine: number, startColumn: number, endLine: number, endColumn: number): Promise<void> => {
    if (!editor) return;
    const range = new window.monaco.Range(startLine, startColumn, endLine, endColumn);
    editor.setSelection(range);
    editor.revealRange(range);
};

/**
 * Replaces the currently selected text with new text.
 */
export const replaceText = async (editor: any, text: string): Promise<void> => {
    if (!editor) return;
    const selection = editor.getSelection();
    if (!selection) return;

    editor.executeEdits('ai-agent', [{
        range: selection,
        text: text,
        forceMoveMarkers: true,
    }]);
};

/**
 * Deletes a specified number of lines forward from the current cursor position.
 */
export const deleteText = async (editor: any, linesToDelete: number): Promise<void> => {
    if (!editor) return;
    const position = editor.getPosition();
    if (!position) return;
    
    const endLine = Math.min(position.lineNumber + linesToDelete - 1, editor.getModel().getLineCount());
    
    // Select the lines to delete, including the full last line and the newline of the previous line
    const range = new window.monaco.Range(position.lineNumber, 1, endLine + 1, 1);
    
    editor.executeEdits('ai-agent', [{
        range: range,
        text: '',
        forceMoveMarkers: true,
    }]);
};
