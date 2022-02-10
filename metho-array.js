//import * as Metho from "../metho/metho.js"
import * as Metho from "metho"

const target = Array.prototype
const ARRAY_FLAG = "array"
const STRING_FLAG = "string"

target[Metho.data] = ARRAY_FLAG

// chunk an array or string in to pieces of given size
const chunkFunc = function chunk(size) {
	let res = []

	if (this[Metho.data] == ARRAY_FLAG) {
		// chunk array
		let chunk
		for (let i = 0; i < this.length; i += size) {
			chunk = this.slice(i, i + size)
			res.push(chunk)
		}
	} else if (this[Metho.data] == STRING_FLAG) {
		// chunk string
		res = this.match(new RegExp(".{1," + size + "}", "g"))
	}
	return res
}
export const chunk = addWithMaybeRegisteredSymbolName(
	target,
	chunkFunc,
	"arrayOrStringChunk"
)

// reverse - reverse the array (duplicate native method)
export const reverse = addWithMaybeRegisteredSymbolName(
	target,
	function reverse() {
		return this.reverse()
	},
	"arrayOrStringReverse"
)

// head - return first element of array
export const head = addWithMaybeRegisteredSymbolName(
	target,
	function head() {
		return this[0]
	},
	"arrayOrStringHead"
)

// tail - return remaining elements of array after head
export const tail = addWithMaybeRegisteredSymbolName(
	target,
	function tail() {
		return this.slice(1)
	},
	"arrayOrStringTail"
)

function addWithMaybeRegisteredSymbolName(target, func, symbolName) {
	const registered = Metho.registered(symbolName)
	let ret
	if (registered) {
		if (!func.length) {
			// if already registerd and no params, re-use symbol
			ret = Metho.add(target, func, { useSymbol: registered })
		} else {
			// else if already registered and has params, don't overwrite function, just update targets (function will have to deal with both targets)
			ret = registered
			ret.targets = [...new Set([...ret.targets, target])]
		}
	} else {
		// if not registered, create a new Symbol and register it
		ret = Metho.add(target, func, { register: true, symbolName })
	}
	return ret
}
