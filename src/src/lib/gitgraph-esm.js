var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@gitgraph/core/lib/orientation.js
var require_orientation = __commonJS({
  "node_modules/@gitgraph/core/lib/orientation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Orientation2;
    (function(Orientation3) {
      Orientation3["VerticalReverse"] = "vertical-reverse";
      Orientation3["Horizontal"] = "horizontal";
      Orientation3["HorizontalReverse"] = "horizontal-reverse";
    })(Orientation2 = exports.Orientation || (exports.Orientation = {}));
  }
});

// node_modules/@gitgraph/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@gitgraph/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var orientation_1 = require_orientation();
    function booleanOptionOr(value, defaultValue) {
      return typeof value === "boolean" ? value : defaultValue;
    }
    exports.booleanOptionOr = booleanOptionOr;
    function numberOptionOr(value, defaultValue) {
      return typeof value === "number" ? value : defaultValue;
    }
    exports.numberOptionOr = numberOptionOr;
    function pick(obj, paths) {
      return Object.assign({}, paths.reduce((mem, key) => Object.assign({}, mem, { [key]: obj[key] }), {}));
    }
    exports.pick = pick;
    function debug(commits, paths) {
      console.log(JSON.stringify(commits.map((commit) => pick(commit, paths)), null, 2));
    }
    exports.debug = debug;
    function isUndefined(obj) {
      return obj === void 0;
    }
    exports.isUndefined = isUndefined;
    function withoutUndefinedKeys(obj = {}) {
      return Object.keys(obj).reduce((mem, key) => isUndefined(obj[key]) ? mem : Object.assign({}, mem, { [key]: obj[key] }), {});
    }
    exports.withoutUndefinedKeys = withoutUndefinedKeys;
    function arrowSvgPath2(graph, parent, commit) {
      const commitRadius = commit.style.dot.size;
      const size = graph.template.arrow.size;
      const h = commitRadius + graph.template.arrow.offset;
      const delta = Math.PI / 7;
      const alpha = getAlpha(graph, parent, commit);
      const x1 = h * Math.cos(alpha);
      const y1 = h * Math.sin(alpha);
      const x2 = (h + size) * Math.cos(alpha - delta);
      const y2 = (h + size) * Math.sin(alpha - delta);
      const x3 = (h + size / 2) * Math.cos(alpha);
      const y3 = (h + size / 2) * Math.sin(alpha);
      const x4 = (h + size) * Math.cos(alpha + delta);
      const y4 = (h + size) * Math.sin(alpha + delta);
      return `M${x1},${y1} L${x2},${y2} Q${x3},${y3} ${x4},${y4} L${x4},${y4}`;
    }
    exports.arrowSvgPath = arrowSvgPath2;
    function getAlpha(graph, parent, commit) {
      const deltaX = parent.x - commit.x;
      const deltaY = parent.y - commit.y;
      const commitSpacing = graph.template.commit.spacing;
      let alphaY;
      let alphaX;
      switch (graph.orientation) {
        case orientation_1.Orientation.Horizontal:
          alphaY = deltaY;
          alphaX = -commitSpacing;
          break;
        case orientation_1.Orientation.HorizontalReverse:
          alphaY = deltaY;
          alphaX = commitSpacing;
          break;
        case orientation_1.Orientation.VerticalReverse:
          alphaY = -commitSpacing;
          alphaX = deltaX;
          break;
        default:
          alphaY = commitSpacing;
          alphaX = deltaX;
          break;
      }
      if (graph.isVertical) {
        if (Math.abs(deltaY) > commitSpacing)
          alphaX = 0;
      } else {
        if (Math.abs(deltaX) > commitSpacing)
          alphaY = 0;
      }
      if (graph.reverseArrow) {
        alphaY *= -1;
        alphaX *= -1;
      }
      return Math.atan2(alphaY, alphaX);
    }
  }
});

// node_modules/@gitgraph/core/lib/template.js
var require_template = __commonJS({
  "node_modules/@gitgraph/core/lib/template.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var MergeStyle2;
    (function(MergeStyle3) {
      MergeStyle3["Bezier"] = "bezier";
      MergeStyle3["Straight"] = "straight";
    })(MergeStyle2 || (MergeStyle2 = {}));
    exports.MergeStyle = MergeStyle2;
    exports.DEFAULT_FONT = "normal 12pt Calibri";
    var Template = class {
      constructor(options) {
        options.branch = options.branch || {};
        options.branch.label = options.branch.label || {};
        options.arrow = options.arrow || {};
        options.commit = options.commit || {};
        options.commit.dot = options.commit.dot || {};
        options.commit.message = options.commit.message || {};
        this.colors = options.colors || ["#000000"];
        this.branch = {
          color: options.branch.color,
          lineWidth: options.branch.lineWidth || 2,
          mergeStyle: options.branch.mergeStyle || MergeStyle2.Bezier,
          spacing: utils_1.numberOptionOr(options.branch.spacing, 20),
          label: {
            display: utils_1.booleanOptionOr(options.branch.label.display, true),
            color: options.branch.label.color || options.commit.color,
            strokeColor: options.branch.label.strokeColor || options.commit.color,
            bgColor: options.branch.label.bgColor || "white",
            font: options.branch.label.font || options.commit.message.font || exports.DEFAULT_FONT,
            borderRadius: utils_1.numberOptionOr(options.branch.label.borderRadius, 10)
          }
        };
        this.arrow = {
          size: options.arrow.size || null,
          color: options.arrow.color || null,
          offset: options.arrow.offset || 2
        };
        this.commit = {
          color: options.commit.color,
          spacing: utils_1.numberOptionOr(options.commit.spacing, 25),
          hasTooltipInCompactMode: utils_1.booleanOptionOr(options.commit.hasTooltipInCompactMode, true),
          dot: {
            color: options.commit.dot.color || options.commit.color,
            size: options.commit.dot.size || 3,
            strokeWidth: utils_1.numberOptionOr(options.commit.dot.strokeWidth, 0),
            strokeColor: options.commit.dot.strokeColor,
            font: options.commit.dot.font || options.commit.message.font || "normal 10pt Calibri"
          },
          message: {
            display: utils_1.booleanOptionOr(options.commit.message.display, true),
            displayAuthor: utils_1.booleanOptionOr(options.commit.message.displayAuthor, true),
            displayHash: utils_1.booleanOptionOr(options.commit.message.displayHash, true),
            color: options.commit.message.color || options.commit.color,
            font: options.commit.message.font || exports.DEFAULT_FONT
          }
        };
        this.tag = options.tag || {};
      }
    };
    exports.Template = Template;
    var blackArrowTemplate = new Template({
      colors: ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"],
      branch: {
        color: "#000000",
        lineWidth: 4,
        spacing: 50,
        mergeStyle: MergeStyle2.Straight
      },
      commit: {
        spacing: 60,
        dot: {
          size: 16,
          strokeColor: "#000000",
          strokeWidth: 4
        },
        message: {
          color: "black"
        }
      },
      arrow: {
        size: 16,
        offset: -1.5
      }
    });
    exports.blackArrowTemplate = blackArrowTemplate;
    var metroTemplate = new Template({
      colors: ["#979797", "#008fb5", "#f1c109"],
      branch: {
        lineWidth: 10,
        spacing: 50
      },
      commit: {
        spacing: 80,
        dot: {
          size: 14
        },
        message: {
          font: "normal 14pt Arial"
        }
      }
    });
    exports.metroTemplate = metroTemplate;
    var TemplateName2;
    (function(TemplateName3) {
      TemplateName3["Metro"] = "metro";
      TemplateName3["BlackArrow"] = "blackarrow";
    })(TemplateName2 || (TemplateName2 = {}));
    exports.TemplateName = TemplateName2;
    function templateExtend2(selectedTemplate, options) {
      const template = getTemplate(selectedTemplate);
      if (!options.branch)
        options.branch = {};
      if (!options.commit)
        options.commit = {};
      return {
        colors: options.colors || template.colors,
        arrow: Object.assign({}, template.arrow, options.arrow),
        branch: Object.assign({}, template.branch, options.branch, { label: Object.assign({}, template.branch.label, options.branch.label) }),
        commit: Object.assign({}, template.commit, options.commit, { dot: Object.assign({}, template.commit.dot, options.commit.dot), message: Object.assign({}, template.commit.message, options.commit.message) }),
        tag: Object.assign({}, template.tag, options.tag)
      };
    }
    exports.templateExtend = templateExtend2;
    function getTemplate(template) {
      if (!template)
        return metroTemplate;
      if (typeof template === "string") {
        return {
          [TemplateName2.BlackArrow]: blackArrowTemplate,
          [TemplateName2.Metro]: metroTemplate
        }[template];
      }
      return template;
    }
    exports.getTemplate = getTemplate;
  }
});

// node_modules/@gitgraph/core/lib/tag.js
var require_tag = __commonJS({
  "node_modules/@gitgraph/core/lib/tag.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var template_1 = require_template();
    var utils_1 = require_utils();
    var Tag = class {
      constructor(name, style, render, commitStyle) {
        this.name = name;
        this.tagStyle = style;
        this.commitStyle = commitStyle;
        this.render = render;
      }
      /**
       * Style
       */
      get style() {
        return {
          strokeColor: this.tagStyle.strokeColor || this.commitStyle.color,
          bgColor: this.tagStyle.bgColor || this.commitStyle.color,
          color: this.tagStyle.color || "white",
          font: this.tagStyle.font || this.commitStyle.message.font || template_1.DEFAULT_FONT,
          borderRadius: utils_1.numberOptionOr(this.tagStyle.borderRadius, 10),
          pointerWidth: utils_1.numberOptionOr(this.tagStyle.pointerWidth, 12)
        };
      }
    };
    exports.Tag = Tag;
  }
});

