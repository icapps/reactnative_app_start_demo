export const MaintenanceStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LOADING: 'Loading',
} as const;

export type MaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

type MaintenanceStatusInput = {
  isComplete: boolean;
  isActive: boolean;
};

export function resolveMaintenanceStatus({
  isComplete,
  isActive,
}: MaintenanceStatusInput): MaintenanceStatus {
  if (!isComplete) {
    return MaintenanceStatus.LOADING;
  }

  return isActive ? MaintenanceStatus.ACTIVE : MaintenanceStatus.INACTIVE;
}
