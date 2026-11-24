import { Card, Eyebrow, Section } from '@reservex/ui';

// Clyde's bio is omitted until one is supplied.
const team: Array<{ initials: string; name: string; role: string; bio?: string }> = [
  {
    initials: 'TO',
    name: 'Tony Olendo',
    role: 'Chief Executive Officer',
    bio: 'Fifteen years building regulated finance software. Led developer relations at a top-tier global blockchain network and helped bring major dollar stablecoins natively onchain. Two-time founder; built Kenya’s first mobile banking app for credit unions. Chairs Kenya’s Virtual Assets Chamber of Commerce.',
  },
  {
    initials: 'AK',
    name: 'Sirungai Allan Kakai',
    role: 'Executive Director',
    bio: 'Kenyan-qualified lawyer and digital-asset policy specialist. Counsel to a leading onchain finance advisory, and a founding director of Kenya’s Virtual Assets Chamber of Commerce.',
  },
  {
    initials: 'CM',
    name: 'Clyde Mutsotso',
    role: 'Chief Financial Officer',
  },
];

export function Team() {
  return (
    <Section id="team" className="py-section">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>The team</Eyebrow>
          <h2 className="mt-4 max-w-[680px] font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
            Lawyers, engineers and market builders. In one room.
          </h2>
        </div>
        <p className="max-w-[420px] text-[17px] leading-[1.6] text-muted">
          Depth across regulated finance, capital markets law, protocol engineering and digital-asset policy.
        </p>
      </div>
      <div className="mt-14 flex flex-wrap gap-5">
        {team.map((m) => (
          <Card key={m.name} hover={false} className="flex-[1_1_320px]">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-pill bg-tint font-display text-[24px] text-brand"
            >
              {m.initials}
            </div>
            <h3 className="mt-6 text-[20px] font-semibold">{m.name}</h3>
            <p className="mt-1 text-[14px] font-medium text-brand">{m.role}</p>
            {m.bio && <p className="mt-[14px] text-[15px] leading-[1.7] text-muted">{m.bio}</p>}
          </Card>
        ))}
      </div>
    </Section>
  );
}
