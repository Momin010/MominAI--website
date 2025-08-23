/**
 * Sucrase is a fast TypeScript/JSX transpiler.
 * https://github.com/alangpierce/sucrase
 *
 * This is a bundled version of Sucrase for in-browser use.
 */
var sucrase = (function (exports) {
  'use strict';
  
  function getVersion() {
    return "3.35.0";
  }

  var Transform = /* @__PURE__ */ ((Transform2) => {
    Transform2[Transform2["JSX"] = 0] = "JSX";
    Transform2[Transform2["TypeScript"] = 1] = "TypeScript";
    Transform2[Transform2["Flow"] = 2] = "Flow";
    Transform2[Transform2["Imports"] = 3] = "Imports";
    Transform2[Transform2["ReactHotLoader"] = 4] = "ReactHotLoader";
    Transform2[Transform2["NumericSeparator"] = 5] = "NumericSeparator";
    Transform2[Transform2["OptionalChaining"] = 6] = "OptionalChaining";
    Transform2[Transform2["NullishCoalescing"] = 7] = "NullishCoalescing";
    Transform2[Transform2["ClassFields"] = 8] = "ClassFields";
    Transform2[Transform2["OptionalCatchBinding"] = 9] = "OptionalCatchBinding";
    Transform2[Transform2["Jest"] = 10] = "Jest";
    return Transform2;
  })(Transform || {});
  const JS_TRANSFORMS = [
    Transform.OptionalCatchBinding,
    Transform.NumericSeparator,
    Transform.OptionalChaining,
    Transform.NullishCoalescing,
    Transform.ClassFields
  ];
  function getEnabledTransforms(options) {
    const {
      transforms,
      jsxPragma,
      jsxFragmentPragma,
      enableLegacyTypeScriptModuleInterop,
      enableLegacyBabel5ModuleInterop,
      production,
      disableESTransforms,
      preserveDynamicImport,
      injectCreateRequireForImportRequire
    } = options;
    const isJSXEnabled = transforms.includes("jsx");
    const isTypeScriptEnabled = transforms.includes("typescript");
    const isFlowEnabled = transforms.includes("flow");
    const isImportsEnabled = transforms.includes("imports");
    const isReactHotLoaderEnabled = transforms.includes("react-hot-loader");
    const isJestEnabled = transforms.includes("jest");
    if (isJSXEnabled) {
      if (isTypeScriptEnabled) {
        throw new Error("The `jsx` and `typescript` transforms cannot be enabled at the same time.");
      }
      if (isFlowEnabled) {
        throw new Error("The `jsx` and `flow` transforms cannot be enabled at the same time.");
      }
    }
    const enabledTransforms = /* @__PURE__ */ new Set();
    if (isJSXEnabled) {
      enabledTransforms.add(Transform.JSX);
    }
    if (isTypeScriptEnabled) {
      enabledTransforms.add(Transform.TypeScript);
    }
    if (isFlowEnabled) {
      enabledTransforms.add(Transform.Flow);
    }
    if (isImportsEnabled || isJestEnabled) {
      enabledTransforms.add(Transform.Imports);
    }
    if (isReactHotLoaderEnabled) {
      enabledTransforms.add(Transform.ReactHotLoader);
    }
    if (isJestEnabled) {
      enabledTransforms.add(Transform.Jest);
    }
    if (!disableESTransforms) {
      for (const transform of JS_TRANSFORMS) {
        enabledTransforms.add(transform);
      }
    }
    return {
      transforms: enabledTransforms,
      isJSXEnabled,
      isTypeScriptEnabled,
      isFlowEnabled,
      isImportsEnabled,
      isReactHotLoaderEnabled,
      isJestEnabled,
      options: {
        jsxPragma: jsxPragma || "React.createElement",
        jsxFragmentPragma: jsxFragmentPragma || "React.Fragment",
        enableLegacyTypeScriptModuleInterop: enableLegacyTypeScriptModuleInterop || false,
        enableLegacyBabel5ModuleInterop: enableLegacyBabel5ModuleInterop || false,
        production: production || false,
        preserveDynamicImport: preserveDynamicImport || false,
        injectCreateRequireForImportRequire: injectCreateRequireForImportRequire || false
      }
    };
  }
  class SucraseContext {
    constructor(tokenProcessor, nameManager, importProcessor) {
      this.tokenProcessor = tokenProcessor;
      this.nameManager = nameManager;
      this.importProcessor = importProcessor;
    }
  }
  function getSucraseContext(code, options) {
    const {
      transforms,
      isTypeScriptEnabled,
      isFlowEnabled,
      isImportsEnabled,
      options: sucraseOptions
    } = getEnabledTransforms(options);
    const isJSXEnabled = transforms.has(Transform.JSX) || isTypeScriptEnabled;
    const tokens = [];
    for (const token of tokenizer(code, { isJSXEnabled, isTypeScriptEnabled, isFlowEnabled })) {
      tokens.push(token);
    }
    const tokenProcessor = new TokenProcessor(code, tokens, false, sucraseOptions);
    const nameManager = new NameManager(code, tokens);
    let importProcessor = null;
    if (isImportsEnabled) {
      importProcessor = new CJSImportProcessor(
        nameManager,
        tokenProcessor,
        sucraseOptions.enableLegacyBabel5ModuleInterop,
        sucraseOptions.enableLegacyTypeScriptModuleInterop,
        sucraseOptions.injectCreateRequireForImportRequire,
        false
      );
      importProcessor.preprocess();
    }
    return new SucraseContext(tokenProcessor, nameManager, importProcessor);
  }
  function transform(code, options) {
    try {
      const {
        transforms,
        isJSXEnabled,
        isTypeScriptEnabled,
        isFlowEnabled,
        isImportsEnabled,
        isReactHotLoaderEnabled,
        isJestEnabled,
        options: sucraseOptions
      } = getEnabledTransforms(options);
      const nameManager = new NameManager(code, []);
      const sucraseContext = new SucraseContext(
        new TokenProcessor(code, [], false, sucraseOptions),
        nameManager,
        null
      );
      const tokens = [];
      for (const token of tokenizer(code, {
        isJSXEnabled: isJSXEnabled || isTypeScriptEnabled,
        isTypeScriptEnabled,
        isFlowEnabled
      })) {
        tokens.push(token);
      }
      sucraseContext.tokenProcessor.setTokens(tokens);
      nameManager.setTokens(tokens);
      const tokenProcessor = sucraseContext.tokenProcessor;
      let importProcessor = null;
      if (isImportsEnabled || isJestEnabled) {
        importProcessor = new CJSImportProcessor(
          nameManager,
          tokenProcessor,
          sucraseOptions.enableLegacyBabel5ModuleInterop,
          sucraseOptions.enableLegacyTypeScriptModuleInterop,
          sucraseOptions.injectCreateRequireForImportRequire,
          isJestEnabled
        );
        importProcessor.preprocess();
        sucraseContext.importProcessor = importProcessor;
      }
      if (isJestEnabled) {
        new JestProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (isImportsEnabled) {
        importProcessor.process();
      }
      if (transforms.has(Transform.ReactHotLoader)) {
        new ReactHotLoaderProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.OptionalCatchBinding)) {
        new OptionalCatchBindingProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.ClassFields)) {
        new ClassFieldsProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.OptionalChaining)) {
        new OptionalChainingProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.NullishCoalescing)) {
        new NullishCoalescingProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.JSX) || transforms.has(Transform.TypeScript)) {
        new JSXProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.TypeScript)) {
        new TypeScriptProcessor(sucraseContext, transforms, sucraseOptions).process();
      } else if (transforms.has(Transform.Flow)) {
        new FlowProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (transforms.has(Transform.NumericSeparator)) {
        new NumericSeparatorProcessor(sucraseContext, transforms, sucraseOptions).process();
      }
      if (isImportsEnabled) {
        new CJSExportProcessor(sucraseContext, transforms, sucraseOptions).process();
        new RootTransformer(sucraseContext, transforms, true, sucraseOptions).process();
      } else if (isReactHotLoaderEnabled) {
        new RootTransformer(sucraseContext, transforms, false, sucraseOptions).process();
      }
      return {
        code: tokenProcessor.finish(),
        sourceMap: options.sourceMapOptions ? tokenProcessor.getSourceMap(options.sourceMapOptions) : void 0,
        tokens: options.returnTokens ? tokenProcessor.getTokens() : void 0
      };
    } catch (e) {
      if (e instanceof Error) {
        const sucraseError = {
          ...e,
          message: e.message,
          loc: {
            line: e.lineNumber,
            column: e.column
          },
          line: e.lineNumber,
          column: e.column
        };
        throw sucraseError;
      }
      throw e;
    }
  }
  class TokenProcessor {
    constructor(code, tokens, isFlow, options) {
      this.code = code;
      this.tokens = tokens;
      this.isFlow = isFlow;
      this.options = options;
      this.currentIndex = 0;
      this.buffer = "";
      this.strings = [];
      this.styles = [];
      this.generatedLine = 1;
      this.generatedColumn = 0;
      this.mappings = [];
      this.lastOriginalLine = 1;
      this.lastOriginalColumn = 0;
      this.lastGeneratedLine = 1;
      this.lastGeneratedColumn = 0;
    }
    setTokens(tokens) {
      this.tokens = tokens;
    }
    getTokens() {
      return this.tokens;
    }
    reset() {
      this.currentIndex = 0;
      this.buffer = "";
      this.strings = [];
      this.styles = [];
      this.generatedLine = 1;
      this.generatedColumn = 0;
      this.mappings = [];
      this.lastOriginalLine = 1;
      this.lastOriginalColumn = 0;
      this.lastGeneratedLine = 1;
      this.lastGeneratedColumn = 0;
    }
    finish() {
      this.processTabsAndNewlines(this.code.length);
      if (this.strings.length > 0) {
        this.buffer += this.code.substring(this.currentIndex);
        return this.strings.join("") + this.buffer;
      } else {
        return this.buffer + this.code.substring(this.currentIndex);
      }
    }
    processTabsAndNewlines(nextIndex) {
      let numNewlines = 0;
      let numTabs = 0;
      for (let i = this.currentIndex; i < nextIndex; i++) {
        const charCode = this.code.charCodeAt(i);
        if (charCode === 10) {
          numNewlines++;
          this.generatedColumn = 0;
        } else if (charCode === 13) {
        } else if (charCode === 9) {
          numTabs++;
        }
      }
      this.generatedLine += numNewlines;
      this.generatedColumn += nextIndex - this.currentIndex - numNewlines - numTabs;
      this.generatedColumn += numTabs * this.options.sourceMapOptions.tabWidth;
    }
    addSourceMapping(token) {
      if (!this.options.sourceMapOptions) {
        return;
      }
      this.processTabsAndNewlines(token.start);
      if (this.generatedLine === this.lastGeneratedLine && this.generatedColumn === this.lastGeneratedColumn) {
        return;
      }
      if (this.generatedLine === this.lastGeneratedLine && token.startLoc.line === this.lastOriginalLine && token.startLoc.column === this.lastOriginalColumn) {
        return;
      }
      if (this.mappings.length > 0) {
        const lastMapping = this.mappings[this.mappings.length - 1];
        if (this.generatedLine === lastMapping.generatedLine) {
          if (this.generatedColumn < lastMapping.generatedColumn) {
            throw new Error("Columns must be increasing.");
          }
          if (this.generatedColumn === lastMapping.generatedColumn) {
            return;
          }
        }
      }
      this.mappings.push({
        generatedLine: this.generatedLine,
        generatedColumn: this.generatedColumn,
        originalLine: token.startLoc.line,
        originalColumn: token.startLoc.column
      });
      this.lastGeneratedLine = this.generatedLine;
      this.lastGeneratedColumn = this.generatedColumn;
      this.lastOriginalLine = token.startLoc.line;
      this.lastOriginalColumn = token.startLoc.column;
    }
    getSourceMap(sourceMapOptions) {
      const vlqEncoder = new VlqEncoder();
      let lastGeneratedLine = 1;
      let lastGeneratedColumn = 0;
      let lastOriginalLine = 1;
      let lastOriginalColumn = 0;
      for (const mapping of this.mappings) {
        if (mapping.generatedLine > lastGeneratedLine) {
          lastGeneratedColumn = 0;
          while (mapping.generatedLine > lastGeneratedLine) {
            vlqEncoder.endLine();
            lastGeneratedLine++;
          }
        }
        vlqEncoder.add(mapping.generatedColumn - lastGeneratedColumn);
        vlqEncoder.add(0);
        vlqEncoder.add(mapping.originalLine - lastOriginalLine);
        vlqEncoder.add(mapping.originalColumn - lastOriginalColumn);
        lastGeneratedColumn = mapping.generatedColumn;
        lastOriginalLine = mapping.originalLine;
        lastOriginalColumn = mapping.originalColumn;
      }
      return {
        version: 3,
        file: sourceMapOptions.compiledFilename,
        sources: [sourceMapOptions.filePath],
        sourcesContent: [this.code],
        names: [],
        mappings: vlqEncoder.finish()
      };
    }
    matchesContextual(contextualKeyword) {
      return this.tokenAt(this.currentIndex).contextualKeyword === contextualKeyword;
    }
    matches1(type) {
      return this.tokenAt(this.currentIndex).type === type;
    }
    matches2(type1, type2) {
      return this.tokenAt(this.currentIndex).type === type1 && this.tokenAt(this.currentIndex + 1).type === type2;
    }
    matches3(type1, type2, type3) {
      return this.tokenAt(this.currentIndex).type === type1 && this.tokenAt(this.currentIndex + 1).type === type2 && this.tokenAt(this.currentIndex + 2).type === type3;
    }
    matches4(type1, type2, type3, type4) {
      return this.tokenAt(this.currentIndex).type === type1 && this.tokenAt(this.currentIndex + 1).type === type2 && this.tokenAt(this.currentIndex + 2).type === type3 && this.tokenAt(this.currentIndex + 4).type === type4;
    }
    matches5(type1, type2, type3, type4, type5) {
      return this.tokenAt(this.currentIndex).type === type1 && this.tokenAt(this.currentIndex + 1).type === type2 && this.tokenAt(this.currentIndex + 2).type === type3 && this.tokenAt(this.currentIndex + 3).type === type4 && this.tokenAt(this.currentIndex + 4).type === type5;
    }
    eatContextual(contextualKeyword) {
      if (this.matchesContextual(contextualKeyword)) {
        this.eat(tt.name);
        return true;
      }
      return false;
    }
    eat(type) {
      if (this.matches1(type)) {
        this.advance();
        return true;
      }
      return false;
    }
    eatTypeToken(tokenType) {
      if (this.tokens[this.currentIndex].type === tokenType && this.tokens[this.currentIndex].isType) {
        this.advance();
        return true;
      }
      return false;
    }
    eatFlowTypeToken(tokenType) {
      if (this.tokens[this.currentIndex].type === tokenType && this.tokens[this.currentIndex].isType) {
        this.advance();
        return true;
      }
      return false;
    }
    isOriginalHere(substring) {
      return this.code.startsWith(substring, this.tokens[this.currentIndex].start);
    }
    identifierName() {
      return this.code.substring(this.tokens[this.currentIndex].start, this.tokens[this.currentIndex].end);
    }
    identifierNameForToken(token) {
      return this.code.substring(token.start, token.end);
    }
    appendCode(code) {
      this.buffer += code;
    }
    tokenAt(index) {
      if (index < 0 || index >= this.tokens.length) {
        return this.tokens[this.tokens.length - 1];
      }
      return this.tokens[index];
    }
    currentToken() {
      return this.tokens[this.currentIndex];
    }
    previousToken() {
      return this.tokens[this.currentIndex - 1];
    }
    nextToken() {
      return this.tokens[this.currentIndex + 1];
    }
    peek(offset = 1) {
      return this.tokens[this.currentIndex + offset];
    }
    replaceToken(newCode) {
      this.addSourceMapping(this.currentToken());
      this.appendCode(newCode);
      this.advance();
    }
    replaceTokenTrimmingLeft(newCode) {
      const token = this.currentToken();
      this.addSourceMapping(token);
      this.buffer += this.code.substring(this.currentIndex, token.start);
      this.currentIndex = token.end;
      this.buffer += newCode;
      this.currentIndex = this.currentToken().start;
      this.advance();
    }
    removeInitialToken() {
      const token = this.currentToken();
      this.addSourceMapping(token);
      this.currentIndex = token.end;
      this.advance();
    }
    removeToken() {
      const token = this.currentToken();
      this.addSourceMapping(token);
      this.buffer += this.code.substring(this.currentIndex, token.start);
      this.currentIndex = token.end;
      this.advance();
    }
    copyExpectedToken(type) {
      if (this.currentToken().type !== type) {
        throw new Error(`Expected token ${type.label}`);
      }
      this.copyToken();
    }
    copyToken() {
      const token = this.currentToken();
      this.addSourceMapping(token);
      this.buffer += this.code.substring(this.currentIndex, token.start);
      this.buffer += this.code.substring(token.start, token.end);
      this.currentIndex = token.end;
      this.advance();
    }
    copyTokenWithPrefix(prefix) {
      const token = this.currentToken();
      this.addSourceMapping(token);
      this.buffer += this.code.substring(this.currentIndex, token.start);
      this.buffer += prefix;
      this.buffer += this.code.substring(token.start, token.end);
      this.currentIndex = token.end;
      this.advance();
    }
    copyTokenWithSuffix(suffix) {
      const token = this.currentToken();
      this.addSourceMapping(token);
      this.buffer += this.code.substring(this.currentIndex, token.start);
      this.buffer += this.code.substring(token.start, token.end);
      this.buffer += suffix;
      this.currentIndex = token.end;
      this.advance();
    }
    copyWhitespace() {
      this.buffer += this.code.substring(this.currentIndex, this.currentToken().start);
      this.currentIndex = this.currentToken().start;
    }
    replaceWhitespace(newCode) {
      this.buffer += newCode;
      this.currentIndex = this.currentToken().start;
    }
    removeWhitespace() {
      this.currentIndex = this.currentToken().start;
    }
    copyTokenUntil(endToken) {
      while (this.currentToken().type !== endToken) {
        this.copyToken();
      }
    }
    copyBalancedCode() {
      let depth = 0;
      if (!this.matches1(tt.braceL)) {
        throw new Error("Tried to copy balanced code without starting at an open brace.");
      }
      do {
        if (this.matches1(tt.braceL)) {
          depth++;
        } else if (this.matches1(tt.braceR)) {
          depth--;
        }
        this.copyToken();
      } while (depth > 0);
    }
    isInString() {
      const token = this.currentToken();
      if (token.type !== tt.string) {
        return false;
      }
      const numBackslashes = this.code.substring(token.start + 1, token.end - 1).match(/\\*$/)[0].length;
      return numBackslashes % 2 === 0;
    }
    advance() {
      if (!this.isAtEnd()) {
        this.currentIndex++;
      }
    }
    isAtEnd() {
      return this.currentIndex >= this.tokens.length - 1;
    }
    snapshot() {
      return this.currentIndex;
    }
    restoreToSnapshot(snapshot) {
      while (this.currentIndex > snapshot) {
        this.currentIndex--;
        this.buffer += this.code.substring(
          this.tokens[this.currentIndex].start,
          this.tokens[this.currentIndex + 1].start
        );
      }
    }
    toString() {
      return this.tokens.map((t) => t.type.label).join(", ");
    }
  }
  class VlqEncoder {
    constructor() {
      this.encoded = "";
      this.VLQ_BASE_SHIFT = 5;
      this.VLQ_BASE = 1 << this.VLQ_BASE_SHIFT;
      this.VLQ_BASE_MASK = this.VLQ_BASE - 1;
      this.VLQ_CONTINUATION_BIT = this.VLQ_BASE;
      this.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    }
    encode(num) {
      let encoded = "";
      let vlq = this.toVLQSigned(num);
      do {
        let digit = vlq & this.VLQ_BASE_MASK;
        vlq >>>= this.VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= this.VLQ_CONTINUATION_BIT;
        }
        encoded += this.base64Encode(digit);
      } while (vlq > 0);
      return encoded;
    }
    toVLQSigned(num) {
      return num < 0 ? (-num << 1) + 1 : (num << 1) + 0;
    }
    base64Encode(num) {
      return this.BASE64_CHARS[num];
    }
    add(num) {
      this.encoded += this.encode(num);
    }
    endLine() {
      this.encoded += ";";
    }
    finish() {
      return this.encoded;
    }
  }
  var charCodes = {
    A: 65,
    Z: 90,
    a: 97,
    z: 122,
    _0: 48,
    _9: 57,
    $: 36,
    _: 95
  };
  class NameManager {
    constructor(code, tokens) {
      this.code = code;
      this.tokens = tokens;
      this.usedNames = /* @__PURE__ */ new Set();
      this.findUsedNames();
    }
    setTokens(tokens) {
      this.tokens = tokens;
      this.findUsedNames();
    }
    findUsedNames() {
      this.usedNames.clear();
      for (const token of this.tokens) {
        if (token.type === tt.name) {
          this.usedNames.add(this.code.substring(token.start, token.end));
        }
      }
    }
    claimFreeName(name) {
      if (!this.usedNames.has(name)) {
        this.usedNames.add(name);
        return name;
      }
      let i = 2;
      while (this.usedNames.has(name + i)) {
        i++;
      }
      this.usedNames.add(name + i);
      return name + i;
    }
    getFreeName(name) {
      if (!this.usedNames.has(name)) {
        return name;
      }
      let i = 2;
      while (this.usedNames.has(name + i)) {
        i++;
      }
      return name + i;
    }
  }
  class CJSImportProcessor {
    constructor(nameManager, tokens, isLegacyBabel5, isLegacyTypeScript, injectCreateRequireForImportRequire, isJest) {
      this.nameManager = nameManager;
      this.tokens = tokens;
      this.isLegacyBabel5 = isLegacyBabel5;
      this.isLegacyTypeScript = isLegacyTypeScript;
      this.injectCreateRequireForImportRequire = injectCreateRequireForImportRequire;
      this.isJest = isJest;
      this.imports = /* @__PURE__ */ new Map();
      this.importInfoByDecoration = /* @__PURE__ */ new Map();
      this.helpers = /* @__PURE__ */ new Set();
      this.nextFreeImportIndex = 0;
    }
    preprocess() {
      for (let i = 0; i < this.tokens.tokens.length; i++) {
        if (this.tokens.matches1(tt._import) && !this.tokens.matches2(tt._import, tt.parenL)) {
          this.preprocessImportAtIndex(i);
        } else if (this.tokens.matches1(tt._export)) {
          this.preprocessExportAtIndex(i);
        }
      }
    }
    preprocessImportAtIndex(index) {
      if (this.tokens.matches2(tt._import, tt.name) && this.tokens.matchesContextualAtIndex(index + 1, "type")) {
        return;
      }
      if (this.tokens.matches2(tt._import, tt.braceL) || this.tokens.matches2(tt._import, tt.name) || this.tokens.matches2(tt._import, tt.star)) {
        const importInfo = this.parseImport(index);
        this.imports.set(importInfo.source, importInfo);
        for (const [name, decoratedName] of importInfo.names) {
          this.importInfoByDecoration.set(decoratedName, { importInfo, name });
        }
        for (const [name, decoratedName] of importInfo.types) {
          this.importInfoByDecoration.set(decoratedName, { importInfo, name, isType: true });
        }
        if (importInfo.defaultName) {
          this.importInfoByDecoration.set(importInfo.defaultName, {
            importInfo,
            name: "default"
          });
        }
        if (importInfo.namespaceName) {
          this.importInfoByDecoration.set(importInfo.namespaceName, {
            importInfo,
            name: null
          });
        }
      }
    }
    parseImport(index) {
      this.tokens.copyToken();
      const defaultName = this.parseDefaultImport();
      if (this.tokens.matches1(tt.comma)) {
        this.tokens.copyToken();
      }
      const namespaceName = this.parseNamespaceImport();
      const { names, types } = this.parseNamedImports();
      this.tokens.copyExpectedToken(tt._from);
      const source = this.tokens.identifierName();
      this.tokens.copyToken();
      if (this.tokens.matches1(tt.semi)) {
        this.tokens.copyToken();
      }
      return {
        source,
        sourceNeedsWrapping: false,
        defaultName,
        namespaceName,
        names,
        types
      };
    }
    parseDefaultImport() {
      if (!this.tokens.matches1(tt.name)) {
        return null;
      }
      return this.tokens.identifierName();
    }
    parseNamespaceImport() {
      if (!this.tokens.matches2(tt.star, tt._as)) {
        return null;
      }
      return this.tokens.identifierNameForToken(this.tokens.tokenAt(this.tokens.currentIndex + 2));
    }
    parseNamedImports() {
      const names = /* @__PURE__ */ new Map();
      const types = /* @__PURE__ */ new Map();
      if (!this.tokens.matches1(tt.braceL)) {
        return { names, types };
      }
      let name = null;
      let isType = false;
      let remoteName = null;
      for (let i = this.tokens.currentIndex + 1; ; i++) {
        const token = this.tokens.tokenAt(i);
        if (token.type === tt.braceR) {
          break;
        }
        if (token.type === tt.name) {
          const identifierName = this.tokens.identifierNameForToken(token);
          if (name === null) {
            if (identifierName === "type") {
              isType = true;
            } else {
              name = identifierName;
              remoteName = identifierName;
            }
          } else if (remoteName === null) {
          } else {
            if (isType) {
              types.set(remoteName, name);
            } else {
              names.set(remoteName, name);
            }
            name = null;
            isType = false;
            remoteName = null;
          }
        }
      }
      return { names, types };
    }
  }
  var tt;
  var charCodes$1;
  var Keyword;
  var ContextualKeyword;
  var IdentifierRole;
  var ScopeType;
  var ScopeFlag;
  class TypeScriptProcessor {
    constructor(sucraseContext, transforms, options) {
      this.sucraseContext = sucraseContext;
      this.transforms = transforms;
      this.options = options;
      this.tokenProcessor = this.sucraseContext.tokenProcessor;
      this.nameManager = this.sucraseContext.nameManager;
      this.scopes = [new Scope(ScopeFlag.TSModule)];
      this.isESM = transforms.has(Transform.Imports);
      this.shouldAddModuleExports = false;
    }
  }
  class JSXProcessor {
    constructor(sucraseContext, transforms, options) {
      this.sucraseContext = sucraseContext;
      this.transforms = transforms;
      this.options = options;
      this.tokenProcessor = this.sucraseContext.tokenProcessor;
      this.nameManager = this.sucraseContext.nameManager;
      const [jsxPragma, ...jsxPragmaRest] = this.options.jsxPragma.split(".");
      this.jsxPragma = jsxPragma;
      this.jsxPragmaSuffix = jsxPragmaRest.length > 0 ? `.${jsxPragmaRest.join(".")}` : "";
      const [jsxFragmentPragma, ...jsxFragmentPragmaRest] = this.options.jsxFragmentPragma.split(".");
      this.jsxFragmentPragma = jsxFragmentPragma;
      this.jsxFragmentPragmaSuffix = jsxFragmentPragmaRest.length > 0 ? `.${jsxFragmentPragmaRest.join(".")}` : "";
    }
  }
  class FlowProcessor {
    constructor(sucraseContext, transforms, options) {
      this.sucraseContext = sucraseContext;
      this.transforms = transforms;
      this.options = options;
      this.tokenProcessor = this.sucraseContext.tokenProcessor;
      this.nameManager = this.sucraseContext.nameManager;
    }
  }
  class CJSExportProcessor {
  }
  class OptionalCatchBindingProcessor {
  }
  class OptionalChainingProcessor {
  }
  class NullishCoalescingProcessor {
  }
  class ClassFieldsProcessor {
  }
  class ReactHotLoaderProcessor {
  }
  class JestProcessor {
  }
  class NumericSeparatorProcessor {
  }
  class RootTransformer {
  }
  class TokenParser {
    constructor(tokenProcessor, isFlow) {
      this.tokens = tokenProcessor;
      this.isFlow = isFlow;
      this.currentIndex = 0;
    }
  }
  function* tokenizer(code, options) {
    const tokenizer2 = new Tokenizer(code, options);
    while (tokenizer2.type !== tt.eof) {
      tokenizer2.next();
      yield tokenizer2.export();
    }
  }

  exports.getSucraseContext = getSucraseContext;
  exports.transform = transform;
  exports.getVersion = getVersion;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});

