const arrayProto = Array.prototype//原生Array的原型
const arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  const original = arrayProto[method]//缓存元素数组原型
  //这里重写了数组的几个原型方法
  def(arrayMethods, method, function mutator () {
    //这里备份一份参数应该是从性能方面的考虑
    let i = arguments.length
    const args = new Array(i)
    while (i--) {
      args[i] = arguments[i]
    }
    const result = original.apply(this, args)//原始方法求值
    // const ob = this.__ob__//这里this.__ob__指向的是数据的Observer
    let inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) console.log('push')
    // notify change
    // ob.dep.notify()
    return result
  })
})

//定义属性
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}


function defineProperty(store, key) {
	Object.defineProperty(this, key, {
		get() {
			return store[key]
		},
		set(nv) {
			if (nv !== store[key]) {
				console.log(`set ${key}: ${nv}`)
				store[key] = nv
			}
		}
	})
}

function App(arg) {
	const data = arg.data || {};
	const store = data

	for (let key in data ) {
		if (Array.isArray(data[key])) {
			this[key] = store[key]
			this[key].__proto__ = arrayMethods
			// defineProperty.call(this, store, key)

			// Object.defineProperty(this, key, {
			// 	get() {
			// 		return store[key].data
			// 	},
			// 	set(nv) {
			// 		if (nv !== store[key]) {
			// 			console.log(`set ${key}: ${nv}`)
			// 			store[key] = nv
			// 		}
			// 	}
			// })

		} else {
			this[key] = data[key];
			defineProperty.call(this, store, key)
		}
	}
}

app = new App({
	data: {
		name: 'xy',
		arr: []
	}
})

app.arr.push('123')
app.arr.push('456')
app.arr.sort()
console.log(app.arr, app.arr.length)