// node_modules/@gitgraph/core/lib/commit.js
var require_commit = __commonJS({
  "node_modules/@gitgraph/core/lib/commit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tag_1 = require_tag();
    var getRandomHash = () => (Math.random().toString(16).substring(3) + Math.random().toString(16).substring(3) + Math.random().toString(16).substring(3) + Math.random().toString(16).substring(3)).substring(0, 40);
    var Commit = class _Commit {
      constructor(options) {
        this.refs = [];
        this.x = 0;
        this.y = 0;
        let name, email;
        try {
          [, name, email] = options.author.match(/(.*) <(.*)>/);
        } catch (e) {
          [name, email] = [options.author, ""];
        }
        this.author = { name, email, timestamp: Date.now() };
        this.committer = { name, email, timestamp: Date.now() };
        this.subject = options.subject;
        this.body = options.body || "";
        this.hash = options.hash || getRandomHash();
        this.hashAbbrev = this.hash.substring(0, 7);
        this.parents = options.parents ? options.parents : [];
        this.parentsAbbrev = this.parents.map((commit) => commit.substring(0, 7));
        this.style = Object.assign({}, options.style, { message: Object.assign({}, options.style.message), dot: Object.assign({}, options.style.dot) });
        this.dotText = options.dotText;
        this.onClick = () => options.onClick ? options.onClick(this) : void 0;
        this.onMessageClick = () => options.onMessageClick ? options.onMessageClick(this) : void 0;
        this.onMouseOver = () => options.onMouseOver ? options.onMouseOver(this) : void 0;
        this.onMouseOut = () => options.onMouseOut ? options.onMouseOut(this) : void 0;
        this.renderDot = options.renderDot;
        this.renderMessage = options.renderMessage;
        this.renderTooltip = options.renderTooltip;
      }
      /**
       * Message
       */
      get message() {
        let message = "";
        if (this.style.message.displayHash) {
          message += `${this.hashAbbrev} `;
        }
        message += this.subject;
        if (this.style.message.displayAuthor) {
          message += ` - ${this.author.name} <${this.author.email}>`;
        }
        return message;
      }
      /**
       * Branch that should be rendered
       */
      get branchToDisplay() {
        return this.branches ? this.branches[0] : "";
      }
      setRefs(refs) {
        this.refs = refs.getNames(this.hash);
        return this;
      }
      setTags(tags, getTagStyle, getTagRender) {
        this.tags = tags.getNames(this.hash).map((name) => new tag_1.Tag(name, getTagStyle(name), getTagRender(name), this.style));
        return this;
      }
      setBranches(branches) {
        this.branches = branches;
        return this;
      }
      setPosition({ x, y }) {
        this.x = x;
        this.y = y;
        return this;
      }
      withDefaultColor(color) {
        const newStyle = Object.assign({}, this.style, { dot: Object.assign({}, this.style.dot), message: Object.assign({}, this.style.message) });
        if (!newStyle.color)
          newStyle.color = color;
        if (!newStyle.dot.color)
          newStyle.dot.color = color;
        if (!newStyle.message.color)
          newStyle.message.color = color;
        const commit = this.cloneCommit();
        commit.style = newStyle;
        return commit;
      }
      /**
       * Ideally, we want Commit to be a [Value Object](https://martinfowler.com/bliki/ValueObject.html).
       * We started with a mutable class. So we'll refactor that little by little.
       * This private function is a helper to create a new Commit from existing one.
       */
      cloneCommit() {
        const commit = new _Commit({
          author: `${this.author.name} <${this.author.email}>`,
          subject: this.subject,
          style: this.style,
          body: this.body,
          hash: this.hash,
          parents: this.parents,
          dotText: this.dotText,
          onClick: this.onClick,
          onMessageClick: this.onMessageClick,
          onMouseOver: this.onMouseOver,
          onMouseOut: this.onMouseOut,
          renderDot: this.renderDot,
          renderMessage: this.renderMessage,
          renderTooltip: this.renderTooltip
        });
        commit.refs = this.refs;
        commit.branches = this.branches;
        commit.tags = this.tags;
        commit.x = this.x;
        commit.y = this.y;
        return commit;
      }
    };
    exports.Commit = Commit;
  }
});

// node_modules/@gitgraph/core/lib/user-api/branch-user-api.js
var require_branch_user_api = __commonJS({
  "node_modules/@gitgraph/core/lib/user-api/branch-user-api.js"(exports) {
    "use strict";
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var commit_1 = require_commit();
    var branch_1 = require_branch();
    var utils_1 = require_utils();
    var BranchUserApi = class {
      // tslint:enable:variable-name
      constructor(branch, graph, onGraphUpdate) {
        this._branch = branch;
        this.name = branch.name;
        this._graph = graph;
        this._onGraphUpdate = onGraphUpdate;
      }
      branch(args) {
        if (this._branch.isDeleted() && !this._isReferenced()) {
          throw new Error(`Cannot branch from the deleted branch "${this.name}"`);
        }
        const options = typeof args === "string" ? { name: args } : args;
        options.from = this;
        return this._graph.createBranch(options).getUserApi();
      }
      commit(options) {
        if (this._branch.isDeleted() && !this._isReferenced()) {
          throw new Error(`Cannot commit on the deleted branch "${this.name}"`);
        }
        if (typeof options === "string")
          options = { subject: options };
        if (!options)
          options = {};
        this._commitWithParents(options, []);
        this._onGraphUpdate();
        return this;
      }
      /**
       * Delete the branch (as `git branch -d`)
       */
      delete() {
        if (this._graph.refs.getCommit("HEAD") === this._graph.refs.getCommit(this.name)) {
          throw new Error(`Cannot delete the checked out branch "${this.name}"`);
        }
        const branchCommits = (function* (graph, branch) {
          const lookupCommit = (graph2, commitHash) => {
            return graph2.commits.find(({ hash }) => hash === commitHash);
          };
          let currentCommit = lookupCommit(graph, graph.refs.getCommit(branch.name));
          while (currentCommit && currentCommit.hash !== branch.parentCommitHash) {
            yield currentCommit;
            currentCommit = lookupCommit(graph, currentCommit.parents[0]);
          }
          return;
        })(this._graph, this._branch);
        [...branchCommits].forEach((commit) => {
          commit.refs = commit.refs.filter((branchName) => branchName !== this.name);
        });
        this._graph.refs.delete(this.name);
        this._graph.branches.delete(this.name);
        this._branch = branch_1.createDeletedBranch(this._graph, this._branch.style, () => {
        });
        this._onGraphUpdate();
        return this;
      }
      merge(...args) {
        if (this._branch.isDeleted() && !this._isReferenced()) {
          throw new Error(`Cannot merge to the deleted branch "${this.name}"`);
        }
        let options = args[0];
        if (!isBranchMergeOptions(options)) {
          options = {
            branch: args[0],
            fastForward: false,
            commitOptions: { subject: args[1] }
          };
        }
        const { branch, fastForward, commitOptions } = options;
        const branchName = typeof branch === "string" ? branch : branch.name;
        const branchLastCommitHash = this._graph.refs.getCommit(branchName);
        if (!branchLastCommitHash) {
          throw new Error(`The branch called "${branchName}" is unknown`);
        }
        let canFastForward = false;
        if (fastForward) {
          const lastCommitHash = this._graph.refs.getCommit(this._branch.name);
          if (lastCommitHash) {
            canFastForward = this._areCommitsConnected(lastCommitHash, branchLastCommitHash);
          }
        }
        if (fastForward && canFastForward) {
          this._fastForwardTo(branchLastCommitHash);
        } else {
          this._commitWithParents(Object.assign({}, commitOptions, { subject: commitOptions && commitOptions.subject || `Merge branch ${branchName}` }), [branchLastCommitHash]);
        }
        this._onGraphUpdate();
        return this;
      }
      tag(options) {
        if (this._branch.isDeleted() && !this._isReferenced()) {
          throw new Error(`Cannot tag on the deleted branch "${this.name}"`);
        }
        if (typeof options === "string") {
          this._graph.getUserApi().tag({ name: options, ref: this._branch.name });
        } else {
          this._graph.getUserApi().tag(Object.assign({}, options, { ref: this._branch.name }));
        }
        return this;
      }
      /**
       * Checkout onto this branch and update "HEAD" in refs
       */
      checkout() {
        if (this._branch.isDeleted() && !this._isReferenced()) {
          throw new Error(`Cannot checkout the deleted branch "${this.name}"`);
        }
        const target = this._branch;
        const headCommit = this._graph.refs.getCommit(target.name);
        this._graph.currentBranch = target;
        if (headCommit) {
          this._graph.refs.set("HEAD", headCommit);
        }
        return this;
      }
      // tslint:disable:variable-name - Prefix `_` = explicitly private for JS users
      _commitWithParents(options, parents) {
        const parentOnSameBranch = this._graph.refs.getCommit(this._branch.name);
        if (parentOnSameBranch) {
          parents.unshift(parentOnSameBranch);
        } else if (this._branch.parentCommitHash) {
          parents.unshift(this._branch.parentCommitHash);
        }
        const { tag } = options, commitOptions = __rest(options, ["tag"]);
        const commit = new commit_1.Commit(Object.assign({ hash: this._graph.generateCommitHash(), author: this._branch.commitDefaultOptions.author || this._graph.author, subject: this._branch.commitDefaultOptions.subject || this._graph.commitMessage }, commitOptions, { parents, style: this._getCommitStyle(options.style) }));
        if (parentOnSameBranch) {
          const parentRefs = this._graph.refs.getNames(parentOnSameBranch);
          parentRefs.forEach((ref) => this._graph.refs.set(ref, commit.hash));
        } else {
          this._graph.refs.set(this._branch.name, commit.hash);
        }
        this._graph.commits.push(commit);
        this.checkout();
        if (tag)
          this.tag(tag);
      }
      _areCommitsConnected(parentCommitHash, childCommitHash) {
        const childCommit = this._graph.commits.find(({ hash }) => childCommitHash === hash);
        if (!childCommit)
          return false;
        const isFirstCommitOfGraph = childCommit.parents.length === 0;
        if (isFirstCommitOfGraph)
          return false;
        if (childCommit.parents.includes(parentCommitHash)) {
          return true;
        }
        return childCommit.parents.some((directParentHash) => this._areCommitsConnected(parentCommitHash, directParentHash));
      }
      _fastForwardTo(commitHash) {
        this._graph.refs.set(this._branch.name, commitHash);
      }
      _getCommitStyle(style = {}) {
        return Object.assign({}, utils_1.withoutUndefinedKeys(this._graph.template.commit), utils_1.withoutUndefinedKeys(this._branch.commitDefaultOptions.style), style, { message: Object.assign({}, utils_1.withoutUndefinedKeys(this._graph.template.commit.message), utils_1.withoutUndefinedKeys(this._branch.commitDefaultOptions.style.message), style.message, utils_1.withoutUndefinedKeys({
          display: this._graph.shouldDisplayCommitMessage && void 0
        })), dot: Object.assign({}, utils_1.withoutUndefinedKeys(this._graph.template.commit.dot), utils_1.withoutUndefinedKeys(this._branch.commitDefaultOptions.style.dot), style.dot) });
      }
      _isReferenced() {
        return this._graph.branches.has(this.name) || this._graph.refs.hasName(this.name) || this._graph.commits.reduce((allNames, { refs }) => [...allNames, ...refs], []).includes(this.name);
      }
    };
    exports.BranchUserApi = BranchUserApi;
    function isBranchMergeOptions(options) {
      return typeof options === "object" && !(options instanceof BranchUserApi);
    }
  }
});

