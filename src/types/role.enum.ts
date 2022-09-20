export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  AM = 'AM',
  TL = 'TL',
  FSE = 'FSE',
  AUDITOR = 'AUDITOR',
}

export const AllRoles = [
  Role.ADMIN,
  Role.AM,
  Role.MANAGER,
  Role.TL,
  Role.AUDITOR,
];

export type RoleType =
  | Role.ADMIN
  | Role.AM
  | Role.AUDITOR
  | Role.FSE
  | Role.MANAGER
  | Role.TL;
