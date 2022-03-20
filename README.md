# Metho Array

Array prototype extensions using the [Metho](https://github.com/jonrandy/metho) library:

## Usage

```js
import { chunk, pieces, reverse, head, tail } from 'metho-array'

// chunk (if already imported from metho-string, it will also work with arrays)
[1, 2, 3, 4, 5, 6][chunk(2)] // [[1, 2], [3, 4], [5, 6]]
[1, 2, 3, 4, 5][chunk(3)] // [[1, 2, 3], [4, 5]]

// pieces (if already imported from metho-string, it will also work with arrays)
// > balanced - attempt to balance the number of items in each piece
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1][pieces(4)] // [[1, 1, 1], [1, 1, 1], [1, 1], [1, 1]]
// > not balanced
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1][pieces(4, false)] // [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1]]

// reverse (if already imported from metho-string, it will also work with arrays)
[1, 2, 3][reverse] // [3, 2, 1]

// head (if already imported from metho-string, it will also work with arrays)
[1, 2, 3, 4][head] // 1

// tail (if already imported from metho-string, it will also work with arrays)
[1, 2, 3, 4][tail] // [2, 3, 4]

```
