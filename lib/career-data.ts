import roles from '@/public/data/roles.json';

type RoleMeta = Record<string, { difficulty: string }>;

export const roleMeta: RoleMeta = Object.fromEntries(
  roles.map((role) => [
    role.id,
    { difficulty: role.category },
  ])
);
