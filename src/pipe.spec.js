import { pipe } from './pipe'

describe('pipe', () => {
  it('performs computations from left to right, similar to inside out', () => {
    const sum = (x, y) => x + y
    const multiply = (x, y) => x * y

    const sum2 = (x) => sum(x, 2) // first
    const multiplyBy3 = (x) => multiply(x, 3) // second

    const higherOrderNine = multiplyBy3(sum2(1))

    const pipeNine = pipe(
      sum2, // -> 3
      multiplyBy3 // -> 9
    )(1)

    expect(higherOrderNine).toBe(9)
    expect(pipeNine).toBe(higherOrderNine) // equivalent results
  })

  it('uses tap in the middle of a transformation and returns as expected', () => {
    global.console.log = jest.fn()

    const tap = (currentValue) => {
      console.log(currentValue)
      return currentValue
    }
    const addCopyRight = (text) => `© ${text}`
    const addYear = (text) => `${text} ${2040}`
    const addDot = (text) => `${text}.`

    const author = 'Paul Melero'

    const formattedLicense = pipe(addCopyRight, addYear, addDot)(author)

    expect(formattedLicense).toBe('© Paul Melero 2040.')

    const tapExample = pipe(addCopyRight, tap, addYear, tap, addDot)(author)

    expect(console.log).toHaveBeenCalledWith('© Paul Melero')
    expect(console.log).toHaveBeenCalledWith('© Paul Melero 2040')
  })
})