// node_modules/@gitgraph/core/lib/branch.js
var require_branch = __commonJS({
  "node_modules/@gitgraph/core/lib/branch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var branch_user_api_1 = require_branch_user_api();
    var DELETED_BRANCH_NAME = "";
    exports.DELETED_BRANCH_NAME = DELETED_BRANCH_NAME;
    var Branch = class {
      constructor(options) {
        this.gitgraph = options.gitgraph;
        this.name = options.name;
        this.style = options.style;
        this.parentCommitHash = options.parentCommitHash;
        this.commitDefaultOptions = options.commitDefaultOptions || { style: {} };
        this.onGraphUpdate = options.onGraphUpdate;
        this.renderLabel = options.renderLabel;
      }
      /**
       * Return the API to manipulate Gitgraph branch as a user.
       */
      getUserApi() {
        return new branch_user_api_1.BranchUserApi(this, this.gitgraph, this.onGraphUpdate);
      }
      /**
       * Return true if branch was deleted.
       */
      isDeleted() {
        return this.name === DELETED_BRANCH_NAME;
      }
    };
    exports.Branch = Branch;
    function createDeletedBranch(gitgraph, style, onGraphUpdate) {
      return new Branch({
        name: DELETED_BRANCH_NAME,
        gitgraph,
        style,
        onGraphUpdate
      });
    }
    exports.createDeletedBranch = createDeletedBranch;
  }
});

// node_modules/@gitgraph/core/lib/mode.js
var require_mode = __commonJS({
  "node_modules/@gitgraph/core/lib/mode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Mode2;
    (function(Mode3) {
      Mode3["Compact"] = "compact";
    })(Mode2 || (Mode2 = {}));
    exports.Mode = Mode2;
  }
});

// node_modules/@gitgraph/core/lib/graph-rows/regular.js
var require_regular = __commonJS({
  "node_modules/@gitgraph/core/lib/graph-rows/regular.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RegularGraphRows = class {
      constructor(commits) {
        this.rows = /* @__PURE__ */ new Map();
        this.maxRowCache = void 0;
        this.computeRowsFromCommits(commits);
      }
      getRowOf(commitHash) {
        return this.rows.get(commitHash) || 0;
      }
      getMaxRow() {
        if (this.maxRowCache === void 0) {
          this.maxRowCache = uniq(Array.from(this.rows.values())).length - 1;
        }
        return this.maxRowCache;
      }
      computeRowsFromCommits(commits) {
        commits.forEach((commit, i) => {
          this.rows.set(commit.hash, i);
        });
        this.maxRowCache = void 0;
      }
    };
    exports.RegularGraphRows = RegularGraphRows;
    function uniq(array) {
      const set = /* @__PURE__ */ new Set();
      array.forEach((value) => set.add(value));
      return Array.from(set);
    }
  }
});

// node_modules/@gitgraph/core/lib/graph-rows/compact.js
var require_compact = __commonJS({
  "node_modules/@gitgraph/core/lib/graph-rows/compact.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regular_1 = require_regular();
    var CompactGraphRows = class extends regular_1.RegularGraphRows {
      computeRowsFromCommits(commits) {
        commits.forEach((commit, i) => {
          let newRow = i;
          const isFirstCommit = i === 0;
          if (!isFirstCommit) {
            const parentRow = this.getRowOf(commit.parents[0]);
            const historyParent = commits[i - 1];
            newRow = Math.max(parentRow + 1, this.getRowOf(historyParent.hash));
            const isMergeCommit = commit.parents.length > 1;
            if (isMergeCommit) {
              const mergeTargetParentRow = this.getRowOf(commit.parents[1]);
              if (parentRow < mergeTargetParentRow)
                newRow++;
            }
          }
          this.rows.set(commit.hash, newRow);
        });
      }
    };
    exports.CompactGraphRows = CompactGraphRows;
  }
});

// node_modules/@gitgraph/core/lib/graph-rows/index.js
var require_graph_rows = __commonJS({
  "node_modules/@gitgraph/core/lib/graph-rows/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mode_1 = require_mode();
    var compact_1 = require_compact();
    var regular_1 = require_regular();
    exports.GraphRows = regular_1.RegularGraphRows;
    function createGraphRows(mode, commits) {
      return mode === mode_1.Mode.Compact ? new compact_1.CompactGraphRows(commits) : new regular_1.RegularGraphRows(commits);
    }
    exports.createGraphRows = createGraphRows;
  }
});

// node_modules/@gitgraph/core/lib/branches-order.js
var require_branches_order = __commonJS({
  "node_modules/@gitgraph/core/lib/branches-order.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BranchesOrder = class {
      constructor(commits, colors, compareFunction) {
        this.branches = /* @__PURE__ */ new Set();
        this.colors = colors;
        commits.forEach((commit) => this.branches.add(commit.branchToDisplay));
        if (compareFunction) {
          this.branches = new Set(Array.from(this.branches).sort(compareFunction));
        }
      }
      /**
       * Return the order of the given branch name.
       *
       * @param branchName Name of the branch
       */
      get(branchName) {
        return Array.from(this.branches).findIndex((branch) => branch === branchName);
      }
      /**
       * Return the color of the given branch.
       *
       * @param branchName Name of the branch
       */
      getColorOf(branchName) {
        return this.colors[this.get(branchName) % this.colors.length];
      }
    };
    exports.BranchesOrder = BranchesOrder;
  }
});

// node_modules/@gitgraph/core/lib/refs.js
var require_refs = __commonJS({
  "node_modules/@gitgraph/core/lib/refs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Refs = class {
      constructor() {
        this.commitPerName = /* @__PURE__ */ new Map();
        this.namesPerCommit = /* @__PURE__ */ new Map();
      }
      /**
       * Set a new reference to a commit hash.
       *
       * @param name Name of the ref (ex: "master", "v1.0")
       * @param commitHash Commit hash
       */
      set(name, commitHash) {
        const prevCommitHash = this.commitPerName.get(name);
        if (prevCommitHash) {
          this.removeNameFrom(prevCommitHash, name);
        }
        this.addNameTo(commitHash, name);
        this.addCommitTo(name, commitHash);
        return this;
      }
      /**
       * Delete a reference
       *
       * @param name Name of the reference
       */
      delete(name) {
        if (this.hasName(name)) {
          this.removeNameFrom(this.getCommit(name), name);
          this.commitPerName.delete(name);
        }
        return this;
      }
      /**
       * Get the commit hash associated with the given reference name.
       *
       * @param name Name of the ref
       */
      getCommit(name) {
        return this.commitPerName.get(name);
      }
      /**
       * Get the list of reference names associated with given commit hash.
       *
       * @param commitHash Commit hash
       */
      getNames(commitHash) {
        return this.namesPerCommit.get(commitHash) || [];
      }
      /**
       * Get all reference names known.
       */
      getAllNames() {
        return Array.from(this.commitPerName.keys());
      }
      /**
       * Returns true if given commit hash is referenced.
       *
       * @param commitHash Commit hash
       */
      hasCommit(commitHash) {
        return this.namesPerCommit.has(commitHash);
      }
      /**
       * Returns true if given reference name exists.
       *
       * @param name Name of the ref
       */
      hasName(name) {
        return this.commitPerName.has(name);
      }
      removeNameFrom(commitHash, nameToRemove) {
        const names = this.namesPerCommit.get(commitHash) || [];
        this.namesPerCommit.set(commitHash, names.filter((name) => name !== nameToRemove));
      }
      addNameTo(commitHash, nameToAdd) {
        const prevNames = this.namesPerCommit.get(commitHash) || [];
        this.namesPerCommit.set(commitHash, [...prevNames, nameToAdd]);
      }
      addCommitTo(name, commitHashToAdd) {
        this.commitPerName.set(name, commitHashToAdd);
      }
    };
    exports.Refs = Refs;
  }
});

