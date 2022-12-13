//import * as Metho from "../metho/metho.js"
import * as Metho from "metho"

const target = Array.prototype
const ARRAY_FLAG = "array"
const STRING_FLAG = "string"

target[Metho.data] = ARRAY_FLAG

// chunk - chunk an array or string in to chunks of given size
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
export const chunk = Metho.addWithSharedSymbolName(
	target,
	chunkFunc,
	"arrayOrStringChunk"
)

// pieces - divide an array or string in to given number of pieces (attempt to balance number of items in each piece by default)
const piecesFunc = function pieces(count, balanced=true) {
	if (!balanced) return this[chunk(Math.ceil(this.length/count))]
	let result = [], isArray = this[Metho.data] == ARRAY_FLAG, arr = [...this];
	for (let i=count; i > 0; i--) {
		result.push(arr.splice(0, Math.ceil(arr.length / i)));
	}
	return isArray ? result : result.map(arr=>arr.join(''))
}
export const pieces = Metho.addWithSharedSymbolName(
	target,
	piecesFunc,
	"arrayOrStringPieces"
)


// reverse - reverse the array (duplicate native method - but don't mutate unless asked) or string
const reverseFunc = function reverse(mutate) {
	let res
	if (this[Metho.data] == ARRAY_FLAG) {
		// reverse array
		res = mutate ? this.reverse() : [...this].reverse()
	} else if (this[Metho.data] == STRING_FLAG) {
		// reverse string
		res = [...this].reverse().join("")
	}
	return res
}
export const reverse = Metho.addWithSharedSymbolName(
	target,
	reverseFunc,
	"arrayOrStringReverse"
)

// head - return first element of array
export const head = Metho.addWithSharedSymbolName(
	target,
	function head() {
		return this[0]
	},
	"arrayOrStringHead"
)

// tail - return remaining elements of array after head
export const tail = Metho.addWithSharedSymbolName(
	target,
	function tail() {
		return this.slice(1)
	},
	"arrayOrStringTail"
)

// sum - give the sum of the items in the array (uses +, so will also actually join as a string if any element is a string)
export const sum = Metho.add(target, function sum() {
	return this.reduce((total, i) => total+i)
})

// product - give the product of the items in the array
export const product = Metho.add(target, function sum() {
	return this.reduce((total, i) => total*i)
})

// join - joins all items in array (as strings) - with optional separator
export const join = Metho.addWithParams(target, function join(separator='') {
	return this.join(separator)
})

// first - same as ruby
export const first = Metho.addWithParams(
	target,
	function first(count=undefined) {
		return count === undefined ? this[0] : this.slice(0, count)
	}
)

// last - same as ruby
export const last = Metho.addWithParams(
	target,
	function last(count=undefined) {
		return count === undefined ? this.slice(-1)[0] : this.slice(-count)
	}
)

// min - get minimum value from array (based on numeric, normal sort, or sort function)
export const min = Metho.addWithParams(
	target,
	function min(isNumericOrCompareFunc=true) {
		if (typeof isNumericOrCompareFunc === 'function') {
			return this.sort(isNumericOrCompareFunc)[0]
		}
		return isNumericOrCompareFunc ? Math.min(...this) : this.sort()[0]
	}
)

// max - get minimum value from array (based on numeric, normal sort, or sort function)
export const max = Metho.addWithParams(
	target,
	function min(isNumericOrCompareFunc=true) {
		if (typeof isNumericOrCompareFunc === 'function') {
			return this.sort(isNumericOrCompareFunc).slice(-1)[0]
		}
		return isNumericOrCompareFunc ? Math.max(...this) : this.sort().slice(-1)[0]
	}
)
