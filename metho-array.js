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


// reverse - reverse the array (duplicate native method)
export const reverse = Metho.addWithSharedSymbolName(
	target,
	function reverse() {
		return this.reverse()
	},
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