// node_modules/@gitgraph/core/lib/branches-paths.js
var require_branches_paths = __commonJS({
  "node_modules/@gitgraph/core/lib/branches-paths.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var BranchesPathsCalculator = class {
      constructor(commits, branches, commitSpacing, isGraphVertical, isGraphReverse, createDeletedBranch) {
        this.branchesPaths = /* @__PURE__ */ new Map();
        this.commits = commits;
        this.branches = branches;
        this.commitSpacing = commitSpacing;
        this.isGraphVertical = isGraphVertical;
        this.isGraphReverse = isGraphReverse;
        this.createDeletedBranch = createDeletedBranch;
      }
      /**
       * Compute branches paths for graph.
       */
      execute() {
        this.fromCommits();
        this.withMergeCommits();
        return this.smoothBranchesPaths();
      }
      /**
       * Initialize branches paths from calculator's commits.
       */
      fromCommits() {
        this.commits.forEach((commit) => {
          let branch = this.branches.get(commit.branchToDisplay);
          if (!branch) {
            branch = this.getDeletedBranchInPath() || this.createDeletedBranch();
          }
          const path = [];
          const existingBranchPath = this.branchesPaths.get(branch);
          const firstParentCommit = this.commits.find(({ hash }) => hash === commit.parents[0]);
          if (existingBranchPath) {
            path.push(...existingBranchPath);
          } else if (firstParentCommit) {
            path.push({ x: firstParentCommit.x, y: firstParentCommit.y });
          }
          path.push({ x: commit.x, y: commit.y });
          this.branchesPaths.set(branch, path);
        });
      }
      /**
       * Insert merge commits points into `branchesPaths`.
       *
       * @example
       *     // Before
       *     [
       *       { x: 0, y: 640 },
       *       { x: 50, y: 560 }
       *     ]
       *
       *     // After
       *     [
       *       { x: 0, y: 640 },
       *       { x: 50, y: 560 },
       *       { x: 50, y: 560, mergeCommit: true }
       *     ]
       */
      withMergeCommits() {
        const mergeCommits = this.commits.filter(({ parents }) => parents.length > 1);
        mergeCommits.forEach((mergeCommit) => {
          const parentOnOriginBranch = this.commits.find(({ hash }) => {
            return hash === mergeCommit.parents[1];
          });
          if (!parentOnOriginBranch)
            return;
          const originBranchName = parentOnOriginBranch.branches ? parentOnOriginBranch.branches[0] : "";
          let branch = this.branches.get(originBranchName);
          if (!branch) {
            branch = this.getDeletedBranchInPath();
            if (!branch) {
              return;
            }
          }
          const lastPoints = [...this.branchesPaths.get(branch) || []];
          this.branchesPaths.set(branch, [
            ...lastPoints,
            { x: mergeCommit.x, y: mergeCommit.y, mergeCommit: true }
          ]);
        });
      }
      /**
       * Retrieve deleted branch from calculator's branches paths.
       */
      getDeletedBranchInPath() {
        return Array.from(this.branchesPaths.keys()).find((branch) => branch.isDeleted());
      }
      /**
       * Smooth all paths by putting points on each row.
       */
      smoothBranchesPaths() {
        const branchesPaths = /* @__PURE__ */ new Map();
        this.branchesPaths.forEach((points, branch) => {
          if (points.length <= 1) {
            branchesPaths.set(branch, [points]);
            return;
          }
          if (this.isGraphVertical) {
            points = points.sort((a, b) => a.y > b.y ? -1 : 1);
          } else {
            points = points.sort((a, b) => a.x > b.x ? 1 : -1);
          }
          if (this.isGraphReverse) {
            points = points.reverse();
          }
          const paths = points.reduce((mem, point, i) => {
            if (point.mergeCommit) {
              mem[mem.length - 1].push(utils_1.pick(point, ["x", "y"]));
              let j = i - 1;
              let previousPoint = points[j];
              while (j >= 0 && previousPoint.mergeCommit) {
                j--;
                previousPoint = points[j];
              }
              if (j >= 0) {
                mem.push([previousPoint]);
              }
            } else {
              mem[mem.length - 1].push(point);
            }
            return mem;
          }, [[]]);
          if (this.isGraphReverse) {
            paths.forEach((path) => path.reverse());
          }
          if (this.isGraphVertical) {
            paths.forEach((subPath) => {
              if (subPath.length <= 1)
                return;
              const firstPoint = subPath[0];
              const lastPoint = subPath[subPath.length - 1];
              const column = subPath[1].x;
              const branchSize = Math.round(Math.abs(firstPoint.y - lastPoint.y) / this.commitSpacing) - 1;
              const branchPoints = branchSize > 0 ? new Array(branchSize).fill(0).map((_, i) => ({
                x: column,
                y: subPath[0].y - this.commitSpacing * (i + 1)
              })) : [];
              const lastSubPaths = branchesPaths.get(branch) || [];
              branchesPaths.set(branch, [
                ...lastSubPaths,
                [firstPoint, ...branchPoints, lastPoint]
              ]);
            });
          } else {
            paths.forEach((subPath) => {
              if (subPath.length <= 1)
                return;
              const firstPoint = subPath[0];
              const lastPoint = subPath[subPath.length - 1];
              const column = subPath[1].y;
              const branchSize = Math.round(Math.abs(firstPoint.x - lastPoint.x) / this.commitSpacing) - 1;
              const branchPoints = branchSize > 0 ? new Array(branchSize).fill(0).map((_, i) => ({
                y: column,
                x: subPath[0].x + this.commitSpacing * (i + 1)
              })) : [];
              const lastSubPaths = branchesPaths.get(branch) || [];
              branchesPaths.set(branch, [
                ...lastSubPaths,
                [firstPoint, ...branchPoints, lastPoint]
              ]);
            });
          }
        });
        return branchesPaths;
      }
    };
    exports.BranchesPathsCalculator = BranchesPathsCalculator;
    function toSvgPath2(coordinates, isBezier, isVertical) {
      return coordinates.map((path) => "M" + path.map(({ x, y }, i, points) => {
        if (isBezier && points.length > 1 && (i === 1 || i === points.length - 1)) {
          const previous = points[i - 1];
          if (isVertical) {
            const middleY = (previous.y + y) / 2;
            return `C ${previous.x} ${middleY} ${x} ${middleY} ${x} ${y}`;
          } else {
            const middleX = (previous.x + x) / 2;
            return `C ${middleX} ${previous.y} ${middleX} ${y} ${x} ${y}`;
          }
        }
        return `L ${x} ${y}`;
      }).join(" ").slice(1)).join(" ");
    }
    exports.toSvgPath = toSvgPath2;
  }
});

