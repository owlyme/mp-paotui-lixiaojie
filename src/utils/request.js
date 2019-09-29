const baseUrl = "%API_PATH%"

// http数据拦截
function afterHttp (url, res) {
	if (!res) { return }

}

function post (url, data) {
	for(let k in data) {
		if (data[k] === null) {
			delete data[k]
		}
	}
  return new Promise(reslove => {
		let paramsData = {
			sessionId: wx.getStorageSync('sessionId'),
			...data
		}

    wx.request( {
      url: baseUrl + url,
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: paramsData,
			fail: res => {
			},
      complete:  res => {
				afterHttp(url, res.data)
				reslove(res.data, res)
      }
    })
  })
}

function get (url, data) {
	for(let k in data) {
		if (data[k] === null) {
			delete data[k]
		}
	}
	return new Promise((reslove) => {
		let paramsData = {
			sessionId: wx.getStorageSync('sessionId'),
			...data
		}
	  wx.request( {
			url: baseUrl + url,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "GET",
			data: paramsData,
			complete: res => {
				afterHttp(url, res.data)
        reslove(res.data, res)
			}
	  })
	})
}

module.exports = {
	post: post,
	get: get
}
