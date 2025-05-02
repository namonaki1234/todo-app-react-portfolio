import {
    createClient,
  } from '@supabase/supabase-js';
//   import { Database } from '../../database.types';
//   import { Note } from '@/modules/notes/note.entity';
  
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
  );
  