// node_modules/@gitgraph/core/lib/user-api/gitgraph-user-api.js
var require_gitgraph_user_api = __commonJS({
  "node_modules/@gitgraph/core/lib/user-api/gitgraph-user-api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commit_1 = require_commit();
    var branch_1 = require_branch();
    var refs_1 = require_refs();
    var GitgraphUserApi = class {
      // tslint:enable:variable-name
      constructor(graph, onGraphUpdate) {
        this._graph = graph;
        this._onGraphUpdate = onGraphUpdate;
      }
      /**
       * Clear everything (as `rm -rf .git && git init`).
       */
      clear() {
        this._graph.refs = new refs_1.Refs();
        this._graph.tags = new refs_1.Refs();
        this._graph.commits = [];
        this._graph.branches = /* @__PURE__ */ new Map();
        this._graph.currentBranch = this._graph.createBranch("master");
        this._onGraphUpdate();
        return this;
      }
      commit(options) {
        this._graph.currentBranch.getUserApi().commit(options);
        return this;
      }
      branch(args) {
        return this._graph.createBranch(args).getUserApi();
      }
      tag(...args) {
        let name;
        let ref;
        let style;
        let render;
        if (typeof args[0] === "string") {
          name = args[0];
          ref = args[1];
        } else {
          name = args[0].name;
          ref = args[0].ref;
          style = args[0].style;
          render = args[0].render;
        }
        if (!ref) {
          const head = this._graph.refs.getCommit("HEAD");
          if (!head)
            return this;
          ref = head;
        }
        let commitHash;
        if (this._graph.refs.hasCommit(ref)) {
          commitHash = ref;
        }
        if (this._graph.refs.hasName(ref)) {
          commitHash = this._graph.refs.getCommit(ref);
        }
        if (!commitHash) {
          throw new Error(`The ref "${ref}" does not exist`);
        }
        this._graph.tags.set(name, commitHash);
        this._graph.tagStyles[name] = style;
        this._graph.tagRenders[name] = render;
        this._onGraphUpdate();
        return this;
      }
      /**
       * Import a JSON.
       *
       * Data can't be typed since it comes from a JSON.
       * We validate input format and throw early if something is invalid.
       *
       * @experimental
       * @param data JSON from `git2json` output
       */
      import(data) {
        const invalidData = new Error("Only `git2json` format is supported for imported data.");
        if (!Array.isArray(data)) {
          throw invalidData;
        }
        const areDataValid = data.every((options) => {
          return typeof options === "object" && typeof options.author === "object" && Array.isArray(options.refs);
        });
        if (!areDataValid) {
          throw invalidData;
        }
        const commitOptionsList = data.map((options) => Object.assign({}, options, { style: Object.assign({}, this._graph.template.commit, { message: Object.assign({}, this._graph.template.commit.message, { display: this._graph.shouldDisplayCommitMessage }) }), author: `${options.author.name} <${options.author.email}>` })).reverse();
        this.clear();
        this._graph.commits = commitOptionsList.map((options) => new commit_1.Commit(options));
        commitOptionsList.forEach(({ refs, hash }) => {
          if (!refs)
            return;
          if (!hash)
            return;
          const TAG_PREFIX = "tag: ";
          const tags = refs.map((ref) => ref.split(TAG_PREFIX)).map(([_, tag]) => tag).filter((tag) => typeof tag === "string");
          tags.forEach((tag) => this._graph.tags.set(tag, hash));
          refs.filter((ref) => !ref.startsWith(TAG_PREFIX)).forEach((ref) => this._graph.refs.set(ref, hash));
        });
        const branches = this._getBranches();
        this._graph.commits.map((commit) => this._withBranches(branches, commit)).reduce((mem, commit) => {
          if (!commit.branches)
            return mem;
          commit.branches.forEach((branch) => mem.add(branch));
          return mem;
        }, /* @__PURE__ */ new Set()).forEach((branch) => this.branch(branch));
        this._onGraphUpdate();
        return this;
      }
      // tslint:disable:variable-name - Prefix `_` = explicitly private for JS users
      // TODO: get rid of these duplicated private methods.
      //
      // These belong to Gitgraph. It is duplicated because of `import()`.
      // `import()` should use regular user API instead.
      _withBranches(branches, commit) {
        let commitBranches = Array.from((branches.get(commit.hash) || /* @__PURE__ */ new Set()).values());
        if (commitBranches.length === 0) {
          commitBranches = [branch_1.DELETED_BRANCH_NAME];
        }
        return commit.setBranches(commitBranches);
      }
      _getBranches() {
        const result = /* @__PURE__ */ new Map();
        const queue = [];
        const branches = this._graph.refs.getAllNames().filter((name) => name !== "HEAD");
        branches.forEach((branch) => {
          const commitHash = this._graph.refs.getCommit(branch);
          if (commitHash) {
            queue.push(commitHash);
          }
          while (queue.length > 0) {
            const currentHash = queue.pop();
            const current = this._graph.commits.find(({ hash }) => hash === currentHash);
            const prevBranches = result.get(currentHash) || /* @__PURE__ */ new Set();
            prevBranches.add(branch);
            result.set(currentHash, prevBranches);
            if (current && current.parents && current.parents.length > 0) {
              queue.push(current.parents[0]);
            }
          }
        });
        return result;
      }
    };
    exports.GitgraphUserApi = GitgraphUserApi;
  }
});

// node_modules/@gitgraph/core/lib/gitgraph.js
var require_gitgraph = __commonJS({
  "node_modules/@gitgraph/core/lib/gitgraph.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var branch_1 = require_branch();
    var graph_rows_1 = require_graph_rows();
    var mode_1 = require_mode();
    var branches_order_1 = require_branches_order();
    var template_1 = require_template();
    var refs_1 = require_refs();
    var branches_paths_1 = require_branches_paths();
    var utils_1 = require_utils();
    var orientation_1 = require_orientation();
    var gitgraph_user_api_1 = require_gitgraph_user_api();
    var GitgraphCore2 = class {
      constructor(options = {}) {
        this.refs = new refs_1.Refs();
        this.tags = new refs_1.Refs();
        this.tagStyles = {};
        this.tagRenders = {};
        this.commits = [];
        this.branches = /* @__PURE__ */ new Map();
        this.listeners = [];
        this.nextTimeoutId = null;
        this.template = template_1.getTemplate(options.template);
        this.currentBranch = this.createBranch("master");
        this.orientation = options.orientation;
        this.reverseArrow = utils_1.booleanOptionOr(options.reverseArrow, false);
        this.initCommitOffsetX = utils_1.numberOptionOr(options.initCommitOffsetX, 0);
        this.initCommitOffsetY = utils_1.numberOptionOr(options.initCommitOffsetY, 0);
        this.mode = options.mode;
        this.author = options.author || "Sergio Flores <saxo-guy@epic.com>";
        this.commitMessage = options.commitMessage || "He doesn't like George Michael! Boooo!";
        this.generateCommitHash = typeof options.generateCommitHash === "function" ? options.generateCommitHash : () => void 0;
        this.branchesOrderFunction = typeof options.compareBranchesOrder === "function" ? options.compareBranchesOrder : void 0;
        this.branchLabelOnEveryCommit = utils_1.booleanOptionOr(options.branchLabelOnEveryCommit, false);
      }
      get isHorizontal() {
        return this.orientation === orientation_1.Orientation.Horizontal || this.orientation === orientation_1.Orientation.HorizontalReverse;
      }
      get isVertical() {
        return !this.isHorizontal;
      }
      get isReverse() {
        return this.orientation === orientation_1.Orientation.HorizontalReverse || this.orientation === orientation_1.Orientation.VerticalReverse;
      }
      get shouldDisplayCommitMessage() {
        return !this.isHorizontal && this.mode !== mode_1.Mode.Compact;
      }
      /**
       * Return the API to manipulate Gitgraph as a user.
       * Rendering library should give that API to their consumer.
       */
      getUserApi() {
        return new gitgraph_user_api_1.GitgraphUserApi(this, () => this.next());
      }
      /**
       * Add a change listener.
       * It will be called any time the graph have changed (commit, merge…).
       *
       * @param listener A callback to be invoked on every change.
       * @returns A function to remove this change listener.
       */
      subscribe(listener) {
        this.listeners.push(listener);
        let isSubscribed = true;
        return () => {
          if (!isSubscribed)
            return;
          isSubscribed = false;
          const index = this.listeners.indexOf(listener);
          this.listeners.splice(index, 1);
        };
      }
      /**
       * Return all data required for rendering.
       * Rendering libraries will use this to implement their rendering strategy.
       */
      getRenderedData() {
        const commits = this.computeRenderedCommits();
        const branchesPaths = this.computeRenderedBranchesPaths(commits);
        const commitMessagesX = this.computeCommitMessagesX(branchesPaths);
        this.computeBranchesColor(commits, branchesPaths);
        return { commits, branchesPaths, commitMessagesX };
      }
      createBranch(args) {
        const defaultParentBranchName = "HEAD";
        let options = {
          gitgraph: this,
          name: "",
          parentCommitHash: this.refs.getCommit(defaultParentBranchName),
          style: this.template.branch,
          onGraphUpdate: () => this.next()
        };
        if (typeof args === "string") {
          options.name = args;
          options.parentCommitHash = this.refs.getCommit(defaultParentBranchName);
        } else {
          const parentBranchName = args.from ? args.from.name : defaultParentBranchName;
          const parentCommitHash = this.refs.getCommit(parentBranchName) || (this.refs.hasCommit(args.from) ? args.from : void 0);
          args.style = args.style || {};
          options = Object.assign({}, options, args, { parentCommitHash, style: Object.assign({}, options.style, args.style, { label: Object.assign({}, options.style.label, args.style.label) }) });
        }
        const branch = new branch_1.Branch(options);
        this.branches.set(branch.name, branch);
        return branch;
      }
      /**
       * Return commits with data for rendering.
       */
      computeRenderedCommits() {
        const branches = this.getBranches();
        const reachableUnassociatedCommits = (() => {
          const unassociatedCommits = new Set(this.commits.reduce((commits, { hash }) => !branches.has(hash) ? [...commits, hash] : commits, []));
          const tipsOfMergedBranches = this.commits.reduce((tipsOfMergedBranches2, commit) => commit.parents.length > 1 ? [
            ...tipsOfMergedBranches2,
            ...commit.parents.slice(1).map((parentHash) => this.commits.find(({ hash }) => parentHash === hash))
          ] : tipsOfMergedBranches2, []);
          const reachableCommits = /* @__PURE__ */ new Set();
          tipsOfMergedBranches.forEach((tip) => {
            let currentCommit = tip;
            while (currentCommit && unassociatedCommits.has(currentCommit.hash)) {
              reachableCommits.add(currentCommit.hash);
              currentCommit = currentCommit.parents.length > 0 ? this.commits.find(({ hash }) => currentCommit.parents[0] === hash) : void 0;
            }
          });
          return reachableCommits;
        })();
        const commitsToRender = this.commits.filter(({ hash }) => branches.has(hash) || reachableUnassociatedCommits.has(hash));
        const commitsWithBranches = commitsToRender.map((commit) => this.withBranches(branches, commit));
        const rows = graph_rows_1.createGraphRows(this.mode, commitsToRender);
        const branchesOrder = new branches_order_1.BranchesOrder(commitsWithBranches, this.template.colors, this.branchesOrderFunction);
        return commitsWithBranches.map((commit) => commit.setRefs(this.refs)).map((commit) => this.withPosition(rows, branchesOrder, commit)).map((commit) => commit.withDefaultColor(this.getBranchDefaultColor(branchesOrder, commit.branchToDisplay))).map((commit) => commit.setTags(this.tags, (name) => Object.assign({}, this.tagStyles[name], this.template.tag), (name) => this.tagRenders[name]));
      }
      /**
       * Return branches paths with all data required for rendering.
       *
       * @param commits List of commits with rendering data computed
       */
      computeRenderedBranchesPaths(commits) {
        return new branches_paths_1.BranchesPathsCalculator(commits, this.branches, this.template.commit.spacing, this.isVertical, this.isReverse, () => branch_1.createDeletedBranch(this, this.template.branch, () => this.next())).execute();
      }
      /**
       * Set branches colors based on branches paths.
       *
       * @param commits List of graph commits
       * @param branchesPaths Branches paths to be rendered
       */
      computeBranchesColor(commits, branchesPaths) {
        const branchesOrder = new branches_order_1.BranchesOrder(commits, this.template.colors, this.branchesOrderFunction);
        Array.from(branchesPaths).forEach(([branch]) => {
          branch.computedColor = branch.style.color || this.getBranchDefaultColor(branchesOrder, branch.name);
        });
      }
      /**
       * Return commit messages X position for rendering.
       *
       * @param branchesPaths Branches paths to be rendered
       */
      computeCommitMessagesX(branchesPaths) {
        const numberOfColumns = Array.from(branchesPaths).length;
        return numberOfColumns * this.template.branch.spacing;
      }
      /**
       * Add `branches` property to commit.
       *
       * @param branches All branches mapped by commit hash
       * @param commit Commit
       */
      withBranches(branches, commit) {
        let commitBranches = Array.from((branches.get(commit.hash) || /* @__PURE__ */ new Set()).values());
        if (commitBranches.length === 0) {
          commitBranches = [branch_1.DELETED_BRANCH_NAME];
        }
        return commit.setBranches(commitBranches);
      }
      /**
       * Get all branches from current commits.
       */
      getBranches() {
        const result = /* @__PURE__ */ new Map();
        const queue = [];
        const branches = this.refs.getAllNames().filter((name) => name !== "HEAD");
        branches.forEach((branch) => {
          const commitHash = this.refs.getCommit(branch);
          if (commitHash) {
            queue.push(commitHash);
          }
          while (queue.length > 0) {
            const currentHash = queue.pop();
            const current = this.commits.find(({ hash }) => hash === currentHash);
            const prevBranches = result.get(currentHash) || /* @__PURE__ */ new Set();
            prevBranches.add(branch);
            result.set(currentHash, prevBranches);
            if (current && current.parents && current.parents.length > 0) {
              queue.push(current.parents[0]);
            }
          }
        });
        return result;
      }
      /**
       * Add position to given commit.
       *
       * @param rows Graph rows
       * @param branchesOrder Computed order of branches
       * @param commit Commit to position
       */
      withPosition(rows, branchesOrder, commit) {
        const row = rows.getRowOf(commit.hash);
        const maxRow = rows.getMaxRow();
        const order = branchesOrder.get(commit.branchToDisplay);
        switch (this.orientation) {
          default:
            return commit.setPosition({
              x: this.initCommitOffsetX + this.template.branch.spacing * order,
              y: this.initCommitOffsetY + this.template.commit.spacing * (maxRow - row)
            });
          case orientation_1.Orientation.VerticalReverse:
            return commit.setPosition({
              x: this.initCommitOffsetX + this.template.branch.spacing * order,
              y: this.initCommitOffsetY + this.template.commit.spacing * row
            });
          case orientation_1.Orientation.Horizontal:
            return commit.setPosition({
              x: this.initCommitOffsetX + this.template.commit.spacing * row,
              y: this.initCommitOffsetY + this.template.branch.spacing * order
            });
          case orientation_1.Orientation.HorizontalReverse:
            return commit.setPosition({
              x: this.initCommitOffsetX + this.template.commit.spacing * (maxRow - row),
              y: this.initCommitOffsetY + this.template.branch.spacing * order
            });
        }
      }
      /**
       * Return the default color for given branch.
       *
       * @param branchesOrder Computed order of branches
       * @param branchName Name of the branch
       */
      getBranchDefaultColor(branchesOrder, branchName) {
        return branchesOrder.getColorOf(branchName);
      }
      /**
       * Tell each listener something new happened.
       * E.g. a rendering library will know it needs to re-render the graph.
       */
      next() {
        if (this.nextTimeoutId) {
          window.clearTimeout(this.nextTimeoutId);
        }
        this.nextTimeoutId = window.setTimeout(() => {
          this.listeners.forEach((listener) => listener(this.getRenderedData()));
        }, 0);
      }
    };
    exports.GitgraphCore = GitgraphCore2;
  }
});

