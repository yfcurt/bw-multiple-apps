// 转码解base64
export function encode(arraybuffer) {
	const bytes = new Uint8Array(arraybuffer)
	const len = bytes.length
	let base64 = ''
	for (let i = 0; i < len; i += 3) {
		base64 += chars[bytes[i] >> 2]
		base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
		base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
		base64 += chars[bytes[i + 2] & 63]
	}
	if (len % 3 === 2) {
		base64 = base64.substring(0, base64.length - 1) + '='
	} else if (len % 3 === 1) {
		base64 = base64.substring(0, base64.length - 2) + '=='
	}
	return base64
}

export function decode(base64) {
	if (!base64) return
	const len = base64.length
	let bufferLength = base64.length * 0.75
	let p = 0
	let encoded1 = 0
	let encoded2 = 0
	let encoded3 = 0
	let encoded4 = 0
	if (base64[base64.length - 1] === '=') {
		bufferLength--
		if (base64[base64.length - 2] === '=') {
			bufferLength--
		}
	}

	const arraybuffer = new ArrayBuffer(bufferLength)
	const bytes = new Uint8Array(arraybuffer)

	for (let i = 0; i < len; i += 4) {
		encoded1 = lookup[base64.charCodeAt(i)]
		encoded2 = lookup[base64.charCodeAt(i + 1)]
		encoded3 = lookup[base64.charCodeAt(i + 2)]
		encoded4 = lookup[base64.charCodeAt(i + 3)]
		bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
		bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
		bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
	}
	return arraybuffer
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const lookup = new Uint8Array(256)
for (let i = 0; i < chars.length; i++) {
	lookup[chars.charCodeAt(i)] = i
}
