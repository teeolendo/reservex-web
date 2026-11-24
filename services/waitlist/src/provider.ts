export type WaitlistEntry = {
  email: string;
  createdAt: string;
};

/**
 * Where waitlist sign-ups are stored. The storage provider is still to be
 * confirmed, so swapping it means writing one adapter that implements this.
 */
export interface WaitlistProvider {
  add(entry: WaitlistEntry): Promise<void>;
}

/** Placeholder adapter: logs the sign-up server-side and stores nothing. */
export class LogProvider implements WaitlistProvider {
  async add(entry: WaitlistEntry): Promise<void> {
    console.log(JSON.stringify({ event: 'waitlist_signup', ...entry }));
  }
}
