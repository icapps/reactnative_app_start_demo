import {
  MaintenanceStatus,
  resolveMaintenanceStatus,
} from './resolveMaintenanceStatus';

test.each([
  [false, false, false, MaintenanceStatus.LOADING],
  [true, false, true, MaintenanceStatus.ERROR],
  [true, false, false, MaintenanceStatus.INACTIVE],
  [true, true, false, MaintenanceStatus.ACTIVE],
])(
  'resolves settled=%s, active=%s, error=%s to %s',
  (isSettled, isActive, hasError, expected) => {
    // Arrange — completion and maintenance settings are supplied by the table
    // Act — resolve the maintenance status
    const status = resolveMaintenanceStatus({ hasError, isActive, isSettled });
    // Assert — incomplete checks remain loading
    expect(status).toBe(expected);
  },
);
