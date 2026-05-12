import { Injectable, signal, NgZone } from '@angular/core';
import { createClient, SupabaseClient, User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _user = signal<User | null>(null);

  constructor(private zone: NgZone) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );

    // Initial session check
    this.supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error('Supabase getSession error:', error);
      this.zone.run(() => {
        this._user.set(session?.user ?? null);
      });
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      this.zone.run(() => {
        this._user.set(session?.user ?? null);
      });
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  get auth() {
    return this.supabase.auth;
  }

  get currentUser() {
    return this._user.asReadonly();
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async getProperties() {
    const { data, error } = await this.supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Property[];
  }

  async createProperty(property: Property) {
    const { data, error } = await this.supabase
      .from('properties')
      .insert([property])
      .select();

    if (error) throw error;
    return data;
  }
}
