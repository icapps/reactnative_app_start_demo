export const MaintenanceStatus = {
  ACTIVE: 'Active',
  ERROR: 'Error',
  INACTIVE: 'Inactive',
  LOADING: 'Loading',
} as const;

export type MaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

type MaintenanceStatusInput = {
  isActive: boolean;
  hasError: boolean;
  isSettled: boolean;
};

export function resolveMaintenanceStatus({
  isActive,
  hasError,
  isSettled,
}: MaintenanceStatusInput): MaintenanceStatus {
  if (!isSettled) {
    return MaintenanceStatus.LOADING;
  }

  if (hasError) {
    return MaintenanceStatus.ERROR;
  }

  return isActive ? MaintenanceStatus.ACTIVE : MaintenanceStatus.INACTIVE;
}