// node_modules/@gitgraph/core/lib/index.js
var require_lib = __commonJS({
  "node_modules/@gitgraph/core/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var gitgraph_1 = require_gitgraph();
    exports.GitgraphCore = gitgraph_1.GitgraphCore;
    var mode_1 = require_mode();
    exports.Mode = mode_1.Mode;
    var gitgraph_user_api_1 = require_gitgraph_user_api();
    exports.GitgraphUserApi = gitgraph_user_api_1.GitgraphUserApi;
    var branch_user_api_1 = require_branch_user_api();
    exports.BranchUserApi = branch_user_api_1.BranchUserApi;
    var branch_1 = require_branch();
    exports.Branch = branch_1.Branch;
    var commit_1 = require_commit();
    exports.Commit = commit_1.Commit;
    var tag_1 = require_tag();
    exports.Tag = tag_1.Tag;
    var refs_1 = require_refs();
    exports.Refs = refs_1.Refs;
    var template_1 = require_template();
    exports.MergeStyle = template_1.MergeStyle;
    exports.TemplateName = template_1.TemplateName;
    exports.templateExtend = template_1.templateExtend;
    var orientation_1 = require_orientation();
    exports.Orientation = orientation_1.Orientation;
    var branches_paths_1 = require_branches_paths();
    exports.toSvgPath = branches_paths_1.toSvgPath;
    var utils_1 = require_utils();
    exports.arrowSvgPath = utils_1.arrowSvgPath;
  }
});

// node_modules/@gitgraph/js/lib/gitgraph.js
var import_core = __toESM(require_lib());

// node_modules/@gitgraph/js/lib/svg-elements.js
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function createSvg(options) {
  var svg = document.createElementNS(SVG_NAMESPACE, "svg");
  if (!options)
    return svg;
  if (options.children) {
    options.children.forEach(function(child) {
      return svg.appendChild(child);
    });
  }
  if (options.viewBox) {
    svg.setAttribute("viewBox", options.viewBox);
  }
  if (options.height) {
    svg.setAttribute("height", options.height.toString());
  }
  if (options.width) {
    svg.setAttribute("width", options.width.toString());
  }
  return svg;
}
function createG(options) {
  var g = document.createElementNS(SVG_NAMESPACE, "g");
  options.children.forEach(function(child) {
    return child && g.appendChild(child);
  });
  if (options.translate) {
    g.setAttribute("transform", "translate(" + options.translate.x + ", " + options.translate.y + ")");
  }
  if (options.fill) {
    g.setAttribute("fill", options.fill);
  }
  if (options.stroke) {
    g.setAttribute("stroke", options.stroke);
  }
  if (options.strokeWidth) {
    g.setAttribute("stroke-width", options.strokeWidth.toString());
  }
  if (options.onClick) {
    g.addEventListener("click", options.onClick);
  }
  if (options.onMouseOver) {
    g.addEventListener("mouseover", options.onMouseOver);
  }
  if (options.onMouseOut) {
    g.addEventListener("mouseout", options.onMouseOut);
  }
  return g;
}
function createText(options) {
  var text = document.createElementNS(SVG_NAMESPACE, "text");
  text.setAttribute("alignment-baseline", "central");
  text.setAttribute("dominant-baseline", "central");
  text.textContent = options.content;
  if (options.fill) {
    text.setAttribute("fill", options.fill);
  }
  if (options.font) {
    text.setAttribute("style", "font: " + options.font);
  }
  if (options.anchor) {
    text.setAttribute("text-anchor", options.anchor);
  }
  if (options.translate) {
    text.setAttribute("x", options.translate.x.toString());
    text.setAttribute("y", options.translate.y.toString());
  }
  if (options.onClick) {
    text.addEventListener("click", options.onClick);
  }
  return text;
}
function createCircle(options) {
  var circle = document.createElementNS(SVG_NAMESPACE, "circle");
  circle.setAttribute("cx", options.radius.toString());
  circle.setAttribute("cy", options.radius.toString());
  circle.setAttribute("r", options.radius.toString());
  if (options.id) {
    circle.setAttribute("id", options.id);
  }
  if (options.fill) {
    circle.setAttribute("fill", options.fill);
  }
  return circle;
}
function createRect(options) {
  var rect = document.createElementNS(SVG_NAMESPACE, "rect");
  rect.setAttribute("width", options.width.toString());
  rect.setAttribute("height", options.height.toString());
  if (options.borderRadius) {
    rect.setAttribute("rx", options.borderRadius.toString());
  }
  if (options.fill) {
    rect.setAttribute("fill", options.fill || "none");
  }
  if (options.stroke) {
    rect.setAttribute("stroke", options.stroke);
  }
  return rect;
}
function createPath(options) {
  var path = document.createElementNS(SVG_NAMESPACE, "path");
  path.setAttribute("d", options.d);
  if (options.fill) {
    path.setAttribute("fill", options.fill);
  }
  if (options.stroke) {
    path.setAttribute("stroke", options.stroke);
  }
  if (options.strokeWidth) {
    path.setAttribute("stroke-width", options.strokeWidth.toString());
  }
  if (options.translate) {
    path.setAttribute("transform", "translate(" + options.translate.x + ", " + options.translate.y + ")");
  }
  return path;
}
function createUse(href) {
  var use = document.createElementNS(SVG_NAMESPACE, "use");
  use.setAttribute("href", "#" + href);
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + href);
  return use;
}
function createClipPath() {
  return document.createElementNS(SVG_NAMESPACE, "clipPath");
}
function createDefs(children) {
  var defs = document.createElementNS(SVG_NAMESPACE, "defs");
  children.forEach(function(child) {
    return defs.appendChild(child);
  });
  return defs;
}
function createForeignObject(options) {
  var result = document.createElementNS(SVG_NAMESPACE, "foreignObject");
  result.setAttribute("width", options.width.toString());
  if (options.translate) {
    result.setAttribute("x", options.translate.x.toString());
    result.setAttribute("y", options.translate.y.toString());
  }
  var p = document.createElement("p");
  p.textContent = options.content;
  result.appendChild(p);
  return result;
}

