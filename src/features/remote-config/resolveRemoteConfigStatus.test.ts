import {
  RemoteConfigStatus,
  resolveRemoteConfigStatus,
} from './resolveRemoteConfigStatus';

test.each([
  [false, false, RemoteConfigStatus.LOADING],
  [true, true, RemoteConfigStatus.ERROR],
  [true, false, RemoteConfigStatus.READY],
])('resolves settled=%s, error=%s to %s', (isSettled, hasError, expected) => {
  // Arrange — settlement and error states are supplied by the table
  // Act — resolve the remote config status
  const status = resolveRemoteConfigStatus({ hasError, isSettled });

  // Assert — incomplete checks remain loading and errors are surfaced
  expect(status).toBe(expected);
});
