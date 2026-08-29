import {
  MaintenanceStatus,
  resolveMaintenanceStatus,
} from './resolveMaintenanceStatus';

test.each([
  [false, false, MaintenanceStatus.LOADING],
  [false, true, MaintenanceStatus.LOADING],
  [true, false, MaintenanceStatus.INACTIVE],
  [true, true, MaintenanceStatus.ACTIVE],
])(
  'resolves complete=%s, active=%s to %s',
  (isComplete, isActive, expected) => {
    // Arrange — completion and maintenance settings are supplied by the table
    // Act — resolve the maintenance status
    const status = resolveMaintenanceStatus({ isActive, isComplete });
    // Assert — incomplete checks remain loading
    expect(status).toBe(expected);
  },
);
