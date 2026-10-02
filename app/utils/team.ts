export type TeamFigureName = 'mario' | 'viktor' | 'boris'

export const TEAM_MEMBERS: readonly { name: string, role: string, figure: TeamFigureName, phone?: boolean }[] = [
  { name: 'Mário', role: 'IT špecialista a DevOps', figure: 'mario', phone: true },
  { name: 'Viktor', role: 'Programátor', figure: 'viktor' },
  { name: 'Boris', role: 'Projektový manažér', figure: 'boris' },
]

export const MARIO_PHONE = {
  label: '+421 903 051 759',
  href: 'tel:+421903051759',
} as const
