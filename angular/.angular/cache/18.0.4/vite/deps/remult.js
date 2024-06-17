import {
  __async,
  __commonJS,
  __forAwait,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-ZQDTHPHI.js";

// ../node_modules/@noble/hashes/_assert.js
var require_assert = __commonJS({
  "../node_modules/@noble/hashes/_assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = exports.isBytes = void 0;
    function number(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`positive integer expected, not ${n}`);
    }
    exports.number = number;
    function bool(b) {
      if (typeof b !== "boolean")
        throw new Error(`boolean expected, not ${b}`);
    }
    exports.bool = bool;
    function isBytes(a) {
      return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
    }
    exports.isBytes = isBytes;
    function bytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
    }
    exports.bytes = bytes;
    function hash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
      number(h.outputLen);
      number(h.blockLen);
    }
    exports.hash = hash;
    function exists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    exports.exists = exists;
    function output(out, instance) {
      bytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
      }
    }
    exports.output = output;
    var assert = { number, bool, bytes, hash, exists, output };
    exports.default = assert;
  }
});

// ../node_modules/@noble/hashes/_u64.js
var require_u64 = __commonJS({
  "../node_modules/@noble/hashes/_u64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.add5L = exports.add5H = exports.add4H = exports.add4L = exports.add3H = exports.add3L = exports.add = exports.rotlBL = exports.rotlBH = exports.rotlSL = exports.rotlSH = exports.rotr32L = exports.rotr32H = exports.rotrBL = exports.rotrBH = exports.rotrSL = exports.rotrSH = exports.shrSL = exports.shrSH = exports.toBig = exports.split = exports.fromBig = void 0;
    var U32_MASK64 = BigInt(2 ** 32 - 1);
    var _32n = BigInt(32);
    function fromBig(n, le = false) {
      if (le)
        return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
      return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
    }
    exports.fromBig = fromBig;
    function split(lst, le = false) {
      let Ah = new Uint32Array(lst.length);
      let Al = new Uint32Array(lst.length);
      for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
      }
      return [Ah, Al];
    }
    exports.split = split;
    var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
    exports.toBig = toBig;
    var shrSH = (h, _l, s) => h >>> s;
    exports.shrSH = shrSH;
    var shrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.shrSL = shrSL;
    var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    exports.rotrSH = rotrSH;
    var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.rotrSL = rotrSL;
    var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    exports.rotrBH = rotrBH;
    var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    exports.rotrBL = rotrBL;
    var rotr32H = (_h, l) => l;
    exports.rotr32H = rotr32H;
    var rotr32L = (h, _l) => h;
    exports.rotr32L = rotr32L;
    var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    exports.rotlSH = rotlSH;
    var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    exports.rotlSL = rotlSL;
    var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    exports.rotlBH = rotlBH;
    var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    exports.rotlBL = rotlBL;
    function add(Ah, Al, Bh, Bl) {
      const l = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    exports.add = add;
    var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    exports.add3L = add3L;
    var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    exports.add3H = add3H;
    var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    exports.add4L = add4L;
    var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    exports.add4H = add4H;
    var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    exports.add5L = add5L;
    var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    exports.add5H = add5H;
    var u64 = {
      fromBig,
      split,
      toBig,
      shrSH,
      shrSL,
      rotrSH,
      rotrSL,
      rotrBH,
      rotrBL,
      rotr32H,
      rotr32L,
      rotlSH,
      rotlSL,
      rotlBH,
      rotlBL,
      add,
      add3L,
      add3H,
      add4L,
      add4H,
      add5H,
      add5L
    };
    exports.default = u64;
  }
});

// ../node_modules/@noble/hashes/crypto.js
var require_crypto = __commonJS({
  "../node_modules/@noble/hashes/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  }
});

// ../node_modules/@noble/hashes/utils.js
var require_utils = __commonJS({
  "../node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.byteSwap32 = exports.byteSwapIfBE = exports.byteSwap = exports.isLE = exports.rotl = exports.rotr = exports.createView = exports.u32 = exports.u8 = exports.isBytes = void 0;
    var crypto_1 = require_crypto();
    var _assert_js_1 = require_assert();
    function isBytes(a) {
      return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
    }
    exports.isBytes = isBytes;
    var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    var rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    var rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
    exports.rotl = rotl;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    exports.byteSwap = byteSwap;
    exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => (0, exports.byteSwap)(n);
    function byteSwap32(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = (0, exports.byteSwap)(arr[i]);
      }
    }
    exports.byteSwap32 = byteSwap32;
    var hexes = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      (0, _assert_js_1.bytes)(bytes);
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex;
    var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
    function asciiToBase16(char) {
      if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
      if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
      if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    exports.hexToBytes = hexToBytes;
    var nextTick = () => __async(exports, null, function* () {
    });
    exports.nextTick = nextTick;
    function asyncLoop(iters, tick, cb) {
      return __async(this, null, function* () {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          yield (0, exports.nextTick)();
          ts += diff;
        }
      });
    }
    exports.asyncLoop = asyncLoop;
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    exports.utf8ToBytes = utf8ToBytes;
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      (0, _assert_js_1.bytes)(data);
      return data;
    }
    exports.toBytes = toBytes;
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0, _assert_js_1.bytes)(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    exports.concatBytes = concatBytes;
    var Hash = class {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    };
    exports.Hash = Hash;
    var toStr = {}.toString;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && toStr.call(opts) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    exports.checkOpts = checkOpts;
    function wrapConstructor(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    exports.wrapConstructor = wrapConstructor;
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
    exports.randomBytes = randomBytes;
  }
});

