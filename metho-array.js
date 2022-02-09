//import * as Metho from "../metho/metho.js"
import * as Metho from "metho"

const target = Array.prototype

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

// function addParamlessWithMaybeRegisteredSymbolName(target, func, symbolName) {
// 	const registered = Metho.registered(symbolName)
// 	let ret
// 	if (registered) {
// 		// if already registerd, re-use symbol
// 		ret = Metho.add(target, func, { useSymbol: registered })
// 	} else {
// 		// if not registered, create a new Symbol and register it
// 		ret = Metho.add(target, func, { register: true, symbolName })
// 	}
// 	return ret
// }

// function addWithParamsWithMaybeRegisteredSymbolName(target, func, symbolName) {
// 	const registered = Metho.registered(symbolName)
// 	let ret
// 	if (registered) {
// 		// the function already exists, we should not overwrite - just add our target to the existing function's targets
// 		ret = registered
// 		ret.targets = [...new Set([...ret.targets, target])]
// 	} else {
// 		// if not registered, create a new Symbol and register it
// 		ret = Metho.add(target, func, { register: true, symbolName })
// 	}
// 	return ret
// }
