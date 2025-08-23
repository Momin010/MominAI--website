/**
 * Sucrase is a fast TypeScript/JSX transpiler.
 * https://github.com/alangpierce/sucrase
 *
 * This is a bundled version of Sucrase for in-browser use.
 */
var sucrase = (function (exports) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var CJS__createRequire = (function() {
    var E = function(s) {
      return typeof require !== 'undefined' && require.resolve(s) || s;
    };
    if (typeof require === "function") {
      try {
        return E("module").createRequire(E("url").pathToFileURL(E("assert")).href);
      } catch (e) {
      }
    }
    return function() {
      throw new Error('The CJS "require" function is not available in ESM.');
    };
  })();

  var CJS__filename = (function() {
    try {
      return CJS__createRequire()("url").fileURLToPath(
        typeof document === "undefined"
          ? new (CJS__createRequire()("url").URL)("file:" + CJS__createRequire()("assert").strict)
          : (document.currentScript && document.currentScript.src || new URL('main.js', document.baseURI).href)
      );
    } catch(e) {
      return "/";
    }
  })();

  var CJS__dirname = (function() {
    try {
      return CJS__createRequire()("path").dirname(CJS__filename);
    } catch(e) {
      return "/";
    }
  })();

  var a = {
  	code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
  	reasonCode: "SourceTypeModuleRequired"
  };

  var a$1 = {
  	code: "BABEL_PARSER_MODULE_EXPORT_MISSING_COMMA_AFTER_SPECIFIER",
  	reasonCode: "ModuleExportMissingCommaAfterSpecifier"
  };

  var a$2 = {
  	code: "BABEL_PARSER_MODULE_EXPORT_MISSING_FROM",
  	reasonCode: "ModuleExportMissingFrom"
  };

  var a$3 = {
  	code: "BABEL_PARSER_INVALID_NAMED_EXPORT",
  	reasonCode: "InvalidNamedExport"
  };

  var a$4 = {
  	code: "BABEL_PARSER_EXPECTED_SEMI_OR_LINE_TERMINATOR",
  	reasonCode: "ExpectedSemiOrLineTerminator"
  };

  var a$5 = {
  	code: "BABEL_PARSER_JSX_INVALID_ATTRIBUTE_VALUE",
  	reasonCode: "JSXInvalidAttributeValue"
  };

  var a$6 = {
  	code: "BABEL_PARSER_JSX_UNCLOSED_SELF_CLOSING_TAG",
  	reasonCode: "JSXUnclosedSelfClosingTag"
  };

  var a$7 = {
  	code: "BABEL_PARSER_JSX_UNCLOSED_TAG",
  	reasonCode: "JSXUnclosedTag"
  };

  var a$8 = {
  	code: "BABEL_PARSER_JSX_UNCLOSED_EXPRESSION",
  	reasonCode: "JSXUnclosedExpression"
  };

  var a$9 = {
  	code: "BABEL_PARSER_JSX_EMPTY_EXPRESSION",
  	reasonCode: "JSXEmptyExpression"
  };

  var a$a = {
  	code: "BABEL_PARSER_JSX_EXPECTED_CLOSING_TAG",
  	reasonCode: "JSXExpectedClosingTag"
  };

  var a$b = {
  	code: "BABEL_PARSER_JSX_ADJACENT_ELEMENTS",
  	reasonCode: "JSXAdjacentElements"
  };

  var a$c = {
  	code: "BABEL_PARSER_TS_CONST_ENUM_ONLY_ON_TOP_LEVEL",
  	reasonCode: "TsConstEnumOnlyOnTopLevel"
  };

  var a$d = {
  	code: "BABEL_PARSER_TS_INVALID_EXPORT_DEFAULT",
  	reasonCode: "TsInvalidExportDefault"
  };

  var a$e = {
  	code: "BABEL_PARSER_TS_REQUIRED_COMMAS_IN_ENUM",
  	reasonCode: "TsRequiredCommasInEnum"
  };

  var a$f = {
  	code: "BABEL_PARSER_TS_UNEXPECTED_INITIALIZER_IN_AMBIENT_CONTEXT",
  	reasonCode: "TsUnexpectedInitializerInAmbientContext"
  };

  var a$g = {
  	code: "BABEL_PARSER_TS_IMPLEMENTS_DISALLOWED_IN_AMBIGUOUS_CONTEXT",
  	reasonCode: "TsImplementsDisallowedInAmbiguousContext"
  };

  var a$h = {
  	code: "BABEL_PARSER_TS_IMPORT_EQUALS_NOT_ALLOWED_IN_MODULE",
  	reasonCode: "TsImportEqualsNotAllowedInModule"
  };

  var a$i = {
  	code: "BABEL_PARSER_TS_EXTERNAL_MODULE_REFERENCE_NOT_ALLOWED_IN_TYPE_ARGUMENTS",
  	reasonCode: "TsExternalModuleReferenceNotAllowedInTypeArguments"
  };

  var a$j = {
  	code: "BABEL_PARSER_TS_TYPE_ARGUMENTS_NOT_ALLOWED_IN_TYPE_SUM",
  	reasonCode: "TsTypeargumentsNotAllowedInTypeSum"
  };

  var a$k = {
  	code: "BABEL_PARSER_TS_CONSTRUCTOR_MAY_NOT_BE_DEFAULT_EXPORT",
  	reasonCode: "TsConstructorMayNotBeDefaultExport"
  };

  var a$l = {
  	code: "BABEL_PARSER_TS_IMPORT_EXPORT_SPECIFIER_MODIFIER_RESERVED_WORD",
  	reasonCode: "TsImportExportSpecifierModifierReservedWord"
  };

  var a$m = {
  	code: "BABEL_PARSER_TS_EMPTY_EXPORT_STAR",
  	reasonCode: "TsEmptyExportStar"
  };

  var a$n = {
  	code: "BABEL_PARSER_TS_INVALID_ASYNC_MODIFIER_ON_PARAMETERS",
  	reasonCode: "TsInvalidAsyncModifierOnParameters"
  };

  var a$o = {
  	code: "BABEL_PARSER_TS_INVALID_READONLY_MODIFIER",
  	reasonCode: "TsInvalidReadonlyModifier"
  };

  var a$p = {
  	code: "BABEL_PARSER_TS_EXPORT_ASSIGN_IN_AMBIENT_CONTEXT",
  	reasonCode: "TsExportAssignInAmbientContext"
  };

  var a$q = {
  	code: "BABEL_PARSER_TS_NAMESPACE_IN_DECLARE_MODULE",
  	reasonCode: "TsNamespaceInDeclareModule"
  };

  var a$r = {
  	code: "BABEL_PARSER_TS_INVALID_IDENTIFIER_IN_ASYNC_ARROW",
  	reasonCode: "TsInvalidIdentifierInAsyncArrow"
  };

  var a$s = {
  	code: "BABEL_PARSER_TS_INVALID_SUPER_CALL_IN_ASYNC_ARROW",
  	reasonCode: "TsInvalidSuperCallInAsyncArrow"
  };

  var a$t = {
  	code: "BABEL_PARSER_TS_INVALID_AWAIT_IN_ASYNC_ARROW",
  	reasonCode: "TsInvalidAwaitInAsyncArrow"
  };

  var a$u = {
  	code: "BABEL_PARSER_TS_INVALID_TYPE_ANNOTATION_IN_ASYNC_ARROW",
  	reasonCode: "TsInvalidTypeAnnotationInAsyncArrow"
  };

  var a$v = {
  	code: "BABEL_PARSER_TS_INVALID_THIS_TYPE",
  	reasonCode: "TsInvalidThisType"
  };

  var a$w = {
  	code: "BABEL_PARSER_TS_TYPE_QUERY_DISALLOWED_IN_PARAM",
  	reasonCode: "TsTypeQueryDisallowedInParam"
  };

  var a$x = {
  	code: "BABEL_PARSER_TS_GETTER_NO_RETURN_TYPE",
  	reasonCode: "TsGetterNoReturnType"
  };

  var a$y = {
  	code: "BABEL_PARSER_TS_INVALID_AWAIT_IN_CLASS_STATIC_BLOCK",
  	reasonCode: "TsInvalidAwaitInClassStaticBlock"
  };

  var a$z = {
  	code: "BABEL_PARSER_TS_INVALID_MODIFIER_ON_TYPE_MEMBER",
  	reasonCode: "TsInvalidModifierOnTypeMember"
  };

  var a$A = {
  	code: "BABEL_PARSER_TS_DISALLOWED_AWAIT_IN_TYPE_ARGUMENT",
  	reasonCode: "TsDisallowedAwaitInTypeArgument"
  };

  var a$B = {
  	code: "BABEL_PARSER_TS_UNEXPECTED_PARAMETER_MODIFIER",
  	reasonCode: "TsUnexpectedParameterModifier"
  };

  var a$C = {
  	code: "BABEL_PARSER_TS_DUPLICATE_MODIFIER",
  	reasonCode: "TsDuplicateModifier"
  };

  var a$D = {
  	code: "BABEL_PARSER_TS_INVALID_MODIFIER",
  	reasonCode: "TsInvalidModifier"
  };

  var a$E = {
  	code: "BABEL_PARSER_TS_INVALID_ACCESSIBILITY_MODIFIER_ON_MODULE",
  	reasonCode: "TsInvalidAccessibilityModifierOnModule"
  };

  var a$F = {
  	code: "BABEL_PARSER_TS_MIXED_CONSTRUCTOR_TYPE_MEMBERS",
  	reasonCode: "TsMixedConstructorTypeMembers"
  };

  var a$G = {
  	code: "BABEL_PARSER_TS_OVERRIDE_MODIFIER_ALREADY_SEEN",
  	reasonCode: "TsOverrideModifierAlreadySeen"
  };

  var a$H = {
  	code: "BABEL_PARSER_TS_ABSTRACT_MODIFIER_ALREADY_SEEN",
  	reasonCode: "TsAbstractModifierAlreadySeen"
  };

  var a$I = {
  	code: "BABEL_PARSER_TS_STATIC_MODIFIER_ALREADY_SEEN",
  	reasonCode: "TsStaticModifierAlreadySeen"
  };

  var a$J = {
  	code: "BABEL_PARSER_TS_READONLY_MODIFIER_ALREADY_SEEN",
  	reasonCode: "TsReadonlyModifierAlreadySeen"
  };

  var a$K = {
  	code: "BABEL_PARSER_TS_INVALID_MODIFIER_ORDER",
  	reasonCode: "TsInvalidModifierOrder"
  };

  var a$L = {
  	code: "BABEL_PARSER_TS_INVALID_ASYNC_IN_EXPORT_ASSIGN",
  	reasonCode: "TsInvalidAsyncInExportAssign"
  };

  var a$M = {
  	code: "BABEL_PARSER_TS_INVALID_PARAM_PROPS_IN_CONSTRUCTOR",
  	reasonCode: "TsInvalidParamPropsInConstructor"
  };

  var a$N = {
  	code: "BABEL_PARSER_TS_INVALID_TYPE_IMPORT",
  	reasonCode: "TsInvalidTypeImport"
  };

  var a$O = {
  	code: "BABEL_PARSER_TS_MODULE_INVALID_MODIFIER",
  	reasonCode: "TsModuleInvalidModifier"
  };

  var a$P = {
  	code: "BABEL_PARSER_TS_MODULE_CANNOT_BE_EXTENDED",
  	reasonCode: "TsModuleCannotBeExtended"
  };

  var a$Q = {
  	code: "BABEL_PARSER_TS_ABSTRACT_METHOD_IN_NON_ABSTRACT_CLASS",
  	reasonCode: "TsAbstractMethodInNonAbstractClass"
  };

  var a$R = {
  	code: "BABEL_PARSER_TS_IMPLEMENTS_IN_CLASS_EXPRESSION",
  	reasonCode: "TsImplementsInClassExpression"
  };

  var a$S = {
  	code: "BABEL_PARSER_TS_UNEXPECTED_QUESTION_MARK",
  	reasonCode: "TsUnexpectedQuestionMark"
  };

  var a$T = {
  	code: "BABEL_PARSER_TS_OPTIONAL_CHAIN_LHS_CONDITIONAL",
  	reasonCode: "TsOptionalChainLhsConditional"
  };

  var a$U = {
  	code: "BABEL_PARSER_TS_INVALID_TYPE_CAST_IN_PARAMETER",
  	reasonCode: "TsInvalidTypeCastInParameter"
  };

  var a$V = {
  	code: "BABEL_PARSER_TS_REQUIRED_PARAM_AFTER_OPTIONAL",
  	reasonCode: "TsRequiredParamAfterOptional"
  };

  var a$W = {
  	code: "BABEL_PARSER_TS_INVALID_ARROW_FUNC_SIGNATURE",
  	reasonCode: "TsInvalidArrowFuncSignature"
  };

  var a$X = {
  	code: "BABEL_PARSER_TS_ASSERT_CANNOT_BE_AWAITED",
  	reasonCode: "TsAssertCannotBeAwaited"
  };

  var a$Y = {
  	code: "BABEL_PARSER_TS_ABSTRACT_PROPERTY_IN_NON_ABSTRACT_CLASS",
  	reasonCode: "TsAbstractPropertyInNonAbstractClass"
  };

  var a$Z = {
  	code: "BABEL_PARSER_TS_ABSTRACT_PROPERTY_WITH_INITIALIZER",
  	reasonCode: "TsAbstractPropertyWithInitializer"
  };

  var a$_ = {
  	code: "BABEL_PARSER_TS_SETTER_NO_PARAMS",
  	reasonCode: "TsSetterNoParams"
  };

  var a$$ = {
  	code: "BABEL_PARSER_TS_SETTER_MULTIPLE_PARAMS",
  	reasonCode: "TsSetterMultipleParams"
  };

  var a$ba = {
  	code: "BABEL_PARSER_TS_SETTER_OPTIONAL_PARAM",
  	reasonCode: "TsSetterOptionalParam"
  };

  var a$bb = {
  	code: "BABEL_PARSER_TS_SETTER_REST_PARAM",
  	reasonCode: "TsSetterRestParam"
  };

  var a$bc = {
  	code: "BABEL_PARSER_TS_SETTER_RETURN_TYPE",
  	reasonCode: "TsSetterReturnType"
  };

  var a$bd = {
  	code: "BABEL_PARSER_TS_GETTER_PARAMS",
  	reasonCode: "TsGetterParams"
  };

  var a$be = {
  	code: "BABEL_PARSER_TS_DISALLOWED_THIS_PARAM",
  	reasonCode: "TsDisallowedThisParam"
  };

  var a$bf = {
  	code: "BABEL_PARSER_TS_DISALLOWED_NEW_IN_FN_TYPE",
  	reasonCode: "TsDisallowedNewInFnType"
  };

  var a$bg = {
  	code: "BABEL_PARSER_TS_UNEXPECTED_TYPE_CAST",
  	reasonCode: "TsUnexpectedTypeCast"
  };

  var a$bh = {
  	code: "BABEL_PARSER_TS_TRAILING_COMMA_IN_CONDITIONAL",
  	reasonCode: "TsTrailingCommaInConditional"
  };

  var a$bi = {
  	code: "BABEL_PARSER_TS_TRAILING_COMMA_IN_ARROW",
  	reasonCode: "TsTrailingCommaInArrow"
  };

  var a$bj = {
  	code: "BABEL_PARSER_TS_TRAILING_COMMA_IN_EXPLICIT_TYPE",
  	reasonCode: "TsTrailingCommaInExplicitType"
  };

  var a$bk = {
  	code: "BABEL_PARSER_TS_THIS_IN_GENERIC",
  	reasonCode: "TsThisInGeneric"
  };

  var a$bl = {
  	code: "BABEL_PARSER_TS_DESTRUCTURE_IN_GENERIC",
  	reasonCode: "TsDestructureInGeneric"
  };

  var a$bm = {
  	code: "BABEL_PARSER_TS_TYPE_IN_GENERIC",
  	reasonCode: "TsTypeInGeneric"
  };

  var a$bn = {
  	code: "BABEL_PARSER_TS_EXPECTED_TYPE_FOR_DESTRUCTURE",
  	reasonCode: "TsExpectedTypeForDestructure"
  };

  var a$bo = {
  	code: "BABEL_PARSER_TS_DESTRUCTURE_NO_TYPE",
  	reasonCode: "TsDestructureNoType"
  };

  var a$bp = {
  	code: "BABEL_PARSER_FLOW_AWAIT_IN_ASYNC_GENERATOR",
  	reasonCode: "FlowAwaitInAsyncGenerator"
  };

  var a$bq = {
  	code: "BABEL_PARSER_FLOW_TYPE_CAST_IN_PATTERN",
  	reasonCode: "FlowTypeCastInPattern"
  };

  var a$br = {
  	code: "BABEL_PARSER_FLOW_UNEXPECTED_EXECA",
  	reasonCode: "FlowUnexpectedExclamation"
  };

  var a$bs = {
  	code: "BABEL_PARSER_FLOW_INVALID_ASYNC",
  	reasonCode: "FlowInvalidAsync"
  };

  var a$bt = {
  	code: "BABEL_PARSER_FLOW_INVALID_PRIMARY_TYPE",
  	reasonCode: "FlowInvalidPrimaryType"
  };

  var a$bu = {
  	code: "BABEL_PARSER_FLOW_ILLEGAL_IMPLICIT_INSTANTIATION",
  	reasonCode: "FlowIllegalImplicitInstantiation"
  };

  var a$bv = {
  	code: "BABEL_PARSER_FLOW_ILLEGAL_THIS_PARAM",
  	reasonCode: "FlowIllegalThisParam"
  };

  var a$bw = {
  	code: "BABEL_PARSER_FLOW_INVALID_TYPE_PARAM",
  	reasonCode: "FlowInvalidTypeParam"
  };

  var a$bx = {
  	code: "BABEL_PARSER_FLOW_UNKNOWN_TYPE_PARAM_VARIANCE",
  	reasonCode: "FlowUnknownTypeParamVariance"
  };

  var a$by = {
  	code: "BABEL_PARSER_FLOW_ENUM_DUPLICATE_MEMBERS",
  	reasonCode: "FlowEnumDuplicateMembers"
  };

  var a$bz = {
  	code: "BABEL_PARSER_FLOW_ENUM_INVALID_MEMBER_TYPE",
  	reasonCode: "FlowEnumInvalidMemberType"
  };

  var a$bA = {
  	code: "BABEL_PARSER_FLOW_ENUM_MIXED_MEMBERS",
  	reasonCode: "FlowEnumMixedMembers"
  };

  var a$bB = {
  	code: "BABEL_PARSER_FLOW_ENUM_EMPTY",
  	reasonCode: "FlowEnumEmpty"
  };

  var a$bC = {
  	code: "BABEL_PARSER_FLOW_ENUM_MISSING_BODY",
  	reasonCode: "FlowEnumMissingBody"
  };

  var a$bD = {
  	code: "BABEL_PARSER_FLOW_ENUM_NO_DEFAULT",
  	reasonCode: "FlowEnumNoDefault"
  };

  var a$bE = {
  	code: "BABEL_PARSER_FLOW_ENUM_HAS_UNKNOWN_MEMBERS",
  	reasonCode: "FlowEnumHasUnknownMembers"
  };

  var a$bF = {
  	code: "BABEL_PARSER_FLOW_ENUM_INVALID_DEFAULT_TYPE",
  	reasonCode: "FlowEnumInvalidDefaultType"
  };

  var a$bG = {
  	code: "BABEL_PARSER_FLOW_ENUM_MEMBER_NOT_A_LITERAL",
  	reasonCode: "FlowEnumMemberNotALiteral"
  };

  var a$bH = {
  	code: "BABEL_PARSER_FLOW_UNKNOWN_DECLARE_EXPORT_KIND",
  	reasonCode: "FlowUnknownDeclareExportKind"
  };

  var a$bI = {
  	code: "BABEL_PARSER_FLOW_INVALID_OJBECT_TYPE_PROPERTY_KEY",
  	reasonCode: "FlowInvalidObjectTypePropertyKey"
  };

  var a$bJ = {
  	code: "BABEL_PARSER_FLOW_PROPERTY_VARIANCE",
  	reasonCode: "FlowPropertyVariance"
  };

  var a$bK = {
  	code: "BABEL_PARSER_FLOW_INVALID_TYPE_ASSERTION",
  	reasonCode: "FlowInvalidTypeAssertion"
  };

  var a$bL = {
  	code: "BABEL_PARSER_ESTREE_TRAILING_COMMA_IN_REST",
  	reasonCode: "EstreeTrailingCommaInRest"
  };

  var a$bM = {
  	code: "BABEL_PARSER_ESTREE_BIND_PAREN",
  	reasonCode: "EstreeBindParen"
  };

  var a$bN = {
  	code: "BABEL_PARSER_ESTREE_EXPORT_DEFAULT_FROM",
  	reasonCode: "EstreeExportDefaultFrom"
  };

  var a$bO = {
  	code: "BABEL_PARSER_ESTREE_IMPORT_META",
  	reasonCode: "EstreeImportMeta"
  };

  var a$bP = {
  	code: "BABEL_PARSER_ESTREE_JSX_ATTR_NO_PAREN",
  	reasonCode: "EstreeJsxAttrNoParen"
  };

  var a$bQ = {
  	code: "BABEL_PARSER_ESTREE_PRIVATE_NAME",
  	reasonCode: "EstreePrivateName"
  };

  var a$bR = {
  	code: "BABEL_PARSER_ESTREE_CLASS_PROPERTY",
  	reasonCode: "EstreeClassProperty"
  };

  var a$bS = {
  	code: "BABEL_PARSER_ESTREE_OPTIONAL_CHAIN",
  	reasonCode: "EstreeOptionalChain"
  };

  var a$bT = {
  	code: "BABEL_PARSER_ESTREE_BIGINT",
  	reasonCode: "EstreeBigint"
  };

  var a$bU = {
  	code: "BABEL_PARSER_ESTREE_TS_UNSUPPORTED",
  	reasonCode: "EstreeTsUnsupported"
  };

  var errorMessages = {
    //  SyntaxError messages
    Error: (_template, ..._args) => `Error`,
    SyntaxError: (template, ...args) => buildCodeFrameError(template, args),
    // Babel parsing errors
    [a.code]: "SourceType must be 'module' to use import declarations.",
    [a$1.code]: "Missing comma after export specifier.",
    [a$2.code]: "Unexpected keyword 'from'.",
    [a$3.code]: "Invalid named export.",
    [a$4.code]: "Unexpected content after export.",
    [a$5.code]: "JSX attribute value must be an identifier or a string.",
    [a$6.code]: "Unclosed JSX self-closing tag.",
    [a$7.code]: "Unclosed JSX tag.",
    [a$8.code]: "Unclosed JSX expression.",
    [a$9.code]: "JSX expressions must not be empty.",
    [a$a.code]: `Expected corresponding JSX closing tag for '<%0>'.`,
    [a$b.code]: `Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?`,
    // TypeScript parsing errors
    [a$c.code]: "'const' enums can only be declared at the top level or inside a namespace.",
    [a$d.code]: "A 'declare' modifier cannot be used with an export-default.",
    [a$e.code]: "Enum members must be separated by commas.",
    [a$f.code]: "Initializers are not allowed in ambient contexts.",
    [a$g.code]: "'implements' clauses are not allowed in combination with object literal types.",
    [a$h.code]: "`import ... =` is not allowed in module files.",
    [a$i.code]: "An external module reference is not allowed in type arguments.",
    [a$j.code]: "Type arguments are not allowed in partial type parameter lists.",
    [a$k.code]: "A constructor cannot be the default export.",
    [a$l.code]: "Identifier is a reserved word in strict mode.",
    [a$m.code]: "The star in a `export * as ns` declaration must have a following `as ns` or `from \"mod\"`.",
    [a$n.code]: "'async' modifier cannot be used in parameters.",
    [a$o.code]: "The 'readonly' modifier is only allowed on class properties, index signatures, and parameters of constructors.",
    [a$p.code]: "An export assignment cannot be used in an ambient context.",
    [a$q.code]: "'namespaces' and 'modules' can be nested, but only modules can be nested in namespaces.",
    [a$r.code]: "The 'async' modifier should be before the parameters of an arrow function.",
    [a$s.code]: "'super' calls are not allowed in async arrow functions.",
    [a$t.code]: "'await' is not allowed in async arrow function parameters.",
    [a$u.code]: "Type annotations are not allowed on async arrow function parameters.",
    [a$v.code]: "'this' types can only be used inside a class or interface.",
    [a$w.code]: "A type query is not allowed in a parameter.",
    [a$x.code]: "A 'get' accessor must have a return type annotation.",
    [a$y.code]: "'await' is not allowed in a class static block.",
    [a$z.code]: "Unexpected modifier on a type member.",
    [a$A.code]: "`await` is not allowed in type arguments.",
    [a$B.code]: "Parameter modifiers are only allowed on constructor parameters.",
    [a$C.code]: `Duplicate modifier: '%0'`,
    [a$D.code]: "Only 'public', 'private', and 'protected' modifiers are allowed on class members.",
    [a$E.code]: "Accessibility modifiers are not allowed on modules.",
    [a$F.code]: "Mixing member kinds is not allowed in a constructor.",
    [a$G.code]: "The 'override' modifier has already been seen.",
    [a$H.code]: "The 'abstract' modifier has already been seen.",
    [a$I.code]: "The 'static' modifier has already been seen.",
    [a$J.code]: "The 'readonly' modifier has already been seen.",
    [a$K.code]: "Modifiers must be declared in the correct order: 'public'/'private'/'protected' 'static'/'override' 'readonly'.",
    [a$L.code]: "'async' is not a valid modifier in an export assignment.",
    [a$M.code]: "Parameter properties are only allowed in constructors.",
    [a$N.code]: "A type-only import can specify a default import or named bindings, but not both.",
    [a$O.code]: "The 'declare' modifier is the only modifier allowed on a namespace.",
    [a$P.code]: "A namespace declaration cannot be configured to extend a class.",
    [a$Q.code]: "Abstract methods can only be declared in abstract classes.",
    [a$R.code]: "An 'implements' clause is not allowed in a class expression.",
    [a$S.code]: "Question marks may only be used at the end of a parameter name.",
    [a$T.code]: "The left-hand side of a conditional expression may not be an optional chain.",
    [a$U.code]: "Type casts are not allowed in patterns.",
    [a$V.code]: "A required parameter cannot follow an optional parameter.",
    [a$W.code]: "Invalid arrow function signature: expected an arrow function.",
    [a$X.code]: "'asserts' are not allowed to be awaited.",
    [a$Y.code]: "Abstract properties can only be declared in abstract classes.",
    [a$Z.code]: "Abstract properties may not have an initializer.",
    [a$_.code]: "A 'set' accessor must have exactly one parameter.",
    [a$$.code]: "A 'set' accessor cannot have multiple parameters.",
    [a$ba.code]: "A 'set' accessor's parameter cannot be optional.",
    [a$bb.code]: "A 'set' accessor cannot have a rest parameter.",
    [a$bc.code]: "A 'set' accessor cannot have a return type annotation.",
    [a$bd.code]: "A 'get' accessor cannot have parameters.",
    [a$be.code]: "'this' parameters are not allowed in arrow function type definitions.",
    [a$bf.code]: "'new' is not allowed in a function type definition.",
    [a$bg.code]: "Parenthesized expressions are not allowed in type casts.",
    [a$bh.code]: "Trailing commas are not allowed in conditional expressions.",
    [a$bi.code]: "Trailing commas are not allowed in arrow function type definitions.",
    [a$bj.code]: "Trailing commas are not allowed in explicit type instantiations.",
    [a$bk.code]: "'this' is not a valid type parameter name.",
    [a$bl.code]: "Destructuring is not a valid type parameter name.",
    [a$bm.code]: "'type' is not a valid type parameter name.",
    [a$bn.code]: "Destructuring must have a type annotation.",
    [a$bo.code]: "Destructuring must have a name.",
    // Flow parsing errors
    [a$bp.code]: "await is not allowed in async generator functions.",
    [a$bq.code]: "Type casts are not allowed in patterns.",
    [a$br.code]: "Unexpected `!` after type annotation.",
    [a$bs.code]: "async is not a valid parameter name for arrow functions.",
    [a$bt.code]: "Invalid primary type.",
    [a$bu.code]: "Implicit instantiation is not allowed in `call` properties.",
    [a$bv.code]: "'this' may not be used as a type annotation.",
    [a$bw.code]: "Invalid type parameter.",
    [a$bx.code]: "Unknown type parameter variance.",
    [a$by.code]: `Duplicate enum member: '%0'`,
    [a$bz.code]: "Enum members must be strings or numbers.",
    [a$bA.code]: "Enums with string members may not have number members, and vice versa.",
    [a$bB.code]: "An enum must have at least one member.",
    [a$bC.code]: "An enum must have a body.",
    [a$bD.code]: "Initialized enums must have a default value.",
    [a$bE.code]: "Enums may not have unknown members.",
    [a$bF.code]: "Enum default value must be a string or number.",
    [a$bG.code]: "Enum members must be literals.",
    [a$bH.code]: "Unknown `declare export` kind.",
    [a$bI.code]: "Invalid object type property key.",
    [a$bJ.code]: "Variance is not allowed in object type properties.",
    [a$bK.code]: "Invalid type assertion.",
    // estree plugin errors
    [a$bL.code]: "Trailing comma is not permitted after a rest element.",
    [a$bM.code]: "Binding should be performed on a MemberExpression.",
    [a$bN.code]: "`export default from` is not a valid export syntax.",
    [a$bO.code]: "A `meta` property is only allowed in an `import` expression.",
    [a$bP.code]: "JSX attributes must be wrapped in curly braces.",
    [a$bQ.code]: "Private names are not allowed in `in` expressions.",
    [a$bR.code]: "Class properties must be methods. Use `static` to create static properties.",
    [a$bS.code]: "Optional chaining cannot appear in the left-hand side of an assignment.",
    [a$bT.code]: "BigInt literals are not available.",
    [a$bU.code]: "This TypeScript syntax is not supported by the estree plugin."
  };

  /**
   * You have a bunch of JSX elements with trailing text nodes containing only
   * whitespace. This is probably due to converting from something else, and
   * causes sast to go crazy with memory usage.
   *
   * In addition to that, it also causes weird spacing issues in the output.
   *
   * `<p>
   *   <strong>hello</strong>
   * </p>`
   *
   * The above gets parsed as:
   *
   *   Element(p)
   *     TextNode("\n  ")
   *     Element(strong)
   *       TextNode("hello")
   *     TextNode("\n")
   *
   * We have a lot of these text nodes that are just bogus. This gets rid of them.
   */
  function cleanJSXElementLiteral(value, {
    isLastChild
  }) {
    const lines = value.split(/\r\n|\n|\r/);
    let lastNonEmptyLine = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/[^ \t]/)) {
        lastNonEmptyLine = i;
      }
    }
    if (lastNonEmptyLine === -1) {
      return "";
    }
    let str = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isFirstLine = i === 0;
      const isLastLine = i === lines.length - 1;
      const isLastNonEmptyLine = i === lastNonEmptyLine;

      // replace rendered whitespace tabs with spaces
      let trimmedLine = line.replace(/\t/g, " ");

      // trim whitespace touching a newline
      if (!isFirstLine) {
        trimmedLine = trimmedLine.replace(/^[ ]+/, "");
      }
      if (!isLastLine) {
        trimmedLine = trimmedLine.replace(/[ ]+$/, "");
      }
      if (trimmedLine) {
        if (!isLastNonEmptyLine) {
          trimmedLine += " ";
        }
        str += trimmedLine;
      }
    }
    str = str.replace(/ \r/g, " ").replace(/\r/g, " ");

    // We remove the trailing space if the next element is a closing tag
    if (isLastChild && /[ \t]$/.test(str)) {
      if (str.match(/[ \t]$/)) {
        return str.slice(0, -1);
      }
    }
    return str;
  }
  function toTokens(code) {
    const tokens = [];
    for (const token of tokenizer(code, {
      isJSXEnabled: true,
      isTypeScriptEnabled: true,
      isFlowEnabled: true
    })) {
      tokens.push(token);
    }
    return tokens;
  }
  function formatTokens(code, tokens) {
    let output = "";
    let lastTokenEnd = 0;
    for (const token of tokens) {
      if (token.start > lastTokenEnd) {
        output += code.slice(lastTokenEnd, token.start);
      }
      if (token.value) {
        output += token.value;
      } else {
        output += code.slice(token.start, token.end);
      }
      lastTokenEnd = token.end;
    }
    output += code.slice(lastTokenEnd);
    return output;
  }
  function printTokens(tokens) {
    const tokenStrings = [];
    for (const token of tokens) {
      const parts = [TokenType[token.type]];
      if (token.value) {
        parts.push(JSON.stringify(token.value));
      }
      if (token.contextualKeyword) {
        parts.push(`contextual: ${ContextualKeyword[token.contextualKeyword]}`);
      }
      if (token.isType) {
        parts.push("type");
      }
      tokenStrings.push(parts.join(", "));
    }
    return tokenStrings;
  }
  function getTokens(code, options) {
    const sucraseOptions = {
      ...options,
      transforms: []
    };
    const {
      tokens
    } = transform$1(code, sucraseOptions);
    if (!tokens) {
      throw new Error("getTokens requires the returnTokens option to be enabled.");
    }
    return tokens;
  }
  function getTokensESM(code, options) {
    const sucraseOptions = {
      ...options,
      transforms: []
    };
    const {
      tokens
    } = transform$1(code, sucraseOptions);
    if (!tokens) {
      throw new Error("getTokens requires the returnTokens option to be enabled.");
    }
    return tokens;
  }

  function getVersion() {
    return "3.35.0";
  }

  const Transform = /* @__PURE__ */ (function (Transform) {
    Transform[Transform["JSX"] = 0] = "JSX";
    Transform[Transform["TypeScript"] = 1] = "TypeScript";
    Transform[Transform["Flow"] = 2] = "Flow";
    Transform[Transform["Imports"] = 3] = "Imports";
    Transform[Transform["ReactHotLoader"] = 4] = "ReactHotLoader";
    Transform[Transform["NumericSeparator"] = 5] = "NumericSeparator";
    Transform[Transform["OptionalChaining"] = 6] = "OptionalChaining";
    Transform[Transform["NullishCoalescing"] = 7] = "NullishCoalescing";
    Transform[Transform["ClassFields"] = 8] = "ClassFields";
    Transform[Transform["OptionalCatchBinding"] = 9] = "OptionalCatchBinding";
    Transform[Transform["Jest"] = 10] = "Jest";
    return Transform;
  })(Transform || {});

  const JS_TRANSFORMS = [Transform.OptionalCatchBinding, Transform.NumericSeparator, Transform.OptionalChaining, Transform.NullishCoalescing, Transform.ClassFields];

  const REACT_HOT_LOADER_TRANSFORM = [Transform.ReactHotLoader];

  /**
   * Determine the set of enabled transforms based on the provided options.
   * This is used both within Sucrase and by getSucraseContext.
   */
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
    const enabledTransforms = new Set();
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

  function transform$1(code, options) {
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
      const context = new TransformationContext(transforms, sucraseOptions, code, options);
      const tokens = [];
      for (const token of tokenizer(code, {
        isJSXEnabled: isJSXEnabled || isTypeScriptEnabled,
        isTypeScriptEnabled,
        isFlowEnabled
      })) {
        tokens.push(token);
      }
      context.setTokens(tokens);
      if (isJestEnabled) {
        // jest transform must run first.
        new JestProcessor(context).process();
      }
      if (isImportsEnabled) {
        new CJSImportProcessor(context).process();
      }
      if (transforms.has(Transform.ReactHotLoader)) {
        new ReactHotLoaderProcessor(context).process();
      }
      if (transforms.has(Transform.OptionalCatchBinding)) {
        new OptionalCatchBindingProcessor(context).process();
      }
      if (transforms.has(Transform.ClassFields)) {
        new ClassFieldsProcessor(context).process();
      }
      if (transforms.has(Transform.OptionalChaining)) {
        new OptionalChainingProcessor(context).process();
      }
      if (transforms.has(Transform.NullishCoalescing)) {
        new NullishCoalescingProcessor(context).process();
      }
      if (transforms.has(Transform.JSX) || transforms.has(Transform.TypeScript)) {
        new JSXProcessor(context).process();
      }
      if (transforms.has(Transform.TypeScript)) {
        new TypeScriptProcessor(context).process();
      } else if (transforms.has(Transform.Flow)) {
        new FlowProcessor(context).process();
      }
      if (transforms.has(Transform.NumericSeparator)) {
        new NumericSeparatorProcessor(context).process();
      }
      if (isImportsEnabled) {
        new CJSExportProcessor(context).process();
        new RootTransformer(context).process();
      } else if (isReactHotLoaderEnabled) {
        new RootTransformer(context).process();
      }
      return {
        code: context.finish(),
        sourceMap: options.sourceMapOptions ? context.getSourceMap() : void 0,
        tokens: options.returnTokens ? context.getTokens() : void 0
      };
    } catch (e) {
      if (e instanceof Error) {
        const sucraseError = {
          ...e,
          message: e.message,
          // Babel-style error location.
          loc: {
            line: e.lineNumber,
            column: e.column
          },
          // Sucrase-style error location.
          line: e.lineNumber,
          column: e.column
        };
        throw sucraseError;
      }
      throw e;
    }
  }

  const buildYieldParam = (node) => {
    return {
      type: "YieldExpression",
      argument: node,
      delegate: false
    };
  };
  const buildAwaitParam = (node) => {
    return {
      type: "AwaitExpression",
      argument: node
    };
  };

  const babel$2 = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  const charCodes$1 = /* @__PURE__ */ (function (charCodes) {
    charCodes[charCodes["asterisk"] = 42] = "asterisk";
    charCodes[charCodes["slash"] = 47] = "slash";
    charCodes[charCodes["backslash"] = 92] = "backslash";
    charCodes[charCodes["space"] = 32] = "space";
    charCodes[charCodes["nonBreakingSpace"] = 160] = "nonBreakingSpace";
    charCodes[charCodes["lineFeed"] = 10] = "lineFeed";
    charCodes[charCodes["carriageReturn"] = 13] = "carriageReturn";
    charCodes[charCodes["lineSeparator"] = 8232] = "lineSeparator";
    charCodes[charCodes["paragraphSeparator"] = 8233] = "paragraphSeparator";
    charCodes[charCodes["tab"] = 9] = "tab";
    charCodes[charCodes["verticalTab"] = 11] = "verticalTab";
    charCodes[charCodes["formFeed"] = 12] = "formFeed";
    charCodes[charCodes["semicolon"] = 59] = "semicolon";
    charCodes[charCodes["lessThan"] = 60] = "lessThan";
    charCodes[charCodes["equalsTo"] = 61] = "equalsTo";
    charCodes[charCodes["greaterThan"] = 62] = "greaterThan";
    charCodes[charCodes["at"] = 64] = "at";
    charCodes[charCodes["graveAccent"] = 96] = "graveAccent";
    charCodes[charCodes["leftSquareBracket"] = 91] = "leftSquareBracket";
    charCodes[charCodes["rightSquareBracket"] = 93] = "rightSquareBracket";
    charCodes[charCodes["leftCurlyBrace"] = 123] = "leftCurlyBrace";
    charCodes[charCodes["rightCurlyBrace"] = 125] = "rightCurlyBrace";
    charCodes[charCodes["leftParen"] = 40] = "leftParen";
    charCodes[charCodes["rightParen"] = 41] = "rightParen";
    charCodes[charCodes["uppercaseA"] = 65] = "uppercaseA";
    charCodes[charCodes["lowercaseA"] = 97] = "lowercaseA";
    charCodes[charCodes["uppercaseB"] = 66] = "uppercaseB";
    charCodes[charCodes["lowercaseB"] = 98] = "lowercaseB";
    charCodes[charCodes["uppercaseE"] = 69] = "uppercaseE";
    charCodes[charCodes["lowercaseE"] = 101] = "lowercaseE";
    charCodes[charCodes["uppercaseF"] = 70] = "uppercaseF";
    charCodes[charCodes["lowercaseF"] = 102] = "lowercaseF";
    charCodes[charCodes["uppercaseN"] = 78] = "uppercaseN";
    charCodes[charCodes["lowercaseN"] = 110] = "lowercaseN";
    charCodes[charCodes["uppercaseO"] = 79] = "uppercaseO";
    charCodes[charCodes["lowercaseO"] = 111] = "lowercaseO";
    charCodes[charCodes["uppercaseX"] = 88] = "uppercaseX";
    charCodes[charCodes["lowercaseX"] = 120] = "lowercaseX";
    charCodes[charCodes["uppercaseZ"] = 90] = "uppercaseZ";
    charCodes[charCodes["lowercaseZ"] = 122] = "lowercaseZ";
    charCodes[charCodes["dot"] = 46] = "dot";
    charCodes[charCodes["colon"] = 58] = "colon";
    charCodes[charCodes["questionMark"] = 63] = "questionMark";
    charCodes[charCodes["_0"] = 48] = "_0";
    charCodes[charCodes["_1"] = 49] = "_1";
    charCodes[charCodes["_7"] = 55] = "_7";
    charCodes[charCodes["_9"] = 57] = "_9";
    charCodes[charCodes["digit0"] = 48] = "digit0";
    charCodes[charCodes["digit1"] = 49] = "digit1";
    charCodes[charCodes["digit2"] = 50] = "digit2";
    charCodes[charCodes["digit3"] = 51] = "digit3";
    charCodes[charCodes["digit4"] = 52] = "digit4";
    charCodes[charCodes["digit5"] = 53] = "digit5";
    charCodes[charCodes["digit6"] = 54] = "digit6";
    charCodes[charCodes["digit7"] = 55] = "digit7";
    charCodes[charCodes["digit8"] = 56] = "digit8";
    charCodes[charCodes["digit9"] = 57] = "digit9";
    charCodes[charCodes["underscore"] = 95] = "underscore";
    charCodes[charCodes["dollarSign"] = 36] = "dollarSign";
    charCodes[charCodes["exclamationMark"] = 33] = "exclamationMark";
    charCodes[charCodes["ampersand"] = 38] = "ampersand";
    charCodes[charCodes["apostrophe"] = 39] = "apostrophe";
    charCodes[charCodes["quotationMark"] = 34] = "quotationMark";
    charCodes[charCodes["plusSign"] = 43] = "plusSign";
    charCodes[charCodes["comma"] = 44] = "comma";
    charCodes[charCodes["dash"] = 45] = "dash";
    charCodes[charCodes["percentSign"] = 37] = "percentSign";
    charCodes[charCodes["caret"] = 94] = "caret";
    charCodes[charCodes["verticalBar"] = 124] = "verticalBar";
    charCodes[charCodes["tilde"] = 126] = "tilde";
    charCodes[charCodes["hash"] = 35] = "hash";
    return charCodes;
  })({});

  const IdentifierRole = /* @__PURE__ */ (function (IdentifierRole) {
    IdentifierRole[IdentifierRole["BlockScopedDeclaration"] = 0] = "BlockScopedDeclaration";
    IdentifierRole[IdentifierRole["FunctionScopedDeclaration"] = 1] = "FunctionScopedDeclaration";
    IdentifierRole[IdentifierRole["TopLevelDeclaration"] = 2] = "TopLevelDeclaration";
    IdentifierRole[IdentifierRole["FunctionLikeDeclaration"] = 3] = "FunctionLikeDeclaration";
    IdentifierRole[IdentifierRole["ObjectKey"] = 4] = "ObjectKey";
    IdentifierRole[IdentifierRole["Access"] = 5] = "Access";
    IdentifierRole[IdentifierRole["ExportAccess"] = 6] = "ExportAccess";
    IdentifierRole[IdentifierRole["TopLevelAccess"] = 7] = "TopLevelAccess";
    IdentifierRole[IdentifierRole["StatementLabel"] = 8] = "StatementLabel";
    IdentifierRole[IdentifierRole["JSXTag"] = 9] = "JSXTag";
    IdentifierRole[IdentifierRole["ImportDeclaration"] = 10] = "ImportDeclaration";
    IdentifierRole[IdentifierRole["ObjectShorthand"] = 11] = "ObjectShorthand";
    IdentifierRole[IdentifierRole["ImportAccess"] = 12] = "ImportAccess";
    IdentifierRole[IdentifierRole["Unknown"] = 13] = "Unknown";
    return IdentifierRole;
  })(IdentifierRole || {});

  const Keyword = /* @__PURE__ */ (function (Keyword) {
    Keyword[Keyword["Await"] = 0] = "Await";
    Keyword[Keyword["Break"] = 1] = "Break";
    Keyword[Keyword["Case"] = 2] = "Case";
    Keyword[Keyword["Catch"] = 3] = "Catch";
    Keyword[Keyword["Class"] = 4] = "Class";
    Keyword[Keyword["Const"] = 5] = "Const";
    Keyword[Keyword["Continue"] = 6] = "Continue";
    Keyword[Keyword["Debugger"] = 7] = "Debugger";
    Keyword[Keyword["Default"] = 8] = "Default";
    Keyword[Keyword["Delete"] = 9] = "Delete";
    Keyword[Keyword["Do"] = 10] = "Do";
    Keyword[Keyword["Else"] = 11] = "Else";
    Keyword[Keyword["Enum"] = 12] = "Enum";
    Keyword[Keyword["Export"] = 13] = "Export";
    Keyword[Keyword["Extends"] = 14] = "Extends";
    Keyword[Keyword["False"] = 15] = "False";
    Keyword[Keyword["Finally"] = 16] = "Finally";
    Keyword[Keyword["For"] = 17] = "For";
    Keyword[Keyword["Function"] = 18] = "Function";
    Keyword[Keyword["If"] = 19] = "If";
    Keyword[Keyword["Import"] = 20] = "Import";
    Keyword[Keyword["In"] = 21] = "In";
    Keyword[Keyword["Instanceof"] = 22] = "Instanceof";
    Keyword[Keyword["Let"] = 23] = "Let";
    Keyword[Keyword["New"] = 24] = "New";
    Keyword[Keyword["Null"] = 25] = "Null";
    Keyword[Keyword["Return"] = 26] = "Return";
    Keyword[Keyword["Super"] = 27] = "Super";
    Keyword[Keyword["Switch"] = 28] = "Switch";
    Keyword[Keyword["This"] = 29] = "This";
    Keyword[Keyword["Throw"] = 30] = "Throw";
    Keyword[Keyword["True"] = 31] = "True";
    Keyword[Keyword["Try"] = 32] = "Try";
    Keyword[Keyword["Typeof"] = 33] = "Typeof";
    Keyword[Keyword["Var"] = 34] = "Var";
    Keyword[Keyword["Void"] = 35] = "Void";
    Keyword[Keyword["While"] = 36] = "While";
    Keyword[Keyword["With"] = 37] = "With";
    Keyword[Keyword["Yield"] = 38] = "Yield";
    Keyword[Keyword["Implements"] = 39] = "Implements";
    Keyword[Keyword["Interface"] = 40] = "Interface";
    Keyword[Keyword["Package"] = 41] = "Package";
    Keyword[Keyword["Private"] = 42] = "Private";
    Keyword[Keyword["Protected"] = 43] = "Protected";
    Keyword[Keyword["Public"] = 44] = "Public";
    Keyword[Keyword["Static"] = 45] = "Static";
    return Keyword;
  })(Keyword || {});
  const KEYWORDS = {
    await: Keyword.Await,
    break: Keyword.Break,
    case: Keyword.Case,
    catch: Keyword.Catch,
    class: Keyword.Class,
    const: Keyword.Const,
    continue: Keyword.Continue,
    debugger: Keyword.Debugger,
    default: Keyword.Default,
    delete: Keyword.Delete,
    do: Keyword.Do,
    else: Keyword.Else,
    enum: Keyword.Enum,
    export: Keyword.Export,
    extends: Keyword.Extends,
    false: Keyword.False,
    finally: Keyword.Finally,
    for: Keyword.For,
    function: Keyword.Function,
    if: Keyword.If,
    import: Keyword.Import,
    in: Keyword.In,
    instanceof: Keyword.Instanceof,
    let: Keyword.Let,
    new: Keyword.New,
    null: Keyword.Null,
    return: Keyword.Return,
    super: Keyword.Super,
    switch: Keyword.Switch,
    this: Keyword.This,
    throw: Keyword.Throw,
    true: Keyword.True,
    try: Keyword.Try,
    typeof: Keyword.Typeof,
    var: Keyword.Var,
    void: Keyword.Void,
    while: Keyword.While,
    with: Keyword.With,
    yield: Keyword.Yield,
    // Strict mode reserved words
    implements: Keyword.Implements,
    interface: Keyword.Interface,
    package: Keyword.Package,
    private: Keyword.Private,
    protected: Keyword.Protected,
    public: Keyword.Public,
    static: Keyword.Static
  };
  function isKeyword(word) {
    return word in KEYWORDS;
  }
  function keywordToToken(keyword, contextual) {
    if (contextual) {
      return contextualKeywordToToken(contextual);
    }
    switch (keyword) {
      case Keyword.Await:
        return tt._await;
      case Keyword.Break:
        return tt._break;
      case Keyword.Case:
        return tt._case;
      case Keyword.Catch:
        return tt._catch;
      case Keyword.Class:
        return tt._class;
      case Keyword.Const:
        return tt._const;
      case Keyword.Continue:
        return tt._continue;
      case Keyword.Debugger:
        return tt._debugger;
      case Keyword.Default:
        return tt._default;
      case Keyword.Delete:
        return tt._delete;
      case Keyword.Do:
        return tt._do;
      case Keyword.Else:
        return tt._else;
      case Keyword.Enum:
        return tt._enum;
      case Keyword.Export:
        return tt._export;
      case Keyword.Extends:
        return tt._extends;
      case Keyword.False:
        return tt._false;
      case Keyword.Finally:
        return tt._finally;
      case Keyword.For:
        return tt._for;
      case Keyword.Function:
        return tt._function;
      case Keyword.If:
        return tt._if;
      case Keyword.Import:
        return tt._import;
      case Keyword.In:
        return tt._in;
      case Keyword.Instanceof:
        return tt._instanceof;
      case Keyword.Let:
        return tt._let;
      case Keyword.New:
        return tt._new;
      case Keyword.Null:
        return tt._null;
      case Keyword.Return:
        return tt._return;
      case Keyword.Super:
        return tt._super;
      case Keyword.Switch:
        return tt._switch;
      case Keyword.This:
        return tt._this;
      case Keyword.Throw:
        return tt._throw;
      case Keyword.True:
        return tt._true;
      case Keyword.Try:
        return tt._try;
      case Keyword.Typeof:
        return tt._typeof;
      case Keyword.Var:
        return tt._var;
      case Keyword.Void:
        return tt._void;
      case Keyword.While:
        return tt._while;
      case Keyword.With:
        return tt._with;
      case Keyword.Yield:
        return tt._yield;
      // Strict mode reserved words
      case Keyword.Implements:
      case Keyword.Interface:
      case Keyword.Package:
      case Keyword.Private:
      case Keyword.Protected:
      case Keyword.Public:
      case Keyword.Static:
        return tt.name;
    }
  }

  const ContextualKeyword = /* @__PURE__ */ (function (ContextualKeyword) {
    ContextualKeyword[ContextualKeyword.Abstract] = 0] = "Abstract";
    ContextualKeyword[ContextualKeyword.Accessor] = 1] = "Accessor";
    ContextualKeyword[ContextualKeyword.As] = 2] = "As";
    ContextualKeyword[ContextualKeyword.Assert] = 3] = "Assert";
    ContextualKeyword[ContextualKeyword.Asserts] = 4] = "Asserts";
    ContextualKeyword[ContextualKeyword.Async] = 5] = "Async";
    ContextualKeyword[ContextualKeyword.From] = 6] = "From";
    ContextualKeyword[ContextualKeyword.Get] = 7] = "Get";
    ContextualKeyword[ContextualKeyword.Global] = 8] = "Global";
    ContextualKeyword[ContextualKeyword.Infer] = 9] = "Infer";
    ContextualKeyword[ContextualKeyword.Is] = 10] = "Is";
    ContextualKeyword[ContextualKeyword.Keyof] = 11] = "Keyof";
    ContextualKeyword[ContextualKeyword.Meta] = 12] = "Meta";
    ContextualKeyword[ContextualKeyword.Module] = 13] = "Module";
    ContextualKeyword[ContextualKeyword.Namespace] = 14] = "Namespace";
    ContextualKeyword[ContextualKeyword.Never] = 15] = "Never";
    ContextualKeyword[ContextualKeyword.Of] = 16] = "Of";
    ContextualKeyword[ContextualKeyword.Opaque] = 17] = "Opaque";
    ContextualKeyword[ContextualKeyword.Out] = 18] = "Out";
    ContextualKeyword[ContextualKeyword.Override] = 19] = "Override";
    ContextualKeyword[ContextualKeyword.Property] = 20] = "Property";
    ContextualKeyword[ContextualKeyword.Readonly] = 21] = "Readonly";
    ContextualKeyword[ContextualKeyword.Require] = 22] = "Require";
    ContextualKeyword[ContextualKeyword.Satisfies] = 23] = "Satisfies";
    ContextualKeyword[ContextualKeyword.Set] = 24] = "Set";
    ContextualKeyword[ContextualKeyword.Static] = 25] = "Static";
    ContextualKeyword[ContextualKeyword.Symbol] = 26] = "Symbol";
    ContextualKeyword[ContextualKeyword.Target] = 27] = "Target";
    ContextualKeyword[ContextualKeyword.Type] = 28] = "Type";
    ContextualKeyword[ContextualKeyword.Unique] = 29] = "Unique";
    ContextualKeyword[ContextualKeyword.Declare] = 30] = "Declare";
    ContextualKeyword[ContextualKeyword.Any] = 31] = "Any";
    ContextualKeyword[ContextualKeyword.Bigint] = 32] = "Bigint";
    ContextualKeyword[ContextualKeyword.Boolean] = 33] = "Boolean";
    ContextualKeyword[ContextualKeyword.Constructor] = 34] = "Constructor";
    ContextualKeyword[ContextualKeyword.Mixed] = 35] = "Mixed";
    ContextualKeyword[ContextualKeyword.Number] = 36] = "Number";
    ContextualKeyword[ContextualKeyword.Object] = 37] = "Object";
    ContextualKeyword[ContextualKeyword.String] = 38] = "String";
    ContextualKeyword[ContextualKeyword.Void] = 39] = "Void";
    ContextualKeyword[ContextualKeyword.Enum] = 40] = "Enum";
    return ContextualKeyword;
  })(ContextualKeyword || {});
  const CONTEXTUAL_KEYWORDS = {
    abstract: ContextualKeyword.Abstract,
    accessor: ContextualKeyword.Accessor,
    as: ContextualKeyword.As,
    assert: ContextualKeyword.Assert,
    asserts: ContextualKeyword.Asserts,
    async: ContextualKeyword.Async,
    from: ContextualKeyword.From,
    get: ContextualKeyword.Get,
    global: ContextualKeyword.Global,
    infer: ContextualKeyword.Infer,
    is: ContextualKeyword.Is,
    keyof: ContextualKeyword.Keyof,
    meta: ContextualKeyword.Meta,
    module: ContextualKeyword.Module,
    namespace: ContextualKeyword.Namespace,
    never: ContextualKeyword.Never,
    of: ContextualKeyword.Of,
    opaque: ContextualKeyword.Opaque,
    out: ContextualKeyword.Out,
    override: ContextualKeyword.Override,
    property: ContextualKeyword.Property,
    readonly: ContextualKeyword.Readonly,
    require: ContextualKeyword.Require,
    satisfies: ContextualKeyword.Satisfies,
    set: ContextualKeyword.Set,
    static: ContextualKeyword.Static,
    symbol: ContextualKeyword.Symbol,
    target: ContextualKeyword.Target,
    type: ContextualKeyword.Type,
    unique: ContextualKeyword.Unique
  };
  const CONTEXTUAL_KEYWORDS_BUT_NOT_RESERVED = {
    declare: ContextualKeyword.Declare
  };
  const FLOW_PRIMITIVE_TYPE_KEYWORDS = {
    any: ContextualKeyword.Any,
    bigint: ContextualKeyword.Bigint,
    boolean: ContextualKeyword.Boolean,
    mixed: ContextualKeyword.Mixed,
    number: ContextualKeyword.Number,
    object: ContextualKeyword.Object,
    string: ContextualKeyword.String,
    void: ContextualKeyword.Void
  };
  function contextualKeywordToToken(contextualKeyword) {
    switch (contextualKeyword) {
      case ContextualKeyword.Enum:
        return tt._enum;
      case ContextualKeyword.Static:
        return tt._static;
      case ContextualKeyword.Void:
        return tt._void;
      default:
        return tt.name;
    }
  }

  function isIdentifierStart(code) {
    if (code > 127) return true;
    if (code >= 97) return code <= 122;
    if (code >= 65) return code <= 90;
    return code === 36 || code === 95;
  }
  function isIdentifierChar(code) {
    if (code > 127) return true;
    if (code >= 97) return code <= 122;
    if (code >= 65) return code <= 90;
    if (code >= 48) return code <= 57;
    return code === 36 || code === 95;
  }

  const ScopeType = /* @__PURE__ */ (function (ScopeType) {
    ScopeType[ScopeType["CLASS_PROPERTY_INITIALIZER"] = 0] = "CLASS_PROPERTY_INITIALIZER";
    ScopeType[ScopeType["CLASS_STATIC_BLOCK"] = 1] = "CLASS_STATIC_BLOCK";
    ScopeType[ScopeType["TYPE"] = 2] = "TYPE";
    ScopeType[ScopeType["JSX_TAG"] = 3] = "JSX_TAG";
    ScopeType[ScopeType["BLOCK"] = 4] = "BLOCK";
    ScopeType[ScopeType["FUNCTION"] = 5] = "FUNCTION";
    ScopeType[ScopeType["FOR_LOOP"] = 6] = "FOR_LOOP";
    ScopeType[ScopeType["SWITCH_STATEMENT"] = 7] = "SWITCH_STATEMENT";
    ScopeType[ScopeType["SWITCH_CASE"] = 8] = "SWITCH_CASE";
    ScopeType[ScopeType["TEMPLATE"] = 9] = "TEMPLATE";
    ScopeType[ScopeType["PAREN_EXPRESSION"] = 10] = "PAREN_EXPRESSION";
    ScopeType[ScopeType["MODULE"] = 11] = "MODULE";
    return ScopeType;
  })(ScopeType || {});
  const BIND_NONE = 0;
  const BIND_VAR = 1;
  const BIND_CONST = 2;
  const BIND_LEXICAL = 3;
  const BIND_FUNCTION = 4;
  const BIND_SIMPLE_CATCH = 5;
  const BIND_OUTSIDE = 6;
  const ScopeFlag = /* @__PURE__ */ (function (ScopeFlag) {
    ScopeFlag[ScopeFlag["Type"] = 1] = "Type";
    ScopeFlag[ScopeFlag["DirectSuper"] = 2] = "DirectSuper";
    ScopeFlag[ScopeFlag["Function"] = 4] = "Function";
    ScopeFlag[ScopeFlag["Arrow"] = 8] = "Arrow";
    ScopeFlag[ScopeFlag["Generator"] = 16] = "Generator";
    ScopeFlag[ScopeFlag["Async"] = 32] = "Async";
    ScopeFlag[ScopeFlag["Module"] = 64] = "Module";
    ScopeFlag[ScopeFlag["Strict"] = 128] = "Strict";
    ScopeFlag[ScopeFlag["TSModule"] = 256] = "TSModule";
    ScopeFlag[ScopeFlag["InClassPropertyInitializer"] = 512] = "InClassPropertyInitializer";
    ScopeFlag[ScopeFlag["InClassStaticBlock"] = 1024] = "InClassStaticBlock";
    ScopeFlag[ScopeFlag["InType"] = 2048] = "InType";
    return ScopeFlag;
  })(ScopeFlag || {});
  class Scope {
    constructor(flags) {
      this.flags = flags;
      this.var = /* @__PURE__ */ new Set();
      this.lexical = /* @__PURE__ */ new Set();
      this.functions = /* @__PURE__ */ new Set();
    }
  }

  /**
   * Describes a type of token.
   */
  class TokenType {
    constructor(label, conf = {}) {
      this.label = label;
      this.keyword = conf.keyword;
      this.beforeExpr = !!conf.beforeExpr;
      this.startsExpr = !!conf.startsExpr;
      this.isLoop = !!conf.isLoop;
      this.isAssign = !!conf.isAssign;
      this.prefix = !!conf.prefix;
      this.postfix = !!conf.postfix;
      this.binop = conf.binop || null;
      this.rightAssociative = !!conf.rightAssociative;
      this.updateContext = null;
      this.shortName = label.replace(/\(.*/, "");
    }
  }
  class Token {
    constructor(type, value, start, end, startLoc, endLoc) {
      this.type = type;
      this.value = value;
      this.start = start;
      this.end = end;
      this.startLoc = startLoc;
      this.endLoc = endLoc;
    }
  }

  // As this file is alternative to `acorn-walk` that is using `Node` type,
  // we must declare it here but we can't import it since it would cause circular dependency.
  const tt = {
    // Punctuation tokens.
    bracketL: new TokenType("[", {
      beforeExpr: true,
      startsExpr: true
    }),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", {
      beforeExpr: true,
      startsExpr: true
    }),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", {
      beforeExpr: true,
      startsExpr: true
    }),
    parenR: new TokenType(")"),
    comma: new TokenType(",", {
      beforeExpr: true
    }),
    semi: new TokenType(";", {
      beforeExpr: true
    }),
    colon: new TokenType(":", {
      beforeExpr: true
    }),
    doubleColon: new TokenType("::", {
      beforeExpr: true
    }),
    dot: new TokenType("."),
    question: new TokenType("?", {
      beforeExpr: true
    }),
    questionDot: new TokenType("?."),
    arrow: new TokenType("=>", {
      beforeExpr: true
    }),
    template: new TokenType("template"),
    ellipsis: new TokenType("...", {
      beforeExpr: true
    }),
    backQuote: new TokenType("`", {
      startsExpr: true
    }),
    dollarBraceL: new TokenType("${", {
      beforeExpr: true,
      startsExpr: true
    }),
    // Special hashbang token.
    hash: new TokenType("#", {
      beforeExpr: true,
      startsExpr: true
    }),
    // Var-like tokens, may appear in expressions.
    _break: new TokenType("break", {
      keyword: "break"
    }),
    _case: new TokenType("case", {
      beforeExpr: true,
      keyword: "case"
    }),
    _catch: new TokenType("catch", {
      keyword: "catch"
    }),
    _continue: new TokenType("continue", {
      keyword: "continue"
    }),
    _debugger: new TokenType("debugger", {
      keyword: "debugger"
    }),
    _default: new TokenType("default", {
      beforeExpr: true,
      keyword: "default"
    }),
    _do: new TokenType("do", {
      isLoop: true,
      beforeExpr: true,
      keyword: "do"
    }),
    _else: new TokenType("else", {
      beforeExpr: true,
      keyword: "else"
    }),
    _finally: new TokenType("finally", {
      keyword: "finally"
    }),
    _for: new TokenType("for", {
      isLoop: true,
      keyword: "for"
    }),
    _function: new TokenType("function", {
      startsExpr: true,
      keyword: "function"
    }),
    _if: new TokenType("if", {
      keyword: "if"
    }),
    _return: new TokenType("return", {
      beforeExpr: true,
      keyword: "return"
    }),
    _switch: new TokenType("switch", {
      keyword: "switch"
    }),
    _throw: new TokenType("throw", {
      beforeExpr: true,
      keyword: "throw"
    }),
    _try: new TokenType("try", {
      keyword: "try"
    }),
    _var: new TokenType("var", {
      keyword: "var"
    }),
    _let: new TokenType("let", {
      keyword: "let"
    }),
    _const: new TokenType("const", {
      keyword: "const"
    }),
    _while: new TokenType("while", {
      isLoop: true,
      keyword: "while"
    }),
    _with: new TokenType("with", {
      keyword: "with"
    }),
    _new: new TokenType("new", {
      beforeExpr: true,
      startsExpr: true,
      keyword: "new"
    }),
    _this: new TokenType("this", {
      startsExpr: true,
      keyword: "this"
    }),
    _super: new TokenType("super", {
      startsExpr: true,
      keyword: "super"
    }),
    _class: new TokenType("class", {
      startsExpr: true,
      keyword: "class"
    }),
    _extends: new TokenType("extends", {
      beforeExpr: true,
      keyword: "extends"
    }),
    _export: new TokenType("export", {
      keyword: "export"
    }),
    _import: new TokenType("import", {
      startsExpr: true,
      keyword: "import"
    }),
    _yield: new TokenType("yield", {
      beforeExpr: true,
      startsExpr: true,
      keyword: "yield"
    }),
    _null: new TokenType("null", {
      startsExpr: true,
      keyword: "null"
    }),
    _true: new TokenType("true", {
      startsExpr: true,
      keyword: "true"
    }),
    _false: new TokenType("false", {
      startsExpr: true,
      keyword: "false"
    }),
    _in: new TokenType("in", {
      beforeExpr: true,
      binop: 7,
      keyword: "in"
    }),
    _instanceof: new TokenType("instanceof", {
      beforeExpr: true,
      binop: 7,
      keyword: "instanceof"
    }),
    _typeof: new TokenType("typeof", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true,
      keyword: "typeof"
    }),
    _void: new TokenType("void", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true,
      keyword: "void"
    }),
    _delete: new TokenType("delete", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true,
      keyword: "delete"
    }),
    // Other tokens.
    name: new TokenType("name", {
      startsExpr: true
    }),
    string: new TokenType("string", {
      startsExpr: true
    }),
    num: new TokenType("num", {
      startsExpr: true
    }),
    bigint: new TokenType("bigint", {
      startsExpr: true
    }),
    regexp: new TokenType("regexp", {
      startsExpr: true
    }),
    privateId: new TokenType("privateId", {
      startsExpr: true
    }),
    // Operators. These carry their precedence with them.
    eq: new TokenType("=", {
      beforeExpr: true,
      isAssign: true
    }),
    assign: new TokenType("_=", {
      beforeExpr: true,
      isAssign: true
    }),
    incDec: new TokenType("++/--", {
      prefix: true,
      postfix: true,
      startsExpr: true
    }),
    preIncDec: new TokenType("++/-- (prefix)", {
      prefix: true,
      startsExpr: true
    }),
    postIncDec: new TokenType("++/-- (postfix)", {
      postfix: true
    }),
    bang: new TokenType("!", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    tilde: new TokenType("~", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    logicalOR: new TokenType("||", {
      beforeExpr: true,
      binop: 1
    }),
    logicalAND: new TokenType("&&", {
      beforeExpr: true,
      binop: 2
    }),
    bitwiseOR: new TokenType("|", {
      beforeExpr: true,
      binop: 3
    }),
    bitwiseXOR: new TokenType("^", {
      beforeExpr: true,
      binop: 4
    }),
    bitwiseAND: new TokenType("&", {
      beforeExpr: true,
      binop: 5
    }),
    equality: new TokenType("==/!=/===/!==", {
      beforeExpr: true,
      binop: 6
    }),
    relational: new TokenType("</>/<=/>=", {
      beforeExpr: true,
      binop: 7
    }),
    bitShift: new TokenType("<</>>/>>>", {
      beforeExpr: true,
      binop: 8
    }),
    plusMin: new TokenType("+/-", {
      beforeExpr: true,
      binop: 9,
      prefix: true,
      startsExpr: true
    }),
    modulo: new TokenType("%", {
      beforeExpr: true,
      binop: 10
    }),
    star: new TokenType("*", {
      beforeExpr: true,
      binop: 10
    }),
    slash: new TokenType("/", {
      beforeExpr: true,
      binop: 10
    }),
    exponent: new TokenType("**", {
      beforeExpr: true,
      binop: 11,
      rightAssociative: true
    }),
    coalesce: new TokenType("??", {
      beforeExpr: true,
      binop: 1
    }),
    eof: new TokenType("eof"),
    // JSX-related tokens.
    jsxName: new TokenType("jsxName"),
    jsxText: new TokenType("jsxText", {
      beforeExpr: true
    }),
    jsxTagStart: new TokenType("jsxTagStart", {
      startsExpr: true
    }),
    jsxTagEnd: new TokenType("jsxTagEnd"),
    // TypeScript-specific tokens.
    // Reserved keywords with no special token type.
    _abstract: keyword("abstract"),
    _accessor: keyword("accessor"),
    _as: keyword("as"),
    _assert: keyword("assert"),
    _asserts: keyword("asserts"),
    _async: keyword("async"),
    _await: keyword("await", {
      startsExpr: true
    }),
    _checks: keyword("checks"),
    _constructor: keyword("constructor", {
      startsExpr: true
    }),
    _declare: keyword("declare"),
    _enum: keyword("enum", {
      startsExpr: true
    }),
    _exports: keyword("exports"),
    _from: keyword("from"),
    _get: keyword("get"),
    _global: keyword("global"),
    _implements: keyword("implements"),
    _infer: keyword("infer"),
    _interface: keyword("interface"),
    _is: keyword("is"),
    _keyof: keyword("keyof"),
    _mixins: keyword("mixins"),
    _module: keyword("module"),
    _namespace: keyword("namespace"),
    _never: keyword("never"),
    _of: keyword("of"),
    _opaque: keyword("opaque"),
    _out: keyword("out"),
    _override: keyword("override"),
    _private: keyword("private"),
    _protected: keyword("protected"),
    _proto: keyword("proto"),
    _public: keyword("public"),
    _readonly: keyword("readonly"),
    _require: keyword("require"),
    _satisfies: keyword("satisfies"),
    _set: keyword("set"),
    _static: keyword("static"),
    _symbol: keyword("symbol", {
      startsExpr: true
    }),
    _type: keyword("type"),
    _unique: keyword("unique"),
    // Other TypeScript tokens.
    nonNullAssertion: new TokenType("! (non-null assertion)")
  };
  function keyword(name, options = {}) {
    return new TokenType(name, {
      keyword: name,
      ...options
    });
  }

  /**
   * Check if a character is a decimal digit.
   */
  function isDigit(code) {
    return code >= charCodes$1.digit0 && code <= charCodes$1.digit9;
  }

  function SourceLocation(start) {
    this.line = start.line;
    this.column = start.column;
    this.offset = start.offset;
  }
  class Position {
    constructor(line, column, offset) {
      this.line = line;
      this.column = column;
      this.offset = offset;
    }
  }

  /**
   * The algorithm used to determine whether a regexp can appear at a
   * given point in the program is loosely based on sweet.js's approach.
   * See https://github.com/mozilla/sweet.js/wiki/design
   */
  function canInsertSemicolon(code, lastTokenLine, lastTokenLineStart) {
    let nextToken = null;
    let nextTokenStart = -1;
    for (let i = lastTokenLineStart; i < code.length; i++) {
      const charCode = code.charCodeAt(i);
      if (charCode === charCodes$1.lineFeed || charCode === charCodes$1.carriageReturn || charCode === charCodes$1.lineSeparator || charCode === charCodes$1.paragraphSeparator) {
        continue;
      }
      if (charCode === charCodes$1.slash && code.charCodeAt(i + 1) === charCodes$1.slash) {
        i++;
        while (i < code.length) {
          const nextCharCode = code.charCodeAt(i);
          if (nextCharCode === charCodes$1.lineFeed || nextCharCode === charCodes$1.carriageReturn || nextCharCode === charCodes$1.lineSeparator || nextCharCode === charCodes$1.paragraphSeparator) {
            break;
          }
          i++;
        }
        continue;
      }
      if (charCode === charCodes$1.slash && code.charCodeAt(i + 1) === charCodes$1.asterisk) {
        i += 2;
        while (i + 1 < code.length) {
          if (code.charCodeAt(i) === charCodes$1.asterisk && code.charCodeAt(i + 1) === charCodes$1.slash) {
            i++;
            break;
          }
          i++;
        }
        continue;
      }
      nextToken = code.charCodeAt(i);
      nextTokenStart = i;
      break;
    }
    if (nextToken === null || nextToken === charCodes$1.rightCurlyBrace || nextTokenStart === -1) {
      return true;
    }
    for (let i = lastTokenLine.length - 1; i >= 0; i--) {
      const token = lastTokenLine[i];
      if (token.type !== tt.comment) {
        return token.type.beforeExpr;
      }
    }
    return false;
  }
  class Tokenizer {
    constructor(code, options) {
      this.input = code;
      this.options = options;
      this.isJSXEnabled = options.isJSXEnabled;
      this.isTypeScriptEnabled = options.isTypeScriptEnabled;
      this.isFlowEnabled = options.isFlowEnabled;
      this.pos = this.lineStart = 0;
      this.curLine = 1;
      this.type = tt.eof;
      this.value = null;
      this.start = this.end = this.pos;
      this.startLoc = this.endLoc = this.curPosition();
      this.lastTokenEnd = 0;
      this.lastTokenEndLoc = this.curPosition();
      this.context = this.initialContext();
      this.potentialArrowAt = -1;
      this.potentialArrowInForAwait = false;
      this.isModule = false;
      this.inAsync = false;
      this.yieldInPossibleArrowParameters = null;
      this.isLookahead = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static inferAssignedNumber(num) {
      if (num === Math.round(num)) {
        return num;
      }
      const s = String(num);
      let dotIndex = s.indexOf(".");
      if (dotIndex === -1) {
        dotIndex = s.length;
      }
      for (let i = dotIndex + 1; i < s.length; i++) {
        if (s[i] !== "0") {
          return null;
        }
      }
      return num;
    }
    initialContext() {
      return [new TokenizationContext(
        /* isExprAllowed */
        true,
        /* isModule */
        false
      )];
    }
    curPosition() {
      return new Position(this.curLine, this.pos - this.lineStart, this.pos);
    }
    // TODO: This is not a great way to manage this. We should move to a system
    // where the value is always something serializable.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    finishToken(type, val) {
      this.end = this.pos;
      this.endLoc = this.curPosition();
      const prevType = this.type;
      this.type = type;
      this.value = val;
      if (!this.isLookahead) {
        this.updateContext(prevType);
      }
    }
    // ### Token reading

    // This is the tokenizer's central function. It should be called to
    // advance to the next token. It returns the type of that token.
    next() {
      if (!this.isLookahead) {
        this.lastTokenEnd = this.end;
        this.lastTokenEndLoc = this.endLoc;
      }
      this.start = this.pos;
      this.startLoc = this.curPosition();
      if (this.pos >= this.input.length) {
        this.finishToken(tt.eof);
        return;
      }
      this.skipSpace();
      this.start = this.pos;
      this.startLoc = this.curPosition();
      if (this.pos >= this.input.length) {
        this.finishToken(tt.eof);
        return;
      }
      this.readToken(this.fullCharCodeAtPos());
    }
    eat(type) {
      if (this.type === type) {
        this.next();
        return true;
      } else {
        return false;
      }
    }
    // Most of the tokenizer logic lives in `readToken`. This is the only part of the code that needs to be traversed for performance. It is
    // factored out into its own file for this reason.
    readToken(code) {
      return this.readToken_dot() || this.readToken_slash() || this.readToken_interpreter() || this.readToken_relation() || this.readToken_mult_modulo_exp(code) || this.readToken_pipe_amp(code) || this.readToken_caret() || this.readToken_plus_min(code) || this.readToken_lt_gt(code) || this.readToken_other(code);
    }
    readToken_dot() {
      const next = this.input.charCodeAt(this.pos + 1);
      if (next >= charCodes$1.digit0 && next <= charCodes$1.digit9) {
        this.readNumber(true);
        return true;
      }
      const next2 = this.input.charCodeAt(this.pos + 2);
      if (next === charCodes$1.dot && next2 === charCodes$1.dot) {
        this.pos += 3;
        this.finishToken(tt.ellipsis);
      } else {
        this.pos++;
        this.finishToken(tt.dot);
      }
      return true;
    }
    readToken_slash() {
      if (this.isSyntaxEnabled("jsx") && this.curContext().isJSX && this.input.charCodeAt(this.pos) === charCodes$1.lessThan && this.input.charCodeAt(this.pos + 1) === charCodes$1.slash) {
        return false;
      }
      const code = this.input.charCodeAt(this.pos);
      if (code !== charCodes$1.slash) {
        return false;
      }
      const next = this.input.charCodeAt(this.pos + 1);
      if (next === charCodes$1.equalsTo) {
        this.finishOp(tt.assign, 2);
      } else if (this.curContext().isExprAllowed) {
        this.readRegexp();
      } else {
        this.finishOp(tt.slash, 1);
      }
      return true;
    }
    readToken_interpreter() {
      if (this.pos !== 0 || this.input.length < 2) return false;
      const code = this.input.charCodeAt(this.pos);
      if (code !== charCodes$1.hash || this.input.charCodeAt(this.pos + 1) !== charCodes$1.exclamationMark) {
        return false;
      }
      this.skipLineComment(2);
      this.skipSpace();
      this.readToken(this.fullCharCodeAtPos());
      return true;
    }
    readToken_relation() {
      const code = this.input.charCodeAt(this.pos);
      if (code !== charCodes$1.exclamationMark && code !== charCodes$1.equalsTo) {
        return false;
      }
      const next = this.input.charCodeAt(this.pos + 1);
      if (next !== charCodes$1.equalsTo) {
        this.finishOp(code === charCodes$1.exclamationMark ? tt.bang : tt.eq, 1);
        return true;
      }
      if (this.input.charCodeAt(this.pos + 2) === charCodes$1.equalsTo) {
        this.finishOp(tt.equality, 3);
      } else {
        this.finishOp(tt.equality, 2);
      }
      return true;
    }
    readToken_mult_modulo_exp(code) {
      let token;
      let size = 1;
      const next = this.input.charCodeAt(this.pos + 1);
      if (code === charCodes$1.asterisk) {
        token = tt.star;
      } else if (code === charCodes$1.percentSign) {
        token = tt.modulo;
      } else {
        return false;
      }
      if (next === charCodes$1.equalsTo && !this.curContext().isExprAllowed) {
        size = 2;
        token = tt.assign;
      } else if (next === charCodes$1.asterisk && code === charCodes$1.asterisk) {
        size = 2;
        token = tt.exponent;
        if (this.input.charCodeAt(this.pos + 2) === charCodes$1.equalsTo && !this.curContext().isExprAllowed) {
          size = 3;
          token = tt.assign;
        }
      }
      this.finishOp(token, size);
      return true;
    }
    readToken_pipe_amp(code) {
      let token;
      if (code === charCodes$1.verticalBar) {
        token = tt.bitwiseOR;
      } else if (code === charCodes$1.ampersand) {
        token = tt.bitwiseAND;
      } else {
        return false;
      }
      const next = this.input.charCodeAt(this.pos + 1);
      if (next === code) {
        token = code === charCodes$1.verticalBar ? tt.logicalOR : tt.logicalAND;
        if (this.input.charCodeAt(this.pos + 2) === charCodes$1.equalsTo) {
          this.finishOp(tt.assign, 3);
        } else {
          this.finishOp(token, 2);
        }
      } else if (next === charCodes$1.equalsTo) {
        this.finishOp(tt.assign, 2);
      } else {
        this.finishOp(token, 1);
      }
      return true;
    }
    readToken_caret() {
      const code = this.input.charCodeAt(this.pos);
      if (code !== charCodes$1.caret) {
        return false;
      }
      const next = this.input.charCodeAt(this.pos + 1);
      if (next === charCodes$1.equalsTo) {
        this.finishOp(tt.assign, 2);
      } else {
        this.finishOp(tt.bitwiseXOR, 1);
      }
      return true;
    }
    readToken_plus_min(code) {
      if (code !== charCodes$1.plusSign && code !== charCodes$1.dash) {
        return false;
      }
      const next = this.input.charCodeAt(this.pos + 1);
      if (next === code) {
        if (!this.isLookahead && next === charCodes$1.dash && this.input.charCodeAt(this.pos + 2) === charCodes$1.greaterThan && this.lastTokenEnd === this.lastTokenEndLoc.offset && this.lastTokenEndLoc.column === 0 && this.type !== tt.string) {
          this.skipLineComment(3);
          this.skipSpace();
          this.next();
          return true;
        }
        this.finishOp(tt.incDec, 2);
      } else if (next === charCodes$1.equalsTo) {
        this.finishOp(tt.assign, 2);
      } else {
        this.finishOp(tt.plusMin, 1);
      }
      return true;
    }
    readToken_lt_gt(code) {
      let token = tt.relational;
      let size = 1;
      const next = this.input.charCodeAt(this.pos + 1);
      if (this.isSyntaxEnabled("jsx") && code === charCodes$1.lessThan && this.curContext().isExprAllowed) {
        this.pos++;
        this.start = this.pos;
        this.readJsxToken();
        return true;
      }
      if (next === code && (code === charCodes$1.greaterThan || code === charCodes$1.lessThan)) {
        size = 2;
        token = tt.bitShift;
        if (this.input.charCodeAt(this.pos + 2) === charCodes$1.equalsTo) {
          size = 3;
          token = tt.assign;
        } else if (code === charCodes$1.greaterThan && this.input.charCodeAt(this.pos + 2) === charCodes$1.greaterThan) {
          size = 3;
          if (this.input.charCodeAt(this.pos + 3) === charCodes$1.equalsTo) {
            size = 4;
            token = tt.assign;
          }
        }
      } else if (next === charCodes$1.equalsTo) {
        size = 2;
      }
      this.finishOp(token, size);
      return true;
    }
    readToken_other(code) {
      this.finishOp(this.readToken_other_punct(code) || this.readWord() || this.readNumber(false) || this.readString(code), this.pos - this.start);
      return true;
    }
    readToken_other_punct(code) {
      switch (code) {
        case charCodes$1.leftSquareBracket:
          ++this.pos;
          return tt.bracketL;
        case charCodes$1.rightSquareBracket:
          ++this.pos;
          return tt.bracketR;
        case charCodes$1.leftCurlyBrace:
          ++this.pos;
          return tt.braceL;
        case charCodes$1.rightCurlyBrace:
          ++this.pos;
          return tt.braceR;
        case charCodes$1.leftParen:
          ++this.pos;
          return tt.parenL;
        case charCodes$1.rightParen:
          ++this.pos;
          return tt.parenR;
        case charCodes$1.comma:
          ++this.pos;
          return tt.comma;
        case charCodes$1.semicolon:
          ++this.pos;
          return tt.semi;
        case charCodes$1.tilde:
          ++this.pos;
          return tt.tilde;
        case charCodes$1.backQuote:
          ++this.pos;
          return tt.backQuote;
        case charCodes$1.dollarSign:
          {
            if (this.input.charCodeAt(this.pos + 1) === charCodes$1.leftCurlyBrace) {
              this.pos += 2;
              return tt.dollarBraceL;
            }
          }
        case charCodes$1.colon:
          {
            if (this.isSyntaxEnabled("flow") && this.input.charCodeAt(this.pos + 1) === charCodes$1.rightSquareBracket) {
              return this.readFlowArrayLike(
                /* isShort */
                false
              );
            } else if (this.isSyntaxEnabled("flow") && this.input.charCodeAt(this.pos + 1) === charCodes$1.verticalBar) {
              return this.readFlowArrayLike(
                /* isShort */
                true
              );
            }
            if (this.input.charCodeAt(this.pos + 1) === charCodes$1.colon) {
              this.pos += 2;
              return tt.doubleColon;
            } else {
              ++this.pos;
              return tt.colon;
            }
          }
        case charCodes$1.questionMark:
          {
            const next = this.input.charCodeAt(this.pos + 1);
            if (next === charCodes$1.dot && !(this.input.charCodeAt(this.pos + 2) >= charCodes$1.digit0 && this.input.charCodeAt(this.pos + 2) <= charCodes$1.digit9)) {
              this.pos += 2;
              return tt.questionDot;
            } else if (this.isSyntaxEnabled("flow") && next === charCodes$1.dot) {
              this.raise(this.pos, `Unexpected token, expected "..."`);
            } else if (next === charCodes$1.questionMark) {
              if (this.input.charCodeAt(this.pos + 2) === charCodes$1.equalsTo) {
                this.pos += 3;
                return tt.assign;
              }
              this.pos += 2;
              return tt.coalesce;
            }
            ++this.pos;
            return tt.question;
          }
        case charCodes$1.hash:
          {
            if (this.isSyntaxEnabled("classFields")) {
              ++this.pos;
              const word = this.readWord1();
              if (word === null) {
                this.raise(this.start, "Unexpected character after #");
              }
              this.finishToken(tt.privateId, word);
            } else {
              this.raise(this.start, "Unexpected character '#'");
            }
            return null;
          }
        default:
          return null;
      }
    }
    // Read a word, potentially turning it into a keyword.
    readWord() {
      const word = this.readWord1();
      if (word === null) {
        return null;
      }
      if (this.isSyntaxEnabled("jsx") && (this.type === tt.jsxTagStart || this.type === tt.jsxTagEnd)) {
        this.finishToken(tt.jsxName, word);
        return tt.jsxName;
      }
      let type = tt.name;
      if (!this.isLookahead) {
        if (isKeyword(word)) {
          type = keywordToToken(KEYWORDS[word]);
        } else if (word in CONTEXTUAL_KEYWORDS) {
          type = contextualKeywordToToken(CONTEXTUAL_KEYWORDS[word]);
        }
      }
      this.finishToken(type, word);
      return type;
    }
    // Most of the tokenizer logic lives in `readToken`. This is the only part of the code that needs to be traversed for performance. It is
    // factored out into its own file for this reason.
    getTokenFromCode(code) {
      if (code === charCodes$1.dot || code >= charCodes$1.digit0 && code <= charCodes$1.digit9) {
        this.readToken_dot_num(code);
      } else if (code === charCodes$1.slash) {
        this.readToken_slash();
      } else if (code === charCodes$1.percentSign || code === charCodes$1.asterisk) {
        this.readToken_mult_modulo(code);
      } else if (code === charCodes$1.verticalBar || code === charCodes$1.ampersand) {
        this.readToken_pipe_amp(code);
      } else if (code === charCodes$1.caret) {
        this.readToken_caret();
      } else if (code === charCodes$1.plusSign || code === charCodes$1.dash) {
        this.readToken_plus_min(code);
      } else if (code === charCodes$1.lessThan || code === charCodes$1.greaterThan) {
        this.readToken_lt_gt(code);
      } else if (code === charCodes$1.equalsTo || code === charCodes$1.exclamationMark) {
        this.readToken_eq_excl(code);
      } else if (code === charCodes$1.leftParen || code === charCodes$1.rightParen || code === charCodes$1.semicolon || code === charCodes$1.comma || code === charCodes$1.leftSquareBracket || code === charCodes$1.rightSquareBracket || code === charCodes$1.leftCurlyBrace || code === charCodes$1.rightCurlyBrace || code === charCodes$1.tilde || code === charCodes$1.questionMark) {
        this.readToken_punc(code);
      } else if (code === charCodes$1.backQuote) {
        this.finishOp(tt.backQuote, 1);
      } else if (code === charCodes$1.at) {
        if (this.isSyntaxEnabled("decorators")) {
          this.readToken_at();
        } else {
          this.readWord();
        }
      } else if (code === charCodes$1.hash) {
        if (this.options.enableLegacyPrivateFields) {
          this.finishOp(tt.hash, 1);
        } else {
          this.readToken_privateId(code);
        }
      } else if (code === charCodes$1.dollarSign && this.input.charCodeAt(this.pos + 1) === charCodes$1.leftCurlyBrace) {
        this.finishOp(tt.dollarBraceL, 2);
      } else {
        this.readWord();
      }
    }
    // Read a number, octal or hexadecimal integer, or float.
    readNumber(startsWithDot) {
      let start = this.pos;
      let isFloat = false;
      let isBigInt = false;
      let isOctal = false;
      if (!startsWithDot && this.readInt(
        /* radix */
        10
      ) === null) {
        return null;
      }
      if (this.input.charCodeAt(this.pos) === charCodes$1.digit0) {
        const next = this.input.charCodeAt(this.pos + 1);
        if (next === charCodes$1.lowercaseX || next === charCodes$1.uppercaseX) {
          this.pos += 2;
          if (this.readInt(16) === null) {
            this.raise(start, "Expected hexadecimal number");
          }
          if (this.isSyntaxEnabled("numericSeparator")) {
            this.removeUnderscores(start);
          }
          if (this.input.charCodeAt(this.pos) === charCodes$1.lowercaseN) {
            this.pos++;
            isBigInt = true;
          }
          this.finishToken(isBigInt ? tt.bigint : tt.num, this.input.slice(start, this.pos));
          return tt.num;
        }
        if (next === charCodes$1.lowercaseO || next === charCodes$1.uppercaseO) {
          this.pos += 2;
          if (this.readInt(8) === null) {
            this.raise(start, "Expected octal number");
          }
          if (this.isSyntaxEnabled("numericSeparator")) {
            this.removeUnderscores(start);
          }
          if (this.input.charCodeAt(this.pos) === charCodes$1.lowercaseN) {
            this.pos++;
            isBigInt = true;
          }
          this.finishToken(isBigInt ? tt.bigint : tt.num, this.input.slice(start, this.pos));
          return tt.num;
        }
        if (next === charCodes$1.lowercaseB || next === charCodes$1.uppercaseB) {
          this.pos += 2;
          if (this.readInt(2) === null) {
            this.raise(start, "Expected binary number");
          }
          if (this.isSyntaxEnabled("numericSeparator")) {
            this.removeUnderscores(start);
          }
          if (this.input.charCodeAt(this.pos) === charCodes$1.lowercaseN) {
            this.pos++;
            isBigInt = true;
          }
          this.finishToken(isBigInt ? tt.bigint : tt.num, this.input.slice(start, this.pos));
          return tt.num;
        }
        if (next >= charCodes$1.digit0 && next <= charCodes$1.digit7) {
          this.raise(start, "Legacy octal literals are not available in strict mode");
        }
      }
      if (!startsWithDot && (this.input[start] === "0" && (this.pos - start > 1 || this.input.length === 1) || this.pos - start >= 1 && this.input[start] !== "0")) {
        isOctal = true;
      }
      let next = this.input.charCodeAt(this.pos);
      if (next === charCodes$1.dot && !isOctal) {
        this.pos++;
        this.readInt(10);
        isFloat = true;
        next = this.input.charCodeAt(this.pos);
      }
      if ((next === charCodes$1.uppercaseE || next === charCodes$1.lowercaseE) && !isOctal) {
        this.pos++;
        next = this.input.charCodeAt(this.pos);
        if (next === charCodes$1.plusSign || next === charCodes$1.dash) {
          this.pos++;
        }
        if (this.readInt(10) === null) {
          this.raise(start, "Expected number in exponent");
        }
        isFloat = true;
      }
      if (this.input.charCodeAt(this.pos) === charCodes$1.lowercaseN) {
        if (isFloat || this.readInt(10) !== null) {
          this.raise(this.start, "Identifier directly after number");
        }
        this.pos++;
        isBigInt = true;
      }
      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.start, "Identifier directly after number");
      }
      if (this.isSyntaxEnabled("numericSeparator")) {
        this.removeUnderscores(start);
      }
      this.finishToken(isBigInt ? tt.bigint : tt.num, this.input.slice(start, this.pos));
      return tt.num;
    }
    removeUnderscores(start) {
      let underscoreToRemove = -1;
      let hadUnderscore = false;
      for (let i = this.pos - 1; i >= start; i--) {
        if (this.input.charCodeAt(i) === charCodes$1.underscore) {
          if (underscoreToRemove === -1) {
            underscoreToRemove = i;
          }
          hadUnderscore = true;
        } else {
          underscoreToRemove = -1;
        }
      }
      if (hadUnderscore) {
        let newStr = "";
        let lastUnderscore = this.pos;
        for (let i = this.pos - 1; i >= start; i--) {
          if (this.input.charCodeAt(i) === charCodes$1.underscore) {
            newStr = this.input.slice(i + 1, lastUnderscore) + newStr;
            lastUnderscore = i;
          }
        }
        newStr = this.input.slice(start, lastUnderscore) + newStr;
        this.value = newStr;
      }
    }
    // Read an integer in the given radix. Return null if zero digits
    // were read, the integer value otherwise.
    readInt(radix) {
      let start = this.pos;
      let total = 0;
      let hadUnderscore = false;
      for (let i = 0, e = this.input.length; i < e; ++i) {
        const code = this.input.charCodeAt(this.pos);
        if (code === charCodes$1.underscore && this.isSyntaxEnabled("numericSeparator")) {
          hadUnderscore = true;
          this.pos++;
          continue;
        }
        let val;
        if (code >= charCodes$1.lowercaseA) {
          val = code - charCodes$1.lowercaseA + 10;
        } else if (code >= charCodes$1.uppercaseA) {
          val = code - charCodes$1.uppercaseA + 10;
        } else if (isDigit(code)) {
          val = code - charCodes$1.digit0;
        } else {
          val = Infinity;
        }
        if (val >= radix) {
          break;
        }
        this.pos++;
        total = total * radix + val;
      }
      if (this.pos === start) {
        return null;
      }
      if (hadUnderscore) {
        return -1;
      }
      return total;
    }
    // Read a string value, interpreting backslash-escapes.
    readCodePoint() {
      const ch = this.input.charCodeAt(this.pos);
      let code;
      if (ch === charCodes$1.leftCurlyBrace && this.isSyntaxEnabled("es2015")) {
        this.pos++;
        code = this.readHexChar(this.input.indexOf("}") - this.pos);
        this.pos++;
        if (code === null || code > 1114111) {
          return null;
        }
      } else {
        code = this.readHexChar(4);
      }
      return code;
    }
    readString(quote) {
      let out = "";
      let chunkStart = ++this.pos;
      for (;;) {
        if (this.pos >= this.input.length) {
          this.raise(this.start, "Unterminated string constant");
        }
        const ch = this.input.charCodeAt(this.pos);
        if (ch === quote) {
          break;
        }
        if (ch === charCodes$1.backslash) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.readEscapedChar(
            /* inTemplate */
            false
          );
          chunkStart = this.pos;
        } else {
          if (isNewLine(ch)) {
            this.raise(this.start, "Unterminated string constant");
          }
          ++this.pos;
        }
      }
      out += this.input.slice(chunkStart, this.pos++);
      this.finishToken(tt.string, out);
      return tt.string;
    }
    // Reads template string tokens.
    readTmplToken() {
      let out = "";
      let chunkStart = this.pos;
      for (;;) {
        if (this.pos >= this.input.length) {
          this.raise(this.start, "Unterminated template");
        }
        const ch = this.input.charCodeAt(this.pos);
        if (ch === charCodes$1.backQuote || ch === charCodes$1.dollarSign && this.input.charCodeAt(this.pos + 1) === charCodes$1.leftCurlyBrace) {
          if (this.pos === this.start && this.type === tt.template) {
            if (ch === charCodes$1.dollarSign) {
              this.pos += 2;
              this.finishToken(tt.dollarBraceL);
              return;
            } else {
              this.pos++;
              this.finishToken(tt.backQuote);
              return;
            }
          }
          out += this.input.slice(chunkStart, this.pos);
          this.finishToken(tt.template, out);
          return;
        }
        if (ch === charCodes$1.backslash) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.readEscapedChar(
            /* inTemplate */
            true
          );
          chunkStart = this.pos;
        } else {
          ++this.pos;
        }
      }
    }
    // Read a backslash-escaped character and return its value.
    readEscapedChar(inTemplate) {
      const ch = this.input.charCodeAt(++this.pos);
      ++this.pos;
      switch (ch) {
        case charCodes$1.lowercaseN:
          return "\n";
        case charCodes$1.lowercaseB:
          return "\b";
        case charCodes$1.lowercaseF:
          return "\f";
        case charCodes$1.carriageReturn:
          if (this.input.charCodeAt(this.pos) === charCodes$1.lineFeed) {
            ++this.pos;
          }
        case charCodes$1.lineFeed:
          this.curLine++;
          this.lineStart = this.pos;
          return "";
        default:
          if (ch >= charCodes$1.digit0 && ch <= charCodes$1.digit7) {
            if (this.isStrict()) {
              this.raise(this.pos - 2, "Legacy octal escapes are not allowed in strict mode");
            }
            if (inTemplate) {
              return String.fromCodePoint(ch - charCodes$1.digit0);
            }
            let octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
            let octalVal = parseInt(octalStr, 8);
            if (octalVal > 255) {
              octalStr = octalStr.slice(0, -1);
              octalVal = parseInt(octalStr, 8);
            }
            this.pos += octalStr.length - 1;
            return String.fromCodePoint(octalVal);
          } else if (ch === charCodes$1.lowercaseX) {
            const result = this.readHexChar(2);
            if (result === null) {
              this.raise(this.pos, "Bad character escape sequence");
            }
            return String.fromCodePoint(result);
          } else if (ch === charCodes$1.lowercaseE) {
            const code = this.readCodePoint();
            if (code === null) {
              this.raise(this.pos, "Bad character escape sequence");
            }
            return codePointToString(code);
          } else {
            return String.fromCodePoint(ch);
          }
      }
    }
    readHexChar(len) {
      const start = this.pos;
      const result = this.readInt(16);
      if (result === null || this.pos - start !== len) {
        return null;
      }
      return result;
    }
    readWord1() {
      let word = "";
      let first = true;
      let chunkStart = this.pos;
      while (this.pos < this.input.length) {
        const ch = this.fullCharCodeAtPos();
        if (isIdentifierChar(ch)) {
          this.pos += ch <= 65535 ? 1 : 2;
        } else if (ch === charCodes$1.backslash && this.isSyntaxEnabled("es2015")) {
          word += this.input.slice(chunkStart, this.pos);
          const esc = this.readEscapedIdentifier();
          if (esc !== null) {
            word += esc;
            chunkStart = this.pos;
          } else {
            return word + this.input.slice(chunkStart, this.pos);
          }
        } else {
          break;
        }
        first = false;
      }
      return word + this.input.slice(chunkStart, this.pos);
    }
    readEscapedIdentifier() {
      if (this.input.charCodeAt(this.pos) !== charCodes$1.backslash) {
        return null;
      }
      if (this.input.charCodeAt(this.pos + 1) !== charCodes$1.lowercaseE) {
        this.raise(this.pos, "Expecting Unicode escape sequence \\uXXXX");
      }
      this.pos += 2;
      const code = this.readCodePoint();
      if (code === null) {
        this.raise(this.pos, "Bad Unicode escape sequence");
      }
      return codePointToString(code);
    }
    readRegexp() {
      const start = this.pos;
      let escaped, inClass;
      for (;;) {
        if (this.pos >= this.input.length) {
          this.raise(start, "Unterminated regular expression");
        }
        const ch = this.input.charAt(this.pos);
        if (isNewLine(ch.charCodeAt(0))) {
          this.raise(start, "Unterminated regular expression");
        }
        if (escaped) {
          escaped = false;
        } else {
          if (ch === "[") {
            inClass = true;
          } else if (ch === "]" && inClass) {
            inClass = false;
          } else if (ch === "/" && !inClass) {
            break;
          }
          escaped = ch === "\\";
        }
        ++this.pos;
      }
      const content = this.input.slice(start, this.pos);
      ++this.pos;
      const mods = this.readWord1();
      if (mods) {
        const validFlags = /^[gmsiyu]*$/;
        if (!validFlags.test(mods)) {
          this.raise(start, "Invalid regular expression flag");
        }
      }
      this.finishToken(tt.regexp, {
        pattern: content,
        flags: mods
      });
    }
    // Read a JSX token.
    readJsxToken() {
      let out = "";
      let chunkStart = this.pos;
      for (;;) {
        if (this.pos >= this.input.length) {
          this.raise(this.start, "Unterminated JSX contents");
        }
        const ch = this.input.charCodeAt(this.pos);
        switch (ch) {
          case charCodes$1.lessThan:
          case charCodes$1.leftCurlyBrace:
            if (this.pos === this.start) {
              if (ch === charCodes$1.lessThan) {
                this.pos++;
                this.finishToken(tt.jsxTagStart);
                return;
              } else {
                this.pos++;
                this.finishToken(tt.braceL);
                return;
              }
            }
            out += this.input.slice(chunkStart, this.pos);
            this.finishToken(tt.jsxText, out);
            return;
          default:
            this.pos++;
        }
      }
    }
    readJsxString(quote) {
      let out = "";
      let chunkStart = this.pos;
      for (;;) {
        if (this.pos >= this.input.length) {
          this.raise(this.start, "Unterminated string constant");
        }
        const ch = this.input.charCodeAt(this.pos);
        if (ch === quote) {
          break;
        }
        out += this.input.slice(chunkStart, this.pos);
        chunkStart = this.pos;
        ++this.pos;
      }
      out += this.input.slice(chunkStart, this.pos++);
      this.finishToken(tt.string, out);
    }
    finishOp(type, size) {
      const str = this.input.slice(this.pos, this.pos + size);
      this.pos += size;
      this.finishToken(type, str);
    }
    // Called at the start of the parse and after every token. Sets
    // `isExprAllowed` and `isModule` for the next token.
    updateContext(prevType) {
      const type = this.type;
      let update;
      if (type.keyword && prevType === tt.dot) {
        this.curContext().isExprAllowed = false;
      } else if (update = type.updateContext) {
        update.call(this, prevType);
      } else {
        this.curContext().isExprAllowed = type.beforeExpr;
      }
    }
    //
    isSyntaxEnabled(name) {
      if (name === "jsx") {
        return this.isJSXEnabled;
      }
      if (name === "typescript") {
        return this.isTypeScriptEnabled;
      }
      if (name === "flow") {
        return this.isFlowEnabled;
      }
      if (name === "classFields" || name === "numericSeparator" || name === "optionalChaining" || name === "nullishCoalescing" || name === "optionalCatchBinding" || name === "es2015" || name === "decorators" || name === "async" || name === "yield") {
        return true;
      }
      return false;
    }
    // Returns the token that comes after the current one.
    lookahead() {
      const old = this.isLookahead;
      this.isLookahead = true;
      const oldPos = this.pos;
      const oldCurLine = this.curLine;
      const oldLineStart = this.lineStart;
      this.pos = this.lastTokenEnd;
      this.curLine = this.lastTokenEndLoc.line;
      this.lineStart = this.lastTokenEnd - this.lastTokenEndLoc.column;
      this.next();
      const curr = {
        type: this.type,
        value: this.value,
        start: this.start,
        end: this.end
      };
      this.pos = oldPos;
      this.curLine = oldCurLine;
      this.lineStart = oldLineStart;
      this.isLookahead = old;
      return curr;
    }
  }

  function isSignedIdentifierChar(code) {
    if (code > 127) return true;
    if (code >= 97) return code <= 122;
    if (code >= 65) return code <= 90;
    if (code >= 48) return code <= 57;
    return code === 36 || code === 95;
  }
  function isSignedIdentifierStart(code) {
    if (code > 127) return true;
    if (code >= 97) return code <= 122;
    if (code >= 65) return code <= 90;
    return code === 36 || code === 95;
  }

  class ExpressionParser extends TokenParser {
    parseExpression(options) {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      const expr = this.parseMaybeAssign(options);
      if (this.match(tt.comma)) {
        const node = this.startNodeAt(startPos, startLoc);
        node.expressions = [expr];
        while (this.eat(tt.comma)) {
          node.expressions.push(this.parseMaybeAssign(options));
        }
        return this.finishNode(node, "SequenceExpression");
      }
      return expr;
    }
    parseMaybeAssign(options) {
      if (this.isSyntaxEnabled("typescript") && this.match(tt._const)) {
        // Handled by callers.
        return this.parseExpressionWithPossibleSubscripts(options);
      }
      if (this.isContextual(ContextualKeyword.Yield) && this.state.inGenerator) {
        return this.parseYield(options.allowInlines);
      }
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      if (this.match(tt.parenL) || this.match(tt.name)) {
        this.state.potentialArrowAt = this.state.start;
      }
      let left = this.parseMaybeConditional(options);
      if (this.state.type.isAssign) {
        const node = this.startNodeAt(startPos, startLoc);
        node.operator = this.state.value;
        if (this.match(tt.eq)) {
          this.parseBindingAtom(left);
        } else {
          this.checkLVal(left);
        }
        this.next();
        node.right = this.parseMaybeAssign(options);
        return this.finishNode(node, "AssignmentExpression");
      }
      return left;
    }
    parseMaybeConditional(options) {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      const expr = this.parseExprOps(options);
      if (this.eat(tt.question)) {
        const node = this.startNodeAt(startPos, startLoc);
        node.test = expr;
        node.consequent = this.parseMaybeAssign({
          ...options,
          allowIn: true
        });
        this.expect(tt.colon);
        node.alternate = this.parseMaybeAssign(options);
        return this.finishNode(node, "ConditionalExpression");
      }
      return expr;
    }
    parseExprOps(options) {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      const left = this.parseMaybeUnary(options);
      return this.parseExprOp(left, startPos, startLoc, -1, options);
    }
    parseExprOp(left, leftStartPos, leftStartLoc, minPrec, options) {
      const prec = this.state.type.binop;
      if (prec != null && (!options.allowIn && this.match(tt._in)) ? false : prec > minPrec) {
        if (this.isSyntaxEnabled("typescript") && this.match(tt.relational) && this.state.isType) {
          return left;
        }
        const logical = this.match(tt.logicalOR) || this.match(tt.logicalAND);
        const coalesce = this.match(tt.coalesce);
        const op = this.state.value;
        this.next();
        const startPos = this.state.start;
        const startLoc = this.state.startLoc;
        const right = this.parseExprOp(this.parseMaybeUnary(options), startPos, startLoc, this.state.type.rightAssociative ? prec - 1 : prec, options);
        const node = this.startNodeAt(leftStartPos, leftStartLoc);
        node.left = left;
        node.operator = op;
        node.right = right;
        const type = logical || coalesce ? "LogicalExpression" : "BinaryExpression";
        this.finishNode(node, type);
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, options);
      }
      return left;
    }
    parseMaybeUnary(options) {
      if (this.isContextual(ContextualKeyword.Await) && this.shouldParseAwait(options.allowInlines)) {
        return this.parseAwait(options.allowInlines);
      }
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      if (this.state.type.prefix) {
        const node = this.startNode();
        node.operator = this.state.value;
        node.prefix = true;
        this.next();
        node.argument = this.parseMaybeUnary(options);
        this.checkLVal(node.argument);
        return this.finishNode(node, "UpdateExpression");
      } else if (this.match(tt.plusMin)) {
        const node = this.startNode();
        node.operator = this.state.value;
        node.prefix = true;
        this.next();
        node.argument = this.parseMaybeUnary(options);
        return this.finishNode(node, "UnaryExpression");
      }
      if (this.isSyntaxEnabled("typescript") && this.match(tt.relational) && !this.state.isType) {
        return this.parseCastExpression();
      }
      return this.parseExprSubscripts(options);
    }
    parseExprSubscripts(options) {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      const left = this.parseExprAtom(options);
      const result = this.parseSubscripts(left, startPos, startLoc, options);
      return result;
    }
    parseSubscripts(base, startPos, startLoc, options) {
      const maybeAsync = this.atPossibleAsync(base);
      if (maybeAsync && this.match(tt.parenL)) {
        return base;
      }
      const optionalChained = this.eat(tt.questionDot);
      if (this.eat(tt.dot)) {
        return this.parseSubscript(base, startPos, startLoc, optionalChained, options);
      } else if (this.eat(tt.bracketL)) {
        return this.parseSubscript(base, startPos, startLoc, optionalChained, options);
      } else if (this.match(tt.parenL)) {
        return this.parseSubscript(base, startPos, startLoc, optionalChained, options);
      } else if (this.eat(tt.bang)) {
        const node = this.startNodeAt(startPos, startLoc);
        node.expression = base;
        return this.finishNode(node, "TSNonNullExpression");
      } else {
        return this.parsePostFix(base, startPos, startLoc, options);
      }
    }
    parseSubscript(base, startPos, startLoc, optionalChained, options) {
      const node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseIdentifier(true);
      node.computed = false;
      node.optional = optionalChained;
      return this.finishNode(node, "MemberExpression");
    }
  }

  const charCodes = /* @__PURE__ */ (function (charCodes2) {
    charCodes2[charCodes2["space"] = 32] = "space";
    charCodes2[charCodes2["lineFeed"] = 10] = "lineFeed";
    charCodes2[charCodes2["carriageReturn"] = 13] = "carriageReturn";
    charCodes2[charCodes2["lessThan"] = 60] = "lessThan";
    charCodes2[charCodes2["greaterThan"] = 62] = "greaterThan";
    charCodes2[charCodes2["slash"] = 47] = "slash";
    charCodes2[charCodes2["at"] = 64] = "at";
    charCodes2[charCodes2["graveAccent"] = 96] = "graveAccent";
    return charCodes2;
  })(charCodes || {});
  function getJSXPragmaInfo(options) {
    const [jsxPragma, ...jsxPragmaRest] = options.jsxPragma.split(".");
    const [jsxFragmentPragma, ...jsxFragmentPragmaRest] = options.jsxFragmentPragma.split(".");
    if (jsxPragmaRest.length > 0 || jsxFragmentPragmaRest.length > 0) {
      return {
        isFragment: false,
        base: options.jsxPragma,
        baseFragment: options.jsxFragmentPragma
      };
    } else {
      return {
        isFragment: false,
        base: jsxPragma,
        baseFragment: jsxFragmentPragma
      };
    }
  }
  function isLetter(ch) {
    return ch >= charCodes.lessThan && ch <= charCodes.greaterThan || ch >= charCodes.at && ch <= charCodes.graveAccent;
  }
  function isWhitespace(ch) {
    return ch === charCodes.space || ch === charCodes.lineFeed || ch === charCodes.carriageReturn;
  }
  function scan(code) {
    const isExpression = [];
    const isLet = [];
    for (let i = 0; i < code.length; i++) {
      if (isLetter(code.charCodeAt(i))) {
        let j = i;
        while (j < code.length && isLetter(code.charCodeAt(j))) {
          j++;
        }
        if (code.slice(i, j) === "let") {
          while (j < code.length && isWhitespace(code.charCodeAt(j))) {
            j++;
          }
          if (j < code.length && (isLetter(code.charCodeAt(j)) || code.charCodeAt(j) === charCodes.lessThan)) {
            isLet[i] = true;
          }
        }
        i = j;
      } else if (code.charCodeAt(i) === charCodes.lessThan) {
        if (i > 0 && code.charCodeAt(i - 1) === charCodes.space) {
          isExpression[i] = true;
        }
      }
    }
    return {
      isExpression,
      isLet
    };
  }

  function createError(node, code, ...args) {
    const err = new SyntaxError(errorMessages[code](args));
    err.node = node;
    return err;
  }
  function createSyntaxError(node, template, ...args) {
    const err = new SyntaxError(template.map((s, i) => `${s}${args[i] || ""}`).join(""));
    err.node = node;
    return err;
  }

  function getBindingIdentifiers(node, duplicates, outer) {
    const M = new Map();
    for (const [key, value] of getBindingIdentifiers$1(node, duplicates, outer)) {
      M.set(key, value);
    }
    return M;
  }

  const babel = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  function hasJSX(tokens) {
    for (const token of tokens) {
      if (token.type === tt.jsxTagStart) {
        return true;
      }
    }
    return false;
  }
  function expandHome(path) {
    const home = os.homedir();
    if (path.startsWith("~/")) {
      return home + path.slice(1);
    }
    return path;
  }
  function findNextUncommentedToken(tokens, startTokenIndex) {
    for (let i = startTokenIndex; i < tokens.length; i++) {
      if (tokens[i].type !== tt.comment) {
        return tokens[i];
      }
    }
    return null;
  }
  function findPreviousUncommentedToken(tokens, startTokenIndex) {
    for (let i = startTokenIndex; i >= 0; i--) {
      if (tokens[i].type !== tt.comment) {
        return tokens[i];
      }
    }
    return null;
  }

  const fs = CJS__createRequire()("fs");
  const path$1 = CJS__createRequire()("path");
  function resolveModule(path, options) {
    const {
      basedir
    } = options;
    if (path.startsWith(".") || path.startsWith("/")) {
      const extensions = options.extensions || [".js", ".jsx", ".ts", ".tsx"];
      for (const ext of extensions) {
        if (fs.existsSync(path + ext)) {
          return path + ext;
        }
      }
      return null;
    } else {
      const segments = path.split("/");
      let i = basedir.length;
      while (i > 0) {
        const p = basedir.slice(0, i);
        const q = path$1.join(p, "node_modules", path);
        const pkg = readPackageJson(q);
        if (pkg && pkg.main) {
          return path$1.join(q, pkg.main);
        }
        if (fs.existsSync(q)) {
          return q;
        }
        i = basedir.lastIndexOf("/", i - 1);
      }
      return null;
    }
  }
  function readPackageJson(basedir) {
    try {
      return JSON.parse(fs.readFileSync(path$1.join(basedir, "package.json"), "utf8"));
    } catch (e) {
      return null;
    }
  }

  const os = CJS__createRequire()("os");
  function resolveFS(path) {
    return resolveModule(path, {
      basedir: path$1.dirname(path)
    });
  }

  function getTSImportEqualsInfo(tokens, index) {
    const equalsToken = findNextUncommentedToken(tokens, index + 2);
    if (equalsToken === null || equalsToken.type !== tt.eq) {
      return {
        type: "plain"
      };
    }
    const rhsToken = findNextUncommentedToken(tokens, tokens.indexOf(equalsToken) + 1);
    if (rhsToken === null) {
      return {
        type: "plain"
      };
    }
    if (rhsToken.type === tt._require) {
      return {
        type: "commonjs",
        name: tokens[index + 1].value,
        rhs: tokens[tokens.indexOf(rhsToken) + 2].value
      };
    } else {
      return {
        type: "namespace",
        name: tokens[index + 1].value,
        rhs: rhsToken.value
      };
    }
  }
  function isAccessExpression(tokens, index) {
    return tokens[index + 1].type === tt.dot;
  }
  function isAsyncFunction(tokens, index) {
    return tokens[index].contextualKeyword === ContextualKeyword.Async && tokens[index + 1].type === tt._function;
  }

  exports.transform = transform$1;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
//# sourceMappingURL=index.js.map

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