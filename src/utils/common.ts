import URI from 'urijs'
import { mediaUrl } from '../../constrains'

export const getMediaURL = (urlParts: string): string => {
	// khi chạy môi trường thật thì thường dùng CDN với đường dẫn tuyệt đối nên hàm này vô dụng
	if (process.env.NODE_ENV === "production") return urlParts
	if (!urlParts) return ""
	let u = new URI(urlParts)
	if (u.is("relative")) {
		u = u.absoluteTo(mediaUrl)
	}
	// eslint-disable-next-line
	return u.toString()
}

export const numberWithCommas = (x: string | number): string => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getConditionDisplay = (condition: string): string => {
	switch (condition) {
		case "N":
			return "Hàng mới"
		case "B":
			return "B-Stock"
		case "M":
			return "Như mới"
		case "E":
			return "Xuất sắc"
		case "V":
			return "Rất tốt"
		case "G":
			return "Khá tốt"
		case "P":
			return "Khá tệ"
		case "X":
			return "Không hoạt động"
		default:
			return ""
	}
}

export const getStatusDisplay = (status: string): string => {
	switch (status) {
		case "A":
			return "Đang bán"
		case "W":
			return "Đang chờ duyệt"
		case "D":
			return "Nháp"
		case "S":
			return "Đã bán"
		case "R":
			return "Đã xóa"
		default:
			return ""
	}
}

export const getStatusOrder = (status: string): string => {
	switch (status) {
		case "W":
			return "Đang chờ xử lý"
		case "C":
			return "Đã xác nhận"
		case "S":
			return "Đang giao hàng"
		case "F":
			return "Đã hoàn thành"
		case "R":
			return "Đã hủy"
		case "X":
			return "Đang tranh chấp"
		default:
			return ""
	}
}

export const getPaymentMethodDisplay = (method: string): string => {
	switch (method) {
		case "X":
			return "Tự giao dịch với nhau"
		case "M":
			return "Thông qua sàn 1pedal"
		default:
			return ""
	}
}

export const shortenSize = (bytes: number): string => {
	// hàm đổi từ bytes sang KB, MB, GB, TB
	if (bytes === 0) return "0 B"
	const k = 1024
	const sizes = ["B", "KB", "MB", "GB", "TB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function addURLParameter(
	url: string,
	parameter: string,
	value: string,
): string {
	let loc = removeURLParameter(url, parameter)
	loc += !loc.includes("?") ? "?" : "&"
	return `${loc}${parameter}=${value}`
}

export function removeURLParameter (url: string, parameter: string) {
	const urlparts = url.split('?')
	if (urlparts.length >= 2) {
	  const prefix = encodeURIComponent(parameter) + '='
	  const pars = urlparts[1].split(/[&;]/g)
  
	  for (let i = pars.length; i-- > 0;) {
		if (pars[i].lastIndexOf(prefix, 0) !== -1) {
		  pars.splice(i, 1)
		}
	  }
	  url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
	  return url
	} else {
	  return url
	}
  }
