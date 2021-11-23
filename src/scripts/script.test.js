import { execOperation } from './script.js'

test('check operators', () => {
    expect(execOperation(1, 3, '+')).toBe(4);
}
)

