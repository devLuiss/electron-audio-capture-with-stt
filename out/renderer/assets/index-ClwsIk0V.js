var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
function errorContext(cb) {
  {
    cb();
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x) {
  return x;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function takeUntil(notifier) {
  return operate(function(source, subscriber) {
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
      return subscriber.complete();
    }, noop));
    !subscriber.closed && source.subscribe(subscriber);
  });
}
console.log("[AudioCapture] Script loaded");
class Capturer {
  audioContext;
  mediaStreamSource;
  audioWorkletNode;
  mergedStream;
  permissionStatus = null;
  constructor() {
    console.log("[AudioCapture] Capturer instanciado");
  }
  // Nova função para verificar e solicitar permissões
  async checkPermissions() {
    try {
      console.log("[AudioCapture] Verificando permissões para microfone...");
      if (navigator.permissions && navigator.permissions.query) {
        this.permissionStatus = await navigator.permissions.query({ name: "microphone" });
        console.log(`[AudioCapture] Status da permissão para microfone: ${this.permissionStatus.state}`);
        if (this.permissionStatus.state === "granted") {
          console.log("[AudioCapture] Permissão para microfone já concedida.");
          return true;
        }
        if (this.permissionStatus.state === "denied") {
          console.error("[AudioCapture] Permissão para microfone negada pelo usuário.");
          const message = "O acesso ao microfone foi negado. Por favor, verifique as configurações do seu navegador/sistema e permita o acesso ao microfone.";
          alert(message);
          updateStatus$1(message);
          return false;
        }
      }
      console.log("[AudioCapture] Solicitando permissão explicitamente via getUserMedia...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      console.log("[AudioCapture] Permissão para microfone concedida após solicitação explícita.");
      return true;
    } catch (error) {
      console.error("[AudioCapture] Erro ao verificar/solicitar permissão para microfone:", error);
      let message = "Não foi possível obter acesso ao microfone. ";
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          message += "O acesso foi negado. Por favor, verifique as configurações do seu navegador/sistema.";
        } else if (error.name === "NotFoundError") {
          message += "Nenhum dispositivo de áudio foi encontrado. Por favor, conecte um microfone.";
        } else {
          message += `Erro: ${error.name}`;
        }
      } else {
        message += "Verifique se seu sistema permite o acesso ao microfone.";
      }
      alert(message);
      updateStatus$1(message);
      return false;
    }
  }
  async mic() {
    try {
      console.log("[AudioCapture] Tentando obter stream do microfone (getUserMedia)");
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        throw new Error("Permissão para microfone negada ou não disponível");
      }
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[AudioCapture] Stream do microfone obtido:", micStream);
      const audioTracks = micStream.getAudioTracks();
      console.log("[AudioCapture] Faixas de áudio do microfone:", audioTracks);
      if (audioTracks.length === 0) {
        console.error("[AudioCapture] Nenhuma faixa de áudio encontrada no stream do microfone!");
      } else {
        console.log(`[AudioCapture] Faixa de áudio do microfone[0]: label='${audioTracks[0].label}', enabled=${audioTracks[0].enabled}, muted=${audioTracks[0].muted}, readyState=${audioTracks[0].readyState}`);
      }
      return micStream;
    } catch (error) {
      console.error("[AudioCapture] Erro ao obter stream do microfone:", error);
      throw error;
    }
  }
  async audio() {
    try {
      console.log("[AudioCapture] Tentando obter stream de áudio do display (getDisplayMedia)");
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor"
        },
        audio: true
      });
      console.log("[AudioCapture] Stream do display obtido:", displayStream);
      const audioTracks = displayStream.getAudioTracks();
      console.log("[AudioCapture] Faixas de áudio do display:", audioTracks);
      if (audioTracks.length === 0) {
        console.error('[AudioCapture] Nenhuma faixa de áudio encontrada no stream do display! Verifique se "Compartilhar áudio" foi selecionado na janela de captura.');
      } else {
        console.log(`[AudioCapture] Faixa de áudio do display[0]: label='${audioTracks[0].label}', enabled=${audioTracks[0].enabled}, muted=${audioTracks[0].muted}, readyState=${audioTracks[0].readyState}`);
      }
      displayStream.getVideoTracks().forEach((track) => {
        console.log(`[AudioCapture] Parando faixa de vídeo do display: ${track.label}`);
        track.stop();
      });
      return displayStream;
    } catch (error) {
      console.error("[AudioCapture] Erro ao obter stream de áudio do display:", error);
      throw error;
    }
  }
  mergeAudioStreams(...streams) {
    console.log("[AudioCapture] Tentando mesclar streams:", streams);
    if (!this.audioContext) {
      console.error("[AudioCapture] AudioContext não inicializado para mergeAudioStreams.");
      return void 0;
    }
    const audioCtx = this.audioContext;
    const destination = audioCtx.createMediaStreamDestination();
    let hasAudioTracks = false;
    streams.forEach((stream) => {
      if (stream && stream.getAudioTracks().length > 0) {
        console.log(`[AudioCapture] Adicionando faixas de áudio do stream ${stream.id} ao destino de mesclagem.`);
        hasAudioTracks = true;
        try {
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(destination);
          console.log(`[AudioCapture] Stream ${stream.id} conectado ao destino de mesclagem.`);
        } catch (error) {
          console.error(`[AudioCapture] Erro ao criar ou conectar MediaStreamSource para stream ${stream.id}:`, error);
        }
      } else {
        console.warn(`[AudioCapture] Stream ${stream?.id} não possui faixas de áudio ou é inválido.`);
      }
    });
    if (!hasAudioTracks) {
      console.error("[AudioCapture] Nenhum dos streams fornecidos continha faixas de áudio para mesclar.");
      return void 0;
    }
    console.log("[AudioCapture] Stream mesclado criado:", destination.stream);
    return destination.stream;
  }
  async startRecording(onAudioCallback) {
    console.log("[AudioCapture] Iniciando startRecording");
    if (this.audioContext && this.audioContext.state !== "closed") {
      console.warn("[AudioCapture] AudioContext existente encontrado. Fechando antes de criar um novo.");
      await this.audioContext.close();
    }
    this.audioContext = new AudioContext();
    console.log(`[AudioCapture] Novo AudioContext criado. Sample rate: ${this.audioContext.sampleRate}`);
    try {
      console.log("[AudioCapture] Tentando obter streams de áudio e microfone em paralelo.");
      const [desktopStreamResult, micStreamResult] = await Promise.allSettled([this.audio(), this.mic()]);
      const desktopAudio = desktopStreamResult.status === "fulfilled" ? desktopStreamResult.value : void 0;
      const micAudio = micStreamResult.status === "fulfilled" ? micStreamResult.value : void 0;
      if (!desktopAudio) console.error("[AudioCapture] Falha ao obter stream de áudio do display:", desktopStreamResult.status === "rejected" ? desktopStreamResult.reason : "Status desconhecido");
      if (!micAudio) console.error("[AudioCapture] Falha ao obter stream do microfone:", micStreamResult.status === "rejected" ? micStreamResult.reason : "Status desconhecido");
      const validStreams = [desktopAudio, micAudio].filter((s) => s && s.getAudioTracks().length > 0);
      if (validStreams.length === 0) {
        console.error("[AudioCapture] Falha ao obter QUALQUER faixa de áudio (display ou microfone). Abortando gravação.");
        this.stopRecording();
        return;
      }
      console.log(`[AudioCapture] Streams obtidos com sucesso: ${validStreams.map((s) => s.id).join(", ")}`);
      this.mergedStream = this.mergeAudioStreams(...validStreams);
      if (!this.mergedStream || this.mergedStream.getAudioTracks().length === 0) {
        console.error("[AudioCapture] Falha ao mesclar streams de áudio ou stream mesclado não tem faixas de áudio.");
        this.stopRecording();
        return;
      }
      console.log("[AudioCapture] Streams mesclados com sucesso.");
      console.log("[AudioCapture] Faixas de áudio do stream mesclado:", this.mergedStream.getAudioTracks());
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(this.mergedStream);
      console.log("[AudioCapture] MediaStreamSource criado a partir do stream mesclado.");
      try {
        console.log("[AudioCapture] Tentando adicionar módulo AudioWorklet: src/renderer/src/wave-loopback.js");
        await this.audioContext.audioWorklet.addModule("src/renderer/src/wave-loopback.js");
        console.log("[AudioCapture] Módulo AudioWorklet adicionado com sucesso.");
      } catch (error) {
        console.error("[AudioCapture] Erro ao adicionar módulo AudioWorklet:", error);
        this.stopRecording();
        return;
      }
      this.audioWorkletNode = new AudioWorkletNode(this.audioContext, "wave-processor");
      console.log("[AudioCapture] AudioWorkletNode 'wave-processor' criado.");
      this.audioWorkletNode.port.onmessage = (event) => {
        if (event.data && event.data.buffer) {
          onAudioCallback(event.data.buffer);
        } else {
          console.warn("[AudioCapture] Mensagem inesperada recebida do AudioWorklet:", event.data);
        }
      };
      this.audioWorkletNode.port.onmessageerror = (event) => {
        console.error("[AudioCapture] Erro na mensagem do AudioWorklet port:", event);
      };
      this.audioWorkletNode.onprocessorerror = (event) => {
        console.error("[AudioCapture] Erro no processador AudioWorklet:", event);
      };
      this.mediaStreamSource.connect(this.audioWorkletNode);
      console.log("[AudioCapture] MediaStreamSource conectado ao AudioWorkletNode.");
      console.log("[AudioCapture] Gravação iniciada com sucesso.");
    } catch (error) {
      console.error("[AudioCapture] Erro GERAL durante startRecording:", error);
      this.stopRecording();
    }
  }
  stopRecording() {
    console.log("[AudioCapture] Iniciando stopRecording");
    this.mergedStream?.getTracks().forEach((track) => {
      console.log(`[AudioCapture] Parando track mesclada: ${track.kind} - ${track.label} - ID: ${track.id} - State: ${track.readyState}`);
      track.stop();
      console.log(`[AudioCapture] Track mesclada parada. Novo state: ${track.readyState}`);
    });
    if (this.audioWorkletNode) {
      console.log("[AudioCapture] Desconectando AudioWorkletNode");
      this.audioWorkletNode.disconnect();
      console.log("[AudioCapture] AudioWorkletNode desconectado.");
    } else {
      console.log("[AudioCapture] AudioWorkletNode não encontrado para desconectar.");
    }
    if (this.mediaStreamSource) {
      console.log("[AudioCapture] Desconectando MediaStreamSource");
      this.mediaStreamSource.disconnect();
      console.log("[AudioCapture] MediaStreamSource desconectado.");
    } else {
      console.log("[AudioCapture] MediaStreamSource não encontrado para desconectar.");
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      console.log(`[AudioCapture] Fechando AudioContext (estado atual: ${this.audioContext.state})`);
      this.audioContext.close().then(() => {
        console.log("[AudioCapture] AudioContext fechado com sucesso.");
        this.audioContext = void 0;
      }).catch((err) => {
        console.error("[AudioCapture] Erro ao fechar AudioContext:", err);
        this.audioContext = void 0;
      });
    } else {
      console.log(`[AudioCapture] AudioContext já estava fechado (${this.audioContext?.state}) ou não inicializado.`);
      this.audioContext = void 0;
    }
    this.mergedStream = void 0;
    this.mediaStreamSource = void 0;
    this.audioWorkletNode = void 0;
    console.log("[AudioCapture] Recursos de gravação limpos.");
  }
  audio_stream() {
    console.log("[AudioCapture] Criando Observable para audio_stream");
    return new Observable((subscriber) => {
      console.log("[AudioCapture] Observable subscrito. Iniciando gravação...");
      this.startRecording((audioData) => {
        subscriber.next(audioData);
      }).then(() => {
        console.log("[AudioCapture] startRecording concluído (promessa resolvida). Aguardando dados do worklet...");
      }).catch((error) => {
        console.error("[AudioCapture] Erro ao iniciar a gravação no Observable:", error);
        subscriber.error(error);
      });
      return () => {
        console.log("[AudioCapture] Observable desinscrito. Parando gravação...");
        this.stopRecording();
        console.log("[AudioCapture] Gravação parada via limpeza do Observable.");
      };
    });
  }
}
function updateStatus$1(message) {
  const statusDiv2 = document.getElementById("status");
  if (statusDiv2) {
    statusDiv2.textContent = message;
    console.log(`[AudioCapture] Status: ${message}`);
  }
}
function audio_stream() {
  const capturer = new Capturer();
  return capturer.audio_stream();
}
function renderWavFile(buffer, options) {
  function getWavHeader(options2, numFrames2) {
    const numChannels = options2.numChannels || 2;
    const sampleRate = options2.sampleRate || 44100;
    const bytesPerSample = 2;
    const format = 1;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = numFrames2 * blockAlign;
    const buffer2 = new ArrayBuffer(44);
    const dv = new DataView(buffer2);
    let p = 0;
    function writeString(s) {
      for (let i = 0; i < s.length; i++) {
        dv.setUint8(p + i, s.charCodeAt(i));
      }
      p += s.length;
    }
    function writeUint32(d) {
      dv.setUint32(p, d, true);
      p += 4;
    }
    function writeUint16(d) {
      dv.setUint16(p, d, true);
      p += 2;
    }
    writeString("RIFF");
    writeUint32(dataSize + 36);
    writeString("WAVE");
    writeString("fmt ");
    writeUint32(16);
    writeUint16(format);
    writeUint16(numChannels);
    writeUint32(sampleRate);
    writeUint32(byteRate);
    writeUint16(blockAlign);
    writeUint16(bytesPerSample * 8);
    writeString("data");
    writeUint32(dataSize);
    return new Uint8Array(buffer2);
  }
  let audioData = buffer;
  {
    const pcmData = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      pcmData[i] = s < 0 ? s * 32768 : s * 32767;
    }
    audioData = pcmData;
  }
  const numFrames = audioData.length;
  const headerBytes = getWavHeader(options, numFrames);
  const wavBytes = new Uint8Array(headerBytes.length + audioData.byteLength);
  wavBytes.set(headerBytes, 0);
  wavBytes.set(new Uint8Array(audioData.buffer), headerBytes.length);
  return wavBytes;
}
console.log("[Renderer] Script loaded");
let chunks = [];
let stopSignal = new Subject();
let isRecording = false;
let audioStreamSubscription = null;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const statusDiv = document.getElementById("status");
console.log("[Renderer] Botões encontrados:", {
  startButton: startButton ? "sim" : "não",
  stopButton: stopButton ? "sim" : "não",
  statusDiv: statusDiv ? "sim" : "não"
});
if (document.head) {
  const style = document.createElement("style");
  style.textContent = `
    body { font-family: Arial, sans-serif; padding: 20px; }
    .button { padding: 10px 20px; margin: 5px; cursor: pointer; }
    #status { margin-top: 15px; padding: 10px; background: #f0f0f0; }
    #startButton { background: #4CAF50; color: white; border: none; }
    #stopButton { background: #f44336; color: white; border: none; }
    .disabled { opacity: 0.5; cursor: not-allowed; }
  `;
  document.head.appendChild(style);
}
function updateStatus(message) {
  if (statusDiv) {
    statusDiv.textContent = message;
    console.log(`[Renderer] Status: ${message}`);
  } else {
    console.error("[Renderer] Elemento statusDiv não encontrado!");
  }
}
function updateUIState(recording) {
  isRecording = recording;
  if (startButton && stopButton) {
    if (recording) {
      startButton.classList.add("disabled");
      stopButton.classList.remove("disabled");
    } else {
      startButton.classList.remove("disabled");
      stopButton.classList.add("disabled");
    }
  }
  console.log(`[Renderer] Estado da UI atualizado: isRecording=${isRecording}`);
}
async function checkMicrophonePermission() {
  updateStatus("Verificando permissões do microfone...");
  console.log("[Renderer] Verificando permissões do microfone explicitamente ao iniciar o aplicativo");
  try {
    updateStatus("Solicitando permissão do microfone - por favor aceite o pedido do sistema!");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("[Renderer] Permissão para microfone concedida ao iniciar o aplicativo");
    stream.getTracks().forEach((track) => track.stop());
    updateStatus("Permissão para microfone concedida. Pronto para gravar.");
    updateUIState(false);
  } catch (error) {
    console.error("[Renderer] Erro ao verificar permissão do microfone no início:", error);
    let message = "Erro ao acessar o microfone: ";
    if (error instanceof DOMException) {
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        message += "Permissão negada. Verifique suas configurações do sistema.";
      } else if (error.name === "NotFoundError") {
        message += "Nenhum dispositivo de áudio encontrado.";
      } else {
        message += `${error.name}`;
      }
    } else {
      message += "Erro desconhecido. Verifique as configurações do seu sistema.";
    }
    updateStatus(message);
    setTimeout(() => {
      alert(message + "\n\nNo Ubuntu, você pode precisar verificar as configurações de privacidade do sistema.");
    }, 500);
    updateUIState(false);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("[Renderer] DOM carregado, verificando permissões de microfone");
  checkMicrophonePermission();
});
if (startButton) {
  startButton.addEventListener("click", () => {
    console.log("[Renderer] Botão Start clicado!");
    if (isRecording) {
      console.log("[Renderer] Já está gravando, ignorando clique em Start");
      return;
    }
    checkMicrophonePermission().then(() => {
      updateUIState(true);
      updateStatus("Iniciando gravação...");
      chunks = [];
      stopSignal = new Subject();
      try {
        console.log("[Renderer] Criando nova inscrição no stream de áudio");
        const audioStream = audio_stream().pipe(takeUntil(stopSignal));
        audioStreamSubscription = audioStream.subscribe({
          next: (chunk) => {
            console.log("[Renderer] Recebido chunk de áudio de tamanho:", chunk.length);
            chunks.push(chunk);
          },
          error: (err) => {
            console.error("[Renderer] Erro no stream de áudio:", err);
            updateStatus(`Erro: ${err instanceof Error ? err.message : String(err)}`);
            updateUIState(false);
            audioStreamSubscription = null;
          },
          complete: () => {
            console.log("[Renderer] Stream de áudio completado (via takeUntil).");
            updateStatus("Processando áudio...");
            processAndSaveAudio();
            updateUIState(false);
            audioStreamSubscription = null;
          }
        });
        console.log("[Renderer] Inscrição no stream de áudio criada:", audioStreamSubscription);
        updateStatus("Gravação iniciada.");
      } catch (error) {
        console.error("[Renderer] Erro ao criar stream de áudio:", error);
        updateStatus(`Erro ao iniciar gravação: ${error instanceof Error ? error.message : String(error)}`);
        updateUIState(false);
      }
    }).catch((err) => {
      console.error("[Renderer] Erro ao verificar permissão antes de iniciar gravação:", err);
      updateStatus("Não foi possível iniciar a gravação devido a problemas de permissão.");
      updateUIState(false);
    });
  });
}
if (stopButton) {
  stopButton.addEventListener("click", () => {
    console.log("[Renderer] Botão Stop clicado!");
    if (!isRecording) {
      console.log("[Renderer] Não está gravando, ignorando clique em Stop");
      updateStatus("Nenhuma gravação em andamento para parar.");
      return;
    }
    console.log("[Renderer] Botão Stop clicado, parando gravação...");
    updateStatus("Parando gravação...");
    try {
      if (audioStreamSubscription) {
        console.log("[Renderer] Cancelando inscrição de stream de áudio");
        console.log("[Renderer] Enviando sinal de parada para o stream via stopSignal.next()");
        stopSignal.next();
        stopSignal.complete();
        console.log("[Renderer] Tentando cancelar inscrição diretamente");
        if (!audioStreamSubscription.closed) {
          audioStreamSubscription.unsubscribe();
          console.log("[Renderer] Inscrição do stream de áudio cancelada via unsubscribe()");
        } else {
          console.log("[Renderer] Inscrição já estava fechada, não é necessário chamar unsubscribe()");
        }
        audioStreamSubscription = null;
      } else {
        console.warn("[Renderer] Nenhuma inscrição de stream encontrada para cancelar");
      }
      console.log("[Renderer] Processando o áudio após parar a gravação");
      if (chunks.length > 0) {
        console.log(`[Renderer] ${chunks.length} chunks capturados, processando áudio`);
        processAndSaveAudio();
      } else {
        console.warn("[Renderer] Nenhum dado de áudio capturado durante a gravação");
        updateStatus("Nenhum áudio capturado para salvar.");
      }
    } catch (error) {
      console.error("[Renderer] Erro ao processar o clique do botão Stop:", error);
      updateStatus("Erro ao parar a gravação: " + String(error));
    } finally {
      console.log("[Renderer] Finalizando estado de gravação");
      updateUIState(false);
    }
  });
}
function processAndSaveAudio() {
  if (chunks.length === 0) {
    updateStatus("Nenhum áudio capturado para salvar.");
    console.warn("[Renderer] Nenhum chunk de áudio para processar.");
    return;
  }
  console.log(`[Renderer] Processando ${chunks.length} chunks de áudio.`);
  let totalLength = 0;
  for (const chunk of chunks) {
    totalLength += chunk.length;
  }
  console.log(`[Renderer] Tamanho total do áudio: ${totalLength} samples.`);
  const combinedAudio = new Float32Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combinedAudio.set(chunk, offset);
    offset += chunk.length;
  }
  console.log("[Renderer] Chunks de áudio combinados.");
  try {
    const wavBytes = renderWavFile(combinedAudio, { isFloat: false });
    console.log(`[Renderer] Arquivo WAV renderizado (tamanho: ${wavBytes.byteLength} bytes)`);
    const wavBlob = new Blob([wavBytes], { type: "audio/wav" });
    console.log(`[Renderer] Blob WAV criado (tamanho: ${wavBlob.size} bytes)`);
    const reader = new FileReader();
    reader.onload = function(event) {
      if (event.target?.result instanceof ArrayBuffer) {
        const buffer = Buffer.from(event.target.result);
        console.log(`[Renderer] Enviando buffer (size: ${buffer.length}) para o processo principal para salvar...`);
        window.nodeAPI.writeFile("out.wav", buffer).then(() => {
          updateStatus("Arquivo out.wav salvo com sucesso!");
          console.log("[Renderer] Arquivo salvo com sucesso via processo principal.");
        }).catch((err) => {
          console.error("[Renderer] Erro ao salvar arquivo via processo principal:", err);
          updateStatus(`Erro ao salvar arquivo: ${err.message}`);
        });
      } else {
        console.error("[Renderer] Resultado do FileReader não é um ArrayBuffer.");
        updateStatus("Erro interno ao ler o Blob WAV.");
      }
    };
    reader.onerror = (event) => {
      console.error("[Renderer] Erro do FileReader ao ler o Blob WAV:", event.target?.error);
      updateStatus("Erro interno ao ler o Blob WAV.");
    };
    reader.readAsArrayBuffer(wavBlob);
  } catch (error) {
    console.error("[Renderer] Erro ao renderizar ou salvar o arquivo WAV:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    updateStatus(`Erro ao processar WAV: ${errorMessage}`);
  } finally {
    chunks = [];
  }
}
if (window.nodeAPI && typeof window.nodeAPI.writeFile === "function") {
  console.log("[Renderer] API nodeAPI.writeFile encontrada.");
} else {
  console.error("[Renderer] ERRO: API nodeAPI.writeFile NÃO encontrada. Verifique preload/index.ts e o contexto da janela.");
  updateStatus("Erro de configuração: API de salvamento indisponível.");
}