// node_modules/@gitgraph/js/lib/branch-label.js
var PADDING_X = 10;
var PADDING_Y = 5;
function createBranchLabel(branch, commit) {
  var rect = createRect({
    width: 0,
    height: 0,
    borderRadius: branch.style.label.borderRadius,
    stroke: branch.style.label.strokeColor || commit.style.color,
    fill: branch.style.label.bgColor
  });
  var text = createText({
    content: branch.name,
    translate: {
      x: PADDING_X,
      y: 0
    },
    font: branch.style.label.font,
    fill: branch.style.label.color || commit.style.color
  });
  var branchLabel = createG({ children: [rect] });
  var observer = new MutationObserver(function() {
    var _a = text.getBBox(), height = _a.height, width = _a.width;
    var boxWidth = width + 2 * PADDING_X;
    var boxHeight = height + 2 * PADDING_Y;
    rect.setAttribute("width", boxWidth.toString());
    rect.setAttribute("height", boxHeight.toString());
    text.setAttribute("y", (boxHeight / 2).toString());
  });
  observer.observe(branchLabel, {
    attributes: false,
    subtree: false,
    childList: true
  });
  branchLabel.appendChild(text);
  return branchLabel;
}

// node_modules/@gitgraph/js/lib/tag.js
var PADDING_X2 = 10;
var PADDING_Y2 = 5;
function createTag(tag) {
  var path = createPath({
    d: "",
    fill: tag.style.bgColor,
    stroke: tag.style.strokeColor
  });
  var text = createText({
    content: tag.name,
    fill: tag.style.color,
    font: tag.style.font,
    translate: { x: 0, y: 0 }
  });
  var result = createG({ children: [path] });
  var offset = tag.style.pointerWidth;
  var observer = new MutationObserver(function() {
    var _a = text.getBBox(), height = _a.height, width = _a.width;
    if (height === 0 || width === 0)
      return;
    var radius = tag.style.borderRadius;
    var boxWidth = offset + width + 2 * PADDING_X2;
    var boxHeight = height + 2 * PADDING_Y2;
    var pathD = [
      "M 0,0",
      "L " + offset + "," + boxHeight / 2,
      "V " + boxHeight / 2,
      "Q " + offset + "," + boxHeight / 2 + " " + (offset + radius) + "," + boxHeight / 2,
      "H " + (boxWidth - radius),
      "Q " + boxWidth + "," + boxHeight / 2 + " " + boxWidth + "," + (boxHeight / 2 - radius),
      "V -" + (boxHeight / 2 - radius),
      "Q " + boxWidth + ",-" + boxHeight / 2 + " " + (boxWidth - radius) + ",-" + boxHeight / 2,
      "H " + (offset + radius),
      "Q " + offset + ",-" + boxHeight / 2 + " " + offset + ",-" + boxHeight / 2,
      "V -" + boxHeight / 2,
      "z"
    ].join(" ");
    path.setAttribute("d", pathD.toString());
    text.setAttribute("x", (offset + PADDING_X2).toString());
  });
  observer.observe(result, {
    attributes: false,
    subtree: false,
    childList: true
  });
  result.appendChild(text);
  return result;
}

// node_modules/@gitgraph/js/lib/tooltip.js
var PADDING = 10;
var OFFSET = 10;
function createTooltip(commit) {
  var path = createPath({ d: "", fill: "#EEE" });
  var text = createText({
    translate: { x: OFFSET + PADDING, y: 0 },
    content: commit.hashAbbrev + " - " + commit.subject,
    fill: "#333"
  });
  var commitSize = commit.style.dot.size * 2;
  var tooltip = createG({
    translate: { x: commitSize, y: commitSize / 2 },
    children: [path]
  });
  var observer = new MutationObserver(function() {
    var width = text.getBBox().width;
    var radius = 5;
    var boxHeight = 50;
    var boxWidth = OFFSET + width + 2 * PADDING;
    var pathD = [
      "M 0,0",
      "L " + OFFSET + "," + OFFSET,
      "V " + (boxHeight / 2 - radius),
      "Q " + OFFSET + "," + boxHeight / 2 + " " + (OFFSET + radius) + "," + boxHeight / 2,
      "H " + (boxWidth - radius),
      "Q " + boxWidth + "," + boxHeight / 2 + " " + boxWidth + "," + (boxHeight / 2 - radius),
      "V -" + (boxHeight / 2 - radius),
      "Q " + boxWidth + ",-" + boxHeight / 2 + " " + (boxWidth - radius) + ",-" + boxHeight / 2,
      "H " + (OFFSET + radius),
      "Q " + OFFSET + ",-" + boxHeight / 2 + " " + OFFSET + ",-" + (boxHeight / 2 - radius),
      "V -" + OFFSET,
      "z"
    ].join(" ");
    path.setAttribute("d", pathD.toString());
  });
  observer.observe(tooltip, {
    attributes: false,
    subtree: false,
    childList: true
  });
  tooltip.appendChild(text);
  return tooltip;
}

