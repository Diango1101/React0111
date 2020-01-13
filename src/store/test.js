// function* g() {
//     yield 'a'
//     yield 'b'
//     yield 'c'
//     return 'ending'
// }

// console.log(g())
// console.log(g().toString())

// var gen = g()
// function next(a) {
//     let { value, done } = a.next()
//     console.log(value)
//     if (!done) next(a)
// }
// next(gen)

// test3
// 第一次yield里的参数需要通过构造函数去传值
// function* say() {
//     let a = yield '1'
//     console.log(a)
//     let b = yield '2'
//     console.log(b)
// }

// let it = say()
// // 输出{ value: '1', done: false }
// // a的值并非该返回值，而是下次next参数
// console.log(it.next())
// // 输出我是传入的1
// // 输出{ value: '2', done: false }
// console.log(it.next('我是传入的1'))
// // 输出我是传入的2
// // 输出{ value: undefined, done: true }
// console.log(it.next('我是传入的2'))

// test4
function* r(num) {
    const r1 = yield compute(num)
    yield compute(r1)
}
// compute为异步操作，结合Promise使用可以实现异步操作队列
function compute(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const ret = num * num
            console.log(ret)
            resolve(ret)
        }, 3000)
    })
}
let it = r(2)

// 不适用递归函数调用
// it.next().value.then((num) => it.next(num))

// 修改为可处理Promise的next
function next(data) {
    let { value, done } = it.next(data)
    if (!done) {
        value.then((num) => {
            next(num)
        })
    }
}
next()
