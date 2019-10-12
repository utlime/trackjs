import {TrackJS} from './index';

describe('capture option', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation().mockReset();
    jest.spyOn(console, 'error').mockImplementation().mockReset();
  });

  describe('capture = true', () => {
    beforeEach(() => {
      TrackJS.install({ capture: true });
      TrackJS.onError('1');
      TrackJS.onError('2');
      TrackJS.onError('3');
    });

    test('usage call must be called', () => {
      expect(console.log).toHaveBeenCalledWith('usage call')
    });

    test('all errors must be send', () => {
      expect(console.error).toHaveBeenCalledTimes(3);
    });
  });

  describe('capture = false', () => {
    beforeEach(() => {
      TrackJS.install({ capture: false });
      TrackJS.onError('1');
      TrackJS.onError('2');
      TrackJS.onError('3');
    });

    test('usage call must not be called', () => {
      expect(console.log).not.toHaveBeenCalled();
    });

    test('no errors must be send', () => {
      expect(console.error).not.toHaveBeenCalled();
    })
  });

  describe('capture = false, but then enabled', () => {
    beforeEach(() => {
      TrackJS.install({ capture: false });
      TrackJS.onError('1');
      TrackJS.onError('2');
      TrackJS.onError('3');
      TrackJS.enable();
    });

    test('usage call must be called', () => {
      expect(console.log).toHaveBeenCalledWith('usage call')
    });

    test('all errors must be send', () => {
      expect(console.error).toHaveBeenCalledTimes(3);
      expect(console.error).toHaveBeenNthCalledWith(1, '3');
      expect(console.error).toHaveBeenNthCalledWith(2, '2');
      expect(console.error).toHaveBeenNthCalledWith(3, '1');
    });
  });

  describe('capture = false and size 2, but then enabled', () => {
    beforeEach(() => {
      TrackJS.install({ capture: false, size: 2 });
      TrackJS.onError('1');
      TrackJS.onError('2');
      TrackJS.onError('3');
      TrackJS.onError('4');
      TrackJS.enable();
    });

    test('usage call must be called', () => {
      expect(console.log).toHaveBeenCalledWith('usage call')
    });

    test('only last two error must be sent in order: 4 then 3 ', () => {
      expect(console.error).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenNthCalledWith(1, '4');
      expect(console.error).toHaveBeenNthCalledWith(2, '3');
    });
  });
});