// node_modules/@gitgraph/js/lib/gitgraph.js
function createGitgraph(graphContainer, options) {
  var commitsElements = {};
  var commitYWithOffsets = {};
  var shouldRecomputeOffsets = false;
  var lastData;
  var $commits;
  var commitMessagesX = 0;
  var $tooltip = null;
  var svg = createSvg();
  adaptSvgOnUpdate(Boolean(options && options.responsive));
  graphContainer.appendChild(svg);
  if (options && options.responsive) {
    graphContainer.setAttribute("style", "display:inline-block; position: relative; width:100%; padding-bottom:100%; vertical-align:middle; overflow:hidden;");
  }
  var gitgraph = new import_core.GitgraphCore(options);
  gitgraph.subscribe(function(data) {
    shouldRecomputeOffsets = true;
    render(data);
  });
  return gitgraph.getUserApi();
  function render(data) {
    commitsElements = {};
    var commits = data.commits, branchesPaths = data.branchesPaths;
    commitMessagesX = data.commitMessagesX;
    lastData = data;
    $commits = renderCommits(commits);
    svg.innerHTML = "";
    svg.appendChild(createG({
      // Translate graph left => left-most branch label is not cropped (horizontal)
      // Translate graph down => top-most commit tooltip is not cropped
      translate: { x: PADDING_X, y: PADDING },
      children: [renderBranchesPaths(branchesPaths), $commits]
    }));
  }
  function adaptSvgOnUpdate(adaptToContainer) {
    var observer = new MutationObserver(function() {
      if (shouldRecomputeOffsets) {
        shouldRecomputeOffsets = false;
        computeOffsets();
        render(lastData);
      } else {
        positionCommitsElements();
        adaptGraphDimensions(adaptToContainer);
      }
    });
    observer.observe(svg, {
      attributes: false,
      // Listen to subtree changes to react when we append the tooltip.
      subtree: true,
      childList: true
    });
    function computeOffsets() {
      var commits = Array.from($commits.children);
      var totalOffsetY = 0;
      var orientedCommits = gitgraph.orientation === import_core.Orientation.VerticalReverse ? commits : commits.reverse();
      commitYWithOffsets = orientedCommits.reduce(function(newOffsets, commit) {
        var commitY = parseInt(commit.getAttribute("transform").split(",")[1].slice(0, -1), 10);
        var firstForeignObject = commit.getElementsByTagName("foreignObject")[0];
        var customHtmlMessage = firstForeignObject && firstForeignObject.firstElementChild;
        newOffsets[commitY] = commitY + totalOffsetY;
        totalOffsetY += getMessageHeight(customHtmlMessage);
        return newOffsets;
      }, {});
    }
    function positionCommitsElements() {
      if (gitgraph.isHorizontal) {
        return;
      }
      var padding = 10;
      Object.keys(commitsElements).forEach(function(commitHash) {
        var _a = commitsElements[commitHash], branchLabel = _a.branchLabel, tags = _a.tags, message = _a.message;
        var x = commitMessagesX;
        if (branchLabel) {
          moveElement(branchLabel, x);
          var branchLabelWidth = branchLabel.getBBox().width + 2 * PADDING_X;
          x += branchLabelWidth + padding;
        }
        tags.forEach(function(tag) {
          moveElement(tag, x);
          var offset = parseFloat(tag.getAttribute("data-offset") || "0");
          var tagWidth = tag.getBBox().width + 2 * PADDING_X2 + offset;
          x += tagWidth + padding;
        });
        if (message) {
          moveElement(message, x);
        }
      });
    }
    function adaptGraphDimensions(adaptToContainer2) {
      var _a = svg.getBBox(), height = _a.height, width = _a.width;
      var horizontalCustomOffset = 50;
      var verticalCustomOffset = 20;
      var widthOffset = gitgraph.isHorizontal ? horizontalCustomOffset : (
        // Add `TOOLTIP_PADDING` so we don't crop the tooltip text.
        // Add `BRANCH_LABEL_PADDING_X` so we don't cut branch label.
        PADDING_X + PADDING
      );
      var heightOffset = gitgraph.isHorizontal ? horizontalCustomOffset : (
        // Add `TOOLTIP_PADDING` so we don't crop tooltip text
        // Add `BRANCH_LABEL_PADDING_Y` so we don't crop branch label.
        PADDING_Y + PADDING + verticalCustomOffset
      );
      if (adaptToContainer2) {
        svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
        svg.setAttribute("viewBox", "0 0 " + (width + widthOffset) + " " + (height + heightOffset));
      } else {
        svg.setAttribute("width", (width + widthOffset).toString());
        svg.setAttribute("height", (height + heightOffset).toString());
      }
    }
  }
  function moveElement(target, x) {
    var transform = target.getAttribute("transform") || "translate(0, 0)";
    target.setAttribute("transform", transform.replace(/translate\(([\d\.]+),/, "translate(" + x + ","));
  }
  function renderBranchesPaths(branchesPaths) {
    var offset = gitgraph.template.commit.dot.size;
    var isBezier = gitgraph.template.branch.mergeStyle === import_core.MergeStyle.Bezier;
    var paths = Array.from(branchesPaths).map(function(_a) {
      var branch = _a[0], coordinates = _a[1];
      return createPath({
        d: (0, import_core.toSvgPath)(coordinates.map(function(coordinate) {
          return coordinate.map(getWithCommitOffset);
        }), isBezier, gitgraph.isVertical),
        fill: "none",
        stroke: branch.computedColor || "",
        strokeWidth: branch.style.lineWidth,
        translate: {
          x: offset,
          y: offset
        }
      });
    });
    return createG({ children: paths });
  }
  function renderCommits(commits) {
    return createG({ children: commits.map(renderCommit) });
    function renderCommit(commit) {
      var _a = getWithCommitOffset(commit), x = _a.x, y = _a.y;
      return createG({
        translate: { x, y },
        children: [
          renderDot(commit)
        ].concat(renderArrows(commit), [
          createG({
            translate: { x: -x, y: 0 },
            children: [
              renderMessage(commit)
            ].concat(renderBranchLabels(commit), renderTags(commit))
          })
        ])
      });
    }
    function renderArrows(commit) {
      if (!gitgraph.template.arrow.size) {
        return [null];
      }
      var commitRadius = commit.style.dot.size;
      return commit.parents.map(function(parentHash) {
        var parent = commits.find(function(_a) {
          var hash = _a.hash;
          return hash === parentHash;
        });
        if (!parent)
          return null;
        var origin = gitgraph.reverseArrow ? {
          x: commitRadius + (parent.x - commit.x),
          y: commitRadius + (parent.y - commit.y)
        } : { x: commitRadius, y: commitRadius };
        var path = createPath({
          d: (0, import_core.arrowSvgPath)(gitgraph, parent, commit),
          fill: gitgraph.template.arrow.color || ""
        });
        return createG({ translate: origin, children: [path] });
      });
    }
  }
  function renderMessage(commit) {
    if (!commit.style.message.display) {
      return null;
    }
    var message;
    if (commit.renderMessage) {
      message = createG({ children: [] });
      adaptMessageBodyHeight(message);
      message.appendChild(commit.renderMessage(commit));
      setMessageRef(commit, message);
      return message;
    }
    var text = createText({
      content: commit.message,
      fill: commit.style.message.color || "",
      font: commit.style.message.font,
      onClick: commit.onMessageClick
    });
    message = createG({
      translate: { x: 0, y: commit.style.dot.size },
      children: [text]
    });
    if (commit.body) {
      var body = createForeignObject({
        width: 600,
        translate: { x: 10, y: 0 },
        content: commit.body
      });
      adaptMessageBodyHeight(message);
      message.appendChild(body);
    }
    setMessageRef(commit, message);
    return message;
  }
  function adaptMessageBodyHeight(message) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(_a) {
        var target = _a.target;
        return setChildrenForeignObjectHeight(target);
      });
    });
    observer.observe(message, {
      attributes: false,
      subtree: false,
      childList: true
    });
    function setChildrenForeignObjectHeight(node) {
      if (node.nodeName === "foreignObject") {
        var foreignObject = node.firstChild && node.firstChild.parentElement;
        if (!foreignObject)
          return;
        foreignObject.setAttribute("height", getMessageHeight(foreignObject.firstElementChild).toString());
      }
      node.childNodes.forEach(setChildrenForeignObjectHeight);
    }
  }
  function renderBranchLabels(commit) {
    var branches = Array.from(gitgraph.branches.values());
    return branches.map(function(branch) {
      if (!branch.style.label.display)
        return null;
      if (!gitgraph.branchLabelOnEveryCommit) {
        var commitHash = gitgraph.refs.getCommit(branch.name);
        if (commit.hash !== commitHash)
          return null;
      }
      if (commit.branchToDisplay !== branch.name)
        return null;
      var branchLabel = branch.renderLabel ? branch.renderLabel(branch) : createBranchLabel(branch, commit);
      var branchLabelContainer;
      if (gitgraph.isVertical) {
        branchLabelContainer = createG({
          children: [branchLabel]
        });
      } else {
        var commitDotSize = commit.style.dot.size * 2;
        var horizontalMarginTop = 10;
        branchLabelContainer = createG({
          translate: { x: commit.x, y: commitDotSize + horizontalMarginTop },
          children: [branchLabel]
        });
      }
      setBranchLabelRef(commit, branchLabelContainer);
      return branchLabelContainer;
    });
  }
  function renderTags(commit) {
    if (!commit.tags)
      return [];
    if (gitgraph.isHorizontal)
      return [];
    return commit.tags.map(function(tag) {
      var tagElement = tag.render ? tag.render(tag.name, tag.style) : createTag(tag);
      var tagContainer = createG({
        translate: { x: 0, y: commit.style.dot.size },
        children: [tagElement]
      });
      tagContainer.setAttribute("data-offset", tag.style.pointerWidth.toString());
      setTagRef(commit, tagContainer);
      return tagContainer;
    });
  }
  function renderDot(commit) {
    if (commit.renderDot) {
      return commit.renderDot(commit);
    }
    var circleId = commit.hash;
    var circle = createCircle({
      id: circleId,
      radius: commit.style.dot.size,
      fill: commit.style.dot.color || ""
    });
    var clipPathId = "clip-" + commit.hash;
    var circleClipPath = createClipPath();
    circleClipPath.setAttribute("id", clipPathId);
    circleClipPath.appendChild(createUse(circleId));
    var useCirclePath = createUse(circleId);
    useCirclePath.setAttribute("clip-path", "url(#" + clipPathId + ")");
    useCirclePath.setAttribute("stroke", commit.style.dot.strokeColor || "");
    var strokeWidth = commit.style.dot.strokeWidth ? commit.style.dot.strokeWidth * 2 : 0;
    useCirclePath.setAttribute("stroke-width", strokeWidth.toString());
    var dotText = commit.dotText ? createText({
      content: commit.dotText,
      font: commit.style.dot.font,
      anchor: "middle",
      translate: { x: commit.style.dot.size, y: commit.style.dot.size }
    }) : null;
    return createG({
      onClick: commit.onClick,
      onMouseOver: function() {
        appendTooltipToGraph(commit);
        commit.onMouseOver();
      },
      onMouseOut: function() {
        if ($tooltip)
          $tooltip.remove();
        commit.onMouseOut();
      },
      children: [createDefs([circle, circleClipPath]), useCirclePath, dotText]
    });
  }
  function appendTooltipToGraph(commit) {
    if (!svg.firstChild)
      return;
    if (gitgraph.isVertical && gitgraph.mode !== import_core.Mode.Compact)
      return;
    if (gitgraph.isVertical && !commit.style.hasTooltipInCompactMode)
      return;
    var tooltip = commit.renderTooltip ? commit.renderTooltip(commit) : createTooltip(commit);
    $tooltip = createG({
      translate: getWithCommitOffset(commit),
      children: [tooltip]
    });
    svg.firstChild.appendChild($tooltip);
  }
  function getWithCommitOffset(_a) {
    var x = _a.x, y = _a.y;
    return { x, y: commitYWithOffsets[y] || y };
  }
  function setBranchLabelRef(commit, branchLabels) {
    if (!commitsElements[commit.hashAbbrev]) {
      initCommitElements(commit);
    }
    commitsElements[commit.hashAbbrev].branchLabel = branchLabels;
  }
  function setMessageRef(commit, message) {
    if (!commitsElements[commit.hashAbbrev]) {
      initCommitElements(commit);
    }
    commitsElements[commit.hashAbbrev].message = message;
  }
  function setTagRef(commit, tag) {
    if (!commitsElements[commit.hashAbbrev]) {
      initCommitElements(commit);
    }
    commitsElements[commit.hashAbbrev].tags.push(tag);
  }
  function initCommitElements(commit) {
    commitsElements[commit.hashAbbrev] = {
      branchLabel: null,
      tags: [],
      message: null
    };
  }
}
function getMessageHeight(message) {
  var messageHeight = 0;
  if (message) {
    var height = message.getBoundingClientRect().height;
    var marginTopInPx = window.getComputedStyle(message).marginTop || "0px";
    var marginTop = parseInt(marginTopInPx.replace("px", ""), 10);
    messageHeight = height + marginTop;
  }
  return messageHeight;
}
var export_MergeStyle = import_core.MergeStyle;
var export_Mode = import_core.Mode;
var export_Orientation = import_core.Orientation;
var export_TemplateName = import_core.TemplateName;
var export_templateExtend = import_core.templateExtend;
export {
  export_MergeStyle as MergeStyle,
  export_Mode as Mode,
  export_Orientation as Orientation,
  export_TemplateName as TemplateName,
  createGitgraph,
  export_templateExtend as templateExtend
};