// ../node_modules/@noble/hashes/sha3.js
var require_sha3 = __commonJS({
  "../node_modules/@noble/hashes/sha3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
    var _assert_js_1 = require_assert();
    var _u64_js_1 = require_u64();
    var utils_js_1 = require_utils();
    var SHA3_PI = [];
    var SHA3_ROTL = [];
    var _SHA3_IOTA = [];
    var _0n = BigInt(0);
    var _1n = BigInt(1);
    var _2n = BigInt(2);
    var _7n = BigInt(7);
    var _256n = BigInt(256);
    var _0x71n = BigInt(113);
    for (let round = 0, R = _1n, x2 = 1, y = 0; round < 24; round++) {
      [x2, y] = [y, (2 * x2 + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x2));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    var [SHA3_IOTA_H, SHA3_IOTA_L] = (0, _u64_js_1.split)(_SHA3_IOTA, true);
    var rotlH = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBH)(h, l, s) : (0, _u64_js_1.rotlSH)(h, l, s);
    var rotlL = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBL)(h, l, s) : (0, _u64_js_1.rotlSL)(h, l, s);
    function keccakP(s, rounds = 24) {
      const B = new Uint32Array(5 * 2);
      for (let round = 24 - rounds; round < 24; round++) {
        for (let x2 = 0; x2 < 10; x2++)
          B[x2] = s[x2] ^ s[x2 + 10] ^ s[x2 + 20] ^ s[x2 + 30] ^ s[x2 + 40];
        for (let x2 = 0; x2 < 10; x2 += 2) {
          const idx1 = (x2 + 8) % 10;
          const idx0 = (x2 + 2) % 10;
          const B0 = B[idx0];
          const B1 = B[idx0 + 1];
          const Th = rotlH(B0, B1, 1) ^ B[idx1];
          const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
          for (let y = 0; y < 50; y += 10) {
            s[x2 + y] ^= Th;
            s[x2 + y + 1] ^= Tl;
          }
        }
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
          const shift = SHA3_ROTL[t];
          const Th = rotlH(curH, curL, shift);
          const Tl = rotlL(curH, curL, shift);
          const PI = SHA3_PI[t];
          curH = s[PI];
          curL = s[PI + 1];
          s[PI] = Th;
          s[PI + 1] = Tl;
        }
        for (let y = 0; y < 50; y += 10) {
          for (let x2 = 0; x2 < 10; x2++)
            B[x2] = s[y + x2];
          for (let x2 = 0; x2 < 10; x2++)
            s[y + x2] ^= ~B[(x2 + 2) % 10] & B[(x2 + 4) % 10];
        }
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
      }
      B.fill(0);
    }
    exports.keccakP = keccakP;
    var Keccak = class _Keccak extends utils_js_1.Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        (0, _assert_js_1.number)(outputLen);
        if (0 >= this.blockLen || this.blockLen >= 200)
          throw new Error("Sha3 supports only keccak-f1600 function");
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1.u32)(this.state);
      }
      keccak() {
        if (!utils_js_1.isLE)
          (0, utils_js_1.byteSwap32)(this.state32);
        keccakP(this.state32, this.rounds);
        if (!utils_js_1.isLE)
          (0, utils_js_1.byteSwap32)(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        (0, _assert_js_1.exists)(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        (0, _assert_js_1.exists)(this, false);
        (0, _assert_js_1.bytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        (0, _assert_js_1.number)(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        (0, _assert_js_1.output)(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        this.state.fill(0);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    exports.Keccak = Keccak;
    var gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
    exports.sha3_224 = gen(6, 144, 224 / 8);
    exports.sha3_256 = gen(6, 136, 256 / 8);
    exports.sha3_384 = gen(6, 104, 384 / 8);
    exports.sha3_512 = gen(6, 72, 512 / 8);
    exports.keccak_224 = gen(1, 144, 224 / 8);
    exports.keccak_256 = gen(1, 136, 256 / 8);
    exports.keccak_384 = gen(1, 104, 384 / 8);
    exports.keccak_512 = gen(1, 72, 512 / 8);
    var genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
    exports.shake128 = genShake(31, 168, 128 / 8);
    exports.shake256 = genShake(31, 136, 256 / 8);
  }
});

// ../node_modules/@paralleldrive/cuid2/src/index.js
var require_src = __commonJS({
  "../node_modules/@paralleldrive/cuid2/src/index.js"(exports, module) {
    var { sha3_512: sha3 } = require_sha3();
    var defaultLength = 24;
    var bigLength = 32;
    var createEntropy = (length = 4, random = Math.random) => {
      let entropy = "";
      while (entropy.length < length) {
        entropy = entropy + Math.floor(random() * 36).toString(36);
      }
      return entropy;
    };
    function bufToBigInt(buf) {
      let bits = 8n;
      let value = 0n;
      for (const i of buf.values()) {
        const bi = BigInt(i);
        value = (value << bits) + bi;
      }
      return value;
    }
    var hash = (input = "") => {
      return bufToBigInt(sha3(input)).toString(36).slice(1);
    };
    var alphabet = Array.from(
      { length: 26 },
      (x2, i) => String.fromCharCode(i + 97)
    );
    var randomLetter = (random) => alphabet[Math.floor(random() * alphabet.length)];
    var createFingerprint = ({
      globalObj = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {},
      random = Math.random
    } = {}) => {
      const globals = Object.keys(globalObj).toString();
      const sourceString = globals.length ? globals + createEntropy(bigLength, random) : createEntropy(bigLength, random);
      return hash(sourceString).substring(0, bigLength);
    };
    var createCounter = (count) => () => {
      return count++;
    };
    var initialCountMax = 476782367;
    var init = ({
      // Fallback if the user does not pass in a CSPRNG. This should be OK
      // because we don't rely solely on the random number generator for entropy.
      // We also use the host fingerprint, current time, and a session counter.
      random = Math.random,
      counter = createCounter(Math.floor(random() * initialCountMax)),
      length = defaultLength,
      fingerprint = createFingerprint({ random })
    } = {}) => {
      return function cuid2() {
        const firstLetter = randomLetter(random);
        const time = Date.now().toString(36);
        const count = counter().toString(36);
        const salt = createEntropy(length, random);
        const hashInput = `${time + salt + count + fingerprint}`;
        return `${firstLetter + hash(hashInput).substring(1, length)}`;
      };
    };
    var createId2 = init();
    var isCuid = (id, { minLength = 2, maxLength = bigLength } = {}) => {
      const length = id.length;
      const regex = /^[0-9a-z]+$/;
      try {
        if (typeof id === "string" && length >= minLength && length <= maxLength && regex.test(id))
          return true;
      } finally {
      }
      return false;
    };
    module.exports.getConstants = () => ({ defaultLength, bigLength });
    module.exports.init = init;
    module.exports.createId = createId2;
    module.exports.bufToBigInt = bufToBigInt;
    module.exports.createCounter = createCounter;
    module.exports.createFingerprint = createFingerprint;
    module.exports.isCuid = isCuid;
  }
});

// ../node_modules/@paralleldrive/cuid2/index.js
var require_cuid2 = __commonJS({
  "../node_modules/@paralleldrive/cuid2/index.js"(exports, module) {
    var { createId: createId2, init, getConstants, isCuid } = require_src();
    module.exports.createId = createId2;
    module.exports.init = init;
    module.exports.getConstants = getConstants;
    module.exports.isCuid = isCuid;
  }
});

// ../node_modules/remult/esm/src/CompoundIdField.js
var CompoundIdField = class {
  fields;
  constructor(...columns) {
    this.fields = columns;
  }
  apiUpdateAllowed(item) {
    throw new Error("Method not implemented.");
  }
  displayValue(item) {
    throw new Error("Method not implemented.");
  }
  includedInApi(item) {
    throw new Error("Method not implemented.");
  }
  toInput(value, inputType) {
    throw new Error("Method not implemented.");
  }
  fromInput(inputValue, inputType) {
    throw new Error("Method not implemented.");
  }
  getDbName() {
    return Promise.resolve("");
  }
  getId(instance) {
    let get = (field) => {
      return instance[field.key];
    };
    if (typeof instance === "function") {
      get = instance;
    }
    let r = "";
    this.fields.forEach((c) => {
      if (r.length > 0)
        r += ",";
      r += c.valueConverter.toJson(get(c));
    });
    return r;
  }
  options;
  get valueConverter() {
    throw new Error("cant get value converter of compound id");
  }
  target;
  readonly;
  allowNull;
  dbReadOnly;
  isServerExpression;
  key;
  caption;
  inputType;
  dbName;
  valueType;
  isEqualTo(value) {
    let result = {};
    let val = value.toString();
    let id = val.split(",");
    this.fields.forEach((c, i) => {
      result[c.key] = c.valueConverter.fromJson(id[i]);
    });
    return result;
  }
};

// ../node_modules/remult/esm/src/remult3/getEntityRef.js
function getEntityRef(entity, throwException = true) {
  let x2 = entity[entityMember];
  if (!x2 && throwException)
    throw new Error("item " + (entity.constructor?.name || entity) + " was not initialized using a context");
  return x2;
}
var entityMember = Symbol.for("entityMember");
var entityInfo = Symbol.for("entityInfo");
var entityInfo_key = Symbol.for("entityInfo_key");
function getEntitySettings(entity, throwError = true) {
  if (entity === void 0)
    if (throwError) {
      throw new Error("Undefined is not an entity :)");
    } else
      return void 0;
  let info = entity[entityInfo];
  if (!info && throwError)
    throw new Error(entity.prototype.constructor.name + " is not a known entity, did you forget to set @Entity() or did you forget to add the '@' before the call to Entity?");
  return info;
}
function getEntityKey(entity) {
  return entity[entityInfo_key];
}

// ../node_modules/remult/esm/src/remult3/relationInfoMember.js
function relationInfoMemberInOptions(toEntityType, type) {
  return {
    [relationInfoMember]: {
      toType: toEntityType,
      type
    }
  };
}
var relationInfoMember = Symbol.for("relationInfo");
function getRelationInfo(options) {
  return options?.[relationInfoMember];
}
var fieldRelationInfo = Symbol.for("fieldRelationInfo");
function getRelationFieldInfo(field) {
  return field[fieldRelationInfo];
}
function verifyFieldRelationInfo(repo2, remult2, dp) {
  for (const field of repo2.fields.toArray()) {
    const r = getRelationInfo(field.options);
    if (r) {
      if (!field[fieldRelationInfo]) {
        const toEntity = r.toType();
        const toRepo = remult2.repo(toEntity, dp);
        const options = field.options;
        field[fieldRelationInfo] = {
          type: r.type,
          toEntity,
          options,
          toRepo,
          getFields: () => {
            let relationField = options.field;
            let relFields = {
              fields: options.fields,
              compoundIdField: void 0
            };
            function buildError(what) {
              return Error(`Error for relation: "${field.key}" to "${toRepo.metadata.key}": ` + what);
            }
            let hasFields = () => relationField || relFields.fields;
            if (r.type === "toMany" && !hasFields()) {
              for (const fieldInOtherRepo of toRepo.fields.toArray()) {
                if (!hasFields()) {
                  const reverseRel = getRelationFieldInfo(fieldInOtherRepo);
                  const relOp = fieldInOtherRepo.options;
                  if (reverseRel) {
                    if (reverseRel.toEntity === repo2.metadata.entityType) {
                      if (reverseRel.type === "reference") {
                        relationField = fieldInOtherRepo.key;
                      } else if (reverseRel.type === "toOne") {
                        if (relOp.field) {
                          relationField = relOp.field;
                        } else if (relOp.fields) {
                          let fields = {};
                          for (const key in relOp.fields) {
                            if (Object.prototype.hasOwnProperty.call(relOp.fields, key)) {
                              const keyInMyTable = relOp.fields[key];
                              fields[keyInMyTable] = key;
                            }
                          }
                          relFields.fields = fields;
                        }
                      }
                    }
                  }
                }
              }
              if (!hasFields())
                throw buildError(`No matching field found on target. Please specify field/fields`);
            }
            function requireField(field2, meta) {
              const result = meta.fields.find(field2);
              if (!result)
                throw buildError(`Field "${field2}" was not found in "${meta.key}".`);
              return result;
            }
            if (r.type === "reference") {
              relationField = field.key;
            }
            if (relationField) {
              if (r.type === "toOne" || r.type === "reference") {
                if (toRepo.metadata.idMetadata.field instanceof CompoundIdField) {
                  relFields.compoundIdField = relationField;
                } else
                  relFields.fields = {
                    [toRepo.metadata.idMetadata.field.key]: relationField
                  };
              } else {
                if (repo2.metadata.idMetadata.field instanceof CompoundIdField) {
                  relFields.compoundIdField = relationField;
                } else
                  relFields.fields = {
                    [relationField]: repo2.metadata.idMetadata.field.key
                  };
              }
            }
            for (const key in relFields.fields) {
              if (Object.prototype.hasOwnProperty.call(relFields.fields, key)) {
                requireField(key, toRepo.metadata);
                requireField(relFields.fields[key], repo2.metadata);
              }
            }
            return relFields;
          }
        };
      }
    }
  }
}

// ../node_modules/remult/esm/src/filter/filter-interfaces.js
var Filter = class _Filter {
  apply;
  //@internal
  static throwErrorIfFilterIsEmpty(where, methodName) {
    if (_Filter.isFilterEmpty(where)) {
      throw {
        message: `${methodName}: requires a filter to protect against accidental delete/update of all rows`,
        httpStatusCode: 400
      };
    }
  }
  //@internal
  static isFilterEmpty(where) {
    if (where.$and) {
      for (const a of where.$and) {
        if (!_Filter.isFilterEmpty(a)) {
          return false;
        }
      }
    }
    if (where.$or) {
      for (const a of where.$or) {
        if (_Filter.isFilterEmpty(a)) {
          return true;
        }
      }
      return false;
    }
    if (Object.keys(where).filter((x2) => !["$or", "$and"].includes(x2)).length == 0) {
      return true;
    }
    return false;
  }
  /**
   * Retrieves precise values for each property in a filter for an entity.
   * @template entityType The type of the entity being filtered.
   * @param metadata The metadata of the entity being filtered.
   * @param filter The filter to analyze.
   * @returns A promise that resolves to a FilterPreciseValues object containing the precise values for each property.
   * @example
   * const preciseValues = await Filter.getPreciseValues(meta, {
   *   status: { $ne: 'active' },
   *   $or: [
   *     { customerId: ["1", "2"] },
   *     { customerId: "3" }
   *   ]
   * });
   * console.log(preciseValues);
   * // Output:
   * // {
   * //   "customerId": ["1", "2", "3"], // Precise values inferred from the filter
   * //   "status": undefined,           // Cannot infer precise values for 'status'
   * // }
  
   */
  static getPreciseValues(metadata, filter) {
    return __async(this, null, function* () {
      const result = new preciseValuesCollector();
      yield _Filter.fromEntityFilter(metadata, filter).__applyToConsumer(result);
      return result.preciseValues;
    });
  }
  /**
   * Retrieves precise values for each property in a filter for an entity.
   * @template entityType The type of the entity being filtered.
   * @param metadata The metadata of the entity being filtered.
   * @param filter The filter to analyze.
   * @returns A promise that resolves to a FilterPreciseValues object containing the precise values for each property.
   * @example
   * const preciseValues = await where.getPreciseValues();
   * console.log(preciseValues);
   * // Output:
   * // {
   * //   "customerId": ["1", "2", "3"], // Precise values inferred from the filter
   * //   "status": undefined,           // Cannot infer precise values for 'status'
   * // }
  
   */
  getPreciseValues() {
    return __async(this, null, function* () {
      const result = new preciseValuesCollector();
      yield this.__applyToConsumer(result);
      return result.preciseValues;
    });
  }
  static createCustom(translator, key = "") {
    let rawFilterInfo = { key, rawFilterTranslator: translator };
    return Object.assign((x2) => {
      let z = {};
      if (x2 == void 0)
        x2 = {};
      if (!rawFilterInfo.key)
        throw "Usage of custom filter before a key was assigned to it";
      return {
        [customUrlToken + rawFilterInfo.key]: x2
      };
    }, { rawFilterInfo });
  }
  /**
   * Translates an `EntityFilter` to a plain JSON object that can be stored or transported.
   *
   * @template T The entity type for the filter.
   * @param {EntityMetadata<T>} entityDefs The metadata of the entity associated with the filter.
   * @param {EntityFilter<T>} where The `EntityFilter` to be translated.
   * @returns {any} A plain JSON object representing the `EntityFilter`.
   *
   * @example
   * // Assuming `Task` is an entity class
   * const jsonFilter = Filter.entityFilterToJson(Task, { completed: true });
   * // `jsonFilter` can now be stored or transported as JSON
   */
  static entityFilterToJson(entityDefs, where) {
    return _Filter.fromEntityFilter(entityDefs, where).toJson();
  }
  /**
   * Translates a plain JSON object back into an `EntityFilter`.
   *
   * @template T The entity type for the filter.
   * @param {EntityMetadata<T>} entityDefs The metadata of the entity associated with the filter.
   * @param {any} packed The plain JSON object representing the `EntityFilter`.
   * @returns {EntityFilter<T>} The reconstructed `EntityFilter`.
   *
   * @example
   * // Assuming `Task` is an entity class and `jsonFilter` is a JSON object representing an EntityFilter
   * const taskFilter = Filter.entityFilterFromJson(Task, jsonFilter);
   * // Using the reconstructed `EntityFilter` in a query
   * const tasks = await remult.repo(Task).find({ where: taskFilter });
   * for (const task of tasks) {
   *   // Do something for each task based on the filter
   * }
   */
  static entityFilterFromJson(entityDefs, packed) {
    return buildFilterFromRequestParameters(entityDefs, {
      get: (key) => packed[key]
    });
  }
  /**
   * Converts an `EntityFilter` to a `Filter` that can be used by the `DataProvider`. This method is
   * mainly used internally.
   *
   * @template T The entity type for the filter.
   * @param {EntityMetadata<T>} entity The metadata of the entity associated with the filter.
   * @param {EntityFilter<T>} whereItem The `EntityFilter` to be converted.
   * @returns {Filter} A `Filter` instance that can be used by the `DataProvider`.
   *
   * @example
   * // Assuming `Task` is an entity class and `taskFilter` is an EntityFilter
   * const filter = Filter.fromEntityFilter(Task, taskFilter);
   * // `filter` can now be used with the DataProvider
   */
  static fromEntityFilter(entity, whereItem) {
    let result = [];
    for (const key in whereItem) {
      if (Object.prototype.hasOwnProperty.call(whereItem, key)) {
        let fieldToFilter = whereItem[key];
        {
          if (key == "$or") {
            result.push(new OrFilter(...fieldToFilter.map((x2) => _Filter.fromEntityFilter(entity, x2))));
          } else if (key == "$and") {
            result.push(new AndFilter(...fieldToFilter.map((x2) => _Filter.fromEntityFilter(entity, x2))));
          } else if (key.startsWith(customUrlToken)) {
            result.push(new _Filter((x2) => {
              x2.custom(key.substring(customUrlToken.length), fieldToFilter);
            }));
          } else if (key == customDatabaseFilterToken) {
            result.push(new _Filter((x2) => x2.databaseCustom(fieldToFilter)));
          } else {
            const field = entity.fields[key];
            const rel = getRelationFieldInfo(field);
            const op = field.options;
            let fh = rel?.type === "toOne" ? op.fields ? new manyToOneFilterHelper(field, entity.fields, op) : new toOneFilterHelper(entity.fields[op.field]) : new filterHelper(field);
            let found = false;
            if (fieldToFilter !== void 0 && fieldToFilter != null) {
              if (fieldToFilter.$id !== void 0)
                fieldToFilter = fieldToFilter.$id;
              for (const key2 in fieldToFilter) {
                if (Object.prototype.hasOwnProperty.call(fieldToFilter, key2)) {
                  const element = fieldToFilter[key2];
                  switch (key2) {
                    case "$gte":
                    case ">=":
                      result.push(fh.isGreaterOrEqualTo(element));
                      found = true;
                      break;
                    case "$gt":
                    case ">":
                      result.push(fh.isGreaterThan(element));
                      found = true;
                      break;
                    case "$lte":
                    case "<=":
                      result.push(fh.isLessOrEqualTo(element));
                      found = true;
                      break;
                    case "$lt":
                    case "<":
                      result.push(fh.isLessThan(element));
                      found = true;
                      break;
                    case "$ne":
                    case "!=":
                    case "$nin":
                      found = true;
                      if (Array.isArray(element)) {
                        result.push(fh.isNotIn(element));
                      } else
                        result.push(fh.isDifferentFrom(element));
                      break;
                    case "$in":
                      found = true;
                      result.push(fh.isIn(element));
                      break;
                    case "$contains":
                      found = true;
                      result.push(fh.contains(element));
                      break;
                    case "$notContains":
                      found = true;
                      result.push(fh.notContains(element));
                      break;
                  }
                }
              }
              if (Array.isArray(fieldToFilter)) {
                found = true;
                result.push(fh.isIn(fieldToFilter));
              }
            }
            if (!found && fieldToFilter !== void 0) {
              result.push(fh.isEqualTo(fieldToFilter));
            }
          }
        }
      }
    }
    return new AndFilter(...result);
  }
  constructor(apply) {
    this.apply = apply;
  }
  __applyToConsumer(add) {
    this.apply(add);
  }
  /**
   * Resolves an entity filter.
   *
   * This method takes a filter which can be either an instance of `EntityFilter`
   * or a function that returns an instance of `EntityFilter` or a promise that
   * resolves to an instance of `EntityFilter`. It then resolves the filter if it
   * is a function and returns the resulting `EntityFilter`.
   *
   * @template entityType The type of the entity that the filter applies to.
   * @param {EntityFilter<entityType> | (() => EntityFilter<entityType> | Promise<EntityFilter<entityType>>)} filter The filter to resolve.
   * @returns {Promise<EntityFilter<entityType>>} The resolved entity filter.
   */
  static resolve(filter) {
    return __async(this, null, function* () {
      if (typeof filter === "function")
        return yield filter();
      return filter;
    });
  }
  toJson() {
    let r = new FilterSerializer();
    this.__applyToConsumer(r);
    return r.result;
  }
  //@internal
  static translateCustomWhere(r, entity, remult2) {
    return __async(this, null, function* () {
      let f2 = new customTranslator((filterKey, custom) => __async(this, null, function* () {
        let r2 = [];
        for (const key in entity.entityType) {
          const element = entity.entityType[key];
          if (element && element.rawFilterInfo && element.rawFilterInfo.rawFilterTranslator) {
            if (element.rawFilterInfo.key == filterKey) {
              r2.push(yield _Filter.fromEntityFilter(entity, yield element.rawFilterInfo.rawFilterTranslator(custom, remult2)));
            }
          }
        }
        return r2;
      }));
      r.__applyToConsumer(f2);
      yield f2.resolve();
      r = new _Filter((x2) => f2.applyTo(x2));
      return r;
    });
  }
};
var filterHelper = class {
  metadata;
  constructor(metadata) {
    this.metadata = metadata;
  }
  processVal(val) {
    let ei = getEntitySettings(this.metadata.valueType, false);
    if (ei) {
      if (val === void 0 || val === null) {
        if (val === null && !this.metadata.allowNull) {
          const rel = getRelationFieldInfo(this.metadata);
          if (rel?.type === "reference")
            if (rel.toRepo.metadata.idMetadata.field.options.valueType === Number)
              return 0;
            else
              return "";
        }
        return null;
      }
      if (typeof val === "string" || typeof val === "number")
        return val;
      return getEntityRef(val).getId();
    }
    return val;
  }
  contains(val) {
    return new Filter((add) => add.containsCaseInsensitive(this.metadata, val));
  }
  notContains(val) {
    return new Filter((add) => add.notContainsCaseInsensitive(this.metadata, val));
  }
  isLessThan(val) {
    val = this.processVal(val);
    return new Filter((add) => add.isLessThan(this.metadata, val));
  }
  isGreaterOrEqualTo(val) {
    val = this.processVal(val);
    return new Filter((add) => add.isGreaterOrEqualTo(this.metadata, val));
  }
  isNotIn(values) {
    return new Filter((add) => {
      for (const v of values) {
        add.isDifferentFrom(this.metadata, this.processVal(v));
      }
    });
  }
  isDifferentFrom(val) {
    val = this.processVal(val);
    if ((val === null || val === void 0) && this.metadata.allowNull)
      return new Filter((add) => add.isNotNull(this.metadata));
    return new Filter((add) => add.isDifferentFrom(this.metadata, val));
  }
  isLessOrEqualTo(val) {
    val = this.processVal(val);
    return new Filter((add) => add.isLessOrEqualTo(this.metadata, val));
  }
  isGreaterThan(val) {
    val = this.processVal(val);
    return new Filter((add) => add.isGreaterThan(this.metadata, val));
  }
  isEqualTo(val) {
    val = this.processVal(val);
    if ((val === null || val === void 0) && this.metadata.allowNull)
      return new Filter((add) => add.isNull(this.metadata));
    return new Filter((add) => add.isEqualTo(this.metadata, val));
  }
  isIn(val) {
    val = val.map((x2) => this.processVal(x2));
    if (val?.length == 1 && val[0] != void 0 && val[0] !== null)
      return new Filter((add) => add.isEqualTo(this.metadata, val[0]));
    return new Filter((add) => add.isIn(this.metadata, val));
  }
};
var toOneFilterHelper = class extends filterHelper {
  processVal(val) {
    if (!val)
      return null;
    if (typeof val === "string" || typeof val === "number")
      return val;
    return getEntityRef(val).getId();
  }
};
var manyToOneFilterHelper = class {
  metadata;
  fields;
  relationOptions;
  constructor(metadata, fields, relationOptions) {
    this.metadata = metadata;
    this.fields = fields;
    this.relationOptions = relationOptions;
  }
  processVal(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  contains(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  notContains(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  isLessThan(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  isGreaterOrEqualTo(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  isNotIn(values) {
    return new Filter((add) => {
      values.forEach((v) => this.isDifferentFrom(v).__applyToConsumer(add));
    });
  }
  isDifferentFrom(val) {
    return new Filter((add) => {
      const or = [];
      for (const key in this.relationOptions.fields) {
        if (Object.prototype.hasOwnProperty.call(this.relationOptions.fields, key)) {
          const keyInMyEntity = this.relationOptions.fields[key];
          or.push(new Filter((add2) => new filterHelper(this.fields.find(keyInMyEntity)).isDifferentFrom(val[key]).__applyToConsumer(add2)));
        }
      }
      add.or(or);
    });
  }
  isLessOrEqualTo(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  isGreaterThan(val) {
    throw new Error("Invalid for Many To One Relation Field");
  }
  isEqualTo(val) {
    return new Filter((add) => {
      for (const key in this.relationOptions.fields) {
        if (Object.prototype.hasOwnProperty.call(this.relationOptions.fields, key)) {
          const keyInMyEntity = this.relationOptions.fields[key];
          new filterHelper(this.fields.find(keyInMyEntity)).isEqualTo(val[key]).__applyToConsumer(add);
        }
      }
    });
  }
  isIn(val) {
    return new Filter((add) => {
      add.or(val.map((v) => this.isEqualTo(v)));
    });
  }
};
var AndFilter = class extends Filter {
  filters;
  constructor(...filters) {
    super((add) => {
      for (const iterator of this.filters) {
        if (iterator)
          iterator.__applyToConsumer(add);
      }
    });
    this.filters = filters;
  }
  add(filter) {
    this.filters.push(filter);
  }
};
var OrFilter = class extends Filter {
  filters;
  constructor(...filters) {
    super((add) => {
      let f2 = this.filters.filter((x2) => x2 !== void 0);
      if (f2.length > 1) {
        add.or(f2);
      } else if (f2.length == 1)
        f2[0].__applyToConsumer(add);
    });
    this.filters = filters;
  }
};
var customUrlToken = "$custom$";
var customDatabaseFilterToken = "$db$";
var customArrayToken = "$an array";
var FilterSerializer = class _FilterSerializer {
  result = {};
  constructor() {
  }
  databaseCustom(databaseCustom) {
    throw new Error("database custom is not allowed with api calls.");
  }
  custom(key, customItem) {
    if (Array.isArray(customItem))
      customItem = { [customArrayToken]: customItem };
    this.add(customUrlToken + key, customItem);
  }
  hasUndefined = false;
  add(key, val) {
    if (val === void 0)
      this.hasUndefined = true;
    let r = this.result;
    if (!r[key]) {
      r[key] = val;
      return;
    }
    let v = r[key];
    if (v instanceof Array) {
      v.push(val);
    } else
      v = [v, val];
    r[key] = v;
  }
  or(orElements) {
    this.add("OR", orElements.map((x2) => {
      let f2 = new _FilterSerializer();
      x2.__applyToConsumer(f2);
      return f2.result;
    }));
  }
  isNull(col) {
    this.add(col.key + ".null", true);
  }
  isNotNull(col) {
    this.add(col.key + ".null", false);
  }
  isIn(col, val) {
    this.add(col.key + ".in", val.map((x2) => col.valueConverter.toJson(x2)));
  }
  isEqualTo(col, val) {
    this.add(col.key, col.valueConverter.toJson(val));
  }
  isDifferentFrom(col, val) {
    this.add(col.key + ".ne", col.valueConverter.toJson(val));
  }
  isGreaterOrEqualTo(col, val) {
    this.add(col.key + ".gte", col.valueConverter.toJson(val));
  }
  isGreaterThan(col, val) {
    this.add(col.key + ".gt", col.valueConverter.toJson(val));
  }
  isLessOrEqualTo(col, val) {
    this.add(col.key + ".lte", col.valueConverter.toJson(val));
  }
  isLessThan(col, val) {
    this.add(col.key + ".lt", col.valueConverter.toJson(val));
  }
  containsCaseInsensitive(col, val) {
    this.add(col.key + ".contains", val);
  }
  notContainsCaseInsensitive(col, val) {
    this.add(col.key + ".notContains", val);
  }
};
function buildFilterFromRequestParameters(entity, filterInfo) {
  let where = {};
  function addAnd(what) {
    if (!where.$and) {
      where.$and = [];
    }
    where.$and.push(what);
  }
  function addToFilterObject(key, val2) {
    if (where[key] === void 0)
      where[key] = val2;
    else {
      addAnd({ [key]: val2 });
    }
  }
  ;
  [...entity.fields].forEach((col) => {
    function addFilter(operation, theFilter, jsonArray = false, asString = false) {
      let val2 = filterInfo.get(col.key + operation);
      if (val2 !== void 0) {
        let addFilter2 = (val3) => {
          let theVal = val3;
          if (jsonArray) {
            let arr;
            if (typeof val3 === "string")
              arr = JSON.parse(val3);
            else
              arr = val3;
            theVal = arr.map((x2) => asString ? x2 : col.valueConverter.fromJson(x2));
          } else {
            theVal = asString ? theVal : col.valueConverter.fromJson(theVal);
          }
          let f2 = theFilter(theVal);
          if (f2 !== void 0) {
            addToFilterObject(col.key, f2);
          }
        };
        if (!jsonArray && val2 instanceof Array) {
          val2.forEach((v) => {
            addFilter2(v);
          });
        } else {
          if (jsonArray) {
            if (typeof val2 === "string")
              val2 = JSON.parse(val2);
          }
          const array = separateArrayFromInnerArray(val2);
          for (const x2 of array) {
            addFilter2(x2);
          }
        }
      }
    }
    addFilter("", (val2) => val2);
    addFilter(".gt", (val2) => ({ $gt: val2 }));
    addFilter(".gte", (val2) => ({ $gte: val2 }));
    addFilter(".lt", (val2) => ({ $lt: val2 }));
    addFilter(".lte", (val2) => ({ $lte: val2 }));
    addFilter(".ne", (val2) => ({ $ne: val2 }));
    addFilter(".in", (val2) => val2, true);
    var nullFilter = filterInfo.get(col.key + ".null");
    if (nullFilter) {
      nullFilter = nullFilter.toString().trim().toLowerCase();
      switch (nullFilter) {
        case "y":
        case "true":
        case "yes":
          addToFilterObject(col.key, null);
          break;
        default:
          addToFilterObject(col.key, { $ne: null });
          break;
      }
    }
    addFilter(".contains", (val2) => ({ $contains: val2 }), false, true);
    addFilter(".notContains", (val2) => ({ $notContains: val2 }), false, true);
  });
  let val = filterInfo.get("OR");
  if (val) {
    const array = separateArrayFromInnerArray(val);
    const or = array.map((v) => ({
      $or: v.map((x2) => buildFilterFromRequestParameters(entity, {
        get: (key) => x2[key]
      }))
    }));
    if (or.length == 1) {
      if (!where.$or) {
        where.$or = or[0].$or;
      } else {
        where.$or.push(or[0].$or);
      }
    } else {
      addAnd({
        $and: or
      });
    }
  }
  for (const key in entity.entityType) {
    const element = entity.entityType[key];
    if (element && element.rawFilterInfo && element.rawFilterInfo.rawFilterTranslator) {
      let custom = filterInfo.get(customUrlToken + key);
      if (custom !== void 0) {
        const addItem = (item) => {
          if (item[customArrayToken] != void 0)
            item = item[customArrayToken];
          addToFilterObject(customUrlToken + key, item);
        };
        if (Array.isArray(custom)) {
          custom.forEach((item) => addItem(item));
        } else
          addItem(custom);
      }
    }
  }
  return where;
  function separateArrayFromInnerArray(val2) {
    if (!Array.isArray(val2))
      return [val2];
    const nonArray = [], array = [];
    for (const v of val2) {
      if (Array.isArray(v)) {
        array.push(v);
      } else
        nonArray.push(v);
    }
    array.push(nonArray);
    return array;
  }
}
var customTranslator = class _customTranslator {
  translateCustom;
  applyTo(x2) {
    this.commands.forEach((y) => y(x2));
  }
  constructor(translateCustom) {
    this.translateCustom = translateCustom;
  }
  commands = [];
  promises = [];
  or(orElements) {
    let newOrElements;
    this.promises.push(Promise.all(orElements.map((element) => __async(this, null, function* () {
      let c = new _customTranslator(this.translateCustom);
      element.__applyToConsumer(c);
      yield c.resolve();
      return new Filter((x2) => c.applyTo(x2));
    }))).then((x2) => {
      newOrElements = x2;
    }));
    this.commands.push((x2) => x2.or(newOrElements));
  }
  isEqualTo(col, val) {
    this.commands.push((x2) => x2.isEqualTo(col, val));
  }
  isDifferentFrom(col, val) {
    this.commands.push((x2) => x2.isDifferentFrom(col, val));
  }
  isNull(col) {
    this.commands.push((x2) => x2.isNull(col));
  }
  isNotNull(col) {
    this.commands.push((x2) => x2.isNotNull(col));
  }
  isGreaterOrEqualTo(col, val) {
    this.commands.push((x2) => x2.isGreaterOrEqualTo(col, val));
  }
  isGreaterThan(col, val) {
    this.commands.push((x2) => x2.isGreaterThan(col, val));
  }
  isLessOrEqualTo(col, val) {
    this.commands.push((x2) => x2.isLessOrEqualTo(col, val));
  }
  isLessThan(col, val) {
    this.commands.push((x2) => x2.isLessThan(col, val));
  }
  containsCaseInsensitive(col, val) {
    this.commands.push((x2) => x2.containsCaseInsensitive(col, val));
  }
  notContainsCaseInsensitive(col, val) {
    this.commands.push((x2) => x2.notContainsCaseInsensitive(col, val));
  }
  isIn(col, val) {
    this.commands.push((x2) => x2.isIn(col, val));
  }
  custom(key, customItem) {
    this.promises.push((() => __async(this, null, function* () {
      let r = yield this.translateCustom(key, customItem);
      if (r)
        if (Array.isArray(r))
          r.forEach((x2) => x2.__applyToConsumer(this));
        else
          r.__applyToConsumer(this);
    }))());
  }
  databaseCustom(custom) {
    this.commands.push((x2) => x2.databaseCustom(custom));
  }
  resolve() {
    return __async(this, null, function* () {
      while (this.promises.length > 0) {
        let p = this.promises;
        this.promises = [];
        yield Promise.all(p);
      }
    });
  }
};
var preciseValuesCollector = class _preciseValuesCollector {
  rawValues = {};
  preciseValues = new Proxy(this.rawValues, {
    get: (target, prop) => {
      if (prop in target) {
        let result = target[prop];
        if (result.bad)
          return void 0;
        if (result.values.length > 0) {
          const relInfo = getRelationFieldInfo(result.field);
          if (relInfo) {
            if (relInfo.type === "reference") {
              return result.values.map((x2) => {
                return relInfo.toRepo.metadata.idMetadata.getIdFilter(x2);
              });
            } else
              throw new Error("Only relations toOne without field are supported.");
          }
          return result.values;
        }
      }
      return void 0;
    }
  });
  ok(col, ...val) {
    let x2 = this.rawValues[col.key];
    if (!x2) {
      this.rawValues[col.key] = {
        field: col,
        bad: false,
        values: [...val]
      };
    } else {
      x2.values.push(...val.filter((y) => !x2.values.includes(y)));
    }
  }
  notOk(col) {
    let x2 = this.rawValues[col.key];
    if (!x2) {
      this.rawValues[col.key] = {
        field: col,
        bad: true,
        values: []
      };
    } else {
      x2.bad = true;
    }
  }
  or(orElements) {
    const result = orElements.map((or) => {
      let x2 = new _preciseValuesCollector();
      or.__applyToConsumer(x2);
      return x2;
    });
    for (const or of result) {
      for (const key in or.rawValues) {
        if (Object.prototype.hasOwnProperty.call(or.rawValues, key)) {
          const element = or.rawValues[key];
          if (element) {
            if (element.bad)
              this.notOk(element.field);
            else {
              this.ok(element.field, ...element.values);
            }
          }
        }
      }
    }
    for (const key in this.rawValues) {
      if (Object.prototype.hasOwnProperty.call(this.rawValues, key)) {
        for (const r of result) {
          const element = r.rawValues[key];
          if (!element)
            this.notOk(this.rawValues[key].field);
        }
      }
    }
  }
  isEqualTo(col, val) {
    this.ok(col, val);
  }
  isDifferentFrom(col, val) {
    this.notOk(col);
  }
  isNull(col) {
    this.ok(col, null);
  }
  isNotNull(col) {
    this.notOk(col);
  }
  isGreaterOrEqualTo(col, val) {
    this.notOk(col);
  }
  isGreaterThan(col, val) {
    this.notOk(col);
  }
  isLessOrEqualTo(col, val) {
    this.notOk(col);
  }
  isLessThan(col, val) {
    this.notOk(col);
  }
  containsCaseInsensitive(col, val) {
    this.notOk(col);
  }
  notContainsCaseInsensitive(col, val) {
    this.notOk(col);
  }
  isIn(col, val) {
    this.ok(col, ...val);
  }
  custom(key, customItem) {
  }
  databaseCustom(databaseCustom) {
  }
};

// ../node_modules/remult/esm/src/remult-static.js
var remultStaticKey = Symbol.for("remult-static1");
var x = {
  defaultRemultFactory: void 0,
  remultFactory: void 0,
  defaultRemult: void 0,
  asyncContext: void 0,
  columnsOfType: /* @__PURE__ */ new Map(),
  allEntities: [],
  classHelpers: /* @__PURE__ */ new Map(),
  actionInfo: {
    allActions: [],
    runningOnServer: false,
    runActionWithoutBlockingUI: (what) => {
      return what();
    },
    startBusyWithProgress: () => ({
      progress: (percent) => {
      },
      close: () => {
      }
    })
  },
  captionTransformer: void 0,
  defaultDataProvider: () => void 0
};
if (typeof process !== "undefined" && process.env["IGNORE_GLOBAL_REMULT_IN_TESTS"] || typeof globalThis[remultStaticKey] === "undefined") {
  globalThis[remultStaticKey] = x;
  x.remultFactory = () => defaultFactory();
} else {
  x = globalThis[remultStaticKey];
}
var remultStatic = x;
function defaultFactory() {
  if (!remultStatic.defaultRemult) {
    remultStatic.defaultRemult = remultStatic.defaultRemultFactory();
  }
  return remultStatic.defaultRemult;
}
function resetFactory() {
  remultStatic.remultFactory = () => defaultFactory();
}

// ../node_modules/remult/esm/src/remult3/repository-internals.js
function getRepositoryInternals(repo2) {
  const x2 = repo2;
  if (typeof x2[getInternalKey] === "function")
    return x2[getInternalKey]();
  throw Error("Error getting repository internal from " + repo2);
}
var getInternalKey = Symbol.for("getInternal");

// ../node_modules/remult/esm/src/remult-proxy.js
var RemultProxy = class {
  /* @internal*/
  iAmRemultProxy = true;
  /* @internal*/
  get liveQuerySubscriber() {
    return remultStatic.remultFactory().liveQuerySubscriber;
  }
  /* @internal*/
  set liveQuerySubscriber(val) {
    remultStatic.remultFactory().liveQuerySubscriber = val;
  }
  /* @internal*/
  get liveQueryStorage() {
    return remultStatic.remultFactory().liveQueryStorage;
  }
  /* @internal*/
  set liveQueryStorage(val) {
    remultStatic.remultFactory().liveQueryStorage = val;
  }
  /* @internal*/
  get liveQueryPublisher() {
    return remultStatic.remultFactory().liveQueryPublisher;
  }
  /* @internal*/
  set liveQueryPublisher(val) {
    remultStatic.remultFactory().liveQueryPublisher = val;
  }
  call(backendMethod, self2, ...args) {
    return remultStatic.remultFactory().call(backendMethod, self2, ...args);
  }
  get context() {
    return remultStatic.remultFactory().context;
  }
  get dataProvider() {
    return remultStatic.remultFactory().dataProvider;
  }
  set dataProvider(provider) {
    remultStatic.remultFactory().dataProvider = provider;
  }
  /*@internal*/
  get repCache() {
    return remultStatic.remultFactory().repCache;
  }
  authenticated() {
    return remultStatic.remultFactory().authenticated();
  }
  isAllowed(roles) {
    return remultStatic.remultFactory().isAllowed(roles);
  }
  isAllowedForInstance(instance, allowed) {
    return remultStatic.remultFactory().isAllowedForInstance(instance, allowed);
  }
  clearAllCache() {
    return remultStatic.remultFactory().clearAllCache();
  }
  repoCache = /* @__PURE__ */ new Map();
  //@ts-ignore
  repo = (...args) => {
    let self2 = remultStatic;
    let entityCache = this.repoCache.get(args[0]);
    if (!entityCache) {
      this.repoCache.set(args[0], entityCache = /* @__PURE__ */ new Map());
    }
    let result = entityCache.get(args[1]);
    if (result)
      return result;
    result = {
      get fields() {
        return remultStatic.remultFactory().repo(...args).metadata.fields;
      },
      //@ts-ignore
      [getInternalKey]() {
        return self2.remultFactory().repo(...args)[getInternalKey]();
      },
      relations: (args2) => self2.remultFactory().repo(...args).relations(args2),
      validate: (a, ...b) => self2.remultFactory().repo(...args).validate(a, ...b),
      addEventListener: (...args2) => self2.remultFactory().repo(...args).addEventListener(...args2),
      count: (...args2) => self2.remultFactory().repo(...args).count(...args2),
      create: (...args2) => self2.remultFactory().repo(...args).create(...args2),
      delete: (args2) => self2.remultFactory().repo(...args).delete(args2),
      deleteMany: (args2) => self2.remultFactory().repo(...args).deleteMany(args2),
      updateMany: (...args2) => self2.remultFactory().repo(...args).updateMany(...args2),
      find: (...args2) => self2.remultFactory().repo(...args).find(...args2),
      findFirst: (...args2) => self2.remultFactory().repo(...args).findFirst(...args2),
      findOne: (...args2) => self2.remultFactory().repo(...args).findOne(...args2),
      findId: (a, b) => self2.remultFactory().repo(...args).findId(a, b),
      //@ts-ignore
      toJson: (json) => self2.remultFactory().repo(...args).toJson(json),
      fromJson: (item, isNew) => self2.remultFactory().repo(...args).fromJson(item, isNew),
      getEntityRef: (...args2) => self2.remultFactory().repo(...args).getEntityRef(...args2),
      insert: (args2) => self2.remultFactory().repo(...args).insert(args2),
      liveQuery: (...args2) => self2.remultFactory().repo(...args).liveQuery(...args2),
      get metadata() {
        return remultStatic.remultFactory().repo(...args).metadata;
      },
      query: (...args2) => self2.remultFactory().repo(...args).query(...args2),
      save: (args2) => self2.remultFactory().repo(...args).save(args2),
      update: (a, b) => self2.remultFactory().repo(...args).update(a, b)
    };
    entityCache.set(args[1], result);
    return result;
  };
  get user() {
    return remultStatic.remultFactory().user;
  }
  set user(info) {
    remultStatic.remultFactory().user = info;
  }
  get apiClient() {
    return remultStatic.remultFactory().apiClient;
  }
  set apiClient(client) {
    remultStatic.remultFactory().apiClient = client;
  }
  get subscriptionServer() {
    return remultStatic.remultFactory().subscriptionServer;
  }
  set subscriptionServer(value) {
    remultStatic.remultFactory().subscriptionServer = value;
  }
};
var remult = new RemultProxy();

// ../node_modules/remult/esm/src/column.js
function makeTitle(name) {
  return name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).replace("Email", "eMail").replace(" I D", " ID");
}
var LookupColumn = class {
  repository;
  isReferenceRelation;
  allowNull;
  toJson() {
    if (!this.storedItem)
      return void 0;
    if (this.item === null)
      return null;
    return this.repository.toJson(this.item);
  }
  setId(val) {
    if (this.repository.metadata.idMetadata.field.valueType == Number)
      val = +val;
    this.id = val;
  }
  waitLoadOf(id) {
    if (id === void 0 || id === null)
      return null;
    return getRepositoryInternals(this.repository)._getCachedByIdAsync(id, false);
  }
  get(id) {
    if (id === void 0 || id === null)
      return null;
    const result = getRepositoryInternals(this.repository)._getCachedById(id, this.isReferenceRelation);
    if (this.isReferenceRelation && !this.storedItem) {
      if (!this.allowNull && (this.id === 0 || this.id === ""))
        return null;
      return void 0;
    }
    return result;
  }
  storedItem;
  set(item) {
    if (item === null && !this.allowNull && this.isReferenceRelation && (this.id == 0 || this.id == "")) {
      this.storedItem = { item: null };
      return;
    }
    this.storedItem = void 0;
    if (item) {
      if (typeof item === "string" || typeof item === "number")
        this.id = item;
      else {
        let eo = getEntityRef(item, false);
        if (eo && !this.isReferenceRelation) {
          getRepositoryInternals(this.repository)._addToCache(item);
          this.id = eo.getId();
        } else {
          this.storedItem = { item };
          this.id = item[this.repository.metadata.idMetadata.field.key];
        }
      }
    } else if (item === null) {
      this.id = null;
    } else {
      this.id = void 0;
    }
  }
  id;
  constructor(repository, isReferenceRelation, allowNull) {
    this.repository = repository;
    this.isReferenceRelation = isReferenceRelation;
    this.allowNull = allowNull;
  }
  get item() {
    if (this.storedItem)
      return this.storedItem.item;
    return this.get(this.id);
  }
  waitLoad() {
    return __async(this, null, function* () {
      return this.waitLoadOf(this.id);
    });
  }
};

// ../node_modules/remult/esm/urlBuilder.js
var UrlBuilder = class {
  url;
  constructor(url) {
    this.url = url;
  }
  add(key, value) {
    if (this.url.indexOf("?") >= 0)
      this.url += "&";
    else
      this.url += "?";
    this.url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }
  addObject(object, suffix = "") {
    if (object != void 0)
      for (var key in object) {
        let val = object[key];
        this.add(key + suffix, val);
      }
  }
};

// ../node_modules/remult/esm/src/remult3/remult3.js
var flags = {
  error500RetryCount: 4
};

// ../node_modules/remult/esm/src/buildRestDataProvider.js
function buildRestDataProvider(provider) {
  if (!provider)
    return new RestDataProviderHttpProviderUsingFetch();
  let httpDataProvider;
  if (!httpDataProvider) {
    if (isExternalHttpProvider(provider)) {
      httpDataProvider = new HttpProviderBridgeToRestDataProviderHttpProvider(provider);
    }
  }
  if (!httpDataProvider) {
    if (typeof provider === "function") {
      httpDataProvider = new RestDataProviderHttpProviderUsingFetch(provider);
    }
  }
  return httpDataProvider;
}
function isExternalHttpProvider(item) {
  let http = item;
  if (http && http.get && http.put && http.post && http.delete)
    return true;
  return false;
}
var HttpProviderBridgeToRestDataProviderHttpProvider = class {
  http;
  constructor(http) {
    this.http = http;
  }
  post(url, data) {
    return __async(this, null, function* () {
      return yield retry(() => toPromise(this.http.post(url, data)));
    });
  }
  delete(url) {
    return toPromise(this.http.delete(url));
  }
  put(url, data) {
    return toPromise(this.http.put(url, data));
  }
  get(url) {
    return __async(this, null, function* () {
      return yield retry(() => toPromise(this.http.get(url)));
    });
  }
};
function retry(what) {
  return __async(this, null, function* () {
    let i = 0;
    while (true) {
      try {
        return yield what();
      } catch (err) {
        if ((err.message?.startsWith("Error occurred while trying to proxy") || err.message?.startsWith("Error occured while trying to proxy") || err.message?.includes("http proxy error") || err.message?.startsWith("Gateway Timeout") || err.status == 500) && i++ < flags.error500RetryCount) {
          yield new Promise((res, req) => {
            setTimeout(() => {
              res({});
            }, 500);
          });
          continue;
        }
        throw err;
      }
    }
  });
}
function toPromise(p) {
  let r;
  if (p["toPromise"] !== void 0) {
    r = p["toPromise"]();
  } else
    r = p;
  return r.then((x2) => {
    if (x2 && (x2.status == 200 || x2.status == 201) && x2.headers && x2.request && x2.data)
      return x2.data;
    return x2;
  }).catch((ex) => __async(this, null, function* () {
    throw yield processHttpException(ex);
  }));
}
function processHttpException(ex) {
  return __async(this, null, function* () {
    let z = yield ex;
    var error;
    if (z.error)
      error = z.error;
    else if (z.isAxiosError) {
      if (typeof z.response?.data === "string")
        error = z.response.data;
      else
        error = z?.response?.data;
    }
    if (!error)
      error = z.message;
    if (z.status == 0 && z.error.isTrusted)
      error = "Network Error";
    if (typeof error === "string") {
      error = {
        message: error
      };
    }
    if (z.modelState)
      error.modelState = z.modelState;
    let httpStatusCode = z.status;
    if (httpStatusCode === void 0)
      httpStatusCode = z.response?.status;
    if (httpStatusCode !== void 0 && httpStatusCode !== null) {
      error.httpStatusCode = httpStatusCode;
    }
    var result = Object.assign(error, {
      //     exception: ex disabled for now because JSON.stringify crashed with this
    });
    return result;
  });
}

// ../node_modules/remult/esm/src/data-providers/rest-data-provider.js
var RestDataProvider = class {
  apiProvider;
  constructor(apiProvider) {
    this.apiProvider = apiProvider;
  }
  getEntityDataProvider(entity) {
    return new RestEntityDataProvider(() => {
      let url = this.apiProvider()?.url;
      if (url === void 0 || url === null)
        url = "/api";
      return url + "/" + entity.key;
    }, () => {
      return buildRestDataProvider(this.apiProvider().httpClient);
    }, entity);
  }
  transaction(action) {
    return __async(this, null, function* () {
      throw new Error("Method not implemented.");
    });
  }
  isProxy = true;
};
function findOptionsToJson(options, meta) {
  if (options.include) {
    let newInclude = {};
    for (const key in options.include) {
      if (Object.prototype.hasOwnProperty.call(options.include, key)) {
        let element = options.include[key];
        if (typeof element === "object") {
          const rel = getRelationFieldInfo(meta.fields.find(key));
          if (rel) {
            element = findOptionsToJson(element, rel.toRepo.metadata);
          }
        }
        newInclude[key] = element;
      }
    }
    options = __spreadProps(__spreadValues({}, options), { include: newInclude });
  }
  if (options.where)
    options = __spreadProps(__spreadValues({}, options), {
      where: Filter.entityFilterToJson(meta, options.where)
    });
  if (options.load)
    options = __spreadProps(__spreadValues({}, options), {
      load: options.load(meta.fields).map((y) => y.key)
    });
  return options;
}
var RestEntityDataProvider = class {
  url;
  http;
  entity;
  constructor(url, http, entity) {
    this.url = url;
    this.http = http;
    this.entity = entity;
  }
  translateFromJson(row) {
    let result = {};
    for (const col of this.entity.fields) {
      result[col.key] = col.valueConverter.fromJson(row[col.key]);
    }
    return result;
  }
  translateToJson(row) {
    let result = {};
    for (const col of this.entity.fields) {
      result[col.key] = col.valueConverter.toJson(row[col.key]);
    }
    return result;
  }
  count(where) {
    return __async(this, null, function* () {
      const { run } = this.buildFindRequest({ where });
      return run("count").then((r) => +r.count);
    });
  }
  deleteMany(where) {
    return __async(this, null, function* () {
      const { run } = this.buildFindRequest({ where }, "delete");
      return run("deleteMany").then((r) => +r.deleted);
    });
  }
  updateMany(where, data) {
    return __async(this, null, function* () {
      const { run } = this.buildFindRequest({ where }, "put");
      return run("updateMany", this.toJsonOfIncludedKeys(data)).then((r) => +r.updated);
    });
  }
  find(options) {
    let { run } = this.buildFindRequest(options);
    return run().then((x2) => x2.map((y) => this.translateFromJson(y)));
  }
  //@internal
  buildFindRequest(options, method) {
    if (!method)
      method = "get";
    let url = new UrlBuilder(this.url());
    let filterObject;
    if (options) {
      if (options.where) {
        filterObject = options.where.toJson();
        if (addFilterToUrlAndReturnTrueIfSuccessful(filterObject, url))
          filterObject = void 0;
      }
      if (options.orderBy && options.orderBy.Segments) {
        let sort = "";
        let order = "";
        let hasDescending = false;
        options.orderBy.Segments.forEach((c) => {
          if (sort.length > 0) {
            sort += ",";
            order += ",";
          }
          sort += c.field.key;
          order += c.isDescending ? "desc" : "asc";
          if (c.isDescending)
            hasDescending = true;
        });
        if (sort)
          url.add("_sort", sort);
        if (hasDescending)
          url.add("_order", order);
      }
      if (options.limit)
        url.add("_limit", options.limit);
      if (options.page)
        url.add("_page", options.page);
    }
    const run = (action, body) => {
      let u = new UrlBuilder(url.url);
      if (!action && filterObject) {
        action = "get";
      }
      if (action)
        u.add("__action", action);
      if (filterObject) {
        body = { set: body, where: filterObject };
        return this.http().post(u.url, body);
      } else
        return this.http()[method](u.url, body);
    };
    return {
      createKey: () => JSON.stringify({ url, filterObject }),
      run,
      subscribe: (queryId) => __async(this, null, function* () {
        const result = yield run(liveQueryAction + queryId);
        return {
          result,
          unsubscribe: () => __async(this, null, function* () {
            return remultStatic.actionInfo.runActionWithoutBlockingUI(() => this.http().post(this.url() + "?__action=endLiveQuery", {
              id: queryId
            }));
          })
        };
      })
    };
  }
  update(id, data) {
    return this.http().put(this.url() + (id != "" ? "/" + encodeURIComponent(id) : "?__action=emptyId"), this.toJsonOfIncludedKeys(data)).then((y) => this.translateFromJson(y));
  }
  toJsonOfIncludedKeys(data) {
    let result = {};
    let keys = Object.keys(data);
    for (const col of this.entity.fields) {
      if (keys.includes(col.key))
        result[col.key] = col.valueConverter.toJson(data[col.key]);
    }
    return result;
  }
  delete(id) {
    return __async(this, null, function* () {
      if (id == "")
        yield this.deleteMany(Filter.fromEntityFilter(this.entity, this.entity.idMetadata.getIdFilter(id)));
      else
        return this.http().delete(this.url() + "/" + encodeURIComponent(id));
    });
  }
  insert(data) {
    return this.http().post(this.url(), this.translateToJson(data)).then((y) => this.translateFromJson(y));
  }
  insertMany(data) {
    return this.http().post(this.url(), data.map((data2) => this.translateToJson(data2))).then((y) => y.map((y2) => this.translateFromJson(y2)));
  }
};
var RestDataProviderHttpProviderUsingFetch = class {
  fetch;
  constructor(fetch2) {
    this.fetch = fetch2;
  }
  get(url) {
    return __async(this, null, function* () {
      return yield retry(() => __async(this, null, function* () {
        return this.myFetch(url).then((r) => {
          return r;
        });
      }));
    });
  }
  put(url, data) {
    return this.myFetch(url, {
      method: "put",
      body: JSON.stringify(data)
    });
  }
  delete(url) {
    return this.myFetch(url, { method: "delete" });
  }
  post(url, data) {
    return __async(this, null, function* () {
      return yield retry(() => this.myFetch(url, {
        method: "post",
        body: JSON.stringify(data)
      }));
    });
  }
  myFetch(url, options) {
    const headers = {};
    if (options?.body)
      headers["Content-type"] = "application/json";
    if (typeof window !== "undefined" && typeof window.document !== "undefined" && typeof (window.document.cookie !== "undefined"))
      for (const cookie of window.document.cookie.split(";")) {
        if (cookie.trim().startsWith("XSRF-TOKEN=")) {
          headers["X-XSRF-TOKEN"] = cookie.split("=")[1];
        }
      }
    return (this.fetch || fetch)(url, {
      credentials: "include",
      method: options?.method,
      body: options?.body,
      headers
    }).then((response) => {
      return onSuccess(response);
    }).catch((error) => __async(this, null, function* () {
      let r = yield error;
      throw r;
    }));
  }
};
function onSuccess(response) {
  if (response.status == 204)
    return;
  if (response.status >= 200 && response.status < 300)
    return response.json();
  else {
    throw response.json().then((x2) => {
      return __spreadProps(__spreadValues({}, x2), {
        message: x2.message || response.statusText,
        url: response.url,
        status: response.status
      });
    }).catch(() => {
      throw {
        message: response.statusText,
        url: response.url,
        status: response.status
      };
    });
  }
}
function addFilterToUrlAndReturnTrueIfSuccessful(filter, url) {
  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) {
      const element = filter[key];
      if (Array.isArray(element)) {
        if (element.length > 0 && typeof element[0] === "object")
          return false;
        if (element.length > 10)
          return false;
      }
    }
  }
  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) {
      const element = filter[key];
      if (Array.isArray(element)) {
        if (key.endsWith(".in"))
          url.add(key, JSON.stringify(element));
        else
          element.forEach((e) => url.add(key, e));
      } else if (key.startsWith(customUrlToken))
        url.add(key, JSON.stringify(element));
      else
        url.add(key, element);
    }
  }
  return true;
}
var liveQueryAction = "liveQuery-";

// ../node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// ../node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// ../node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// ../node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
var i;
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var stringify_default = stringify;

// ../node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default = parse;

// ../node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35_default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}

// ../node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x2 = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x2 >>> 4 & 15) + hexTab.charAt(x2 & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x2, len) {
  x2[len >> 5] |= 128 << len % 32;
  x2[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x2.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x2[i], 7, -680876936);
    d = md5ff(d, a, b, c, x2[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x2[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x2[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x2[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x2[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x2[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x2[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x2[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x2[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x2[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x2[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x2[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x2[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x2[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x2[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x2[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x2[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x2[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x2[i], 20, -373897302);
    a = md5gg(a, b, c, d, x2[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x2[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x2[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x2[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x2[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x2[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x2[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x2[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x2[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x2[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x2[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x2[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x2[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x2[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x2[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x2[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x2[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x2[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x2[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x2[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x2[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x2[i], 11, -358537222);
    c = md5hh(c, d, a, b, x2[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x2[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x2[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x2[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x2[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x2[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x2[i], 6, -198630844);
    d = md5ii(d, a, b, c, x2[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x2[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x2[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x2[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x2[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x2[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x2[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x2[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x2[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x2[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x2[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x2[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x2[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x2[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x2[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x2, y) {
  var lsw = (x2 & 65535) + (y & 65535);
  var msw = (x2 >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x2, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x2, t)), s), b);
}
function md5ff(a, b, c, d, x2, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x2, s, t);
}
function md5gg(a, b, c, d, x2, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x2, s, t);
}
function md5hh(a, b, c, d, x2, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x2, s, t);
}
function md5ii(a, b, c, d, x2, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x2, s, t);
}
var md5_default = md5;

// ../node_modules/uuid/dist/esm-browser/v3.js
var v3 = v35_default("v3", 48, md5_default);

// ../node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default = v4;

// ../node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x2, y, z) {
  switch (s) {
    case 0:
      return x2 & y ^ ~x2 & z;
    case 1:
      return x2 ^ y ^ z;
    case 2:
      return x2 & y ^ x2 & z ^ y & z;
    case 3:
      return x2 ^ y ^ z;
  }
}
function ROTL(x2, n) {
  return x2 << n | x2 >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default = sha1;

// ../node_modules/uuid/dist/esm-browser/v5.js
var v5 = v35_default("v5", 80, sha1_default);

// ../node_modules/remult/esm/src/sort.js
var Sort = class _Sort {
  /**
   * Translates the current `Sort` instance into an `EntityOrderBy` object.
   *
   * @returns {EntityOrderBy<any>} An `EntityOrderBy` object representing the sort criteria.
   */
  toEntityOrderBy() {
    let result = {};
    for (const seg of this.Segments) {
      if (seg.isDescending) {
        result[seg.field.key] = "desc";
      } else
        result[seg.field.key] = "asc";
    }
    return result;
  }
  /**
   * Constructs a `Sort` instance with the provided sort segments.
   *
   * @param {...SortSegment[]} segments The sort segments to be included in the sort criteria.
   */
  constructor(...segments) {
    this.Segments = segments;
  }
  /**
   * The segments of the sort criteria.
   *
   * @type {SortSegment[]}
   */
  Segments;
  /**
   * Reverses the sort order of the current sort criteria.
   *
   * @returns {Sort} A new `Sort` instance with the reversed sort order.
   */
  reverse() {
    let r = new _Sort();
    for (const s of this.Segments) {
      r.Segments.push({ field: s.field, isDescending: !s.isDescending });
    }
    return r;
  }
  /**
   * Compares two objects based on the current sort criteria.
   *
   * @param {any} a The first object to compare.
   * @param {any} b The second object to compare.
   * @param {function(FieldMetadata): string} [getFieldKey] An optional function to get the field key for comparison.
   * @returns {number} A negative value if `a` should come before `b`, a positive value if `a` should come after `b`, or zero if they are equal.
   */
  compare(a, b, getFieldKey) {
    if (!getFieldKey)
      getFieldKey = (x2) => x2.key;
    let r = 0;
    for (let i = 0; i < this.Segments.length; i++) {
      let seg = this.Segments[i];
      let left = fixValueForSort(a[getFieldKey(seg.field)]);
      let right = fixValueForSort(b[getFieldKey(seg.field)]);
      if (left > right)
        r = 1;
      else if (left < right)
        r = -1;
      if (r != 0) {
        if (seg.isDescending)
          r *= -1;
        return r;
      }
    }
    return r;
  }
  /**
   * Translates an `EntityOrderBy` to a `Sort` instance.
   *
   * @template T The entity type for the order by.
   * @param {EntityMetadata<T>} entityDefs The metadata of the entity associated with the order by.
   * @param {EntityOrderBy<T>} [orderBy] The `EntityOrderBy` to be translated.
   * @returns {Sort} A `Sort` instance representing the translated order by.
   */
  static translateOrderByToSort(entityDefs, orderBy) {
    if (!orderBy)
      return void 0;
    let sort = new _Sort();
    if (orderBy)
      for (const key in orderBy) {
        if (Object.prototype.hasOwnProperty.call(orderBy, key)) {
          const element = orderBy[key];
          let field = entityDefs.fields.find(key);
          const addSegment = (field2) => {
            switch (element) {
              case "desc":
                sort.Segments.push({ field: field2, isDescending: true });
                break;
              case "asc":
                sort.Segments.push({ field: field2 });
            }
          };
          if (field) {
            const rel = getRelationFieldInfo(field);
            if (rel?.type === "toOne") {
              const op = rel.options;
              if (typeof op.field === "string") {
                addSegment(entityDefs.fields.find(op.field));
              } else {
                if (op.fields) {
                  for (const key2 in op.fields) {
                    if (Object.prototype.hasOwnProperty.call(op.fields, key2)) {
                      const keyInMyEntity = op.fields[key2];
                      addSegment(entityDefs.fields.find(keyInMyEntity.toString()));
                    }
                  }
                }
              }
            } else
              addSegment(field);
          }
        }
      }
    return sort;
  }
  /**
   * Creates a unique `Sort` instance based on the provided `Sort` and the entity metadata.
   * This ensures that the sort criteria result in a unique ordering of entities.
   *
   * @template T The entity type for the sort.
   * @param {EntityMetadata<T>} entityMetadata The metadata of the entity associated with the sort.
   * @param {Sort} [orderBy] The `Sort` instance to be made unique.
   * @returns {Sort} A `Sort` instance representing the unique sort criteria.
   */
  static createUniqueSort(entityMetadata, orderBy) {
    if ((!orderBy || Object.keys(orderBy).length === 0) && entityMetadata.options.defaultOrderBy)
      orderBy = _Sort.translateOrderByToSort(entityMetadata, entityMetadata.options.defaultOrderBy);
    if (!orderBy)
      orderBy = new _Sort();
    for (const field of entityMetadata.idMetadata.fields) {
      if (!orderBy.Segments.find((x2) => x2.field == field)) {
        orderBy.Segments.push({ field });
      }
    }
    return orderBy;
  }
  /**
   * Creates a unique `EntityOrderBy` based on the provided `EntityOrderBy` and the entity metadata.
   * This ensures that the order by criteria result in a unique ordering of entities.
   *
   * @template T The entity type for the order by.
   * @param {EntityMetadata<T>} entityMetadata The metadata of the entity associated with the order by.
   * @param {EntityOrderBy<T>} [orderBy] The `EntityOrderBy` to be made unique.
   * @returns {EntityOrderBy<T>} An `EntityOrderBy` representing the unique order by criteria.
   */
  static createUniqueEntityOrderBy(entityMetadata, orderBy) {
    if (!orderBy || Object.keys(orderBy).length === 0)
      orderBy = entityMetadata.options.defaultOrderBy;
    if (!orderBy)
      orderBy = {};
    else
      orderBy = __spreadValues({}, orderBy);
    for (const field of entityMetadata.idMetadata.fields) {
      if (!orderBy[field.key]) {
        orderBy[field.key] = "asc";
      }
    }
    return orderBy;
  }
};
function fixValueForSort(a) {
  if (a == void 0 || a == null)
    return a;
  if (a.id !== void 0)
    return a.id;
  return a;
}

// ../node_modules/remult/esm/src/live-query/SubscriptionChannel.js
var streamUrl = "stream";
var LiveQuerySubscriber = class {
  repo;
  query;
  sendDefaultState(onResult) {
    onResult(this.createReducerType(() => [...this.defaultQueryState], this.allItemsMessage(this.defaultQueryState)));
  }
  queryChannel;
  subscribeCode;
  unsubscribe = () => {
  };
  setAllItems(result) {
    return __async(this, null, function* () {
      const items = yield getRepositoryInternals(this.repo)._fromJsonArray(result, this.query.options);
      this.forListeners((listener) => {
        listener(() => {
          return items;
        });
      }, this.allItemsMessage(items));
    });
  }
  allItemsMessage(items) {
    return [
      {
        type: "all",
        data: items
      }
    ];
  }
  forListeners(what, changes) {
    what((reducer) => {
      this.defaultQueryState = reducer(this.defaultQueryState);
      if (changes.find((c) => c.type === "add" || c.type === "replace")) {
        if (this.query.options.orderBy) {
          const o = Sort.translateOrderByToSort(this.repo.metadata, this.query.options.orderBy);
          this.defaultQueryState.sort((a, b) => o.compare(a, b));
        }
      }
    });
    for (const l of this.listeners) {
      what((reducer) => {
        l.next(this.createReducerType(reducer, changes));
      });
    }
  }
  createReducerType(applyChanges, changes) {
    return {
      applyChanges,
      changes,
      items: this.defaultQueryState
    };
  }
  handle(messages) {
    return __async(this, null, function* () {
      {
        let x2 = messages.filter(({ type }) => type == "add" || type == "replace");
        let loadedItems = yield getRepositoryInternals(this.repo)._fromJsonArray(x2.map((m) => m.data.item), this.query.options);
        for (let index = 0; index < x2.length; index++) {
          const element = x2[index];
          element.data.item = loadedItems[index];
        }
      }
      this.forListeners((listener) => {
        listener((items) => {
          if (!items)
            items = [];
          for (const message of messages) {
            switch (message.type) {
              case "all":
                this.setAllItems(message.data);
                break;
              case "replace": {
                items = items.map((x2) => this.repo.metadata.idMetadata.getId(x2) === message.data.oldId ? message.data.item : x2);
                break;
              }
              case "add":
                items = items.filter((x2) => this.repo.metadata.idMetadata.getId(x2) !== this.repo.metadata.idMetadata.getId(message.data.item));
                items.push(message.data.item);
                break;
              case "remove":
                items = items.filter((x2) => this.repo.metadata.idMetadata.getId(x2) !== message.data.id);
                break;
            }
          }
          return items;
        });
      }, messages);
    });
  }
  defaultQueryState = [];
  listeners = [];
  id = v4_default();
  constructor(repo2, query, userId) {
    this.repo = repo2;
    this.query = query;
    this.queryChannel = `users:${userId}:queries:${this.id}`;
    this.id = this.queryChannel;
  }
};
var liveQueryKeepAliveRoute = "_liveQueryKeepAlive";
var SubscriptionChannel = class {
  channelKey;
  /**
   * Constructs a new `SubscriptionChannel` instance.
   *
   * @param {string} channelKey The key that identifies the channel.
   */
  constructor(channelKey) {
    this.channelKey = channelKey;
  }
  /**
   * Publishes a message to the channel. This method should only be used on the backend.
   *
   * @param {messageType} message The message to be published.
   * @param {Remult} [remult] An optional instance of Remult to use for publishing the message.
   */
  publish(message, remult2) {
    remult2 = remult2 || remult;
    remult2.subscriptionServer.publishMessage(this.channelKey, message);
  }
  //@internal
  subscribe(next, remult2) {
    remult2 = remult2 || remult;
    let listener = next;
    if (typeof next === "function") {
      listener = {
        next
      };
    }
    listener.error ??= () => {
    };
    listener.complete ??= () => {
    };
    return remult2.liveQuerySubscriber.subscribeChannel(this.channelKey, listener);
  }
};

// ../node_modules/remult/esm/src/live-query/LiveQueryClient.js
var LiveQueryClient = class {
  apiProvider;
  getUserId;
  wrapMessageHandling(handleMessage) {
    var x2 = this.apiProvider().wrapMessageHandling;
    if (x2)
      x2(handleMessage);
    else
      handleMessage();
  }
  queries = /* @__PURE__ */ new Map();
  hasQueriesForTesting() {
    return this.queries.size > 0;
  }
  channels = /* @__PURE__ */ new Map();
  constructor(apiProvider, getUserId) {
    this.apiProvider = apiProvider;
    this.getUserId = getUserId;
  }
  runPromise(p) {
    return p;
  }
  close() {
    this.queries.clear();
    this.channels.clear();
    this.closeIfNoListeners();
  }
  subscribeChannel(key, onResult) {
    return __async(this, null, function* () {
      let onUnsubscribe = () => {
      };
      const client = yield this.openIfNoOpened();
      try {
        let q = this.channels.get(key);
        if (!q) {
          this.channels.set(key, q = new MessageChannel());
          try {
            q.unsubscribe = yield client.subscribe(key, (value) => this.wrapMessageHandling(() => q.handle(value)), (err) => {
              onResult.error(err);
            });
          } catch (err) {
            onResult.error(err);
            throw err;
          }
        }
        q.listeners.push(onResult);
        onUnsubscribe = () => {
          q.listeners.splice(q.listeners.indexOf(onResult), 1);
          if (q.listeners.length == 0) {
            this.channels.delete(key);
            q.unsubscribe();
          }
          this.closeIfNoListeners();
        };
      } catch (err) {
        onResult.error(err);
        throw err;
      }
      return () => {
        onUnsubscribe();
        onUnsubscribe = () => {
        };
      };
    });
  }
  closeIfNoListeners() {
    if (this.client) {
      if (this.queries.size === 0 && this.channels.size === 0) {
        this.runPromise(this.client.then((x2) => x2.close()));
        this.client = void 0;
        clearInterval(this.interval);
        this.interval = void 0;
      }
    }
  }
  subscribe(repo2, options, listener) {
    let alive = true;
    let onUnsubscribe = () => {
      alive = false;
    };
    this.runPromise(getRepositoryInternals(repo2)._buildEntityDataProviderFindOptions(options).then((opts) => {
      if (!alive)
        return;
      const { createKey, subscribe } = new RestDataProvider(this.apiProvider).getEntityDataProvider(repo2.metadata).buildFindRequest(opts);
      const eventTypeKey = createKey();
      let q = this.queries.get(eventTypeKey);
      if (!q) {
        this.queries.set(eventTypeKey, q = new LiveQuerySubscriber(repo2, { entityKey: repo2.metadata.key, options }, this.getUserId()));
        q.subscribeCode = () => {
          if (q.unsubscribe) {
            q.unsubscribe();
            q.unsubscribe = () => {
            };
          }
          this.runPromise(this.subscribeChannel(q.queryChannel, {
            next: (value) => this.runPromise(q.handle(value)),
            complete: () => {
            },
            error: (er) => {
              q.listeners.forEach((l) => l.error(er));
            }
          }).then((unsubscribeToChannel) => {
            if (q.listeners.length == 0) {
              unsubscribeToChannel();
              return;
            }
            this.runPromise(subscribe(q.queryChannel).then((r) => {
              if (q.listeners.length === 0) {
                r.unsubscribe();
                unsubscribeToChannel();
                return;
              }
              this.runPromise(q.setAllItems(r.result));
              q.unsubscribe = () => {
                q.unsubscribe = () => {
                };
                unsubscribeToChannel();
                this.runPromise(r.unsubscribe());
              };
            }).catch((err) => {
              q.listeners.forEach((l) => l.error(err));
              unsubscribeToChannel();
              this.queries.delete(eventTypeKey);
            }));
          })).catch((err) => {
            q.listeners.forEach((l) => l.error(err));
          });
        };
        q.subscribeCode();
      } else {
        q.sendDefaultState(listener.next);
      }
      q.listeners.push(listener);
      onUnsubscribe = () => {
        q.listeners.splice(q.listeners.indexOf(listener), 1);
        listener.complete();
        if (q.listeners.length == 0) {
          this.queries.delete(eventTypeKey);
          q.unsubscribe();
        }
        this.closeIfNoListeners();
      };
    }).catch((err) => {
      listener.error(err);
    }));
    return () => {
      onUnsubscribe();
    };
  }
  client;
  interval;
  openIfNoOpened() {
    if (!this.client) {
      this.interval = setInterval(() => __async(this, null, function* () {
        const ids = [];
        for (const q of this.queries.values()) {
          ids.push(q.queryChannel);
        }
        if (ids.length > 0) {
          let p = this.apiProvider();
          const invalidIds = yield this.runPromise(yield remultStatic.actionInfo.runActionWithoutBlockingUI(() => buildRestDataProvider(p.httpClient).post(p.url + "/" + liveQueryKeepAliveRoute, ids)));
          for (const id of invalidIds) {
            for (const q of this.queries.values()) {
              if (q.queryChannel === id)
                q.subscribeCode();
            }
          }
        }
      }), 3e4);
      return this.runPromise(this.client = this.apiProvider().subscriptionClient.openConnection(() => {
        for (const q of this.queries.values()) {
          q.subscribeCode();
        }
      }));
    }
    return this.client;
  }
};
var MessageChannel = class {
  id;
  unsubscribe = () => {
  };
  handle(message) {
    return __async(this, null, function* () {
      for (const l of this.listeners) {
        l.next(message);
      }
    });
  }
  listeners = [];
  constructor() {
  }
};

// ../node_modules/remult/esm/src/live-query/SseSubscriptionClient.js
var SseSubscriptionClient = class _SseSubscriptionClient {
  openConnection(onReconnect) {
    let connectionId;
    const channels = /* @__PURE__ */ new Map();
    const provider = buildRestDataProvider(remult.apiClient.httpClient);
    let connected = false;
    let source;
    const client = {
      close() {
        source.close();
      },
      subscribe(channel, handler) {
        return __async(this, null, function* () {
          let listeners = channels.get(channel);
          if (!listeners) {
            channels.set(channel, listeners = []);
            yield subscribeToChannel(channel);
          }
          listeners.push(handler);
          return () => {
            listeners.splice(listeners.indexOf(handler, 1));
            if (listeners.length == 0) {
              remultStatic.actionInfo.runActionWithoutBlockingUI(() => provider.post(remult.apiClient.url + "/" + streamUrl + "/unsubscribe", {
                channel,
                clientId: connectionId
              }));
              channels.delete(channel);
            }
          };
        });
      }
    };
    const createConnectionPromise = () => new Promise((res) => {
      createConnection();
      let retryCount = 0;
      function createConnection() {
        if (source)
          source.close();
        source = _SseSubscriptionClient.createEventSource(remult.apiClient.url + "/" + streamUrl);
        source.onmessage = (e) => {
          let message = JSON.parse(e.data);
          const listeners = channels.get(message.channel);
          if (listeners)
            listeners.forEach((x2) => x2(message.data));
        };
        source.onerror = (e) => {
          console.error("Live Query Event Source Error", e);
          source.close();
          if (retryCount++ < flags.error500RetryCount) {
            setTimeout(() => {
              createConnection();
            }, 500);
          }
        };
        source.addEventListener("connectionId", (e) => __async(this, null, function* () {
          connectionId = e.data;
          if (connected) {
            for (const channel of channels.keys()) {
              yield subscribeToChannel(channel);
            }
            onReconnect();
          } else {
            connected = true;
            res(client);
          }
        }));
      }
    });
    return createConnectionPromise();
    function subscribeToChannel(channel) {
      return __async(this, null, function* () {
        const result = yield remultStatic.actionInfo.runActionWithoutBlockingUI(() => {
          return provider.post(remult.apiClient.url + "/" + streamUrl + "/subscribe", {
            channel,
            clientId: connectionId
          });
        });
        if (result === ConnectionNotFoundError) {
          yield createConnectionPromise();
        }
      });
    }
  }
  static createEventSource(url) {
    return new EventSource(url, {
      withCredentials: true
    });
  }
};
var ConnectionNotFoundError = "client connection not found";

// ../node_modules/remult/esm/src/server-action-info.js
var serverActionField = Symbol.for("serverActionField");

// ../node_modules/remult/esm/server/initDataProvider.js
function initDataProvider(optionsDataProvider, useStaticDefault, defaultDataProvider) {
  let dataProvider;
  if (typeof optionsDataProvider === "function") {
    dataProvider = optionsDataProvider();
  } else
    dataProvider = Promise.resolve(optionsDataProvider);
  dataProvider = dataProvider.then((dp) => __async(this, null, function* () {
    if (dp)
      return dp;
    if (useStaticDefault)
      dp = yield remultStatic.defaultDataProvider();
    if (dp)
      return dp;
    return defaultDataProvider?.();
  }));
  return dataProvider;
}

// ../node_modules/remult/esm/src/context.js
var RemultAsyncLocalStorage = class {
  remultObjectStorage;
  static enable() {
    remultStatic.remultFactory = () => {
      const r = remultStatic.asyncContext.getStore();
      if (r)
        return r.remult;
      else
        throw new Error("remult object was requested outside of a valid context, try running it within initApi or a remult request cycle");
    };
  }
  static disable() {
    resetFactory();
  }
  constructor(remultObjectStorage) {
    this.remultObjectStorage = remultObjectStorage;
  }
  run(remult2, callback) {
    return __async(this, null, function* () {
      if (this.remultObjectStorage) {
        return this.remultObjectStorage.run({ remult: remult2 }, () => callback(remult2));
      } else
        return callback(remult2);
    });
  }
  isInInitRequest() {
    return this.remultObjectStorage?.getStore()?.inInitRequest;
  }
  setInInitRequest(val) {
    const store = this.remultObjectStorage?.getStore();
    if (!store)
      return;
    store.inInitRequest = val;
  }
  getStore() {
    if (!this.remultObjectStorage) {
      throw new Error("can't use static remult in this environment, `async_hooks` were not initialized");
    }
    return this.remultObjectStorage.getStore();
  }
};
if (!remultStatic.asyncContext)
  remultStatic.asyncContext = new RemultAsyncLocalStorage(void 0);
function isBackend() {
  return remultStatic.actionInfo.runningOnServer || !remult.dataProvider.isProxy;
}
var Remult = class {
  /**Return's a `Repository` of the specific entity type
   * @example
   * const taskRepo = remult.repo(Task);
   * @see [Repository](https://remult.dev/docs/ref_repository.html)
   * @param entity - the entity to use
   * @param dataProvider - an optional alternative data provider to use. Useful for writing to offline storage or an alternative data provider
   */
  repo = (entity, dataProvider) => {
    if (dataProvider === void 0)
      dataProvider = this.dataProvider;
    let dpCache = this.repCache.get(dataProvider);
    if (!dpCache)
      this.repCache.set(dataProvider, dpCache = /* @__PURE__ */ new Map());
    let r = dpCache.get(entity);
    if (!r) {
      dpCache.set(entity, r = new RepositoryImplementation(entity, this, dataProvider, createOldEntity(entity, this)));
      verifyFieldRelationInfo(r, this, dataProvider);
    }
    return r;
  };
  /** Returns the current user's info */
  user;
  /** Checks if a user was authenticated */
  authenticated() {
    return this.user?.id !== void 0;
  }
  /** checks if the user has any of the roles specified in the parameters
   * @example
   * remult.isAllowed("admin")
   * @see
   * [Allowed](https://remult.dev/docs/allowed.html)
   */
  isAllowed(roles) {
    if (roles == void 0)
      return void 0;
    if (roles instanceof Array) {
      for (const role of roles) {
        if (this.isAllowed(role) === true) {
          return true;
        }
      }
      return false;
    }
    if (typeof roles === "function") {
      return roles(this);
    }
    if (typeof roles === "boolean")
      return roles;
    if (typeof roles === "string") {
      if (this.user?.roles?.includes(roles.toString()))
        return true;
    }
    return false;
  }
  /** checks if the user matches the allowedForInstance callback
   * @see
   * [Allowed](https://remult.dev/docs/allowed.html)
   */
  isAllowedForInstance(instance, allowed) {
    if (Array.isArray(allowed)) {
      {
        for (const item of allowed) {
          if (this.isAllowedForInstance(instance, item))
            return true;
        }
      }
    } else if (typeof allowed === "function") {
      return allowed(instance, this);
    } else
      return this.isAllowed(allowed);
    return void 0;
  }
  /** The current data provider */
  dataProvider = new RestDataProvider(() => this.apiClient);
  /* @internal */
  repCache = /* @__PURE__ */ new Map();
  constructor(provider) {
    if (provider && provider.getEntityDataProvider) {
      this.dataProvider = provider;
      return;
    }
    if (isExternalHttpProvider(provider)) {
      this.apiClient.httpClient = provider;
    } else if (typeof provider === "function")
      this.apiClient.httpClient = provider;
    else if (provider) {
      const apiClient = provider;
      if (apiClient.httpClient)
        this.apiClient.httpClient = apiClient.httpClient;
      if (apiClient.url)
        this.apiClient.url = apiClient.url;
      if (apiClient.subscriptionClient)
        this.apiClient.subscriptionClient = apiClient.subscriptionClient;
      if (apiClient.wrapMessageHandling)
        this.apiClient.wrapMessageHandling = apiClient.wrapMessageHandling;
    }
  }
  liveQueryStorage;
  subscriptionServer;
  /* @internal*/
  liveQueryPublisher = {
    itemChanged: () => __async(this, null, function* () {
    })
  };
  //@ts-ignore // type error of typescript regarding args that doesn't appear in my normal development
  /** Used to call a `backendMethod` using a specific `remult` object
   * @example
   * await remult.call(TasksController.setAll, undefined, true);
   * @param backendMethod - the backend method to call
   * @param classInstance - the class instance of the backend method, for static backend methods use undefined
   * @param args - the arguments to send to the backend method
   */
  call(backendMethod, classInstance, ...args) {
    const z = backendMethod[serverActionField];
    if (!z.doWork)
      throw Error("The method received is not a valid backend method");
    return z.doWork(args, classInstance, this.apiClient.url, buildRestDataProvider(this.apiClient.httpClient));
  }
  /* @internal*/
  liveQuerySubscriber = new LiveQueryClient(() => this.apiClient, () => this.user?.id);
  /** A helper callback that can be used to debug and trace all find operations. Useful in debugging scenarios */
  static onFind = (metadata, options) => {
  };
  clearAllCache() {
    this.repCache.clear();
  }
  /** A helper callback that is called whenever an entity is created. */
  static entityRefInit;
  /** context information that can be used to store custom information that will be disposed as part of the `remult` object */
  context = {};
  /** The api client that will be used by `remult` to perform calls to the `api` */
  apiClient = {
    url: "/api",
    subscriptionClient: new SseSubscriptionClient()
  };
};
remultStatic.defaultRemultFactory = () => new Remult();
var ClassHelper = class {
  classes = /* @__PURE__ */ new Map();
};
function setControllerSettings(target, options) {
  let r = target;
  while (true) {
    let helper = remultStatic.classHelpers.get(r);
    if (!helper)
      remultStatic.classHelpers.set(r, helper = new ClassHelper());
    helper.classes.set(target, options);
    let p = Object.getPrototypeOf(r.prototype);
    if (p == null)
      break;
    r = p.constructor;
  }
}
var Allow = class {
  static everyone = () => true;
  static authenticated = (...args) => {
    if (args.length > 1) {
      return args[1].authenticated();
    } else if (args.length == 1) {
      if (args[0].authenticated)
        return args[0].authenticated();
    }
    return remult.authenticated();
  };
};
var queryConfig = {
  defaultPageSize: 200
};
var EventSource2 = class {
  listeners = [];
  fire() {
    return __async(this, null, function* () {
      for (const l of this.listeners) {
        yield l();
      }
    });
  }
  dispatcher = {
    observe: (what) => __async(this, null, function* () {
      this.listeners.push(what);
      yield what();
      return () => {
        this.listeners = this.listeners.filter((x2) => x2 != what);
      };
    })
  };
};
function doTransaction(remult2, what) {
  return __async(this, null, function* () {
    const trans = new transactionLiveQueryPublisher(remult2.liveQueryPublisher);
    let ok = true;
    const prev = remult2.dataProvider;
    try {
      yield remult2.dataProvider.transaction((ds) => __async(this, null, function* () {
        remult2.dataProvider = ds;
        remult2.liveQueryPublisher = trans;
        yield what(ds);
        ok = true;
      }));
      if (ok)
        yield trans.flush();
    } finally {
      remult2.dataProvider = prev;
    }
  });
}
var transactionLiveQueryPublisher = class {
  orig;
  constructor(orig) {
    this.orig = orig;
  }
  transactionItems = /* @__PURE__ */ new Map();
  itemChanged(entityKey, changes) {
    return __async(this, null, function* () {
      let items = this.transactionItems.get(entityKey);
      if (!items) {
        this.transactionItems.set(entityKey, items = []);
      }
      for (const c of changes) {
        if (c.oldId !== void 0) {
          const item = items.find((y) => y.id === c.oldId);
          if (item !== void 0) {
            if (c.deleted)
              item.deleted = true;
            if (c.id != item.id)
              item.id = c.id;
          } else
            items.push(c);
        } else
          items.push(c);
      }
    });
  }
  flush() {
    return __async(this, null, function* () {
      for (const key of this.transactionItems.keys()) {
        yield this.orig.itemChanged(key, this.transactionItems.get(key));
      }
    });
  }
};
function withRemult(callback, options) {
  return __async(this, null, function* () {
    const remult2 = new Remult();
    remult2.dataProvider = yield initDataProvider(options?.dataProvider, true, () => __async(this, null, function* () {
      return remult2.dataProvider;
    }));
    return remultStatic.asyncContext.run(remult2, (r) => callback(r));
  });
}

// ../node_modules/remult/esm/assign.js
function assign(item, valuesToSet) {
  if (valuesToSet)
    Object.assign(item, valuesToSet);
  return item;
}

// ../node_modules/remult/esm/inputTypes.js
var InputTypes = class {
  static number = "number";
  static date = "date";
  static checkbox = "checkbox";
  static password = "password";
  static email = "email";
  static tel = "tel";
  static time = "time";
};

// ../node_modules/remult/esm/src/valueConverters.js
var ValueConverters = class _ValueConverters {
  static Date = {
    toJson: (val) => {
      if (val === null)
        return null;
      if (!val)
        return "";
      if (typeof val === "string")
        val = new Date(val);
      if (val instanceof Date) {
        return val.toISOString();
      } else {
        throw new Error("Expected date but got " + val);
      }
    },
    fromJson: (val) => {
      if (val === null)
        return null;
      if (val == void 0)
        return void 0;
      if (val == "")
        return void 0;
      if (val.startsWith("0000-00-00"))
        return void 0;
      return new Date(Date.parse(val));
    },
    toDb: (x2) => x2,
    fromDb: (val) => {
      if (typeof val === "number")
        val = new Date(val);
      if (typeof val === "string")
        val = new Date(val);
      if (val && !(val instanceof Date))
        throw "expected date but got " + val;
      return val;
    },
    fromInput: (x2) => _ValueConverters.Date.fromJson(x2),
    toInput: (x2) => _ValueConverters.Date.toJson(x2),
    displayValue: (val) => {
      if (!val)
        return "";
      return val.toLocaleString();
    }
  };
  static DateOnly = {
    fromInput: (x2) => _ValueConverters.DateOnly.fromJson(x2),
    toInput: (x2) => _ValueConverters.DateOnly.toJson(x2),
    toJson: (val) => {
      var d = val;
      if (typeof d === "string" || typeof d === "number")
        d = new Date(d);
      if (!d || d == null)
        return null;
      if (d.getHours() == 0)
        return new Date(d.valueOf() - d.getTimezoneOffset() * 6e4).toISOString().substring(0, 10);
      else
        return d.toISOString().substring(0, 10);
    },
    fromJson: (value) => {
      if (!value || value == "" || value == "0000-00-00")
        return null;
      let d = new Date(Date.parse(value));
      d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
      return d;
    },
    inputType: InputTypes.date,
    toDb: (val) => {
      if (!val)
        return null;
      return _ValueConverters.DateOnly.fromJson(_ValueConverters.DateOnly.toJson(val));
    },
    fromDb: (val) => {
      return _ValueConverters.Date.fromDb(val);
    },
    fieldTypeInDb: "date",
    displayValue: (value) => {
      if (!value)
        return "";
      return value.toLocaleDateString(void 0);
    }
  };
  static DateOnlyString = __spreadProps(__spreadValues({}, _ValueConverters.DateOnly), {
    toDb: (d) => {
      let val = _ValueConverters.DateOnly.toJson(d);
      if (!val)
        return void 0;
      return val.replace(/-/g, "");
    },
    fromDb: (val) => {
      if (val === null)
        return null;
      if (!val)
        return void 0;
      return /* @__PURE__ */ new Date(val.substring(0, 4) + "-" + val.substring(4, 6) + "-" + val.substring(6, 8));
    }
  });
  static Boolean = {
    toDb: (val) => val,
    inputType: InputTypes.checkbox,
    fromDb: (value) => {
      return _ValueConverters.Boolean.fromJson(value);
    },
    fromJson: (value) => {
      if (typeof value === "boolean")
        return value;
      if (value === 1)
        return true;
      if (value !== void 0 && value !== null) {
        return value.toString().trim().toLowerCase() == "true";
      }
      return value;
    },
    toJson: (x2) => x2,
    fromInput: (x2) => _ValueConverters.Boolean.fromJson(x2),
    toInput: (x2) => _ValueConverters.Boolean.toJson(x2)
  };
  static Number = {
    fromDb: (value) => {
      if (value === null)
        return null;
      if (value !== void 0)
        return +value;
      return void 0;
    },
    toDb: (value) => value,
    fromJson: (value) => _ValueConverters.Number.fromDb(value),
    toJson: (value) => _ValueConverters.Number.toDb(value),
    fromInput: (x2, type) => {
      let r = +x2;
      if (x2 === null || x2 === void 0)
        return void 0;
      return r;
    },
    toInput: (x2, type) => {
      return x2?.toString();
    },
    inputType: InputTypes.number
  };
  static String = {
    fromDb: enforceString,
    toDb: enforceString,
    fromJson: enforceString,
    toJson: enforceString,
    fromInput: enforceString,
    toInput: enforceString
  };
  static Integer = __spreadProps(__spreadValues({}, _ValueConverters.Number), {
    toJson: (value) => {
      let val = _ValueConverters.Number.toDb(value);
      if (!val)
        return val;
      return +(+val).toFixed(0);
    },
    toDb: (value) => _ValueConverters.Integer.toJson(value),
    fieldTypeInDb: "integer"
  });
  static Default = {
    fromJson: (x2) => x2,
    toJson: (x2) => x2,
    fromDb: (x2) => _ValueConverters.JsonString.fromDb(x2),
    toDb: (x2) => _ValueConverters.JsonString.toDb(x2),
    fromInput: (x2) => _ValueConverters.Default.fromJson(x2),
    toInput: (x2) => _ValueConverters.Default.toJson(x2),
    displayValue: (x2) => x2 + "",
    fieldTypeInDb: "",
    inputType: "text"
  };
  static JsonString = {
    fromJson: (x2) => x2,
    toJson: (x2) => x2,
    fromDb: (x2) => x2 == null ? null : x2 ? JSON.parse(_ValueConverters.JsonString.fromJson(x2)) : void 0,
    toDb: (x2) => x2 !== void 0 ? x2 === null ? null : JSON.stringify(_ValueConverters.JsonString.toJson(x2)) : void 0,
    fromInput: (x2) => _ValueConverters.JsonString.fromJson(x2),
    toInput: (x2) => _ValueConverters.JsonString.toJson(x2)
  };
  static JsonValue = {
    fromJson: (x2) => x2,
    toJson: (x2) => x2,
    fromDb: (x2) => x2,
    toDb: (x2) => x2,
    fromInput: (x2) => _ValueConverters.JsonString.fromJson(x2),
    toInput: (x2) => _ValueConverters.JsonString.toJson(x2),
    fieldTypeInDb: "json"
  };
};
function enforceString(value) {
  if (value === null || value === void 0)
    return value;
  if (typeof value !== "string")
    return value.toString();
  return value;
}

// ../node_modules/remult/esm/src/remult3/__updateEntityBasedOnWhere.js
function __updateEntityBasedOnWhere(entityDefs, where, r) {
  let w = Filter.fromEntityFilter(entityDefs, where);
  const emptyFunction = () => {
  };
  if (w) {
    w.__applyToConsumer({
      custom: emptyFunction,
      databaseCustom: emptyFunction,
      containsCaseInsensitive: emptyFunction,
      notContainsCaseInsensitive: emptyFunction,
      isDifferentFrom: emptyFunction,
      isEqualTo: (col, val) => {
        r[col.key] = val;
      },
      isGreaterOrEqualTo: emptyFunction,
      isGreaterThan: emptyFunction,
      isIn: emptyFunction,
      isLessOrEqualTo: emptyFunction,
      isLessThan: emptyFunction,
      isNotNull: emptyFunction,
      isNull: emptyFunction,
      or: emptyFunction
    });
  }
}

// ../node_modules/remult/esm/src/remult3/relation-loader.js
var RelationLoader = class {
  entityLoaders = /* @__PURE__ */ new Map();
  promises = [];
  load(rel, findOptions) {
    let e = this.entityLoaders.get(rel.entityType);
    if (!e) {
      this.entityLoaders.set(rel.entityType, e = new EntityLoader(rel));
    }
    const p = e.find(findOptions);
    this.promises.push(p);
    return p;
  }
  constructor() {
  }
  resolveAll() {
    return __async(this, null, function* () {
      for (const entity of this.entityLoaders.values()) {
        for (const variation of entity.queries.values()) {
          variation.resolve();
        }
      }
      if (this.promises.length === 0)
        return;
      const x2 = this.promises;
      this.promises = [];
      yield Promise.all(x2);
      yield this.resolveAll();
    });
  }
};
var EntityLoader = class {
  rel;
  queries = /* @__PURE__ */ new Map();
  find(findOptions) {
    const _a = findOptionsToJson(findOptions, this.rel.metadata), { where } = _a, options = __objRest(_a, ["where"]);
    const optionKeys = JSON.stringify(options);
    let q = this.queries.get(optionKeys);
    if (!q) {
      this.queries.set(optionKeys, q = new QueryVariation(this.rel));
    }
    return q.find(findOptions, where);
  }
  constructor(rel) {
    this.rel = rel;
  }
};
var QueryVariation = class {
  rel;
  find(findOptions, where) {
    const whereKey = JSON.stringify(where);
    let w = this.whereVariations.get(whereKey);
    if (!w) {
      const keys = Object.keys(where);
      if (keys.length === 1 && typeof where[keys[0]] !== "object" && !findOptions.limit) {
        let inVariation = this.pendingInStatements.get(keys[0]);
        if (!inVariation) {
          this.pendingInStatements.set(keys[0], inVariation = new PendingInStatements(this.rel, keys[0], findOptions));
        }
        this.whereVariations.set(whereKey, w = {
          result: inVariation.find(where)
        });
      } else {
        this.whereVariations.set(whereKey, w = {
          result: this.rel.find(findOptions)
        });
      }
    }
    return w.result;
  }
  constructor(rel) {
    this.rel = rel;
  }
  resolve() {
    const statements = [...this.pendingInStatements.values()];
    this.pendingInStatements.clear();
    for (const statement of statements) {
      statement.resolve();
    }
  }
  pendingInStatements = /* @__PURE__ */ new Map();
  whereVariations = /* @__PURE__ */ new Map();
};
var PendingInStatements = class {
  rel;
  key;
  options;
  resolve() {
    return __async(this, null, function* () {
      const values = [...this.values.values()];
      if (values.length == 1) {
        this.rel.find(this.options).then(values[0].resolve, values[0].reject);
        return;
      }
      var op = __spreadValues({}, this.options);
      op.where = { [this.key]: values.map((v) => v.value) };
      op.limit = 1e3;
      op.page = 1;
      let vals = [];
      try {
        while (true) {
          const val = yield this.rel.find(op);
          vals.push(...val);
          if (val.length < op.limit)
            break;
          op.page++;
        }
        for (const value of this.values.values()) {
          value.resolve(vals.filter((x2) => {
            const ref = getEntityRef(x2);
            const field = ref.fields.find(this.key);
            const rel = getRelationFieldInfo(field.metadata);
            const val = rel?.type === "reference" ? field.getId() : x2[this.key];
            return value.value == val;
          }));
        }
      } catch (err) {
        for (const value of this.values.values()) {
          value.reject(err);
        }
      }
    });
  }
  find(where) {
    const val = where[this.key];
    let valHandler = this.values.get(val);
    if (!valHandler) {
      let resolve;
      let reject;
      let result = new Promise((resolve1, reject1) => {
        resolve = resolve1;
        reject = reject1;
      });
      this.values.set(val, valHandler = {
        value: val,
        resolve,
        reject,
        result
      });
    }
    return valHandler.result;
  }
  values = /* @__PURE__ */ new Map();
  constructor(rel, key, options) {
    this.rel = rel;
    this.key = key;
    this.options = options;
  }
};

// ../node_modules/remult/esm/src/validators.js
var Validators = class _Validators {
  static required = createValidator((_, e) => __async(this, null, function* () {
    return e.value != null && e.value != void 0 && e.value !== "";
  }), "Should not be empty");
  static unique = createValidator((_, e) => __async(this, null, function* () {
    if (!e.entityRef)
      throw "unique validation may only work on columns that are attached to an entity";
    if (e.isBackend() && (e.isNew || e.valueChanged())) {
      return (yield e.entityRef.repository.count({
        [e.metadata.key]: e.value
      })) == 0;
    } else
      return true;
  }), "already exists");
  /**
   * @deprecated use `unique` instead - it also runs only on the backend
   */
  static uniqueOnBackend = createValidator((_, e) => __async(this, null, function* () {
    if (e.isBackend() && (e.isNew || e.valueChanged())) {
      return (yield e.entityRef.repository.count({
        [e.metadata.key]: e.value
      })) == 0;
    } else
      return true;
  }), _Validators.unique.defaultMessage);
  static regex = createValueValidatorWithArgs((val, regex) => regex.test(val));
  static email = createValueValidator((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Invalid Email");
  static url = createValueValidator((val) => !!new URL(val), "Invalid Url");
  static in = createValueValidatorWithArgs((val, values) => values.includes(val), (values) => `Value must be one of: ${values.map((y) => typeof y === "object" ? y["id"] !== void 0 ? y["id"] : y.toString() : y).join(", ")}`);
  static notNull = createValueValidator((val) => val != null, "Should not be null");
  static enum = createValueValidatorWithArgs((value, enumObj) => Object.values(enumObj).includes(value), (enumObj) => `Value must be one of ${getEnumValues(enumObj).join(", ")}`);
  static relationExists = createValidator((_, e) => __async(this, null, function* () {
    if (e.valueIsNull())
      return true;
    if (!e.isBackend())
      return true;
    return Boolean(yield e.load());
  }), "Relation value does not exist");
  static maxLength = createValueValidatorWithArgs((val, maxLength) => val.length <= maxLength, (maxLength) => `Value must be at most ${maxLength} characters`);
  static minLength = createValueValidatorWithArgs((val, minLength) => val.length >= minLength, (maxLength) => `Value must be at least ${maxLength} characters`);
  static defaultMessage = "Invalid value";
};
function createValidator(validate2, defaultMessage) {
  const validation = (entity, e, message) => __async(this, null, function* () {
    const valid = yield validate2(entity, e);
    if (typeof valid === "string" && valid.length > 0)
      e.error = valid;
    else if (!valid)
      e.error = typeof message === "function" && message(entity, e, void 0) || message || typeof defaultMessage === "function" && defaultMessage(entity, e, void 0) || defaultMessage || Validators.defaultMessage;
  });
  const result = (entityOrMessage, e, message) => {
    if (typeof entityOrMessage === "string" || entityOrMessage === "function" || entityOrMessage === void 0 && e === void 0) {
      return (entity, e2, message2) => __async(this, null, function* () {
        return yield validation(entity, e2, entityOrMessage || message2);
      });
    }
    return validation(entityOrMessage, e, message);
  };
  Object.defineProperty(result, "defaultMessage", {
    get: () => {
      return defaultMessage;
    },
    set: (val) => {
      defaultMessage = val;
    },
    enumerable: true
  });
  return Object.assign(result, {
    withMessage: (message) => (entity, e) => __async(this, null, function* () {
      return result(entity, e, message);
    })
  });
}
function valueValidator(validate2, defaultMessage) {
  return (entity, e) => validate2(e.value) || defaultMessage || false;
}
function createValueValidator(validate2, defaultMessage) {
  return createValidator((_, e) => {
    if (e.value === void 0 || e.value === null)
      return true;
    return validate2(e.value);
  }, defaultMessage);
}
function createValueValidatorWithArgs(validate2, defaultMessage) {
  const result = createValidatorWithArgsInternal((_, e, args) => {
    if (e.value === void 0 || e.value === null)
      return true;
    return validate2(e.value, args);
  }, (_, e, args) => typeof defaultMessage === "function" && defaultMessage(args) || defaultMessage, true);
  return Object.assign((entity, e) => result(entity, e), {
    get defaultMessage() {
      return defaultMessage;
    },
    set defaultMessage(val) {
      defaultMessage = val;
    }
  });
}
function createValidatorWithArgs(validate2, defaultMessage) {
  return createValidatorWithArgsInternal(validate2, defaultMessage);
}
function createValidatorWithArgsInternal(validate2, defaultMessage, isValueValidator = false) {
  const result = (args, message) => (entity, e) => __async(this, null, function* () {
    const valid = yield validate2(entity, e, args);
    if (typeof valid === "string")
      e.error = valid;
    else if (!valid)
      e.error = message ? typeof message === "function" ? isValueValidator ? message(args) : message(entity, e, args) : message : defaultMessage ? typeof defaultMessage === "function" ? defaultMessage(entity, e, args) : defaultMessage : Validators.defaultMessage;
  });
  return Object.assign(result, {
    get defaultMessage() {
      return defaultMessage;
    },
    set defaultMessage(val) {
      defaultMessage = val;
    }
  });
}
function getEnumValues(enumObj) {
  return Object.values(enumObj).filter((x2) => typeof enumObj[x2] !== "number");
}

// ../node_modules/remult/esm/src/remult3/addValidator.js
function addValidator(validators, newValidator, atStart = false) {
  if (!newValidator)
    return validators;
  const newValidators = Array.isArray(newValidator) ? newValidator : [newValidator];
  const validatorsArray = Array.isArray(validators) ? validators : validators ? [validators] : [];
  return atStart ? [...newValidators, ...validatorsArray] : [...validatorsArray, ...newValidators];
}

// ../node_modules/remult/esm/src/isOfType.js
function isOfType(obj, checkMethod) {
  return typeof obj[checkMethod] !== "undefined";
}

// ../node_modules/remult/esm/src/remult3/RepositoryImplementation.js
var classValidatorValidate = void 0;
var RepositoryImplementation = class _RepositoryImplementation {
  _entity;
  _remult;
  _dataProvider;
  _info;
  _defaultFindOptions;
  _notFoundError(id) {
    return {
      message: `id ${id} not found in entity ${this.metadata.key}`,
      httpStatusCode: 404
    };
  }
  [getInternalKey]() {
    return this;
  }
  _createAfterFilter(orderBy, lastRow) {
    return __async(this, null, function* () {
      let values = /* @__PURE__ */ new Map();
      for (const s of Sort.translateOrderByToSort(this.metadata, orderBy).Segments) {
        let existingVal = lastRow[s.field.key];
        values.set(s.field.key, existingVal);
      }
      let r = { $or: [] };
      let equalToColumn = [];
      for (const s of Sort.translateOrderByToSort(this.metadata, orderBy).Segments) {
        let f2 = {};
        for (const c of equalToColumn) {
          f2[c.key] = values.get(c.key);
        }
        equalToColumn.push(s.field);
        if (s.isDescending) {
          f2[s.field.key] = { $lt: values.get(s.field.key) };
        } else
          f2[s.field.key] = { $gt: values.get(s.field.key) };
        r.$or.push(f2);
      }
      return r;
    });
  }
  relations(item) {
    return new Proxy({}, {
      get: (target, key) => {
        const field = this.fields.find(key);
        const rel = getRelationFieldInfo(field);
        if (!rel)
          throw Error(key + " is not a relation");
        const { toRepo, returnNull, returnUndefined } = this._getFocusedRelationRepo(field, item);
        if (rel.type === "toMany")
          return toRepo;
        else
          return {
            findOne: (options) => {
              if (returnNull)
                return Promise.resolve(null);
              if (returnUndefined)
                return Promise.resolve(void 0);
              return toRepo.findFirst({}, options);
            }
          };
      }
    });
  }
  _getFocusedRelationRepo(field, item) {
    const rel = getRelationFieldInfo(field);
    let repo2 = rel.toRepo;
    let { findOptions, returnNull, returnUndefined } = this._findOptionsBasedOnRelation(rel, field, void 0, item, repo2);
    const toRepo = new _RepositoryImplementation(repo2._entity, repo2._remult, repo2._dataProvider, repo2._info, findOptions);
    return { toRepo, returnNull, returnUndefined };
  }
  __edp;
  get _edp() {
    return this.__edp ? this.__edp : this.__edp = this._dataProvider.getEntityDataProvider(this.metadata);
  }
  constructor(_entity, _remult, _dataProvider, _info, _defaultFindOptions) {
    this._entity = _entity;
    this._remult = _remult;
    this._dataProvider = _dataProvider;
    this._info = _info;
    this._defaultFindOptions = _defaultFindOptions;
  }
  _idCache = /* @__PURE__ */ new Map();
  _getCachedById(id, doNotLoadIfNotFound) {
    id = id + "";
    this._getCachedByIdAsync(id, doNotLoadIfNotFound);
    let r = this._idCache.get(id);
    if (r instanceof Promise)
      return void 0;
    return r;
  }
  _getCachedByIdAsync(id, doNotLoadIfNotFound) {
    return __async(this, null, function* () {
      id = id + "";
      let r = this._idCache.get(id);
      if (r instanceof Promise)
        return yield r;
      if (this._idCache.has(id)) {
        return r;
      }
      if (doNotLoadIfNotFound)
        return void 0;
      this._idCache.set(id, void 0);
      let row = this.findId(id).then((row2) => {
        if (row2 === void 0) {
          r = null;
        } else
          r = row2;
        this._idCache.set(id, r);
        return r;
      });
      this._idCache.set(id, row);
      return yield row;
    });
  }
  _addToCache(item) {
    if (item)
      this._idCache.set(this.getEntityRef(item).getId() + "", item);
  }
  get metadata() {
    return this._info;
  }
  listeners;
  addEventListener(listener) {
    if (!this.listeners)
      this.listeners = [];
    this.listeners.push(listener);
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
  }
  query(options) {
    return new QueryResultImpl(options, this);
  }
  getEntityRef(entity) {
    let x2 = entity[entityMember];
    if (!x2) {
      this._fixTypes(entity);
      x2 = new rowHelperImplementation(this._info, entity, this, this._edp, this._remult, true);
      Object.defineProperty(entity, entityMember, {
        //I've used define property to hide this member from console.lo g
        get: () => x2
      });
      x2.saveOriginalData();
    }
    return x2;
  }
  delete(item) {
    return __async(this, null, function* () {
      const ref = getEntityRef(item, false);
      if (ref)
        return ref.delete();
      if (typeof item === "string" || typeof item === "number")
        if (this._dataProvider.isProxy)
          return this._edp.delete(item);
        else {
          let ref22 = yield this.findId(item);
          if (!ref22)
            throw this._notFoundError(item);
          return yield getEntityRef(ref22).delete();
        }
      let ref2 = this._getRefForExistingRow(item, void 0);
      if (!this._dataProvider.isProxy)
        yield ref2.reload();
      return ref2.delete();
    });
  }
  insert(entity) {
    return __async(this, null, function* () {
      if (Array.isArray(entity)) {
        if (this._dataProvider.isProxy) {
          let refs = [];
          let raw = [];
          for (const item of entity) {
            let ref = getEntityRef(entity, false);
            if (ref) {
              if (!ref.isNew())
                throw "Item is not new";
            } else {
              ref = yield this.getEntityRef(this.create(item));
            }
            refs.push(ref);
            raw.push(yield ref.buildDtoForInsert());
          }
          return promiseAll(yield this._edp.insertMany(raw), (item, i) => refs[i].processInsertResponseDto(item));
        } else {
          let r = [];
          for (const item of entity) {
            r.push(yield this.insert(item));
          }
          return r;
        }
      } else {
        let ref = getEntityRef(entity, false);
        if (ref) {
          if (!ref.isNew())
            throw "Item is not new";
          return yield ref.save();
        } else {
          return yield this.getEntityRef(this.create(entity)).save();
        }
      }
    });
  }
  get fields() {
    return this.metadata.fields;
  }
  validate(entity, ...fields) {
    return __async(this, null, function* () {
      {
        let ref = getEntityRef(entity, false);
        if (!ref)
          ref = this.getEntityRef(__spreadValues({}, entity));
        if (!fields || fields.length === 0) {
          return yield ref.validate();
        } else {
          ref.__clearErrorsAndReportChanged();
          let hasError = false;
          for (const f2 of fields) {
            if (!(yield ref.fields.find(f2).validate()))
              hasError = true;
          }
          if (!hasError)
            return void 0;
          return ref.buildErrorInfoObject();
        }
      }
    });
  }
  updateMany(_0) {
    return __async(this, arguments, function* ({ where, set }) {
      Filter.throwErrorIfFilterIsEmpty(where, "updateMany");
      if (this._dataProvider.isProxy) {
        return this._edp.updateMany(yield this._translateWhereToFilter(where), set);
      } else {
        let updated = 0;
        try {
          for (var iter = __forAwait(this.query({ where })), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
            const item = temp.value;
            assign(item, set);
            yield getEntityRef(item).save();
            updated++;
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && (yield temp.call(iter));
          } finally {
            if (error)
              throw error[0];
          }
        }
        return updated;
      }
    });
  }
  update(id, entity) {
    return __async(this, null, function* () {
      {
        let ref2 = getEntityRef(entity, false);
        if (ref2)
          return yield ref2.save();
      }
      {
        let ref2 = getEntityRef(id, false);
        if (ref2) {
          assign(id, entity);
          return ref2.save();
        }
      }
      let ref;
      if (typeof id === "object") {
        ref = this._getRefForExistingRow(id, this.metadata.idMetadata.getId(id));
        Object.assign(ref.instance, entity);
      } else
        ref = this._getRefForExistingRow(entity, id);
      if (this._dataProvider.isProxy) {
        return yield ref.save(Object.keys(entity));
      } else {
        const r = yield ref.reload();
        if (!r)
          throw this._notFoundError(ref.id);
        for (const key in entity) {
          if (Object.prototype.hasOwnProperty.call(entity, key)) {
            let f2 = ref.fields[key];
            if (entity[key] === void 0 && getRelationFieldInfo(f2.metadata))
              continue;
            if (f2)
              r[key] = entity[key];
          }
        }
        yield this._fixTypes(r);
        return yield ref.save();
      }
    });
  }
  _getRefForExistingRow(entity, id) {
    let ref = getEntityRef(entity, false);
    if (!ref) {
      const instance = new this._entity(this._remult);
      for (const field of this._fieldsOf(entity)) {
        instance[field.key] = entity[field.key];
      }
      this._fixTypes(instance);
      let row = new rowHelperImplementation(this._info, instance, this, this._edp, this._remult, false);
      if (typeof id === "object")
        id = this.metadata.idMetadata.getId(id);
      if (id) {
        row.id = id;
        row.originalId = id;
      } else
        row.id = row.getId();
      ref = row;
      Object.defineProperty(instance, entityMember, {
        get: () => row
      });
    }
    return ref;
  }
  save(entity) {
    return __async(this, null, function* () {
      if (Array.isArray(entity)) {
        return promiseAll(entity, (x2) => this.save(x2));
      } else {
        let ref = getEntityRef(entity, false);
        if (ref)
          return yield ref.save();
        else if (entity instanceof EntityBase) {
          return yield this.getEntityRef(entity).save();
        } else {
          let id = this.metadata.idMetadata.getId(entity);
          if (id === void 0)
            return this.insert(entity);
          return this.update(id, entity);
        }
      }
    });
  }
  liveQuery(options) {
    if (!options)
      options = {};
    return {
      subscribe: (l) => {
        let listener = l;
        if (typeof l === "function") {
          listener = {
            next: l,
            complete: () => {
            },
            error: () => {
            }
          };
        }
        listener.error ??= () => {
        };
        listener.complete ??= () => {
        };
        return this._remult.liveQuerySubscriber.subscribe(this, options, listener);
      }
    };
  }
  _rawFind(options, skipOrderByAndLimit = false, loader) {
    return __async(this, null, function* () {
      if (!options)
        options = {};
      if (this._defaultFindOptions) {
        options = __spreadValues(__spreadValues({}, this._defaultFindOptions), options);
      }
      let opt = yield this._buildEntityDataProviderFindOptions(options);
      if (skipOrderByAndLimit) {
        delete opt.orderBy;
        delete opt.limit;
      }
      Remult.onFind(this._info, options);
      const rawRows = yield this._edp.find(opt);
      let result = yield this._loadManyToOneForManyRows(rawRows, options, loader);
      return result;
    });
  }
  find(options, skipOrderByAndLimit = false) {
    return __async(this, null, function* () {
      const loader = new RelationLoader();
      const result = yield this._rawFind(options, skipOrderByAndLimit, loader);
      yield loader.resolveAll();
      return result;
    });
  }
  _buildEntityDataProviderFindOptions(options) {
    return __async(this, null, function* () {
      let opt = {};
      opt = {};
      if (!options.orderBy || Object.keys(options.orderBy).length === 0) {
        options.orderBy = this._info.entityInfo.defaultOrderBy;
      }
      opt.where = yield this._translateWhereToFilter(options.where);
      if (options.orderBy !== void 0)
        opt.orderBy = Sort.translateOrderByToSort(this.metadata, options.orderBy);
      if (options.limit !== void 0)
        opt.limit = options.limit;
      if (options.page !== void 0)
        opt.page = options.page;
      return opt;
    });
  }
  _fromJsonArray(jsonItems, loadOptions) {
    return __async(this, null, function* () {
      const loader = new RelationLoader();
      const result = yield this._loadManyToOneForManyRows(jsonItems.map((row) => {
        let result2 = {};
        for (const col of this.metadata.fields.toArray()) {
          result2[col.key] = col.valueConverter.fromJson(row[col.key]);
        }
        return result2;
      }), loadOptions, loader);
      yield loader.resolveAll();
      return result;
    });
  }
  _loadManyToOneForManyRows(rawRows, loadOptions, loader) {
    return __async(this, null, function* () {
      let loadFields = void 0;
      if (loadOptions?.load)
        loadFields = loadOptions.load(this.metadata.fields);
      for (const col of this.metadata.fields) {
        let ei = getEntitySettings(col.valueType, false);
        if (ei) {
          let isRelation = getRelationFieldInfo(col);
          if (!isRelation) {
            let load = !col.options.lazy;
            if (loadFields !== void 0)
              load = loadFields.includes(col);
            if (load) {
              let repo2 = this._remult.repo(col.valueType);
              let toLoad = [];
              for (const r of rawRows) {
                let val = r[col.key];
                if (val !== void 0 && val !== null && !toLoad.includes(val) && !repo2._idCache.has(val + "")) {
                  toLoad.push(val);
                }
              }
              if (toLoad.length > 0) {
                yield loadManyToOne(repo2, toLoad);
              }
            }
          }
        }
      }
      function loadManyToOne(repo2, toLoad) {
        return __async(this, null, function* () {
          let rows = yield repo2.find({ where: repo2.metadata.idMetadata.getIdFilter(...toLoad) }, true);
          for (const r of rows) {
            repo2._addToCache(r);
          }
        });
      }
      let result = yield promiseAll(rawRows, (r) => __async(this, null, function* () {
        return yield this._mapRawDataToResult(r, loadFields);
      }));
      for (const col of this.metadata.fields) {
        let rel = getRelationFieldInfo(col);
        let incl = col.options.defaultIncluded;
        if (loadOptions?.include?.[col.key] !== void 0) {
          incl = loadOptions.include[col.key];
        }
        if (rel && incl) {
          const otherRepo = rel.toRepo;
          for (const row of result) {
            let { findOptions, returnNull } = this._findOptionsBasedOnRelation(rel, col, incl, row, otherRepo);
            if (returnNull)
              row[col.key] = null;
            else {
              const entityType = rel.toEntity;
              const toRepo = otherRepo;
              loader.load({
                entityType,
                find: (options) => toRepo._rawFind(options, false, loader),
                metadata: toRepo.metadata
              }, findOptions).then((result2) => {
                if (result2.length == 0 && rel.type == "toOne")
                  return;
                row[col.key] = rel.type !== "toMany" ? result2.length == 0 ? null : result2[0] : result2;
              });
            }
          }
        }
      }
      return result;
    });
  }
  /*@internal */
  _findOptionsBasedOnRelation(rel, field, moreFindOptions, row, otherRepo) {
    let returnNull = false;
    let returnUndefined = false;
    let where = [];
    let findOptions = {};
    let findOptionsSources = [];
    if (typeof rel.options.findOptions === "function") {
      findOptionsSources.push(rel.options.findOptions(row));
    } else if (typeof rel.options.findOptions === "object")
      findOptionsSources.push(rel.options.findOptions);
    if (typeof moreFindOptions === "object") {
      findOptionsSources.push(moreFindOptions);
    }
    for (const source of findOptionsSources) {
      if (source.where)
        where.push(source.where);
      for (const key of [
        "limit",
        "include",
        "orderBy"
      ]) {
        if (source[key])
          findOptions[key] = source[key];
      }
    }
    const relFields = rel.getFields();
    const getFieldValue = (key) => {
      let val = rel.type === "reference" ? getEntityRef(row).fields.find(field.key).getId() : row[key];
      if (rel.type === "toOne" || rel.type === "reference") {
        if (val === null)
          returnNull = true;
        else if (val === void 0)
          returnUndefined = true;
        else if (rel.type === "reference" && typeof val === "object")
          val = otherRepo.metadata.idMetadata.getId(val);
      }
      return val;
    };
    if (relFields.compoundIdField)
      if (rel.type === "toMany") {
        where.push({
          [relFields.compoundIdField]: this.metadata.idMetadata.getId(row)
        });
      } else {
        where.push(otherRepo.metadata.idMetadata.getIdFilter(getFieldValue(relFields.compoundIdField)));
      }
    for (const key in relFields.fields) {
      if (Object.prototype.hasOwnProperty.call(relFields.fields, key)) {
        where.push({ [key]: getFieldValue(relFields.fields[key]) });
      }
    }
    findOptions.where = { $and: where };
    if ((rel.type === "toOne" || rel.type === "reference") && findOptions.orderBy)
      findOptions.limit = 1;
    return { findOptions, returnNull, returnUndefined };
  }
  _mapRawDataToResult(r, loadFields) {
    return __async(this, null, function* () {
      if (!r)
        return void 0;
      let x2 = new this._entity(this._remult);
      let helper = new rowHelperImplementation(this._info, x2, this, this._edp, this._remult, false);
      Object.defineProperty(x2, entityMember, {
        //I've used define property to hide this member from console.lo g
        get: () => helper
      });
      yield helper.loadDataFrom(r, loadFields);
      helper.saveOriginalData();
      return x2;
    });
  }
  toJson(item) {
    if (item === void 0 || item === null)
      return item;
    if (Array.isArray(item))
      return item.map((x2) => this.toJson(x2));
    if (typeof item.then === "function")
      return item.then((x2) => this.toJson(x2));
    return this.getEntityRef(item).toApiJson(true);
  }
  fromJson(json, newRow) {
    if (json === null || json === void 0)
      return json;
    if (Array.isArray(json))
      return json.map((item) => this.fromJson(item, newRow));
    let result = new this._entity(this._remult);
    for (const col of this._fieldsOf(json)) {
      let ei = getEntitySettings(col.valueType, false);
      if (ei) {
        let val = json[col.key];
        if (typeof val === "string" || typeof val === "number")
          result[col.key] = val;
        else
          result[col.key] = this._remult.repo(col.valueType).fromJson(val);
      } else {
        if (json[col.key] !== void 0) {
          result[col.key] = col.valueConverter.fromJson(json[col.key]);
        }
      }
    }
    this._fixTypes(result);
    if (newRow) {
      return this.create(result);
    } else {
      let row = new rowHelperImplementation(this._info, result, this, this._edp, this._remult, false);
      Object.defineProperty(result, entityMember, {
        //I've used define property to hide this member from console.lo g
        get: () => row
      });
      row.saveOriginalData();
      return result;
    }
  }
  count(where) {
    return __async(this, null, function* () {
      return this._edp.count(yield this._translateWhereToFilter(where));
    });
  }
  deleteMany(_0) {
    return __async(this, arguments, function* ({ where }) {
      Filter.throwErrorIfFilterIsEmpty(where, "deleteMany");
      if (this._dataProvider.isProxy) {
        return this._edp.deleteMany(yield this._translateWhereToFilter(where));
      } else {
        let deleted = 0;
        try {
          for (var iter = __forAwait(this.query({ where })), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
            const item = temp.value;
            yield getEntityRef(item).delete();
            deleted++;
          }
        } catch (temp) {
          error = [temp];
        } finally {
          try {
            more && (temp = iter.return) && (yield temp.call(iter));
          } finally {
            if (error)
              throw error[0];
          }
        }
        return deleted;
      }
    });
  }
  _cache = /* @__PURE__ */ new Map();
  findOne(options, skipOrderByAndLimit = false) {
    return __async(this, null, function* () {
      let r;
      let cacheInfo;
      if (!options)
        options = {};
      if (options.useCache) {
        let f2 = findOptionsToJson(options, this.metadata);
        let key = JSON.stringify(f2);
        cacheInfo = this._cache.get(key);
        if (cacheInfo !== void 0) {
          if (cacheInfo.value && this.getEntityRef(cacheInfo.value).wasDeleted()) {
            cacheInfo = void 0;
            this._cache.delete(key);
          } else
            return this._cache.get(key).promise;
        } else {
          cacheInfo = {
            value: void 0,
            promise: void 0
          };
          this._cache.set(key, cacheInfo);
        }
      }
      r = this.find(__spreadProps(__spreadValues({}, options), { limit: 1 }), skipOrderByAndLimit).then((items) => __async(this, null, function* () {
        let r2 = void 0;
        if (items.length > 0)
          r2 = items[0];
        if (!r2 && options.createIfNotFound) {
          r2 = this.create();
          if (options.where) {
            yield __updateEntityBasedOnWhere(this.metadata, options.where, r2);
          }
        }
        return r2;
      }));
      if (cacheInfo) {
        cacheInfo.promise = r = r.then((r2) => {
          cacheInfo.value = r2;
          return r2;
        });
      }
      return r;
    });
  }
  findFirst(where, options, skipOrderByAndLimit = false) {
    return __async(this, null, function* () {
      if (!options)
        options = {};
      if (where) {
        if (options.where) {
          let w = options.where;
          options.where = {
            $and: [w, where]
          };
        } else
          options.where = where;
      }
      return this.findOne(options, skipOrderByAndLimit);
    });
  }
  _fieldsOf(item) {
    let keys = Object.keys(item);
    return this.metadata.fields.toArray().filter((x2) => keys.includes(x2.key));
  }
  create(item) {
    let r = new this._entity(this._remult);
    if (item) {
      for (const field of this._fieldsOf(item)) {
        r[field.key] = item[field.key];
      }
      this._fixTypes(r);
    }
    if (this._defaultFindOptions?.where) {
      __updateEntityBasedOnWhere(this.metadata, this._defaultFindOptions.where, r);
      this._fixTypes(r);
    }
    let z = this.getEntityRef(r);
    return r;
  }
  _fixTypes(item) {
    return __async(this, null, function* () {
      for (const field of this._fieldsOf(item)) {
        const val = item[field.key];
        if (val !== null && val !== void 0) {
          if (field.valueType === Date && !(val instanceof Date))
            item[field.key] = field.valueConverter.fromJson(field.valueConverter.toJson(val));
          else
            for (const [type, typeName] of [
              [String, "string"],
              [Number, "number"],
              [Boolean, "boolean"]
            ]) {
              if (field.valueType === type && typeof val !== typeName)
                item[field.key] = field.valueConverter.fromJson(field.valueConverter.toJson(val));
            }
        }
      }
      return item;
    });
  }
  findId(id, options) {
    if (id === null || id === void 0)
      return null;
    if (typeof id !== "string" && typeof id !== "number")
      throw new Error("id can be either number or string, but got: " + typeof id);
    return this.findFirst({}, __spreadProps(__spreadValues({}, options), {
      where: this.metadata.idMetadata.getIdFilter(id)
    }), true);
  }
  _translateWhereToFilter(where) {
    return __async(this, null, function* () {
      if (!where)
        where = {};
      if (this._defaultFindOptions?.where) {
        let z = where;
        where = {
          $and: [z, this._defaultFindOptions?.where]
        };
      }
      if (!this._dataProvider.isProxy) {
        if (this.metadata.options.backendPreprocessFilter) {
          where = yield this.metadata.options.backendPreprocessFilter(where, {
            metadata: this.metadata,
            getFilterPreciseValues: (filter) => Filter.getPreciseValues(this.metadata, filter || where)
          });
        }
        if (this.metadata.options.backendPrefilter) {
          let z = where;
          where = {
            $and: [
              z,
              yield Filter.resolve(this.metadata.options.backendPrefilter)
            ]
          };
        }
      }
      let r = yield Filter.fromEntityFilter(this.metadata, where);
      if (r && !this._dataProvider.isProxy) {
        r = yield Filter.translateCustomWhere(r, this.metadata, this._remult);
      }
      return r;
    });
  }
};
function createOldEntity(entity, remult2) {
  let r = remultStatic.columnsOfType.get(entity);
  if (!r)
    remultStatic.columnsOfType.set(entity, r = []);
  let info = getEntitySettings(entity)(remult2);
  let key = getEntityKey(entity);
  let base = Object.getPrototypeOf(entity);
  while (base != null) {
    let baseCols = remultStatic.columnsOfType.get(base);
    if (baseCols) {
      r.unshift(...baseCols.filter((x2) => !r.find((y) => y.key == x2.key)));
    }
    let baseSettingsFactory = getEntitySettings(base, false);
    if (baseSettingsFactory) {
      let baseSettings = baseSettingsFactory(remult2);
      info = __spreadValues(__spreadValues({}, baseSettings), info);
      let functions = [
        "saving",
        "saved",
        "deleting",
        "deleted",
        "validation"
      ];
      for (const key2 of functions) {
        if (baseSettings[key2] && baseSettings[key2] !== info[key2]) {
          let x2 = info[key2];
          info[key2] = (a, b) => __async(this, null, function* () {
            yield x2(a, b);
            yield baseSettings[key2](a, b);
          });
        }
      }
    }
    base = Object.getPrototypeOf(base);
  }
  return new EntityFullInfo(prepareColumnInfo(r, remult2), info, remult2, entity, key);
}
var rowHelperBase = class {
  fieldsMetadata;
  instance;
  remult;
  isNewRow;
  _error;
  get error() {
    this._subscribers?.reportObserved();
    return this._error;
  }
  set error(val) {
    this._error = val;
    this._subscribers?.reportChanged();
  }
  constructor(fieldsMetadata, instance, remult2, isNewRow) {
    this.fieldsMetadata = fieldsMetadata;
    this.instance = instance;
    this.remult = remult2;
    this.isNewRow = isNewRow;
    {
      let fac = remult2;
      if (fac != null && fac.iAmRemultProxy) {
        remult2 = remultStatic.remultFactory();
      }
    }
    for (const col of fieldsMetadata) {
      let ei = getEntitySettings(col.valueType, false);
      if (ei && remult2) {
        let lookup = new LookupColumn(remult2.repo(col.valueType), Boolean(getRelationFieldInfo(col)), col.allowNull);
        this.lookups.set(col.key, lookup);
        let val = instance[col.key];
        let refImpl;
        Object.defineProperty(instance, col.key, {
          get: () => {
            if (this._subscribers) {
              this._subscribers.reportObserved();
              if (!refImpl) {
                refImpl = this.fields.find(col.key);
                if (!refImpl._subscribers) {
                  refImpl._subscribers = new SubscribableImp();
                }
              }
              refImpl._subscribers.reportObserved();
            }
            return lookup.item;
          },
          set: (val2) => {
            lookup.set(val2);
            this._subscribers?.reportChanged();
            if (!refImpl) {
              refImpl = this.fields.find(col.key);
              if (!refImpl._subscribers) {
                refImpl._subscribers = new SubscribableImp();
              }
            }
            refImpl._subscribers.reportChanged();
          },
          enumerable: true
        });
        lookup.set(val);
      } else if (getRelationFieldInfo(col)?.type === "toOne") {
        let hasVal = instance.hasOwnProperty(col.key);
        let val = instance[col.key];
        if (isNewRow && !val)
          hasVal = false;
        Object.defineProperty(instance, col.key, {
          get: () => {
            return val;
          },
          set: (newVal) => {
            val = newVal;
            if (newVal === void 0)
              return;
            const op = col.options;
            if (op.field) {
              this.instance[op.field] = getRelationFieldInfo(col).toRepo.metadata.idMetadata.getId(newVal);
            }
            if (op.fields) {
              for (const key in op.fields) {
                if (Object.prototype.hasOwnProperty.call(op.fields, key)) {
                  const element = op.fields[key];
                  this.instance[element] = newVal == null ? null : newVal[key];
                }
              }
            }
          },
          enumerable: true
        });
        if (hasVal)
          instance[col.key] = val;
      }
    }
  }
  _subscribers;
  subscribe(listener) {
    this.initSubscribers();
    return this._subscribers.subscribe(listener);
  }
  _isLoading = false;
  initSubscribers() {
    if (!this._subscribers) {
      this._subscribers = new SubscribableImp();
      for (const col of this.fieldsMetadata) {
        let ei = getEntitySettings(col.valueType, false);
        let refImpl = this.fields.find(col.key);
        refImpl._subscribers = new SubscribableImp();
        if (ei && this.remult) {
        } else {
          let val = this.instance[col.key];
          Object.defineProperty(this.instance, col.key, {
            get: () => {
              this._subscribers.reportObserved();
              refImpl._subscribers.reportObserved();
              return val;
            },
            set: (value) => {
              val = value;
              this._subscribers.reportChanged();
              refImpl._subscribers.reportChanged();
            },
            enumerable: true
          });
        }
      }
    }
  }
  get isLoading() {
    this._subscribers?.reportObserved();
    return this._isLoading;
  }
  set isLoading(val) {
    this._isLoading = val;
    this._subscribers?.reportChanged();
  }
  lookups = /* @__PURE__ */ new Map();
  waitLoad() {
    return __async(this, null, function* () {
      yield promiseAll([...this.lookups.values()], (x2) => x2.waitLoad());
    });
  }
  errors;
  __assertValidity() {
    if (!this.hasErrors())
      throw this.buildErrorInfoObject();
  }
  buildErrorInfoObject() {
    let error = {
      modelState: Object.assign({}, this.errors),
      message: this.error
    };
    if (!error.message) {
      for (const col of this.fieldsMetadata) {
        if (this.errors[col.key]) {
          error.message = this.fields[col.key].metadata.caption + ": " + this.errors[col.key];
          this.error = error.message;
          break;
        }
      }
    }
    return error;
  }
  catchSaveErrors(err) {
    let e = err;
    if (e instanceof Promise) {
      return e.then((x2) => this.catchSaveErrors(x2));
    }
    if (e.error) {
      e = e.error;
    }
    if (e.message)
      this.error = e.message;
    else if (e.Message)
      this.error = e.Message;
    else
      this.error = e;
    let s = e.modelState;
    if (!s)
      s = e.ModelState;
    if (s) {
      this.errors = s;
    }
    throw err;
  }
  __clearErrorsAndReportChanged() {
    this.errors = void 0;
    this.error = void 0;
    this._reportChangedToEntityAndFields();
  }
  _reportChangedToEntityAndFields() {
    if (this._subscribers) {
      this._subscribers.reportChanged();
      for (const field of this.fields) {
        let ref = field;
        ref._subscribers.reportChanged();
      }
    }
  }
  hasErrors() {
    this._subscribers?.reportObserved();
    return !!!this.error && this.errors == void 0;
  }
  copyDataToObject(isNew = false) {
    let d = {};
    for (const col of this.fieldsMetadata) {
      let lu = this.lookups.get(col.key);
      let val = void 0;
      const rel = getRelationFieldInfo(col);
      if (lu)
        val = lu.id;
      else
        val = this.instance[col.key];
      if (rel && isNew && !col.allowNull && (val === void 0 || val === null)) {
        if (rel.toRepo.metadata.idMetadata.field.valueType === Number)
          val = 0;
        else
          val = "";
      }
      if (!rel || rel.type === "reference") {
        if (val !== void 0) {
          val = col.valueConverter.toJson(val);
          if (val !== void 0 && val !== null)
            val = col.valueConverter.fromJson(JSON.parse(JSON.stringify(val)));
        }
        d[col.key] = val;
      }
    }
    return d;
  }
  originalValues = {};
  saveOriginalData() {
    this.originalValues = this.copyDataToObject();
    this.saveMoreOriginalData();
  }
  saveMoreOriginalData() {
  }
  validate() {
    return __async(this, null, function* () {
      this.__clearErrorsAndReportChanged();
      if (classValidatorValidate)
        yield classValidatorValidate(this.instance, this);
      yield this.__performColumnAndEntityValidations();
      let r = this.hasErrors();
      if (!this.hasErrors())
        return this.buildErrorInfoObject();
      else
        return void 0;
    });
  }
  __validateEntity() {
    return __async(this, null, function* () {
      this.__clearErrorsAndReportChanged();
      if (classValidatorValidate)
        yield classValidatorValidate(this.instance, this);
      yield this.__performColumnAndEntityValidations();
      this.__assertValidity();
    });
  }
  __performColumnAndEntityValidations() {
    return __async(this, null, function* () {
    });
  }
  toApiJson(includeRelatedEntities = false, notJustApi = false) {
    let result = {};
    for (const col of this.fieldsMetadata) {
      if (notJustApi || !this.remult || col.includedInApi(this.instance)) {
        let val;
        let lu = this.lookups.get(col.key);
        let disable = false;
        if (lu)
          if (includeRelatedEntities) {
            val = lu.toJson();
            disable = true;
            result[col.key] = val;
          } else
            val = lu.id;
        else {
          if (getRelationFieldInfo(col) && !includeRelatedEntities) {
            disable = true;
          } else {
            val = this.instance[col.key];
            if (!this.remult) {
              if (val) {
                let eo = getEntitySettings(val.constructor, false);
                if (eo) {
                  val = getEntityRef(val).getId();
                }
              }
            }
          }
        }
        if (!disable)
          result[col.key] = col.valueConverter.toJson(val);
      }
    }
    return result;
  }
  _updateEntityBasedOnApi(body, ignoreApiAllowed = false) {
    return __async(this, null, function* () {
      let keys = Object.keys(body);
      for (const col of this.fieldsMetadata) {
        if (keys.includes(col.key)) {
          if (col.includedInApi(this.instance)) {
            if (!this.remult || ignoreApiAllowed || col.apiUpdateAllowed(this.instance)) {
              let lu = this.lookups.get(col.key);
              if (lu)
                lu.id = body[col.key];
              else
                this.instance[col.key] = col.valueConverter.fromJson(body[col.key]);
            }
          }
        }
      }
      yield promiseAll([...this.fields].filter((f2) => !getRelationFieldInfo(f2.metadata)), (x2) => x2.load());
    });
  }
};
var rowHelperImplementation = class extends rowHelperBase {
  info;
  repository;
  edp;
  _isNew;
  constructor(info, instance, repository, edp, remult2, _isNew) {
    super(info.fieldsMetadata, instance, remult2, _isNew);
    this.info = info;
    this.repository = repository;
    this.edp = edp;
    this._isNew = _isNew;
    this.metadata = info;
    if (_isNew) {
      for (const col of info.fieldsMetadata) {
        if (col.options.defaultValue && instance[col.key] === void 0) {
          if (typeof col.options.defaultValue === "function") {
            instance[col.key] = col.options.defaultValue(instance);
          } else if (!instance[col.key])
            instance[col.key] = col.options.defaultValue;
        }
      }
    }
    if (this.info.options.entityRefInit)
      this.info.options.entityRefInit(this, instance);
    if (Remult.entityRefInit)
      Remult.entityRefInit(this, instance);
  }
  clone() {
    const data = this.toApiJson(true, true);
    return this.repository.fromJson(data, this.isNew());
  }
  get relations() {
    return this.repository.relations(this.instance);
  }
  get apiUpdateAllowed() {
    return this.remult.isAllowedForInstance(this.instance, this.metadata.options.allowApiUpdate);
  }
  get apiDeleteAllowed() {
    return this.remult.isAllowedForInstance(this.instance, this.metadata.options.allowApiDelete);
  }
  get apiInsertAllowed() {
    return this.remult.isAllowedForInstance(this.instance, this.metadata.options.allowApiInsert);
  }
  metadata;
  getId() {
    const getVal = (y) => {
      let z = this.lookups.get(y.key);
      if (z)
        return z.id;
      return this.instance[y.key];
    };
    if (this.metadata.idMetadata.field instanceof CompoundIdField)
      return this.metadata.idMetadata.field.getId(getVal);
    return getVal(this.metadata.idMetadata.field);
  }
  saveMoreOriginalData() {
    this.originalId = this.getId();
  }
  _wasDeleted = false;
  wasDeleted() {
    this._subscribers?.reportObserved();
    return this._wasDeleted;
  }
  undoChanges() {
    this.loadDataFrom(this.originalValues);
    this.__clearErrorsAndReportChanged();
  }
  reload() {
    return __async(this, null, function* () {
      yield this.edp.find({ where: yield this.getIdFilter() }).then((newData) => __async(this, null, function* () {
        if (newData.length === 0)
          throw this.repository._notFoundError(this.id);
        yield this.loadDataFrom(newData[0]);
        this.saveOriginalData();
      }));
      this._reportChangedToEntityAndFields();
      return this.instance;
    });
  }
  _columns;
  get fields() {
    if (!this._columns) {
      let _items = [];
      let r = {
        find: (c) => r[typeof c === "string" ? c : c.key],
        [Symbol.iterator]: () => _items[Symbol.iterator](),
        toArray: () => _items
      };
      for (const c of this.info.fieldsMetadata) {
        _items.push(r[c.key] = new FieldRefImplementation(c.options, c, this.instance, this, this));
      }
      this._columns = r;
    }
    return this._columns;
  }
  _saving = false;
  save(onlyTheseFieldsSentOnlyInTheCaseOfProxySaveWithPartialObject) {
    return __async(this, null, function* () {
      try {
        if (this._saving)
          throw new Error("cannot save while entity is already saving");
        this._saving = true;
        if (this.wasDeleted())
          throw new Error("cannot save a deleted row");
        this.isLoading = true;
        if (onlyTheseFieldsSentOnlyInTheCaseOfProxySaveWithPartialObject === void 0)
          yield this.__validateEntity();
        let doNotSave = false;
        let e = this.buildLifeCycleEvent(() => doNotSave = true);
        if (!this.repository._dataProvider.isProxy) {
          for (const col of this.fields) {
            if (col.metadata.options.saving)
              yield col.metadata.options.saving(this.instance, col, e);
          }
          if (this.info.entityInfo.saving) {
            yield this.info.entityInfo.saving(this.instance, e);
          }
        }
        this.__assertValidity();
        let d = this.copyDataToObject(this.isNew());
        let ignoreKeys = [];
        for (const field of this.metadata.fields) {
          if (field.dbReadOnly || onlyTheseFieldsSentOnlyInTheCaseOfProxySaveWithPartialObject !== void 0 && !onlyTheseFieldsSentOnlyInTheCaseOfProxySaveWithPartialObject.includes(field.key)) {
            d[field.key] = void 0;
            ignoreKeys.push(field.key);
            let f2 = this.fields.find(field);
            f2.value = f2.originalValue;
          }
        }
        let updatedRow;
        let isNew = this.isNew();
        try {
          this._subscribers?.reportChanged();
          if (this.isNew()) {
            updatedRow = yield this.edp.insert(d);
          } else {
            let changesOnly = {};
            let wasChanged = false;
            for (const key in d) {
              if (Object.prototype.hasOwnProperty.call(d, key)) {
                const element = d[key];
                if (this.fields.find(key).valueChanged() && !ignoreKeys.includes(key)) {
                  changesOnly[key] = element;
                  wasChanged = true;
                }
              }
            }
            if (!wasChanged)
              return this.instance;
            if (doNotSave) {
              updatedRow = (yield this.edp.find({ where: yield this.getIdFilter() }))[0];
            } else {
              updatedRow = yield this.edp.update(this.id, changesOnly);
            }
          }
          yield this.loadDataFrom(updatedRow);
          e.id = this.getId();
          if (!this.repository._dataProvider.isProxy) {
            if (this.info.entityInfo.saved)
              yield this.info.entityInfo.saved(this.instance, e);
            if (this.repository.listeners)
              for (const listener of this.repository.listeners.filter((x2) => x2.saved)) {
                yield listener.saved(this.instance, isNew);
              }
          }
          yield this.repository._remult.liveQueryPublisher.itemChanged(this.repository.metadata.key, [{ id: this.getId(), oldId: this.getOriginalId(), deleted: false }]);
          this.saveOriginalData();
          this._isNew = false;
          return this.instance;
        } catch (err) {
          yield this.catchSaveErrors(err);
        }
      } finally {
        this.isLoading = false;
        this._reportChangedToEntityAndFields();
        this._saving = false;
      }
    });
  }
  processInsertResponseDto(updatedRow) {
    return __async(this, null, function* () {
      yield this.loadDataFrom(updatedRow);
      this.saveOriginalData();
      this._isNew = false;
      return this.instance;
    });
  }
  buildDtoForInsert() {
    return __async(this, null, function* () {
      yield this.__validateEntity();
      this.__assertValidity();
      let d = this.copyDataToObject(this.isNew());
      let ignoreKeys = [];
      for (const field of this.metadata.fields) {
        if (field.dbReadOnly) {
          d[field.key] = void 0;
          ignoreKeys.push(field.key);
          let f2 = this.fields.find(field);
          f2.value = f2.originalValue;
        }
      }
      return d;
    });
  }
  buildLifeCycleEvent(preventDefault = () => {
  }) {
    const self2 = this;
    return {
      isNew: self2.isNew(),
      fields: self2.fields,
      id: self2.getId(),
      originalId: self2.getOriginalId(),
      metadata: self2.repository.metadata,
      repository: self2.repository,
      preventDefault: () => preventDefault(),
      relations: self2.repository.relations(self2.instance)
    };
  }
  getIdFilter() {
    return __async(this, null, function* () {
      return yield this.repository._translateWhereToFilter(this.repository.metadata.idMetadata.getIdFilter(this.id));
    });
  }
  delete() {
    return __async(this, null, function* () {
      this.__clearErrorsAndReportChanged();
      let doDelete = true;
      let e = this.buildLifeCycleEvent(() => doDelete = false);
      if (!this.repository._dataProvider.isProxy) {
        if (this.info.entityInfo.deleting)
          yield this.info.entityInfo.deleting(this.instance, e);
      }
      this.__assertValidity();
      try {
        if (doDelete)
          yield this.edp.delete(this.id);
        if (!this.repository._dataProvider.isProxy) {
          if (this.info.entityInfo.deleted)
            yield this.info.entityInfo.deleted(this.instance, e);
        }
        if (this.repository.listeners)
          for (const listener of this.repository.listeners.filter((x2) => x2.deleted)) {
            yield listener.deleted(this.instance);
          }
        yield this.repository._remult.liveQueryPublisher.itemChanged(this.repository.metadata.key, [{ id: this.getId(), oldId: this.getOriginalId(), deleted: true }]);
        this._wasDeleted = true;
      } catch (err) {
        yield this.catchSaveErrors(err);
      }
    });
  }
  loadDataFrom(data, loadItems) {
    return __async(this, null, function* () {
      for (const col of this.info.fields) {
        let lu = this.lookups.get(col.key);
        if (lu) {
          lu.id = data[col.key];
          if (loadItems === void 0) {
            if (!col.options.lazy && !getRelationFieldInfo(col))
              yield lu.waitLoad();
          } else {
            if (loadItems.includes(col))
              yield lu.waitLoad();
          }
        } else if (!getRelationFieldInfo(col))
          this.instance[col.key] = data[col.key];
      }
      yield this.calcServerExpression();
      this.id = this.getId();
    });
  }
  id;
  originalId;
  getOriginalId() {
    return this.originalId;
  }
  calcServerExpression() {
    return __async(this, null, function* () {
      if (isBackend())
        for (const col of this.info.fieldsMetadata) {
          if (col.options.serverExpression) {
            this.instance[col.key] = yield col.options.serverExpression(this.instance);
          }
        }
    });
  }
  isNew() {
    this._subscribers?.reportObserved();
    return this._isNew;
  }
  wasChanged() {
    this._subscribers?.reportObserved();
    for (const col of this.fields) {
      const rel = getRelationFieldInfo(col.metadata);
      if (!rel || rel.type == "reference") {
        if (col.valueChanged())
          return true;
      }
    }
    return false;
  }
  __performColumnAndEntityValidations() {
    return __async(this, null, function* () {
      for (const c of this.fieldsMetadata) {
        if (c.options.validate) {
          let col = new FieldRefImplementation(c.options, c, this.instance, this, this);
          yield col.__performValidation();
        }
      }
      if (this.info.entityInfo.validation) {
        let e = this.buildLifeCycleEvent(() => {
        });
        yield this.info.entityInfo.validation(this.instance, e);
      }
      if (this.repository.listeners)
        for (const listener of this.repository.listeners.filter((x2) => x2.validating)) {
          yield listener.validating(this.instance);
        }
    });
  }
};
var controllerColumns = Symbol.for("controllerColumns");
function prepareColumnInfo(r, remult2) {
  return r.map((x2) => decorateColumnSettings(x2.settings(remult2), remult2));
}
function getFields(container, remult2) {
  return getControllerRef(container, remult2).fields;
}
function getControllerRef(container, remultArg) {
  const remultVar = remultArg || remult;
  let result = container[controllerColumns];
  if (!result)
    result = container[entityMember];
  if (!result) {
    let columnSettings = remultStatic.columnsOfType.get(container.constructor);
    if (!columnSettings)
      remultStatic.columnsOfType.set(container.constructor, columnSettings = []);
    let base = Object.getPrototypeOf(container.constructor);
    while (base != null) {
      let baseCols = remultStatic.columnsOfType.get(base);
      if (baseCols) {
        columnSettings.unshift(...baseCols.filter((x2) => !columnSettings.find((y) => y.key == x2.key)));
      }
      base = Object.getPrototypeOf(base);
    }
    container[controllerColumns] = result = new controllerRefImpl(prepareColumnInfo(columnSettings, remultVar).map((x2) => new columnDefsImpl(x2, void 0, remultVar)), container, remultVar);
  }
  return result;
}
var controllerRefImpl = class extends rowHelperBase {
  constructor(columnsInfo, instance, remult2) {
    super(columnsInfo, instance, remult2, false);
    let _items = [];
    let r = {
      find: (c) => r[typeof c === "string" ? c : c.key],
      [Symbol.iterator]: () => _items[Symbol.iterator](),
      toArray: () => _items
    };
    for (const col of columnsInfo) {
      _items.push(r[col.key] = new FieldRefImplementation(col.options, col, instance, void 0, this));
    }
    this.fields = r;
  }
  __performColumnAndEntityValidations() {
    return __async(this, null, function* () {
      for (const col of this.fields) {
        if (col instanceof FieldRefImplementation) {
          yield col.__performValidation();
        }
      }
    });
  }
  fields;
};
var FieldRefImplementation = class {
  settings;
  metadata;
  container;
  helper;
  rowBase;
  constructor(settings, metadata, container, helper, rowBase) {
    this.settings = settings;
    this.metadata = metadata;
    this.container = container;
    this.helper = helper;
    this.rowBase = rowBase;
    this.target = this.settings.target;
    this.entityRef = this.helper;
  }
  _subscribers;
  subscribe(listener) {
    if (!this._subscribers) {
      this.rowBase.initSubscribers();
    }
    return this._subscribers.subscribe(listener);
  }
  valueIsNull() {
    this.reportObserved();
    let lu = this.rowBase.lookups.get(this.metadata.key);
    if (lu) {
      return lu.id === void 0 || lu.id === null;
    }
    return this.value === null;
  }
  originalValueIsNull() {
    this.reportObserved();
    let lu = this.rowBase.lookups.get(this.metadata.key);
    return this.rawOriginalValue() === null;
  }
  load() {
    return __async(this, null, function* () {
      let lu = this.rowBase.lookups.get(this.metadata.key);
      let rel = getRelationFieldInfo(this.metadata);
      if (rel) {
        if (rel.type === "toMany") {
          return this.container[this.metadata.key] = yield this.helper.repository.relations(this.container)[this.metadata.key].find();
        } else {
          let val = yield this.helper.repository.relations(this.container)[this.metadata.key].findOne();
          if (val)
            this.container[this.metadata.key] = val;
          else
            return null;
        }
      } else if (lu) {
        if (this.valueChanged()) {
          yield lu.waitLoadOf(this.rawOriginalValue());
        }
        return yield lu.waitLoad();
      }
      return this.value;
    });
  }
  target;
  reportObserved() {
    this._subscribers?.reportObserved();
    this.rowBase._subscribers?.reportObserved();
  }
  reportChanged() {
    this._subscribers?.reportChanged();
    this.rowBase._subscribers?.reportChanged();
  }
  get error() {
    this.reportObserved();
    if (!this.rowBase.errors)
      return void 0;
    return this.rowBase.errors[this.metadata.key];
  }
  set error(error) {
    if (!this.rowBase.errors)
      this.rowBase.errors = {};
    this.rowBase.errors[this.metadata.key] = error;
    this.reportChanged();
  }
  get displayValue() {
    this.reportObserved();
    if (this.value != void 0) {
      if (this.settings.displayValue)
        return this.settings.displayValue(this.container, this.value);
      else if (this.metadata.valueConverter.displayValue)
        return this.metadata.valueConverter.displayValue(this.value);
      else
        return this.value.toString();
    }
    return "";
  }
  get value() {
    return this.container[this.metadata.key];
  }
  set value(value) {
    this.container[this.metadata.key] = value;
  }
  get originalValue() {
    this.reportObserved();
    let lu = this.rowBase.lookups.get(this.metadata.key);
    if (lu)
      return lu.get(this.rawOriginalValue());
    return this.rowBase.originalValues[this.metadata.key];
  }
  rawOriginalValue() {
    return this.rowBase.originalValues[this.metadata.key];
  }
  setId(id) {
    this.value = id;
  }
  getId() {
    let lu = this.rowBase.lookups.get(this.metadata.key);
    if (lu)
      return lu.id != void 0 ? lu.id : null;
    return this.value;
  }
  get inputValue() {
    this.reportObserved();
    let lu = this.rowBase.lookups.get(this.metadata.key);
    if (lu)
      return lu.id != void 0 ? lu.id.toString() : null;
    return this.metadata.valueConverter.toInput(this.value, this.settings.inputType);
  }
  set inputValue(val) {
    let lu = this.rowBase.lookups.get(this.metadata.key);
    if (lu) {
      lu.setId(val);
    } else
      this.value = this.metadata.valueConverter.fromInput(val, this.settings.inputType);
  }
  valueChanged() {
    this.reportObserved();
    let val = this.value;
    let lu = this.rowBase.lookups.get(this.metadata.key);
    if (lu) {
      val = lu.id;
    }
    return JSON.stringify(this.metadata.valueConverter.toJson(this.rowBase.originalValues[this.metadata.key])) != JSON.stringify(this.metadata.valueConverter.toJson(val));
  }
  entityRef;
  __performValidation() {
    return __async(this, null, function* () {
      try {
        const processValidation = (result) => {
          if (result !== true && result !== void 0 && !this.error) {
            if (typeof result === "string" && result.length > 0)
              this.error = result;
            else
              this.error = "invalid value";
          }
        };
        if (this.settings.validate) {
          let self2 = this;
          let event = {
            entityRef: this.entityRef,
            get error() {
              return self2.error;
            },
            set error(value) {
              self2.error = value;
            },
            isNew: this.entityRef?.isNew(),
            load: () => self2.load(),
            metadata: self2.metadata,
            originalValue: self2.originalValue,
            value: self2.value,
            valueChanged: () => self2.valueChanged(),
            originalValueIsNull: () => self2.originalValueIsNull(),
            valueIsNull: () => self2.valueIsNull(),
            isBackend: () => !self2.rowBase?.remult?.dataProvider?.isProxy
          };
          if (Array.isArray(this.settings.validate)) {
            for (const v of this.settings.validate) {
              processValidation(yield v(this.container, event));
            }
          } else if (typeof this.settings.validate === "function")
            processValidation(yield this.settings.validate(this.container, event));
        }
      } catch (error) {
        if (typeof error === "string")
          this.error = error;
        else
          this.error = error.message;
      }
    });
  }
  validate() {
    return __async(this, null, function* () {
      yield this.__performValidation();
      return !!!this.error;
    });
  }
};
var tempCaptionTransformer = {
  transformCaption: (remult2, key, caption, entityMetaData) => caption
};
var CaptionTransformer = remultStatic.captionTransformer || (remultStatic.captionTransformer = tempCaptionTransformer);
function buildCaption(caption, key, remult2, metaData) {
  let result;
  if (typeof caption === "function") {
    if (remult2)
      result = caption(remult2);
  } else if (caption)
    result = caption;
  result = CaptionTransformer.transformCaption(remult2, key, result, metaData);
  if (result)
    return result;
  if (key)
    return makeTitle(key);
  return "";
}
var columnDefsImpl = class {
  settings;
  entityDefs;
  remult;
  constructor(settings, entityDefs, remult2) {
    this.settings = settings;
    this.entityDefs = entityDefs;
    this.remult = remult2;
    this.options = this.settings;
    this.target = this.settings.target;
    this.valueConverter = new Proxy(this.settings.valueConverter, {
      get: (target, prop) => {
        let result = target[prop];
        if (typeof result === "function") {
          return (...args) => {
            try {
              return target[prop](...args);
            } catch (err) {
              const error = `${String(prop)} failed for value ${args?.[0]}. Error: ${typeof err === "string" ? err : err.message}`;
              throw {
                message: this.caption + ": " + error,
                modelState: {
                  [this.key]: error
                }
              };
            }
          };
        }
        return result;
      }
    });
    this.allowNull = !!this.settings.allowNull;
    this.valueType = this.settings.valueType;
    this.key = this.settings.key;
    this.inputType = this.settings.inputType;
    if (settings.serverExpression)
      this.isServerExpression = true;
    if (typeof this.settings.allowApiUpdate === "boolean")
      this.readonly = this.settings.allowApiUpdate;
    if (!this.inputType)
      this.inputType = this.valueConverter.inputType;
    this.dbName = settings.dbName;
    if (this.dbName == void 0)
      this.dbName = settings.key;
    this.caption = buildCaption(settings.caption, settings.key, remult2, entityDefs);
  }
  apiUpdateAllowed(item) {
    if (this.options.allowApiUpdate === void 0)
      return true;
    return this.remult.isAllowedForInstance(item, this.options.allowApiUpdate);
  }
  displayValue(item) {
    return this.entityDefs.getEntityMetadataWithoutBreakingTheEntity(item).fields.find(this.key).displayValue;
  }
  includedInApi(item) {
    if (this.options.includeInApi === void 0)
      return true;
    return this.remult.isAllowedForInstance(item, this.options.includeInApi);
  }
  toInput(value, inputType) {
    return this.valueConverter.toInput(value, inputType);
  }
  fromInput(inputValue, inputType) {
    return this.valueConverter.fromInput(inputValue, inputType);
  }
  getDbName() {
    return __async(this, null, function* () {
      return fieldDbName(this, this.entityDefs);
    });
  }
  options;
  target;
  readonly;
  valueConverter;
  allowNull;
  caption;
  dbName;
  inputType;
  key;
  get dbReadOnly() {
    return this.settings.dbReadOnly;
  }
  isServerExpression;
  valueType;
};
var EntityFullInfo = class {
  entityInfo;
  remult;
  entityType;
  key;
  options;
  fieldsMetadata = [];
  constructor(columnsInfo, entityInfo2, remult2, entityType, key) {
    this.entityInfo = entityInfo2;
    this.remult = remult2;
    this.entityType = entityType;
    this.key = key;
    this.options = entityInfo2;
    if (this.options.allowApiCrud !== void 0) {
      let crud;
      if (typeof this.options.allowApiCrud === "function")
        crud = (_, remult3) => this.options.allowApiCrud(remult3);
      else
        crud = this.options.allowApiCrud;
      if (this.options.allowApiDelete === void 0)
        this.options.allowApiDelete = crud;
      if (this.options.allowApiInsert === void 0)
        this.options.allowApiInsert = crud;
      if (this.options.allowApiUpdate === void 0)
        this.options.allowApiUpdate = crud;
      if (this.options.allowApiRead === void 0)
        this.options.allowApiRead = this.options.allowApiCrud;
    }
    if (this.options.allowApiRead === void 0)
      this.options.allowApiRead = true;
    if (!this.key)
      this.key = entityType.name;
    if (!entityInfo2.dbName)
      entityInfo2.dbName = this.key;
    this.dbName = entityInfo2.dbName;
    let r = {
      find: (c) => r[typeof c === "string" ? c : c.key],
      [Symbol.iterator]: () => this.fieldsMetadata[Symbol.iterator](),
      toArray: () => this.fieldsMetadata
    };
    for (const x2 of columnsInfo) {
      this.fieldsMetadata.push(r[x2.key] = new columnDefsImpl(x2, this, remult2));
    }
    this.fields = r;
    this.caption = buildCaption(entityInfo2.caption, this.key, remult2, this);
    if (entityInfo2.id) {
      let r2 = typeof entityInfo2.id === "function" ? entityInfo2.id(this.fields) : Object.keys(entityInfo2.id).map((x2) => this.fields.find(x2));
      if (Array.isArray(r2)) {
        if (r2.length > 1)
          this.idMetadata.field = new CompoundIdField(...r2);
        else if (r2.length == 1)
          this.idMetadata.field = r2[0];
      } else
        this.idMetadata.field = r2;
    }
    if (!this.idMetadata.field) {
      if (this.fields["id"])
        this.idMetadata.field = this.fields["id"];
      else
        this.idMetadata.field = [...this.fields][0];
    }
  }
  apiUpdateAllowed(item) {
    if (this.options.allowApiUpdate === void 0)
      return false;
    return !item ? this.remult.isAllowedForInstance(void 0, this.options.allowApiUpdate) : this.getEntityMetadataWithoutBreakingTheEntity(item).apiUpdateAllowed;
  }
  get apiReadAllowed() {
    if (this.options.allowApiRead === void 0)
      return true;
    return this.remult.isAllowed(this.options.allowApiRead);
  }
  apiDeleteAllowed(item) {
    if (this.options.allowApiDelete === void 0)
      return false;
    return !item ? this.remult.isAllowedForInstance(void 0, this.options.allowApiDelete) : this.getEntityMetadataWithoutBreakingTheEntity(item).apiDeleteAllowed;
  }
  apiInsertAllowed(item) {
    if (this.options.allowApiUpdate === void 0)
      return false;
    return !item ? this.remult.isAllowedForInstance(void 0, this.options.allowApiInsert) : this.getEntityMetadataWithoutBreakingTheEntity(item).apiInsertAllowed;
  }
  getEntityMetadataWithoutBreakingTheEntity(item) {
    let result = getEntityRef(item, false);
    if (result)
      return result;
    return this.remult.repo(this.entityType).getEntityRef(__spreadValues({}, item));
  }
  getDbName() {
    return entityDbName(this);
  }
  idMetadata = {
    getId: (item) => {
      if (item === void 0 || item === null)
        return item;
      const ref = getEntityRef(item, false);
      if (ref)
        return ref.getId();
      if (this.idMetadata.field instanceof CompoundIdField)
        return this.idMetadata.field.getId(item);
      else
        return item[this.idMetadata.field.key];
    },
    field: void 0,
    get fields() {
      return this.field instanceof CompoundIdField ? this.field.fields : [this.field];
    },
    createIdInFilter: (items) => {
      if (items.length > 0)
        return {
          $or: items.map((x2) => this.idMetadata.getIdFilter(getEntityRef(x2).getId()))
        };
    },
    isIdField: (col) => {
      return col.key == this.idMetadata.field.key;
    },
    getIdFilter: (...ids) => {
      if (this.idMetadata.field instanceof CompoundIdField) {
        let field = this.idMetadata.field;
        if (ids.length == 1) {
          return field.isEqualTo(ids[0]);
        } else
          return {
            $or: ids.map((x2) => field.isEqualTo(x2))
          };
      }
      if (ids.length == 1)
        return {
          [this.idMetadata.field.key]: ids[0]
        };
      else
        return {
          [this.idMetadata.field.key]: ids
        };
    }
  };
  fields;
  dbName;
  caption;
};
function FieldType(...options) {
  return (target, context) => {
    if (!options) {
      options = [];
    }
    options.splice(0, 0, { valueType: target });
    target[storableMember] = options;
    return target;
  };
}
function isAutoIncrement(f2) {
  return f2.options?.valueConverter?.fieldTypeInDb === "autoincrement";
}
function ValueListFieldType(...options) {
  return (type, context) => {
    FieldType((o) => {
      ;
      o.valueConverter = ValueListInfo.get(type), o.displayValue = (item, val) => val?.caption;
      o.validate = (entity, ref) => {
        const values = ValueListInfo.get(type).getValues();
        if (ref.value && !values.find((v) => v === ref.value)) {
          ref.value = values.find((v) => v.id === ref.value.id) || ref.value;
        }
        return Validators.in(values)(entity, ref);
      };
    }, ...options)(type, context);
  };
}
var ValueListInfo = class _ValueListInfo {
  valueListType;
  static get(type) {
    let r = typeCache.get(type);
    if (!r) {
      r = new _ValueListInfo(type);
      typeCache.set(type, r);
    }
    return r;
  }
  byIdMap = /* @__PURE__ */ new Map();
  values = [];
  isNumeric = false;
  constructor(valueListType) {
    this.valueListType = valueListType;
    for (let member in this.valueListType) {
      let s = this.valueListType[member];
      if (s instanceof this.valueListType) {
        if (s.id === void 0)
          s.id = member;
        if (typeof s.id === "number")
          this.isNumeric = true;
        if (s.caption === void 0)
          s.caption = makeTitle(s.id !== void 0 ? s.id.toString() : member);
        this.byIdMap.set(s.id, s);
        this.values.push(s);
      }
    }
    if (this.isNumeric) {
      this.fieldTypeInDb = "integer";
    }
    var options = this.valueListType[storableMember];
    if (options) {
      for (const op of options) {
        if (op?.getValues) {
          this.values.splice(0, this.values.length, ...op.getValues());
          this.byIdMap.clear();
          this.values.forEach((s) => {
            if (s.caption === void 0 && s.id !== void 0)
              s.caption = makeTitle(s.id);
            this.byIdMap.set(s.id, s);
          });
        }
      }
      if (this.values.find((s) => s.id === void 0))
        throw new Error(`ValueType ${this.valueListType} has values without an id`);
    } else
      throw new Error(`ValueType not yet initialized, did you forget to call @ValueListFieldType on ` + valueListType);
  }
  getValues() {
    return this.values;
  }
  byId(key) {
    if (this.isNumeric)
      key = +key;
    return this.byIdMap.get(key);
  }
  fromJson(val) {
    return this.byId(val);
  }
  toJson(val) {
    if (!val)
      return void 0;
    return val.id;
  }
  fromDb(val) {
    return this.fromJson(val);
  }
  toDb(val) {
    return this.toJson(val);
  }
  toInput(val, inputType) {
    return this.toJson(val);
  }
  fromInput(val, inputType) {
    return this.fromJson(val);
  }
  displayValue(val) {
    if (!val)
      return "";
    return val.caption;
  }
  fieldTypeInDb;
  inputType;
};
var typeCache = /* @__PURE__ */ new Map();
function getValueList(type) {
  let meta = type?.metadata;
  if (!meta && isOfType(type, "options"))
    meta = type;
  type = meta?.valueType || type;
  if (type) {
    var options = type[storableMember];
    if (options)
      return ValueListInfo.get(type).getValues();
  }
  let optionalValues = meta?.options[fieldOptionalValuesFunctionKey];
  if (optionalValues)
    return optionalValues();
  return void 0;
}
var storableMember = Symbol.for("storableMember");
var fieldOptionalValuesFunctionKey = Symbol.for("fieldOptionalValues");
function buildOptions(options, remult2) {
  let r = {};
  for (const o of options) {
    if (o) {
      if (typeof o === "function")
        o(r, remult2);
      else {
        const _a = o, { validate: validate2 } = _a, otherOptions = __objRest(_a, ["validate"]);
        r.validate = addValidator(r.validate, validate2);
        Object.assign(r, otherOptions);
      }
    }
  }
  return r;
}
function decorateColumnSettings(settings, remult2) {
  if (settings.valueType) {
    let settingsOnTypeLevel = settings.valueType[storableMember];
    if (settingsOnTypeLevel) {
      settings = buildOptions([...settingsOnTypeLevel, settings], remult2);
    }
  }
  if (settings.valueType == String) {
    let x2 = settings;
    if (!settings.valueConverter)
      x2.valueConverter = ValueConverters.String;
  }
  if (settings.valueType == Number) {
    let x2 = settings;
    if (!settings.valueConverter)
      x2.valueConverter = ValueConverters.Number;
  }
  if (settings.valueType == Date) {
    let x2 = settings;
    if (!settings.valueConverter) {
      x2.valueConverter = ValueConverters.Date;
    }
  }
  if (settings.valueType == Boolean) {
    let x2 = settings;
    if (!x2.valueConverter)
      x2.valueConverter = ValueConverters.Boolean;
  }
  if (!settings.valueConverter) {
    let ei = getEntitySettings(settings.valueType, false);
    if (ei) {
      let isIdNumeric = void 0;
      settings.valueConverter = {
        toDb: (x2) => x2,
        fromDb: (x2) => x2
      };
      settings.valueConverter = new Proxy(settings.valueConverter, {
        get(target, property) {
          if (target[property] === void 0) {
            if (isIdNumeric === void 0) {
              if (property === "inputType")
                return "";
              isIdNumeric = remult2.repo(settings.valueType).metadata.idMetadata.field.valueType === Number;
              for (const key of [
                "fieldTypeInDb",
                "toJson",
                "fromJson",
                "toDb",
                "fromDb"
              ]) {
                target[key] = isIdNumeric ? ValueConverters.Integer[key] : ValueConverters.String[key];
              }
            }
          }
          return target[property];
        },
        set(target, property, value, receiver) {
          target[property] = value;
          return true;
        }
      });
    } else
      settings.valueConverter = ValueConverters.Default;
    return settings;
  }
  if (!settings.valueConverter.toJson) {
    settings.valueConverter.toJson = (x2) => x2;
  }
  if (!settings.valueConverter.fromJson) {
    settings.valueConverter.fromJson = (x2) => x2;
  }
  if (!settings.valueConverter.toDb) {
    settings.valueConverter.toDb = (x2) => settings.valueConverter.toJson(x2);
  }
  if (!settings.valueConverter.fromDb) {
    settings.valueConverter.fromDb = (x2) => settings.valueConverter.fromJson(x2);
  }
  if (!settings.valueConverter.toInput) {
    settings.valueConverter.toInput = (x2) => settings.valueConverter.toJson(x2);
  }
  if (!settings.valueConverter.fromInput) {
    settings.valueConverter.fromInput = (x2) => settings.valueConverter.fromJson(x2);
  }
  return settings;
}
var EntityBase = class {
  get _() {
    return getEntityRef(this);
  }
  save() {
    return getEntityRef(this).save();
  }
  assign(values) {
    assign(this, values);
    return this;
  }
  delete() {
    return this._.delete();
  }
  isNew() {
    return this._.isNew();
  }
  get $() {
    return this._.fields;
  }
};
var ControllerBase = class {
  remult;
  constructor(remult2) {
    this.remult = remult2 || remult;
  }
  assign(values) {
    assign(this, values);
    return this;
  }
  get $() {
    return getFields(this, this.remult);
  }
  get _() {
    return getControllerRef(this, this.remult);
  }
};
var QueryResultImpl = class {
  options;
  repo;
  constructor(options, repo2) {
    this.options = options;
    this.repo = repo2;
    if (!this.options)
      this.options = {};
    if (!this.options.pageSize) {
      this.options.pageSize = queryConfig.defaultPageSize;
    }
  }
  _count = void 0;
  getPage(page) {
    return __async(this, null, function* () {
      if (page < 1)
        page = 1;
      return this.repo.find({
        where: this.options.where,
        orderBy: this.options.orderBy,
        limit: this.options.pageSize,
        page,
        load: this.options.load,
        include: this.options.include
      });
    });
  }
  count() {
    return __async(this, null, function* () {
      if (this._count === void 0)
        this._count = yield this.repo.count(this.options.where);
      return this._count;
    });
  }
  forEach(what) {
    return __async(this, null, function* () {
      let i = 0;
      try {
        for (var iter = __forAwait(this), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const x2 = temp.value;
          yield what(x2);
          i++;
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      return i;
    });
  }
  paginator(pNextPageFilter) {
    return __async(this, null, function* () {
      this.options.orderBy = Sort.createUniqueEntityOrderBy(this.repo.metadata, this.options.orderBy);
      let items = yield this.repo.find({
        where: {
          $and: [this.options.where, pNextPageFilter]
        },
        orderBy: this.options.orderBy,
        limit: this.options.pageSize,
        load: this.options.load,
        include: this.options.include
      });
      let nextPage = void 0;
      let hasNextPage = items.length == this.options.pageSize;
      if (hasNextPage) {
        let nextPageFilter = yield this.repo._createAfterFilter(this.options.orderBy, items[items.length - 1]);
        nextPage = () => this.paginator(nextPageFilter);
      }
      return {
        count: () => this.count(),
        hasNextPage,
        items,
        nextPage
      };
    });
  }
  [Symbol.asyncIterator]() {
    if (!this.options.where) {
      this.options.where = {};
    }
    let ob = this.options.orderBy;
    this.options.orderBy = Sort.createUniqueEntityOrderBy(this.repo.metadata, ob);
    let itemIndex = -1;
    let currentPage = void 0;
    let itStrategy;
    let j = 0;
    itStrategy = () => __async(this, null, function* () {
      if (this.options.progress) {
        this.options.progress.progress(j++ / (yield this.count()));
      }
      if (currentPage === void 0 || itemIndex == currentPage.items.length) {
        if (currentPage && !currentPage.hasNextPage)
          return { value: void 0, done: true };
        let prev = currentPage;
        if (currentPage)
          currentPage = yield currentPage.nextPage();
        else
          currentPage = yield this.paginator();
        itemIndex = 0;
        if (currentPage.items.length == 0) {
          return { value: void 0, done: true };
        } else {
          if (prev?.items.length > 0) {
            if (this.repo.getEntityRef(prev.items[0]).getId() == this.repo.getEntityRef(currentPage.items[0]).getId())
              throw new Error("pagination failure, returned same first row");
          }
        }
      }
      if (itemIndex < currentPage.items.length)
        return { value: currentPage.items[itemIndex++], done: false };
    });
    return {
      next: () => __async(this, null, function* () {
        let r = itStrategy();
        return r;
      })
    };
  }
};
var SubscribableImp = class {
  reportChanged() {
    if (this._subscribers)
      this._subscribers.forEach((x2) => x2.reportChanged());
  }
  reportObserved() {
    if (this._subscribers)
      this._subscribers.forEach((x2) => x2.reportObserved());
  }
  _subscribers;
  subscribe(listener) {
    let list;
    if (typeof listener === "function")
      list = {
        reportChanged: () => listener(),
        reportObserved: () => {
        }
      };
    else
      list = listener;
    if (!this._subscribers) {
      this._subscribers = [];
    }
    this._subscribers.push(list);
    return () => this._subscribers = this._subscribers.filter((x2) => x2 != list);
  }
};
function getEntityMetadata(entity) {
  if (entity.metadata)
    return entity.metadata;
  const settings = getEntitySettings(entity, false);
  if (settings) {
    return remult.repo(entity).metadata;
  }
  return entity;
}
function getRepository(entity) {
  const settings = getEntitySettings(entity, false);
  if (settings) {
    return remult.repo(entity);
  }
  return entity;
}
function promiseAll(array, mapToPromise) {
  return __async(this, null, function* () {
    const result = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      result.push(yield mapToPromise(element, index));
    }
    return result;
  });
}

// ../node_modules/remult/esm/src/data-providers/sql-database.js
var SqlDatabase = class _SqlDatabase {
  sql;
  static getDb(dataProvider) {
    const r = dataProvider || remult.dataProvider;
    if (isOfType(r, "createCommand"))
      return r;
    else
      throw "the data provider is not an SqlCommandFactory";
  }
  createCommand() {
    return new LogSQLCommand(this.sql.createCommand(), _SqlDatabase.LogToConsole);
  }
  execute(sql) {
    return __async(this, null, function* () {
      return yield this.createCommand().execute(sql);
    });
  }
  wrapIdentifier = (x2) => x2;
  /* @internal*/
  _getSourceSql() {
    return this.sql;
  }
  ensureSchema(entities) {
    return __async(this, null, function* () {
      if (this.sql.ensureSchema)
        yield this.sql.ensureSchema(entities);
    });
  }
  getEntityDataProvider(entity) {
    if (!this.sql.supportsJsonColumnType) {
      for (const f2 of entity.fields.toArray()) {
        if (f2.valueConverter.fieldTypeInDb === "json") {
          f2.valueConverter = __spreadProps(__spreadValues({}, f2.valueConverter), {
            toDb: ValueConverters.JsonString.toDb,
            fromDb: ValueConverters.JsonString.fromDb
          });
        }
      }
    }
    return new ActualSQLServerDataProvider(entity, this, (dbName) => __async(this, null, function* () {
      if (this.createdEntities.indexOf(dbName.$entityName) < 0) {
        this.createdEntities.push(dbName.$entityName);
        yield this.sql.entityIsUsedForTheFirstTime(entity);
      }
    }), this.sql);
  }
  transaction(action) {
    return this.sql.transaction((x2) => __async(this, null, function* () {
      let completed = false;
      try {
        yield action(new _SqlDatabase({
          createCommand: () => {
            let c = x2.createCommand();
            return {
              addParameterAndReturnSqlToken: (val) => {
                return c.param(val);
              },
              param: (x3) => c.param(x3),
              execute: (sql) => __async(this, null, function* () {
                if (completed)
                  throw "can't run a command after the transaction was completed";
                return c.execute(sql);
              })
            };
          },
          getLimitSqlSyntax: this.sql.getLimitSqlSyntax,
          entityIsUsedForTheFirstTime: (y) => x2.entityIsUsedForTheFirstTime(y),
          transaction: (z) => x2.transaction(z),
          supportsJsonColumnType: this.sql.supportsJsonColumnType,
          wrapIdentifier: this.wrapIdentifier,
          end: this.end
        }));
      } finally {
        completed = true;
      }
    }));
  }
  /**
   * Creates a raw filter for entity filtering.
   * @param {CustomSqlFilterBuilderFunction} build - The custom SQL filter builder function.
   * @returns {EntityFilter<any>} - The entity filter with a custom SQL filter.
   * @example
   * SqlDatabase.rawFilter(({param}) =>
        `"customerId" in (select id from customers where city = ${param(customerCity)})`
      )
   * @see [Leveraging Database Capabilities with Raw SQL in Custom Filters](https://remult.dev/docs/custom-filter.html#leveraging-database-capabilities-with-raw-sql-in-custom-filters)
   */
  static rawFilter(build) {
    return {
      [customDatabaseFilterToken]: {
        buildSql: build
      }
    };
  }
  static filterToRaw(repo2, condition, sqlCommand, dbNames, wrapIdentifier) {
    return __async(this, null, function* () {
      if (!sqlCommand) {
        sqlCommand = new myDummySQLCommand();
      }
      const r = getRepository(repo2);
      var b = new FilterConsumerBridgeToSqlRequest(sqlCommand, dbNames || (yield dbNamesOf(r.metadata, wrapIdentifier)));
      b._addWhere = false;
      yield (yield getRepositoryInternals(r)._translateWhereToFilter(condition)).__applyToConsumer(b);
      return yield b.resolveWhere();
    });
  }
  /**
   * `false` _(default)_ - No logging
   *
   * `true` - to log all queries to the console
   *
   * `oneLiner` - to log all queries to the console as one line
   *
   * a `function` - to log all queries to the console as a custom format
   */
  static LogToConsole = false;
  /**
   * Threshold in milliseconds for logging queries to the console.
   */
  static durationThreshold = 0;
  constructor(sql) {
    this.sql = sql;
    if (sql.wrapIdentifier)
      this.wrapIdentifier = (x2) => sql.wrapIdentifier(x2);
    if (isOfType(sql, "provideMigrationBuilder")) {
      this.provideMigrationBuilder = (x2) => sql.provideMigrationBuilder(x2);
    }
    if (isOfType(sql, "end"))
      this.end = () => sql.end();
  }
  provideMigrationBuilder;
  createdEntities = [];
  end;
};
var icons = /* @__PURE__ */ new Map([
  // CRUD
  ["INSERT", "⚪"],
  ["SELECT", "🔵"],
  ["UPDATE", "🟣"],
  ["DELETE", "🟤"],
  // Additional
  ["CREATE", "🟩"],
  ["ALTER", "🟨"],
  ["DROP", "🟥"],
  ["TRUNCATE", "⬛"],
  ["GRANT", "🟪"],
  ["REVOKE", "🟫"]
  // Used to take back permissions from a user.
]);
var LogSQLCommand = class {
  origin;
  logToConsole;
  constructor(origin, logToConsole) {
    this.origin = origin;
    this.logToConsole = logToConsole;
  }
  args = {};
  addParameterAndReturnSqlToken(val) {
    return this.param(val);
  }
  param(val, name) {
    let r = this.origin.param(val);
    this.args[r] = val;
    return r;
  }
  execute(sql) {
    return __async(this, null, function* () {
      try {
        let start = /* @__PURE__ */ new Date();
        let r = yield this.origin.execute(sql);
        if (this.logToConsole !== false) {
          var d = (/* @__PURE__ */ new Date()).valueOf() - start.valueOf();
          if (d > SqlDatabase.durationThreshold) {
            const duration = d / 1e3;
            if (this.logToConsole === "oneLiner") {
              const rawSql = sql.replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/  +/g, " ").trim();
              const first = rawSql.split(" ")[0].toUpperCase();
              console.info(`${icons.get(first) || "💢"} (${duration.toFixed(3)}) ${rawSql} ${JSON.stringify(this.args)}`);
            } else if (typeof this.logToConsole === "function") {
              this.logToConsole(duration, sql, this.args);
            } else {
              console.info(sql + "\n", { arguments: this.args, duration });
            }
          }
        }
        return r;
      } catch (err) {
        console.error((err.message || "Sql Error") + ":\n", sql, {
          arguments: this.args,
          error: err
        });
        throw err;
      }
    });
  }
};
var ActualSQLServerDataProvider = class {
  entity;
  sql;
  iAmUsed;
  strategy;
  static LogToConsole = false;
  constructor(entity, sql, iAmUsed, strategy) {
    this.entity = entity;
    this.sql = sql;
    this.iAmUsed = iAmUsed;
    this.strategy = strategy;
  }
  init() {
    return __async(this, null, function* () {
      let dbNameProvider = yield dbNamesOf(this.entity, (x2) => this.sql.wrapIdentifier(x2));
      yield this.iAmUsed(dbNameProvider);
      return dbNameProvider;
    });
  }
  count(where) {
    return __async(this, null, function* () {
      let e = yield this.init();
      let select = "select count(*) count from " + e.$entityName;
      let r = this.sql.createCommand();
      if (where) {
        let wc = new FilterConsumerBridgeToSqlRequest(r, e);
        where.__applyToConsumer(wc);
        select += yield wc.resolveWhere();
      }
      return r.execute(select).then((r2) => {
        return Number(r2.rows[0].count);
      });
    });
  }
  find(options) {
    return __async(this, null, function* () {
      let e = yield this.init();
      let { colKeys, select } = this.buildSelect(e);
      select = "select " + select;
      select += "\n from " + e.$entityName;
      let r = this.sql.createCommand();
      if (options) {
        if (options.where) {
          let where = new FilterConsumerBridgeToSqlRequest(r, e);
          options.where.__applyToConsumer(where);
          select += yield where.resolveWhere();
        }
        if (options.limit) {
          options.orderBy = Sort.createUniqueSort(this.entity, options.orderBy);
        }
        if (!options.orderBy) {
          options.orderBy = Sort.createUniqueSort(this.entity, new Sort());
        }
        if (options.orderBy) {
          let first = true;
          let segs = [];
          for (const s of options.orderBy.Segments) {
            segs.push(s);
          }
          for (const c of segs) {
            if (first) {
              select += " Order By ";
              first = false;
            } else
              select += ", ";
            select += e.$dbNameOf(c.field);
            if (c.isDescending)
              select += " desc";
            if (this.sql._getSourceSql().orderByNullsFirst) {
              if (c.isDescending)
                select += " nulls last";
              else
                select += " nulls first";
            }
          }
        }
        if (options.limit) {
          let page = 1;
          if (options.page)
            page = options.page;
          if (page < 1)
            page = 1;
          select += " " + this.strategy.getLimitSqlSyntax(options.limit, (page - 1) * options.limit);
        }
      }
      return r.execute(select).then((r2) => {
        return r2.rows.map((y) => {
          return this.buildResultRow(colKeys, y, r2);
        });
      });
    });
  }
  buildResultRow(colKeys, y, r) {
    let result = {};
    for (let index = 0; index < colKeys.length; index++) {
      const col = colKeys[index];
      try {
        result[col.key] = col.valueConverter.fromDb(y[r.getColumnKeyInResultForIndexInSelect(index)]);
      } catch (err) {
        throw new Error("Failed to load from db:" + col.key + "\r\n" + err);
      }
    }
    return result;
  }
  buildSelect(e) {
    let select = "";
    let colKeys = [];
    for (const x2 of this.entity.fields) {
      if (x2.isServerExpression) {
      } else {
        if (colKeys.length > 0)
          select += ", ";
        select += e.$dbNameOf(x2);
        colKeys.push(x2);
      }
    }
    return { colKeys, select };
  }
  update(id, data) {
    return __async(this, null, function* () {
      let e = yield this.init();
      let r = this.sql.createCommand();
      let statement = "update " + e.$entityName + " set ";
      let added = false;
      for (const x2 of this.entity.fields) {
        if (isDbReadonly(x2, e)) {
        } else if (data[x2.key] !== void 0) {
          let v = x2.valueConverter.toDb(data[x2.key]);
          if (v !== void 0) {
            if (!added)
              added = true;
            else
              statement += ", ";
            statement += e.$dbNameOf(x2) + " = " + r.param(v);
          }
        }
      }
      const idFilter = this.entity.idMetadata.getIdFilter(id);
      let f2 = new FilterConsumerBridgeToSqlRequest(r, e);
      Filter.fromEntityFilter(this.entity, idFilter).__applyToConsumer(f2);
      statement += yield f2.resolveWhere();
      let { colKeys, select } = this.buildSelect(e);
      if (!this.sql._getSourceSql().doesNotSupportReturningSyntax)
        statement += " returning " + select;
      return r.execute(statement).then((sqlResult) => {
        this.sql._getSourceSql().afterMutation?.();
        if (this.sql._getSourceSql().doesNotSupportReturningSyntax) {
          return getRowAfterUpdate(this.entity, this, data, id, "update");
        }
        if (sqlResult.rows.length != 1)
          throw new Error("Failed to update row with id " + id + ", rows updated: " + sqlResult.rows.length);
        return this.buildResultRow(colKeys, sqlResult.rows[0], sqlResult);
      });
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      let e = yield this.init();
      let r = this.sql.createCommand();
      let f2 = new FilterConsumerBridgeToSqlRequest(r, e);
      Filter.fromEntityFilter(this.entity, this.entity.idMetadata.getIdFilter(id)).__applyToConsumer(f2);
      let statement = "delete from " + e.$entityName;
      statement += yield f2.resolveWhere();
      return r.execute(statement).then(() => {
        this.sql._getSourceSql().afterMutation?.();
      });
    });
  }
  insert(data) {
    return __async(this, null, function* () {
      let e = yield this.init();
      let r = this.sql.createCommand();
      let cols = "";
      let vals = "";
      let added = false;
      for (const x2 of this.entity.fields) {
        if (isDbReadonly(x2, e)) {
        } else {
          let v = x2.valueConverter.toDb(data[x2.key]);
          if (v != void 0) {
            if (!added)
              added = true;
            else {
              cols += ", ";
              vals += ", ";
            }
            cols += e.$dbNameOf(x2);
            vals += r.param(v);
          }
        }
      }
      let statement = `insert into ${e.$entityName} (${cols}) values (${vals})`;
      let { colKeys, select } = this.buildSelect(e);
      if (!this.sql._getSourceSql().doesNotSupportReturningSyntax)
        statement += " returning " + select;
      return yield r.execute(statement).then((sql) => {
        this.sql._getSourceSql().afterMutation?.();
        if (this.sql._getSourceSql().doesNotSupportReturningSyntax) {
          if (isAutoIncrement(this.entity.idMetadata.field)) {
            const id = sql.rows[0];
            if (typeof id !== "number")
              throw new Error("Auto increment, for a database that is does not support returning syntax, should return an array with the single last added id. Instead it returned: " + JSON.stringify(id));
            return this.find({
              where: new Filter((x2) => x2.isEqualTo(this.entity.idMetadata.field, id))
            }).then((r2) => r2[0]);
          } else {
            return getRowAfterUpdate(this.entity, this, data, void 0, "insert");
          }
        }
        return this.buildResultRow(colKeys, sql.rows[0], sql);
      });
    });
  }
};
var myDummySQLCommand = class {
  execute(sql) {
    throw new Error("Method not implemented.");
  }
  addParameterAndReturnSqlToken(val) {
    return this.param(val);
  }
  param(val) {
    if (val === null)
      return "null";
    if (val instanceof Date)
      val = val.toISOString();
    if (typeof val == "string") {
      if (val == void 0)
        val = "";
      return "'" + val.replace(/'/g, "''") + "'";
    }
    return val.toString();
  }
};
function getRowAfterUpdate(meta, dataProvider, data, id, operation) {
  const idFilter = id !== void 0 ? meta.idMetadata.getIdFilter(id) : {};
  return dataProvider.find({
    where: new Filter((x2) => {
      for (const field of meta.idMetadata.fields) {
        x2.isEqualTo(field, data[field.key] ?? idFilter[field.key]);
      }
    })
  }).then((r) => {
    if (r.length != 1)
      throw new Error(`Failed to ${operation} row - result contained ${r.length} rows`);
    return r[0];
  });
}

// ../node_modules/remult/esm/src/filter/filter-consumer-bridge-to-sql-request.js
var FilterConsumerBridgeToSqlRequest = class _FilterConsumerBridgeToSqlRequest {
  r;
  nameProvider;
  where = "";
  _addWhere = true;
  promises = [];
  resolveWhere() {
    return __async(this, null, function* () {
      while (this.promises.length > 0) {
        let p = this.promises;
        this.promises = [];
        for (const pr of p) {
          yield pr;
        }
      }
      return this.where;
    });
  }
  constructor(r, nameProvider) {
    this.r = r;
    this.nameProvider = nameProvider;
  }
  custom(key, customItem) {
    throw new Error("Custom filter should be translated before it gets here");
  }
  or(orElements) {
    let statement = "";
    this.promises.push((() => __async(this, null, function* () {
      for (const element of orElements) {
        let f2 = new _FilterConsumerBridgeToSqlRequest(this.r, this.nameProvider);
        f2._addWhere = false;
        element.__applyToConsumer(f2);
        let where = yield f2.resolveWhere();
        if (!where)
          return;
        if (where.length > 0) {
          if (statement.length > 0) {
            statement += " or ";
          }
          if (orElements.length > 1) {
            statement += "(" + where + ")";
          } else
            statement += where;
        }
      }
      this.addToWhere("(" + statement + ")");
    }))());
  }
  isNull(col) {
    this.promises.push((() => __async(this, null, function* () {
      return this.addToWhere(this.nameProvider.$dbNameOf(col) + " is null");
    }))());
  }
  isNotNull(col) {
    this.promises.push((() => __async(this, null, function* () {
      return this.addToWhere(this.nameProvider.$dbNameOf(col) + " is not null");
    }))());
  }
  isIn(col, val) {
    this.promises.push((() => __async(this, null, function* () {
      if (val && val.length > 0)
        this.addToWhere(this.nameProvider.$dbNameOf(col) + " in (" + val.map((x2) => this.r.param(col.valueConverter.toDb(x2))).join(",") + ")");
      else
        this.addToWhere("1 = 0 /*isIn with no values*/");
    }))());
  }
  isEqualTo(col, val) {
    this.add(col, val, "=");
  }
  isDifferentFrom(col, val) {
    this.add(col, val, "<>");
  }
  isGreaterOrEqualTo(col, val) {
    this.add(col, val, ">=");
  }
  isGreaterThan(col, val) {
    this.add(col, val, ">");
  }
  isLessOrEqualTo(col, val) {
    this.add(col, val, "<=");
  }
  isLessThan(col, val) {
    this.add(col, val, "<");
  }
  containsCaseInsensitive(col, val) {
    this.promises.push((() => __async(this, null, function* () {
      this.addToWhere("lower (" + this.nameProvider.$dbNameOf(col) + ") like lower ('%" + val.replace(/'/g, "''") + "%')");
    }))());
  }
  notContainsCaseInsensitive(col, val) {
    this.promises.push((() => __async(this, null, function* () {
      this.addToWhere("not lower (" + this.nameProvider.$dbNameOf(col) + ") like lower ('%" + val.replace(/'/g, "''") + "%')");
    }))());
  }
  add(col, val, operator) {
    this.promises.push((() => __async(this, null, function* () {
      let x2 = this.nameProvider.$dbNameOf(col) + " " + operator + " " + this.r.param(col.valueConverter.toDb(val));
      this.addToWhere(x2);
    }))());
  }
  addToWhere(x2) {
    if (this.where.length == 0) {
      if (this._addWhere)
        this.where += " where ";
    } else
      this.where += " and ";
    this.where += x2;
  }
  databaseCustom(databaseCustom) {
    this.promises.push((() => __async(this, null, function* () {
      if (databaseCustom?.buildSql) {
        let item = new CustomSqlFilterBuilder(this.r, this.nameProvider.wrapIdentifier);
        let sql = yield databaseCustom.buildSql(item);
        if (typeof sql !== "string")
          sql = item.sql;
        if (sql) {
          this.addToWhere("(" + sql + ")");
        }
      }
    }))());
  }
};
var CustomSqlFilterBuilder = class {
  r;
  wrapIdentifier;
  constructor(r, wrapIdentifier) {
    this.r = r;
    this.wrapIdentifier = wrapIdentifier;
    this.param.bind(this);
    this.filterToRaw.bind(this);
  }
  sql = "";
  /** @deprecated  use `param` instead*/
  addParameterAndReturnSqlToken(val) {
    return this.param(val);
  }
  /**
   * Adds a parameter value.
   * @param {valueType} val - The value to add as a parameter.
   * @param {FieldMetadata<valueType>} [field] - The field metadata.
   * @returns {string} - The SQL token.
   */
  param = (val, field) => {
    if (typeof field === "object" && field.valueConverter.toDb) {
      val = field.valueConverter.toDb(val);
    }
    return this.r.param(val);
  };
  /**
   * Converts an entity filter into a raw SQL condition - and appends to it any `backendPrefilter` and `backendPreprocessFilter`
   * @param {RepositoryOverloads<entityType>} repo - The repository.
   * @param {EntityFilter<entityType>} condition - The entity filter.
   * @returns {Promise<string>} - The raw SQL.
   */
  filterToRaw = (repo2, condition) => __async(this, null, function* () {
    return SqlDatabase.filterToRaw(repo2, condition, this, void 0, this.wrapIdentifier);
  });
};
function isDbReadonly(field, dbNames) {
  return field.dbReadOnly || field.isServerExpression || field.options.sqlExpression && field.dbName != dbNames.$dbNameOf(field);
}
function dbNamesOf(repo2, wrapIdentifierOrOptions) {
  return __async(this, null, function* () {
    let options = typeof wrapIdentifierOrOptions === "function" ? { wrapIdentifier: wrapIdentifierOrOptions } : wrapIdentifierOrOptions || {};
    var meta = getEntityMetadata(repo2);
    if (!options.wrapIdentifier) {
      options.wrapIdentifier = remult.dataProvider.wrapIdentifier;
    }
    if (!options.wrapIdentifier)
      options.wrapIdentifier = (x2) => x2;
    const result = {
      $entityName: yield entityDbName(meta, options.wrapIdentifier),
      toString: () => result.$entityName,
      $dbNameOf: (field) => {
        var key;
        if (typeof field === "string")
          key = field;
        else
          key = field.key;
        return result[key];
      },
      wrapIdentifier: options.wrapIdentifier
    };
    for (const field of meta.fields) {
      let r = yield fieldDbName(field, meta, options.wrapIdentifier);
      if (!field.options.sqlExpression) {
        if (typeof options.tableName === "string")
          r = options.wrapIdentifier(options.tableName) + "." + r;
        else if (options.tableName === true) {
          r = result.$entityName + "." + r;
        }
      }
      result[field.key] = r;
    }
    return result;
  });
}
function entityDbName(metadata, wrapIdentifier = (x2) => x2) {
  return __async(this, null, function* () {
    if (metadata.options.sqlExpression) {
      if (typeof metadata.options.sqlExpression === "string")
        return metadata.options.sqlExpression;
      else if (typeof metadata.options.sqlExpression === "function") {
        const prev = metadata.options.sqlExpression;
        try {
          metadata.options.sqlExpression = "recursive sqlExpression call for entity '" + metadata.key + "'. ";
          return yield prev(metadata);
        } finally {
          metadata.options.sqlExpression = prev;
        }
      }
    }
    return wrapIdentifier(metadata.dbName);
  });
}
function fieldDbName(f2, meta, wrapIdentifier = (x2) => x2) {
  return __async(this, null, function* () {
    try {
      if (f2.options.sqlExpression) {
        let result;
        if (typeof f2.options.sqlExpression === "function") {
          const prev = f2.options.sqlExpression;
          try {
            f2.options.sqlExpression = "recursive sqlExpression call for field '" + f2.key + "'. ";
            result = yield prev(meta);
            f2.options.sqlExpression = () => result;
          } finally {
          }
        } else
          result = f2.options.sqlExpression;
        if (!result)
          return f2.dbName;
        return result;
      }
      const rel = getRelationFieldInfo(f2);
      let field = rel?.type === "toOne" && f2.options.field;
      if (field) {
        let fInfo = meta.fields.find(field);
        if (fInfo)
          return fieldDbName(fInfo, meta, wrapIdentifier);
      }
      return wrapIdentifier(f2.dbName);
    } finally {
    }
  });
}

// ../node_modules/remult/esm/src/data-providers/array-entity-data-provider.js
var ArrayEntityDataProvider = class {
  entity;
  rows;
  static rawFilter(filter) {
    return {
      [customDatabaseFilterToken]: {
        arrayFilter: filter
      }
    };
  }
  constructor(entity, rows) {
    this.entity = entity;
    this.rows = rows;
  }
  //@internal
  __names;
  //@internal
  init() {
    return __async(this, null, function* () {
      if (this.__names)
        return this.__names;
      this.__names = yield dbNamesOf(this.entity, (x2) => x2);
      for (const r of this.rows()) {
        this.verifyThatRowHasAllNotNullColumns(r, this.__names);
      }
      return this.__names;
    });
  }
  //@internal
  verifyThatRowHasAllNotNullColumns(r, names) {
    for (const f2 of this.entity.fields) {
      const key = names.$dbNameOf(f2);
      if (!f2.isServerExpression) {
        if (!f2.allowNull) {
          if (r[key] === void 0 || r[key] === null) {
            let val = void 0;
            if (f2.valueType === Boolean)
              val = false;
            else if (f2.valueType === Number)
              val = 0;
            else if (f2.valueType === String)
              val = "";
            r[key] = val;
          }
        } else if (r[key] === void 0)
          r[key] = null;
      }
    }
  }
  count(where) {
    return __async(this, null, function* () {
      let rows = this.rows();
      const names = yield this.init();
      let j = 0;
      for (let i = 0; i < rows.length; i++) {
        if (!where) {
          j++;
        } else {
          let x2 = new FilterConsumerBridgeToObject(rows[i], names);
          where.__applyToConsumer(x2);
          if (x2.ok)
            j++;
        }
      }
      return j;
    });
  }
  find(options) {
    return __async(this, null, function* () {
      let rows = this.rows();
      const dbNames = yield this.init();
      if (options) {
        if (options.where) {
          rows = rows.filter((i) => {
            let x2 = new FilterConsumerBridgeToObject(i, dbNames);
            options.where.__applyToConsumer(x2);
            return x2.ok;
          });
        }
        if (options.orderBy) {
          rows = rows.sort((a, b) => {
            return options.orderBy.compare(a, b, dbNames.$dbNameOf);
          });
        }
        rows = pageArray(rows, options);
      }
      if (rows)
        return rows.map((i) => {
          return this.translateFromJson(i, dbNames);
        });
      return [];
    });
  }
  //@internal
  translateFromJson(row, dbNames) {
    let result = {};
    for (const col of this.entity.fields) {
      result[col.key] = col.valueConverter.fromJson(row[dbNames.$dbNameOf(col)]);
    }
    return result;
  }
  //@internal
  translateToJson(row, dbNames) {
    let result = {};
    for (const col of this.entity.fields) {
      if (!isDbReadonly(col, dbNames))
        result[dbNames.$dbNameOf(col)] = col.valueConverter.toJson(row[col.key]);
    }
    return result;
  }
  //@internal
  idMatches(id, names) {
    return (item) => {
      let x2 = new FilterConsumerBridgeToObject(item, names);
      Filter.fromEntityFilter(this.entity, this.entity.idMetadata.getIdFilter(id)).__applyToConsumer(x2);
      return x2.ok;
    };
  }
  update(id, data) {
    return __async(this, null, function* () {
      const names = yield this.init();
      let idMatches = this.idMatches(id, names);
      let keys = Object.keys(data);
      for (let i = 0; i < this.rows().length; i++) {
        let r = this.rows()[i];
        if (idMatches(r)) {
          let newR = __spreadValues({}, r);
          for (const f2 of this.entity.fields) {
            if (!isDbReadonly(f2, names)) {
              if (keys.includes(f2.key)) {
                newR[names.$dbNameOf(f2)] = f2.valueConverter.toJson(data[f2.key]);
              }
            }
          }
          this.verifyThatRowHasAllNotNullColumns(newR, names);
          this.rows()[i] = newR;
          return Promise.resolve(this.translateFromJson(this.rows()[i], names));
        }
      }
      throw new Error(`ArrayEntityDataProvider: Couldn't find row with id "${id}" in entity "${this.entity.key}" to update`);
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      const names = yield this.init();
      let idMatches = this.idMatches(id, names);
      for (let i = 0; i < this.rows().length; i++) {
        if (idMatches(this.rows()[i])) {
          this.rows().splice(i, 1);
          return Promise.resolve();
        }
      }
      throw new Error(`ArrayEntityDataProvider: Couldn't find row with id "${id}" in entity "${this.entity.key}" to delete`);
    });
  }
  insert(data) {
    return __async(this, null, function* () {
      const names = yield this.init();
      let j = this.translateToJson(data, names);
      let idf = this.entity.idMetadata.field;
      if (!(idf instanceof CompoundIdField)) {
        if (idf.valueConverter.fieldTypeInDb === "autoincrement") {
          j[idf.key] = 1;
          for (const row of this.rows()) {
            if (row[idf.key] >= j[idf.key])
              j[idf.key] = row[idf.key] + 1;
          }
        }
        if (j[idf.key])
          this.rows().forEach((i) => {
            if (j[idf.key] == i[idf.key])
              throw Error("id already exists");
          });
      }
      this.verifyThatRowHasAllNotNullColumns(j, names);
      this.rows().push(j);
      return Promise.resolve(this.translateFromJson(j, names));
    });
  }
};
function pageArray(rows, options) {
  if (!options)
    return rows;
  if (!options.limit)
    return rows;
  let page = 1;
  if (options.page)
    page = options.page;
  if (page < 1)
    page = 1;
  let x2 = 0;
  return rows.filter((i) => {
    x2++;
    let max = page * options.limit;
    let min = max - options.limit;
    return x2 > min && x2 <= max;
  });
}
var FilterConsumerBridgeToObject = class _FilterConsumerBridgeToObject {
  row;
  dbNames;
  ok = true;
  constructor(row, dbNames) {
    this.row = row;
    this.dbNames = dbNames;
  }
  databaseCustom(databaseCustom) {
    if (databaseCustom && databaseCustom.arrayFilter) {
      if (!databaseCustom.arrayFilter(this.row))
        this.ok = false;
    }
  }
  custom(key, customItem) {
    throw new Error("Custom Filter should be translated before it gets here");
  }
  or(orElements) {
    for (const element of orElements) {
      let filter = new _FilterConsumerBridgeToObject(this.row, this.dbNames);
      element.__applyToConsumer(filter);
      if (filter.ok) {
        return;
      }
    }
    this.ok = false;
  }
  isNull(col) {
    if (this.row[this.dbNames.$dbNameOf(col)] != null)
      this.ok = false;
  }
  isNotNull(col) {
    if (this.row[this.dbNames.$dbNameOf(col)] == null)
      this.ok = false;
  }
  isIn(col, val) {
    for (const v of val) {
      if (this.row[this.dbNames.$dbNameOf(col)] == col.valueConverter.toJson(v)) {
        return;
      }
    }
    this.ok = false;
  }
  isEqualTo(col, val) {
    if (this.row[this.dbNames.$dbNameOf(col)] != col.valueConverter.toJson(val))
      this.ok = false;
  }
  isDifferentFrom(col, val) {
    if (this.row[this.dbNames.$dbNameOf(col)] == col.valueConverter.toJson(val))
      this.ok = false;
  }
  isGreaterOrEqualTo(col, val) {
    if (this.row[this.dbNames.$dbNameOf(col)] < col.valueConverter.toJson(val))
      this.ok = false;
  }
  isGreaterThan(col, val) {
    if (this.row[this.dbNames.$dbNameOf(col)] <= col.valueConverter.toJson(val))
      this.ok = false;
  }
  isLessOrEqualTo(col, val) {
    if (this.row[this.dbNames.$dbNameOf(col)] > col.valueConverter.toJson(val))
      this.ok = false;
  }
  isLessThan(col, val) {
    if (this.row[this.dbNames.$dbNameOf(col)] >= col.valueConverter.toJson(val))
      this.ok = false;
  }
  containsCaseInsensitive(col, val) {
    let v = this.row[this.dbNames.$dbNameOf(col)];
    if (!v) {
      this.ok = false;
      return;
    }
    let s = "" + v;
    if (val)
      val = col.valueConverter.toJson(val);
    if (val)
      val = val.toString().toLowerCase();
    if (s.toLowerCase().indexOf(val) < 0)
      this.ok = false;
  }
  notContainsCaseInsensitive(col, val) {
    let v = this.row[this.dbNames.$dbNameOf(col)];
    if (!v) {
      this.ok = false;
      return;
    }
    let s = "" + v;
    if (val)
      val = col.valueConverter.toJson(val);
    if (val)
      val = val.toString().toLowerCase();
    if (s.toLowerCase().indexOf(val) >= 0)
      this.ok = false;
  }
};

// ../node_modules/remult/esm/src/remult3/entity.js
function Entity(key, ...options) {
  return (target, info) => {
    for (const rawFilterMember in target) {
      if (Object.prototype.hasOwnProperty.call(target, rawFilterMember)) {
        const element = target[rawFilterMember];
        if (element?.rawFilterInfo?.rawFilterTranslator) {
          if (!element.rawFilterInfo.key)
            element.rawFilterInfo.key = rawFilterMember;
        }
      }
    }
    let factory = (remult2) => {
      let r = {};
      for (const o of options) {
        if (o) {
          if (typeof o === "function")
            o(r, remult2);
          else
            Object.assign(r, o);
        }
      }
      let base = Object.getPrototypeOf(target);
      if (base) {
        let baseFactory = getEntitySettings(base, false);
        if (baseFactory) {
          let opt = baseFactory(remult2);
          if (opt) {
            r = __spreadValues(__spreadValues({}, opt), r);
          }
        }
      }
      return r;
    };
    remultStatic.allEntities.push(target);
    setControllerSettings(target, { key });
    target[entityInfo] = factory;
    target[entityInfo_key] = key;
    return target;
  };
}

// ../node_modules/remult/esm/src/remult3/Fields.js
var import_cuid2 = __toESM(require_cuid2(), 1);
var validateNumber = createValueValidator((x2) => {
  return !isNaN(x2) && isFinite(x2);
});
var Fields = class _Fields {
  /**
   * Stored as a JSON.stringify - to store as json use Fields.json
   */
  static object(...options) {
    return Field(void 0, ...options);
  }
  static json(...options) {
    let op = options;
    if (op.valueConverter && !op.valueConverter.fieldTypeInDb)
      op.valueConverter.fieldTypeInDb = "json";
    return Field(void 0, {
      valueConverter: {
        fieldTypeInDb: "json"
      }
    }, ...options);
  }
  static dateOnly(...options) {
    return Field(() => Date, {
      valueConverter: ValueConverters.DateOnly
    }, ...options);
  }
  static date(...options) {
    return Field(() => Date, ...options);
  }
  static integer(...options) {
    return Field(() => Number, {
      valueConverter: ValueConverters.Integer,
      validate: validateNumber
    }, ...options);
  }
  static autoIncrement(...options) {
    return Field(() => Number, {
      allowApiUpdate: false,
      dbReadOnly: true,
      valueConverter: __spreadProps(__spreadValues({}, ValueConverters.Integer), {
        fieldTypeInDb: "autoincrement"
      })
    }, ...options);
  }
  static number(...options) {
    return Field(() => Number, {
      validate: validateNumber
    }, ...options);
  }
  static createdAt(...options) {
    return Field(() => Date, {
      allowApiUpdate: false,
      saving: (_, ref, { isNew }) => {
        if (isNew)
          ref.value = /* @__PURE__ */ new Date();
      }
    }, ...options);
  }
  static updatedAt(...options) {
    return Field(() => Date, {
      allowApiUpdate: false,
      saving: (_, ref) => {
        ref.value = /* @__PURE__ */ new Date();
      }
    }, ...options);
  }
  static uuid(...options) {
    return Field(() => String, {
      allowApiUpdate: false,
      defaultValue: () => v4_default(),
      saving: (_, r) => {
        if (!r.value)
          r.value = v4_default();
      }
    }, ...options);
  }
  /**
   * A CUID (Collision Resistant Unique Identifier) field.
   * This id value is determined on the backend on insert, and can't be updated through the API.
   * The CUID is generated using the `@paralleldrive/cuid2` npm package.
   */
  static cuid(...options) {
    return Field(() => String, {
      allowApiUpdate: false,
      defaultValue: () => (0, import_cuid2.createId)(),
      saving: (_, r) => {
        if (!r.value)
          r.value = (0, import_cuid2.createId)();
      }
    }, ...options);
  }
  /**
  * Defines a field that can hold a value from a specified set of string literals.
  * @param {() => readonly valueType[]} optionalValues - A function that returns an array of allowed string literals.
  * @returns {ClassFieldDecorator<entityType, valueType | undefined>} - A class field decorator.
  *
  * @example
  
  * class MyEntity {
  *   .@Fields.literal(() => ['open', 'closed', 'frozen', 'in progress'] as const)
  *   status: 'open' | 'closed' | 'frozen' | 'in progress' = 'open';
  * }
  
  *
  * // This defines a field `status` in `MyEntity` that can only hold the values 'open', 'closed', 'frozen', or 'in progress'.
  *
  * @example
  * // For better reusability and maintainability:
  
  * const statuses = ['open', 'closed', 'frozen', 'in progress'] as const;
  * type StatusType = typeof statuses[number];
  *
  * class MyEntity {
  *   .@Fields.literal(() => statuses)
  *   status: StatusType = 'open';
  * }
  
  *
  * // This approach allows easy management and updates of the allowed values for the `status` field.
  */
  static literal(optionalValues, ...options) {
    return _Fields.string({
      validate: (entity, event) => Validators.in(optionalValues())(entity, event),
      //@ts-expect-error as we are adding this to options without it being defined in options
      [fieldOptionalValuesFunctionKey]: optionalValues
    }, ...options);
  }
  static enum(enumType, ...options) {
    let valueConverter;
    return Field(() => (
      //@ts-ignore
      enumType()
    ), {
      validate: (entity, event) => Validators.enum(enumType())(entity, event),
      [fieldOptionalValuesFunctionKey]: () => getEnumValues(enumType())
    }, ...options, (options2) => {
      options2[fieldOptionalValuesFunctionKey] = () => getEnumValues(enumType());
      if (valueConverter === void 0) {
        let enumObj = enumType();
        let enumValues = getEnumValues(enumObj);
        valueConverter = enumValues.find((x2) => typeof x2 === "string") ? ValueConverters.String : ValueConverters.Integer;
      }
      if (!options2.valueConverter) {
        options2.valueConverter = valueConverter;
      } else if (!options2.valueConverter.fieldTypeInDb) {
        options2.valueConverter.fieldTypeInDb = valueConverter.fieldTypeInDb;
      }
    });
  }
  static string(...options) {
    return Field(() => String, ...options);
  }
  static boolean(...options) {
    return Field(() => Boolean, ...options);
  }
};
var Relations = class {
  /**
   * Define a to-one relation between entities, indicating a one-to-one relationship.
   * If no field or fields are provided, it will automatically create a field in the database
   * to represent the relation.
   *
   * @param toEntityType A function that returns the target entity type.
   * @param options (Optional): An object containing options for configuring the to-one relation.
   * @returns A decorator function to apply the to-one relation to an entity field.
   *
   * Example usage:
   * ```
   * @Relations.toOne(() => Customer)
   * customer?: Customer;
   * ```
   * ```
   * Fields.string()
   * customerId?: string;
   *
   * @Relations.toOne(() => Customer, "customerId")
   * customer?: Customer;
   * ```
   * ```
   * Fields.string()
   * customerId?: string;
   *
   * @Relations.toOne(() => Customer, {
   *   field: "customerId",
   *   defaultIncluded: true
   * })
   * customer?: Customer;
   * ```
   * ```
   * Fields.string()
   * customerId?: string;
   *
   * @Relations.toOne(() => Customer, {
   *   fields: {
   *     customerId: "id",
   *   },
   * })
   * customer?: Customer;
   * ```
   */
  static toOne(toEntityType, options) {
    let op = typeof options === "string" ? { field: options } : !options ? {} : options;
    if (!op.field && !op.fields && !op.findOptions)
      return Field(toEntityType, __spreadValues(__spreadValues({}, op), relationInfoMemberInOptions(toEntityType, "reference")));
    return Field(() => void 0, __spreadValues(__spreadProps(__spreadValues({}, op), {
      serverExpression: () => void 0
    }), relationInfoMemberInOptions(toEntityType, "toOne")));
  }
  static toMany(toEntityType, options) {
    let op = typeof options === "string" ? { field: options } : options;
    return Field(() => void 0, __spreadValues(__spreadProps(__spreadValues({}, op), {
      serverExpression: () => void 0
    }), relationInfoMemberInOptions(toEntityType, "toMany")));
  }
};
function Field(valueType, ...options) {
  return (target, context, c) => {
    const key = typeof context === "string" ? context : context.name.toString();
    let factory = (remult2) => {
      let r = buildOptions(options, remult2);
      if (r.required) {
        r.validate = addValidator(r.validate, Validators.required, true);
      }
      if (r.maxLength) {
        r.validate = addValidator(r.validate, Validators.maxLength(r.maxLength));
      }
      if (r.minLength) {
        r.validate = addValidator(r.validate, Validators.minLength(r.minLength));
      }
      if (!r.valueType && valueType) {
        r.valueType = valueType();
      }
      if (!r.key) {
        r.key = key;
      }
      if (!r.dbName)
        r.dbName = r.key;
      let type = r.valueType;
      if (!type) {
        type = typeof Reflect.getMetadata == "function" ? Reflect.getMetadata("design:type", target, key) : [];
        r.valueType = type;
      }
      if (!r.target)
        r.target = target;
      return r;
    };
    checkTarget(target);
    let names = remultStatic.columnsOfType.get(target.constructor);
    if (!names) {
      names = [];
      remultStatic.columnsOfType.set(target.constructor, names);
    }
    let set = names.find((x2) => x2.key == key);
    if (!set)
      names.push({
        key,
        settings: factory
      });
    else {
      let prev = set.settings;
      set.settings = (c2) => {
        let prevO = prev(c2);
        let curr = factory(c2);
        return Object.assign(prevO, curr);
      };
    }
  };
}
function checkTarget(target) {
  if (!target)
    throw new Error("Set the 'experimentalDecorators:true' option in your 'tsconfig' or 'jsconfig' (target undefined)");
}

// ../node_modules/tslib/tslib.es6.mjs
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}

// ../node_modules/remult/esm/src/remult3/IdEntity.js
var IdEntity = class extends EntityBase {
  id;
};
__decorate([
  Fields.uuid(),
  __metadata("design:type", String)
], IdEntity.prototype, "id", void 0);

// ../node_modules/remult/node_modules/reflect-metadata/Reflect.js
var Reflect2;
(function(Reflect3) {
  (function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect3);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect3;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function(key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
        }
        if (previous)
          previous(key, value);
      };
    }
  })(function(exporter) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function() {
        return MakeDictionary(/* @__PURE__ */ Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map, key) {
        return hasOwn.call(map, key);
      } : function(map, key) {
        return key in map;
      },
      get: downLevel ? function(map, key) {
        return hasOwn.call(map, key) ? map[key] : void 0;
      } : function(map, key) {
        return map[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process["env"] && process["env"]["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target))
          throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(
        target,
        propertyKey,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      if (!metadataMap.delete(metadataKey))
        return false;
      if (metadataMap.size > 0)
        return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0)
        return true;
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create)
          return void 0;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create)
          return void 0;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return void 0;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        true
      );
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null)
        return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0)
        return ownKeys;
      if (ownKeys.length <= 0)
        return parentKeys;
      var set = new _Set();
      var keys = [];
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys.length = k;
          return keys;
        }
        var nextValue = IteratorValue(next);
        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    function Type(x2) {
      if (x2 === null)
        return 1;
      switch (typeof x2) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x2 === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x2) {
      return x2 === void 0;
    }
    function IsNull(x2) {
      return x2 === null;
    }
    function IsSymbol(x2) {
      return typeof x2 === "symbol";
    }
    function IsObject(x2) {
      return typeof x2 === "object" ? x2 !== null : typeof x2 === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(
        argument,
        3
        /* String */
      );
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f2 = iterator["return"];
      if (f2)
        f2.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O)
        return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = (
        /** @class */
        function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: void 0, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }()
      );
      return (
        /** @class */
        function() {
          function Map2() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map2.prototype.has = function(key) {
            return this._find(
              key,
              /*insert*/
              false
            ) >= 0;
          };
          Map2.prototype.get = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            return index >= 0 ? this._values[index] : void 0;
          };
          Map2.prototype.set = function(key, value) {
            var index = this._find(
              key,
              /*insert*/
              true
            );
            this._values[index] = value;
            return this;
          };
          Map2.prototype.delete = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            if (index >= 0) {
              var size = this._keys.length;
              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map2.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map2.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map2.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map2.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map2.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map2.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map2.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map2;
        }()
      );
      function getKey(key, _) {
        return key;
      }
      function getValue(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return (
        /** @class */
        function() {
          function Set2() {
            this._map = new _Map();
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set2.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set2.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set2.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set2.prototype.clear = function() {
            this._map.clear();
          };
          Set2.prototype.keys = function() {
            return this._map.keys();
          };
          Set2.prototype.values = function() {
            return this._map.values();
          };
          Set2.prototype.entries = function() {
            return this._map.entries();
          };
          Set2.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set2.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set2;
        }()
      );
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              true
            );
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }()
      );
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create)
            return void 0;
          Object.defineProperty(target, rootKey, { value: HashMap.create() });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i)
          buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect2 || (Reflect2 = {}));

// ../node_modules/remult/esm/src/server-action.js
var Action = class _Action {
  actionUrl;
  queue;
  allowed;
  constructor(actionUrl, queue, allowed) {
    this.actionUrl = actionUrl;
    this.queue = queue;
    this.allowed = allowed;
  }
  static apiUrlForJobStatus = "jobStatusInQueue";
  run(pIn, baseUrl, http) {
    return __async(this, null, function* () {
      if (baseUrl === void 0)
        baseUrl = remult.apiClient.url;
      if (!http)
        http = buildRestDataProvider(remult.apiClient.httpClient);
      let r = yield http.post(baseUrl + "/" + this.actionUrl, pIn);
      let p = r;
      if (p && p.queuedJobId) {
        let progress = remultStatic.actionInfo.startBusyWithProgress();
        try {
          let runningJob;
          yield remultStatic.actionInfo.runActionWithoutBlockingUI(() => __async(this, null, function* () {
            while (!runningJob || !runningJob.done) {
              if (runningJob)
                yield new Promise((res) => setTimeout(() => {
                  res(void 0);
                }, 200));
              runningJob = yield http.post(baseUrl + "/" + _Action.apiUrlForJobStatus, { queuedJobId: r.queuedJobId });
              if (runningJob.progress) {
                progress.progress(runningJob.progress);
              }
            }
          }));
          if (runningJob.error)
            throw runningJob.error;
          progress.progress(1);
          return runningJob.result;
        } finally {
          progress.close();
        }
      } else
        return r;
    });
  }
  doWork;
  __register(reg) {
    reg(this.actionUrl, this.queue, this.allowed, (d, req, res) => __async(this, null, function* () {
      try {
        var r = yield this.execute(d, req, res);
        res.success(r);
      } catch (err) {
        if (err.isForbiddenError)
          res.forbidden();
        else
          res.error(err, void 0);
      }
    }));
  }
};
var ForbiddenError = class extends Error {
  constructor(message = "Forbidden") {
    super(message);
  }
  isForbiddenError = true;
};
var myServerAction = class extends Action {
  types;
  options;
  originalMethod;
  constructor(name, types, options, originalMethod) {
    super(name, options.queue, options.allowed);
    this.types = types;
    this.options = options;
    this.originalMethod = originalMethod;
  }
  execute(info, remult2, res) {
    return __async(this, null, function* () {
      let result = { data: {} };
      let ds = remult2.dataProvider;
      yield doTransaction(remult2, () => __async(this, null, function* () {
        if (!remult2.isAllowedForInstance(void 0, this.options.allowed))
          throw new ForbiddenError();
        info.args = yield prepareReceivedArgs(this.types(), info.args, remult2, ds, res);
        try {
          result.data = yield this.originalMethod(info.args);
        } catch (err) {
          throw err;
        }
      }));
      return result;
    });
  }
};
var classOptions = /* @__PURE__ */ new Map();
function Controller(key) {
  return function(target, context) {
    let r = target;
    classOptions.set(r, { key });
    setControllerSettings(target, { key });
    return target;
  };
}
function BackendMethod(options) {
  return (target, context, descriptor) => {
    const key = typeof context === "string" ? context : context.name.toString();
    const originalMethod = descriptor ? descriptor.value : target;
    let result = originalMethod;
    checkTarget(target);
    function getTypes() {
      var types = typeof Reflect.getMetadata == "function" ? Reflect.getMetadata("design:paramtypes", target, key) : [];
      if (options.paramTypes)
        types = typeof options.paramTypes === "function" ? options.paramTypes() : options.paramTypes;
      return types;
    }
    if (target.prototype !== void 0) {
      let serverAction2 = new myServerAction((options?.apiPrefix ? options.apiPrefix + "/" : "") + key, () => getTypes(), options, (args) => originalMethod.apply(void 0, args));
      serverAction2.doWork = (args, self2, url, http) => __async(this, null, function* () {
        args = prepareArgsToSend(getTypes(), args);
        if (options.blockUser === false) {
          return yield remultStatic.actionInfo.runActionWithoutBlockingUI(() => __async(this, null, function* () {
            return (yield serverAction2.run({ args }, url, http)).data;
          }));
        } else
          return (yield serverAction2.run({ args }, url, http)).data;
      });
      result = function(...args) {
        return __async(this, null, function* () {
          if (!isBackend()) {
            return yield serverAction2.doWork(args, void 0);
          } else
            return yield originalMethod.apply(this, args);
        });
      };
      registerAction(target, result);
      result[serverActionField] = serverAction2;
      if (descriptor) {
        descriptor.value = result;
        return descriptor;
      } else
        return result;
    }
    let x2 = remultStatic.classHelpers.get(target.constructor);
    if (!x2) {
      x2 = new ClassHelper();
      remultStatic.classHelpers.set(target.constructor, x2);
    }
    let serverAction = {
      __register(reg) {
        let c = new Remult();
        for (const constructor of x2.classes.keys()) {
          let controllerOptions = x2.classes.get(constructor);
          if (!controllerOptions.key) {
            controllerOptions.key = c.repo(constructor).metadata.key;
          }
          reg(controllerOptions.key + "/" + (options?.apiPrefix ? options.apiPrefix + "/" : "") + key, options ? options.queue : false, options.allowed, (d, req, res) => __async(this, null, function* () {
            d.args = d.args.map((x3) => isCustomUndefined(x3) ? void 0 : x3);
            let allowed = options.allowed;
            try {
              let remult2 = req;
              let r;
              yield doTransaction(remult2, () => __async(this, null, function* () {
                d.args = yield prepareReceivedArgs(getTypes(), d.args, remult2, remult2.dataProvider, res);
                if (remultStatic.allEntities.includes(constructor)) {
                  let repo2 = remult2.repo(constructor);
                  let y;
                  if (d.rowInfo.isNewRow) {
                    y = repo2.create();
                    let rowHelper = repo2.getEntityRef(y);
                    yield rowHelper._updateEntityBasedOnApi(d.rowInfo.data);
                  } else {
                    let rows = yield repo2.find({
                      where: __spreadProps(__spreadValues({}, repo2.metadata.idMetadata.getIdFilter(d.rowInfo.id)), {
                        $and: [repo2.metadata.options.apiPrefilter]
                      })
                    });
                    if (rows.length != 1)
                      throw new Error("not found or too many matches");
                    y = rows[0];
                    yield repo2.getEntityRef(y)._updateEntityBasedOnApi(d.rowInfo.data);
                  }
                  if (!remult2.isAllowedForInstance(y, allowed))
                    throw new ForbiddenError();
                  let defs = getEntityRef(y);
                  yield defs.__validateEntity();
                  try {
                    r = {
                      result: yield originalMethod.apply(y, d.args),
                      rowInfo: {
                        data: yield defs.toApiJson(),
                        isNewRow: defs.isNew(),
                        wasChanged: defs.wasChanged(),
                        id: defs.getOriginalId()
                      }
                    };
                  } catch (err) {
                    throw defs.catchSaveErrors(err);
                  }
                } else {
                  let y = new constructor(remult2, remult2.dataProvider);
                  let controllerRef = getControllerRef(y, remult2);
                  yield controllerRef._updateEntityBasedOnApi(d.fields);
                  if (!remult2.isAllowedForInstance(y, allowed))
                    throw new ForbiddenError();
                  yield controllerRef.__validateEntity();
                  try {
                    r = {
                      result: yield originalMethod.apply(y, d.args),
                      fields: yield controllerRef.toApiJson()
                    };
                  } catch (err) {
                    throw controllerRef.catchSaveErrors(err);
                  }
                }
              }));
              res.success(r);
            } catch (err) {
              if (err.isForbiddenError)
                res.forbidden();
              else
                res.error(err, void 0);
            }
          }));
        }
      },
      doWork: function(args, self2, baseUrl, http) {
        return __async(this, null, function* () {
          args = prepareArgsToSend(getTypes(), args);
          if (remultStatic.allEntities.includes(target.constructor)) {
            let defs = getEntityRef(self2);
            yield defs.__validateEntity();
            let classOptions2 = x2.classes.get(self2.constructor);
            if (!classOptions2.key) {
              classOptions2.key = defs.repository.metadata.key + "_methods";
            }
            try {
              let r = yield new class extends Action {
                execute;
              }(classOptions2.key + "/" + (options?.apiPrefix ? options.apiPrefix + "/" : "") + key, options ? options.queue : false, options.allowed).run({
                args,
                rowInfo: {
                  data: yield defs.toApiJson(),
                  isNewRow: defs.isNew(),
                  wasChanged: defs.wasChanged(),
                  id: defs.getOriginalId()
                }
              }, baseUrl, http);
              yield defs._updateEntityBasedOnApi(r.rowInfo.data, true);
              return r.result;
            } catch (err) {
              throw defs.catchSaveErrors(err);
            }
          } else {
            let defs = getControllerRef(self2, void 0);
            try {
              yield defs.__validateEntity();
              let r = yield new class extends Action {
                execute;
              }(x2.classes.get(self2.constructor).key + "/" + (options?.apiPrefix ? options.apiPrefix + "/" : "") + key, options ? options.queue : false, options.allowed).run({
                args,
                fields: yield defs.toApiJson()
              }, baseUrl, http);
              yield defs._updateEntityBasedOnApi(r.fields);
              return r.result;
            } catch (e) {
              throw defs.catchSaveErrors(e);
            }
          }
        });
      }
    };
    result = function(...args) {
      return __async(this, null, function* () {
        if (!isBackend()) {
          let self2 = this;
          return serverAction.doWork(args, self2);
        } else
          return yield originalMethod.apply(this, args);
      });
    };
    registerAction(target.constructor, result);
    result[serverActionField] = serverAction;
    if (descriptor) {
      descriptor.value = result;
      return descriptor;
    } else
      return result;
  };
}
var customUndefined = {
  _isUndefined: true
};
function registerAction(target, resultMethod) {
  ;
  (target[classBackendMethodsArray] || (target[classBackendMethodsArray] = [])).push(resultMethod);
  remultStatic.actionInfo.allActions.push(resultMethod);
}
function isCustomUndefined(x2) {
  return x2 && x2._isUndefined;
}
var ProgressListener = class {
  res;
  constructor(res) {
    this.res = res;
  }
  progress(progress) {
    this.res.progress(progress);
  }
};
function prepareArgsToSend(types, args) {
  if (types) {
    for (let index = 0; index < types.length; index++) {
      const paramType = types[index];
      for (const type of [Remult, SqlDatabase]) {
        if (args[index] instanceof type)
          args[index] = void 0;
        else if (paramType == type) {
          args[index] = void 0;
        }
      }
      if (args[index] != void 0) {
        let x2 = { valueType: paramType };
        x2 = decorateColumnSettings(x2, new Remult());
        let eo = getEntitySettings(paramType, false);
        if (eo != null) {
          let rh = getEntityRef(args[index]);
          args[index] = rh.getId();
        }
        if (x2.valueConverter)
          args[index] = x2.valueConverter.toJson(args[index]);
      }
    }
  }
  return args.map((x2) => x2 !== void 0 ? x2 : customUndefined);
}
function prepareReceivedArgs(types, args, remult2, ds, res) {
  return __async(this, null, function* () {
    for (let index = 0; index < args.length; index++) {
      const element = args[index];
      if (isCustomUndefined(element))
        args[index] = void 0;
    }
    if (types)
      for (let i = 0; i < types.length; i++) {
        if (args.length < i) {
          args.push(void 0);
        }
        if (types[i] == Remult || types[i] == Remult) {
          args[i] = remult2;
        } else if (types[i] == SqlDatabase && ds) {
          args[i] = ds;
        } else if (types[i] == ProgressListener) {
          args[i] = new ProgressListener(res);
        } else {
          let x2 = { valueType: types[i] };
          x2 = decorateColumnSettings(x2, remult2);
          if (x2.valueConverter)
            args[i] = x2.valueConverter.fromJson(args[i]);
          let eo = getEntitySettings(types[i], false);
          if (eo != null) {
            if (!(args[i] === null || args[i] === void 0))
              args[i] = yield remult2.repo(types[i]).findId(args[i]);
          }
        }
      }
    return args;
  });
}
var classBackendMethodsArray = Symbol.for("classBackendMethodsArray");

// ../node_modules/remult/esm/src/remult3/classDescribers.js
function describeClass(classType, classDescriber, members, staticMembers) {
  if (classDescriber)
    classDescriber(classType);
  for (const fieldKey in members) {
    if (Object.prototype.hasOwnProperty.call(members, fieldKey)) {
      const element = members[fieldKey];
      const prop = Object.getOwnPropertyDescriptor(classType.prototype, fieldKey);
      element(classType.prototype, fieldKey, prop);
      if (prop)
        Object.defineProperty(classType.prototype, fieldKey, prop);
    }
  }
  for (const staticFieldKey in staticMembers) {
    const staticElement = staticMembers[staticFieldKey];
    const prop = Object.getOwnPropertyDescriptor(classType, staticFieldKey);
    staticElement(classType, staticFieldKey, prop);
    if (prop)
      Object.defineProperty(classType, staticFieldKey, prop);
  }
}
function describeBackendMethods(classType, backendMethods) {
  let result = {};
  for (const key in backendMethods) {
    if (Object.prototype.hasOwnProperty.call(backendMethods, key)) {
      const options = backendMethods[key];
      result[key] = BackendMethod(options);
    }
  }
  describeClass(classType, void 0, void 0, result);
}
function describeEntity(classType, key, fields, options) {
  describeClass(classType, Entity(key, options), fields);
}

// ../node_modules/remult/esm/src/data-providers/in-memory-database.js
var InMemoryDataProvider = class {
  transaction(action) {
    return __async(this, null, function* () {
      let before = JSON.stringify(this.rows);
      try {
        yield action(this);
      } catch (e) {
        this.rows = JSON.parse(before);
        throw e;
      }
    });
  }
  rows = {};
  getEntityDataProvider(entity) {
    let name = entity.key;
    if (!this.rows[name])
      this.rows[name] = [];
    return new ArrayEntityDataProvider(entity, () => this.rows[name]);
  }
  toString() {
    return "InMemoryDataProvider";
  }
};

// ../node_modules/remult/esm/src/data-providers/web-sql-data-provider.js
var WebSqlDataProvider = class {
  databaseName;
  rows;
  /** @internal */
  //@ts-ignore
  db;
  constructor(databaseName, databaseSize = 2 * 1024 * 1024) {
    this.databaseName = databaseName;
    this.db = window.openDatabase(databaseName, "1.0", databaseName, databaseSize);
  }
  end() {
    return __async(this, null, function* () {
    });
  }
  getLimitSqlSyntax(limit, offset) {
    return " limit " + limit + " offset " + offset;
  }
  entityIsUsedForTheFirstTime(entity) {
    return __async(this, null, function* () {
      yield this.createTable(entity);
    });
  }
  ensureSchema(entities) {
    return __async(this, null, function* () {
      for (const entity of entities) {
        yield this.createTable(entity);
      }
    });
  }
  dropTable(entity) {
    return __async(this, null, function* () {
      let e = yield dbNamesOf(entity);
      let sql = "drop  table if exists " + e.$entityName;
      if (SqlDatabase.LogToConsole)
        console.info(sql);
      yield this.createCommand().execute(sql);
    });
  }
  createTable(entity) {
    return __async(this, null, function* () {
      let result = "";
      let e = yield dbNamesOf(entity);
      for (const x2 of entity.fields) {
        if (!isDbReadonly(x2, e) || isAutoIncrement(x2)) {
          if (result.length != 0)
            result += ",";
          result += "\r\n  ";
          if (isAutoIncrement(x2)) {
            if (x2.key != entity.idMetadata.field.key)
              throw "in web sql, autoincrement is only allowed for primary key";
            result += e.$dbNameOf(x2) + " integer primary key autoincrement";
          } else {
            result += this.addColumnSqlSyntax(x2, e.$dbNameOf(x2));
            if (x2.key == entity.idMetadata.field.key) {
              result += " primary key";
            }
          }
        }
      }
      let sql = "create table if not exists " + e.$entityName + " (" + result + "\r\n)";
      if (SqlDatabase.LogToConsole)
        console.log(sql);
      yield this.createCommand().execute(sql);
    });
  }
  createCommand() {
    return new WebSqlBridgeToSQLCommand(this.db);
  }
  transaction(action) {
    return __async(this, null, function* () {
      throw new Error("Method not implemented.");
    });
  }
  addColumnSqlSyntax(x2, dbName) {
    let result = dbName;
    const nullNumber = x2.allowNull ? "" : " default 0 not null";
    if (x2.valueType == Date)
      result += " integer";
    else if (x2.valueType == Boolean)
      result += " integer " + nullNumber;
    else if (x2.valueType == Number) {
      if (!x2.valueConverter.fieldTypeInDb)
        result += " real " + nullNumber;
      else
        result += " " + x2.valueConverter.fieldTypeInDb + " " + nullNumber;
    } else
      result += " text" + (x2.allowNull ? " " : " default '' not null ");
    return result;
  }
  toString() {
    return "WebSqlDataProvider";
  }
};
var WebSqlBridgeToSQLCommand = class {
  source;
  //@ts-ignore
  constructor(source) {
    this.source = source;
  }
  values = [];
  addParameterAndReturnSqlToken(val) {
    return this.param(val);
  }
  param(val) {
    this.values.push(val);
    return "~" + this.values.length + "~";
  }
  execute(sql) {
    return new Promise((resolve, reject) => this.source.transaction((t) => {
      let s = sql;
      let v = [];
      var m = s.match(/~\d+~/g);
      if (m != null)
        m.forEach((mr) => {
          s = s.replace(mr, "?");
          v.push(this.values[Number.parseInt(mr.substring(1, mr.length - 1)) - 1]);
        });
      t.executeSql(s, v, (t1, r) => resolve(new WebSqlBridgeToSQLQueryResult(r)), (t2, err) => {
        reject(err.message);
        return false;
      });
    }));
  }
};
var WebSqlBridgeToSQLQueryResult = class {
  r;
  getColumnKeyInResultForIndexInSelect(index) {
    if (this.rows.length == 0)
      throw Error("No rows");
    let i = 0;
    for (let m in this.rows[0]) {
      if (i++ == index)
        return m;
    }
    throw Error("index not found");
  }
  //@ts-ignore
  constructor(r) {
    this.r = r;
    this.rows = [];
    for (let i = 0; i < r.rows.length; i++) {
      this.rows.push(r.rows.item(i));
    }
  }
  rows;
};

// ../node_modules/remult/esm/src/data-providers/json-data-provider.js
var JsonDataProvider = class {
  storage;
  formatted;
  constructor(storage, formatted = false) {
    this.storage = storage;
    this.formatted = formatted;
  }
  getEntityDataProvider(entity) {
    return new JsonEntityDataProvider(entity, this.storage, this.formatted);
  }
  transaction(action) {
    return __async(this, null, function* () {
      yield action(this);
    });
  }
};
var JsonEntityDataProvider = class {
  entity;
  helper;
  formatted;
  constructor(entity, helper, formatted) {
    this.entity = entity;
    this.helper = helper;
    this.formatted = formatted;
  }
  loadEntityData(what) {
    return __async(this, null, function* () {
      let data = [];
      let dbName = yield this.entity.dbName;
      let s = yield this.helper.getItem(dbName);
      if (s)
        data = JSON.parse(s);
      let dp = new ArrayEntityDataProvider(this.entity, () => data);
      return what(dp, () => __async(this, null, function* () {
        return yield this.helper.setItem(dbName, JSON.stringify(data, void 0, this.formatted ? 2 : void 0));
      }));
    });
  }
  p = Promise.resolve();
  find(options) {
    return this.p = this.p.then(() => this.loadEntityData((dp, save) => dp.find(options)));
  }
  count(where) {
    return this.p = this.p.then(() => this.loadEntityData((dp, save) => dp.count(where)));
  }
  update(id, data) {
    return this.p = this.p.then(() => this.loadEntityData((dp, save) => dp.update(id, data).then((x2) => __async(this, null, function* () {
      yield save();
      return x2;
    }))));
  }
  delete(id) {
    return this.p = this.p.then(() => this.loadEntityData((dp, save) => dp.delete(id).then((x2) => __async(this, null, function* () {
      yield save();
      return x2;
    }))));
  }
  insert(data) {
    return __async(this, null, function* () {
      return this.p = this.p.then(() => this.loadEntityData((dp, save) => dp.insert(data).then((x2) => __async(this, null, function* () {
        yield save();
        return x2;
      }))));
    });
  }
};

// ../node_modules/remult/esm/src/data-providers/json-entity-opfs-storage.js
var JsonEntityOpfsStorage = class {
  //@internal
  opfsRoot;
  getItem(entityDbName2) {
    return __async(this, null, function* () {
      if (!this.opfsRoot) {
        this.opfsRoot = yield navigator.storage.getDirectory();
      }
      const opfsFile = yield this.opfsRoot.getFileHandle(entityDbName2 + ".json", {
        create: true
      });
      const readable = yield opfsFile.getFile();
      return yield readable.text();
    });
  }
  setItem(entityDbName2, json) {
    return __async(this, null, function* () {
      const opfsFile = yield this.opfsRoot.getFileHandle(entityDbName2 + ".json", {
        create: true
      });
      const writable = yield opfsFile.createWritable();
      yield writable.write(json);
      yield writable.close();
    });
  }
};

// ../node_modules/remult/esm/src/live-query/SubscriptionServer.js
var InMemoryLiveQueryStorage = class {
  debugFileSaver = (x2) => {
  };
  debug() {
    this.debugFileSaver(this.queries);
  }
  keepAliveAndReturnUnknownQueryIds(ids) {
    return __async(this, null, function* () {
      const result = [];
      for (const id of ids) {
        let q = this.queries.find((q2) => q2.id === id);
        if (q) {
          q.lastUsed = (/* @__PURE__ */ new Date()).toISOString();
        } else
          result.push(id);
      }
      this.debug();
      return result;
    });
  }
  queries = [];
  constructor() {
  }
  add(query) {
    return __async(this, null, function* () {
      this.queries.push(__spreadProps(__spreadValues({}, query), { lastUsed: (/* @__PURE__ */ new Date()).toISOString() }));
      this.debug();
    });
  }
  removeCountForTesting = 0;
  remove(id) {
    return __async(this, null, function* () {
      this.queries = this.queries.filter((q) => q.id !== id);
      this.removeCountForTesting++;
      this.debug();
    });
  }
  forEach(entityKey, handle) {
    return __async(this, null, function* () {
      let d = /* @__PURE__ */ new Date();
      d.setMinutes(d.getMinutes() - 5);
      this.queries = this.queries.filter((x2) => x2.lastUsed > d.toISOString());
      for (const q of this.queries) {
        if (q.entityKey === entityKey) {
          yield handle({
            query: q,
            setData: (data) => __async(this, null, function* () {
              q.data = data;
            })
          });
        }
      }
      this.debug();
    });
  }
};

// ../node_modules/remult/esm/index.js
function repo(entity, dataProvider) {
  return remult.repo(entity, dataProvider);
}
export {
  Allow,
  ArrayEntityDataProvider,
  BackendMethod,
  CaptionTransformer,
  CompoundIdField,
  Controller,
  ControllerBase,
  CustomSqlFilterBuilder,
  Entity,
  EntityBase,
  EventSource2 as EventSource,
  Field,
  FieldType,
  Fields,
  Filter,
  ForbiddenError,
  IdEntity,
  InMemoryDataProvider,
  InMemoryLiveQueryStorage,
  JsonDataProvider,
  JsonEntityOpfsStorage,
  ProgressListener,
  Relations,
  Remult,
  RestDataProvider,
  Sort,
  SqlDatabase,
  SubscriptionChannel,
  UrlBuilder,
  Validators,
  ValueConverters,
  ValueListFieldType,
  ValueListInfo,
  WebSqlDataProvider,
  createValidator,
  createValidatorWithArgs,
  createValueValidator,
  createValueValidatorWithArgs,
  dbNamesOf,
  describeBackendMethods,
  describeClass,
  describeEntity,
  getEntityRef,
  getFields,
  getValueList,
  isBackend,
  remult,
  repo,
  valueValidator,
  withRemult
};
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
//# sourceMappingURL=remult.js.map
