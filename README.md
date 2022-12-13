# Metho Array

Array prototype extensions using the [Metho](https://github.com/jonrandy/metho) library:

## Usage

```js
import { chunk, pieces, reverse, head, tail, sum, product, join, first, last, min, max } from 'metho-array'

// chunk (if already imported from metho-string, it will also work with arrays)
[1, 2, 3, 4, 5, 6][chunk(2)] // [[1, 2], [3, 4], [5, 6]]
[1, 2, 3, 4, 5][chunk(3)] // [[1, 2, 3], [4, 5]]

// pieces (if already imported from metho-string, it will also work with arrays)
// > balanced - attempt to balance the number of items in each piece
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1][pieces(4)] // [[1, 1, 1], [1, 1, 1], [1, 1], [1, 1]]
// > not balanced
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1][pieces(4, false)] // [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1]]

// reverse (if already imported from metho-string, it will also work with arrays) - does not mutate original array
[1, 2, 3][reverse] // [3, 2, 1]

// head (if already imported from metho-string, it will also work with arrays)
[1, 2, 3, 4][head] // 1

// tail (if already imported from metho-string, it will also work with arrays)
[1, 2, 3, 4][tail] // [2, 3, 4]

// sum - sum the items in array (will behave like 'join' if any item is a string)
[1, 3, 5][sum] // 9
[1, '3', 5][sum] // '135'

// product - product of all items in array
[1, 3, 5][product] // 15

// join - join all items (as strings) in array, with optional separator
['a', 1, 'b'][join] // 'a1b'
['a', 1, 'b'][join('--')] // 'a--1--b'

// first - return the first element in the array, or the first n elements as an array
['a', 'b', 'c'][first] // 'a'
['a', 'b', 'c'][first(1)] // ['a']
['a', 'b', 'c'][first(2)] // ['a', 'b']

// last - return the last element in the array, or the last n elements as an array
['a', 'b', 'c'][last] // 'c'
['a', 'b', 'c'][last(1)] // ['c']
['a', 'b', 'c'][last(2)] // ['b', 'c']

// min - return the minimum number (using Math.min), the minimum from sorting with .sort(), or
// the minimum from sorting with the given comparison function
[4, 11, 3][min] // 3
[4, 11, 3][min(false)] // 11
['dog', 'ant', 'cat'][min(false)] // 'ant'
[{a:31}, {a:2}, {a:5}][min((i,j) => i.a-j.a)] // {a:2}

// max - return the maximum number (using Math.max), the maximum from sorting with .sort(), or
// the maximum from sorting with the given comparison function
[4, 11, 3][max] // 11
[4, 11, 3][max(false)] // 4
['dog', 'ant', 'cat'][max(false)] // 'dog'
[{a:31}, {a:2}, {a:5}][max((i,j) => i.a-j.a)] // {a:31}

```
