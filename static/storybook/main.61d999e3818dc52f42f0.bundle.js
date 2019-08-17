(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{300:function(module,__webpack_exports__,__webpack_require__){"use strict";var _storybook_theming__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(301);__webpack_exports__.a=Object(_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.create)({base:"light",colorPrimary:"hotpink",colorSecondary:"deepskyblue",appBg:"white",appContentBg:"silver",appBorderColor:"grey",appBorderRadius:4,fontBase:'"Open Sans", sans-serif',fontCode:"monospace",textColor:"black",textInverseColor:"rgba(255,255,255,0.9)",barTextColor:"silver",barSelectedColor:"black",barBg:"hotpink",inputBg:"white",inputBorder:"silver",inputTextColor:"black",inputBorderRadius:4,brandTitle:"Refactor or die",brandUrl:"https://refactorordie.com",brandImage:"https://refactorordie.com/icon.png"})},305:function(module,exports,__webpack_require__){__webpack_require__(306),__webpack_require__(410),module.exports=__webpack_require__(411)},411:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(163),_theme__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(300);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.addParameters)({options:{showPanel:!1,isToolshown:!1,theme:_theme__WEBPACK_IMPORTED_MODULE_1__.a}}),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(function loadStories(){!function requireAll(requireContext){return requireContext.keys().sort().map(requireContext)}(__webpack_require__(594))},module)}.call(this,__webpack_require__(412)(module))},594:function(module,exports,__webpack_require__){var map={"./todos/todo.story.tsx":595};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=594},595:function(module,exports,__webpack_require__){"use strict";(function(module){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importDefault(__webpack_require__(9)),react_2=__webpack_require__(163),App_1=__webpack_require__(596);react_2.storiesOf("Todos",module).add("Todo App Observer",function(){return react_1.default.createElement(App_1.App,null)})}).call(this,__webpack_require__(117)(module))},596:function(module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importDefault(__webpack_require__(9)),react_2=__webpack_require__(9),TodoBloc_1=__webpack_require__(597),observer_react_1=__webpack_require__(598),utils_1=__webpack_require__(599);exports.App=function App(){var bloc=react_2.useMemo(function(){return TodoBloc_1.createTodoBloc(localStorage)},[]);return react_1.default.createElement("div",{className:"container",style:{maxWidth:"30em"}},react_1.default.createElement("h1",null,"Todos"),react_1.default.createElement("ul",{className:"list-group"},react_1.default.createElement(observer_react_1.Observer,{of:bloc.todos,next:function(todos){return todos.map(function(todo){return react_1.default.createElement("li",{key:todo.id,style:{textDecoration:todo.done?"strike":"none"},className:"list-group-item",onClick:function(){return bloc.toggleTodo(todo.id)}},todo.label," ",react_1.default.createElement("a",{href:"#",className:"float-right",onClick:utils_1.preventDefaultThen(function(){return bloc.deleteTodo(todo.id)})},"Delete"))})}})),react_1.default.createElement("br",null),react_1.default.createElement("form",{onSubmit:function(evt){bloc.saveTodo(),evt.preventDefault()},className:"form"},react_1.default.createElement("label",{htmlFor:"new-todo-label"},"New Todo"),react_1.default.createElement("div",{className:"input-group"},react_1.default.createElement(observer_react_1.Observer,{of:bloc.newTodoLabel,next:function(value){return react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement("input",{id:"new-todo-label",type:"text",className:"form-control",placeholder:"Todo title",value:value,onChange:utils_1.changeValue(bloc.changeNewTodoLabel)}))}}),react_1.default.createElement("div",{className:"input-group-append"},react_1.default.createElement("button",{type:"submit",className:"btn btn-primary"},"Add")))))}},597:function(module,exports,__webpack_require__){"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var rxjs_1=__webpack_require__(299),operators_1=__webpack_require__(600);exports.createTodoBloc=function createTodoBloc(storage){var savedState=function getSave(storage){return JSON.parse(storage.getItem(STORAGE_KEY)||"false")||{newTodoLabel:"",todos:[]}}(storage),todos=new rxjs_1.BehaviorSubject(savedState.todos),newTodoLabel=new rxjs_1.BehaviorSubject(savedState.newTodoLabel);return rxjs_1.combineLatest(todos,newTodoLabel).pipe(operators_1.debounceTime(500)).subscribe(function(_a){var todos=_a[0],newTodoLabel=_a[1];return function saveState(storage,todos){return storage.setItem(STORAGE_KEY,JSON.stringify(todos))}(storage,{todos:todos,newTodoLabel:newTodoLabel})}),{toggleTodo:function(todoId){todos.next(todos.value.map(function(originalTodo){return originalTodo.id===todoId?__assign({},originalTodo,{done:!originalTodo.done}):originalTodo}))},deleteTodo:function(todoId){todos.next(todos.value.filter(function(originalTodo){return originalTodo.id!==todoId}))},changeNewTodoLabel:function(label){newTodoLabel.next(label)},saveTodo:function(){todos.next(todos.value.concat([{id:randId(),done:!1,label:newTodoLabel.value}])),newTodoLabel.next("")},newTodoLabel:newTodoLabel,todos:todos}};var randId=function(){return Math.random().toString(36).slice(2)},STORAGE_KEY="todos"},599:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.changeValue=function changeValue(handler){return function(evt){return handler(evt.currentTarget.value)}},exports.preventDefaultThen=function preventDefaultThen(handler){return function(evt){evt.preventDefault(),handler()}}}},[[305,1,2]]]);
//# sourceMappingURL=main.61d999e3818dc52f42f0.bundle.js.map