import { Injectable, signal } from '@angular/core';

interface UserDetails {
  userName?: unknown;
  fullName?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly storageKey = 'bankloanuser';
  readonly userName = signal(this.readStoredUserName());

  setLoggedInUser(data: unknown, fallbackUserName: string): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    const user = this.parseUser(data);
    this.userName.set(this.getName(user) ?? fallbackUserName);
  }

  logoff(): void {
    localStorage.removeItem(this.storageKey);
    this.userName.set(null);
  }

  private readStoredUserName(): string | null {
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser === null) {
      return null;
    }

    return this.getName(this.parseUser(storedUser));
  }

  private parseUser(data: unknown): UserDetails | null {
    let value = data;
    for (let attempt = 0; attempt < 2 && typeof value === 'string'; attempt++) {
      try {
        value = JSON.parse(value) as unknown;
      } catch {
        return null;
      }
    }

    if (typeof value !== 'object' || value === null) {
      return null;
    }

    return value as UserDetails;
  }

  private getName(user: UserDetails | null): string | null {
    for (const name of [user?.userName, user?.fullName]) {
      if (typeof name === 'string' && name.trim()) {
        return name;
      }
    }

    return null;
  }
}
