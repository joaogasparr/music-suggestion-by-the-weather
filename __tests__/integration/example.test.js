import truncate from '../util/truncate';

describe('Default', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('Default', () => {
    expect(1 + 1).toBe(2);
  });
});
