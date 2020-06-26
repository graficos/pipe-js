import { asyncPipe } from './asyncPipe'

describe('asyncPipe', () => {
  it('behaves like pipe but with async functions', async () => {
    const sum2p = (value) => Promise.resolve(value + 2)
    const multiply3p = (value) => Promise.resolve(value * 3)

    const higherOrderNine = await multiply3p(await sum2p(1))

    const asyncPipeNine = await asyncPipe(sum2p, multiply3p)(1)

    expect(higherOrderNine).toBe(9)
    expect(asyncPipeNine).toBe(higherOrderNine) // equivalent results
  })
  it('uses tap in the middle of a transformation and returns as expected', async () => {
    global.console.log = jest.fn()

    const asyncTap = (currentValue) => {
      console.log(currentValue)
      return Promise.resolve(currentValue)
    }
    const addCopyRight = (text) => Promise.resolve(`© ${text}`)
    const addYear = (text) => Promise.resolve(`${text} ${2040}`)
    const addDot = (text) => Promise.resolve(`${text}.`)

    const author = 'Paul Melero'

    const formattedLicense = await asyncPipe(
      addCopyRight,
      addYear,
      addDot
    )(author)

    expect(formattedLicense).toBe('© Paul Melero 2040.')

    const tapExample = await asyncPipe(
      addCopyRight,
      asyncTap,
      addYear,
      asyncTap,
      addDot
    )(author)

    expect(console.log).toHaveBeenCalledWith('© Paul Melero')
    expect(console.log).toHaveBeenCalledWith('© Paul Melero 2040')
  })
})
