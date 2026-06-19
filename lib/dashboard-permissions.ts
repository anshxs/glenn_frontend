export const dashboardSections = [
  "guild_management",
  "finance",
  "staff_management",
] as const;

export const dashboardActions = [
  "read",
  "insert",
  "update",
  "delete",
] as const;

export type DashboardSectionKey = (typeof dashboardSections)[number];
export type DashboardAction = (typeof dashboardActions)[number];

export type DashboardPermissions = Partial<
  Record<DashboardSectionKey, DashboardAction[]>
>;

export type DashboardProfile = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  hasAccess: boolean;
  permissions: DashboardPermissions;
};

const sectionSet = new Set<string>(dashboardSections);
const actionSet = new Set<string>(dashboardActions);

export function normalizeDashboardPermissions(
  rawPermissions: unknown,
): DashboardPermissions {
  if (!rawPermissions || typeof rawPermissions !== "object") {
    return {};
  }

  const normalized: DashboardPermissions = {};

  for (const [section, actions] of Object.entries(rawPermissions)) {
    if (!sectionSet.has(section) || !Array.isArray(actions)) {
      continue;
    }

    const allowedActions = actions.filter(
      (action): action is DashboardAction =>
        typeof action === "string" && actionSet.has(action),
    );

    if (allowedActions.length > 0) {
      normalized[section as DashboardSectionKey] = Array.from(
        new Set(allowedActions),
      );
    }
  }

  return normalized;
}

export function hasDashboardAction(
  permissions: DashboardPermissions,
  section: DashboardSectionKey,
  action: DashboardAction,
) {
  return permissions[section]?.includes(action) ?? false;
}