// public/sw.js - Original content starts here

// A simple in-memory file system for the service worker
const files = new Map();

// A helper function to guess the MIME type from a filename
const getMimeType = (filename) => {
    if (filename.endsWith('.html')) return 'text/html';
    if (filename.endsWith('.css')) return 'text/css';
    if (['.js', '.mjs', '.tsx', '.jsx'].some(ext => filename.endsWith(ext))) {
        return 'application/javascript';
    }
    if (filename.endsWith('.json')) return 'application/json';
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
    if (filename.endsWith('.svg')) return 'image/svg+xml';
    return 'text/plain';
};

// Listen for messages from the main thread (the React app)
self.addEventListener('message', (event) => {
    // Expecting an array of file objects: { name: string, content: string }
    if (event.data && event.data.type === 'UPDATE_FILES') {
        files.clear(); // Clear old files
        event.data.files.forEach(file => {
            // The paths in the generated code will be relative, so we add a leading '/'
            const path = file.name.startsWith('/') ? file.name : `/${file.name}`;
            files.set(path, {
                content: file.content,
                mimeType: getMimeType(file.name)
            });
        });
        console.log('Service Worker updated with new files:', Array.from(files.keys()));
    }
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const pathname = url.pathname;

    // The iframe will request '/preview.html'. We serve 'index.html' content for it.
    const servePath = pathname.startsWith('/preview.html') ? '/index.html' : pathname;

    if (files.has(servePath)) {
        event.respondWith(
            (async () => {
                const file = files.get(servePath);
                let content = file.content;
                let mimeType = file.mimeType;
                
                const isTranspilable = servePath.endsWith('.tsx') || servePath.endsWith('.jsx');

                if (isTranspilable && self.sucrase) {
                    try {
                        content = self.sucrase.transform(content, {
                            transforms: ["typescript", "jsx"],
                            jsxRuntime: "automatic",
                            production: true,
                        }).code;
                        mimeType = 'application/javascript';
                    } catch (e) {
                        console.error(`Error transpiling ${servePath}:`, e);
                        // Display error in the preview itself for easier debugging
                        content = `
                            document.body.style.fontFamily = "monospace";
                            document.body.style.backgroundColor = "#111";
                            document.body.style.color = "white";
                            document.body.style.padding = "1rem";
                            document.body.innerHTML = \`
                                <h2>Transpilation Error</h2>
                                <p>Failed to compile ${servePath}</p>
                                <pre style="color:red; white-space: pre-wrap; word-wrap: break-word;">${e.message}</pre>
                                <hr>
                                <h3>Original Code:</h3>
                                <pre style="white-space: pre-wrap; word-wrap: break-word;">${file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                            \`;
                        `;
                        mimeType = 'text/html'; // Serve the error as an HTML page
                    }
                }
                
                return new Response(content, {
                    headers: { 'Content-Type': mimeType }
                });
            })()
        );
    } else {
        // For any other request, let it pass through to the network
        // This is important for fetching libraries from esm.sh etc.
        return;
    }
});

// Activate the new service worker immediately
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
